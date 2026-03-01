// Paystack Payment Composable
export const usePaystack = () => {
  const config = useRuntimeConfig()
  const publicKey = config.public.paystackPublicKey

  // Load Paystack script dynamically
  const loadScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Paystack can only be used in the browser'))
        return
      }

      // Already loaded
      if ((window as any).PaystackPop) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v2/inline.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Paystack script'))
      document.head.appendChild(script)
    })
  }

  interface PaystackOptions {
    email: string
    amount: number // in the smallest currency unit (kobo for NGN, centimes for XOF/XAF)
    currency?: string
    reference?: string
    metadata?: Record<string, any>
    channels?: string[]
    onSuccess: (response: PaystackResponse) => void
    onClose: () => void
  }

  interface PaystackResponse {
    reference: string
    trans: string
    status: string
    message: string
    transaction: string
    trxref: string
  }

  // Generate unique reference
  const generateReference = (): string => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `TCB-${timestamp}-${random}`.toUpperCase()
  }

  // Initialize payment
  const initializePayment = async (options: PaystackOptions): Promise<void> => {
    await loadScript()

    const PaystackPop = (window as any).PaystackPop

    if (!PaystackPop) {
      throw new Error('Paystack SDK not loaded')
    }

    const handler = PaystackPop.setup({
      key: publicKey,
      email: options.email,
      amount: options.amount, // Paystack expects amount in smallest unit
      currency: options.currency || 'XOF', // XOF = Franc CFA (BCEAO) — adapté pour le Tchad/diaspora
      ref: options.reference || generateReference(),
      metadata: {
        custom_fields: [
          ...(options.metadata?.custom_fields || []),
        ],
        ...options.metadata,
      },
      channels: options.channels || ['card', 'mobile_money', 'bank_transfer'],
      callback: (response: PaystackResponse) => {
        options.onSuccess(response)
      },
      onClose: () => {
        options.onClose()
      },
    })

    handler.openIframe()
  }

  // Verify payment server-side
  const verifyPayment = async (reference: string): Promise<{
    success: boolean
    data?: any
    error?: string
  }> => {
    try {
      const response = await $fetch<{ success: boolean; data?: any; error?: string }>(
        '/api/verify-payment',
        {
          method: 'POST',
          body: { reference },
        }
      )
      return response
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erreur de vérification du paiement',
      }
    }
  }

  // Convert EUR to XOF (Franc CFA)
  // 1 EUR ≈ 655.957 XOF (fixed rate)
  const eurToXof = (eurAmount: number): number => {
    return Math.round(eurAmount * 655.957)
  }

  // Format XOF amount for display
  const formatXof = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return {
    initializePayment,
    verifyPayment,
    generateReference,
    eurToXof,
    formatXof,
  }
}
