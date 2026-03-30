<template>
  <article 
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: delay, duration: 500 } }"
    class="card-product group relative flex flex-col h-full bg-white rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] hover:-translate-y-1 overflow-hidden ring-1 ring-slate-900/5"
  >
    <!-- Image Section -->
    <NuxtLink :to="`/produit/${product.handle || product.id}`" class="block relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-gray-50/80 p-4">
      <NuxtImg 
        v-if="product.thumbnail || product.images?.[0]"
        :src="product.thumbnail || product.images[0]"
        :alt="product.title"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        format="webp"
        quality="90"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <component :is="getCategoryIcon" class="w-16 h-16 text-gray-300" />
      </div>

      <!-- Quick Status Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5">
        <span 
          v-if="product.category"
          class="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-lg bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/20"
          :class="getCategoryTextClass"
        >
          {{ categoryName }}
        </span>
      </div>

      <!-- Quick Action: Wishlist -->
      <button class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-gray-400 hover:text-red-500 hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-white/20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <Heart class="w-4 h-4" />
      </button>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-5 flex flex-col flex-grow bg-white">
      <!-- Title & Subtitle -->
      <div class="mb-3">
        <NuxtLink :to="`/produit/${product.handle || product.id}`">
          <h3 class="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors min-h-[2.5rem]">
            {{ product.title }}
          </h3>
        </NuxtLink>
        <p v-if="product.subtitle" class="text-xs text-gray-400 mt-1 line-clamp-1 font-medium">
          {{ product.subtitle }}
        </p>
      </div>

      <!-- Rating (Static for trust) -->
      <div class="flex items-center gap-1 mb-4 opacity-80">
        <div class="flex">
          <Star v-for="i in 5" :key="i" class="w-3 h-3 fill-amber-400 text-amber-400" />
        </div>
        <span class="text-[10px] text-gray-400 font-bold ml-1">4.9/5</span>
      </div>

      <!-- Price & Stock -->
      <div class="mt-auto flex items-end justify-between gap-2">
        <div class="flex flex-col">
          <span class="text-xl sm:text-2xl font-extrabold text-[var(--color-primary)] tracking-tight leading-none group-hover:text-amber-600 transition-colors">
            {{ cartStore.formatPrice(product.price) }}
          </span>
          <span v-if="cartStore.currency !== 'XAF'" class="text-[11px] text-gray-400 font-bold mt-1.5 uppercase tracking-wide">
            ≈ {{ priceFCFA }} FCFA
          </span>
        </div>

        <!-- Add to Cart: Minimalist Retail style -->
        <button 
          @click="addToCart"
          class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 active:scale-95 group/btn"
          title="Ajouter au panier"
        >
          <ShoppingBag class="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ShoppingBag, Star, Heart, Wheat, BookOpen, Gift, Package } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

interface ProductProp {
  id: string
  title: string
  handle?: string
  subtitle?: string
  price: number
  thumbnail?: string
  images?: string[]
  category?: string | { name: string; handle: string }
  isNew?: boolean
}

const props = withDefaults(defineProps<{
  product: ProductProp
  delay?: number
}>(), {
  delay: 0
})

const cartStore = useCartStore()
const toast = useToast()

const priceFCFA = computed(() => {
  const rate = cartStore.rates?.XAF || 655.957
  return new Intl.NumberFormat('fr-FR').format(Math.round(props.product.price * rate))
})

const categoryName = computed(() => {
  if (!props.product.category) return ''
  return typeof props.product.category === 'string' ? props.product.category : props.product.category.name
})

const getCategoryIcon = computed(() => {
  const icons: Record<string, any> = {
    'Alimentaire': Wheat, 'Scolarité': BookOpen, 'Santé & Bébé': Heart, 'Santé': Heart, 'Fêtes & Occasions': Gift, 'Fêtes': Gift,
  }
  return icons[categoryName.value] || Package
})

const getCategoryTextClass = computed(() => {
  const classes: Record<string, string> = {
    'Alimentaire': 'text-emerald-600',
    'Scolarité': 'text-blue-600',
    'Santé & Bébé': 'text-pink-600',
    'Santé': 'text-pink-600',
    'Fêtes & Occasions': 'text-amber-600',
    'Fêtes': 'text-amber-600',
  }
  return classes[categoryName.value] || 'text-gray-600'
})

const addToCart = () => {
  cartStore.addItem({
    id: `cart-${props.product.id}-${Date.now()}`,
    productId: props.product.id,
    title: props.product.title,
    price: props.product.price,
    thumbnail: props.product.thumbnail || props.product.images?.[0],
    category: categoryName.value
  })
  toast.add({ title: 'Ajouté au panier', description: props.product.title, icon: 'i-heroicons-check-circle', color: 'green', timeout: 2500 })
}
</script>
