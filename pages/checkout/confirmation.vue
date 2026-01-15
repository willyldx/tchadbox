<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4">
    <div class="max-w-lg w-full">
      <!-- Success Animation -->
      <div class="text-center mb-8">
        <div class="relative inline-block">
          <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-bounce-once">
            <CheckIcon class="w-12 h-12 text-white" />
          </div>
          <!-- Confetti effect -->
          <div class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-confetti-1"></div>
            <div class="absolute top-0 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-confetti-2"></div>
            <div class="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full animate-confetti-3"></div>
            <div class="absolute top-1/4 right-0 w-2 h-2 bg-pink-400 rounded-full animate-confetti-4"></div>
          </div>
        </div>
      </div>

      <!-- Confirmation Card -->
      <div class="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-white/50 overflow-hidden">
        <div class="p-8 text-center">
          <h1 class="text-2xl font-bold text-stone-800 mb-2">Commande confirmée !</h1>
          <p class="text-stone-500">Merci pour votre confiance</p>
        </div>

        <div class="px-8 pb-8 space-y-6">
          <!-- Order Number -->
          <div class="bg-amber-50 rounded-xl p-4 text-center">
            <p class="text-sm text-amber-600 mb-1">Numéro de commande</p>
            <p class="text-2xl font-bold text-amber-700 font-mono">{{ orderId }}</p>
          </div>

          <!-- What's Next -->
          <div class="space-y-4">
            <h3 class="font-semibold text-stone-800">Prochaines étapes</h3>
            
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <p class="font-medium text-stone-800">Email de confirmation</p>
                <p class="text-sm text-stone-500">Vous allez recevoir un email avec les détails de votre commande</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-amber-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p class="font-medium text-stone-800">Préparation du colis</p>
                <p class="text-sm text-stone-500">Nous préparons votre colis avec soin sous 24-48h</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p class="font-medium text-stone-800">Expédition</p>
                <p class="text-sm text-stone-500">Livraison à N'Djamena sous 7-14 jours</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-green-600 font-bold text-sm">4</span>
              </div>
              <div>
                <p class="font-medium text-stone-800">Livraison avec photo</p>
                <p class="text-sm text-stone-500">Photo de confirmation lors de la remise au destinataire</p>
              </div>
            </div>
          </div>

          <!-- Tracking Info -->
          <div class="bg-stone-50 rounded-xl p-4 flex items-start gap-3">
            <PackageIcon class="w-5 h-5 text-stone-500 mt-0.5 shrink-0" />
            <div>
              <p class="text-sm font-medium text-stone-800">Suivez votre colis</p>
              <p class="text-sm text-stone-500">
                Utilisez votre numéro de commande <strong>{{ orderId }}</strong> pour suivre votre colis en temps réel.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3 pt-4">
            <NuxtLink
              v-if="authStore.isAuthenticated"
              :to="`/compte/commandes`"
              class="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-center shadow-lg shadow-amber-500/25"
            >
              Voir ma commande
            </NuxtLink>
            <NuxtLink
              to="/suivi"
              class="block w-full py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors text-center"
            >
              Suivre mon colis
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block w-full py-3 text-stone-500 hover:text-stone-700 font-medium text-center transition-colors"
            >
              Retour à l'accueil
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Support -->
      <div class="text-center mt-8">
        <p class="text-sm text-stone-500">
          Une question ? 
          <NuxtLink to="/contact" class="text-amber-600 hover:underline">Contactez-nous</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check as CheckIcon, Package as PackageIcon } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const route = useRoute()
const authStore = useAuthStore()

const orderId = computed(() => {
  return route.query.order as string || 'TCB-XXXXXXX'
})

useSeoMeta({
  title: `Commande ${orderId.value} confirmée - TchadBox`,
  description: 'Votre commande TchadBox a été confirmée avec succès.',
})
</script>

<style scoped>
@keyframes bounce-once {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes confetti-1 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(-30px, -60px) rotate(360deg); opacity: 0; }
}

@keyframes confetti-2 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(30px, -60px) rotate(-360deg); opacity: 0; }
}

@keyframes confetti-3 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(-40px, -40px) rotate(180deg); opacity: 0; }
}

@keyframes confetti-4 {
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(40px, -40px) rotate(-180deg); opacity: 0; }
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}

.animate-confetti-1 {
  animation: confetti-1 1s ease-out forwards;
}

.animate-confetti-2 {
  animation: confetti-2 1s ease-out 0.1s forwards;
}

.animate-confetti-3 {
  animation: confetti-3 1s ease-out 0.2s forwards;
}

.animate-confetti-4 {
  animation: confetti-4 1s ease-out 0.3s forwards;
}
</style>
