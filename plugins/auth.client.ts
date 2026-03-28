// Auth plugin — restores user session on app load
// Replaces the old Clerk plugin with Sanctum token-based auth
export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Restore session from stored token (if any)
  if (import.meta.client) {
    await authStore.checkSession()
  }
})
