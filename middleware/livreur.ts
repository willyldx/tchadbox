// Middleware pour protéger les routes livreur
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Wait for session check if not done
  if (!authStore.sessionChecked) {
    await authStore.checkSession()
  }

  // Not authenticated -> login
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login?redirect=' + encodeURIComponent(to.fullPath))
  }

  // Not livreur, admin or super_admin -> forbidden
  if (!authStore.canAccessLivreur) {
    return navigateTo('/403')
  }
})
