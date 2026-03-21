<template>
  <article 
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: delay, duration: 500 } }"
    class="card-product group relative flex flex-col h-full bg-white border border-gray-200 rounded-lg transition-all hover:shadow-xl hover:border-[var(--color-accent)]/30 overflow-hidden"
  >
    <!-- Image Section -->
    <NuxtLink :to="`/produit/${product.handle || product.id}`" class="block relative aspect-square overflow-hidden bg-gray-50">
      <img 
        v-if="product.thumbnail || product.images?.[0]"
        :src="product.thumbnail || product.images[0]"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <component :is="getCategoryIcon" class="w-16 h-16 text-gray-200" />
      </div>

      <!-- Quick Status Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1.5">
        <span 
          v-if="product.category"
          class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/90 backdrop-blur shadow-sm border border-gray-100"
          :class="getCategoryTextClass"
        >
          {{ categoryName }}
        </span>
        <span v-if="product.isNew" class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[var(--color-accent)] text-white shadow-sm">
          Nouveau
        </span>
      </div>

      <!-- Quick Action: Wishlist -->
      <button class="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur text-gray-400 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <Heart class="w-4 h-4" />
      </button>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title & Subtitle -->
      <div class="mb-2">
        <NuxtLink :to="`/produit/${product.handle || product.id}`">
          <h3 class="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-[var(--color-accent-dark)] transition-colors min-h-[2.5rem]">
            {{ product.title }}
          </h3>
        </NuxtLink>
        <p v-if="product.subtitle" class="text-xs text-gray-500 mt-1 line-clamp-1">
          {{ product.subtitle }}
        </p>
      </div>

      <!-- Rating (Static for trust) -->
      <div class="flex items-center gap-1 mb-3">
        <div class="flex">
          <Star v-for="i in 5" :key="i" class="w-3 h-3 fill-amber-400 text-amber-400" />
        </div>
        <span class="text-[10px] text-gray-400">(4.8)</span>
      </div>

      <!-- Price & Stock -->
      <div class="mt-auto pt-3 border-t border-gray-50">
        <div class="flex items-end justify-between gap-2">
          <div class="flex flex-col">
            <span class="text-lg sm:text-xl font-bold text-gray-900 leading-none">
              {{ formatPrice(product.price) }}
            </span>
            <span class="text-[10px] text-gray-500 font-medium mt-1">
              ≈ {{ priceFCFA }} FCFA
            </span>
          </div>

          <!-- Add to Cart: Minimalist Retail style -->
          <button 
            @click="addToCart"
            class="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-all active:scale-95 shadow-sm"
            title="Ajouter au panier"
          >
            <ShoppingBag class="w-4 h-4 sm:w-5 h-5" />
          </button>
        </div>

        <!-- Stock Indicator -->
        <div class="mt-3 flex items-center gap-1.5">
          <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-[10px] font-medium text-emerald-600">En stock — Livraison 72h</span>
        </div>
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

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)

const priceFCFA = computed(() => new Intl.NumberFormat('fr-FR').format(Math.round(props.product.price * 656)))

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
