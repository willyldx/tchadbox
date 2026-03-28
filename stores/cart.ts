import { defineStore } from 'pinia'
import type { CartItem } from '~/types'

type CurrencyCode = 'EUR' | 'USD' | 'XAF' | 'GBP' | 'CAD' | 'CHF'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  isHydrated: boolean
  currency: CurrencyCode
  rates: Record<Exclude<CurrencyCode, 'EUR'>, number>
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
      XAF: 655.957,  // Taux fixe CFA (garanti par la Banque Centrale)
      GBP: 0.86,
      CAD: 1.48,
      CHF: 0.94,
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
    subtotalFormatted(): string { return (this as any).formatPrice(this.subtotal) },
    shippingFormatted(): string { 
      return this.shipping === 0 ? 'Gratuit' : (this as any).formatPrice(this.shipping) 
    },
    totalFormatted(): string { return (this as any).formatPrice(this.total) },
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
      
      if (currencyCode === 'EUR') {
        return new Intl.NumberFormat('fr-FR', { 
          style: 'currency', 
          currency: 'EUR' 
        }).format(amount)
      }

      // USD, GBP, CAD, CHF — convert from EUR
      const rate = this.rates[currencyCode] ?? 1
      const finalAmount = amount * rate

      // Locale-aware formatting
      const locales: Record<string, string> = {
        USD: 'en-US',
        GBP: 'en-GB',
        CAD: 'en-CA',
        CHF: 'fr-CH',
      }

      return new Intl.NumberFormat(locales[currencyCode] || 'fr-FR', { 
        style: 'currency', 
        currency: currencyCode 
      }).format(finalAmount)
    },

    setCurrency(currency: CurrencyCode) {
      this.currency = currency
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    closeCart() {
      this.isOpen = false
    },

    addItem(product: Omit<CartItem, 'quantity' | 'id'>, quantity: number = 1) {
      const itemId = product.variantId ? `${product.productId}-${product.variantId}` : product.productId
      const existingItem = this.items.find(item => item.id === itemId)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ ...product, id: itemId, quantity })
      }
      this.saveToStorage()
      this.isOpen = true
    },

    removeItem(itemId: string) {
      this.items = this.items.filter(item => item.id !== itemId)
      this.saveToStorage()
    },

    incrementQuantity(itemId: string) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.quantity++
        this.saveToStorage()
      }
    },

    decrementQuantity(itemId: string) {
      const item = this.items.find(item => item.id === itemId)
      if (item && item.quantity > 1) {
        item.quantity--
        this.saveToStorage()
      } else {
        this.removeItem(itemId)
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
      try {
        const data = await $fetch<any>('/api/exchange-rates')
        if (data?.rates) {
          this.rates.USD = data.rates.USD ?? this.rates.USD
          this.rates.XAF = data.rates.XAF ?? this.rates.XAF
          this.rates.GBP = data.rates.GBP ?? this.rates.GBP
          this.rates.CAD = data.rates.CAD ?? this.rates.CAD
          this.rates.CHF = data.rates.CHF ?? this.rates.CHF
        }
      } catch (e) {
        console.warn('Exchange rate fetch failed, using defaults')
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },
  }
})
