<template>
  <div>
    <!-- Hero -->
    <section class="hero-gradient text-white py-16">
      <div class="container-main">
        <div class="flex items-center gap-2 text-blue-200 text-sm mb-4">
          <NuxtLink to="/" class="hover:text-white transition-colors">Accueil</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white">Catalogue</span>
        </div>
        <h1 class="heading-section text-white">Notre Catalogue</h1>
        <p class="text-blue-200 mt-2">{{ filteredProducts.length }} produits disponibles</p>
      </div>
    </section>

    <div class="container-main py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="card p-6 sticky top-28">
            <div class="mb-8">
              <h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <LayoutGrid class="w-5 h-5 text-[var(--color-primary)]" />Catégories
              </h3>
              <div class="space-y-2">
                <button @click="selectedCategory = ''" class="filter-btn w-full" :class="{ active: !selectedCategory }">
                  <Package class="w-5 h-5" />Toutes<span class="ml-auto text-sm opacity-50">{{ products.length }}</span>
                </button>
                <button v-for="cat in categories" :key="cat.handle" @click="selectedCategory = cat.handle" class="filter-btn w-full" :class="{ active: selectedCategory === cat.handle }">
                  <component :is="cat.icon" class="w-5 h-5" />{{ cat.name }}<span class="ml-auto text-sm opacity-50">{{ getCount(cat.handle) }}</span>
                </button>
              </div>
            </div>
            <div class="mb-8">
              <h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                <Euro class="w-5 h-5 text-[var(--color-primary)]" />Prix
              </h3>
              <div class="space-y-2">
                <label v-for="r in priceRanges" :key="r.value" class="flex items-center gap-3 py-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  <input type="radio" v-model="selectedPrice" :value="r.value" class="sr-only" />
                  <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center" :class="selectedPrice === r.value ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' : 'border-gray-300'">
                    <span v-if="selectedPrice === r.value" class="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  {{ r.label }}
                </label>
              </div>
            </div>
            <button v-if="hasFilters" @click="resetFilters" class="btn-ghost w-full"><RotateCcw class="w-4 h-4" />Réinitialiser</button>
          </div>
        </aside>

        <!-- Products -->
        <div class="flex-grow">
          <div class="card p-4 mb-6 flex gap-4 items-center">
            <div class="relative flex-grow">
              <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="searchQuery" type="text" placeholder="Rechercher..." class="input pl-12" />
            </div>
          </div>

          <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard v-for="(p, i) in filteredProducts" :key="p.id" :product="p" :delay="i * 50" />
          </div>

          <div v-else class="card p-16 text-center">
            <SearchX class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-[var(--color-text)] mb-2">Aucun produit</h3>
            <p class="text-[var(--color-text-muted)] mb-6">Modifiez vos filtres</p>
            <button @click="resetFilters" class="btn-primary"><span>Voir tous</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, LayoutGrid, Package, Euro, RotateCcw, Search, SearchX, Wheat, BookOpen, Heart, Gift } from 'lucide-vue-next'
import ProductCard from '~/components/product/ProductCard.vue'

const route = useRoute()

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

const products = [
  { id: '1', title: 'Sac de riz 25kg', handle: 'sac-riz-25kg', price: 35, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Qualité premium' },
  { id: '2', title: 'Sac de riz 50kg', handle: 'sac-riz-50kg', price: 65, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Format familial' },
  { id: '3', title: 'Huile végétale 5L', handle: 'huile-5l', price: 18, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Huile de cuisson' },
  { id: '4', title: 'Huile végétale 20L', handle: 'huile-20l', price: 55, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Grande quantité' },
  { id: '5', title: 'Sucre 10kg', handle: 'sucre-10kg', price: 22, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Sucre blanc' },
  { id: '6', title: 'Sucre 25kg', handle: 'sucre-25kg', price: 45, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Format familial' },
  { id: '7', title: 'Carton de lait', handle: 'carton-lait', price: 40, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: '12 boîtes' },
  { id: '8', title: 'Pack Familial', handle: 'pack-familial', price: 85, category: 'Alimentaire', categoryHandle: 'alimentaire', subtitle: 'Riz + Huile + Sucre' },
  { id: '9', title: 'Kit Rentrée Primaire', handle: 'kit-primaire', price: 35, category: 'Scolarité', categoryHandle: 'scolarite', subtitle: 'École primaire' },
  { id: '10', title: 'Kit Collège/Lycée', handle: 'kit-college', price: 50, category: 'Scolarité', categoryHandle: 'scolarite', subtitle: 'Fournitures complètes' },
  { id: '11', title: 'Pack 10 cahiers', handle: 'pack-cahiers', price: 12, category: 'Scolarité', categoryHandle: 'scolarite', subtitle: 'Grand format' },
  { id: '12', title: 'Pack fournitures', handle: 'pack-fournitures', price: 20, category: 'Scolarité', categoryHandle: 'scolarite', subtitle: 'Stylos, crayons...' },
  { id: '13', title: 'Kit Médicaments', handle: 'kit-medicaments', price: 25, category: 'Santé & Bébé', categoryHandle: 'sante', subtitle: 'Pharmacie familiale' },
  { id: '14', title: 'Kit Nouveau-né', handle: 'kit-nouveau-ne', price: 45, category: 'Santé & Bébé', categoryHandle: 'sante', subtitle: 'Pour bébé' },
  { id: '15', title: 'Pack Hygiène', handle: 'pack-hygiene', price: 30, category: 'Santé & Bébé', categoryHandle: 'sante', subtitle: 'Produits d\'hygiène' },
  { id: '16', title: 'Pack Ramadan', handle: 'pack-ramadan', price: 95, category: 'Fêtes', categoryHandle: 'fetes', subtitle: 'Mois sacré' },
  { id: '17', title: 'Pack Tabaski', handle: 'pack-tabaski', price: 180, category: 'Fêtes', categoryHandle: 'fetes', subtitle: 'Fête du mouton' },
  { id: '18', title: 'Pack Cadeau', handle: 'pack-cadeau', price: 100, category: 'Fêtes', categoryHandle: 'fetes', subtitle: 'Surprise' },
]

const selectedCategory = ref(route.query.categorie as string || '')
const selectedPrice = ref('')
const searchQuery = ref('')

const filteredProducts = computed(() => {
  let result = [...products]
  if (selectedCategory.value) result = result.filter(p => p.categoryHandle === selectedCategory.value)
  if (selectedPrice.value) {
    const [min, max] = selectedPrice.value.split('-').map(Number)
    result = max ? result.filter(p => p.price >= min && p.price <= max) : result.filter(p => p.price >= min)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }
  return result
})

const hasFilters = computed(() => selectedCategory.value || selectedPrice.value || searchQuery.value)
const getCount = (handle: string) => products.filter(p => p.categoryHandle === handle).length
const resetFilters = () => { selectedCategory.value = ''; selectedPrice.value = ''; searchQuery.value = '' }

watch(() => route.query.categorie, (v) => { selectedCategory.value = v as string || '' }, { immediate: true })

useHead({ title: 'Catalogue' })
</script>

<style scoped>
.filter-btn { @apply flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] transition-all duration-200; }
.filter-btn:hover { @apply bg-gray-50; }
.filter-btn.active { @apply bg-amber-500/10 text-amber-600 font-medium; }
</style>
