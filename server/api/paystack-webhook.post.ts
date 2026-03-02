// Paystack Webhook Handler
// Configure this URL in Paystack Dashboard → Settings → Webhooks
import { createHmac } from 'crypto'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const secretKey = config.paystackSecretKey

    // Read raw body for signature verification
    const rawBody = await readRawBody(event) || ''

    // Verify webhook signature — MANDATORY
    const signature = getHeader(event, 'x-paystack-signature')

    if (!signature) {
        console.error('Paystack webhook: Missing signature')
        throw createError({
            statusCode: 401,
            statusMessage: 'Missing signature',
        })
    }

    const hash = createHmac('sha512', secretKey)
        .update(rawBody)
        .digest('hex')

    if (hash !== signature) {
        console.error('Paystack webhook: Invalid signature')
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid signature',
        })
    }

    const body = JSON.parse(rawBody)
    const eventType = body.event

    // Server-side Supabase client (service role for admin operations)
    const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey
    )

    console.log(`[Paystack Webhook] Event: ${eventType}`, body.data?.reference)

    switch (eventType) {
        case 'charge.success': {
            const data = body.data
            console.log(`[Paystack Webhook] Payment successful:`, {
                reference: data.reference,
                amount: data.amount,
                currency: data.currency,
                customer: data.customer?.email,
            })

            // Update order payment status in Supabase
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    payment_status: 'captured',
                    paid_at: data.paid_at || new Date().toISOString(),
                    payment_reference: data.reference,
                    updated_at: new Date().toISOString(),
                })
                .eq('payment_reference', data.reference)

            if (updateError) {
                console.error('[Paystack Webhook] Failed to update order:', updateError)
            } else {
                console.log(`[Paystack Webhook] Order updated: payment_status = captured`)
            }

            break
        }

        case 'charge.failed': {
            const data = body.data
            console.log(`[Paystack Webhook] Payment failed:`, data.reference)

            // Update order status to reflect failed payment
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    payment_status: 'awaiting',
                    updated_at: new Date().toISOString(),
                })
                .eq('payment_reference', data.reference)

            if (updateError) {
                console.error('[Paystack Webhook] Failed to update failed order:', updateError)
            }

            break
        }

        case 'transfer.success':
        case 'transfer.failed':
        case 'transfer.reversed': {
            console.log(`[Paystack Webhook] Transfer event:`, eventType, body.data?.reference)
            break
        }

        default:
            console.log(`[Paystack Webhook] Unhandled event: ${eventType}`)
    }

    // Always return 200 to acknowledge receipt
    return { status: 'ok' }
})
