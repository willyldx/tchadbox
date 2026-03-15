/**
 * Mise à jour d'une commande par le livreur (statut livraison, photo, etc.).
 * Seules les commandes assignées au livreur peuvent être modifiées.
 */
export default defineEventHandler(async (event) => {
  await requireLivreur(event)
  const token = getAuthToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID commande manquant' })
  }

  const body = await readBody<{
    fulfillment_status?: string
    delivery_photo?: string
    tracking_number?: string
    notes?: string
    delivered_at?: string
    picked_up_at?: string
  }>(event)

  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Corps de requête vide ou invalide',
    })
  }

  const supabase = getSupabaseWithAuth(token)

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (body.fulfillment_status !== undefined) updates.fulfillment_status = body.fulfillment_status
  if (body.delivery_photo !== undefined) updates.delivery_photo = body.delivery_photo
  if (body.tracking_number !== undefined) updates.tracking_number = body.tracking_number
  if (body.notes !== undefined) updates.notes = body.notes
  if (body.delivered_at !== undefined) updates.delivered_at = body.delivered_at
  if (body.picked_up_at !== undefined) updates.picked_up_at = body.picked_up_at

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      throw createError({ statusCode: 404, statusMessage: 'Commande non trouvée ou non assignée à vous' })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour',
    })
  }

  return data
})
