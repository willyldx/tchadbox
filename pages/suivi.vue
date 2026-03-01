<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-[var(--color-bg-warm)] overflow-hidden">
      <div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10" />
      
      <div class="container-main relative text-center">
        <div 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-5"
        >
          <MapPin class="w-8 h-8 text-[var(--color-accent-dark)]" />
        </div>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="heading-section mb-4"
        >
          Suivre ma <span class="text-gradient">commande</span>
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-lg text-[var(--color-text-muted)] max-w-lg mx-auto"
        >
          Entrez votre numéro de commande pour voir son statut en temps réel
        </p>
      </div>
    </section>

    <div class="container-main py-12 max-w-2xl">
      <!-- Search Form -->
      <div class="card p-8 mb-8">
        <form @submit.prevent="trackOrder">
          <label class="block text-sm font-medium text-[var(--color-text)] mb-3">Numéro de commande</label>
          <div class="flex gap-4">
            <div class="relative flex-grow">
              <Hash class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input 
                v-model="orderNumber" 
                type="text" 
                placeholder="Ex: TCB-2024-001234" 
                class="input pl-12" 
                required 
              />
            </div>
            <button type="submit" :disabled="isSearching" class="btn-gold flex-shrink-0">
              <span>
                <Loader v-if="isSearching" class="w-5 h-5 animate-spin" />
                <Search v-else class="w-5 h-5" />
                Rechercher
              </span>
            </button>
          </div>
          <p class="text-sm text-[var(--color-text-muted)] mt-3 flex items-center gap-2">
            <Lightbulb class="w-4 h-4 text-[var(--color-accent)]" />
            Tapez "demo" pour voir un exemple
          </p>
        </form>
      </div>

      <!-- Order Found -->
      <Transition
        enter-active-class="transition-all duration-500"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="order" class="card overflow-hidden">
          <!-- Order header -->
          <div class="bg-[var(--color-primary)] text-white p-6">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-white/60 mb-1">Commande</p>
                <p class="text-xl font-bold font-mono">{{ order.number }}</p>
              </div>
              <span class="px-4 py-2 rounded-xl text-sm font-semibold"
                :class="order.delivered ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'"
              >
                {{ order.delivered ? '✓ Livré' : '⏳ En cours' }}
              </span>
            </div>
          </div>
          
          <!-- Timeline -->
          <div class="p-6">
            <div class="relative">
              <!-- Vertical line -->
              <div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
              <div 
                class="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-success)] transition-all duration-1000"
                :style="{ height: `${completedPercent}%` }"
              />
              
              <div v-for="(step, i) in order.timeline" :key="i" class="relative pl-12 pb-8 last:pb-0">
                <!-- Step circle -->
                <div 
                  class="absolute left-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                  :class="step.completed 
                    ? 'bg-[var(--color-success)] text-white shadow-md shadow-green-500/20' 
                    : 'bg-gray-100 text-gray-400'"
                >
                  <Check v-if="step.completed" class="w-4 h-4" />
                  <component v-else :is="step.icon" class="w-4 h-4" />
                </div>
                
                <div>
                  <p class="font-semibold text-[var(--color-text)]" :class="{ 'text-[var(--color-success)]': step.completed }">
                    {{ step.title }}
                  </p>
                  <p class="text-sm text-[var(--color-text-muted)]">{{ step.date }}</p>
                  <p v-if="step.detail" class="text-sm text-[var(--color-text-secondary)] mt-1">{{ step.detail }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order footer -->
          <div class="px-6 pb-6 flex gap-3">
            <NuxtLink to="/contact" class="btn-outline flex-1 text-center text-sm">
              <span><MessageCircle class="w-4 h-4" />Contacter le support</span>
            </NuxtLink>
          </div>
        </div>
      </Transition>

      <!-- Not Found -->
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
      >
        <div v-if="notFound" class="card p-12 text-center">
          <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <SearchX class="w-8 h-8 text-red-300" />
          </div>
          <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Commande non trouvée</h3>
          <p class="text-[var(--color-text-muted)] mb-6 max-w-sm mx-auto">
            Vérifiez le numéro et réessayez, ou contactez-nous pour de l'aide.
          </p>
          <NuxtLink to="/contact" class="btn-outline">
            <span><MessageCircle class="w-4 h-4" />Nous contacter</span>
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Search, Check, SearchX, Hash, Lightbulb, MessageCircle, Loader, Package, CreditCard, Truck, Camera, Clock } from 'lucide-vue-next'

const orderNumber = ref('')
const order = ref<any>(null)
const notFound = ref(false)
const isSearching = ref(false)

const completedPercent = computed(() => {
  if (!order.value) return 0
  const completed = order.value.timeline.filter((s: any) => s.completed).length
  return (completed / order.value.timeline.length) * 100
})

const trackOrder = async () => {
  order.value = null
  notFound.value = false
  isSearching.value = true
  
  await new Promise(r => setTimeout(r, 800))
  
  if (orderNumber.value.toLowerCase() === 'demo' || orderNumber.value === 'TCB-2024-001234') {
    order.value = {
      number: 'TCB-2024-001234',
      delivered: true,
      timeline: [
        { title: 'Commande reçue', date: '15 Jan 2024, 10:30', detail: 'Votre commande a été enregistrée', completed: true, icon: Package },
        { title: 'Paiement confirmé', date: '15 Jan 2024, 10:32', detail: 'Paiement de 95,00 € validé', completed: true, icon: CreditCard },
        { title: 'En préparation', date: '15 Jan 2024, 14:00', detail: 'Votre colis est en cours de préparation', completed: true, icon: Clock },
        { title: 'En livraison', date: '17 Jan 2024, 09:00', detail: 'Le livreur est en route', completed: true, icon: Truck },
        { title: 'Livré', date: '18 Jan 2024, 15:45', detail: 'Photo de preuve envoyée par WhatsApp', completed: true, icon: Camera },
      ]
    }
  } else {
    notFound.value = true
  }
  
  isSearching.value = false
}

useHead({ title: 'Suivre ma commande' })
</script>
