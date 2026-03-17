import { defineStore } from 'pinia'
import type { Customer, Address, UserRole } from '~/types'
import { useAuth, useUser, useClerk } from '@clerk/vue'

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
    isLoading: true, // Clerk starts loading immediately
    error: null,
    sessionChecked: false,
  }),

  // =============================================
  // GETTERS (Mostly untouched, driven by internal state)
  // =============================================
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

    userRole: (state): UserRole => {
      if (state.user?.role) {
          return state.user.role as UserRole;
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

    async getApiHeaders() {
        let token = ''
        try {
            if (import.meta.client && window.Clerk && window.Clerk.session) {
                token = await window.Clerk.session.getToken() || ''
            }
        } catch(e) {
            console.error("Clerk Token fetch failed", e)
        }

        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }
        return headers
    },

    // =============================================
    // CORE INITIALIZATION WITH CLERK
    // =============================================
    async checkSession() {
        if (this.sessionChecked) return

        if (import.meta.server) {
            return
        }

        // Wait for window.Clerk to be ready
        if (window.Clerk) {
            this.syncWithClerk(window.Clerk.session !== null, window.Clerk.user)
            this.sessionChecked = true
            this.isLoading = false
        }
    },

    syncWithClerk(isSignedIn: boolean | undefined, clerkUser: any) {
        this.isAuthenticated = !!isSignedIn

        if (isSignedIn && clerkUser) {
            // Extract standard metadata. For roles, you can set them in Clerk dashboard
            // under User -> Public Metadata, e.g., { "role": "admin" }
            const metadataRole = clerkUser.publicMetadata?.role as UserRole | undefined || 'client'

            this.user = {
                id: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                firstName: clerkUser.firstName || '',
                lastName: clerkUser.lastName || '',
                phone: clerkUser.primaryPhoneNumber?.phoneNumber || '',
                role: metadataRole,
                createdAt: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString() : new Date().toISOString(),
                addresses: [], 
            }

            // Sync with backend (fetch fresh data from Laravel using Clerk Token)
            this.fetchUserProfile()
            
            // Link Convex Cart
            const { mergeOnLogin } = useCart()
            mergeOnLogin(this.user.id).catch(console.error)
            
        } else {
            this.user = null
        }
    },

    // =============================================
    // MODIFIED AUTH ACTIONS (Using Clerk)
    // =============================================
    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null

      try {
        if (!window.Clerk) throw new Error("Clerk is not loaded")
        
        // Attempt Sign In via Clerk core API
        const signInAttempt = await window.Clerk!.client!.signIn.create({
            identifier: email,
            password: password
        })

        if (signInAttempt.status === 'complete') {
            await window.Clerk.setActive({ session: signInAttempt.createdSessionId })
            this.syncWithClerk(true, window.Clerk.user)
            return { success: true, role: this.userRole }
        } else if (signInAttempt.status === 'needs_first_factor' || signInAttempt.status === 'needs_second_factor') {
            this.error = "Vérification d'email ou 2FA requise."
            return { success: false, error: this.error, requiresAction: true, status: signInAttempt.status }
        } else {
            this.error = "Action supplémentaire requise pour la connexion: " + signInAttempt.status
            return { success: false, error: this.error }
        }
      } catch (error: any) {
        // Clerk throws arrays of errors
        this.error = error.errors?.[0]?.message || 'Erreur de connexion'
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
        if (!window.Clerk) throw new Error("Clerk is not loaded")
        
        // Custom Sign Up flow using Clerk API
        const signUpAttempt = await window.Clerk!.client!.signUp.create({
            emailAddress: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            // phone requires phone verification in Clerk settings if strictly passed
        })

        await window.Clerk!.client!.signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        
        if (signUpAttempt.status === 'complete') {
            await window.Clerk.setActive({ session: signUpAttempt.createdSessionId })
            this.syncWithClerk(true, window.Clerk.user)
            return { success: true, requiresConfirmation: false }
        } else if (signUpAttempt.status === 'missing_requirements' || signUpAttempt.unverifiedFields.includes('email_address')) {
            // Usually returns 'missing_requirements' waiting for email code
            return { success: true, requiresConfirmation: true, pendingVerificationId: signUpAttempt.id }
        } else {
            this.error = "Action supplémentaire requise lors de l'inscription: " + signUpAttempt.status
            return { success: false, error: this.error }
        }

      } catch (error: any) {
        this.error = error.errors?.[0]?.message || 'Erreur lors de l\'inscription'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async verifyEmail(code: string) {
        this.isLoading = true
        this.error = null
        try {
            if (!window.Clerk) throw new Error("Clerk is not loaded")
            const completeSignUp = await window.Clerk!.client!.signUp.attemptEmailAddressVerification({ code })
            
            if (completeSignUp.status === 'complete') {
                 await window.Clerk.setActive({ session: completeSignUp.createdSessionId })
                 this.syncWithClerk(true, window.Clerk.user)
                 return { success: true }
            } else {
                 this.error = "Code invalide ou expiré."
                 return { success: false, error: this.error }
            }
        } catch (error: any) {
            this.error = error.errors?.[0]?.message || 'Erreur de vérification'
            return { success: false, error: this.error }
        } finally {
            this.isLoading = false
        }
    },

    async fetchUserProfile() {
         // With Clerk, frontend holds the truth for Identity.
         // We hit Laravel /api/user mainly to sync data if needed 
         // or get Laravel specific relationships (e.g. Addresses)
         try {
            const headers = await this.getApiHeaders();
            const response: any = await $fetch(`${this.getApiUrl()}/user`, {
                method: 'GET',
                headers: headers
            })
            // Update local user with fresh Laravel data if needed
            // Example: this.user.addresses = response.addresses;
         } catch(e) {
             console.log("Could not fetch Laravel profile (expected if user just created)", e);
         }
    },


    async updateProfile(updates: Partial<{
      firstName: string
      lastName: string
      phone: string
    }>) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      try {
        if (window.Clerk && window.Clerk.user) {
            await window.Clerk.user.update({
                firstName: updates.firstName,
                lastName: updates.lastName
            })
            // Update local state
            if (updates.firstName) this.user.firstName = updates.firstName
            if (updates.lastName) this.user.lastName = updates.lastName
            return { success: true }
        }
        return { success: false, error: "Clerk user object missing" }
      } catch(e: any) {
          return { success: false, error: e.errors?.[0]?.message || 'Erreur API' }
      }
    },

    async updateUserRole(userId: string, newRole: UserRole) {
      // NOTE: With Clerk, changing roles usually requires a Backend Admin API
      // to hit the Clerk Backend SDK directly and set `publicMetadata.role`.
      // Un utilisateur ne peut pas changer son propre rôle frontend.
      return { success: false, error: 'Non implémenté sur le backend pour Clerk' }
    },

    async logout() {
      try {
        if (window.Clerk) {
           await window.Clerk.signOut()
        }
      } catch (e) {
          console.error("Logout error", e)
      } finally {
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
       // Using Clerk API
       try {
           if (!window.Clerk) throw new Error("Clerk not loaded")
           await window.Clerk!.client!.signIn.create({
               strategy: 'reset_password_email_code',
               identifier: email,
           })
           return { success: true }
       } catch(e: any) {
           return { success: false, error: e.errors?.[0]?.message || 'Erreur' }
       }
    },

    clearError() {
      this.error = null
    },

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
