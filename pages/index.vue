<template>
  <div>
    <!-- Hero Section — Photo Background -->
    <section class="hero-image relative min-h-[85vh] flex items-center">
      <img 
        src="/hero-bg.png" 
        alt="" 
        class="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      
      <!-- Decorative orbs -->
      <div class="orb orb-amber w-96 h-96 -top-20 right-0 animate-float" style="z-index: 2;" />
      
      <div class="container-main relative z-10 py-20">
        <div class="max-w-2xl">
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
          >
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span class="text-sm font-medium text-white/90">🇹🇩 Service de livraison premium à N'Djamena — Preuve photo garantie</span>
          </div>
          
          <h1 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="heading-hero text-white mb-6"
          >
            Offrez le meilleur<br />
            à vos <span class="text-gradient-gold">proches</span> au Tchad
          </h1>
          
          <p 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="text-xl text-white/80 mb-10 max-w-lg leading-relaxed"
          >
            Où que vous soyez dans le monde, envoyez des produits de qualité 
            à votre famille au Tchad. Livraison sécurisée, rapide et confirmée par photo.
          </p>
          
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            class="flex flex-col sm:flex-row gap-4"
          >
            <NuxtLink to="/catalogue" class="btn-gold text-lg">
              <span><ShoppingBag class="w-5 h-5" />Voir le catalogue</span>
            </NuxtLink>
            <NuxtLink to="/comment-ca-marche" class="btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-[var(--color-primary)]">
              <span><Play class="w-5 h-5" />Comment ça marche</span>
            </NuxtLink>
          </div>

          <!-- Trust badges -->
          <div 
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 600 } }"
            class="flex flex-wrap items-center gap-6 mt-14 pt-8 border-t border-white/10"
          >
            <div v-for="badge in trustBadges" :key="badge.label" class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center">
                <component :is="badge.icon" class="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <span class="text-sm text-white/80 font-medium">{{ badge.label }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom fade -->
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10" />
    </section>

    <!-- Stats -->
    <section class="py-16 bg-[var(--color-bg)]">
      <div class="container-main">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="(stat, i) in stats" :key="stat.label"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
            class="card-stat text-center group"
          >
            <div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300"
              :style="{ background: stat.bgColor }"
            >
              <component :is="stat.icon" class="w-6 h-6" :style="{ color: stat.iconColor }" />
            </div>
            <div class="text-3xl font-bold text-[var(--color-text)] mb-1" style="font-family: var(--font-display);">{{ stat.value }}</div>
            <div class="text-sm text-[var(--color-text-muted)]">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories — Bento Style -->
    <section class="py-20 bg-[var(--color-bg-warm)]">
      <div class="container-main">
        <div class="text-center mb-14">
          <span class="label mb-3 block">Nos gammes</span>
          <h2 class="heading-section">Explorez nos <span class="text-gradient">catégories</span></h2>
          <p class="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto">
            Des produits rigoureusement sélectionnés, sourcés localement pour garantir fraîcheur et qualité
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <NuxtLink 
            v-for="(cat, i) in categories" :key="cat.handle"
            :to="`/catalogue?categorie=${cat.handle}`"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
            class="group"
          >
            <div class="card p-8 text-center h-full hover:!border-transparent relative overflow-hidden"
              :style="{ '--hover-bg': `${cat.color}08` }"
            >
              <!-- Color accent on hover -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                :style="{ background: `linear-gradient(135deg, ${cat.color}08 0%, transparent 100%)` }"
              />
              
              <div class="relative z-10">
                <div 
                  class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl group-hover:shadow-lg"
                  :style="{ background: `${cat.color}12`, boxShadow: `0 0 0 0 ${cat.color}00` }"
                >
                  <component :is="cat.icon" class="w-8 h-8 transition-transform duration-500" :style="{ color: cat.color }" />
                </div>
                <h3 class="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-text)] transition-colors">{{ cat.name }}</h3>
                <p class="text-sm text-[var(--color-text-muted)]">{{ cat.description }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-[var(--color-bg)]">
      <div class="container-main">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span class="label mb-3 block">Les plus demandés</span>
            <h2 class="heading-section">Nos <span class="text-gradient">best-sellers</span></h2>
          </div>
          <NuxtLink to="/catalogue" class="btn-outline self-start group">
            <span>Voir tout <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="(product, i) in featuredProducts" :key="product.id" :product="product" :delay="i * 100" />
        </div>
      </div>
    </section>

    <!-- How it Works — Modern Timeline -->
    <section class="py-24 bg-[var(--color-bg-warm)] relative overflow-hidden">
      <div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10" />
      
      <div class="container-main relative">
        <div class="text-center mb-16">
          <span class="label mb-3 block">Simple et rapide</span>
          <h2 class="heading-section">Comment ça <span class="text-gradient">marche</span></h2>
          <p class="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto">
            Un processus en 4 étapes pensé pour votre tranquillité d'esprit
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <!-- Connection line -->
          <div class="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px">
            <div class="w-full h-full bg-gradient-to-r from-[var(--color-accent)]/20 via-[var(--color-accent)]/40 to-[var(--color-accent)]/20" />
          </div>
          
          <div 
            v-for="(step, i) in steps" :key="i"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 150 } }"
            class="text-center relative group"
          >
            <div class="relative mx-auto mb-6">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center relative z-10 shadow-lg transition-all duration-500 group-hover:rounded-xl group-hover:scale-110 group-hover:shadow-xl">
                <component :is="step.icon" class="w-7 h-7" />
              </div>
              <span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center shadow-md z-20">
                {{ i + 1 }}
              </span>
            </div>
            <h3 class="font-semibold text-[var(--color-text)] mb-2 text-lg">{{ step.title }}</h3>
            <p class="text-sm text-[var(--color-text-muted)] max-w-[200px] mx-auto">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 bg-[var(--color-bg)]">
      <div class="container-main">
        <div class="text-center mb-14">
          <span class="label mb-3 block">Ils nous font confiance</span>
          <h2 class="heading-section">La parole à notre <span class="text-gradient">communauté</span></h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(t, i) in testimonials" :key="t.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: i * 100 } }"
            class="card p-8 group hover:!border-[var(--color-accent)]/20"
          >
            <div class="flex gap-1 mb-5">
              <Star v-for="n in 5" :key="n" class="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            </div>
            <p class="text-[var(--color-text-secondary)] mb-6 leading-relaxed">"{{ t.message }}"</p>
            <div class="flex items-center gap-4 pt-5 border-t border-[var(--color-border)]">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white flex items-center justify-center font-bold text-sm">
                {{ t.name.charAt(0) }}
              </div>
              <div>
                <div class="font-semibold text-[var(--color-text)] text-sm">{{ t.name }}</div>
                <div class="text-xs text-[var(--color-text-muted)] flex items-center gap-1"><MapPin class="w-3 h-3" />{{ t.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA — Image + Overlay -->
    <section class="relative py-28 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-[var(--color-primary)]">
        <div class="absolute inset-0 opacity-10" style="background-image: url('/hero-bg.png'); background-size: cover; background-position: center;" />
      </div>
      <div class="orb orb-amber w-96 h-96 top-0 left-1/4 opacity-15" />
      <div class="orb orb-warm w-80 h-80 bottom-0 right-1/4 opacity-10" />
      
      <div class="container-main relative z-10 text-center">
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="heading-section text-white mb-6"
        >
          Faites la différence <span class="text-gradient-gold">aujourd'hui</span>
        </h2>
        <p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Des milliers de familles reçoivent déjà leurs colis grâce à TchadBox. Rejoignez-les et offrez le sourire à vos proches.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/catalogue" class="btn-gold text-lg">
            <span><ShoppingBag class="w-5 h-5" />Commander maintenant</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline !border-white/25 !text-white hover:!bg-white hover:!text-[var(--color-primary)]">
            <span><MessageCircle class="w-5 h-5" />Nous contacter</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  ShoppingBag, Play, Shield, Truck, Camera, 
  ArrowRight, Star, MapPin, MessageCircle, Package, CreditCard, BookOpen, Gift,
  Wheat, Heart, Users, Clock, CheckCircle
} from 'lucide-vue-next'
import ProductCard from '~/components/product/ProductCard.vue'

const trustBadges = [
  { icon: Shield, label: 'Paiement 100% sécurisé' },
  { icon: Truck, label: 'Livré en 3 à 5 jours' },
  { icon: Camera, label: 'Photo de livraison certifiée' },
]

const stats = [
  { value: '500+', label: 'Familles accompagnées', icon: Users, bgColor: 'rgba(245, 158, 11, 0.1)', iconColor: '#D97706' },
  { value: '100%', label: 'Satisfaction garantie', icon: CheckCircle, bgColor: 'rgba(5, 150, 105, 0.1)', iconColor: '#059669' },
  { value: '3-5j', label: 'Délai de livraison', icon: Clock, bgColor: 'rgba(59, 130, 246, 0.1)', iconColor: '#2563EB' },
  { value: '24/7', label: 'Service client dédié', icon: MessageCircle, bgColor: 'rgba(168, 85, 247, 0.1)', iconColor: '#7C3AED' },
]

const categories = [
  { name: 'Alimentaire', handle: 'alimentaire', description: 'Riz, huile, sucre, farine et produits de première nécessité', icon: Wheat, color: '#059669' },
  { name: 'Scolarité', handle: 'scolarite', description: 'Kits scolaires complets pour la réussite de vos enfants', icon: BookOpen, color: '#2563EB' },
  { name: 'Santé & Bébé', handle: 'sante', description: 'Médicaments, couches et soins essentiels', icon: Heart, color: '#EC4899' },
  { name: 'Fêtes', handle: 'fetes', description: 'Packs spéciaux Ramadan, Tabaski et occasions', icon: Gift, color: '#D97706' },
]

const featuredProducts = [
  { id: '1', title: 'Sac de riz 25kg', handle: 'sac-riz-25kg', price: 35, category: 'Alimentaire', subtitle: 'Qualité supérieure' },
  { id: '2', title: 'Sac de riz 50kg', handle: 'sac-riz-50kg', price: 65, category: 'Alimentaire', subtitle: 'Le choix des grandes familles' },
  { id: '3', title: 'Kit Rentrée Scolaire', handle: 'kit-rentree', price: 35, category: 'Scolarité', subtitle: 'Complet et prêt à l\'emploi' },
  { id: '4', title: 'Pack Ramadan Premium', handle: 'pack-ramadan', price: 95, category: 'Fêtes', subtitle: 'L\'essentiel pour le mois béni' },
]

const steps = [
  { title: 'Sélectionnez', description: 'Choisissez parmi nos produits de qualité vérifiée', icon: Package },
  { title: 'Réglez en toute sérénité', description: 'Paiement sécurisé par carte bancaire ou Mobile Money', icon: CreditCard },
  { title: 'Nous livrons', description: 'Notre équipe locale livre directement à domicile en 3-5 jours', icon: Truck },
  { title: 'Preuve certifiée', description: 'Recevez la photo de remise par WhatsApp ou email', icon: Camera },
]

const testimonials = [
  { id: 1, name: 'Fatima M.', location: 'Paris, France', message: 'Ma mère a reçu son colis en 4 jours seulement. La photo de livraison m\'a fait pleurer de joie. TchadBox a transformé notre manière de prendre soin de notre famille à distance.' },
  { id: 2, name: 'Ibrahim D.', location: 'Bruxelles, Belgique', message: 'Un service d\'une fiabilité exceptionnelle. Depuis que j\'utilise TchadBox, je n\'ai plus aucune inquiétude. La preuve photo à chaque livraison, c\'est la transparence totale.' },
  { id: 3, name: 'Aisha T.', location: 'Lyon, France', message: 'Fini le stress de chercher des voyageurs ou de faire confiance à des inconnus. Avec TchadBox, mes parents reçoivent leurs provisions chaque mois, comme sur des roulettes.' },
]

useHead({ title: 'Accueil' })
</script>
