<template>
  <div>
    <section class="hero-gradient text-white py-16 text-center">
      <div class="container-main">
        <MapPin class="w-14 h-14 mx-auto text-[var(--color-gold)] mb-4" />
        <h1 class="heading-section text-white">Suivre ma commande</h1>
      </div>
    </section>

    <div class="container-main py-12 max-w-2xl">
      <div class="card p-8 mb-8">
        <form @submit.prevent="trackOrder">
          <label class="label mb-2 block">Numéro de commande</label>
          <div class="flex gap-4">
            <input v-model="orderNumber" type="text" placeholder="Ex: TCB-2024-001234" class="input flex-grow" required />
            <button type="submit" class="btn-primary"><span><Search class="w-5 h-5" />Rechercher</span></button>
          </div>
          <p class="text-sm text-[var(--color-text-muted)] mt-2">Tapez "demo" pour voir un exemple</p>
        </form>
      </div>

      <div v-if="order" class="card overflow-hidden">
        <div class="bg-[var(--color-primary)] text-white p-6">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-blue-200">Commande</p>
              <p class="text-xl font-bold">{{ order.number }}</p>
            </div>
            <span class="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-medium">Livré</span>
          </div>
        </div>
        <div class="p-6">
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div v-for="(step, i) in order.timeline" :key="i" class="relative pl-12 pb-8 last:pb-0">
              <div class="absolute left-0 w-8 h-8 rounded-full flex items-center justify-center" :class="step.completed ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-400'">
                <Check v-if="step.completed" class="w-4 h-4" />
                <span v-else class="text-sm">{{ i + 1 }}</span>
              </div>
              <p class="font-medium text-[var(--color-text)]">{{ step.title }}</p>
              <p class="text-sm text-[var(--color-text-muted)]">{{ step.date }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="notFound" class="card p-12 text-center">
        <SearchX class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Commande non trouvée</h3>
        <p class="text-[var(--color-text-muted)]">Vérifiez le numéro</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Search, Check, SearchX } from 'lucide-vue-next'

const orderNumber = ref('')
const order = ref<any>(null)
const notFound = ref(false)

const trackOrder = () => {
  order.value = null
  notFound.value = false
  if (orderNumber.value.toLowerCase() === 'demo' || orderNumber.value === 'TCB-2024-001234') {
    order.value = {
      number: 'TCB-2024-001234',
      timeline: [
        { title: 'Commande reçue', date: '15 Jan 2024, 10:30', completed: true },
        { title: 'Paiement confirmé', date: '15 Jan 2024, 10:32', completed: true },
        { title: 'En préparation', date: '15 Jan 2024, 14:00', completed: true },
        { title: 'En livraison', date: '17 Jan 2024, 09:00', completed: true },
        { title: 'Livré', date: '18 Jan 2024, 15:45', completed: true },
      ]
    }
  } else {
    notFound.value = true
  }
}

useHead({ title: 'Suivre ma commande' })
</script>
