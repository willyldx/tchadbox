// Server-side Paystack payment verification
export default defineEventHandler(async (event) => {
    const { reference } = await readBody(event)

    if (!reference) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Reference is required',
        })
    }

    const config = useRuntimeConfig()
    const secretKey = config.paystackSecretKey

    if (!secretKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Paystack secret key not configured',
        })
    }

    try {
        // Verify transaction with Paystack API
        const response = await $fetch<{
            status: boolean
            message: string
            data: {
                id: number
                status: string
                reference: string
                amount: number
                currency: string
                paid_at: string
                channel: string
                customer: {
                    email: string
                }
                metadata: Record<string, any>
            }
        }>(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
        })

        if (response.status && response.data.status === 'success') {
            return {
                success: true,
                data: {
                    reference: response.data.reference,
                    amount: response.data.amount,
                    currency: response.data.currency,
                    paidAt: response.data.paid_at,
                    channel: response.data.channel,
                    email: response.data.customer.email,
                    metadata: response.data.metadata,
                },
            }
        }

        return {
            success: false,
            error: `Paiement non confirmé: ${response.data.status}`,
        }
    } catch (error: any) {
        console.error('Paystack verification error:', error)
        return {
            success: false,
            error: error.message || 'Erreur de vérification',
        }
    }
})
