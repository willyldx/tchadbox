<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4">
    <div class="text-center max-w-lg">
      <!-- Error Illustration -->
      <div class="relative mb-8">
        <div class="text-[120px] font-bold text-stone-100 leading-none select-none">
          {{ error?.statusCode || '500' }}
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-14 h-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-stone-800 mb-4">
        {{ error?.statusCode === 404 ? 'Page introuvable' : 'Une erreur est survenue' }}
      </h1>
      
      <p class="text-stone-500 mb-8">
        {{ error?.statusCode === 404 
          ? 'Cette page n\'existe pas ou a été déplacée.'
          : 'Nous rencontrons un problème technique. Veuillez réessayer plus tard.' 
        }}
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="handleError"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Retour à l'accueil
        </button>
        <button
          @click="clearError({ redirect: '/catalogue' })"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Voir le catalogue
        </button>
      </div>

      <!-- Error details (dev only) -->
      <div v-if="error?.message && isDev" class="mt-12 p-4 bg-red-50 rounded-xl text-left">
        <p class="text-xs text-red-500 font-mono break-all">{{ error.message }}</p>
      </div>

      <!-- Help -->
      <p class="text-sm text-stone-400 mt-12">
        Besoin d'aide ? 
        <NuxtLink to="/contact" class="text-amber-600 hover:underline" @click="clearError()">
          Contactez-nous
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
    url?: string
  }
}>()

const isDev = process.dev

const handleError = () => clearError({ redirect: '/' })
</script>
