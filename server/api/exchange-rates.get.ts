export default defineEventHandler(async (event) => {
  try {
    // On récupère les taux avec l'EUR comme base (monnaie de référence de TchadBox)
    const response = await $fetch<any>('https://open.er-api.com/v6/latest/EUR')
    
    if (!response || response.result !== 'success') {
      throw new Error('Failed to fetch exchange rates')
    }

    return {
      success: true,
      base: 'EUR',
      rates: {
        USD: response.rates.USD,
        XAF: 655.957, // Le XAF est à taux fixe par rapport à l'EUR (parité CFA)
        XOF: 655.957,
      },
      updated_at: response.time_last_update_utc
    }
  } catch (error) {
    console.error('[ExchangeRate] Error:', error)
    // Fallback sur des taux de secours si l'API est indisponible
    return {
      success: false,
      base: 'EUR',
      rates: {
        USD: 1.08,
        XAF: 655.957,
        XOF: 655.957
      }
    }
  }
})
