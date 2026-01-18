<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Commandes</h1>
        <p class="text-gray-500 mt-1">Gérez toutes les commandes</p>
      </div>
      <div class="flex items-center gap-3">
        <UInput
          v-model="search"
          placeholder="Rechercher..."
          icon="i-lucide-search"
          class="w-64"
        />
        <UButton @click="fetchOrders" color="gray" variant="outline" icon="i-lucide-refresh-cw">
          Actualiser
        </UButton>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <USelectMenu
          v-model="statusFilter"
          :options="statusOptions"
          placeholder="Statut"
          class="w-40"
        />
        <USelectMenu
          v-model="fulfillmentFilter"
          :options="fulfillmentOptions"
          placeholder="Livraison"
          class="w-40"
        />
        <UButton v-if="hasActiveFilters" @click="clearFilters" color="gray" variant="ghost" size="sm">
          Effacer les filtres
        </UButton>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <UTable
        :columns="columns"
        :rows="filteredOrders"
        :loading="loading"
        :empty-state="{ icon: 'i-lucide-package', label: 'Aucune commande trouvée' }"
      >
        <!-- ID Column -->
        <template #display_id-data="{ row }">
          <NuxtLink :to="`/admin/commandes/${row.id}`" class="font-medium text-primary-600 hover:text-primary-700">
            #{{ row.display_id || row.id.slice(0, 8).toUpperCase() }}
          </NuxtLink>
        </template>

        <!-- Customer Column -->
        <template #customer-data="{ row }">
          <div>
            <p class="font-medium text-gray-900">{{ row.customer_first_name }} {{ row.customer_last_name }}</p>
            <p class="text-xs text-gray-500">{{ row.email }}</p>
          </div>
        </template>

        <!-- Recipient Column -->
        <template #recipient-data="{ row }">
          <div>
            <p class="font-medium text-gray-900">{{ row.recipient_name || '-' }}</p>
            <p class="text-xs text-gray-500">{{ row.recipient_phone || '-' }}</p>
          </div>
        </template>

        <!-- Status Column -->
        <template #status-data="{ row }">
          <UBadge :color="getStatusColor(row.status)" variant="soft" size="sm">
            {{ getStatusLabel(row.status) }}
          </UBadge>
        </template>

        <!-- Fulfillment Column -->
        <template #fulfillment-data="{ row }">
          <UBadge :color="getFulfillmentColor(row.fulfillment_status)" variant="soft" size="sm">
            {{ getFulfillmentLabel(row.fulfillment_status) }}
          </UBadge>
        </template>

        <!-- Total Column -->
        <template #total-data="{ row }">
          <span class="font-semibold text-gray-900">{{ formatPrice(row.total) }}</span>
        </template>

        <!-- Date Column -->
        <template #date-data="{ row }">
          <span class="text-sm text-gray-500">{{ formatDate(row.created_at) }}</span>
        </template>

        <!-- Assigned Column -->
        <template #assigned-data="{ row }">
          <div v-if="row.assigned_to" class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Icon name="lucide:user" class="w-3 h-3 text-green-600" />
            </div>
            <span class="text-sm text-gray-700">Assigné</span>
          </div>
          <span v-else class="text-sm text-gray-400">-</span>
        </template>

        <!-- Actions Column -->
        <template #actions-data="{ row }">
          <UDropdown :items="getRowActions(row)" :popper="{ placement: 'bottom-end' }">
            <UButton color="gray" variant="ghost" icon="i-lucide-more-vertical" size="sm" />
          </UDropdown>
        </template>
      </UTable>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
        <p class="text-sm text-gray-500">
          {{ filteredOrders.length }} commande(s) sur {{ orders.length }}
        </p>
        <UPagination v-model="currentPage" :total="totalPages" :page-count="pageSize" />
      </div>
    </div>

    <!-- Assign Livreur Modal -->
    <UModal v-model="showAssignModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Assigner un livreur</h3>
        <p class="text-sm text-gray-500 mb-4">
          Commande #{{ selectedOrder?.display_id || selectedOrder?.id?.slice(0, 8).toUpperCase() }}
        </p>
        
        <USelectMenu
          v-model="selectedLivreur"
          :options="livreurs"
          option-attribute="label"
          value-attribute="value"
          placeholder="Sélectionner un livreur"
          class="mb-4"
        />

        <div class="flex justify-end gap-3">
          <UButton color="gray" variant="outline" @click="showAssignModal = false">
            Annuler
          </UButton>
          <UButton color="primary" :loading="assigning" @click="assignLivreur">
            Assigner
          </UButton>
        </div>
      </div>
    </UModal>
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
const orders = ref<any[]>([])
const search = ref('')
const statusFilter = ref<string | null>(null)
const fulfillmentFilter = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = 20

// Assign modal
const showAssignModal = ref(false)
const selectedOrder = ref<any | null>(null)
const selectedLivreur = ref<string | null>(null)
const livreurs = ref<{ label: string; value: string }[]>([])
const assigning = ref(false)

// Columns
const columns = [
  { key: 'display_id', label: 'ID' },
  { key: 'customer', label: 'Client' },
  { key: 'recipient', label: 'Destinataire' },
  { key: 'status', label: 'Statut' },
  { key: 'fulfillment', label: 'Livraison' },
  { key: 'total', label: 'Total' },
  { key: 'date', label: 'Date' },
  { key: 'assigned', label: 'Livreur' },
  { key: 'actions', label: '' }
]

// Filter options
const statusOptions = [
  { label: 'Tous', value: null },
  { label: 'En attente', value: 'pending' },
  { label: 'En cours', value: 'processing' },
  { label: 'Terminé', value: 'completed' },
  { label: 'Annulé', value: 'cancelled' }
]

const fulfillmentOptions = [
  { label: 'Tous', value: null },
  { label: 'Non traité', value: 'not_fulfilled' },
  { label: 'Prêt', value: 'fulfilled' },
  { label: 'En livraison', value: 'shipped' },
  { label: 'Livré', value: 'delivered' }
]

// Computed
const hasActiveFilters = computed(() => {
  return statusFilter.value || fulfillmentFilter.value || search.value
})

const filteredOrders = computed(() => {
  let result = orders.value

  if (search.value) {
    const s = search.value.toLowerCase()
    result = result.filter(o => 
      (o.display_id || o.id)?.toLowerCase().includes(s) ||
      o.email?.toLowerCase().includes(s) ||
      o.customer_first_name?.toLowerCase().includes(s) ||
      o.customer_last_name?.toLowerCase().includes(s) ||
      o.recipient_name?.toLowerCase().includes(s)
    )
  }

  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }

  if (fulfillmentFilter.value) {
    result = result.filter(o => o.fulfillment_status === fulfillmentFilter.value)
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize))

// Methods
const fetchOrders = async () => {
  loading.value = true
  try {
    const { data, error } = await client.rpc('get_all_orders')

    if (error) throw error

    orders.value = data || []
  } catch (error) {
    console.error('Error fetching orders:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les commandes', color: 'red' })
  } finally {
    loading.value = false
  }
}

const fetchLivreurs = async () => {
  try {
    const { data, error } = await client.rpc('get_profiles_by_role', { target_role: 'livreur' })

    if (error) throw error

    if (data) {
      livreurs.value = data.map((l: any) => ({
        label: `${l.first_name} ${l.last_name}`,
        value: l.id
      }))
    }
  } catch (error) {
    console.error('Error fetching livreurs:', error)
  }
}

const openAssignModal = (order: any) => {
  selectedOrder.value = order
  selectedLivreur.value = order.assigned_to || null
  showAssignModal.value = true
}

const assignLivreur = async () => {
  if (!selectedOrder.value || !selectedLivreur.value) return

  assigning.value = true
  try {
    const { error } = await client.rpc('assign_delivery_agent', {
      order_id: selectedOrder.value.id,
      agent_id: selectedLivreur.value
    })

    if (error) throw error

    toast.add({ title: 'Succès', description: 'Livreur assigné avec succès', color: 'green' })
    showAssignModal.value = false
    fetchOrders()
  } catch (error) {
    console.error('Error assigning livreur:', error)
    toast.add({ title: 'Erreur', description: "Impossible d'assigner le livreur", color: 'red' })
  } finally {
    assigning.value = false
  }
}

const getRowActions = (row: any) => [
  [{
    label: 'Voir détails',
    icon: 'i-lucide-eye',
    click: () => navigateTo(`/admin/commandes/${row.id}`)
  }],
  [{
    label: 'Assigner livreur',
    icon: 'i-lucide-truck',
    click: () => openAssignModal(row)
  }]
]

const clearFilters = () => {
  search.value = ''
  statusFilter.value = null
  fulfillmentFilter.value = null
}

// Helpers
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'amber',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red'
  }
  return colors[status] || 'gray'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    processing: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé'
  }
  return labels[status] || status
}

const getFulfillmentColor = (status: string) => {
  const colors: Record<string, string> = {
    not_fulfilled: 'gray',
    fulfilled: 'cyan',
    shipped: 'indigo',
    delivered: 'green'
  }
  return colors[status] || 'gray'
}

const getFulfillmentLabel = (status: string) => {
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
  fetchOrders()
  fetchLivreurs()
})

useHead({
  title: 'Commandes - Admin TchadBox'
})
</script>
