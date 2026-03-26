export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  googleFonts: {
    families: {
      // System sans-serif used as Amazon Ember fallback, no external fonts needed for UI
    },
    display: 'swap',
  },
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    domains: ['xoeybpypyghunujnlhpa.supabase.co'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'TchadBox - Envoyez des cadeaux au Tchad',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'TchadBox - La diaspora tchadienne envoie des biens à sa famille. Livraison garantie avec photo à N\'Djamena.' },
        { name: 'theme-color', content: '#002395' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/amazon-fonts@1.0.1/fonts/stylesheet.css' }
      ]
    }
  },
  runtimeConfig: {
    // Server-side only (not exposed to client)
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || '',
    public: {
      apiUrl: process.env.VITE_API_URL || 'https://api.spencerai.tech/api',
      medusaUrl: process.env.MEDUSA_URL || 'http://31.97.114.49:9000',
      siteUrl: process.env.SITE_URL || 'https://tchadbox.vercel.app',
      convexUrl: process.env.CONVEX_URL || 'https://ceaseless-alpaca-976.convex.cloud',
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
      meilisearchHost: process.env.NUXT_PUBLIC_MEILISEARCH_HOST || '',
      meilisearchKey: process.env.NUXT_PUBLIC_MEILISEARCH_KEY || '',
    }
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    viewTransition: true,
  },
})
