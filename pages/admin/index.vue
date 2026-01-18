<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-500 mt-1">Bienvenue, {{ authStore.fullName }} 👋</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
            <p v-if="stat.subtext" class="text-xs text-gray-400 mt-1">{{ stat.subtext }}</p>
          </div>
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor]">
            <Icon :name="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Pending Orders -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900">Commandes en attente</h2>
          <NuxtLink to="/admin/commandes" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
            Voir tout →
          </NuxtLink>
        </div>
        <div v-if="pendingOrders.length > 0" class="divide-y divide-gray-100">
          <div v-for="order in pendingOrders" :key="order.id" class="p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">#{{ order.display_id || order.id.slice(0, 8).toUpperCase() }}</p>
                <p class="text-sm text-gray-500">{{ order.recipient_name || order.customer_first_name }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{{ formatPrice(order.total) }}</p>
                <p class="text-xs text-gray-400">{{ formatDate(order.created_at) }}</p>
              </div>
              <NuxtLink :to="`/admin/commandes/${order.id}`">
                <UButton size="sm" color="primary" variant="soft">
                  Traiter
                </UButton>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center text-gray-500">
          <Icon name="lucide:package-check" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Aucune commande en attente</p>
        </div>
      </div>

      <!-- Active Deliveries -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900">Livraisons en cours</h2>
          <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
            {{ activeDeliveries.length }}
          </span>
        </div>
        <div v-if="activeDeliveries.length > 0" class="divide-y divide-gray-100">
          <div v-for="delivery in activeDeliveries" :key="delivery.id" class="p-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="lucide:truck" class="w-5 h-5 text-green-600" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">#{{ delivery.display_id || delivery.id.slice(0, 8).toUpperCase() }}</p>
                <p class="text-xs text-gray-500">{{ delivery.recipient_name }}</p>
              </div>
              <UBadge :color="getStatusColor(delivery.fulfillment_status)" variant="soft" size="xs">
                {{ getStatusLabel(delivery.fulfillment_status) }}
              </UBadge>
            </div>
          </div>
        </div>
        <div v-else class="p-8 text-center text-gray-500">
          <Icon name="lucide:truck" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Aucune livraison en cours</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const authStore = useAuthStore()
const { client } = useSupabase()

// Stats
const stats = ref([
  { label: "Commandes aujourd'hui", value: '0', icon: 'lucide:shopping-bag', bgColor: 'bg-blue-100', iconColor: 'text-blue-600', subtext: '0€ de CA' },
  { label: 'En attente', value: '0', icon: 'lucide:clock', bgColor: 'bg-amber-100', iconColor: 'text-amber-600' },
  { label: 'En livraison', value: '0', icon: 'lucide:truck', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
  { label: 'Livrées ce mois', value: '0', icon: 'lucide:package-check', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
])

const pendingOrders = ref<any[]>([])
const activeDeliveries = ref<any[]>([])

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    // Utiliser RPC pour récupérer toutes les commandes
    const { data: allOrders, error } = await client.rpc('get_all_orders')
    
    if (error) {
      console.error('Error fetching orders:', error)
      return
    }

    const orders = allOrders || []

    // Filtrer les commandes en attente
    pendingOrders.value = orders
      .filter((o: any) => o.status === 'pending')
      .slice(0, 5)
    
    stats.value[1].value = orders.filter((o: any) => o.status === 'pending').length.toString()

    // Filtrer les livraisons en cours
    activeDeliveries.value = orders
      .filter((o: any) => ['fulfilled', 'shipped'].includes(o.fulfillment_status))
      .slice(0, 5)
    
    stats.value[2].value = activeDeliveries.value.length.toString()

    // Stats du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayOrders = orders.filter((o: any) => new Date(o.created_at) >= today)
    const todayRevenue = todayOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0)
    stats.value[0].value = todayOrders.length.toString()
    stats.value[0].subtext = `${formatPrice(todayRevenue)} de CA`

    // Livrées ce mois
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const monthlyDelivered = orders.filter((o: any) => 
      o.fulfillment_status === 'delivered' && 
      new Date(o.delivered_at || o.created_at) >= firstOfMonth
    ).length
    stats.value[3].value = monthlyDelivered.toString()

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

// Helpers
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'amber',
    processing: 'blue',
    fulfilled: 'cyan',
    shipped: 'indigo',
    delivered: 'green',
    cancelled: 'red'
  }
  return colors[status] || 'gray'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    not_fulfilled: 'Non traité',
    fulfilled: 'Prêt',
    shipped: 'En livraison',
    delivered: 'Livré'
  }
  return labels[status] || status
}

// Fetch on mount
onMounted(() => {
  fetchDashboardData()
})

useHead({
  title: 'Dashboard Admin - TchadBox'
})
</script>
