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
              <h1 class="text-2xl font-bold text-gray-900">Commande #{{ order.displayId }}</h1>
              <p class="text-gray-500 mt-1">{{ formatDateTime(order.createdAt) }}</p>
            </div>
            <div class="flex items-center gap-2">
              <UBadge :color="getStatusColor(order.status)" variant="soft" size="lg">
                {{ getStatusLabel(order.status) }}
              </UBadge>
              <UBadge :color="getFulfillmentColor(order.fulfillmentStatus)" variant="soft" size="lg">
                {{ getFulfillmentLabel(order.fulfillmentStatus) }}
              </UBadge>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-wrap gap-3">
            <UButton 
              v-if="order.fulfillmentStatus === 'not_fulfilled'"
              @click="updateFulfillment('fulfilled')"
              color="cyan"
              :loading="updating"
            >
              <Icon name="lucide:package-check" class="w-4 h-4 mr-2" />
              Marquer prêt
            </UButton>
            <UButton 
              v-if="order.fulfillmentStatus === 'fulfilled' && order.assignedTo"
              @click="updateFulfillment('shipped')"
              color="indigo"
              :loading="updating"
            >
              <Icon name="lucide:truck" class="w-4 h-4 mr-2" />
              En livraison
            </UButton>
            <UButton 
              v-if="order.fulfillmentStatus === 'shipped'"
              @click="showDeliveryModal = true"
              color="green"
            >
              <Icon name="lucide:check-circle" class="w-4 h-4 mr-2" />
              Marquer livré
            </UButton>
            <UButton 
              v-if="!order.assignedTo"
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
            <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
                <p class="text-xs text-gray-500">{{ formatPrice(item.unitPrice) }} / unité</p>
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
              <span class="text-gray-900">{{ formatPrice(order.shippingTotal) }}</span>
            </div>
            <div class="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
              <span class="text-gray-900">Total</span>
              <span class="text-primary-600">{{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="order.notes || order.deliveryInstructions" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Notes</h2>
          <div v-if="order.deliveryInstructions" class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-1">Instructions de livraison</p>
            <p class="text-gray-600">{{ order.deliveryInstructions }}</p>
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
                <p class="font-medium text-gray-900">{{ order.customerFirstName }} {{ order.customerLastName }}</p>
                <p class="text-sm text-gray-500">{{ order.email }}</p>
              </div>
            </div>
            <div v-if="order.customerPhone" class="flex items-center gap-3 text-sm">
              <Icon name="lucide:phone" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-600">{{ order.customerPhone }}</span>
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
                <p class="font-medium text-gray-900">{{ order.recipientName || '-' }}</p>
                <p class="text-sm text-gray-500">{{ order.recipientPhone || '-' }}</p>
              </div>
            </div>
            <div v-if="order.shippingAddress" class="pt-3 border-t border-gray-100">
              <p class="text-sm text-gray-600">
                {{ order.shippingAddress.address_1 }}<br>
                <span v-if="order.shippingAddress.address_2">{{ order.shippingAddress.address_2 }}<br></span>
                {{ order.shippingAddress.city }}, {{ order.shippingAddress.country }}
              </p>
            </div>
          </div>
        </div>

        <!-- Assigned Livreur -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900">Livreur assigné</h2>
            <UButton 
              v-if="order.assignedTo" 
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
              <p class="font-medium text-gray-900">{{ assignedLivreur.firstName }} {{ assignedLivreur.lastName }}</p>
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
        <div v-if="order.deliveryPhoto" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="font-semibold text-gray-900 mb-4">Photo de livraison</h2>
          <img :src="order.deliveryPhoto" alt="Preuve de livraison" class="w-full rounded-lg" />
          <p class="text-xs text-gray-500 mt-2 text-center">
            Livrée le {{ formatDateTime(order.deliveredAt) }}
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
import type { Order, Customer } from '~/types'

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
const order = ref<Order | null>(null)
const assignedLivreur = ref<Customer | null>(null)

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
    const { data, error } = await client
      .from('orders')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (error) throw error

    // Fetch order items
    const { data: items } = await client
      .from('order_items')
      .select('*')
      .eq('order_id', route.params.id)

    order.value = mapOrder(data)
    order.value.items = (items || []).map((i: any) => ({
      id: i.id,
      productId: i.product_id,
      title: i.title,
      thumbnail: i.thumbnail,
      quantity: i.quantity,
      unitPrice: Number(i.unit_price) || 0,
      total: Number(i.total) || 0,
    }))

    // Fetch assigned livreur
    if (data.assigned_to) {
      const { data: livreur } = await client
        .from('profiles')
        .select('*')
        .eq('id', data.assigned_to)
        .single()

      if (livreur) {
        assignedLivreur.value = {
          id: livreur.id,
          email: livreur.email,
          firstName: livreur.first_name,
          lastName: livreur.last_name,
          phone: livreur.phone,
          role: livreur.role,
          addresses: []
        }
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
  const { data } = await client
    .from('profiles')
    .select('id, first_name, last_name')
    .eq('role', 'livreur')

  if (data) {
    livreurs.value = data.map(l => ({
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

    order.value.fulfillmentStatus = status as any
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
    const { error } = await client
      .from('orders')
      .update({
        assigned_to: selectedLivreur.value,
        assigned_at: new Date().toISOString(),
        fulfillment_status: order.value.fulfillmentStatus === 'not_fulfilled' ? 'fulfilled' : order.value.fulfillmentStatus
      })
      .eq('id', order.value.id)

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

// Map order
const mapOrder = (o: any): Order => ({
  id: o.id,
  displayId: o.display_id || o.id.slice(0, 8).toUpperCase(),
  status: o.status,
  paymentStatus: o.payment_status,
  fulfillmentStatus: o.fulfillment_status,
  items: [],
  shippingAddress: o.shipping_address,
  subtotal: Number(o.subtotal) || 0,
  shippingTotal: Number(o.shipping_total) || 0,
  total: Number(o.total) || 0,
  currency: o.currency || 'EUR',
  createdAt: o.created_at,
  updatedAt: o.updated_at,
  email: o.email,
  customerFirstName: o.customer_first_name,
  customerLastName: o.customer_last_name,
  customerPhone: o.customer_phone,
  recipientName: o.recipient_name,
  recipientPhone: o.recipient_phone,
  deliveryInstructions: o.delivery_instructions,
  notes: o.notes,
  assignedTo: o.assigned_to,
  assignedAt: o.assigned_at,
  deliveredAt: o.delivered_at,
  deliveryPhoto: o.delivery_photo,
})

// Helpers
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
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
  title: computed(() => order.value ? `Commande #${order.value.displayId} - Admin TchadBox` : 'Chargement...')
})
</script>
