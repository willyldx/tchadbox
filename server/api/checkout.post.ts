/**
 * Création de commande (checkout).
 * Utilise le service role pour autoriser les commandes invité (user_id null).
 * Retourne orderId et reference pour lancer le paiement Paystack côté client.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    user_id?: string
    email: string
    customer_first_name: string
    customer_last_name: string
    customer_phone?: string
    recipient_name: string
    recipient_phone?: string
    shipping_address_1?: string
    shipping_address_2?: string
    shipping_city?: string
    shipping_country?: string
    delivery_instructions?: string
    subtotal: number
    shipping_total: number
    total: number
    payment_method?: string
    items: Array<{
      product_id?: string
      variant_id?: string
      title: string
      quantity: number
      unit_price: number
      total: number
      thumbnail?: string
    }>
  }>(event)

  if (
    !body?.email ||
    !body.customer_first_name ||
    !body.customer_last_name ||
    !body.recipient_name ||
    typeof body.total !== 'number' ||
    !Array.isArray(body.items) ||
    body.items.length === 0
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Données de commande invalides (email, noms, destinataire, total, items requis)',
    })
  }

  const reference = generateOrderReference()

  const supabase = getSupabaseService()

  const orderRow = {
    user_id: body.user_id || null,
    display_id: reference,
    status: 'pending',
    payment_status: 'awaiting',
    fulfillment_status: 'not_fulfilled',
    email: body.email,
    customer_first_name: body.customer_first_name,
    customer_last_name: body.customer_last_name,
    customer_phone: body.customer_phone ?? null,
    recipient_name: body.recipient_name,
    recipient_phone: body.recipient_phone ?? null,
    shipping_address_1: body.shipping_address_1 ?? null,
    shipping_address_2: body.shipping_address_2 ?? null,
    shipping_city: body.shipping_city ?? "N'Djamena",
    shipping_country: body.shipping_country ?? 'Tchad',
    delivery_instructions: body.delivery_instructions ?? null,
    subtotal: Number(body.subtotal),
    shipping_total: Number(body.shipping_total),
    total: Number(body.total),
    currency: 'EUR',
    payment_reference: reference,
    payment_method: body.payment_method ?? 'card',
    items: body.items.map((item) => ({
      product_id: item.product_id,
      variant_id: item.variant_id,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total: item.total,
      thumbnail: item.thumbnail,
    })),
  }

  const { data: order, error } = await supabase
    .from('orders')
    .insert(orderRow)
    .select('id')
    .single()

  if (error) {
    console.error('[checkout] Order insert error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création de la commande',
    })
  }

  return {
    orderId: order.id,
    reference,
  }
})

function generateOrderReference(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `TCB-${timestamp}-${random}`.toUpperCase()
}
