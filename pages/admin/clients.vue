<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="text-gray-500 mt-1">Liste des clients de la diaspora</p>
      </div>
      <UInput
        v-model="search"
        placeholder="Rechercher..."
        icon="i-lucide-search"
        class="w-64"
      />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Total clients</p>
        <p class="text-2xl font-bold text-gray-900">{{ clients.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Nouveaux ce mois</p>
        <p class="text-2xl font-bold text-green-600">{{ newThisMonth }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Clients actifs</p>
        <p class="text-2xl font-bold text-primary-600">{{ activeClients }}</p>
      </div>
    </div>

    <!-- Clients Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <UTable
        :columns="columns"
        :rows="filteredClients"
        :loading="loading"
        :empty-state="{ icon: 'i-lucide-users', label: 'Aucun client trouvé' }"
      >
        <!-- Name Column -->
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-sm font-semibold text-primary-700">{{ getInitials(row) }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ row.first_name }} {{ row.last_name }}</p>
              <p class="text-sm text-gray-500">{{ row.email }}</p>
            </div>
          </div>
        </template>

        <!-- Phone Column -->
        <template #phone-data="{ row }">
          <span class="text-sm text-gray-600">{{ row.phone || '-' }}</span>
        </template>

        <!-- Orders Column -->
        <template #orders-data="{ row }">
          <span class="font-medium text-gray-900">{{ row.totalOrders || 0 }}</span>
        </template>

        <!-- Total Spent Column -->
        <template #spent-data="{ row }">
          <span class="font-semibold text-gray-900">{{ formatPrice(row.totalSpent || 0) }}</span>
        </template>

        <!-- Joined Column -->
        <template #joined-data="{ row }">
          <span class="text-sm text-gray-500">{{ formatDate(row.created_at) }}</span>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { client } = useSupabase()
const toast = useToast()

// State
const loading = ref(true)
const search = ref('')
const clients = ref<any[]>([])

// Columns
const columns = [
  { key: 'name', label: 'Client' },
  { key: 'phone', label: 'Téléphone' },
  { key: 'orders', label: 'Commandes' },
  { key: 'spent', label: 'Total dépensé' },
  { key: 'joined', label: 'Inscrit le' }
]

// Computed
const filteredClients = computed(() => {
  if (!search.value) return clients.value
  const s = search.value.toLowerCase()
  return clients.value.filter(c => 
    c.first_name?.toLowerCase().includes(s) ||
    c.last_name?.toLowerCase().includes(s) ||
    c.email?.toLowerCase().includes(s)
  )
})

const newThisMonth = computed(() => {
  const firstOfMonth = new Date()
  firstOfMonth.setDate(1)
  firstOfMonth.setHours(0, 0, 0, 0)
  return clients.value.filter(c => new Date(c.created_at) >= firstOfMonth).length
})

const activeClients = computed(() => {
  return clients.value.filter(c => (c.totalOrders || 0) > 0).length
})

// Fetch clients
const fetchClients = async () => {
  loading.value = true
  try {
    // Fetch profiles with role = client using RPC
    const { data: profiles, error } = await client.rpc('get_profiles_by_role', { target_role: 'client' })

    if (error) throw error

    // Fetch all orders to calculate stats
    const { data: allOrders } = await client.rpc('get_all_orders')

    // Calculate stats per client
    const clientsWithStats = (profiles || []).map((p: any) => {
      const clientOrders = (allOrders || []).filter((o: any) => o.user_id === p.id)
      const totalOrders = clientOrders.length
      const totalSpent = clientOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0)

      return {
        ...p,
        totalOrders,
        totalSpent
      }
    })

    clients.value = clientsWithStats
  } catch (error) {
    console.error('Error fetching clients:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les clients', color: 'red' })
  } finally {
    loading.value = false
  }
}

// Helpers
const getInitials = (client: any) => {
  return ((client.first_name?.[0] || '') + (client.last_name?.[0] || '')).toUpperCase() || '?'
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Fetch on mount
onMounted(() => {
  fetchClients()
})

useHead({
  title: 'Clients - Admin TchadBox'
})
</script>
