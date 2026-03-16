import { defineStore } from 'pinia'
import type { Customer, Address, UserRole } from '~/types'

interface AuthState {
  user: Customer | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  sessionChecked: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    sessionChecked: false,
  }),

  getters: {
    fullName: (state): string => {
      if (!state.user) return ''
      return `${state.user.firstName} ${state.user.lastName || ''}`.trim()
    },

    initials: (state): string => {
      if (!state.user) return '?'
      const first = state.user.firstName?.[0] || ''
      const last = state.user.lastName?.[0] || ''
      return (first + last).toUpperCase() || '?'
    },

    defaultAddress: (state): Address | null => {
      if (!state.user?.addresses) return null
      return state.user.addresses.find(a => a.isDefault) || state.user.addresses[0] || null
    },

    hasAddresses: (state): boolean => {
      return (state.user?.addresses?.length || 0) > 0
    },

    // =============================================
    // ROLE GETTERS (Adapté pour Laravel Spatie)
    // =============================================
    userRole: (state): UserRole => {
      // Dans Spatie, les rôles sont un tableau. On prend le premier.
      if (state.user?.roles && state.user.roles.length > 0) {
          return state.user.roles[0].name as UserRole;
      }
      return 'client'
    },

    isClient(): boolean {
      return this.userRole === 'client'
    },

    isLivreur(): boolean {
      return this.userRole === 'livreur'
    },

    isAdmin(): boolean {
      return this.userRole === 'admin' || this.userRole === 'super-admin'
    },

    isSuperAdmin(): boolean {
      return this.userRole === 'super-admin'
    },

    canAccessAdmin(): boolean {
      return ['admin', 'super-admin'].includes(this.userRole)
    },

    canAccessLivreur(): boolean {
      return ['livreur', 'admin', 'super-admin'].includes(this.userRole)
    },

    canManageTeam(): boolean {
      return this.isSuperAdmin
    },

    canViewFinances(): boolean {
      return this.isSuperAdmin
    },
  },

  actions: {
    getApiUrl() {
        const config = useRuntimeConfig()
        return config.public.apiUrl
    },

    getApiHeaders() {
        const token = useCookie('auth_token').value
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
        return headers
    },

    async checkSession() {
      if (this.sessionChecked) return

      const token = useCookie('auth_token').value
      
      if (token) {
          await this.fetchUserProfile()
      } else {
          this.sessionChecked = true
      }
    },

    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null

      try {
        const response: any = await $fetch(`${this.getApiUrl()}/login`, {
            method: 'POST',
            body: { email, password },
            headers: {
               'Accept': 'application/json'
            }
        })

        if (response.token) {
            const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }) // 7 jours
            tokenCookie.value = response.token
            
            this.mapLaravelUser(response.user)
            this.isAuthenticated = true
            return { success: true, role: this.userRole }
        }

        return { success: false, error: 'Token manquant dans la réponse' }
      } catch (error: any) {
        this.error = error.response?._data?.message || 'Erreur de connexion'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async register(data: {
      email: string
      password: string
      firstName: string
      lastName: string
      phone?: string
    }) {
      this.isLoading = true
      this.error = null

      try {
        const nomComplet = `${data.firstName} ${data.lastName}`.trim()
        const response: any = await $fetch(`${this.getApiUrl()}/register`, {
            method: 'POST',
            body: { 
                name: nomComplet,
                email: data.email, 
                password: data.password 
            },
            headers: {
               'Accept': 'application/json'
            }
        })

        if (response.token) {
             const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })
             tokenCookie.value = response.token
             
             this.mapLaravelUser(response.user)
             this.isAuthenticated = true
             return { success: true, requiresConfirmation: false }
        }

        return { success: false, error: 'Erreur lors de l\'inscription' }
      } catch (error: any) {
        this.error = error.response?._data?.message || 'Erreur lors de l\'inscription'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserProfile() {
      const token = useCookie('auth_token').value
      if (!token) {
          this.sessionChecked = true
          return
      }

      try {
        const response: any = await $fetch(`${this.getApiUrl()}/user`, {
            method: 'GET',
            headers: this.getApiHeaders()
        })
        
        if (response.user) {
            this.mapLaravelUser(response.user)
            this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        // Token invalide ou expiré
        useCookie('auth_token').value = null
        this.user = null
        this.isAuthenticated = false
      } finally {
        this.sessionChecked = true
      }
    },

    mapLaravelUser(laravelUser: any) {
        // Adaptateur pour transformer le User Laravel en Customer Nuxt
        const nameParts = laravelUser.name ? laravelUser.name.split(' ') : ['']
        const firstName = nameParts[0]
        const lastName = nameParts.slice(1).join(' ')

        this.user = {
            id: laravelUser.id.toString(),
            email: laravelUser.email,
            firstName: firstName,
            lastName: lastName,
            phone: '', // Ajouter migration dans laravel plus tard si nécessaire
            roles: laravelUser.roles || [], // Tableau des rôles spatie
            role: (laravelUser.roles && laravelUser.roles.length > 0) ? laravelUser.roles[0].name : 'client',
            createdAt: laravelUser.created_at,
            addresses: [], // A implémenter plus tard sur le backend si besoin
        }
    },

    async updateProfile(updates: Partial<{
      firstName: string
      lastName: string
      phone: string
    }>) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      // TODO: Implémenter l'endpoint Côté Laravel
      return { success: false, error: 'Non implémenté sur le backend' }
    },

    async updateUserRole(userId: string, newRole: UserRole) {
      if (!this.isSuperAdmin) {
        return { success: false, error: 'Permission refusée' }
      }
      // TODO: Implémenter l'endpoint Côté Laravel
      return { success: false, error: 'Non implémenté sur le backend' }
    },

    async logout() {
      try {
        if (this.isAuthenticated) {
            await $fetch(`${this.getApiUrl()}/logout`, {
                method: 'POST',
                headers: this.getApiHeaders()
            })
        }
      } catch (e) {
          console.error("Logout error", e)
      } finally {
        useCookie('auth_token').value = null
        this.user = null
        this.isAuthenticated = false
        this.error = null

        const cartStore = useCartStore()
        if (cartStore && typeof cartStore.clearCart === 'function') {
           cartStore.clearCart()
        }

        navigateTo('/')
      }
    },

    async requestPasswordReset(email: string) {
       // TODO: Implémenter coté Laravel
       return { success: false, error: 'Non implémenté sur le backend' }
    },

    clearError() {
      this.error = null
    },

    // =============================================
    // REDIRECT HELPER
    // =============================================
    getRedirectPath(): string {
      if (!this.user) return '/'

      switch (this.userRole) {
        case 'super-admin':
        case 'admin':
          return '/admin'
        case 'livreur':
          return '/livreur'
        default:
          return '/compte'
      }
    },
  },
})
