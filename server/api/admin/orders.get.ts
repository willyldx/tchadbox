/**
 * Liste des commandes (admin) avec pagination et filtres optionnels.
 * Requiert JWT admin.
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const token = getAuthToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0
  const status = query.status as string | undefined
  const paymentStatus = query.payment_status as string | undefined

  const supabase = getSupabaseWithAuth(token)

  let req = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    req = req.eq('status', status)
  }
  if (paymentStatus) {
    req = req.eq('payment_status', paymentStatus)
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
