/**
 * Appels vers l'API backend (Nitro) avec le token Clerk.
 * Utiliser pour: /api/admin/*, /api/livreur/*, /api/checkout.
 */

export function useBackendApi() {
  const fetchWithAuth = async <T>(
    path: string,
    options: { method?: any; body?: any; query?: Record<string, any> } = {}
  ): Promise<T> => {
    let token = ''
    try {
      if (import.meta.client && window.Clerk?.session) {
          token = await window.Clerk.session.getToken() || ''
      }
    } catch (e) {
      console.error('Clerk token fetch failed in useBackendApi', e)
    }

    const config = useRuntimeConfig()
    const baseUrl = config.public.apiUrl || 'https://tchadbox-backend-production.up.railway.app/api'
    const url = path.startsWith('http') ? path : `${baseUrl}/${path}`
    
    return $fetch<T>(url, {
      method: options.method || 'GET',
      body: options.body,
      query: options.query,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    } as any)
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
    adminStats: () => fetchWithAuth<any>('api/admin/stats'),

    // ── Orders ──────────────────────────────────────────────
    /** GET /api/admin/orders */
    adminOrders: (params?: { limit?: number; offset?: number; status?: string; payment_status?: string; fulfillment_status?: string; search?: string }) =>
      fetchWithAuth<{ data: any[]; count: number; offset: number; limit: number; hasMore: boolean }>(
        'api/admin/orders',
        { query: params }
      ),
    /** GET /api/admin/orders/:id */
    adminOrderDetail: (id: string | number) =>
      fetchWithAuth<{ order: any }>(`api/admin/orders/${id}`),
    /** PATCH /api/admin/orders/:id */
    adminOrderUpdate: (id: string | number, body: Record<string, unknown>) =>
      fetchWithAuth<{ order: any }>(`api/admin/orders/${id}`, { method: 'PATCH', body }),

    // ── Clients ─────────────────────────────────────────────
    /** GET /api/admin/clients */
    adminClients: (params?: { limit?: number; offset?: number }) =>
      fetchWithAuth<{ data: any[]; count: number }>('api/admin/clients', { query: params }),

    // ── Stocks ──────────────────────────────────────────────
    /** GET /api/admin/stocks */
    adminStocks: () =>
      fetchWithAuth<{ data: any[] }>('api/admin/stocks'),
    /** PATCH /api/admin/stocks/:id */
    adminStockUpdate: (id: number, body: Record<string, unknown>) =>
      fetchWithAuth<{ product: any }>(`api/admin/stocks/${id}`, { method: 'PATCH', body }),

    // ── Livreurs ────────────────────────────────────────────
    /** GET /api/admin/livreurs */
    adminLivreurs: () =>
      fetchWithAuth<{ data: any[] }>('api/admin/livreurs'),
    /** POST /api/admin/livreurs */
    adminLivreurCreate: (body: Record<string, unknown>) =>
      fetchWithAuth<{ agent: any }>('api/admin/livreurs', { method: 'POST', body }),
    /** PATCH /api/admin/livreurs/:id */
    adminLivreurUpdate: (id: number, body: Record<string, unknown>) =>
      fetchWithAuth<{ agent: any }>(`api/admin/livreurs/${id}`, { method: 'PATCH', body }),
    /** DELETE /api/admin/livreurs/:id */
    adminLivreurDelete: (id: number) =>
      fetchWithAuth<{ success: boolean }>(`api/admin/livreurs/${id}`, { method: 'DELETE' }),

    // ── Finances & Team ─────────────────────────────────────
    /** GET /api/admin/finances */
    adminFinances: () => fetchWithAuth<any>('api/admin/finances'),
    /** GET /api/admin/team */
    adminTeam: () => fetchWithAuth<any>('api/admin/team'),
    /** POST /api/admin/team/promote */
    adminPromoteTeam: (targetId: string, role: string) => 
      fetchWithAuth<any>('api/admin/team/promote', { method: 'POST', body: { target_user_id: targetId, new_role: role } }),
    
    /** GET /api/livreur/orders */
    livreurOrders: (params?: { limit?: number; offset?: number; status?: string }) =>
      fetchWithAuth<{ data: any[] }>('api/livreur/orders', { query: params }),
    /** PATCH /api/livreur/orders/:id */
    livreurOrderUpdate: (id: string, body: Record<string, unknown>) =>
      fetchWithAuth(`api/livreur/orders/${id}`, { method: 'PATCH', body }),
  }
}

