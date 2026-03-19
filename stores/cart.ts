import { defineStore } from 'pinia'
import type { CartItem } from '~/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  isHydrated: boolean
  currency: 'EUR' | 'USD' | 'XAF'
  rates: {
    USD: number
    XAF: number
  }
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    isLoading: false,
    isHydrated: false,
    currency: 'EUR',
    rates: {
      USD: 1.08, // Default fallback
      XAF: 655.957,
    },
  }),

  getters: {
    // ... itemCount unchanged ...
    
    // Multi-currency conversions
    totalXAF(): number {
      return Math.round(this.total * this.rates.XAF)
    },

    totalUSD(): number {
      return Number((this.total * this.rates.USD).toFixed(2))
    },

    // ... isEmpty and other getters unchanged ...
  },

  actions: {
    async fetchRates() {
      try {
        const { rates } = await $fetch<{ rates: any }>('/api/exchange-rates')
        if (rates) {
          this.rates.USD = rates.USD
          this.rates.XAF = rates.XAF
        }
      } catch (e) {
        console.warn('Failed to fetch real-time rates, using fallbacks.')
      }
    },

    formatPrice(amount: number): string {
      const currencyCode = this.currency
      
      if (currencyCode === 'XAF') {
        const xafAmount = Math.round(amount * this.rates.XAF)
        return new Intl.NumberFormat('fr-FR').format(xafAmount) + ' FCFA'
      }
      
      const rate = currencyCode === 'USD' ? this.rates.USD : 1
      const finalAmount = amount * rate

      return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: currencyCode 
      }).format(finalAmount)
    },
    // ... rest of actions unchanged ...

    addItem(product: Omit<CartItem, 'quantity'>, quantity: number = 1) {
      const existingItem = this.items.find(item => item.productId === product.productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }
      
      this.saveToStorage()
      this.isOpen = true
      
      setTimeout(() => {
        this.isOpen = false
      }, 3000)
    },
// ... rest of methods unchanged, but ensure saveToStorage is called
    removeItem(productId: string) {
      const index = this.items.findIndex(item => item.productId === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()
      }
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.saveToStorage()
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },

    saveToStorage() {
      if (process.client) {
        localStorage.setItem('tchadbox-cart-v2', JSON.stringify(this.items))
      }
    },

    loadFromStorage() {
      if (process.client) {
        const saved = localStorage.getItem('tchadbox-cart-v2')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to parse cart:', e)
            this.items = []
          }
        }
        this.isHydrated = true
      }
    },
  },
})
