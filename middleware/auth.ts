// Auth middleware — protects /compte and /checkout routes
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Wait for session check if not done yet
  if (!authStore.sessionChecked) {
    await authStore.checkSession()
  }

  // Pages that require authentication
  const protectedRoutes = ['/compte', '/checkout']
  
  // Pages only for guests (redirect if logged in)
  const guestOnlyRoutes = ['/auth/login', '/auth/register']
  
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  const isGuestOnlyRoute = guestOnlyRoutes.some(route => to.path.startsWith(route))
  
  // If route is protected and user is not authenticated
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // If route is guest-only and user is authenticated, redirect to account
  if (isGuestOnlyRoute && authStore.isAuthenticated) {
    return navigateTo(authStore.getRedirectPath())
  }
})
