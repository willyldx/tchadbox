<template>
  <div>
    <!-- Back button -->
    <div class="mb-6">
      <UButton to="/admin/commandes" color="gray" variant="ghost" icon="i-lucide-arrow-left">
        Retour aux commandes
      </UButton>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500" />
    </div>

    <div v-else-if="order" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Header Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Commande #{{ order.display_id || order.id.slice(0, 8).toUpperCase() }}</h1>
              <p class="text-gray-500 mt-1">{{ formatDateTime(order.created_at) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge :color="getStatusColor(order.status)" variant="soft" size="lg">
                {{ getStatusLabel(order.status) }}
              </UBadge>
              <UBadge :color="getFulfillmentColor(order.fulfillment_status)" variant="soft" size="lg">
                {{ getFulfillmentLabel(order.fulfillment_status) }}
              </UBadge>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-3">
            <UButton 
              v-if="order.fulfillment_status === 'not_fulfilled'"
              @click="updateFulfillment('fulfilled')"
              color="cyan"
              :loading="updating"
            >
              <Icon name="lucide:package-check" class="w-4 h-4 mr-2" />
              Marquer prêt
            </UButton>
            <UButton 
              v-if="order.fulfillment_status === 'fulfilled' && order.assigned_to"
              @click="updateFulfillment('shipped')"
              color="indigo"
              :loading="updating"
            >
              <Icon name="lucide:truck" class="w-4 h-4 mr-2" />
              En livraison
            </UButton>
            <UButton 
              v-if="order.fulfillment_status === 'shipped'"
              @click="showDeliveryModal = true"
              color="green"
            >
              <Icon name="lucide:check-circle" class="w-4 h-4 mr-2" />
              Marquer livré
            </UButton>
            <UButton 
              v-if="!order.assigned_to"
              @click="showAssignModal = true"
              color="primary"
              variant="outline"
            >
              <Icon name="lucide:user-plus" class="w-4 h-4 mr-2" />
              Assigner livreur
            </UButton>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Articles commandés</h2>
          <div class="space-y-4">
            <div v-for="item in orderItems" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div class="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <Icon name="lucide:package" class="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ item.title }}</p>
                <p class="text-sm text-gray-500">Qté: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{{ formatPrice(item.total) }}</p>
                <p class="text-xs text-gray-500">{{ formatPrice(item.unit_price) }} / unité</p>
              </div>
            </div>
          </div>

          <!-- Totals -->
          <div class="border-t border-gray-200 mt-6 pt-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Sous-total</span>
              <span class="text-gray-900">{{ formatPrice(order.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Livraison</span>
              <span class="text-gray-900">{{ formatPrice(order.shipping_total) }}</span>
            </div>
            <div class="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
              <span class="text-gray-900">Total</span>
              <span class="text-primary-600">{{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.notes || order.delivery_instructions" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Notes</h2>
          <div v-if="order.delivery_instructions" class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-1">Instructions de livraison</p>
            <p class="text-gray-600">{{ order.delivery_instructions }}</p>
          </div>
          <div v-if="order.notes">
            <p class="text-sm font-medium text-gray-700 mb-1">Notes internes</p>
            <p class="text-gray-600">{{ order.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Customer Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Client (Diaspora)</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Icon name="lucide:user" class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ order.customer_first_name }} {{ order.customer_last_name }}</p>
                <p class="text-sm text-gray-500">{{ order.email }}</p>
              </div>
            </div>
            <div v-if="order.customer_phone" class="flex items-center gap-3 text-sm">
              <Icon name="lucide:phone" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600">{{ order.customer_phone }}</span>
            </div>
          </div>
        </div>

        <!-- Recipient Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Destinataire (Tchad)</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Icon name="lucide:map-pin" class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ order.recipient_name || '-' }}</p>
                <p class="text-sm text-gray-500">{{ order.recipient_phone || '-' }}</p>
              </div>
            </div>
            <div v-if="order.shipping_address" class="pt-3 border-t border-gray-100">
              <p class="text-sm text-gray-600">
                {{ order.shipping_address.address_1 }}<br>
                <span v-if="order.shipping_address.address_2">{{ order.shipping_address.address_2 }}<br></span>
                {{ order.shipping_address.city }}, {{ order.shipping_address.country }}
              </p>
            </div>
          </div>
        </div>

        <!-- Assigned Livreur -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900">Livreur assigné</h2>
            <UButton 
              v-if="order.assigned_to" 
              @click="showAssignModal = true" 
              color="gray" 
              variant="ghost" 
              size="xs"
            >
              Changer
            </UButton>
          </div>
          <div v-if="assignedLivreur" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Icon name="lucide:truck" class="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ assignedLivreur.first_name }} {{ assignedLivreur.last_name }}</p>
              <p class="text-sm text-gray-500">{{ assignedLivreur.phone || 'Pas de téléphone' }}</p>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <Icon name="lucide:user-x" class="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p class="text-sm text-gray-500">Aucun livreur assigné</p>
            <UButton @click="showAssignModal = true" color="primary" size="sm" class="mt-3">
              Assigner
            </UButton>
          </div>
        </div>

        <!-- Delivery Photo -->
        <div v-if="order.delivery_photo" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Photo de livraison</h2>
          <img :src="order.delivery_photo" alt="Preuve de livraison" class="w-full rounded-lg" />
          <p class="text-xs text-gray-500 mt-2 text-center">
            Livrée le {{ formatDateTime(order.delivered_at) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Assign Modal -->
    <UModal v-model="showAssignModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Assigner un livreur</h3>
        <USelectMenu
          v-model="selectedLivreur"
          :options="livreurs"
          option-attribute="label"
          value-attribute="value"
          placeholder="Sélectionner un livreur"
          class="mb-4"
        />
        <div class="flex justify-end gap-3">
          <UButton color="gray" variant="outline" @click="showAssignModal = false">Annuler</UButton>
          <UButton color="primary" :loading="updating" @click="assignLivreur">Assigner</UButton>
        </div>
      </div>
    </UModal>

    <!-- Delivery Confirmation Modal -->
    <UModal v-model="showDeliveryModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirmer la livraison</h3>
        <p class="text-sm text-gray-500 mb-4">
          Ajoutez une photo comme preuve de livraison (optionnel)
        </p>
        <input 
          type="file" 
          accept="image/*" 
          @change="handlePhotoUpload" 
          class="mb-4 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        <div class="flex justify-end gap-3">
          <UButton color="gray" variant="outline" @click="showDeliveryModal = false">Annuler</UButton>
          <UButton color="green" :loading="updating" @click="confirmDelivery">Confirmer livraison</UButton>
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

const route = useRoute()
const { client, uploadImage } = useSupabase()
const toast = useToast()

// State
const loading = ref(true)
const updating = ref(false)
const order = ref<any | null>(null)
const orderItems = ref<any[]>([])
const assignedLivreur = ref<any | null>(null)

// Modals
const showAssignModal = ref(false)
const showDeliveryModal = ref(false)
const selectedLivreur = ref<string | null>(null)
const livreurs = ref<{ label: string; value: string }[]>([])
const deliveryPhoto = ref<File | null>(null)

// Fetch order
const fetchOrder = async () => {
  loading.value = true
  try {
    // Récupérer toutes les commandes et filtrer
    const { data: allOrders, error } = await client.rpc('get_all_orders')

    if (error) throw error

    order.value = allOrders?.find((o: any) => o.id === route.params.id) || null

    if (order.value) {
      // Fetch order items
      const { data: items } = await client
        .from('order_items')
        .select('*')
        .eq('order_id', route.params.id)

      orderItems.value = items || []

      // Fetch assigned livreur
      if (order.value.assigned_to) {
        const { data: livreurData } = await client.rpc('get_profiles_by_role', { target_role: 'livreur' })
        assignedLivreur.value = livreurData?.find((l: any) => l.id === order.value.assigned_to) || null
      }
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de charger la commande', color: 'red' })
  } finally {
    loading.value = false
  }
}

// Fetch livreurs
const fetchLivreurs = async () => {
  const { data, error } = await client.rpc('get_profiles_by_role', { target_role: 'livreur' })

  if (!error && data) {
    livreurs.value = data.map((l: any) => ({
      label: `${l.first_name} ${l.last_name}`,
      value: l.id
    }))
  }
}

// Update fulfillment status
const updateFulfillment = async (status: string) => {
  if (!order.value) return
  updating.value = true

  try {
    const { error } = await client
      .from('orders')
      .update({ 
        fulfillment_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.value.id)

    if (error) throw error

    order.value.fulfillment_status = status
    toast.add({ title: 'Succès', description: 'Statut mis à jour', color: 'green' })
  } catch (error) {
    console.error('Error updating status:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de mettre à jour le statut', color: 'red' })
  } finally {
    updating.value = false
  }
}

// Assign livreur
const assignLivreur = async () => {
  if (!order.value || !selectedLivreur.value) return
  updating.value = true

  try {
    const { error } = await client.rpc('assign_delivery_agent', {
      order_id: order.value.id,
      agent_id: selectedLivreur.value
    })

    if (error) throw error

    toast.add({ title: 'Succès', description: 'Livreur assigné', color: 'green' })
    showAssignModal.value = false
    fetchOrder()
  } catch (error) {
    console.error('Error assigning livreur:', error)
    toast.add({ title: 'Erreur', description: "Impossible d'assigner le livreur", color: 'red' })
  } finally {
    updating.value = false
  }
}

// Handle photo upload
const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    deliveryPhoto.value = input.files[0]
  }
}

// Confirm delivery
const confirmDelivery = async () => {
  if (!order.value) return
  updating.value = true

  try {
    let photoUrl = null

    if (deliveryPhoto.value) {
      const path = `deliveries/${order.value.id}_${Date.now()}.jpg`
      photoUrl = await uploadImage('delivery-photos', path, deliveryPhoto.value)
    }

    const { error } = await client
      .from('orders')
      .update({
        fulfillment_status: 'delivered',
        delivered_at: new Date().toISOString(),
        delivery_photo: photoUrl,
        status: 'completed'
      })
      .eq('id', order.value.id)

    if (error) throw error

    toast.add({ title: 'Succès', description: 'Livraison confirmée', color: 'green' })
    showDeliveryModal.value = false
    fetchOrder()
  } catch (error) {
    console.error('Error confirming delivery:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de confirmer la livraison', color: 'red' })
  } finally {
    updating.value = false
  }
}

// Helpers
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0)
}

const formatDateTime = (date: string | undefined) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('fr-FR', { 
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  })
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = { pending: 'amber', processing: 'blue', completed: 'green', cancelled: 'red' }
  return colors[status] || 'gray'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = { pending: 'En attente', processing: 'En cours', completed: 'Terminé', cancelled: 'Annulé' }
  return labels[status] || status
}

const getFulfillmentColor = (status: string) => {
  const colors: Record<string, string> = { not_fulfilled: 'gray', fulfilled: 'cyan', shipped: 'indigo', delivered: 'green' }
  return colors[status] || 'gray'
}

const getFulfillmentLabel = (status: string) => {
  const labels: Record<string, string> = { not_fulfilled: 'Non traité', fulfilled: 'Prêt', shipped: 'En livraison', delivered: 'Livré' }
  return labels[status] || status
}

// Fetch on mount
onMounted(() => {
  fetchOrder()
  fetchLivreurs()
})

useHead({
  title: computed(() => order.value ? `Commande #${order.value.display_id || order.value.id.slice(0, 8).toUpperCase()} - Admin TchadBox` : 'Chargement...')
})
</script>
