<template>
  <div class="bg-white min-h-screen">
    <!-- Hero (Cinematic) -->
    <section class="relative pt-32 pb-40 overflow-hidden text-center flex flex-col items-center justify-center">
      <!-- Background Image with Heavy Cinematic Overlay for perfect text contrast -->
      <NuxtImg src="/hero-contact.png" alt="Contact TchadBox" class="absolute inset-0 w-full h-full object-cover" loading="eager" quality="80" format="webp" sizes="100vw" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95" />
      
      <div class="container-main relative z-10 mt-10">
        <span 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="inline-flex px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
        >Support Client</span>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          Contactez-<span class="text-[var(--color-accent)]">nous</span>
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md"
        >
          Notre équipe dédiée est à votre écoute pour vous accompagner à chaque étape.
        </p>
      </div>
    </section>

    <!-- Support Content -->
    <div class="container-main py-24 -mt-10 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        
        <!-- Contact Form — 3/5 width -->
        <div class="lg:col-span-3">
          <div class="bg-white p-10 md:p-14 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-3">Écrivez-nous</h2>
            <p class="text-gray-500 font-medium mb-10">Notre équipe logistique s'engage à vous répondre sous 24 heures.</p>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-bold text-gray-700">Nom complet</label>
                  <input v-model="form.name" type="text" placeholder="Ex: Jean Dupont" class="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all" required />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-bold text-gray-700">Email</label>
                  <input v-model="form.email" type="email" placeholder="votre@email.com" class="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all" required />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-700">Sujet</label>
                <select v-model="form.subject" class="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all" required>
                  <option value="" disabled>Que concerne votre demande ?</option>
                  <option value="commande">Suivi de ma commande</option>
                  <option value="livraison">Détails de livraison / Douane</option>
                  <option value="paiement">Problème de paiement</option>
                  <option value="autre">Autre question</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-bold text-gray-700">Message</label>
                <textarea 
                  v-model="form.message" 
                  rows="5" 
                  placeholder="Décrivez votre question en détail..."
                  class="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all resize-none" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                <Loader v-if="isSubmitting" class="w-5 h-5 animate-spin" />
                <Send v-else class="w-5 h-5" />
                {{ isSubmitting ? 'Traitement en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info — 2/5 width -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Quick response badge -->
          <div class="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-2xl p-6 flex items-start gap-4 mb-2">
            <div class="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center shrink-0">
              <Zap class="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <div>
              <p class="font-black text-[var(--color-accent)] text-sm uppercase tracking-wider mb-1">Assistance Prioritaire</p>
              <p class="text-sm text-gray-700 font-medium leading-relaxed">Notre équipe commerciale garantit une prise en charge de votre dossier en moins de 24h ouvrées.</p>
            </div>
          </div>

          <!-- Contact cards -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-2">
            <div 
              v-for="(info, i) in contactInfo" :key="info.label"
              class="p-4 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white text-gray-600">
                <component :is="info.icon" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-sm">{{ info.label }}</h3>
                <a v-if="info.href" :href="info.href" class="text-gray-500 font-medium text-sm hover:text-[var(--color-accent)] transition-colors">
                  {{ info.value }}
                </a>
                <p v-else class="text-gray-500 font-medium text-sm">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Hours card -->
          <div class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock class="w-5 h-5 text-gray-900" />
              </div>
              <h3 class="font-black text-gray-900">Horaires d'ouverture</h3>
            </div>
            <div class="space-y-4">
              <div v-for="h in hours" :key="h.day" class="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span class="text-gray-600 font-medium">{{ h.day }}</span>
                <span 
                  class="text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider"
                  :class="h.closed ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700'"
                >
                  {{ h.closed ? 'Fermé' : h.time }}
                </span>
              </div>
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
// Keeping simple form logic for frontend phase
const form = ref({ name: '', email: '', subject: '', message: '' })
const isSubmitting = ref(false)

const contactInfo = [
  { label: 'Email Support', value: 'contact@tchadbox.com', href: 'mailto:contact@tchadbox.com', icon: Mail },
  { label: 'WhatsApp', value: '+33 X XX XX XX XX', href: '#', icon: MessageSquare },
  { label: 'Zone Logistique', value: 'N\'Djamena, Tchad', href: null, icon: MapPin },
]

const hours = [
  { day: 'Lun - Ven', time: '09:00 - 18:00', closed: false },
  { day: 'Samedi', time: '10:00 - 14:00', closed: false },
  { day: 'Dimanche', time: '', closed: true },
]

const submitForm = async () => {
  isSubmitting.value = true
  // Mock delay pour le design frontend (backend logic sera rajoutée plus tard)
  await new Promise(r => setTimeout(r, 1500))
  // Using native browser alert for now if UX UNotification is not globally configured, or keep UI toast if it exists
  toast.add({ title: 'Message envoyé', description: 'Notre équipe logistique vous répondra très rapidement.', icon: 'i-heroicons-paper-airplane', color: 'emerald' })
  form.value = { name: '', email: '', subject: '', message: '' }
  isSubmitting.value = false
}

useHead({ 
  title: 'Contactez-nous | TchadBox',
  meta: [
    { name: 'description', content: 'Besoin d\'aide ? Contactez l\'équipe TchadBox. Notre support est disponible pour toute question sur vos commandes vers N\'Djamena.' },
  ]
})
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
