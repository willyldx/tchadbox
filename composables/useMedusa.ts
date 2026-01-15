// Medusa API Composable
import type { Product, Category, Region, Order } from '~/types'

export const useMedusa = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.medusaUrl

  // Helper for API calls
  const apiFetch = async <T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${baseUrl}/store${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // Products
  const getProducts = async (params?: {
    limit?: number
    offset?: number
    category_id?: string[]
    q?: string
  }) => {
    const searchParams = new URLSearchParams()
    
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.offset) searchParams.set('offset', params.offset.toString())
    if (params?.category_id) {
      params.category_id.forEach(id => searchParams.append('category_id[]', id))
    }
    if (params?.q) searchParams.set('q', params.q)

    const query = searchParams.toString()
    const endpoint = query ? `/products?${query}` : '/products'
    
    return apiFetch<{ products: Product[]; count: number }>(endpoint)
  }

  const getProduct = async (handle: string) => {
    return apiFetch<{ product: Product }>(`/products/${handle}`)
  }

  // Categories (Product Categories in Medusa v2)
  const getCategories = async () => {
    return apiFetch<{ product_categories: Category[] }>('/product-categories')
  }

  const getCategory = async (handle: string) => {
    return apiFetch<{ product_category: Category }>(`/product-categories/${handle}`)
  }

  // Regions
  const getRegions = async () => {
    return apiFetch<{ regions: Region[] }>('/regions')
  }

  // Cart
  const createCart = async () => {
    return apiFetch<{ cart: any }>('/carts', {
      method: 'POST',
    })
  }

  const getCart = async (cartId: string) => {
    return apiFetch<{ cart: any }>(`/carts/${cartId}`)
  }

  const addToCart = async (cartId: string, variantId: string, quantity: number = 1) => {
    return apiFetch<{ cart: any }>(`/carts/${cartId}/line-items`, {
      method: 'POST',
      body: JSON.stringify({
        variant_id: variantId,
        quantity,
      }),
    })
  }

  const updateCartItem = async (cartId: string, itemId: string, quantity: number) => {
    return apiFetch<{ cart: any }>(`/carts/${cartId}/line-items/${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    })
  }

  const removeCartItem = async (cartId: string, itemId: string) => {
    return apiFetch<{ cart: any }>(`/carts/${cartId}/line-items/${itemId}`, {
      method: 'DELETE',
    })
  }

  // Orders
  const getOrder = async (orderId: string) => {
    return apiFetch<{ order: Order }>(`/orders/${orderId}`)
  }

  const getOrderByDisplayId = async (displayId: string) => {
    // This would typically search by display_id
    return apiFetch<{ orders: Order[] }>(`/orders?display_id=${displayId}`)
  }

  return {
    // Products
    getProducts,
    getProduct,
    
    // Categories
    getCategories,
    getCategory,
    
    // Regions
    getRegions,
    
    // Cart
    createCart,
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    
    // Orders
    getOrder,
    getOrderByDisplayId,
  }
}
