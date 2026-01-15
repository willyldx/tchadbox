export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on client side
  if (process.server) return

  const authStore = useAuthStore()
  
  // Check session if not already done
  if (!authStore.sessionChecked) {
    await authStore.checkSession()
  }

  // Protected routes
  const protectedRoutes = [
    '/compte',
    '/checkout',
  ]

  // Check if current route requires auth
  const requiresAuth = protectedRoutes.some(route => to.path.startsWith(route))

  if (requiresAuth && !authStore.isAuthenticated) {
    // Store intended destination
    const redirectTo = to.fullPath
    
    return navigateTo({
      path: '/auth/login',
      query: { redirect: redirectTo },
    })
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/auth/login', '/auth/register']
  if (authRoutes.includes(to.path) && authStore.isAuthenticated) {
    return navigateTo('/compte')
  }
})
