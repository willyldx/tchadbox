<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-stone-800">Mes favoris</h1>
          <p class="text-stone-500 mt-1">{{ favoritesStore.count }} article{{ favoritesStore.count > 1 ? 's' : '' }} sauvegardé{{ favoritesStore.count > 1 ? 's' : '' }}</p>
        </div>

        <div v-if="!favoritesStore.isEmpty" class="flex gap-3">
          <button
            @click="moveAllToCart"
            class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
          >
            <ShoppingCartIcon class="w-5 h-5" />
            Tout ajouter au panier
          </button>
          <button
            @click="showClearConfirm = true"
            class="flex items-center gap-2 px-4 py-2 border border-stone-200 text-stone-600 font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            <TrashIcon class="w-5 h-5" />
            Vider
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="favoritesStore.isEmpty" class="bg-white rounded-2xl border border-stone-100 p-12 text-center">
        <div class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HeartIcon class="w-10 h-10 text-stone-400" />
        </div>
        <h3 class="text-lg font-semibold text-stone-800 mb-2">Aucun favori</h3>
        <p class="text-stone-500 mb-6 max-w-md mx-auto">
          Parcourez notre catalogue et cliquez sur le cœur pour sauvegarder vos produits préférés.
        </p>
        <NuxtLink
          to="/catalogue"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
        >
          <SearchIcon class="w-5 h-5" />
          Découvrir nos produits
        </NuxtLink>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in favoritesStore.items"
          :key="item.productId"
          class="bg-white rounded-2xl border border-stone-100 overflow-hidden group hover:border-stone-200 hover:shadow-lg transition-all"
        >
          <!-- Product Image -->
          <NuxtLink :to="`/produit/${item.productId}`" class="block relative aspect-square bg-stone-50">
            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <PackageIcon class="w-12 h-12 text-stone-300" />
            </div>

            <!-- Remove Button -->
            <button
              @click.prevent="removeFromFavorites(item.productId)"
              class="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group/btn"
            >
              <HeartIcon class="w-5 h-5 fill-red-500 text-red-500 group-hover/btn:scale-110 transition-transform" />
            </button>

            <!-- Category Badge -->
            <span v-if="item.category" class="absolute bottom-3 left-3 text-xs bg-white/90 backdrop-blur-sm text-stone-600 px-2 py-1 rounded-full">
              {{ item.category }}
            </span>
          </NuxtLink>

          <!-- Product Info -->
          <div class="p-4">
            <NuxtLink :to="`/produit/${item.productId}`">
              <h3 class="font-medium text-stone-800 mb-1 line-clamp-2 hover:text-amber-600 transition-colors">
                {{ item.title }}
              </h3>
            </NuxtLink>
            
            <div class="flex items-center justify-between mt-3">
              <p class="font-bold text-lg text-stone-800">{{ formatPrice(item.price) }}</p>
              <button
                @click="addToCart(item)"
                class="w-10 h-10 bg-amber-100 hover:bg-amber-500 text-amber-600 hover:text-white rounded-xl flex items-center justify-center transition-colors"
              >
                <ShoppingCartIcon class="w-5 h-5" />
              </button>
            </div>

            <p class="text-xs text-stone-400 mt-1">Ajouté {{ formatDate(item.addedAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Sync Notice for logged in users -->
      <div v-if="authStore.isAuthenticated && !favoritesStore.isEmpty" class="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3">
        <CheckCircleIcon class="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
        <div>
          <p class="text-sm text-green-800 font-medium">Favoris synchronisés</p>
          <p class="text-sm text-green-600">Vos favoris sont sauvegardés sur votre compte et accessibles depuis tous vos appareils.</p>
        </div>
      </div>

      <!-- Login prompt for guests -->
      <div v-if="!authStore.isAuthenticated && !favoritesStore.isEmpty" class="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
        <UserIcon class="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p class="text-sm text-amber-800 font-medium">Connectez-vous pour sauvegarder</p>
          <p class="text-sm text-amber-600">
            <NuxtLink to="/auth/login?redirect=/favoris" class="underline hover:no-underline">
              Connectez-vous
            </NuxtLink>
            pour synchroniser vos favoris sur tous vos appareils.
          </p>
        </div>
      </div>
    </div>

    <!-- Clear Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showClearConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-md w-full p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-stone-800 text-center mb-2">Vider les favoris ?</h3>
            <p class="text-stone-500 text-center mb-6">
              Tous vos {{ favoritesStore.count }} articles favoris seront supprimés.
            </p>
            <div class="flex gap-3">
              <button
                @click="showClearConfirm = false"
                class="flex-1 py-3 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
              >
                Annuler
              </button>
              <button
                @click="clearAll"
                class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                Vider
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  Heart as HeartIcon,
  ShoppingCart as ShoppingCartIcon,
  Trash as TrashIcon,
  Search as SearchIcon,
  Package as PackageIcon,
  CheckCircle as CheckCircleIcon,
  User as UserIcon,
} from 'lucide-vue-next'

useSeoMeta({
  title: 'Mes favoris - TchadBox',
  description: 'Retrouvez tous vos produits favoris sur TchadBox.',
})

const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const showClearConfirm = ref(false)

// Initialize favorites
onMounted(() => {
  favoritesStore.initialize()
})

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

function formatDate(date: string): string {
  const now = new Date()
  const added = new Date(date)
  const diffDays = Math.floor((now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "aujourd'hui"
  if (diffDays === 1) return 'hier'
  if (diffDays < 7) return `il y a ${diffDays} jours`
  
  return added.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

function removeFromFavorites(productId: string) {
  favoritesStore.removeFromFavorites(productId)
}

function addToCart(item: any) {
  cartStore.addItem({
    id: item.productId,
    productId: item.productId,
    title: item.title,
    price: item.price,
    thumbnail: item.thumbnail,
    category: item.category,
  })
}

function moveAllToCart() {
  favoritesStore.moveAllToCart()
}

function clearAll() {
  favoritesStore.clearAll()
  showClearConfirm.value = false
}
</script>
