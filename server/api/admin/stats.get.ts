/**
 * Stats dashboard admin (commandes du jour, en attente, en livraison, livrées ce mois).
 * Requiert un JWT admin (Authorization: Bearer <token>).
 */
import type { AdminStats } from '~/types'

export default defineEventHandler(async (event): Promise<AdminStats> => {
  await requireAdmin(event)
  const token = getAuthToken(event)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  const supabase = getSupabaseWithAuth(token)

  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, status, payment_status, fulfillment_status, total, created_at, delivered_at')
    .in('status', ['pending', 'processing', 'completed'])
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du chargement des commandes',
    })
  }

  const list = orders || []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayOrders = list.filter((o) => new Date(o.created_at) >= today)
  const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total || 0), 0)
  const pendingOrders = list.filter((o) => o.status === 'pending')
  const inDeliveryOrders = list.filter((o) =>
    ['shipped', 'partially_fulfilled', 'fulfilled'].includes(o.fulfillment_status || '')
  )
  const completedOrders = list.filter((o) => o.status === 'completed' || o.fulfillment_status === 'delivered')
  const totalRevenue = list
    .filter((o) => o.payment_status === 'captured' || o.status !== 'cancelled')
    .reduce((s, o) => s + Number(o.total || 0), 0)

  return {
    totalOrders: list.length,
    pendingOrders: pendingOrders.length,
    inDeliveryOrders: inDeliveryOrders.length,
    completedOrders: completedOrders.length,
    totalRevenue,
    todayOrders: todayOrders.length,
    todayRevenue,
  }
})
