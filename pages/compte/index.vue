<template>
  <div class="min-h-screen bg-gray-50/50 pt-32 pb-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Premium Header -->
      <div class="mb-12 border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Mon compte</h1>
          <p class="text-gray-500 font-medium mt-2">Services exclusifs et conciergerie pour <span class="font-bold text-gray-900">{{ authStore.fullName || 'vous' }}</span></p>
        </div>
      </div>

      <div class="grid xl:grid-cols-4 gap-8">
        <!-- Luxury Sidebar Navigation -->
        <div class="xl:col-span-1">
          <nav class="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 sticky top-32">
            <!-- Profile Avatar Block -->
            <div class="p-8 border-b border-gray-50 bg-gray-900 text-white relative">
               <div class="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800"></div>
              <div class="flex items-center gap-5 relative z-10">
                <div class="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                  {{ authStore.initials }}
                </div>
                <div class="min-w-0">
                  <p class="font-black text-white truncate text-lg tracking-tight">{{ authStore.fullName }}</p>
                  <p class="text-xs font-medium text-gray-400 truncate mt-0.5 tracking-wide">{{ authStore.user?.email }}</p>
                </div>
              </div>
            </div>
            
            <ul class="p-3 space-y-1">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 px-5 py-4 rounded-2xl text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900 transition-all group"
                  :class="{ 'bg-gray-50 !text-gray-900 font-bold shadow-sm': $route.path === item.to }"
                >
                  <component :is="item.icon" class="w-5 h-5 transition-transform group-hover:scale-110" :class="{ 'text-gray-900': $route.path === item.to }" />
                  <span>{{ item.label }}</span>
                  <span v-if="item.badge" class="ml-auto bg-gray-900 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </li>
            </ul>

            <div class="p-3 border-t border-gray-50">
              <button
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-gray-400 font-medium hover:bg-red-50 hover:text-red-500 transition-all group"
              >
                <LogOutIcon class="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>

        <!-- Main Content (Conciergerie) -->
        <div class="xl:col-span-3 space-y-8">
          <!-- Quick Status Board (Sleek Grayscale UI) -->
          <div class="grid sm:grid-cols-3 gap-6">
            <div class="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-8 group hover:border-gray-300 transition-colors">
              <div class="flex items-center justify-between mb-8">
                <div class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                  <PackageIcon class="w-5 h-5 text-gray-900" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">Activité</span>
              </div>
              <p class="text-4xl font-black text-gray-900 tracking-tighter">{{ stats.totalOrders }}</p>
              <p class="text-sm font-medium text-gray-500 mt-2">Commandes totales</p>
            </div>

            <div class="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-8 group hover:border-gray-300 transition-colors">
              <div class="flex items-center justify-between mb-8">
                <div class="relative w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                  <div v-if="stats.inProgress > 0" class="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-ping"></div>
                  <div v-if="stats.inProgress > 0" class="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                  <TruckIcon class="w-5 h-5 text-gray-900" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">En cours</span>
              </div>
              <p class="text-4xl font-black text-gray-900 tracking-tighter">{{ stats.inProgress }}</p>
              <p class="text-sm font-medium text-gray-500 mt-2">Logistiques actives</p>
            </div>

            <div class="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 p-8 group hover:border-gray-300 transition-colors">
              <div class="flex items-center justify-between mb-8">
                <div class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircleIcon class="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1.5 rounded-full border border-[var(--color-accent)]/20">Livrés</span>
              </div>
              <p class="text-4xl font-black text-gray-900 tracking-tighter">{{ stats.delivered }}</p>
              <p class="text-sm font-medium text-gray-500 mt-2">Expéditions terminées</p>
            </div>
          </div>

          <!-- Quick Actions (Exclusive Access) -->
          <div class="grid sm:grid-cols-2 gap-6">
            <NuxtLink
              to="/catalogue"
              class="relative bg-gray-900 rounded-[2rem] p-8 text-white group overflow-hidden shadow-2xl"
            >
              <div class="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-0"></div>
              <div class="relative z-10 flex items-start justify-between">
                <div>
                  <h3 class="font-black text-2xl mb-2 tracking-tight">Initier un envoi</h3>
                  <p class="text-gray-400 font-medium text-sm leading-relaxed max-w-[200px]">Commandez maintenant, nous expédions sur N'Djamena demain.</p>
                </div>
                <div class="w-14 h-14 bg-white text-gray-900 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <PlusIcon class="w-6 h-6" />
                </div>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/suivi"
              class="bg-white/50 backdrop-blur-md rounded-[2rem] p-8 border border-gray-200 group hover:bg-white hover:shadow-lg hover:border-gray-300 transition-all"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-black text-2xl text-gray-900 mb-2 tracking-tight">Tracking live</h3>
                  <p class="text-gray-500 font-medium text-sm leading-relaxed max-w-[200px]">Suivez en direct la progression de vos biens.</p>
                </div>
                <div class="w-14 h-14 bg-white shadow-sm border border-gray-100 rounded-[1.5rem] flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <SearchIcon class="w-5 h-5" />
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Recent Operations List -->
          <div class="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100/80 overflow-hidden">
            <div class="flex items-center justify-between p-8 border-b border-gray-50">
              <h2 class="text-xl font-black text-gray-900 tracking-tight">Opérations récentes</h2>
              <NuxtLink 
                to="/compte/commandes" 
                class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Tout l'historique
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="recentOrders.length === 0" class="p-16 text-center">
              <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageIcon class="w-8 h-8 text-gray-300" />
              </div>
              <h3 class="font-black text-xl text-gray-900 mb-2">Historique vierge</h3>
              <p class="text-gray-500 font-medium mb-8">Votre registre de d'expéditions est actuellement vide.</p>
              <NuxtLink to="/catalogue" class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md">
                <ShoppingBagIcon class="w-4 h-4 opacity-70" /> Visiter la boutique
              </NuxtLink>
            </div>

            <div v-else class="divide-y divide-gray-50">
              <NuxtLink
                v-for="order in recentOrders"
                :key="order.id"
                :to="`/compte/commandes/${order.id}`"
                class="flex flex-col sm:flex-row sm:items-center gap-5 p-6 hover:bg-gray-50/50 transition-colors group"
              >
                <div class="flex items-center gap-5 flex-1 min-w-0">
                   <div class="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center shrink-0">
                     <img 
                       v-if="order.items[0]?.thumbnail" 
                       :src="order.items[0].thumbnail" 
                       :alt="order.items[0].title"
                       class="w-10 h-10 object-contain mix-blend-multiply"
                     />
                     <PackageIcon v-else class="w-6 h-6 text-gray-300" />
                   </div>
                   <div class="min-w-0 pr-4">
                     <p class="font-black text-gray-900 tracking-tight">{{ order.displayId }}</p>
                     <p class="text-sm font-medium text-gray-500 truncate mt-0.5">
                       {{ formatDate(order.createdAt) }} • {{ order.items.length }} article{{ order.items.length > 1 ? 's' : '' }}
                     </p>
                   </div>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-6 sm:w-auto mt-4 sm:mt-0 pl-21 sm:pl-0">
                  <div class="text-left sm:text-right">
                    <p class="font-black text-gray-900">{{ formatPrice(order.total) }}</p>
                  </div>
                  
                  <span 
                    class="inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shrink-0"
                    :class="getStatusClass(order.fulfillmentStatus)"
                  >
                    {{ getStatusLabel(order.fulfillmentStatus) }}
                  </span>
                  
                  <div class="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-gray-900 group-hover:border-gray-300 transition-all shrink-0 hidden sm:flex">
                     <ChevronRightIcon class="w-4 h-4" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Saved Addresses Preview (Concierge Style) -->
          <div class="bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100/80 overflow-hidden">
            <div class="flex items-center justify-between p-8 border-b border-gray-50">
              <h2 class="text-xl font-black text-gray-900 tracking-tight">Adresses enregistrées</h2>
              <NuxtLink 
                to="/compte/adresses" 
                class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                Gérer
                <ChevronRightIcon class="w-4 h-4" />
              </NuxtLink>
            </div>

            <div v-if="!authStore.hasAddresses" class="p-12 text-center">
              <MapPinIcon class="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p class="text-gray-500 font-medium mb-6">Ajoutez les adresses de vos proches au Tchad pour faciliter vos envois.</p>
              <NuxtLink
                to="/compte/adresses"
                class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                <PlusIcon class="w-4 h-4" /> Ajouter un destinataire
              </NuxtLink>
            </div>

            <div v-else class="p-8">
              <div v-if="authStore.defaultAddress" class="flex items-start gap-5">
                <div class="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPinIcon class="w-5 h-5 text-gray-900" />
                </div>
                <div class="flex-1 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                  <div class="flex flex-wrap items-center gap-3 mb-3">
                    <p class="font-black text-gray-900 text-lg">
                      {{ authStore.defaultAddress.firstName }} {{ authStore.defaultAddress.lastName }}
                    </p>
                    <span class="text-[10px] font-black tracking-widest uppercase bg-gray-900 text-white px-2.5 py-1 rounded-md">Principal</span>
                  </div>
                  <p class="text-sm font-medium text-gray-600 leading-relaxed">
                    {{ authStore.defaultAddress.address1 }}<br />
                    <span class="text-gray-900 font-bold">{{ authStore.defaultAddress.city }}, {{ authStore.defaultAddress.country }}</span>
                  </p>
                  <p v-if="authStore.defaultAddress.phone" class="text-sm font-bold text-gray-400 font-mono tracking-widest mt-4">
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
  title: 'Mon Espace | Conciergerie TchadBox',
  description: 'Gérez votre logistique et vos commandes via votre espace privé.',
})

const authStore = useAuthStore()

// Luxury Navigation items
const navItems = [
  { to: '/compte', label: 'Espace Logistique', icon: PackageIcon },
  { to: '/compte/commandes', label: 'Historique des envois', icon: ShoppingBagIcon, badge: null },
  { to: '/compte/profil', label: 'Identité', icon: UserIcon },
  { to: '/compte/adresses', label: 'Carnet d\'adresses', icon: MapPinIcon },
  { to: '/favoris', label: 'Coup de cœur', icon: HeartIcon },
]

// Stats
const stats = reactive({
  totalOrders: 0,
  inProgress: 0,
  delivered: 0,
})

// Recent orders
const recentOrders = ref<Order[]>([])

onMounted(async () => {
  await fetchDashboardData()
})

async function fetchDashboardData() {
  if (!authStore.user) return

  try {
    const response = await useBackendApi().userOrders()
    const orders = response?.data || []
    
    const mappedOrders = orders.map(transformOrder)
    
    recentOrders.value = mappedOrders.slice(0, 5)
    
    stats.totalOrders = mappedOrders.length
    stats.inProgress = mappedOrders.filter(o => ['shipped', 'partially_fulfilled', 'fulfilled'].includes(o.fulfillmentStatus)).length
    stats.delivered = mappedOrders.filter(o => o.fulfillmentStatus === 'delivered').length
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

const { normalizeOrder: transformOrder } = useOrderNormalizer()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
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
    not_fulfilled: 'Préparation',
    partially_fulfilled: 'Partiel',
    fulfilled: 'Expédié',
    shipped: 'En Route',
    delivered: 'Livré',
  }
  return labels[status] || status
}

function getStatusClass(status: FulfillmentStatus): string {
  const classes: Record<FulfillmentStatus, string> = {
    not_fulfilled: 'bg-gray-100 text-gray-500 border-gray-200',
    partially_fulfilled: 'bg-blue-50 text-blue-600 border-blue-100',
    fulfilled: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    shipped: 'bg-orange-50 text-orange-600 border-orange-200',
    delivered: 'bg-green-50 text-green-700 border-green-200',
  }
  return classes[status] || 'bg-gray-100 text-gray-500 border-gray-200'
}

async function handleLogout() {
  await authStore.logout()
}
</script>
