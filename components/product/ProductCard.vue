<template>
  <article 
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { delay: delay, duration: 500 } }"
    class="card-product group"
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div :style="{ transform: cardTransform }" class="transition-transform duration-200">
      <!-- Image -->
      <NuxtLink :to="`/produit/${product.handle || product.id}`" class="block">
        <div class="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img 
            v-if="product.thumbnail || product.images?.[0]"
            :src="product.thumbnail || product.images[0]"
            :alt="product.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <component :is="getCategoryIcon" class="w-20 h-20 text-gray-200" />
          </div>

          <!-- Category Badge -->
          <span 
            v-if="product.category"
            class="absolute top-4 left-4 badge"
            :class="getCategoryBadgeClass"
          >
            {{ categoryName }}
          </span>

          <!-- Quick Add -->
          <button 
            @click.prevent="addToCart"
            class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-primary-dark)] shadow-lg"
          >
            <Plus class="w-5 h-5" />
          </button>

          <!-- Shine effect -->
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </div>
      </NuxtLink>

      <!-- Content -->
      <div class="p-5">
        <NuxtLink :to="`/produit/${product.handle || product.id}`">
          <h3 class="font-semibold text-[var(--color-text)] text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
            {{ product.title }}
          </h3>
        </NuxtLink>
        
        <p v-if="product.subtitle" class="text-sm text-[var(--color-text-muted)] mb-3">
          {{ product.subtitle }}
        </p>

        <div class="flex items-end justify-between">
          <div>
            <span class="text-2xl font-bold text-[var(--color-primary)]">
              {{ formatPrice(product.price) }}
            </span>
            <span class="block text-xs text-[var(--color-text-muted)] mt-0.5">
              ≈ {{ priceFCFA }} FCFA
            </span>
          </div>
          
          <button 
            @click="addToCart"
            class="btn-ghost flex items-center gap-2 text-[var(--color-primary)]"
          >
            <ShoppingBag class="w-4 h-4" />
            <span class="text-sm font-medium hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ShoppingBag, Plus, Wheat, BookOpen, Heart, Gift, Package } from 'lucide-vue-next'
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
}

const props = withDefaults(defineProps<{
  product: ProductProp
  delay?: number
}>(), {
  delay: 0
})

const cartStore = useCartStore()
const toast = useToast()
const cardRef = ref<HTMLElement>()
const cardTransform = ref('')

// 3D hover effect
const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 25
  const rotateY = (centerX - x) / 25
  cardTransform.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const handleMouseLeave = () => {
  cardTransform.value = ''
}

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

const getCategoryBadgeClass = computed(() => {
  const classes: Record<string, string> = {
    'Alimentaire': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'Scolarité': 'bg-blue-50 text-blue-700 border border-blue-200',
    'Santé & Bébé': 'bg-pink-50 text-pink-700 border border-pink-200',
    'Santé': 'bg-pink-50 text-pink-700 border border-pink-200',
    'Fêtes & Occasions': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Fêtes': 'bg-amber-50 text-amber-700 border border-amber-200',
  }
  return classes[categoryName.value] || 'badge-primary'
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
