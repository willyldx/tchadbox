// Middleware pour protéger les routes admin
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

  // Not admin or super_admin -> forbidden
  if (!authStore.canAccessAdmin) {
    return navigateTo('/403')
  }

  // Check super_admin only routes
  const superAdminRoutes = ['/admin/equipe', '/admin/finances']
  if (superAdminRoutes.some(route => to.path.startsWith(route))) {
    if (!authStore.isSuperAdmin) {
      return navigateTo('/403')
    }
  }
})
