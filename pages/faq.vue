<template>
  <div class="bg-white min-h-screen pt-32 pb-24">
    <!-- Header -->
    <section class="max-w-3xl mx-auto px-6 mb-16 text-center">
      <nav class="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 mb-8">
        <NuxtLink to="/" class="hover:text-gray-900 transition-colors">Accueil</NuxtLink>
        <ChevronRightIcon class="w-4 h-4" />
        <span class="text-gray-900">Assistance</span>
      </nav>
      
      <h1 class="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
        Foire aux questions
      </h1>
      <p class="text-lg md:text-xl text-gray-500 font-medium">
        Toutes les réponses pour expédier sereinement vers N'Djamena.
      </p>
    </section>

    <!-- FAQ Accordion -->
    <section class="container-main max-w-4xl mx-auto px-6 mb-24">
      <div class="space-y-4">
        <div 
          v-for="(faq, i) in faqs" :key="i" 
          class="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
          :class="openFaq === i ? 'border-gray-300 shadow-md transform -translate-y-1' : 'hover:border-gray-200'"
        >
          <button @click="openFaq = openFaq === i ? null : i" class="w-full p-6 text-left flex justify-between items-center gap-4 group">
            <span class="font-bold text-lg text-gray-900 group-hover:text-gray-600 transition-colors">{{ faq.question }}</span>
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all border border-gray-200"
              :class="openFaq === i ? 'bg-gray-900 text-white border-gray-900 rotate-180' : 'bg-gray-50 text-gray-500'"
            >
              <ChevronDown class="w-5 h-5 transition-transform" />
            </div>
          </button>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-40"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-40"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="openFaq === i" class="px-6 pb-8 text-gray-500 font-medium leading-relaxed overflow-hidden">
              {{ faq.answer }}
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Contact Support CTA -->
    <section class="max-w-4xl mx-auto px-6 text-center">
      <div class="bg-gray-50 rounded-[3rem] p-12 border border-gray-100">
        <h2 class="text-3xl font-black text-gray-900 mb-4">Vous ne trouvez pas votre réponse ?</h2>
        <p class="text-gray-500 font-medium mb-8">Notre équipe basée entre l'Europe et le Tchad est disponible pour vous accompagner.</p>
        <NuxtLink to="/contact" class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-md">
          <MessageCircleIcon class="w-5 h-5" /> Contacter l'assistance
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon, ChevronDown, MessageCircle as MessageCircleIcon } from 'lucide-vue-next'

const openFaq = ref<number | null>(0) // Open the first one by default

const faqs = [
  { question: 'Dans quelles villes livrez-vous actuellement ?', answer: 'Notre service de livraison couvre actuellement l\'ensemble de N\'Djamena (ainsi que Moundou et Sarh selon les options de transport choisies). Inscrivez-vous à notre newsletter pour être informé de l\'ouverture de nos nouveaux hubs.' },
  { question: 'Quel est le délai de livraison garanti ?', answer: 'Le délai standard est de 3 à 5 jours ouvrés par transport aérien après la confirmation de votre paiement. L\'acheminement passe par notre propre réseau pour éviter tout blocage en douane.' },
  { question: 'Y a-t-il des frais de douanes pour le destinataire ?', answer: 'Non, jamais. Tous nos prix sont définitifs et incluent les frais d\'exportation, les taxes douanières au Tchad et la livraison locale. Votre famille ne paiera pas le moindre centime.' },
  { question: 'Comment être sûr que ma famille a bien reçu le colis ?', answer: 'C\'est notre plus grande force : la Preuve TchadBox. Chaque livraison à domicile est validée par une photographie sécurisée du bénéficiaire avec le colis. Vous la recevez directement dans votre espace client.' },
  { question: 'Quels moyens de paiement internationaux sont acceptés ?', answer: 'Toutes les cartes bancaires classiques (Visa, Mastercard, Maestro) ainsi que le Mobile Money transfrontalier via notre passerelle cryptée Paystack. Tout est converti de manière transparente.' },
  { question: 'Puis-je annuler une commande après paiement ?', answer: 'L\'annulation et le remboursement intégral sont possibles jusqu\'à ce que le statut de la commande passe à "Expédié". Une fois le colis dans l\'avion, les frais logistiques internationaux nous empêchent de bloquer la livraison.' },
]

useSeoMeta({
  title: 'Foire Aux Questions | TchadBox',
  description: 'Retrouvez toutes les réponses concernant les livraisons vers le Tchad via TchadBox.',
})
</script>

<style scoped>
/* Animations and clean styles */
</style>
