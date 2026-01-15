<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white relative overflow-hidden">
      <!-- Decorative orbs -->
      <div class="orb orb-gold w-96 h-96 -top-20 -left-20 animate-float" />
      <div class="orb orb-blue w-80 h-80 bottom-0 right-0 animate-float-slow" />
      
      <div class="container-main py-20 lg:py-28 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Content -->
          <div>
            <div 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles class="w-4 h-4 text-[var(--color-gold)]" />
              <span class="text-sm font-medium">Livraison garantie avec photo</span>
            </div>
            
            <h1 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
              class="heading-hero text-white mb-6"
            >
              Envoyez du<br />
              <span class="text-gradient-gold">bonheur</span> au Tchad
            </h1>
            
            <p 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              class="text-xl text-blue-100 mb-8 max-w-lg leading-relaxed"
            >
              La diaspora tchadienne envoie des biens essentiels à sa famille. 
              Livraison sécurisée en 3-5 jours à N'Djamena.
            </p>
            
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="flex flex-col sm:flex-row gap-4"
            >
              <NuxtLink to="/catalogue" class="btn-gold">
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
              class="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              <div class="flex items-center gap-2">
                <Shield class="w-5 h-5 text-[var(--color-gold)]" />
                <span class="text-sm text-blue-100">Paiement sécurisé</span>
              </div>
              <div class="flex items-center gap-2">
                <Truck class="w-5 h-5 text-[var(--color-gold)]" />
                <span class="text-sm text-blue-100">Livraison 3-5 jours</span>
              </div>
              <div class="flex items-center gap-2">
                <Camera class="w-5 h-5 text-[var(--color-gold)]" />
                <span class="text-sm text-blue-100">Photo de preuve</span>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div 
            v-motion
            :initial="{ opacity: 0, scale: 0.9, rotate: -5 }"
            :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 400, duration: 800 } }"
            class="hidden lg:flex justify-center relative"
          >
            <div class="relative">
              <div class="absolute inset-0 bg-amber-400/20 rounded-full blur-[80px] animate-pulse-soft" />
              <img src="/logo.png" alt="TchadBox" class="w-80 h-auto relative z-10 drop-shadow-2xl animate-float" />
              
              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float" style="animation-delay: -1s;">
                <Wheat class="w-8 h-8 text-[var(--color-gold)]" />
              </div>
              <div class="absolute -bottom-4 -left-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-float" style="animation-delay: -2s;">
                <Heart class="w-8 h-8 text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Wave -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" class="w-full h-auto">
          <path d="M0 80H1440V40C1440 40 1200 0 720 40C240 80 0 40 0 40V80Z" fill="var(--color-bg)"/>
        </svg>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 bg-[var(--color-bg)]">
      <div class="container-main">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div 
            v-for="(stat, i) in stats" :key="stat.label"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
            class="text-center"
          >
            <div class="text-4xl font-bold text-[var(--color-primary)] mb-1" style="font-family: var(--font-display);">{{ stat.value }}</div>
            <div class="text-[var(--color-text-muted)]">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-20 bg-[var(--color-bg-warm)]">
      <div class="container-main">
        <div class="text-center mb-12">
          <span class="label mb-3 block">Nos produits</span>
          <h2 class="heading-section">Choisissez une <span class="text-gradient">catégorie</span></h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="(cat, i) in categories" :key="cat.handle"
            :to="`/catalogue?categorie=${cat.handle}`"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
            class="group"
          >
            <div class="card p-8 text-center h-full">
              <div 
                class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                :style="{ background: `${cat.color}15` }"
              >
                <component :is="cat.icon" class="w-8 h-8" :style="{ color: cat.color }" />
              </div>
              <h3 class="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">{{ cat.name }}</h3>
              <p class="text-sm text-[var(--color-text-muted)]">{{ cat.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20">
      <div class="container-main">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span class="label mb-3 block">Populaires</span>
            <h2 class="heading-section">Produits <span class="text-gradient">phares</span></h2>
          </div>
          <NuxtLink to="/catalogue" class="btn-outline self-start">
            <span>Voir tout <ArrowRight class="w-4 h-4" /></span>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="(product, i) in featuredProducts" :key="product.id" :product="product" :delay="i * 100" />
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 bg-[var(--color-bg-warm)]">
      <div class="container-main">
        <div class="text-center mb-16">
          <span class="label mb-3 block">Processus</span>
          <h2 class="heading-section">Comment ça <span class="text-gradient">marche</span></h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div class="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          
          <div 
            v-for="(step, i) in steps" :key="i"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { delay: i * 150 } }"
            class="text-center relative"
          >
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center relative z-10 shadow-lg">
              <component :is="step.icon" class="w-7 h-7" />
            </div>
            <span class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-7 h-7 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] text-sm font-bold flex items-center justify-center shadow">{{ i + 1 }}</span>
            <h3 class="font-semibold text-[var(--color-text)] mb-2">{{ step.title }}</h3>
            <p class="text-sm text-[var(--color-text-muted)]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20">
      <div class="container-main">
        <div class="text-center mb-12">
          <span class="label mb-3 block">Témoignages</span>
          <h2 class="heading-section">Ce que dit notre <span class="text-gradient">communauté</span></h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(t, i) in testimonials" :key="t.id"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visibleOnce="{ opacity: 1, scale: 1, transition: { delay: i * 100 } }"
            class="card p-8"
          >
            <div class="flex gap-1 mb-4">
              <Star v-for="n in 5" :key="n" class="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            </div>
            <p class="text-[var(--color-text-secondary)] italic mb-6 leading-relaxed">"{{ t.message }}"</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">{{ t.name.charAt(0) }}</div>
              <div>
                <div class="font-semibold text-[var(--color-text)]">{{ t.name }}</div>
                <div class="text-sm text-[var(--color-text-muted)] flex items-center gap-1"><MapPin class="w-3 h-3" />{{ t.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-[var(--color-primary)] relative overflow-hidden">
      <div class="orb orb-gold w-96 h-96 top-0 left-1/4" />
      <div class="orb orb-blue w-80 h-80 bottom-0 right-1/4" />
      
      <div class="container-main relative z-10 text-center">
        <h2 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          class="heading-section text-white mb-6"
        >
          Prêt à envoyer du <span class="text-gradient-gold">bonheur</span> ?
        </h2>
        <p class="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Commandez maintenant et faites livrer en 3-5 jours. Photo de preuve garantie.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/catalogue" class="btn-gold">
            <span><ShoppingBag class="w-5 h-5" />Commander maintenant</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-[var(--color-primary)]">
            <span><MessageCircle class="w-5 h-5" />Nous contacter</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  Sparkles, ShoppingBag, Play, Shield, Truck, Camera, Wheat, Heart,
  ArrowRight, Star, MapPin, MessageCircle, Package, CreditCard, BookOpen, Gift
} from 'lucide-vue-next'
import ProductCard from '~/components/product/ProductCard.vue'

const stats = [
  { value: '500+', label: 'Familles servies' },
  { value: '100%', label: 'Livraison garantie' },
  { value: '3-5j', label: 'Délai moyen' },
  { value: '24/7', label: 'Support client' },
]

const categories = [
  { name: 'Alimentaire', handle: 'alimentaire', description: 'Riz, huile, sucre...', icon: Wheat, color: '#10B981' },
  { name: 'Scolarité', handle: 'scolarite', description: 'Fournitures scolaires', icon: BookOpen, color: '#3B82F6' },
  { name: 'Santé & Bébé', handle: 'sante', description: 'Produits de santé', icon: Heart, color: '#EC4899' },
  { name: 'Fêtes', handle: 'fetes', description: 'Ramadan, Tabaski...', icon: Gift, color: '#F59E0B' },
]

const featuredProducts = [
  { id: '1', title: 'Sac de riz 25kg', handle: 'sac-riz-25kg', price: 35, category: 'Alimentaire', subtitle: 'Qualité premium' },
  { id: '2', title: 'Sac de riz 50kg', handle: 'sac-riz-50kg', price: 65, category: 'Alimentaire', subtitle: 'Format familial' },
  { id: '3', title: 'Kit Rentrée', handle: 'kit-rentree', price: 35, category: 'Scolarité', subtitle: 'Tout pour l\'école' },
  { id: '4', title: 'Pack Ramadan', handle: 'pack-ramadan', price: 95, category: 'Fêtes', subtitle: 'Spécial mois sacré' },
]

const steps = [
  { title: 'Choisissez', description: 'Parcourez notre catalogue', icon: Package },
  { title: 'Payez', description: 'Paiement sécurisé', icon: CreditCard },
  { title: 'On livre', description: 'Livraison à N\'Djamena', icon: Truck },
  { title: 'Photo preuve', description: 'Confirmation par photo', icon: Camera },
]

const testimonials = [
  { id: 1, name: 'Fatima M.', location: 'Paris', message: 'Ma mère a reçu le riz en 4 jours. Elle était tellement heureuse ! TchadBox a changé notre façon d\'aider notre famille.' },
  { id: 2, name: 'Ibrahim D.', location: 'Bruxelles', message: 'Service exceptionnel. La photo de livraison m\'a complètement rassuré. Je recommande à tous les Tchadiens de la diaspora.' },
  { id: 3, name: 'Aisha T.', location: 'Lyon', message: 'Enfin un service fiable ! Plus besoin de chercher des voyageurs. Mes parents reçoivent régulièrement leurs provisions.' },
]

useHead({ title: 'Accueil' })
</script>
