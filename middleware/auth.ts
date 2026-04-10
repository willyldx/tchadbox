// Auth middleware — protects routes that require a connected user
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Wait for session check if not done yet
  if (!authStore.sessionChecked) {
    await authStore.checkSession()
  }
  
  // If user is not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
