<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 bg-[var(--color-bg-warm)] overflow-hidden">
      <div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10" />
      
      <div class="container-main relative text-center">
        <span 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="label mb-4 block"
        >Guide</span>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="heading-section mb-4"
        >
          Comment ça <span class="text-gradient">marche</span> ?
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-lg text-[var(--color-text-muted)] max-w-lg mx-auto"
        >
          En 4 étapes simples, envoyez des biens essentiels à votre famille au Tchad
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
            Faites plaisir à votre famille dès aujourd'hui
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
    title: 'Choisissez vos produits', 
    description: 'Parcourez notre catalogue et sélectionnez les produits à envoyer à votre famille au Tchad.',
    subtitle: 'Catalogue complet',
    icon: Package,
    color: '#2563EB',
    features: [
      'Alimentaire, scolarité, santé, fêtes',
      'Prix transparents en EUR et FCFA',
      'Photos de chaque produit',
    ]
  },
  { 
    title: 'Payez en sécurité', 
    description: 'Paiement sécurisé par carte bancaire ou Mobile Money via notre partenaire Paystack.',
    subtitle: 'Paystack sécurisé',
    icon: CreditCard,
    color: '#D97706',
    features: [
      'Visa, Mastercard, Mobile Money',
      'Cryptage SSL 256-bit',
      'Confirmation instantanée par email',
    ]
  },
  { 
    title: 'On livre à N\'Djamena', 
    description: 'Notre équipe locale prépare et livre votre commande en 3-5 jours ouvrés directement chez le destinataire.',
    subtitle: 'Livraison rapide',
    icon: Truck,
    color: '#059669',
    features: [
      'Livraison à domicile à N\'Djamena',
      'Suivi en temps réel de votre commande',
      'Équipe locale de confiance',
    ]
  },
  { 
    title: 'Photo de preuve', 
    description: 'Recevez une photo confirmant la livraison à votre famille par WhatsApp ou email. Tranquillité d\'esprit garantie.',
    subtitle: 'Preuve de livraison',
    icon: Camera,
    color: '#EC4899',
    features: [
      'Photo envoyée par WhatsApp',
      'Notification email automatique',
      'Garantie de livraison à 100%',
    ]
  },
]

const faqs = [
  { question: 'Dans quelles villes livrez-vous ?', answer: 'Actuellement nous livrons à N\'Djamena. Nous préparons l\'extension vers Moundou et Sarh très prochainement.' },
  { question: 'Quel est le délai de livraison ?', answer: '3 à 5 jours ouvrés après confirmation du paiement. Pour les commandes urgentes, contactez-nous pour une livraison express.' },
  { question: 'Comment savoir si ma famille a reçu le colis ?', answer: 'Nous envoyons systématiquement une photo de preuve de livraison par WhatsApp ou email. Vous pouvez aussi suivre votre commande en temps réel sur notre site.' },
  { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Nous acceptons les cartes Visa et Mastercard, le Mobile Money (MTN, Orange Money, Wave), et le virement bancaire via notre partenaire Paystack.' },
  { question: 'Puis-je annuler ma commande ?', answer: 'Oui, vous pouvez annuler gratuitement tant que la commande n\'a pas été préparée. Contactez-nous par email ou WhatsApp.' },
  { question: 'Les prix incluent-ils la livraison ?', answer: 'Les frais de livraison sont calculés séparément et affichés clairement avant le paiement. Ils dépendent de la zone de livraison à N\'Djamena.' },
]

useHead({ title: 'Comment ça marche' })
</script>
