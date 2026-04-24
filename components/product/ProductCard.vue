<template>
  <article
    class="card-product group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.09)]"
  >
    <div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-slate-900 opacity-70"></div>
    <!-- Image Section -->
    <NuxtLink :to="`/produit/${product.handle || product.id}`" class="block relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(13,148,136,0.12),transparent_45%),#f8fafc] p-6 flex items-center justify-center">
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
    </NuxtLink>

    <!-- Quick Status Badges -->
    <div class="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
      <span
        v-if="product.category"
        class="pointer-events-auto rounded-xl border border-slate-200 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-sm backdrop-blur-md"
      >
        {{ categoryName }}
      </span>
      <span class="pointer-events-auto rounded-xl bg-emerald-50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-700 ring-1 ring-emerald-200">
        En stock
      </span>
    </div>

    <!-- Quick Action: Wishlist -->
    <button class="absolute top-4 right-4 z-10 flex h-10 w-10 translate-x-2 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-gray-400 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hover:border-transparent hover:bg-gray-900 hover:text-white">
      <Heart class="w-4 h-4" />
    </button>

    <!-- Content Section -->
    <div class="flex flex-grow flex-col border-t border-gray-100 bg-white p-6 sm:p-8">
      <!-- Title & Subtitle -->
      <div class="mb-4">
        <NuxtLink :to="`/produit/${product.handle || product.id}`">
          <h3 class="min-h-[3rem] line-clamp-2 text-lg font-black leading-snug tracking-tight text-gray-900 decoration-2 underline-offset-4 group-hover:underline sm:text-xl">
            {{ product.title }}
          </h3>
        </NuxtLink>
        <p v-if="product.subtitle" class="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2 line-clamp-1">
          {{ product.subtitle }}
        </p>
      </div>

      <!-- Rating (Static for trust, Monochrome Premium) -->
      <div class="mb-6 flex items-center gap-2">
        <div class="flex gap-0.5">
          <Star v-for="i in 5" :key="i" class="h-3 w-3 fill-amber-400 text-amber-400" />
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest text-slate-700">4.9/5 fiabilité</span>
      </div>

      <!-- Price & Stock -->
      <div class="mt-auto flex items-end justify-between gap-4">
        <div class="flex flex-col">
          <span class="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">Valeur nette</span>
          <span class="text-2xl font-black leading-none tracking-tighter text-gray-900 sm:text-3xl">
            {{ cartStore.formatPrice(product.price) }}
          </span>
          <span v-if="cartStore.currency !== 'XAF'" class="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            ≈ {{ priceFCFA }} FCFA
          </span>
        </div>

        <!-- Add to Cart: Minimalist Retail style -->
        <button 
          @click="addToCart"
          class="group/btn relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border-2 border-gray-200 text-gray-900 transition-all duration-300 hover:border-teal-700 hover:bg-teal-700 hover:text-white active:scale-95"
          title="Ajouter au bordereau"
        >
          <div class="absolute inset-0 rounded-[1rem] bg-white/20 opacity-0 transition-opacity group-hover/btn:opacity-100"></div>
          <ShoppingBag class="relative z-10 h-5 w-5 transition-transform group-hover/btn:-translate-y-0.5" />
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
