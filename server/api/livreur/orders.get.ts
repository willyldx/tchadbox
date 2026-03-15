/**
 * Liste des commandes assignées au livreur connecté.
 * Requiert JWT livreur (ou admin).
 */
export default defineEventHandler(async (event) => {
  const user = await requireLivreur(event)
  const token = getAuthToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0
  const status = query.status as string | undefined

  const supabase = getSupabaseWithAuth(token)

  let req = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .eq('assigned_to', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    req = req.eq('fulfillment_status', status)
  }

  const { data: orders, error, count } = await req

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du chargement des commandes',
    })
  }

  return {
    data: orders || [],
    count: count ?? 0,
    offset,
    limit,
    hasMore: (count ?? 0) > offset + (orders?.length ?? 0),
  }
})
