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

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromStorage()
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | TchadBox` : 'TchadBox - Envoyez des cadeaux au Tchad'
  }
})
</script>
