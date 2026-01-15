<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-2 gap-12 animate-pulse">
        <div class="aspect-square bg-stone-200 rounded-2xl"></div>
        <div class="space-y-4">
          <div class="h-8 bg-stone-200 rounded w-3/4"></div>
          <div class="h-6 bg-stone-200 rounded w-1/4"></div>
          <div class="h-24 bg-stone-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/" class="text-stone-500 hover:text-amber-600">Accueil</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <NuxtLink to="/catalogue" class="text-stone-500 hover:text-amber-600">Catalogue</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <NuxtLink 
          :to="`/catalogue?category=${product.category?.handle}`" 
          class="text-stone-500 hover:text-amber-600"
        >
          {{ product.category?.name }}
        </NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <span class="text-stone-800 font-medium truncate">{{ product.title }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="relative aspect-square bg-white rounded-2xl border border-stone-100 overflow-hidden group">
            <img
              :src="selectedImage || product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
            
            <!-- Favorite Button -->
            <button
              @click="toggleFavorite"
              class="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <HeartIcon 
                class="w-6 h-6 transition-colors" 
                :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-stone-400'"
              />
            </button>

            <!-- Zoom Button -->
            <button
              @click="showZoom = true"
              class="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ZoomInIcon class="w-5 h-5 text-stone-600" />
            </button>

            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span v-if="product.compareAtPrice" class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{{ discountPercent }}%
              </span>
              <span v-if="!product.inStock" class="bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                Rupture
              </span>
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images?.length > 1" class="flex gap-3 overflow-x-auto pb-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              class="w-20 h-20 bg-white rounded-xl border-2 overflow-hidden shrink-0 transition-colors"
              :class="selectedImage === image ? 'border-amber-500' : 'border-stone-100 hover:border-stone-200'"
            >
              <img :src="image" :alt="`Vue ${index + 1}`" class="w-full h-full object-contain p-2" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Category -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
              {{ product.category?.name }}
            </span>
            <span v-if="product.inStock" class="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckIcon class="w-4 h-4" />
              En stock
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl lg:text-4xl font-bold text-stone-800">{{ product.title }}</h1>

          <!-- Subtitle -->
          <p v-if="product.subtitle" class="text-lg text-stone-500">{{ product.subtitle }}</p>

          <!-- Price -->
          <div class="flex items-baseline gap-4">
            <span class="text-4xl font-bold text-stone-800">{{ formatPrice(product.price) }}</span>
            <span v-if="product.compareAtPrice" class="text-xl text-stone-400 line-through">
              {{ formatPrice(product.compareAtPrice) }}
            </span>
          </div>
          <p class="text-sm text-stone-500">≈ {{ formatFCFA(product.price) }}</p>

          <!-- Description -->
          <div class="prose prose-stone max-w-none">
            <p class="text-stone-600 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Quantity Selector -->
          <div class="flex items-center gap-4">
            <span class="text-sm font-medium text-stone-700">Quantité</span>
            <div class="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                @click="quantity > 1 && quantity--"
                :disabled="quantity <= 1"
                class="w-12 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <MinusIcon class="w-5 h-5" />
              </button>
              <span class="w-16 text-center font-semibold text-stone-800">{{ quantity }}</span>
              <button
                @click="quantity++"
                :disabled="quantity >= 10"
                class="w-12 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlusIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="flex gap-4">
            <button
              @click="addToCart"
              :disabled="!product.inStock || isAddingToCart"
              class="flex-1 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/25 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoaderIcon v-if="isAddingToCart" class="w-5 h-5 animate-spin" />
              <ShoppingCartIcon v-else class="w-5 h-5" />
              {{ isAddingToCart ? 'Ajout...' : 'Ajouter au panier' }}
            </button>
            <button
              @click="buyNow"
              :disabled="!product.inStock"
              class="px-6 py-4 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Acheter
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100">
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <TruckIcon class="w-6 h-6 text-green-600" />
              </div>
              <p class="text-xs text-stone-600 font-medium">Livraison N'Djamena</p>
              <p class="text-xs text-stone-400">7-14 jours</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheckIcon class="w-6 h-6 text-blue-600" />
              </div>
              <p class="text-xs text-stone-600 font-medium">Paiement sécurisé</p>
              <p class="text-xs text-stone-400">100% protégé</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <PackageIcon class="w-6 h-6 text-amber-600" />
              </div>
              <p class="text-xs text-stone-600 font-medium">Photo à la livraison</p>
              <p class="text-xs text-stone-400">Preuve de remise</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="mt-16">
        <div class="border-b border-stone-200">
          <nav class="flex gap-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 border-b-2 font-medium transition-colors"
              :class="activeTab === tab.id 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-stone-500 hover:text-stone-700'"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <div class="py-8">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="prose prose-stone max-w-none">
            <p>{{ product.description }}</p>
            <h3>Caractéristiques</h3>
            <ul>
              <li>Produit de qualité sélectionné en France</li>
              <li>Emballage soigné pour le transport</li>
              <li>Livraison directe à N'Djamena</li>
            </ul>
          </div>

          <!-- Shipping Tab -->
          <div v-else-if="activeTab === 'shipping'" class="space-y-6">
            <div class="bg-stone-50 rounded-xl p-6">
              <h3 class="font-semibold text-stone-800 mb-4">Informations de livraison</h3>
              <ul class="space-y-3 text-stone-600">
                <li class="flex items-start gap-3">
                  <CheckIcon class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Délai de livraison : 7 à 14 jours ouvrés</span>
                </li>
                <li class="flex items-start gap-3">
                  <CheckIcon class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Livraison gratuite à partir de 100€</span>
                </li>
                <li class="flex items-start gap-3">
                  <CheckIcon class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Suivi en temps réel de votre colis</span>
                </li>
                <li class="flex items-start gap-3">
                  <CheckIcon class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Photo de confirmation à la livraison</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div v-else-if="activeTab === 'reviews'" class="space-y-6">
            <div class="text-center py-12">
              <StarIcon class="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <p class="text-stone-500">Aucun avis pour le moment</p>
              <p class="text-sm text-stone-400">Soyez le premier à donner votre avis !</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-stone-800 mb-8">Vous aimerez aussi</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <PackageIcon class="w-10 h-10 text-stone-400" />
      </div>
      <h2 class="text-xl font-semibold text-stone-800 mb-2">Produit introuvable</h2>
      <p class="text-stone-500 mb-6">Ce produit n'existe pas ou a été supprimé.</p>
      <NuxtLink
        to="/catalogue"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all"
      >
        Voir le catalogue
      </NuxtLink>
    </div>

    <!-- Image Zoom Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="showZoom" 
          @click="showZoom = false"
          class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button 
            @click="showZoom = false"
            class="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <XIcon class="w-6 h-6 text-white" />
          </button>
          <img
            :src="selectedImage || product?.thumbnail"
            :alt="product?.title"
            class="max-w-full max-h-full object-contain"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight as ChevronRightIcon,
  Heart as HeartIcon,
  ZoomIn as ZoomInIcon,
  Check as CheckIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ShoppingCart as ShoppingCartIcon,
  Loader as LoaderIcon,
  Truck as TruckIcon,
  ShieldCheck as ShieldCheckIcon,
  Package as PackageIcon,
  Star as StarIcon,
  X as XIcon,
} from 'lucide-vue-next'
import type { Product } from '~/types'

const route = useRoute()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// State
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const isLoading = ref(true)
const isAddingToCart = ref(false)
const selectedImage = ref<string | null>(null)
const quantity = ref(1)
const activeTab = ref('description')
const showZoom = ref(false)

// Tabs
const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'shipping', label: 'Livraison' },
  { id: 'reviews', label: 'Avis (0)' },
]

// Computed
const isFavorite = computed(() => {
  return product.value ? favoritesStore.isFavorite(product.value.id) : false
})

const discountPercent = computed(() => {
  if (!product.value?.compareAtPrice) return 0
  return Math.round((1 - product.value.price / product.value.compareAtPrice) * 100)
})

// SEO
useSeoMeta({
  title: () => product.value ? `${product.value.title} - TchadBox` : 'Produit - TchadBox',
  description: () => product.value?.description || 'Découvrez ce produit sur TchadBox',
})

// Fetch product
onMounted(async () => {
  await fetchProduct()
})

async function fetchProduct() {
  const slug = route.params.slug as string
  
  // Simulated product data - would come from Medusa API
  // In production: const { data } = await useMedusa().getProduct(slug)
  
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock product for demo
  product.value = {
    id: slug,
    title: 'Pack Épicerie Premium',
    handle: slug,
    description: 'Découvrez notre sélection premium de produits d\'épicerie française. Ce pack contient une variété de produits soigneusement sélectionnés pour ravir vos papilles : huile d\'olive extra vierge, moutarde de Dijon, confiture artisanale, et bien plus encore.',
    subtitle: 'Sélection de produits français de qualité',
    price: 45,
    compareAtPrice: 55,
    images: [
      '/images/products/epicerie-1.jpg',
      '/images/products/epicerie-2.jpg',
      '/images/products/epicerie-3.jpg',
    ],
    thumbnail: '/images/products/epicerie-1.jpg',
    category: {
      id: 'cat_epicerie',
      name: 'Épicerie',
      handle: 'epicerie',
    },
    categoryId: 'cat_epicerie',
    inStock: true,
    stockQuantity: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  // Fetch related products
  relatedProducts.value = []
  
  isLoading.value = false
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

function formatFCFA(amount: number): string {
  const fcfa = Math.round(amount * 656)
  return new Intl.NumberFormat('fr-FR').format(fcfa) + ' FCFA'
}

function toggleFavorite() {
  if (!product.value) return
  favoritesStore.toggleFavorite(product.value)
}

async function addToCart() {
  if (!product.value || !product.value.inStock) return
  
  isAddingToCart.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  cartStore.addItem({
    id: product.value.id,
    productId: product.value.id,
    title: product.value.title,
    price: product.value.price,
    thumbnail: product.value.thumbnail,
    category: product.value.category?.name,
  }, quantity.value)
  
  isAddingToCart.value = false
}

function buyNow() {
  addToCart()
  navigateTo('/checkout')
}
</script>
