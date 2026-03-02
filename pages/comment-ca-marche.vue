<template>
  <div>
    <!-- Hero -->
    <section class="relative py-24 overflow-hidden text-center">
      <img src="/hero-howto.png" alt="" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-[var(--color-primary)]/75" />
      
      <div class="container-main relative z-10">
        <span 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="inline-block text-[var(--color-accent)] text-sm font-semibold tracking-wider uppercase mb-4"
        >Guide</span>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="heading-section text-white mb-4"
        >
          Comment ça <span class="text-gradient-gold">marche</span> ?
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-lg text-white/70 max-w-lg mx-auto"
        >
          En 4 étapes simples, offrez le meilleur à votre famille au Tchad sans quitter votre canapé
        </p>
      </div>
    </section>

    <!-- Steps — Zigzag Layout -->
    <section class="py-24">
      <div class="container-main max-w-5xl">
        <!-- Vertical line connector (desktop) -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent" />
        
        <div class="space-y-24">
          <div 
            v-for="(step, i) in steps" :key="i" 
            class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            v-motion 
            :initial="{ opacity: 0, y: 40 }" 
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }"
          >
            <!-- Text side -->
            <div :class="{ 'md:order-2': i % 2 === 1 }">
              <div class="flex items-center gap-4 mb-5">
                <span class="w-12 h-12 rounded-xl bg-[var(--color-accent)] text-white flex items-center justify-center font-bold text-xl shadow-md">
                  {{ i + 1 }}
                </span>
                <h2 class="text-2xl font-bold text-[var(--color-text)]">{{ step.title }}</h2>
              </div>
              <p class="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">{{ step.description }}</p>
              
              <!-- Feature bullets -->
              <ul class="space-y-3">
                <li v-for="feature in step.features" :key="feature" class="flex items-start gap-3">
                  <CheckCircle class="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                  <span class="text-[var(--color-text-secondary)]">{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Visual side -->
            <div :class="{ 'md:order-1': i % 2 === 1 }">
              <div class="card p-10 text-center group hover:!border-[var(--color-accent)]/20 relative overflow-hidden">
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  :style="{ background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)` }"
                />
                <div class="relative">
                  <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl"
                    :style="{ background: `${step.color}12` }"
                  >
                    <component :is="step.icon" class="w-12 h-12 transition-transform duration-500" :style="{ color: step.color }" />
                  </div>
                  <p class="text-sm text-[var(--color-text-muted)] font-medium">{{ step.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-[var(--color-bg-warm)]">
      <div class="container-main max-w-3xl">
        <div class="text-center mb-14">
          <span class="label mb-4 block">FAQ</span>
          <h2 class="heading-section">Questions <span class="text-gradient">fréquentes</span></h2>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(faq, i) in faqs" :key="i" 
            class="card overflow-hidden transition-all duration-300"
            :class="openFaq === i ? 'ring-1 ring-[var(--color-accent)]/30' : ''"
          >
            <button @click="openFaq = openFaq === i ? null : i" class="w-full p-6 text-left flex justify-between items-center gap-4 group">
              <span class="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent-dark)] transition-colors">{{ faq.question }}</span>
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                :class="openFaq === i ? 'bg-[var(--color-accent)] text-white rotate-180' : 'bg-gray-100 text-[var(--color-text-muted)]'"
              >
                <ChevronDown class="w-4 h-4 transition-transform" />
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
              <div v-if="openFaq === i" class="px-6 pb-6 text-[var(--color-text-secondary)] leading-relaxed overflow-hidden">
                {{ faq.answer }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 text-center">
      <div class="container-main">
        <div 
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }"
          class="max-w-2xl mx-auto"
        >
          <h2 class="heading-section mb-4">Prêt à <span class="text-gradient">commencer</span> ?</h2>
          <p class="text-lg text-[var(--color-text-muted)] mb-8">
            Rejoignez les centaines de familles qui font déjà confiance à TchadBox
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/catalogue" class="btn-gold">
              <span><ShoppingBag class="w-5 h-5" />Voir le catalogue</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="btn-outline">
              <span><MessageCircle class="w-5 h-5" />Nous contacter</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Package, CreditCard, Truck, Camera, ChevronDown, CheckCircle, ShoppingBag, MessageCircle } from 'lucide-vue-next'

const openFaq = ref<number | null>(null)

const steps = [
  { 
    title: 'Composez votre commande', 
    description: 'Parcourez notre catalogue et choisissez les produits de qualité à faire livrer à vos proches au Tchad.',
    subtitle: 'Catalogue riche et varié',
    icon: Package,
    color: '#2563EB',
    features: [
      'Gammes alimentaire, scolarité, santé et fêtes',
      'Prix affichés en euros et en FCFA, en toute transparence',
      'Descriptions détaillées et photos réelles de chaque produit',
    ]
  },
  { 
    title: 'Réglez en toute confiance', 
    description: 'Finalisez votre achat grâce à notre plateforme de paiement sécurisée, propulsée par Paystack, leader du paiement en Afrique.',
    subtitle: 'Paiement sécurisé Paystack',
    icon: CreditCard,
    color: '#D97706',
    features: [
      'Visa, Mastercard et Mobile Money acceptés',
      'Cryptage SSL 256-bit pour protéger vos données',
      'Confirmation de commande instantanée par email',
    ]
  },
  { 
    title: 'Livraison à domicile à N\'Djamena', 
    description: 'Notre équipe terrain, basée à N\'Djamena, prépare et achemine votre commande directement au domicile du destinataire sous 3 à 5 jours ouvrés.',
    subtitle: 'Livraison express et fiable',
    icon: Truck,
    color: '#059669',
    features: [
      'Livraison porte-à-porte dans tout N\'Djamena',
      'Suivi de commande en temps réel depuis votre espace client',
      'Équipe locale professionnelle et de confiance',
    ]
  },
  { 
    title: 'Preuve de livraison certifiée', 
    description: 'Une fois le colis remis, recevez une photo confirmant la réception par votre famille. Votre tranquillité d\'esprit est notre priorité.',
    subtitle: 'Transparence totale',
    icon: Camera,
    color: '#EC4899',
    features: [
      'Photo de remise envoyée par WhatsApp ou email',
      'Notification automatique dès la livraison effectuée',
      'Engagement satisfaction : livraison garantie à 100%',
    ]
  },
]

const faqs = [
  { question: 'Dans quelles villes livrez-vous actuellement ?', answer: 'Notre service de livraison couvre actuellement l\'ensemble de N\'Djamena. Nous travaillons activement à l\'ouverture de Moundou et Sarh dans les prochains mois. Inscrivez-vous à notre newsletter pour être informé dès leur lancement.' },
  { question: 'Quel est le délai de livraison garanti ?', answer: 'Comptez 3 à 5 jours ouvrés après la confirmation de votre paiement. Pour les commandes urgentes, notre équipe peut organiser une livraison express — contactez-nous directement par WhatsApp pour en discuter.' },
  { question: 'Comment être sûr que ma famille a bien reçu le colis ?', answer: 'C\'est notre engagement phare : chaque livraison est accompagnée d\'une photo de preuve envoyée par WhatsApp ou email. Vous pouvez également suivre l\'avancement de votre commande en temps réel depuis votre espace client sur notre site.' },
  { question: 'Quels moyens de paiement sont acceptés ?', answer: 'Nous offrons une large palette de solutions de paiement : cartes Visa et Mastercard, Mobile Money (MTN Money, Orange Money, Wave), ainsi que le virement bancaire. Toutes les transactions sont sécurisées par notre partenaire Paystack.' },
  { question: 'Est-il possible d\'annuler une commande ?', answer: 'Oui, l\'annulation est gratuite tant que la préparation de votre colis n\'a pas débuté. Il vous suffit de nous contacter par email ou WhatsApp et nous procéderons au remboursement intégral sous 48h.' },
  { question: 'Les frais de livraison sont-ils inclus dans les prix ?', answer: 'Les frais de livraison sont calculés séparément en fonction de la zone de livraison à N\'Djamena et affichés de manière transparente avant la validation de votre commande. Aucun frais caché.' },
]

useHead({ title: 'Comment ça marche' })
</script>
