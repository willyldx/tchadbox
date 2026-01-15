<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-stone-800">Mon compte</h1>
        <p class="text-stone-500 mt-1">Bienvenue, {{ authStore.fullName || 'cher client' }}</p>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div class="p-6 border-b border-stone-100">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/25">
                  {{ authStore.initials }}
                </div>
                <div>
                  <p class="font-semibold text-stone-800">{{ authStore.fullName }}</p>
                  <p class="text-sm text-stone-500">{{ authStore.user?.email }}</p>
                </div>
              </div>
            </div>
            
            <ul class="p-2">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  :class="{ 'bg-amber-50 text-amber-700 font-medium': $route.path === item.to }"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                  <span>{{ item.label }}</span>
                  <span v-if="item.badge" class="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </li>
            </ul>

            <div class="p-2 border-t border-stone-100">
              <button
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOutIcon class="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-8">
          <!-- Quick Stats -->
          <div class="grid sm:grid-cols-3 gap-4">
            <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PackageIcon class="w-6 h-6 text-blue-600" />
                </div>
                <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Ce mois</span>
              </div>
              <p class="text-3xl font-bold text-stone-800">{{ stats.totalOrders }}</p>
              <p class="text-sm text-stone-500 mt-1">Commandes totales</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <TruckIcon class="w-6 h-6 text-amber-600" />
                </div>
                <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">En cours</span>
              </div>
              <p class="text-3xl font-bold text-stone-800">{{ stats.inProgress }}</p>
              <p class="text-sm text-stone-500 mt-1">En transit</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon class="w-6 h-6 text-green-600" />
                </div>
                <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Livrés</span>
              </div>
              <p class="text-3xl font-bold text-stone-800">{{ stats.delivered }}</p>
              <p class="text-sm text-stone-500 mt-1">Colis livrés</p>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 class="text-lg font-semibold text-stone-800">Commandes récentes</h2>
              <NuxtLink 
                to="/compte/commandes" 
                class="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Voir tout
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="recentOrders.length === 0" class="p-12 text-center">
              <div class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackageIcon class="w-8 h-8 text-stone-400" />
              </div>
              <h3 class="font-medium text-stone-800 mb-2">Aucune commande</h3>
              <p class="text-sm text-stone-500 mb-4">Vous n'avez pas encore passé de commande.</p>
              <NuxtLink
                to="/catalogue"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
              >
                <ShoppingBagIcon class="w-5 h-5" />
                Découvrir nos produits
              </NuxtLink>
            </div>

            <div v-else class="divide-y divide-stone-100">
              <NuxtLink
                v-for="order in recentOrders"
                :key="order.id"
                :to="`/compte/commandes/${order.id}`"
                class="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors"
              >
                <div class="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                  <img 
                    v-if="order.items[0]?.thumbnail" 
                    :src="order.items[0].thumbnail" 
                    :alt="order.items[0].title"
                    class="w-12 h-12 object-contain"
                  />
                  <PackageIcon v-else class="w-8 h-8 text-stone-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-stone-800">{{ order.displayId }}</p>
                  <p class="text-sm text-stone-500 truncate">
                    {{ order.items.length }} article{{ order.items.length > 1 ? 's' : '' }}
                    • {{ formatDate(order.createdAt) }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="font-semibold text-stone-800">{{ formatPrice(order.total) }}</p>
                  <span 
                    class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    :class="getStatusClass(order.fulfillmentStatus)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(order.fulfillmentStatus)"></span>
                    {{ getStatusLabel(order.fulfillmentStatus) }}
                  </span>
                </div>
                <ChevronRightIcon class="w-5 h-5 text-stone-400" />
              </NuxtLink>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="grid sm:grid-cols-2 gap-4">
            <NuxtLink
              to="/catalogue"
              class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white group hover:shadow-xl hover:shadow-amber-500/25 transition-all"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-semibold text-lg mb-1">Nouvelle commande</h3>
                  <p class="text-amber-100 text-sm">Parcourez notre catalogue et envoyez un colis</p>
                </div>
                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlusIcon class="w-6 h-6" />
                </div>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/suivi"
              class="bg-white rounded-2xl p-6 border border-stone-100 group hover:shadow-lg hover:border-stone-200 transition-all"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-semibold text-lg text-stone-800 mb-1">Suivre un colis</h3>
                  <p class="text-stone-500 text-sm">Entrez votre numéro de suivi</p>
                </div>
                <div class="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                  <SearchIcon class="w-6 h-6 text-stone-600 group-hover:text-amber-600" />
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Saved Addresses Preview -->
          <div class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 class="text-lg font-semibold text-stone-800">Adresses enregistrées</h2>
              <NuxtLink 
                to="/compte/adresses" 
                class="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Gérer
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="!authStore.hasAddresses" class="p-8 text-center">
              <MapPinIcon class="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p class="text-stone-500 mb-4">Aucune adresse enregistrée</p>
              <NuxtLink
                to="/compte/adresses"
                class="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
              >
                <PlusIcon class="w-4 h-4" />
                Ajouter une adresse
              </NuxtLink>
            </div>

            <div v-else class="p-6">
              <div v-if="authStore.defaultAddress" class="flex items-start gap-4">
                <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPinIcon class="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <p class="font-medium text-stone-800">
                      {{ authStore.defaultAddress.firstName }} {{ authStore.defaultAddress.lastName }}
                    </p>
                    <span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Par défaut</span>
                  </div>
                  <p class="text-sm text-stone-500">
                    {{ authStore.defaultAddress.address1 }}<br />
                    {{ authStore.defaultAddress.city }}, {{ authStore.defaultAddress.country }}
                  </p>
                  <p v-if="authStore.defaultAddress.phone" class="text-sm text-stone-500 mt-1">
                    {{ authStore.defaultAddress.phone }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Package as PackageIcon,
  Truck as TruckIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  ShoppingBag as ShoppingBagIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  MapPin as MapPinIcon,
  User as UserIcon,
  Heart as HeartIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon
} from 'lucide-vue-next'
import type { Order, FulfillmentStatus } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Mon compte - TchadBox',
  description: 'Gérez votre compte TchadBox, suivez vos commandes et vos colis.',
})

const authStore = useAuthStore()

// Navigation items
const navItems = [
  { to: '/compte', label: 'Tableau de bord', icon: PackageIcon },
  { to: '/compte/commandes', label: 'Mes commandes', icon: ShoppingBagIcon, badge: null },
  { to: '/compte/profil', label: 'Mon profil', icon: UserIcon },
  { to: '/compte/adresses', label: 'Adresses', icon: MapPinIcon },
  { to: '/favoris', label: 'Favoris', icon: HeartIcon },
]

// Stats (mock data - would come from API)
const stats = reactive({
  totalOrders: 0,
  inProgress: 0,
  delivered: 0,
})

// Recent orders (mock data - would come from API)
const recentOrders = ref<Order[]>([])

// Fetch user data
onMounted(async () => {
  await fetchDashboardData()
})

async function fetchDashboardData() {
  const { client } = useSupabase()
  
  if (!authStore.user) return

  try {
    // Fetch orders
    const { data: orders, error } = await client
      .from('orders')
      .select('*')
      .eq('user_id', authStore.user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (!error && orders) {
      recentOrders.value = orders.map(transformOrder)
      
      // Calculate stats
      stats.totalOrders = orders.length
      stats.inProgress = orders.filter(o => 
        ['not_fulfilled', 'partially_fulfilled', 'shipped'].includes(o.fulfillment_status)
      ).length
      stats.delivered = orders.filter(o => o.fulfillment_status === 'delivered').length
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

function transformOrder(dbOrder: any): Order {
  return {
    id: dbOrder.id,
    displayId: dbOrder.display_id || `TCB-${dbOrder.id.slice(0, 8).toUpperCase()}`,
    status: dbOrder.status,
    paymentStatus: dbOrder.payment_status,
    fulfillmentStatus: dbOrder.fulfillment_status,
    items: dbOrder.items || [],
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
    month: 'short',
    year: 'numeric',
  })
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
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

async function handleLogout() {
  await authStore.logout()
}
</script>
