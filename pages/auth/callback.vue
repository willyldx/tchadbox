<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <h1 class="text-xl font-semibold text-stone-800 mb-2">Connexion en cours...</h1>
      <p class="text-stone-500">Veuillez patienter</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const route = useRoute()

onMounted(async () => {
  // Handle the OAuth callback
  const { client } = useSupabase()
  
  try {
    // Get session from URL
    const { data: { session }, error } = await client.auth.getSession()
    
    if (error) {
      console.error('Auth callback error:', error)
      navigateTo('/auth/login?error=callback_failed')
      return
    }
    
    if (session?.user) {
      // Fetch or create user profile
      await authStore.fetchUserProfile(session.user.id)
      
      // Redirect to intended page or account
      const redirect = route.query.redirect as string || '/compte'
      navigateTo(redirect)
    } else {
      navigateTo('/auth/login')
    }
  } catch (error) {
    console.error('Callback error:', error)
    navigateTo('/auth/login?error=unknown')
  }
})
</script>
