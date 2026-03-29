<template>
  <div>
    <!-- Hero -->
    <section class="relative text-white py-24 sm:py-32 overflow-hidden flex items-end">
      <NuxtImg 
        src="/hero-catalogue.png" 
        alt="Catalogue TchadBox" 
        class="absolute inset-0 w-full h-full object-cover transform scale-[1.02]" 
        loading="eager"
        quality="80"
        format="webp"
        sizes="100vw"
      />
      <!-- Cinematic Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/70 to-black/20" />
      
      <div class="container-main relative z-10 w-full">
        <div class="max-w-3xl">
          <div class="flex items-center gap-2 text-white/70 text-sm mb-6 uppercase tracking-widest font-bold">
            <NuxtLink to="/" class="hover:text-[var(--color-accent)] transition-colors">Accueil</NuxtLink>
            <ChevronRight class="w-4 h-4" />
            <span class="text-[var(--color-accent-light)]">Catalogue Complet</span>
          </div>
          <h1 class="heading-hero text-white mb-4">Notre Catalogue</h1>
          <p class="text-white/80 text-lg sm:text-xl font-medium leading-relaxed">
            Parcourez notre sélection exclusive de biens essentiels.
            <strong class="text-white">Qualité garantie</strong> et <strong class="text-[var(--color-accent)]">Livraison express</strong> à N'Djamena.
          </p>
        </div>
      </div>
    </section>

    <div class="container-main py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 ring-1 ring-slate-900/5 sticky top-28">
            <div class="mb-8">
              <h3 class="font-bold text-lg text-[var(--color-primary)] mb-5 flex items-center gap-2">
                <LayoutGrid class="w-5 h-5 text-[var(--color-accent)]" /> Catégories
              </h3>
              <div class="space-y-1.5 border-b border-gray-100 pb-8">
                <button @click="selectedCategory = ''" class="filter-btn w-full" :class="{ active: !selectedCategory }">
                  <Package class="w-5 h-5" />Toutes
                  <span class="ml-auto text-xs font-bold py-1 px-2 rounded-full" :class="!selectedCategory ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'">{{ products.length }}</span>
                </button>
                <NuxtLink v-for="cat in categories" :key="cat.handle" :to="`/categories/${cat.handle}`" class="filter-btn w-full" :class="{ active: selectedCategory === cat.handle }">
                  <component :is="cat.icon" class="w-5 h-5" />{{ cat.name }}
                  <span class="ml-auto text-xs font-bold py-1 px-2 rounded-full" :class="selectedCategory === cat.handle ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'">{{ getCount(cat.handle) }}</span>
                </NuxtLink>
              </div>
            </div>
            
            <div class="mb-8">
              <h3 class="font-bold text-lg text-[var(--color-primary)] mb-5 flex items-center gap-2">
                <Euro class="w-5 h-5 text-[var(--color-accent)]" /> Budget
              </h3>
              <div class="space-y-2.5">
                <label v-for="r in priceRanges" :key="r.value" class="flex items-center gap-3 py-1 cursor-pointer group">
                  <input type="radio" v-model="selectedPrice" :value="r.value" class="sr-only" />
                  <span class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors" :class="selectedPrice === r.value ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-gray-300 group-hover:border-[var(--color-accent)]/50'">
                    <span v-if="selectedPrice === r.value" class="w-2 h-2 rounded-full bg-white shadow-sm" />
                  </span>
                  <span class="text-sm font-medium transition-colors" :class="selectedPrice === r.value ? 'text-[var(--color-primary)]' : 'text-gray-500 group-hover:text-gray-800'">
                    {{ r.label }}
                  </span>
                </label>
              </div>
            </div>
            
            <button v-if="hasFilters" @click="resetFilters" class="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 transition-all border border-gray-200">
              <RotateCcw class="w-4 h-4" /> Réinitialiser les filtres
            </button>
          </div>
        </aside>

        <!-- Products -->
        <div class="flex-grow">
          <!-- Main Search Bar -->
          <div class="bg-white rounded-2xl p-2 sm:p-3 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex gap-4 items-center ring-1 ring-slate-900/5 transition-all focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:shadow-md group">
            <div class="relative flex-grow flex items-center">
              <Search class="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-[var(--color-accent)] transition-colors" />
              <input v-model="searchQuery" type="text" placeholder="Rechercher un produit (ex: Riz, Sucre)..." class="w-full bg-transparent border-none py-3 pl-12 pr-4 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-0 text-base sm:text-lg" />
            </div>
            <!-- Quick badge -->
            <div class="hidden sm:flex px-4 py-2 bg-gray-50 rounded-xl text-sm text-[var(--color-primary)] font-bold border border-gray-100">
              {{ filteredProducts.length }} RÉSULTATS
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="i in 6" :key="i" class="card p-4 animate-pulse">
              <div class="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="card p-16 text-center">
            <AlertCircle class="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Chargement impossible</h3>
            <p class="text-[var(--color-text-muted)] mb-6">{{ error }}</p>
            <button @click="fetchProducts" class="btn-primary"><span>Réessayer</span></button>
          </div>

          <!-- Products grid -->
          <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard v-for="(p, i) in filteredProducts" :key="p.id" :product="p" :delay="i * 50" />
          </div>

          <!-- Empty state -->
          <div v-else class="card p-16 text-center">
            <SearchX class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Aucun produit trouvé</h3>
            <p class="text-[var(--color-text-muted)] mb-6">Essayez d'ajuster vos critères de recherche</p>
            <button @click="resetFilters" class="btn-primary"><span>Afficher tout le catalogue</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, LayoutGrid, Package, Euro, RotateCcw, Search, SearchX, AlertCircle, Wheat, BookOpen, Heart, Gift } from 'lucide-vue-next'
import ProductCard from '~/components/product/ProductCard.vue'
import type { Product } from '~/types'

const route = useRoute()
const { getProducts } = useProducts()

// State
const products = ref<Product[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const isSearchMode = ref(false) // true when using Meilisearch results

// Categories
const categories = [
  { name: 'Alimentaire', handle: 'alimentaire', icon: Wheat },
  { name: 'Scolarité', handle: 'scolarite', icon: BookOpen },
  { name: 'Santé & Bébé', handle: 'sante', icon: Heart },
  { name: 'Fêtes', handle: 'fetes', icon: Gift },
]

const priceRanges = [
  { label: 'Tous les prix', value: '' },
  { label: 'Moins de 30€', value: '0-30' },
  { label: '30€ - 60€', value: '30-60' },
  { label: 'Plus de 60€', value: '60+' },
]

const selectedCategory = ref(route.query.categorie as string || '')
const selectedPrice = ref('')
const searchQuery = ref('')

// Keep a copy of the full product list from Laravel (for counts + reset)
const allProducts = ref<Product[]>([])

// Fetch products from Laravel API (initial load)
const fetchProducts = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await getProducts({ limit: 100 })
    
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

    allProducts.value = mapped
    products.value = mapped
  } catch (e: any) {
    console.error('Error fetching products:', e)
    error.value = 'Impossible de charger le catalogue. Vérifiez votre connexion internet et réessayez.'
  } finally {
    isLoading.value = false
  }
}

// Build Meilisearch filter string from active filters
const buildMeilisearchFilter = (): string[] => {
  const filters: string[] = []
  
  if (selectedCategory.value) {
    filters.push(`category_handle = "${selectedCategory.value}"`)
  }
  
  if (selectedPrice.value) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    if (max) {
      filters.push(`price >= ${min}`)
      filters.push(`price <= ${max}`)
    } else {
      // "60+" case
      filters.push(`price >= ${min}`)
    }
  }

  // Always filter active products
  filters.push('is_active = true')

  return filters
}

// Perform Meilisearch search
const doMeilisearch = async (query: string) => {
  isLoading.value = true
  
  try {
    const { performSearch } = useMeilisearch()
    const filter = buildMeilisearchFilter()
    
    const results = await performSearch(query, {
      limit: 50,
      filter,
    })

    products.value = (results.hits || []).map((p: any) => ({
      id: p.id.toString(),
      title: p.title,
      handle: p.slug || p.id.toString(),
      subtitle: p.subtitle || '',
      description: p.description || '',
      price: p.price || 0,
      thumbnail: p.thumbnail || '',
      images: [],
      category: p.category || '',
      categoryHandle: p.category_handle || '',
      inStock: p.in_stock ?? true,
    }))

    isSearchMode.value = true
  } catch (e) {
    console.error('Meilisearch error, falling back to frontend filter:', e)
    // Fallback: filter from allProducts
    isSearchMode.value = false
  } finally {
    isLoading.value = false
  }
}

// Debounced search watcher
let searchTimeout: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (q) => {
  if (searchTimeout) clearTimeout(searchTimeout)

  if (!q || q.length < 2) {
    // Revert to full list from Laravel
    isSearchMode.value = false
    products.value = [...allProducts.value]
    return
  }

  searchTimeout = setTimeout(() => doMeilisearch(q), 300)
})

// When category or price filters change while searching, re-run Meilisearch
watch([selectedCategory, selectedPrice], () => {
  if (searchQuery.value && searchQuery.value.length >= 2) {
    // Re-run search with new filters
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => doMeilisearch(searchQuery.value), 150)
  }
})

// Filtered products (frontend filtering when NOT in search mode)
const filteredProducts = computed(() => {
  // If Meilisearch handled the query + filters, just return the results as-is
  if (isSearchMode.value) {
    return products.value
  }

  // Frontend filtering for initial load / no search query
  let result = [...products.value]
  
  if (selectedCategory.value) {
    result = result.filter(p => p.categoryHandle === selectedCategory.value)
  }
  
  if (selectedPrice.value) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    result = max 
      ? result.filter(p => p.price >= min && p.price <= max) 
      : result.filter(p => p.price >= min)
  }
  
  return result
})

const hasFilters = computed(() => selectedCategory.value || selectedPrice.value || searchQuery.value)

// Counts always use the full list from Laravel
const getCount = (handle: string) => allProducts.value.filter(p => p.categoryHandle === handle).length

const resetFilters = () => { 
  selectedCategory.value = ''
  selectedPrice.value = ''
  searchQuery.value = ''
  isSearchMode.value = false
  products.value = [...allProducts.value]
}

// Watch route query
watch(() => route.query.categorie, (v) => { 
  selectedCategory.value = v as string || '' 
}, { immediate: true })

// Fetch on mount
onMounted(() => {
  fetchProducts()
})

useHead({ title: 'Catalogue' })
</script>

<style scoped>
.filter-btn { @apply flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium transition-all duration-200 border border-transparent; }
.filter-btn:hover { @apply bg-gray-50 border-gray-100 text-gray-900; }
.filter-btn.active { @apply bg-amber-50 border-amber-200 text-amber-800 font-bold shadow-sm; }
</style>
