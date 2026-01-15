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
      'Playfair Display': [400, 500, 600, 700],
      'Inter': [300, 400, 500, 600, 700],
      'JetBrains Mono': [400, 500],
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
      link: [{ rel: 'icon', type: 'image/png', href: '/logo.png' }]
    }
  },

  runtimeConfig: {
    public: {
      medusaUrl: process.env.MEDUSA_URL || 'http://31.97.114.49:9000',
      supabaseUrl: process.env.SUPABASE_URL || 'https://xoeybpypyghunujnlhpa.supabase.co',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZXlicHlweWdodW51am5saHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MTk0NTYsImV4cCI6MjA4MzQ5NTQ1Nn0.E2qZdK3-8sis7yvX6-H8dMSJUuQO6sZ7zWq0KztKQV4',
    }
  },

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    viewTransition: true,
  },
})
