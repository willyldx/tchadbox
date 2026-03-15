/**
 * Appels vers l'API backend (Nitro) avec le token Supabase.
 * Utiliser pour: /api/admin/*, /api/livreur/*, /api/checkout.
 */
export function useBackendApi() {
  const { getSession } = useSupabase()

  const fetchWithAuth = async <T>(
    path: string,
    options: { method?: string; body?: unknown; query?: Record<string, string | number | undefined> } = {}
  ): Promise<T> => {
    const { session } = await getSession()
    const token = session?.access_token

    const url = path.startsWith('/') ? path : `/${path}`
    return $fetch<T>(url, {
      method: options.method || 'GET',
      body: options.body,
      query: options.query,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    })
  }

  return {
    fetchWithAuth,
    /** POST /api/checkout — peut être appelé sans token (invité). */
    checkout: (body: Parameters<typeof $fetch<unknown>>[1]) =>
      $fetch<{ orderId: string; reference: string }>('/api/checkout', {
        method: 'POST',
        body,
      }),
    /** GET /api/admin/stats */
    adminStats: () => fetchWithAuth<import('~/types').AdminStats>('/api/admin/stats'),
    /** GET /api/admin/orders */
    adminOrders: (params?: { limit?: number; offset?: number; status?: string; payment_status?: string }) =>
      fetchWithAuth<{ data: any[]; count: number; offset: number; limit: number; hasMore: boolean }>(
        '/api/admin/orders',
        { query: params }
      ),
    /** GET /api/livreur/orders */
    livreurOrders: (params?: { limit?: number; offset?: number; status?: string }) =>
      fetchWithAuth<{ data: any[]; count: number; offset: number; limit: number; hasMore: boolean }>(
        '/api/livreur/orders',
        { query: params }
      ),
    /** PATCH /api/livreur/orders/:id */
    livreurOrderUpdate: (id: string, body: Record<string, unknown>) =>
      fetchWithAuth(`/api/livreur/orders/${id}`, { method: 'PATCH', body }),
  }
}
