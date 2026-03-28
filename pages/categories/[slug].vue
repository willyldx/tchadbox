<template>
  <div>
    <!-- Hero dynamique pour la catégorie -->
    <section class="relative text-white py-20 overflow-hidden bg-gradient-to-r from-amber-600 to-amber-900">
      <div class="absolute inset-0 bg-black/20" />
      <div class="container-main relative z-10">
        <div class="flex items-center gap-2 text-white/80 text-sm mb-4">
          <NuxtLink to="/" class="hover:text-white transition-colors">Accueil</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <NuxtLink to="/catalogue" class="hover:text-white transition-colors">Catalogue</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white font-medium capitalize">{{ currentCategoryName }}</span>
        </div>
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-2 capitalize">{{ currentCategoryName }}</h1>
        <p class="text-white/80 mt-2 text-lg">{{ filteredProducts.length }} produit{{ filteredProducts.length > 1 ? 's' : '' }} disponible{{ filteredProducts.length > 1 ? 's' : '' }}</p>
      </div>
    </section>

    <div class="container-main py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="card p-6 sticky top-28 border border-gray-100 shadow-sm">
            <div class="mb-8">
              <h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <LayoutGrid class="w-5 h-5 text-amber-500" />Toutes les Catégories
              </h3>
              <div class="space-y-2">
                <NuxtLink to="/catalogue" class="filter-btn w-full inline-flex items-center gap-3">
                  <Package class="w-5 h-5" />Catalogue complet
                </NuxtLink>
                <NuxtLink 
                  v-for="cat in categories" 
                  :key="cat.handle" 
                  :to="`/categories/${cat.handle}`"
                  class="filter-btn w-full inline-flex items-center gap-3" 
                  :class="{ active: currentSlug === cat.handle }"
                >
                  <component :is="cat.icon" class="w-5 h-5" />{{ cat.name }}
                </NuxtLink>
              </div>
            </div>

            <div class="mb-8">
              <h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <Euro class="w-5 h-5 text-amber-500" />Filtrer par Prix
              </h3>
              <div class="space-y-2">
                <label v-for="r in priceRanges" :key="r.value" class="flex items-center gap-3 py-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-amber-600 transition-colors">
                  <input type="radio" v-model="selectedPrice" :value="r.value" class="sr-only" />
                  <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors" :class="selectedPrice === r.value ? 'border-amber-500 bg-amber-500' : 'border-gray-300'">
                    <span v-if="selectedPrice === r.value" class="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  {{ r.label }}
                </label>
              </div>
            </div>
            
            <button v-if="selectedPrice" @click="selectedPrice = ''" class="btn-ghost w-full">
              <RotateCcw class="w-4 h-4" />Réinitialiser les prix
            </button>
          </div>
        </aside>

        <!-- Products -->
        <div class="flex-grow">
          <div class="card p-4 mb-6 relative shadow-sm border border-gray-100 flex items-center">
             <Search class="absolute left-6 w-5 h-5 text-gray-400" />
             <input v-model="searchQuery" type="text" placeholder="Rechercher dans cette catégorie..." class="input w-full border-none focus:ring-0 shadow-none pl-12 bg-transparent" />
          </div>

          <!-- Loading state -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="card p-4 animate-pulse">
              <div class="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <!-- Products grid -->
          <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard 
              v-for="(p, i) in filteredProducts" 
              :key="p.id" 
              :product="p" 
              :delay="i * 50" 
            />
          </div>

          <!-- Empty state -->
          <div v-else class="card p-16 text-center border border-gray-100">
            <SearchX class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Aucun produit trouvé</h3>
            <p class="text-[var(--color-text-muted)] mb-6">Ajustez vos filtres de prix ou votre recherche.</p>
            <button @click="resetFilters" class="btn-primary">
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, LayoutGrid, Package, Euro, RotateCcw, Search, SearchX, Wheat, BookOpen, Heart, Gift } from 'lucide-vue-next'
import ProductCard from '~/components/product/ProductCard.vue'
import type { Product } from '~/types'

const route = useRoute()
const currentSlug = computed(() => route.params.slug as string)

const { getProducts } = useProducts()

// Categories (Sync with catalogue)
const categories = [
  { name: 'Alimentaire', handle: 'alimentaire', icon: Wheat },
  { name: 'Scolarité', handle: 'scolarite', icon: BookOpen },
  { name: 'Santé & Bébé', handle: 'sante', icon: Heart },
  { name: 'Fêtes', handle: 'fetes', icon: Gift },
]

const currentCategoryName = computed(() => {
  const cat = categories.find(c => c.handle === currentSlug.value)
  return cat ? cat.name : currentSlug.value.replace('-', ' ')
})

// SEO
useSeoMeta({
  title: () => `${currentCategoryName.value} - Achat en ligne TchadBox`,
  description: () => `Découvrez nos meilleurs produits dans la catégorie ${currentCategoryName.value} avec livraison à N'Djamena sur TchadBox.`,
})

// State
const products = ref<Product[]>([])
const isLoading = ref(true)
const selectedPrice = ref('')
const searchQuery = ref('')
const allCategoryProducts = ref<Product[]>([]) // All products for this category

const priceRanges = [
  { label: 'Tous les prix', value: '' },
  { label: 'Moins de 30€', value: '0-30' },
  { label: '30€ - 60€', value: '30-60' },
  { label: 'Plus de 60€', value: '60+' },
]

// Fetch products based on category
const fetchProducts = async () => {
  isLoading.value = true
  
  try {
    const response = await getProducts({ category: currentSlug.value, limit: 100 })
    
    const mapped = response.products.map((p: any) => ({
      id: p.id.toString(),
      title: p.title,
      handle: p.slug,
      subtitle: p.subtitle || '',
      description: p.description || '',
      price: p.price || 0,
      thumbnail: p.thumbnail || '',
      images: p.images || [],
      category: p.category || '',
      categoryHandle: p.category_handle || '',
      inStock: p.in_stock,
    }))

    allCategoryProducts.value = mapped
    products.value = mapped
  } catch (e: any) {
    console.error('Error fetching products:', e)
  } finally {
    isLoading.value = false
  }
}

// Local filtering (Search + Price)
const filteredProducts = computed(() => {
  let result = [...allCategoryProducts.value]
  
  // Search query (local search for responsiveness inside a category)
  if (searchQuery.value && searchQuery.value.length > 2) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q))
  }
  
  // Price filtering
  if (selectedPrice.value) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    result = max 
      ? result.filter(p => p.price >= min && p.price <= max) 
      : result.filter(p => p.price >= min)
  }
  
  return result
})

const resetFilters = () => { 
  selectedPrice.value = ''
  searchQuery.value = ''
}

// Fetch on mount or when slug changes
watch(() => currentSlug.value, () => {
  fetchProducts()
}, { immediate: true })

</script>

<style scoped>
.filter-btn { @apply flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] transition-all duration-200; }
.filter-btn:hover { @apply bg-amber-50 text-amber-600; }
.filter-btn.active { @apply bg-amber-500/10 text-amber-700 font-bold border-l-4 border-amber-500 rounded-l-none; }
</style>
