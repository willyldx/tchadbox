<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4">
    <div class="text-center max-w-lg">
      <!-- Animated 404 -->
      <div class="relative mb-8">
        <h1 class="text-[150px] font-bold text-stone-100 leading-none select-none">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce-slow">
            <PackageXIcon class="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-stone-800 mb-3">Page introuvable</h2>
      <p class="text-stone-500 mb-8">
        Oups ! Cette page semble s'être perdue en route vers N'Djamena. 
        Elle n'existe pas ou a été déplacée.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
        >
          <HomeIcon class="w-5 h-5" />
          Retour à l'accueil
        </NuxtLink>
        <NuxtLink
          to="/catalogue"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
        >
          <ShoppingBagIcon class="w-5 h-5" />
          Voir le catalogue
        </NuxtLink>
      </div>

      <!-- Help -->
      <p class="text-sm text-stone-400 mt-12">
        Besoin d'aide ? 
        <NuxtLink to="/contact" class="text-amber-600 hover:underline">Contactez-nous</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PackageX as PackageXIcon, Home as HomeIcon, ShoppingBag as ShoppingBagIcon } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'Page introuvable - TchadBox',
  description: 'Cette page n\'existe pas sur TchadBox.',
})
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>
