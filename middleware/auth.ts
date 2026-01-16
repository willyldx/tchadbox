export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Pages that require authentication
  const protectedRoutes = ['/compte', '/checkout']
  
  // Pages only for guests (redirect if logged in)
  const guestOnlyRoutes = ['/auth/login', '/auth/register']
  
  // Check if current route needs protection
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  const isGuestOnlyRoute = guestOnlyRoutes.some(route => to.path.startsWith(route))
  
  // If route is protected and user is not authenticated
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
  
  // If route is guest-only and user is authenticated
  if (isGuestOnlyRoute && authStore.isAuthenticated) {
    return navigateTo('/compte')
  }
})
