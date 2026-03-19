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


onMounted(() => {
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
