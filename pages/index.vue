<template>
  <div class="bg-[var(--color-bg)]">
    <!-- ==============================================
         1. CINEMATIC HERO (EDGE-TO-EDGE)
         ============================================== -->
    <section class="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      <!-- Background slider -->
      <div v-for="(slide, i) in heroSlides" :key="'bg-'+i" class="absolute inset-0 w-full h-full">
        <Transition
          enter-active-class="transition-opacity duration-700 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-700 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-show="currentSlide === i" class="absolute inset-0 w-full h-full bg-white">
            <NuxtImg 
              :src="slide.image" 
              :alt="slide.title"
              class="w-full h-full object-cover opacity-[0.85]"
              format="webp"
              loading="eager"
            />
            <!-- Ultra-luminous bright gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-[var(--color-bg)]"></div>
          </div>
        </Transition>
      </div>

      <!-- Center Content (Glassmorphism) -->
      <div class="relative z-10 container-main flex flex-col items-center text-center mt-6">
        <div 
          class="max-w-4xl mx-auto flex flex-col items-center"
        >
          <!-- Premium Pill -->
          <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 mb-6 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-green-500" />
            <span class="text-sm font-bold tracking-wide text-[var(--color-primary)] uppercase letter-spacing-1">L'Excellence au Tchad</span>
          </div>

          <!-- Title -->
          <div class="relative min-h-[100px] md:min-h-[120px] w-full flex justify-center items-center">
            <TransitionGroup
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-300 ease-in absolute"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-4"
            >
              <div v-for="(slide, i) in heroSlides" :key="'text-'+i" v-show="currentSlide === i" class="absolute w-full text-center">
                <h1 class="text-4xl md:text-6xl font-black text-[var(--color-primary)] leading-tight tracking-tight drop-shadow-sm" v-html="slide.title"></h1>
              </div>
            </TransitionGroup>
          </div>

          <!-- Subtitle -->
          <p class="text-sm sm:text-base md:text-xl text-[var(--color-text-secondary)] max-w-2xl mt-4 md:mt-2 mb-8 font-medium px-4 md:px-0">
            Envoyez des produits de qualité à votre famille, partout au Tchad. Livraison premium certifiée par photo.
          </p>

          <!-- Solid CTA -->
          <div class="flex flex-col sm:flex-row gap-5">
            <NuxtLink to="/catalogue" class="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Explorer le Catalogue <ArrowRight class="w-5 h-5 ml-1" />
            </NuxtLink>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex items-center gap-4 mt-12 md:mt-16">
          <button 
            v-for="(slide, i) in heroSlides" :key="'dot-'+i"
            @click="goToSlide(i)"
            class="relative h-2 rounded-full overflow-hidden transition-all duration-300 shadow-sm"
            :class="currentSlide === i ? 'w-10 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-primary)]/50'"
            aria-label="Changer de diapositive"
          />
        </div>
      </div>
    </section>

    <!-- ==============================================
         2. BENTO GRID CATEGORIES (MODERN IOS STYLE)
         ============================================== -->
    <section class="py-24 relative z-20 -mt-10 bg-[var(--color-bg)] rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
      <div class="container-main">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12">
          <div class="max-w-2xl">
            <h2 class="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">L'Univers <span class="text-gradient">TchadBox</span></h2>
            <p class="text-[var(--color-text-muted)] text-lg mt-4 font-light">Des catégories pensées pour répondre à tous les besoins vitaux de vos proches, emballées avec soin.</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink 
            v-for="(cat, i) in categories" :key="cat.handle"
            :to="`/categories/${cat.handle}`"
            class="group relative h-[320px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
            :style="{ borderTop: `4px solid ${cat.color}` }"
          >
            <!-- Background Glow -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" :style="{ background: `radial-gradient(circle at bottom right, ${cat.color}15, transparent 60%)` }"></div>
            
            <div class="p-8 flex flex-col h-full relative z-10">
              <div 
                class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                :style="{ background: `${cat.color}15`, color: cat.color }"
              >
                <component :is="cat.icon" class="w-8 h-8" />
              </div>
              <h3 class="text-2xl font-bold text-[var(--color-text)] mb-3">{{ cat.name }}</h3>
              <p class="text-[var(--color-text-muted)] font-light leading-relaxed flex-grow">{{ cat.description }}</p>
              
              <div class="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300" :style="{ color: cat.color }">
                Découvrir <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ==============================================
         3. FEATURED PRODUCTS (SKELETON ASSISTED)
         ============================================== -->
    <section v-if="loading || featuredProducts.length > 0" class="py-24 bg-[var(--color-bg-warm)] mt-12 mb-12">
      <div class="container-main">
        <div class="flex justify-between items-center mb-16">
          <h2 class="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">Tendance Actuelle</h2>
          <NuxtLink to="/catalogue" class="hidden md:flex items-center gap-2 font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors">
            Voir notre catalogue <ArrowRight class="w-5 h-5" />
          </NuxtLink>
        </div>
        
        <!-- Skeleton Grid visible during fetch -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductSkeleton v-for="i in 4" :key="'skel-'+i" />
        </div>
        
        <!-- Actual Products -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="(product, i) in featuredProducts" :key="product.id" :product="product" :delay="i * 100" />
        </div>
        
        <div class="mt-12 text-center md:hidden">
            <NuxtLink to="/catalogue" class="btn-outline inline-flex">Voir notre catalogue</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ==============================================
         4. HOW IT WORKS (SEAMLESS TIMELINE)
         ============================================== -->
    <section class="py-32 bg-white relative overflow-hidden">
      <!-- Decorative giant blur -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div class="container-main relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20">
          <h2 class="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight mb-6">La promesse <span class="text-gradient">TchadBox</span></h2>
          <p class="text-xl text-[var(--color-text-muted)] font-light">Un processus pensé pour une transparence totale, de votre panier jusqu'au sourire de vos bénéficiaires.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative">
          <!-- Desktop minimal connecting line -->
          <div class="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 z-0"></div>
          
          <div 
            v-for="(step, i) in steps" :key="i"
            class="relative z-10 flex flex-col items-center text-center group"
          >
            <!-- Sleek Icon Box -->
            <div class="w-24 h-24 mb-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:border-[var(--color-accent)]/30">
              <component :is="step.icon" class="w-10 h-10 text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
            </div>
            
            <h3 class="text-xl font-bold text-[var(--color-text)] mb-3">{{ step.title }}</h3>
            <p class="text-[var(--color-text-muted)] font-light max-w-[220px]">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==============================================
         5. ULTIMATE CTA (NIGHT MODE CONTRAST)
         ============================================== -->
    <section class="py-24 px-4 bg-[var(--color-bg)]">
      <div 
        class="max-w-6xl mx-auto rounded-[3rem] bg-[var(--color-primary)] overflow-hidden relative shadow-2xl"
      >
        <div class="absolute inset-0 opacity-20 mix-blend-overlay" style="background-image: url('/hero-bg.png'); background-size: cover; background-position: center; filter: grayscale(100%);" />
        <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/90 to-black/80"></div>
        
        <div class="relative z-10 py-20 px-8 md:px-20 text-center flex flex-col items-center">
          <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
            <Heart class="w-10 h-10 text-[var(--color-accent)]" />
          </div>
          <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-6">Prêt à faire un heureux ?</h2>
          <p class="text-xl text-white/70 font-light mb-10 max-w-2xl">Rejoignez des centaines de familles qui se font confiance pour leurs transferts de produits vers le Tchad.</p>
          
          <NuxtLink to="/catalogue" class="btn-gold px-10 py-5 text-xl shadow-[0_0_40px_rgba(217,119,6,0.4)]">
            Créer ma première commande
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
import ProductSkeleton from '~/components/product/ProductSkeleton.vue'

// 1. Hero Carousel (Cinematic Titles)
const heroSlides = [
  {
    image: '/hero-bg.png',
    title: 'Le meilleur pour<br/><span class="text-gradient-gold drop-shadow-lg">votre famille.</span>'
  },
  {
    image: '/hero-slide2.png',
    title: 'La joie de<span class="text-gradient-gold drop-shadow-lg"><br/>recevoir.</span>'
  },
  {
    image: '/hero-slide3.png',
    title: 'Un service<br/><span class="text-gradient-gold drop-shadow-lg">d\'excellence.</span>'
  },
]

const currentSlide = ref(0)
const slideDuration = 6000
let slideInterval: ReturnType<typeof setInterval> | null = null

const startAutoPlay = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  }, slideDuration)
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  if (slideInterval) clearInterval(slideInterval)
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
  fetchFeaturedProducts()
})
onUnmounted(() => { if (slideInterval) clearInterval(slideInterval) })

// 2. Bento Grid Categories
const categories = [
  { name: 'Alimentaire', handle: 'alimentaire', description: 'Riz, huile, sucre et produits de première nécessité sourcés localement.', icon: Wheat, color: '#10B981' }, // Emerald
  { name: 'Scolarité', handle: 'scolarite', description: 'Kits scolaires complets pour garantir la réussite de vos enfants.', icon: BookOpen, color: '#3B82F6' }, // Blue
  { name: 'Santé & Bébé', handle: 'sante', description: 'Gamme de soins essentiels, pharmacie de base et produits infantiles.', icon: Heart, color: '#EC4899' }, // Pink
  { name: 'Événements', handle: 'fetes', description: 'Packs spéciaux créés sur-mesure pour Ramadan, Tabaski et célébrations.', icon: Gift, color: '#F59E0B' }, // Amber
]

// 3. Featured Products
const featuredProducts = ref<any[]>([])
const loading = ref(true)

const fetchFeaturedProducts = async () => {
  loading.value = true
  try {
    const { getProducts } = useProducts()
    const response = await getProducts({ limit: 4 })
    featuredProducts.value = response.products.map((p: any) => ({
      id: p.id.toString(),
      title: p.title,
      handle: p.slug,
      subtitle: p.subtitle || '',
      price: p.price || 0,
      thumbnail: p.thumbnail || '',
      category: p.category || '',
      categoryHandle: p.category_handle || '',
      inStock: p.in_stock,
    }))
  } catch (e) {
    featuredProducts.value = []
  } finally {
    loading.value = false
  }
}

// 4. Timeline
const steps = [
  { title: 'Découverte', description: 'Parcourez notre catalogue exclusif.', icon: Package },
  { title: 'Paiement Sécurisé', description: 'Réglez par Carte ou Mobile Money.', icon: CreditCard },
  { title: 'Logistique Locale', description: 'Livraison express en 3 à 5 jours.', icon: Truck },
  { title: 'Preuve', description: 'Photo de confirmation certifiée envoyée.', icon: Camera },
]

useHead({ 
  title: 'TchadBox — L\'excellence de la livraison au Tchad',
  meta: [
    { name: 'description', content: 'Le service de référence pour la diaspora tchadienne. Envoyez des biens de qualité (alimentaire, santé, scolarité, fêtes) à vos proches au Tchad avec preuve de livraison certifiée.' },
    { property: 'og:title', content: 'TchadBox — L\'excellence de la livraison au Tchad' },
    { property: 'og:description', content: 'Envoyez l\'essentiel à votre famille au Tchad. Livraison rapide, paiement sécurisé et preuve de livraison.' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>

<style scoped>
/* Cinematic Animations */
.animate-slow-zoom {
  animation: slowZoom 8s cubic-bezier(0.1, 0.5, 0.4, 1) forwards;
}
@keyframes slowZoom {
  from { transform: scale(1.0); }
  to { transform: scale(1.1); }
}

.animate-gradient-xy {
  background-size: 200% 200%;
  animation: gradientXY 3s ease infinite;
}
@keyframes gradientXY {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes progressFill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
</style>
