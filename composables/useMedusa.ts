// Products API Composable — uses Laravel backend
export const useProducts = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl

  const getProducts = async (params?: {
    limit?: number
    category?: string
    q?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.category) searchParams.set('category', params.category)
    if (params?.q) searchParams.set('q', params.q)
    const query = searchParams.toString()
    const url = `${baseUrl}/products${query ? '?' + query : ''}`
    return $fetch<{ products: any[]; count: number }>(url)
  }

  const getProduct = async (slug: string) => {
    return $fetch<{ product: any }>(`${baseUrl}/products/${slug}`)
  }

  return { getProducts, getProduct }
}
