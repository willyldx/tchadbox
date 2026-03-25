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
      USD: 1.08,
      XAF: 655.957,
    },
  }),

  getters: {
    isEmpty(): boolean {
      return this.items.length === 0
    },

    itemCount(): number {
      return this.items.reduce((total, item) => total + item.quantity, 0)
    },

    subtotal(): number {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    shipping(): number {
      if (this.isEmpty) return 0
      // Gratuit à partir de 150€
      return this.subtotal >= 150 ? 0 : 15
    },

    total(): number {
      return this.subtotal + this.shipping
    },

    // Progress to free shipping (0 to 100)
    freeShippingThreshold(): number {
      return 150
    },

    freeShippingProgress(): number {
      return Math.min(100, (this.subtotal / this.freeShippingThreshold) * 100)
    },

    amountToFreeShipping(): number {
      return Math.max(0, this.freeShippingThreshold - this.subtotal)
    },

    // Multi-currency conversions
    totalXAF(): number {
      return Math.round(this.total * this.rates.XAF)
    },

    // Formatted strings for UI (Consolidated)
    subtotalFormatted(): string { return this.formatPrice(this.subtotal) },
    shippingFormatted(): string { 
      return this.shipping === 0 ? 'Gratuit' : this.formatPrice(this.shipping) 
    },
    totalFormatted(): string { return this.formatPrice(this.total) },
    totalFCFA(): string { 
      return new Intl.NumberFormat('fr-FR').format(this.totalXAF) + ' FCFA'
    },

    // Aliases for compatibility with older components
    formattedSubtotal(): string { return this.subtotalFormatted },
    formattedShipping(): string { return this.shippingFormatted },
    formattedTotal(): string { return this.totalFormatted }
  },

  actions: {
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

    setCurrency(currency: 'EUR' | 'USD' | 'XAF') {
      this.currency = currency
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    closeCart() {
      this.isOpen = false
    },

    addItem(product: Omit<CartItem, 'quantity'>, quantity: number = 1) {
      const existingItem = this.items.find(item => item.productId === product.productId)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, quantity })
      }
      this.saveToStorage()
      this.isOpen = true
    },

    removeItem(productId: string) {
      this.items = this.items.filter(item => item.productId !== productId)
      this.saveToStorage()
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
      if (item && item.quantity > 1) {
        item.quantity--
        this.saveToStorage()
      } else {
        this.removeItem(productId)
      }
    },

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
            this.items = []
          }
        }
        this.isHydrated = true
      }
    },

    async fetchRates() {
      // Fetch live EUR→USD and EUR→XAF rates
      // Falls back to hardcoded defaults on failure
      try {
        const data = await $fetch<any>('https://api.exchangerate-api.com/v4/latest/EUR', {
          timeout: 5000,
        })
        if (data?.rates) {
          this.rates.USD = data.rates.USD ?? this.rates.USD
          this.rates.XAF = data.rates.XAF ?? this.rates.XAF
        }
      } catch (e) {
        // Keep hardcoded defaults
        console.warn('Exchange rate fetch failed, using defaults')
      }
    }
  }
})
