<template>
  <div class="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h1 class="text-xl font-semibold text-[var(--color-text)] mb-2">Connexion en cours...</h1>
      <p class="text-[var(--color-text-muted)]">Veuillez patienter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClerk } from '@clerk/vue'

definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
  const { handleRedirectCallback } = useClerk()
  
  try {
    // Let Clerk finalize the OAuth process (exchange code for session, set cookie)
    await handleRedirectCallback({
        redirectUrl: route.query.redirect as string || '/compte'
    })
    
    // Check session to pull state down into Pinia
    await authStore.checkSession()
    
    // Redirect logic is typically handled by Clerk, but just in case
    const redirect = route.query.redirect as string || '/compte'
    navigateTo(redirect)
  } catch (error) {
    console.error('Callback error:', error)
    navigateTo('/auth/login?error=unknown')
  }
})
</script>
