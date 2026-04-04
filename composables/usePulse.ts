import { useCookie } from '#app'

export const usePulse = () => {
  // Store a cookie with maximum 10 recent items
  const pulseContext = useCookie<{ viewed_ids: number[], viewed_categories: string[] }>('tchadbox_pulse', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    default: () => ({ viewed_ids: [], viewed_categories: [] })
  })

  // Add a product to the tracking context
  const trackProductView = (productId: number, category: string) => {
    // Only keep last 10
    const ids = pulseContext.value.viewed_ids.filter(id => id !== productId)
    ids.unshift(productId)
    if (ids.length > 10) ids.pop()

    const cats = pulseContext.value.viewed_categories.filter(c => c !== category && c)
    if (category) cats.unshift(category)
    if (cats.length > 5) cats.pop()

    pulseContext.value = {
      viewed_ids: ids,
      viewed_categories: cats
    }
  }

  return {
    pulseContext,
    trackProductView
  }
}
