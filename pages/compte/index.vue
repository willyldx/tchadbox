<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[var(--color-text)]">Mon compte</h1>
        <p class="text-[var(--color-text-muted)] mt-1">Bienvenue, {{ authStore.fullName || 'cher client' }}</p>
      </div>

      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="card overflow-hidden">
            <div class="p-6 border-b border-[var(--color-border)]">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-amber-500/25">
                  {{ authStore.initials }}
                </div>
                <div>
                  <p class="font-semibold text-[var(--color-text)]">{{ authStore.fullName }}</p>
                  <p class="text-sm text-[var(--color-text-muted)]">{{ authStore.user?.email }}</p>
                </div>
              </div>
            </div>
            
            <ul class="p-2">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-amber-50 hover:text-amber-700 transition-colors"
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

            <div class="p-2 border-t border-[var(--color-border)]">
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
            <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PackageIcon class="w-6 h-6 text-blue-600" />
                </div>
                <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Ce mois</span>
              </div>
              <p class="text-3xl font-bold text-[var(--color-text)]">{{ stats.totalOrders }}</p>
              <p class="text-sm text-[var(--color-text-muted)] mt-1">Commandes totales</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <TruckIcon class="w-6 h-6 text-amber-600" />
                </div>
                <span class="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">En cours</span>
              </div>
              <p class="text-3xl font-bold text-[var(--color-text)]">{{ stats.inProgress }}</p>
              <p class="text-sm text-[var(--color-text-muted)] mt-1">En transit</p>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon class="w-6 h-6 text-green-600" />
                </div>
                <span class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Livrés</span>
              </div>
              <p class="text-3xl font-bold text-[var(--color-text)]">{{ stats.delivered }}</p>
              <p class="text-sm text-[var(--color-text-muted)] mt-1">Colis livrés</p>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 class="text-lg font-semibold text-[var(--color-text)]">Commandes récentes</h2>
              <NuxtLink 
                to="/compte/commandes" 
                class="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Voir tout
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="recentOrders.length === 0" class="p-12 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackageIcon class="w-8 h-8 text-[var(--color-text-muted)]" />
              </div>
              <h3 class="font-medium text-[var(--color-text)] mb-2">Aucune commande</h3>
              <p class="text-sm text-[var(--color-text-muted)] mb-4">Vous n'avez pas encore passé de commande.</p>
              <NuxtLink
                to="/catalogue"
                class="btn-gold"
              >
                <ShoppingBagIcon class="w-5 h-5" />
                Découvrir nos produits
              </NuxtLink>
            </div>

            <div v-else class="divide-y divide-[var(--color-border)]">
              <NuxtLink
                v-for="order in recentOrders"
                :key="order.id"
                :to="`/compte/commandes/${order.id}`"
                class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <img 
                    v-if="order.items[0]?.thumbnail" 
                    :src="order.items[0].thumbnail" 
                    :alt="order.items[0].title"
                    class="w-12 h-12 object-contain"
                  />
                  <PackageIcon v-else class="w-8 h-8 text-[var(--color-text-muted)]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-[var(--color-text)]">{{ order.displayId }}</p>
                  <p class="text-sm text-[var(--color-text-muted)] truncate">
                    {{ order.items.length }} article{{ order.items.length > 1 ? 's' : '' }}
                    • {{ formatDate(order.createdAt) }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="font-semibold text-[var(--color-text)]">{{ formatPrice(order.total) }}</p>
                  <span 
                    class="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    :class="getStatusClass(order.fulfillmentStatus)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(order.fulfillmentStatus)"></span>
                    {{ getStatusLabel(order.fulfillmentStatus) }}
                  </span>
                </div>
                <ChevronRightIcon class="w-5 h-5 text-[var(--color-text-muted)]" />
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
              class="bg-white rounded-2xl p-6 border border-[var(--color-border)] group hover:shadow-lg hover:border-[var(--color-border)] transition-all"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-semibold text-lg text-[var(--color-text)] mb-1">Suivre un colis</h3>
                  <p class="text-[var(--color-text-muted)] text-sm">Entrez votre numéro de suivi</p>
                </div>
                <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:text-[var(--color-accent-dark)] transition-colors">
                  <SearchIcon class="w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)]" />
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Saved Addresses Preview -->
          <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            <div class="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <h2 class="text-lg font-semibold text-[var(--color-text)]">Adresses enregistrées</h2>
              <NuxtLink 
                to="/compte/adresses" 
                class="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
              >
                Gérer
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="!authStore.hasAddresses" class="p-8 text-center">
              <MapPinIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p class="text-[var(--color-text-muted)] mb-4">Aucune adresse enregistrée</p>
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
                    <p class="font-medium text-[var(--color-text)]">
                      {{ authStore.defaultAddress.firstName }} {{ authStore.defaultAddress.lastName }}
                    </p>
                    <span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Par défaut</span>
                  </div>
                  <p class="text-sm text-[var(--color-text-muted)]">
                    {{ authStore.defaultAddress.address1 }}<br />
                    {{ authStore.defaultAddress.city }}, {{ authStore.defaultAddress.country }}
                  </p>
                  <p v-if="authStore.defaultAddress.phone" class="text-sm text-[var(--color-text-muted)] mt-1">
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

// Stats
const stats = reactive({
  totalOrders: 0,
  inProgress: 0,
  delivered: 0,
})

// Recent orders
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

const { normalizeOrder: transformOrder } = useOrderNormalizer()

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

async function handleLogout() {
  await authStore.logout()
}
</script>
