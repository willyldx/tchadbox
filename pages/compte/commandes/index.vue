<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-stone-500 hover:text-amber-600">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <span class="text-stone-800 font-medium">Mes commandes</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-stone-800">Mes commandes</h1>
          <p class="text-stone-500 mt-1">{{ orders.length }} commande{{ orders.length > 1 ? 's' : '' }} au total</p>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-3">
          <select
            v-model="statusFilter"
            class="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
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
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl border border-stone-100 p-6 animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-stone-200 rounded-xl"></div>
            <div class="flex-1">
              <div class="h-4 bg-stone-200 rounded w-32 mb-2"></div>
              <div class="h-3 bg-stone-200 rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredOrders.length === 0" class="bg-white rounded-2xl border border-stone-100 p-12 text-center">
        <div class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageIcon class="w-10 h-10 text-stone-400" />
        </div>
        <h3 class="text-lg font-semibold text-stone-800 mb-2">
          {{ statusFilter === 'all' ? 'Aucune commande' : 'Aucune commande avec ce statut' }}
        </h3>
        <p class="text-stone-500 mb-6">
          {{ statusFilter === 'all' ? "Vous n'avez pas encore passé de commande." : 'Essayez un autre filtre.' }}
        </p>
        <NuxtLink
          v-if="statusFilter === 'all'"
          to="/catalogue"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
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
          class="block bg-white rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all overflow-hidden group"
        >
          <!-- Order Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-stone-100">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <PackageIcon class="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p class="font-semibold text-stone-800">{{ order.displayId }}</p>
                <p class="text-sm text-stone-500">{{ formatDate(order.createdAt) }}</p>
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
              <ChevronRightIcon class="w-5 h-5 text-stone-400 group-hover:text-amber-500 transition-colors" />
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
                  class="w-16 h-16 bg-stone-100 rounded-xl border-2 border-white flex items-center justify-center overflow-hidden"
                  :style="{ zIndex: 4 - index }"
                >
                  <img
                    v-if="item.thumbnail"
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="w-12 h-12 object-contain"
                  />
                  <PackageIcon v-else class="w-6 h-6 text-stone-400" />
                </div>
                <div
                  v-if="order.items.length > 4"
                  class="w-16 h-16 bg-stone-200 rounded-xl border-2 border-white flex items-center justify-center text-sm font-medium text-stone-600"
                >
                  +{{ order.items.length - 4 }}
                </div>
              </div>

              <!-- Order Summary -->
              <div class="flex-1 min-w-0">
                <p class="text-sm text-stone-600 truncate">
                  {{ order.items.map(i => i.title).join(', ') }}
                </p>
                <p class="text-sm text-stone-400 mt-1">
                  {{ order.items.length }} article{{ order.items.length > 1 ? 's' : '' }}
                </p>
              </div>

              <!-- Total -->
              <div class="text-right">
                <p class="text-lg font-bold text-stone-800">{{ formatPrice(order.total) }}</p>
                <p class="text-xs text-stone-400">{{ formatFCFA(order.total) }}</p>
              </div>
            </div>

            <!-- Progress Bar for shipped orders -->
            <div v-if="order.fulfillmentStatus === 'shipped'" class="mt-6">
              <div class="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>En transit vers N'Djamena</span>
                <span>Livraison estimée: {{ estimatedDelivery(order.createdAt) }}</span>
              </div>
              <div class="h-2 bg-stone-100 rounded-full overflow-hidden">
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
          class="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            : 'border border-stone-200 hover:bg-stone-50 text-stone-600'"
        >
          {{ page }}
        </button>
        
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

async function fetchOrders() {
  const { client } = useSupabase()
  
  if (!authStore.user) {
    isLoading.value = false
    return
  }

  try {
    const { data, error } = await client
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', authStore.user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      orders.value = data.map(transformOrder)
    }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    isLoading.value = false
  }
}

function transformOrder(dbOrder: any): Order {
  return {
    id: dbOrder.id,
    displayId: dbOrder.display_id || `TCB-${dbOrder.id.slice(0, 8).toUpperCase()}`,
    status: dbOrder.status,
    paymentStatus: dbOrder.payment_status,
    fulfillmentStatus: dbOrder.fulfillment_status,
    items: (dbOrder.order_items || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      total: item.total,
    })),
    shippingAddress: dbOrder.shipping_address || {},
    subtotal: dbOrder.subtotal || 0,
    shippingTotal: dbOrder.shipping_total || 0,
    total: dbOrder.total || 0,
    currency: 'EUR',
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
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
    not_fulfilled: 'bg-stone-100 text-stone-700',
    partially_fulfilled: 'bg-blue-100 text-blue-700',
    fulfilled: 'bg-blue-100 text-blue-700',
    shipped: 'bg-amber-100 text-amber-700',
    delivered: 'bg-green-100 text-green-700',
  }
  return classes[status] || 'bg-stone-100 text-stone-700'
}

function getStatusDotClass(status: FulfillmentStatus): string {
  const classes: Record<FulfillmentStatus, string> = {
    not_fulfilled: 'bg-stone-500',
    partially_fulfilled: 'bg-blue-500',
    fulfilled: 'bg-blue-500',
    shipped: 'bg-amber-500',
    delivered: 'bg-green-500',
  }
  return classes[status] || 'bg-stone-500'
}
</script>
