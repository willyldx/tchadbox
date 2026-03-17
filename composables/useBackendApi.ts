/**
 * Appels vers l'API backend (Nitro) avec le token Clerk.
 * Utiliser pour: /api/admin/*, /api/livreur/*, /api/checkout.
 */
import { useAuth } from '@clerk/vue'

export function useBackendApi() {
  let auth: any = null
  if (import.meta.client) {
    try {
        const { useAuth } = require('@clerk/vue')
        auth = useAuth()
    } catch(e) {}
  }

  const fetchWithAuth = async <T>(
    path: string,
    options: { method?: any; body?: any; query?: Record<string, any> } = {}
  ): Promise<T> => {
    let token = ''
    try {
      if (auth && auth.getToken) {
          token = (await auth.getToken.value()) || ''
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
    /** GET /api/admin/orders */
    adminOrders: (params?: { limit?: number; offset?: number; status?: string; payment_status?: string }) =>
      fetchWithAuth<{ data: any[]; count: number; offset: number; limit: number; hasMore: boolean }>(
        'api/admin/orders',
        { query: params }
      ),
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
