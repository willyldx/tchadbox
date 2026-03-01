// Paystack Webhook Handler
// This endpoint receives webhook notifications from Paystack
// Configure this URL in your Paystack Dashboard → Settings → Webhooks
import { createHmac } from 'crypto'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const secretKey = config.paystackSecretKey

    // Read raw body for signature verification
    const rawBody = await readRawBody(event) || ''
    const body = JSON.parse(rawBody)

    // Verify webhook signature
    const signature = getHeader(event, 'x-paystack-signature')

    if (signature) {
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
    }

    const eventType = body.event

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

            // TODO: Update order status in Supabase
            // const supabase = createClient(...)
            // await supabase.from('orders').update({ 
            //   payment_status: 'captured',
            //   paid_at: data.paid_at 
            // }).eq('payment_reference', data.reference)

            break
        }

        case 'charge.failed': {
            console.log(`[Paystack Webhook] Payment failed:`, body.data?.reference)

            // TODO: Update order status to failed
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
