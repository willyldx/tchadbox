<template>
  <div class="min-h-screen bg-[var(--color-bg)]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <CartDrawer />
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'

const authStore = useAuthStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

onMounted(async () => {
  // Restore session from Supabase token
  await authStore.checkSession()
  
  // Load cart from localStorage
  cartStore.loadFromStorage()
  
  // Sync favorites (local + server)
  favoritesStore.initialize()
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | TchadBox` : 'TchadBox - Envoyez des cadeaux au Tchad'
  }
})
</script>
