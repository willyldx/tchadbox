import { defineStore } from 'pinia'
import type { CartItem } from '~/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    isLoading: false,
  }),

  getters: {
    itemCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    
    shippingCost: (): number => {
      return 5 // Fixed shipping to N'Djamena
    },
    
    total(): number {
      return this.subtotal + this.shippingCost
    },
    
    // Format prices
    subtotalFormatted(): string {
      return formatEUR(this.subtotal)
    },
    
    shippingFormatted(): string {
      return formatEUR(this.shippingCost)
    },
    
    totalFormatted(): string {
      return formatEUR(this.total)
    },
    
    totalFCFA(): string {
      return formatFCFA(this.total * 656) // EUR to FCFA
    },

    isEmpty: (state): boolean => state.items.length === 0,
  },

  actions: {
    addItem(product: Omit<CartItem, 'quantity'>, quantity: number = 1) {
      const existingItem = this.items.find(item => item.productId === product.productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }
      
      this.saveToStorage()
      this.isOpen = true // Open cart drawer when adding
      
      // Auto close after 3s
      setTimeout(() => {
        this.isOpen = false
      }, 3000)
    },

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

    incrementQuantity(productId: string) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        item.quantity++
        this.saveToStorage()
      }
    },

    decrementQuantity(productId: string) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
          this.saveToStorage()
        } else {
          this.removeItem(productId)
        }
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    // LocalStorage persistence
    saveToStorage() {
      if (process.client) {
        localStorage.setItem('tchadbox-cart', JSON.stringify(this.items))
      }
    },

    loadFromStorage() {
      if (process.client) {
        const saved = localStorage.getItem('tchadbox-cart')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to parse cart from storage:', e)
            this.items = []
          }
        }
      }
    },
  },
})

// Helper functions
function formatEUR(amount: number): string {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(amount)
}

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' FCFA'
}
