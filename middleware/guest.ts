// Guest middleware — prevents connected users from accessing guest-only pages (login, register)
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Wait for session check if not done yet
  if (!authStore.sessionChecked) {
    await authStore.checkSession()
  }
  
  // If user is already authenticated, redirect them to their dashboard
  if (authStore.isAuthenticated) {
    return navigateTo(authStore.getRedirectPath())
  }
})
