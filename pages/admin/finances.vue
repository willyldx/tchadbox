<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h1 class="text-2xl font-bold text-gray-900">Finances</h1>
          <UBadge color="amber" variant="soft">👑 CEO Only</UBadge>
        </div>
        <p class="text-gray-500">Vue d'ensemble des revenus de TchadBox</p>
      </div>
      <USelectMenu
        v-model="period"
        :options="periodOptions"
        class="w-40"
      />
    </div>

    <!-- Revenue Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <p class="text-green-100 text-sm">Revenu total</p>
        <p class="text-3xl font-bold mt-1">{{ formatPrice(stats.totalRevenue) }}</p>
        <p class="text-green-200 text-sm mt-2">{{ stats.totalOrders }} commandes</p>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-sm">Ce mois</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatPrice(stats.monthRevenue) }}</p>
        <div class="flex items-center gap-1 mt-2">
          <Icon :name="stats.monthGrowth >= 0 ? 'lucide:trending-up' : 'lucide:trending-down'" 
                :class="stats.monthGrowth >= 0 ? 'text-green-500' : 'text-red-500'" 
                class="w-4 h-4" />
          <span :class="stats.monthGrowth >= 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
            {{ stats.monthGrowth >= 0 ? '+' : '' }}{{ stats.monthGrowth }}%
          </span>
          <span class="text-gray-400 text-sm">vs mois dernier</span>
        </div>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-sm">Cette semaine</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatPrice(stats.weekRevenue) }}</p>
        <p class="text-gray-400 text-sm mt-2">{{ stats.weekOrders }} commandes</p>
      </div>
      
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <p class="text-gray-500 text-sm">Aujourd'hui</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatPrice(stats.todayRevenue) }}</p>
        <p class="text-gray-400 text-sm mt-2">{{ stats.todayOrders }} commandes</p>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Revenue by Status -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="font-semibold text-gray-900 mb-4">Par statut de paiement</h2>
        <div class="space-y-4">
          <div v-for="item in paymentStats" :key="item.status" class="flex items-center gap-4">
            <div :class="['w-3 h-3 rounded-full', item.color]"></div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm text-gray-700">{{ item.label }}</span>
                <span class="text-sm font-medium text-gray-900">{{ formatPrice(item.amount) }}</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div :class="['h-full rounded-full', item.bgColor]" :style="{ width: item.percent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 class="font-semibold text-gray-900 mb-4">Produits les plus vendus</h2>
        <div class="space-y-3">
          <div v-for="(product, index) in topProducts" :key="product.id" class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              {{ index + 1 }}
            </span>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ product.title }}</p>
              <p class="text-xs text-gray-500">{{ product.quantity }} vendus</p>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ formatPrice(product.revenue) }}</span>
          </div>
          <div v-if="topProducts.length === 0" class="text-center py-4 text-gray-500 text-sm">
            Pas encore de données
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-semibold text-gray-900">Transactions récentes</h2>
        <NuxtLink to="/admin/commandes" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Voir toutes →
        </NuxtLink>
      </div>
      <div class="divide-y divide-gray-100">
        <div v-for="order in recentOrders" :key="order.id" class="p-4 flex items-center gap-4">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center', getPaymentBg(order.payment_status)]">
            <Icon :name="getPaymentIcon(order.payment_status)" :class="['w-5 h-5', getPaymentColor(order.payment_status)]" />
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-900">#{{ order.display_id || order.id.slice(0, 8).toUpperCase() }}</p>
            <p class="text-sm text-gray-500">{{ order.customer_first_name }} {{ order.customer_last_name }}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-gray-900">{{ formatPrice(order.total) }}</p>
            <p class="text-xs text-gray-400">{{ formatDateTime(order.created_at) }}</p>
          </div>
          <UBadge :color="getPaymentBadgeColor(order.payment_status)" variant="soft" size="sm">
            {{ getPaymentLabel(order.payment_status) }}
          </UBadge>
        </div>
        <div v-if="recentOrders.length === 0" class="p-8 text-center text-gray-500">
          Aucune transaction récente
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

// Redirect if not super_admin
if (!authStore.isSuperAdmin) {
  navigateTo('/admin')
}

// State
const period = ref('month')
const periodOptions = [
  { label: 'Ce mois', value: 'month' },
  { label: 'Cette année', value: 'year' },
  { label: 'Tout', value: 'all' }
]

const stats = ref({
  totalRevenue: 0,
  totalOrders: 0,
  monthRevenue: 0,
  monthGrowth: 0,
  weekRevenue: 0,
  weekOrders: 0,
  todayRevenue: 0,
  todayOrders: 0
})

const paymentStats = ref<any[]>([])
const topProducts = ref<any[]>([])
const recentOrders = ref<any[]>([])

// Fetch financial data
const fetchFinancialData = async () => {
  try {
    const data = await useBackendApi().adminFinances()
    if (!data) return

    // Update stats
    stats.value.totalOrders = data.stats.total_orders
    stats.value.totalRevenue = data.stats.total_revenue
    stats.value.todayOrders = data.stats.today_orders
    stats.value.todayRevenue = data.stats.today_revenue
    stats.value.weekOrders = data.stats.week_orders
    stats.value.weekRevenue = data.stats.week_revenue
    stats.value.monthRevenue = data.stats.month_revenue
    stats.value.monthGrowth = data.stats.month_growth

    // Payment stats
    const t = data.payment_stats.captured + data.payment_stats.awaiting + data.payment_stats.refunded || 1
    paymentStats.value = [
      { status: 'captured', label: 'Payé', amount: data.payment_stats.captured, percent: (data.payment_stats.captured / t) * 100, color: 'bg-green-500', bgColor: 'bg-green-500' },
      { status: 'awaiting', label: 'En attente', amount: data.payment_stats.awaiting, percent: (data.payment_stats.awaiting / t) * 100, color: 'bg-amber-500', bgColor: 'bg-amber-500' },
      { status: 'refunded', label: 'Remboursé', amount: data.payment_stats.refunded, percent: (data.payment_stats.refunded / t) * 100, color: 'bg-red-500', bgColor: 'bg-red-500' }
    ]

    // Recent orders
    recentOrders.value = data.recent_orders || []

    // Top products
    topProducts.value = data.top_products || []

  } catch (error) {
    console.error('Error fetching financial data:', error)
  }
}

// Helpers
const formatPrice = (amount: number) => {
  return useCartStore().formatPrice(amount || 0)
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

const getPaymentBg = (status: string) => {
  const map: Record<string, string> = { captured: 'bg-green-100', awaiting: 'bg-amber-100', refunded: 'bg-red-100' }
  return map[status] || 'bg-gray-100'
}

const getPaymentIcon = (status: string) => {
  const map: Record<string, string> = { captured: 'lucide:check', awaiting: 'lucide:clock', refunded: 'lucide:rotate-ccw' }
  return map[status] || 'lucide:help-circle'
}

const getPaymentColor = (status: string) => {
  const map: Record<string, string> = { captured: 'text-green-600', awaiting: 'text-amber-600', refunded: 'text-red-600' }
  return map[status] || 'text-gray-600'
}

const getPaymentBadgeColor = (status: string) => {
  const map: Record<string, string> = { captured: 'green', awaiting: 'amber', refunded: 'red' }
  return map[status] || 'gray'
}

const getPaymentLabel = (status: string) => {
  const map: Record<string, string> = { captured: 'Payé', awaiting: 'En attente', refunded: 'Remboursé' }
  return map[status] || status
}

// Fetch on mount
onMounted(() => {
  fetchFinancialData()
})

useHead({
  title: 'Finances - Admin TchadBox'
})
</script>
