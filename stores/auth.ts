import { defineStore } from 'pinia'
import type { Customer, Address } from '~/types'

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
      return `${state.user.firstName} ${state.user.lastName}`.trim()
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
  },

  actions: {
    async checkSession() {
      if (this.sessionChecked) return
      
      const { getSession, getUser } = useSupabase()
      
      try {
        const { session } = await getSession()
        
        if (session?.user) {
          await this.fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Session check failed:', error)
      } finally {
        this.sessionChecked = true
      }
    },

    async login(email: string, password: string) {
      this.isLoading = true
      this.error = null
      
      const { signIn } = useSupabase()
      
      try {
        const { data, error } = await signIn(email, password)
        
        if (error) {
          this.error = translateAuthError(error.message)
          return { success: false, error: this.error }
        }

        if (data.user) {
          await this.fetchUserProfile(data.user.id)
          return { success: true }
        }

        return { success: false, error: 'Erreur de connexion' }
      } catch (error: any) {
        this.error = error.message || 'Erreur de connexion'
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
      
      const { signUp, client } = useSupabase()
      
      try {
        const { data: authData, error: authError } = await signUp(
          data.email,
          data.password,
          {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
          }
        )
        
        if (authError) {
          this.error = translateAuthError(authError.message)
          return { success: false, error: this.error }
        }

        if (authData.user) {
          // Create profile in profiles table
          const { error: profileError } = await client
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: data.email,
              first_name: data.firstName,
              last_name: data.lastName,
              phone: data.phone,
            })

          if (profileError) {
            console.error('Profile creation error:', profileError)
          }

          // Fetch the created profile
          await this.fetchUserProfile(authData.user.id)
          
          return { success: true, requiresConfirmation: !authData.session }
        }

        return { success: false, error: 'Erreur lors de l\'inscription' }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de l\'inscription'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserProfile(userId: string) {
      const { client } = useSupabase()
      
      try {
        const { data: profile, error } = await client
          .from('profiles')
          .select(`
            *,
            addresses (*)
          `)
          .eq('id', userId)
          .single()

        if (error) {
          console.error('Profile fetch error:', error)
          return
        }

        if (profile) {
          this.user = {
            id: profile.id,
            email: profile.email,
            firstName: profile.first_name,
            lastName: profile.last_name,
            phone: profile.phone,
            addresses: (profile.addresses || []).map((a: any) => ({
              id: a.id,
              firstName: a.first_name,
              lastName: a.last_name,
              address1: a.address_1,
              address2: a.address_2,
              city: a.city,
              province: a.province,
              postalCode: a.postal_code,
              country: a.country,
              phone: a.phone,
              isDefault: a.is_default,
            })),
          }
          this.isAuthenticated = true
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    },

    async updateProfile(updates: Partial<{
      firstName: string
      lastName: string
      phone: string
    }>) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      
      this.isLoading = true
      const { client } = useSupabase()
      
      try {
        const { error } = await client
          .from('profiles')
          .update({
            first_name: updates.firstName,
            last_name: updates.lastName,
            phone: updates.phone,
            updated_at: new Date().toISOString(),
          })
          .eq('id', this.user.id)

        if (error) {
          return { success: false, error: error.message }
        }

        // Update local state
        if (updates.firstName) this.user.firstName = updates.firstName
        if (updates.lastName) this.user.lastName = updates.lastName
        if (updates.phone) this.user.phone = updates.phone

        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async addAddress(address: Omit<Address, 'id'>) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      
      const { client } = useSupabase()
      
      try {
        // If this is the default address, unset other defaults
        if (address.isDefault) {
          await client
            .from('addresses')
            .update({ is_default: false })
            .eq('user_id', this.user.id)
        }

        const { data, error } = await client
          .from('addresses')
          .insert({
            user_id: this.user.id,
            first_name: address.firstName,
            last_name: address.lastName,
            address_1: address.address1,
            address_2: address.address2,
            city: address.city,
            province: address.province,
            postal_code: address.postalCode,
            country: address.country,
            phone: address.phone,
            is_default: address.isDefault,
          })
          .select()
          .single()

        if (error) {
          return { success: false, error: error.message }
        }

        // Refresh profile to get updated addresses
        await this.fetchUserProfile(this.user.id)
        
        return { success: true, address: data }
      } catch (error: any) {
        return { success: false, error: error.message }
      }
    },

    async updateAddress(addressId: string, updates: Partial<Address>) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      
      const { client } = useSupabase()
      
      try {
        if (updates.isDefault) {
          await client
            .from('addresses')
            .update({ is_default: false })
            .eq('user_id', this.user.id)
        }

        const { error } = await client
          .from('addresses')
          .update({
            first_name: updates.firstName,
            last_name: updates.lastName,
            address_1: updates.address1,
            address_2: updates.address2,
            city: updates.city,
            province: updates.province,
            postal_code: updates.postalCode,
            country: updates.country,
            phone: updates.phone,
            is_default: updates.isDefault,
          })
          .eq('id', addressId)

        if (error) {
          return { success: false, error: error.message }
        }

        await this.fetchUserProfile(this.user.id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      }
    },

    async deleteAddress(addressId: string) {
      if (!this.user) return { success: false, error: 'Non connecté' }
      
      const { client } = useSupabase()
      
      try {
        const { error } = await client
          .from('addresses')
          .delete()
          .eq('id', addressId)

        if (error) {
          return { success: false, error: error.message }
        }

        await this.fetchUserProfile(this.user.id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      }
    },

    async logout() {
      const { signOut } = useSupabase()
      
      try {
        await signOut()
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.error = null
        
        // Clear cart on logout
        const cartStore = useCartStore()
        cartStore.clearCart()
        
        // Redirect to home
        navigateTo('/')
      }
    },

    async requestPasswordReset(email: string) {
      this.isLoading = true
      const { client } = useSupabase()
      
      try {
        const { error } = await client.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) {
          return { success: false, error: translateAuthError(error.message) }
        }

        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    clearError() {
      this.error = null
    },
  },
})

// Helper function to translate auth errors
function translateAuthError(message: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'Email ou mot de passe incorrect',
    'Email not confirmed': 'Veuillez confirmer votre email',
    'User already registered': 'Un compte existe déjà avec cet email',
    'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
    'Unable to validate email address: invalid format': 'Format d\'email invalide',
    'For security purposes, you can only request this after': 'Pour des raisons de sécurité, veuillez patienter avant de réessayer',
  }

  for (const [key, value] of Object.entries(translations)) {
    if (message.includes(key)) return value
  }

  return message
}
