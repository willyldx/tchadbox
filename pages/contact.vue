<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-[var(--color-bg-warm)] overflow-hidden">
      <div class="orb orb-amber w-80 h-80 -top-20 -left-20 opacity-10" />
      
      <div class="container-main relative text-center">
        <span 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="label mb-4 block"
        >Support</span>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="heading-section mb-4"
        >
          Contactez-<span class="text-gradient">nous</span>
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-lg text-[var(--color-text-muted)] max-w-lg mx-auto"
        >
          Notre équipe est disponible pour répondre à toutes vos questions
        </p>
      </div>
    </section>

    <div class="container-main py-16">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        <!-- Contact Form — 3/5 width -->
        <div class="lg:col-span-3">
          <div class="card p-8 md:p-10">
            <h2 class="text-2xl font-bold text-[var(--color-text)] mb-2">Envoyez un message</h2>
            <p class="text-[var(--color-text-muted)] mb-8">Nous vous répondrons sous 24h</p>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-[var(--color-text)] mb-2">Nom complet</label>
                  <input v-model="form.name" type="text" placeholder="Votre nom" class="input" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                  <input v-model="form.email" type="email" placeholder="votre@email.com" class="input" required />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[var(--color-text)] mb-2">Sujet</label>
                <select v-model="form.subject" class="input" required>
                  <option value="" disabled>Choisir un sujet</option>
                  <option value="commande">Ma commande</option>
                  <option value="livraison">Livraison</option>
                  <option value="paiement">Paiement</option>
                  <option value="autre">Autre question</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[var(--color-text)] mb-2">Message</label>
                <textarea 
                  v-model="form.message" 
                  rows="5" 
                  placeholder="Décrivez votre question en détail..."
                  class="input resize-none" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="btn-gold w-full"
              >
                <span>
                  <Loader v-if="isSubmitting" class="w-5 h-5 animate-spin" />
                  <Send v-else class="w-5 h-5" />
                  {{ isSubmitting ? 'Envoi...' : 'Envoyer le message' }}
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info — 2/5 width -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact cards -->
          <div 
            v-for="(info, i) in contactInfo" :key="info.label"
            v-motion :initial="{ opacity: 0, x: 20 }" :visibleOnce="{ opacity: 1, x: 0, transition: { delay: i * 100 } }"
            class="card p-6 group hover:!border-[var(--color-accent)]/20"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                :style="{ background: `${info.color}12` }"
              >
                <component :is="info.icon" class="w-6 h-6" :style="{ color: info.color }" />
              </div>
              <div>
                <h3 class="font-semibold text-[var(--color-text)] mb-1">{{ info.label }}</h3>
                <a 
                  v-if="info.href" 
                  :href="info.href"
                  class="text-[var(--color-accent-dark)] hover:underline"
                >
                  {{ info.value }}
                </a>
                <p v-else class="text-[var(--color-text-muted)]">{{ info.value }}</p>
                <p v-if="info.note" class="text-xs text-[var(--color-text-muted)] mt-1">{{ info.note }}</p>
              </div>
            </div>
          </div>

          <!-- Hours card -->
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Clock class="w-5 h-5 text-purple-600" />
              </div>
              <h3 class="font-semibold text-[var(--color-text)]">Horaires</h3>
            </div>
            <div class="space-y-3">
              <div v-for="h in hours" :key="h.day" class="flex justify-between items-center">
                <span class="text-[var(--color-text-secondary)]">{{ h.day }}</span>
                <span 
                  class="text-sm font-medium px-3 py-1 rounded-full"
                  :class="h.closed ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'"
                >
                  {{ h.closed ? 'Fermé' : h.time }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick response badge -->
          <div class="bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/15 rounded-2xl p-5 flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
              <Zap class="w-6 h-6 text-[var(--color-accent-dark)]" />
            </div>
            <div>
              <p class="font-semibold text-[var(--color-text)] text-sm">Réponse rapide</p>
              <p class="text-xs text-[var(--color-text-muted)]">Nous répondons en moins de 24h en moyenne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Send, Mail, Phone, MapPin, Clock, Zap, MessageSquare, Loader } from 'lucide-vue-next'

const toast = useToast()
const form = ref({ name: '', email: '', subject: '', message: '' })
const isSubmitting = ref(false)

const contactInfo = [
  { label: 'Email', value: 'contact@tchadbox.com', href: 'mailto:contact@tchadbox.com', icon: Mail, color: '#2563EB', note: 'Réponse sous 24h' },
  { label: 'WhatsApp', value: '+33 X XX XX XX XX', href: '#', icon: MessageSquare, color: '#059669', note: 'Réponse instantanée' },
  { label: 'Livraison', value: 'N\'Djamena, Tchad', href: null, icon: MapPin, color: '#D97706', note: 'Zone de livraison principale' },
]

const hours = [
  { day: 'Lun - Ven', time: '9h - 18h', closed: false },
  { day: 'Samedi', time: '10h - 14h', closed: false },
  { day: 'Dimanche', time: '', closed: true },
]

const submitForm = async () => {
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1500))
  toast.add({ title: 'Message envoyé !', description: 'Nous vous répondrons sous 24h.', icon: 'i-heroicons-check-circle', color: 'green' })
  form.value = { name: '', email: '', subject: '', message: '' }
  isSubmitting.value = false
}

useHead({ title: 'Contact' })
</script>
