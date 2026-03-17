import { clerkPlugin } from '@clerk/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const publishableKey = config.public.clerkPublishableKey as string

  if (!publishableKey) {
    console.error('Missing NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
    return
  }

  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey
  })
})
