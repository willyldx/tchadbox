<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4" @click.self="close">
        <div 
          v-motion
          :initial="{ opacity: 0, y: -10, scale: 0.98 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div class="relative border-b border-gray-100">
            <Search class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Rechercher un produit..."
              class="w-full pl-14 pr-12 py-5 text-lg focus:outline-none"
              @keydown.escape="close"
            />
            <button @click="close" class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <X class="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div v-if="query.length > 0" class="max-h-80 overflow-y-auto">
            <div v-if="filteredProducts.length > 0" class="p-2">
              <NuxtLink 
                v-for="product in filteredProducts" :key="product.id"
                :to="`/produit/${product.handle}`"
                class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                @click="close"
              >
                <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Package class="w-5 h-5 text-gray-400" />
                </div>
                <div class="flex-grow">
                  <h4 class="font-medium text-[var(--color-text)]">{{ product.title }}</h4>
                  <p class="text-sm text-[var(--color-text-muted)]">{{ product.category }}</p>
                </div>
                <span class="font-semibold text-[var(--color-primary)]">{{ formatPrice(product.price) }}</span>
              </NuxtLink>
            </div>
            <div v-else class="p-8 text-center">
              <SearchX class="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p class="text-[var(--color-text-muted)]">Aucun résultat pour "{{ query }}"</p>
            </div>
          </div>

          <div v-else class="p-5">
            <p class="text-sm text-[var(--color-text-muted)] mb-3">Recherches populaires</p>
            <div class="flex flex-wrap gap-2">
              <button v-for="term in ['Riz', 'Kit scolaire', 'Ramadan', 'Huile', 'Bébé']" :key="term" @click="query = term" class="px-4 py-2 rounded-full bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white text-sm transition-colors">
                {{ term }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Search, X, Package, SearchX } from 'lucide-vue-next'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const query = ref('')
const searchInput = ref<HTMLInputElement>()

const products = [
  { id: '1', title: 'Sac de riz 25kg', handle: 'sac-riz-25kg', price: 35, category: 'Alimentaire' },
  { id: '2', title: 'Sac de riz 50kg', handle: 'sac-riz-50kg', price: 65, category: 'Alimentaire' },
  { id: '3', title: 'Kit Rentrée Primaire', handle: 'kit-primaire', price: 35, category: 'Scolarité' },
  { id: '4', title: 'Pack Ramadan', handle: 'pack-ramadan', price: 95, category: 'Fêtes' },
]

const filteredProducts = computed(() => {
  if (!query.value) return []
  const q = query.value.toLowerCase()
  return products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
})

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)

const close = () => { emit('update:modelValue', false); query.value = '' }

watch(() => props.modelValue, (open) => { if (open) nextTick(() => searchInput.value?.focus()) })
</script>
