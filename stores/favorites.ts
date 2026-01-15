import { defineStore } from 'pinia'
import type { Product } from '~/types'

interface FavoriteItem {
  productId: string
  title: string
  price: number
  thumbnail?: string
  category?: string
  addedAt: string
}

interface FavoritesState {
  items: FavoriteItem[]
  isLoading: boolean
  synced: boolean
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    items: [],
    isLoading: false,
    synced: false,
  }),

  getters: {
    count: (state): number => state.items.length,
    
    isEmpty: (state): boolean => state.items.length === 0,
    
    isFavorite: (state) => (productId: string): boolean => {
      return state.items.some(item => item.productId === productId)
    },

    productIds: (state): string[] => {
      return state.items.map(item => item.productId)
    },
  },

  actions: {
    async initialize() {
      // Load from localStorage first
      this.loadFromStorage()
      
      // Then sync with server if authenticated
      const authStore = useAuthStore()
      if (authStore.isAuthenticated && authStore.user) {
        await this.syncWithServer()
      }
    },

    async toggleFavorite(product: Product | FavoriteItem) {
      const productId = 'productId' in product ? product.productId : product.id
      
      if (this.isFavorite(productId)) {
        await this.removeFromFavorites(productId)
      } else {
        await this.addToFavorites(product)
      }
    },

    async addToFavorites(product: Product | Omit<FavoriteItem, 'addedAt'>) {
      const productId = 'productId' in product ? product.productId : product.id
      
      // Prevent duplicates
      if (this.isFavorite(productId)) return

      const item: FavoriteItem = {
        productId,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: 'category' in product && product.category ? product.category.name : (product as any).category,
        addedAt: new Date().toISOString(),
      }

      this.items.push(item)
      this.saveToStorage()

      // Sync with server if authenticated
      const authStore = useAuthStore()
      if (authStore.isAuthenticated && authStore.user) {
        await this.addToServerFavorites(authStore.user.id, productId)
      }
    },

    async removeFromFavorites(productId: string) {
      const index = this.items.findIndex(item => item.productId === productId)
      
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()

        // Sync with server if authenticated
        const authStore = useAuthStore()
        if (authStore.isAuthenticated && authStore.user) {
          await this.removeFromServerFavorites(authStore.user.id, productId)
        }
      }
    },

    clearAll() {
      this.items = []
      this.saveToStorage()
    },

    // LocalStorage persistence
    saveToStorage() {
      if (process.client) {
        localStorage.setItem('tchadbox-favorites', JSON.stringify(this.items))
      }
    },

    loadFromStorage() {
      if (process.client) {
        const saved = localStorage.getItem('tchadbox-favorites')
        if (saved) {
          try {
            this.items = JSON.parse(saved)
          } catch (e) {
            console.error('Failed to parse favorites from storage:', e)
            this.items = []
          }
        }
      }
    },

    // Server sync methods
    async syncWithServer() {
      const authStore = useAuthStore()
      if (!authStore.user) return

      this.isLoading = true
      const { client } = useSupabase()

      try {
        // Get server favorites
        const { data: serverFavorites, error } = await client
          .from('favorites')
          .select('product_id, created_at')
          .eq('user_id', authStore.user.id)

        if (error) {
          console.error('Failed to fetch favorites:', error)
          return
        }

        // Merge local and server favorites
        const serverIds = new Set(serverFavorites?.map(f => f.product_id) || [])
        const localIds = new Set(this.items.map(i => i.productId))

        // Add local items to server that don't exist there
        for (const item of this.items) {
          if (!serverIds.has(item.productId)) {
            await this.addToServerFavorites(authStore.user.id, item.productId)
          }
        }

        // We don't remove local items that aren't on server
        // (user might have added them offline)

        this.synced = true
      } catch (error) {
        console.error('Failed to sync favorites:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addToServerFavorites(userId: string, productId: string) {
      const { client } = useSupabase()

      try {
        await client
          .from('favorites')
          .upsert({
            user_id: userId,
            product_id: productId,
          }, {
            onConflict: 'user_id,product_id',
          })
      } catch (error) {
        console.error('Failed to add favorite to server:', error)
      }
    },

    async removeFromServerFavorites(userId: string, productId: string) {
      const { client } = useSupabase()

      try {
        await client
          .from('favorites')
          .delete()
          .match({
            user_id: userId,
            product_id: productId,
          })
      } catch (error) {
        console.error('Failed to remove favorite from server:', error)
      }
    },

    // Move item to cart
    moveToCart(productId: string) {
      const item = this.items.find(i => i.productId === productId)
      if (!item) return

      const cartStore = useCartStore()
      cartStore.addItem({
        id: item.productId,
        productId: item.productId,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        category: item.category,
      })

      // Optionally remove from favorites
      // this.removeFromFavorites(productId)
    },

    // Move all to cart
    moveAllToCart() {
      const cartStore = useCartStore()
      
      for (const item of this.items) {
        cartStore.addItem({
          id: item.productId,
          productId: item.productId,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          category: item.category,
        })
      }
    },
  },
})
