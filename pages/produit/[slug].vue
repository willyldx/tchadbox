<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-2 gap-12 animate-pulse">
        <div class="aspect-square bg-gray-200 rounded-2xl"></div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/4"></div>
          <div class="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-8 text-[var(--color-text-secondary)] font-medium">
        <NuxtLink to="/" class="hover:text-[var(--color-accent)] transition-colors">Accueil</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 opacity-50" />
        <NuxtLink to="/catalogue" class="hover:text-[var(--color-accent)] transition-colors">Catalogue</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 opacity-50" />
        <NuxtLink 
          :to="`/catalogue?categorie=${product.categoryHandle}`" 
          class="hover:text-[var(--color-accent)] transition-colors"
        >
          {{ product.category }}
        </NuxtLink>
        <ChevronRightIcon class="w-4 h-4 opacity-50" />
        <span class="text-[var(--color-primary)] font-bold truncate max-w-[200px] sm:max-w-none">{{ product.title }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-6">
          <!-- Main Image -->
          <div class="relative aspect-[4/3] sm:aspect-square bg-gray-50/50 rounded-[2rem] overflow-hidden group border border-gray-100 ring-1 ring-slate-900/5">
            <img
              :src="selectedImage || product.thumbnail"
              :alt="product.title"
              class="w-full h-full object-contain p-8 sm:p-12 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
            />
            
            <!-- Favorite Button -->
            <button
              @click="toggleFavorite"
              class="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-110 transition-all border border-white/20"
            >
              <HeartIcon 
                class="w-5 h-5 transition-colors" 
                :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'"
              />
            </button>

            <!-- Zoom Button -->
            <button
              @click="showZoom = true"
              class="absolute bottom-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-110 transition-all border border-white/20"
            >
              <ZoomInIcon class="w-4 h-4 text-gray-400" />
            </button>

            <!-- Badges -->
            <div class="absolute top-6 left-6 flex flex-col gap-2">
              <span v-if="product.compareAtPrice" class="bg-red-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm tracking-wider">
                -{{ discountPercent }}%
              </span>
              <span v-if="!product.inStock" class="bg-[var(--color-primary)] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm tracking-wider uppercase">
                Rupture
              </span>
            </div>
          </div>

          <!-- Thumbnails -->
          <div v-if="product.images?.length > 1" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = image"
              class="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50/50 rounded-2xl border-2 overflow-hidden shrink-0 transition-all snap-start"
              :class="selectedImage === image ? 'border-[var(--color-accent)] shadow-md scale-105' : 'border-transparent hover:border-gray-200'"
            >
              <img :src="image" :alt="`Vue ${index + 1}`" class="w-full h-full object-contain p-3 mix-blend-multiply" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <div class="space-y-8 flex-grow">
            <!-- Header (Category & Reviews) -->
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-[11px] font-extrabold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                  {{ product.category }}
                </span>
                <span v-if="product.inStock" class="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  En stock
                </span>
              </div>
              <div class="flex items-center gap-1.5 opacity-80">
                <div class="flex">
                  <StarIcon v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span class="text-xs text-gray-500 font-bold ml-1">4.9/5</span>
              </div>
            </div>

            <!-- Title & Subtitle -->
            <div class="space-y-3">
              <h1 class="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight leading-[1.1]">{{ product.title }}</h1>
              <p v-if="product.subtitle" class="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed">{{ product.subtitle }}</p>
            </div>

            <!-- Price Block -->
            <div class="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 ring-1 ring-slate-900/5">
              <div class="flex flex-col gap-1">
                <div class="flex items-baseline gap-4">
                  <span class="text-4xl sm:text-5xl font-black text-[var(--color-primary)] tracking-tighter">{{ cartStore.formatPrice(currentPrice) }}</span>
                  <span v-if="product.compareAtPrice && !selectedVariant" class="text-2xl text-gray-400 font-bold line-through decoration-2">
                    {{ cartStore.formatPrice(product.compareAtPrice) }}
                  </span>
                </div>
                <p v-if="cartStore.currency !== 'XAF'" class="text-sm text-gray-500 font-bold uppercase tracking-wider mt-2 flex items-center gap-2">
                  <span class="w-4 border-t-2 border-gray-300"></span>
                  Soit environ {{ formatFCFA(currentPrice) }} FCFA
                </p>
              </div>
            </div>

            <!-- Variants Selector -->
            <div v-if="product.variants && product.variants.length > 0" class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-gray-900 uppercase tracking-wider">Variantes disponibles</span>
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="variant in product.variants"
                  :key="variant.id"
                  @click="selectedVariant = variant"
                  class="px-5 py-3 rounded-2xl border-2 text-sm font-bold transition-all"
                  :class="selectedVariant?.id === variant.id 
                    ? 'border-[var(--color-accent)] text-[var(--color-primary)] bg-amber-50 shadow-[0_4px_12px_rgba(245,158,11,0.15)]' 
                    : 'border-gray-100 text-gray-500 hover:border-gray-200 hover:bg-gray-50'"
                >
                  {{ variant.title }}
                </button>
              </div>
            </div>

            <!-- Short Description -->
            <div v-if="product.description" class="prose prose-stone max-w-none prose-p:leading-relaxed prose-p:text-gray-600 prose-p:font-medium">
              <p class="line-clamp-3">{{ product.description }}</p>
              <button @click="activeTab = 'description'" class="text-[var(--color-accent-dark)] font-bold text-sm mt-2 hover:underline">Lire la suite</button>
            </div>

            <!-- Action Block (Hidden on Mobile) -->
            <div class="hidden sm:block space-y-6 pt-6 border-t border-gray-100">
              <div class="flex flex-wrap lg:flex-nowrap items-center gap-4">
                <!-- Quantity Pill -->
                <div class="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-200 shadow-sm">
                  <button
                    @click="quantity > 1 && quantity--"
                    :disabled="quantity <= 1"
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:text-[var(--color-primary)] hover:bg-gray-50 disabled:opacity-50 disabled:shadow-none transition-all border border-gray-100"
                  >
                    <MinusIcon class="w-5 h-5" />
                  </button>
                  <span class="w-16 text-center font-black text-xl text-[var(--color-primary)]">{{ quantity }}</span>
                  <button
                    @click="quantity++"
                    :disabled="quantity >= 10"
                    class="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:text-[var(--color-primary)] hover:bg-gray-50 disabled:opacity-50 disabled:shadow-none transition-all border border-gray-100"
                  >
                    <PlusIcon class="w-5 h-5" />
                  </button>
                </div>

                <!-- Primary CTA -->
                <button
                  @click="addToCart"
                  :disabled="!product.inStock || isAddingToCart"
                  class="flex-1 h-16 rounded-2xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] active:scale-95 transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(15,23,42,0.5)] disabled:opacity-50 font-bold text-lg flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></span>
                  <LoaderIcon v-if="isAddingToCart" class="w-6 h-6 animate-spin" />
                  <template v-else>
                    <ShoppingCartIcon class="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    Ajouter au panier
                  </template>
                </button>
              </div>

              <!-- Secondary CTA -->
              <button
                @click="buyNow"
                :disabled="!product.inStock"
                class="w-full h-16 border-2 border-[var(--color-accent)] text-gray-900 font-extrabold rounded-2xl hover:bg-[var(--color-accent-light)] bg-[var(--color-accent)] transition-all shadow-[0_4px_12px_rgba(245,158,11,0.2)] active:scale-95"
              >
                Acheter instantanément
              </button>
            </div>

            <!-- Mobile Action Spacer -->
            <div class="sm:hidden h-24"></div>

            <!-- Trust Badges Block -->
            <div class="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 ring-1 ring-slate-900/5 mt-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-4">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-shrink-0 items-center justify-center">
                    <TruckIcon class="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">Livraison Garantie</h4>
                    <p class="text-xs font-medium text-gray-500 mt-0.5">N'Djamena s/ 3-5j</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 pr-0 md:pr-4">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-shrink-0 items-center justify-center">
                    <ShieldCheckIcon class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">Paiement Sécurisé</h4>
                    <p class="text-xs font-medium text-gray-500 mt-0.5">Virement / CB</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-shrink-0 items-center justify-center">
                    <PackageIcon class="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">Preuve Photo</h4>
                    <p class="text-xs font-medium text-gray-500 mt-0.5">À la remise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="mt-20">
        <div class="border-b border-gray-100 relative">
          <nav class="flex gap-4 sm:gap-12 overflow-x-auto scrollbar-hide">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="relative py-6 font-bold text-sm sm:text-base uppercase tracking-widest transition-colors whitespace-nowrap"
              :class="activeTab === tab.id 
                ? 'text-[var(--color-primary)]' 
                : 'text-gray-400 hover:text-gray-600'"
            >
              {{ tab.label }}
              <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-accent)] rounded-t-full"></span>
            </button>
          </nav>
        </div>

        <div class="py-10 max-w-4xl">
          <!-- Description Tab -->
          <div v-if="activeTab === 'description'" class="prose prose-stone max-w-none prose-lg prose-p:leading-loose">
            <p>{{ product.description }}</p>
            <h3>Caractéristiques TchadBox</h3>
            <ul>
              <li><strong>Sélection Premium</strong> : Ce produit a été sourcé pour garantir une qualité optimale à N'Djamena.</li>
              <li><strong>Emballage Blindé</strong> : Protégé spécialement pour le fret et le transport jusqu'au domicile.</li>
              <li><strong>Zéro Surprise</strong> : Le prix global inclut la logistique et l'acheminement local.</li>
            </ul>
          </div>

          <!-- Shipping Tab -->
          <div v-else-if="activeTab === 'shipping'" class="space-y-6">
            <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 class="font-extrabold text-xl text-[var(--color-primary)] mb-6">Logistique & Livraison Intégrée</h3>
              <ul class="space-y-4 text-gray-600 font-medium">
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><CheckIcon class="w-4 h-4 text-emerald-600" /></div>
                  <span class="leading-relaxed"><strong>Délai Express N'Djamena</strong> : La livraison se fait en moyenne entre 3 et 5 jours après validation de votre commande.</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><CheckIcon class="w-4 h-4 text-emerald-600" /></div>
                  <span class="leading-relaxed"><strong>Livraison 100% Gratuite</strong> pour toutes les commandes supérieures à 150€. Aucun frais de livraison "surprise" à payer pour le bénéficiaire au Tchad !</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><CheckIcon class="w-4 h-4 text-emerald-600" /></div>
                  <span class="leading-relaxed"><strong>Preuve Photographique</strong> : Notre livreur réalise systématiquement une photo avec le bénéficiaire lors de la remise (soumise à autorisation) envoyée dans votre espace client.</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div v-else-if="activeTab === 'reviews'" class="space-y-6">
            <div class="bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
              <div class="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm mb-4">
                <StarIcon class="w-8 h-8 text-gray-300" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Aucun avis publié</h3>
              <p class="text-gray-500 font-medium">Faites plaisir à vos proches et soyez le premier à certifier ce produit !</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- MOBILE STICKY BOTTOM BAR -->
      <div v-if="product" class="sm:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] z-40 pb-safe">
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col">
            <span class="text-2xl font-black text-[var(--color-primary)] leading-none">{{ cartStore.formatPrice(currentPrice) }}</span>
            <span v-if="cartStore.currency !== 'XAF'" class="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">
              ≈ {{ formatFCFA(currentPrice) }}
            </span>
          </div>
          <button
            @click="addToCart"
            :disabled="!product.inStock || isAddingToCart"
            class="px-8 h-14 rounded-2xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-95 transition-all shadow-lg shadow-[var(--color-primary)]/20 flex-shrink-0 disabled:opacity-50 font-extrabold text-base flex items-center justify-center gap-2"
          >
            <LoaderIcon v-if="isAddingToCart" class="w-5 h-5 animate-spin" />
            <template v-else>
              <ShoppingCartIcon class="w-5 h-5" />
              Ajouter
            </template>
          </button>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-[var(--color-text)] mb-8">Vous aimerez aussi</h2>
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
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <PackageIcon class="w-10 h-10 text-[var(--color-text-muted)]" />
      </div>
      <h2 class="text-xl font-semibold text-[var(--color-text)] mb-2">Produit introuvable</h2>
      <p class="text-[var(--color-text-muted)] mb-6">Ce produit n'existe pas ou a été supprimé.</p>
      <NuxtLink
        to="/catalogue"
        class="btn-gold"
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
import type { Product, ProductVariant } from '~/types'

const route = useRoute()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

// State
const product = ref<Product | null>(null)
const selectedVariant = ref<ProductVariant | null>(null)
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

const currentPrice = computed(() => {
  if (selectedVariant.value) return selectedVariant.value.price
  return product.value?.price || 0
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
  const { getProduct, getProducts } = useProducts()
  
  try {
    // Fetch product from Laravel API by slug
    const response = await getProduct(slug)
    const p = response.product

    if (!p) {
      isLoading.value = false
      return
    }

    product.value = {
      id: p.id.toString(),
      title: p.title,
      handle: p.slug,
      description: p.description || '',
      subtitle: p.subtitle || '',
      price: p.price || 0,
      compareAtPrice: undefined,
      images: p.images || [],
      thumbnail: p.thumbnail || (p.images?.[0] ?? ''),
      category: p.category || '',
      categoryHandle: p.category_handle || '',
      inStock: p.in_stock ?? true,
      stockQuantity: p.stock_quantity,
      variants: p.variants ? p.variants.map((v: any) => ({
        id: v.id.toString(),
        title: v.title || v.name,
        price: v.price || p.price,
        inventory_quantity: v.inventory_quantity || 0
      })) : [],
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }

    if (product.value.variants && product.value.variants.length > 0) {
      selectedVariant.value = product.value.variants[0]
    }
    
    // Fetch related products from same category
    if (p.category_handle) {
      try {
        const relatedResponse = await getProducts({ category: p.category_handle, limit: 4 })
        relatedProducts.value = relatedResponse.products
          .filter((rp: any) => rp.id !== p.id)
          .slice(0, 4)
          .map((rp: any) => ({
            id: rp.id.toString(),
            title: rp.title,
            handle: rp.slug,
            price: rp.price || 0,
            thumbnail: rp.thumbnail || (rp.images?.[0] ?? ''),
            category: rp.category || '',
            categoryHandle: rp.category_handle || '',
            images: rp.images || [],
            inStock: rp.in_stock ?? true,
            createdAt: rp.created_at,
            updatedAt: rp.updated_at,
          }))
      } catch (e) {
        // Related products non-critiques
        relatedProducts.value = []
      }
    }
  } catch (e) {
    console.error('Failed to fetch product:', e)
  }
  
  isLoading.value = false
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
  
  cartStore.addItem({
    productId: product.value.id,
    variantId: selectedVariant.value?.id,
    variantTitle: selectedVariant.value?.title,
    title: product.value.title,
    price: currentPrice.value,
    thumbnail: product.value.thumbnail,
    category: product.value.category,
  }, quantity.value)
  
  isAddingToCart.value = false
}

function buyNow() {
  addToCart()
  navigateTo('/checkout')
}
</script>
