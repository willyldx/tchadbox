<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-[var(--color-text-muted)]" />
        <span class="text-[var(--color-text)] font-medium">Mes commandes</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-[var(--color-text)]">Mes commandes</h1>
          <p class="text-[var(--color-text-muted)] mt-1">{{ orders.length }} commande{{ orders.length > 1 ? 's' : '' }} au total</p>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-3">
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En préparation</option>
            <option value="shipped">En transit</option>
            <option value="delivered">Livrés</option>
          </select>
        </div>
      </div>

      <!-- Orders List -->
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl border border-[var(--color-border)] p-6 animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="bg-white rounded-2xl border border-[var(--color-border)] p-12 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageIcon class="w-10 h-10 text-[var(--color-text-muted)]" />
        </div>
        <h3 class="text-lg font-semibold text-[var(--color-text)] mb-2">
          {{ statusFilter === 'all' ? 'Aucune commande' : 'Aucune commande avec ce statut' }}
        </h3>
        <p class="text-[var(--color-text-muted)] mb-6">
          {{ statusFilter === 'all' ? "Vous n'avez pas encore passé de commande." : 'Essayez un autre filtre.' }}
        </p>
        <NuxtLink
          v-if="statusFilter === 'all'"
          to="/catalogue"
          class="btn-gold"
        >
          <ShoppingBagIcon class="w-5 h-5" />
          Découvrir nos produits
        </NuxtLink>
      </div>

      <div v-else class="space-y-4">
        <NuxtLink
          v-for="order in filteredOrders"
          :key="order.id"
          :to="`/compte/commandes/${order.id}`"
          class="block bg-white rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-border)] hover:shadow-lg transition-all overflow-hidden group"
        >
          <!-- Order Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-[var(--color-border)]">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <PackageIcon class="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p class="font-semibold text-[var(--color-text)]">{{ order.displayId }}</p>
                <p class="text-sm text-[var(--color-text-muted)]">{{ formatDate(order.createdAt) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                :class="getStatusClass(order.fulfillmentStatus)"
              >
                <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(order.fulfillmentStatus)"></span>
                {{ getStatusLabel(order.fulfillmentStatus) }}
              </span>
              <ChevronRightIcon class="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-amber-500 transition-colors" />
            </div>
          </div>

          <!-- Order Items Preview -->
          <div class="p-6">
            <div class="flex items-center gap-4">
              <!-- Product Images -->
              <div class="flex -space-x-3">
                <div
                  v-for="(item, index) in order.items.slice(0, 4)"
                  :key="item.id"
                  class="w-16 h-16 bg-gray-100 rounded-xl border-2 border-white flex items-center justify-center overflow-hidden"
                  :style="{ zIndex: 4 - index }"
                >
                  <img
                    v-if="item.thumbnail"
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="w-12 h-12 object-contain"
                  />
                  <PackageIcon v-else class="w-6 h-6 text-[var(--color-text-muted)]" />
                </div>
                <div
                  v-if="order.items.length > 4"
                  class="w-16 h-16 bg-gray-200 rounded-xl border-2 border-white flex items-center justify-center text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  +{{ order.items.length - 4 }}
                </div>
              </div>

              <!-- Order Summary -->
              <div class="flex-1 min-w-0">
                <p class="text-sm text-[var(--color-text-secondary)] truncate">
                  {{ order.items.map(i => i.title).join(', ') }}
                </p>
                <p class="text-sm text-[var(--color-text-muted)] mt-1">
                  {{ order.items.length }} article{{ order.items.length > 1 ? 's' : '' }}
                </p>
              </div>

              <!-- Total -->
              <div class="text-right">
                <p class="text-lg font-bold text-[var(--color-text)]">{{ formatPrice(order.total) }}</p>
                <p class="text-xs text-[var(--color-text-muted)]">{{ formatFCFA(order.total) }}</p>
              </div>
            </div>

            <!-- Progress Bar for shipped orders -->
            <div v-if="order.fulfillmentStatus === 'shipped'" class="mt-6">
              <div class="flex items-center justify-between text-xs text-[var(--color-text-muted)] mb-2">
                <span>En transit vers N'Djamena</span>
                <span>Livraison estimée: {{ estimatedDelivery(order.createdAt) }}</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full w-2/3 animate-pulse"></div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="p-2 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 rounded-xl font-medium transition-colors"
          :class="currentPage === page 
            ? 'bg-amber-500 text-white' 
            : 'border border-[var(--color-border)] hover:bg-gray-50 text-[var(--color-text-secondary)]'"
        >
          {{ page }}
        </button>
        
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="p-2 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Package as PackageIcon,
  ShoppingBag as ShoppingBagIcon,
} from 'lucide-vue-next'
import type { Order, FulfillmentStatus } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Mes commandes - TchadBox',
  description: 'Consultez et suivez toutes vos commandes TchadBox.',
})

const authStore = useAuthStore()

// State
const orders = ref<Order[]>([])
const isLoading = ref(true)
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10

// Computed
const filteredOrders = computed(() => {
  if (statusFilter.value === 'all') return orders.value
  
  const statusMap: Record<string, FulfillmentStatus[]> = {
    pending: ['not_fulfilled', 'partially_fulfilled'],
    shipped: ['fulfilled', 'shipped'],
    delivered: ['delivered'],
  }
  
  return orders.value.filter(o => 
    statusMap[statusFilter.value]?.includes(o.fulfillmentStatus)
  )
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Fetch orders
onMounted(async () => {
  await fetchOrders()
})

const { normalizeOrder: transformOrder } = useOrderNormalizer()

async function fetchOrders() {
  if (!authStore.user) {
    isLoading.value = false
    return
  }

  try {
    const response = await useBackendApi().userOrders()
    const rawOrders = response?.data || []
    orders.value = rawOrders.map(transformOrder)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    isLoading.value = false
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
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

function estimatedDelivery(orderDate: string): string {
  const date = new Date(orderDate)
  date.setDate(date.getDate() + 14) // 14 days shipping estimate
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

function getStatusLabel(status: FulfillmentStatus): string {
  const labels: Record<FulfillmentStatus, string> = {
    not_fulfilled: 'En préparation',
    partially_fulfilled: 'Partiellement expédié',
    fulfilled: 'Expédié',
    shipped: 'En transit',
    delivered: 'Livré',
  }
  return labels[status] || status
}

function getStatusClass(status: FulfillmentStatus): string {
  const classes: Record<FulfillmentStatus, string> = {
    not_fulfilled: 'bg-gray-100 text-[var(--color-text-secondary)]',
    partially_fulfilled: 'bg-blue-100 text-blue-700',
    fulfilled: 'bg-blue-100 text-blue-700',
    shipped: 'bg-amber-100 text-amber-700',
    delivered: 'bg-green-100 text-green-700',
  }
  return classes[status] || 'bg-gray-100 text-[var(--color-text-secondary)]'
}

function getStatusDotClass(status: FulfillmentStatus): string {
  const classes: Record<FulfillmentStatus, string> = {
    not_fulfilled: 'bg-gray-500',
    partially_fulfilled: 'bg-blue-500',
    fulfilled: 'bg-blue-500',
    shipped: 'bg-amber-500',
    delivered: 'bg-green-500',
  }
  return classes[status] || 'bg-gray-500'
}
</script>
