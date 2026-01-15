<template>
  <div>
    <section class="hero-gradient text-white py-20 text-center">
      <div class="container-main">
        <span class="label text-[var(--color-gold)] mb-4 block">Guide</span>
        <h1 class="heading-section text-white mb-4">Comment ça marche ?</h1>
        <p class="text-xl text-blue-100">Simple, rapide et sécurisé</p>
      </div>
    </section>

    <section class="py-20">
      <div class="container-main max-w-4xl">
        <div class="space-y-20">
          <div v-for="(step, i) in steps" :key="i" class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" v-motion :initial="{ opacity: 0, y: 30 }" :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100 } }">
            <div :class="{ 'md:order-2': i % 2 === 1 }">
              <div class="flex items-center gap-4 mb-4">
                <span class="w-12 h-12 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] flex items-center justify-center font-bold text-xl">{{ i + 1 }}</span>
                <h2 class="text-2xl font-bold text-[var(--color-text)]">{{ step.title }}</h2>
              </div>
              <p class="text-lg text-[var(--color-text-secondary)] leading-relaxed">{{ step.description }}</p>
            </div>
            <div :class="{ 'md:order-1': i % 2 === 1 }">
              <div class="card p-12 text-center">
                <component :is="step.icon" class="w-20 h-20 mx-auto text-[var(--color-primary)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[var(--color-bg-warm)]">
      <div class="container-main max-w-3xl">
        <div class="text-center mb-12">
          <span class="label mb-4 block">FAQ</span>
          <h2 class="heading-section">Questions fréquentes</h2>
        </div>
        <div class="space-y-4">
          <div v-for="(faq, i) in faqs" :key="i" class="card overflow-hidden">
            <button @click="openFaq = openFaq === i ? null : i" class="w-full p-6 text-left flex justify-between items-center">
              <span class="font-semibold text-[var(--color-text)]">{{ faq.question }}</span>
              <ChevronDown class="w-5 h-5 text-[var(--color-primary)] transition-transform" :class="{ 'rotate-180': openFaq === i }" />
            </button>
            <div v-if="openFaq === i" class="px-6 pb-6 text-[var(--color-text-secondary)]">{{ faq.answer }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <div class="container-main">
        <h2 class="heading-section mb-4">Prêt à commencer ?</h2>
        <NuxtLink to="/catalogue" class="btn-primary"><span>Voir le catalogue</span></NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Package, CreditCard, Truck, Camera, ChevronDown } from 'lucide-vue-next'

const openFaq = ref<number | null>(null)

const steps = [
  { title: 'Choisissez vos produits', description: 'Parcourez notre catalogue et sélectionnez les produits à envoyer à votre famille au Tchad.', icon: Package },
  { title: 'Payez en sécurité', description: 'Paiement sécurisé par carte bancaire via notre partenaire Paystack.', icon: CreditCard },
  { title: 'On livre à N\'Djamena', description: 'Notre équipe locale prépare et livre votre commande en 3-5 jours ouvrés.', icon: Truck },
  { title: 'Photo de preuve', description: 'Recevez une photo confirmant la livraison à votre famille par WhatsApp ou email.', icon: Camera },
]

const faqs = [
  { question: 'Dans quelles villes livrez-vous ?', answer: 'Actuellement à N\'Djamena. Bientôt Moundou et Sarh.' },
  { question: 'Quel est le délai de livraison ?', answer: '3 à 5 jours ouvrés après confirmation du paiement.' },
  { question: 'Comment savoir si ma famille a reçu ?', answer: 'Nous envoyons une photo de preuve par WhatsApp ou email.' },
  { question: 'Quels moyens de paiement ?', answer: 'Cartes Visa et Mastercard via Paystack.' },
]

useHead({ title: 'Comment ça marche' })
</script>
