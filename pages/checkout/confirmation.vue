<template>
  <div class="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
    <div class="max-w-lg w-full">
      <!-- Success / Waiting Animation -->
      <div class="text-center mb-8">
        <div class="relative inline-block">
          <!-- Paid State -->
          <div v-if="isPaid" class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-bounce-once">
            <CheckIcon class="w-12 h-12 text-white" />
          </div>
          <!-- Awaiting State (Mobile Money) -->
          <div v-else-if="isMobileMoney" class="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Smartphone class="w-12 h-12 text-white animate-pulse" />
          </div>
          <!-- Default Success -->
          <div v-else class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 animate-bounce-once">
            <CheckIcon class="w-12 h-12 text-white" />
          </div>
          <!-- Confetti effect -->
          <div v-if="isPaid || !isMobileMoney" class="absolute inset-0 pointer-events-none">
            <div class="absolute top-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-confetti-1"></div>
            <div class="absolute top-0 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-confetti-2"></div>
            <div class="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full animate-confetti-3"></div>
            <div class="absolute top-1/4 right-0 w-2 h-2 bg-pink-400 rounded-full animate-confetti-4"></div>
          </div>
        </div>
      </div>

      <!-- Confirmation Card -->
      <div class="card-glass rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8 text-center">
          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">
            {{ isPaid ? 'Paiement confirmé !' : (isMobileMoney ? 'En attente de paiement...' : 'Commande confirmée !') }}
          </h1>
          <p class="text-[var(--color-text-muted)]">
            {{ isPaid ? 'Merci pour votre confiance !' : (isMobileMoney ? 'Effectuez le transfert pour valider' : 'Merci pour votre confiance') }}
          </p>
        </div>

        <div class="px-8 pb-8 space-y-6">
          <!-- Order Number -->
          <div class="bg-amber-50 rounded-xl p-4 text-center">
            <p class="text-sm text-amber-600 mb-1">Numéro de commande</p>
            <p class="text-2xl font-bold text-amber-700 font-mono">{{ orderId }}</p>
          </div>

          <!-- Mobile Money Instructions (Pending) -->
          <div v-if="isMobileMoney && !isPaid" class="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
            <div class="flex items-center gap-2 text-amber-800 font-semibold">
              <Smartphone class="w-5 h-5" />
              Paiement en attente
            </div>
            <div class="text-sm text-amber-900 space-y-2">
              <p>Si vous n'avez pas encore effectué le transfert :</p>
              <ul class="list-disc list-inside space-y-1 ml-1 font-medium">
                <li>Montant : <strong>{{ amount }}</strong></li>
                <li>Airtel Money : <strong>+235 85 96 25 92</strong></li>
                <li>Moov Africa : <strong>(À venir)</strong></li>
              </ul>
            </div>
            
            <!-- Polling indicator -->
            <div class="flex items-center gap-2 pt-2 border-t border-amber-200">
              <div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span class="text-xs text-amber-700">
                Vérification automatique en cours... ({{ pollCountdown }}s)
              </span>
            </div>
          </div>

          <!-- Payment Confirmed (Mobile Money Success) -->
          <div v-if="isMobileMoney && isPaid" class="bg-green-50 border border-green-200 rounded-xl p-5">
            <div class="flex items-center gap-2 text-green-800 font-semibold">
              <CheckIcon class="w-5 h-5" />
              Paiement reçu et validé !
            </div>
            <p class="text-sm text-green-700 mt-2">
              Votre transfert Mobile Money a été confirmé automatiquement. Votre commande est maintenant en cours de traitement.
            </p>
          </div>

          <!-- What's Next -->
          <div class="space-y-4">
            <h3 class="font-semibold text-[var(--color-text)]">Prochaines étapes</h3>
            
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                :class="isPaid || !isMobileMoney ? 'bg-green-100' : 'bg-amber-100'">
                <span class="font-bold text-sm" :class="isPaid || !isMobileMoney ? 'text-green-600' : 'text-amber-600'">1</span>
              </div>
              <div>
                <p class="font-medium text-[var(--color-text)]">{{ isMobileMoney && !isPaid ? 'Validation du paiement' : 'Paiement confirmé' }}</p>
                <p class="text-sm text-[var(--color-text-muted)]">{{ isMobileMoney && !isPaid ? 'Nous attendons la réception de votre transfert.' : 'Votre paiement a été traité avec succès.' }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-amber-600 font-bold text-sm">2</span>
              </div>
              <div>
                <p class="font-medium text-[var(--color-text)]">Préparation du colis</p>
                <p class="text-sm text-[var(--color-text-muted)]">Nous préparons votre colis avec soin sous 24-48h</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <span class="text-blue-600 font-bold text-sm">3</span>
              </div>
              <div>
                <p class="font-medium text-[var(--color-text)]">Livraison à N'Djamena</p>
                <p class="text-sm text-[var(--color-text-muted)]">Livraison avec photo de confirmation</p>
              </div>
            </div>
          </div>

          <!-- Tracking Info -->
          <div class="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
            <PackageIcon class="w-5 h-5 text-[var(--color-text-muted)] mt-0.5 shrink-0" />
            <div>
              <p class="text-sm font-medium text-[var(--color-text)]">Suivez votre colis</p>
              <p class="text-sm text-[var(--color-text-muted)]">
                Utilisez votre numéro de commande <strong>{{ orderId }}</strong> pour suivre votre colis.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3 pt-4">
            <NuxtLink
              v-if="authStore.isAuthenticated"
              :to="`/compte/commandes`"
              class="block w-full py-3 btn-gold text-center"
            >
              Voir ma commande
            </NuxtLink>
            <NuxtLink
              to="/suivi"
              class="block w-full py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors text-center"
            >
              Suivre mon colis
            </NuxtLink>
            <NuxtLink
              to="/"
              class="block w-full py-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] font-medium text-center transition-colors"
            >
              Retour à l'accueil
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Support -->
      <div class="text-center mt-8">
        <p class="text-sm text-[var(--color-text-muted)]">
          Une question ? 
          <NuxtLink to="/contact" class="text-amber-600 hover:underline">Contactez-nous</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check as CheckIcon, Package as PackageIcon, Smartphone } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

const route = useRoute()
const authStore = useAuthStore()

const orderId = computed(() => {
  return route.query.order as string || 'TCB-XXXXXXX'
})

const isMobileMoney = computed(() => {
  return route.query.method === 'tchad_mobile_money'
})

const amount = computed(() => {
  return route.query.amount as string || '0 FCFA'
})

// Payment status polling for Mobile Money
const isPaid = ref(false)
const pollCountdown = ref(10)
let pollInterval: ReturnType<typeof setInterval> | null = null
let countdownInterval: ReturnType<typeof setInterval> | null = null

async function checkPaymentStatus() {
  if (!orderId.value || orderId.value === 'TCB-XXXXXXX') return
  
  try {
    const result = await $fetch<{
      reference: string
      payment_status: string
      status: string
    }>(`/api/order-status/${encodeURIComponent(orderId.value)}`)

    if (result.payment_status === 'captured') {
      isPaid.value = true
      stopPolling()
    }
  } catch (error) {
    console.error('Status check failed:', error)
  }
}

function startPolling() {
  if (!isMobileMoney.value) return
  
  // Initial check immediately
  checkPaymentStatus()

  // Poll every 10 seconds
  pollInterval = setInterval(() => {
    checkPaymentStatus()
    pollCountdown.value = 10
  }, 10000)

  // Countdown display
  countdownInterval = setInterval(() => {
    if (pollCountdown.value > 0) {
      pollCountdown.value--
    }
  }, 1000)
}

function stopPolling() {
  if (pollInterval) clearInterval(pollInterval)
  if (countdownInterval) clearInterval(countdownInterval)
}

onMounted(() => {
  startPolling()
})

onUnmounted(() => {
  stopPolling()
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
