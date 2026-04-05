<template>
  <article 
    class="card-product group relative flex flex-col h-full bg-white rounded-[2rem] transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden border border-gray-100"
  >
    <!-- Image Section -->
    <NuxtLink :to="`/produit/${product.handle || product.id}`" class="block relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-gray-50/50 p-6 flex items-center justify-center">
      <NuxtImg 
        v-if="product.thumbnail || product.images?.[0]"
        :src="product.thumbnail || product.images[0]"
        :alt="product.title"
        class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
        loading="lazy"
        format="webp"
        quality="90"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <component :is="getCategoryIcon" class="w-16 h-16 text-gray-200" />
      </div>

      <!-- Quick Status Badges -->
      <div class="absolute top-4 left-4 flex flex-col gap-2">
        <span 
          v-if="product.category"
          class="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl bg-white backdrop-blur-md shadow-sm border border-gray-100 text-gray-900"
        >
          {{ categoryName }}
        </span>
      </div>

      <!-- Quick Action: Wishlist -->
      <button class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-transparent transition-all duration-300 shadow-sm border border-gray-100 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
        <Heart class="w-4 h-4" />
      </button>
    </NuxtLink>

    <!-- Content Section -->
    <div class="p-6 sm:p-8 flex flex-col flex-grow bg-white border-t border-gray-50/50">
      <!-- Title & Subtitle -->
      <div class="mb-4">
        <NuxtLink :to="`/produit/${product.handle || product.id}`">
          <h3 class="font-black text-gray-900 text-lg sm:text-xl line-clamp-2 leading-snug group-hover:underline decoration-2 underline-offset-4 min-h-[3rem] tracking-tight">
            {{ product.title }}
          </h3>
        </NuxtLink>
        <p v-if="product.subtitle" class="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 line-clamp-1">
          {{ product.subtitle }}
        </p>
      </div>

      <!-- Rating (Static for trust, Monochrome Premium) -->
      <div class="flex items-center gap-2 mb-6">
        <div class="flex gap-0.5">
          <Star v-for="i in 5" :key="i" class="w-3 h-3 fill-gray-900 text-gray-900" />
        </div>
        <span class="text-[10px] text-gray-900 font-black tracking-widest uppercase">4.9/5 Trust</span>
      </div>

      <!-- Price & Stock -->
      <div class="mt-auto flex items-end justify-between gap-4">
        <div class="flex flex-col">
          <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Valeur Nette</span>
          <span class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter leading-none">
            {{ cartStore.formatPrice(product.price) }}
          </span>
          <span v-if="cartStore.currency !== 'XAF'" class="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-widest">
            ≈ {{ priceFCFA }} FCFA
          </span>
        </div>

        <!-- Add to Cart: Minimalist Retail style -->
        <button 
          @click="addToCart"
          class="flex items-center justify-center w-12 h-12 rounded-[1rem] border-2 border-gray-200 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 active:scale-95 group/btn shrink-0"
          title="Ajouter au bordereau"
        >
           <!-- Subtle inner glow on hover -->
          <div class="absolute inset-0 bg-white/20 rounded-[1rem] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          <ShoppingBag class="w-5 h-5 relative z-10 transition-transform group-hover/btn:-translate-y-0.5" />
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

const addToCart = () => {
  cartStore.addItem({
    id: `cart-${props.product.id}-${Date.now()}`,
    productId: props.product.id,
    title: props.product.title,
    price: props.product.price,
    thumbnail: props.product.thumbnail || props.product.images?.[0],
    category: categoryName.value
  })
  toast.add({ title: 'Ajouté au bordereau logistique', description: props.product.title, icon: 'i-heroicons-check-circle', color: 'black', timeout: 2500 })
}
</script>
