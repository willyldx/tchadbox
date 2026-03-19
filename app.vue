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
import { useAuth, useUser } from '@clerk/vue'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'

const authStore = useAuthStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

if (import.meta.client) {
  // Clerk reactive refs
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth()
  const { isLoaded: isUserLoaded, user: clerkUser } = useUser()

  // Watch Clerk auth state and sync to Pinia
  watch(
    [isAuthLoaded, isUserLoaded, isSignedIn, clerkUser],
    ([authLoaded, userLoaded, signedIn, user]) => {
      if (authLoaded && (!signedIn || userLoaded)) {
        authStore.syncWithClerk(signedIn, user)
        authStore.sessionChecked = true
        authStore.isLoading = false
      }
    },
    { immediate: true }
  )
}


onMounted(async () => {
  // 1. Initialiser le panier d'abord pour l'UI
  cartStore.loadFromStorage()
  
  // 2. Charger les taux en temps réel pour corriger les prix
  await cartStore.fetchRates()
  
  // 3. Charger les favoris
  favoritesStore.initialize()
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | TchadBox` : 'TchadBox - Envoyez des cadeaux au Tchad'
  }
})
</script>
