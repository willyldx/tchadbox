import { defineStore } from 'pinia'
import type { UserRole } from '~/types'

interface AuthUser {
  id: string | number
  name: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: UserRole
  createdAt: string
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  sessionChecked: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
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

    userRole: (state): UserRole => {
      return (state.user?.role as UserRole) || 'client'
    },

    isClient(): boolean {
      return this.userRole === 'client'
    },

    isLivreur(): boolean {
      return this.userRole === 'livreur'
    },

    isAdmin(): boolean {
      return this.userRole === 'admin' || this.userRole === 'super_admin'
    },

    isSuperAdmin(): boolean {
      return this.userRole === 'super_admin'
    },

    canAccessAdmin(): boolean {
      return ['admin', 'super_admin'].includes(this.userRole)
    },

    canAccessLivreur(): boolean {
      return ['livreur', 'admin', 'super_admin'].includes(this.userRole)
    },
  },

  actions: {
    // =============================================
    // INTERNAL HELPERS
    // =============================================
    _getApiUrl(): string {
      const config = useRuntimeConfig()
      return config.public.apiUrl
    },

    _getHeaders(): Record<string, string> {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`
      }
      return headers
    },

    _parseUser(apiUser: any): AuthUser {
      const nameParts = (apiUser.name || '').split(' ')
      return {
        id: apiUser.id,
        name: apiUser.name || '',
        email: apiUser.email || '',
        firstName: apiUser.first_name || nameParts[0] || '',
        lastName: apiUser.last_name || nameParts.slice(1).join(' ') || '',
        phone: apiUser.phone || '',
        role: apiUser.role || 'client',
        createdAt: apiUser.created_at || new Date().toISOString(),
      }
    },

    _persistToken(token: string) {
      this.token = token
      if (import.meta.client) {
        localStorage.setItem('tchadbox_auth_token', token)
      }
    },

    _clearSession() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      if (import.meta.client) {
        localStorage.removeItem('tchadbox_auth_token')
      }
    },

    // =============================================
    // SESSION CHECK (on app mount)
    // =============================================
    async checkSession() {
      if (this.sessionChecked) return
      this.sessionChecked = true

      if (import.meta.server) return

      // Try to restore token from localStorage
      const savedToken = localStorage.getItem('tchadbox_auth_token')
      if (!savedToken) return

      this.token = savedToken

      try {
        const response: any = await $fetch(`${this._getApiUrl()}/user`, {
          headers: this._getHeaders(),
        })

        if (response.user) {
          this.user = this._parseUser(response.user)
          this.isAuthenticated = true
        } else {
          this._clearSession()
        }
      } catch (e) {
        // Token expired or invalid
        this._clearSession()
      }
    },

    // =============================================
    // OTP LOGIN (Passwordless — for Clients)
    // =============================================

    /**
     * Step 1: Request OTP code to be sent to email via Resend
     */
    async sendOtp(email: string, firstName?: string, lastName?: string) {
      this.isLoading = true
      this.error = null

      try {
        const response: any = await $fetch(`${this._getApiUrl()}/auth/send-otp`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: { email, first_name: firstName, last_name: lastName },
        })

        return {
          success: true,
          isNewUser: response.is_new_user,
          message: response.message,
        }
      } catch (error: any) {
        const msg = error.data?.message || error.data?.errors?.email?.[0] || 'Erreur lors de l\'envoi du code'
        this.error = msg
        return { success: false, error: msg }
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Step 2: Verify the OTP code and get authenticated
     */
    async verifyOtp(email: string, code: string, firstName?: string, lastName?: string, phone?: string) {
      this.isLoading = true
      this.error = null

      try {
        const response: any = await $fetch(`${this._getApiUrl()}/auth/verify-otp`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: { email, code, first_name: firstName, last_name: lastName, phone },
        })

        if (response.token && response.user) {
          this._persistToken(response.token)
          this.user = this._parseUser(response.user)
          this.isAuthenticated = true
          return { success: true, role: this.userRole }
        }

        this.error = 'Réponse inattendue du serveur'
        return { success: false, error: this.error }
      } catch (error: any) {
        const msg = error.data?.message || error.data?.errors?.code?.[0] || 'Code invalide ou expiré'
        this.error = msg
        return { success: false, error: msg }
      } finally {
        this.isLoading = false
      }
    },

    // =============================================
    // PASSWORD LOGIN (for Admin / Livreur)
    // =============================================
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null

      try {
        const response: any = await $fetch(`${this._getApiUrl()}/auth/login`, {
          method: 'POST',
          headers: this._getHeaders(),
          body: { email, password },
        })

        if (response.token && response.user) {
          this._persistToken(response.token)
          this.user = this._parseUser(response.user)
          this.isAuthenticated = true
          return { success: true, role: this.userRole }
        }

        this.error = 'Réponse inattendue du serveur'
        return { success: false, error: this.error }
      } catch (error: any) {
        const msg = error.data?.message || error.data?.errors?.email?.[0] || 'Erreur de connexion'
        this.error = msg
        return { success: false, error: msg }
      } finally {
        this.isLoading = false
      }
    },

    // =============================================
    // LOGOUT
    // =============================================
    async logout() {
      try {
        if (this.token) {
          await $fetch(`${this._getApiUrl()}/auth/logout`, {
            method: 'POST',
            headers: this._getHeaders(),
          }).catch(() => {})
        }
      } finally {
        this._clearSession()

        const cartStore = useCartStore()
        if (cartStore && typeof cartStore.clearCart === 'function') {
          cartStore.clearCart()
        }

        navigateTo('/')
      }
    },

    // =============================================
    // PROFILE UPDATE
    // =============================================
    async updateProfile(updates: Partial<{ firstName: string; lastName: string; phone: string }>) {
      if (!this.user || !this.token) return { success: false, error: 'Non connecté' }

      // Update locally for now (backend profile update endpoint can be added later)
      if (updates.firstName) this.user.firstName = updates.firstName
      if (updates.lastName) this.user.lastName = updates.lastName
      if (updates.phone) this.user.phone = updates.phone

      return { success: true }
    },

    // =============================================
    // HELPERS
    // =============================================
    clearError() {
      this.error = null
    },

    getRedirectPath(): string {
      if (!this.user) return '/'

      switch (this.userRole) {
        case 'super_admin':
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
