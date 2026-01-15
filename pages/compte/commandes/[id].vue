<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-stone-500 hover:text-amber-600">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <NuxtLink to="/compte/commandes" class="text-stone-500 hover:text-amber-600">Mes commandes</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <span class="text-stone-800 font-medium">{{ order?.displayId || 'Chargement...' }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div class="bg-white rounded-2xl border border-stone-100 p-8 animate-pulse">
          <div class="h-6 bg-stone-200 rounded w-48 mb-4"></div>
          <div class="h-4 bg-stone-200 rounded w-32"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-2xl border border-red-100 p-12 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircleIcon class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="font-semibold text-stone-800 mb-2">Commande introuvable</h3>
        <p class="text-stone-500 mb-4">{{ error }}</p>
        <NuxtLink
          to="/compte/commandes"
          class="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          Retour aux commandes
        </NuxtLink>
      </div>

      <!-- Order Content -->
      <div v-else-if="order" class="space-y-6">
        <!-- Header -->
        <div class="bg-white rounded-2xl border border-stone-100 p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-2xl font-bold text-stone-800">{{ order.displayId }}</h1>
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusClass(order.fulfillmentStatus)"
                >
                  <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(order.fulfillmentStatus)"></span>
                  {{ getStatusLabel(order.fulfillmentStatus) }}
                </span>
              </div>
              <p class="text-stone-500">
                Commandé le {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="downloadInvoice"
                class="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <DownloadIcon class="w-4 h-4" />
                Facture
              </button>
              <button
                @click="contactSupport"
                class="flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <MessageCircleIcon class="w-4 h-4" />
                Aide
              </button>
            </div>
          </div>
        </div>

        <!-- Tracking Timeline -->
        <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div class="p-6 border-b border-stone-100">
            <h2 class="text-lg font-semibold text-stone-800">Suivi de commande</h2>
          </div>
          
          <div class="p-6">
            <!-- Progress Bar -->
            <div class="relative mb-8">
              <div class="flex items-center justify-between">
                <div
                  v-for="(step, index) in trackingSteps"
                  :key="step.id"
                  class="flex flex-col items-center relative z-10"
                >
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    :class="step.completed 
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25' 
                      : 'bg-stone-100 text-stone-400'"
                  >
                    <component :is="step.icon" class="w-5 h-5" />
                  </div>
                  <p class="text-xs font-medium mt-2 text-center" :class="step.completed ? 'text-stone-800' : 'text-stone-400'">
                    {{ step.label }}
                  </p>
                  <p v-if="step.date" class="text-xs text-stone-400">{{ step.date }}</p>
                </div>
              </div>
              
              <!-- Progress Line -->
              <div class="absolute top-5 left-0 right-0 h-0.5 bg-stone-100 -z-0 mx-16">
                <div 
                  class="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                  :style="{ width: progressWidth + '%' }"
                ></div>
              </div>
            </div>

            <!-- Detailed Timeline -->
            <div class="space-y-4">
              <div
                v-for="event in timeline"
                :key="event.id"
                class="flex gap-4"
              >
                <div class="flex flex-col items-center">
                  <div
                    class="w-3 h-3 rounded-full"
                    :class="event.completed ? 'bg-amber-500' : 'bg-stone-200'"
                  ></div>
                  <div class="w-0.5 flex-1 bg-stone-100"></div>
                </div>
                <div class="pb-6">
                  <p class="font-medium text-stone-800">{{ event.title }}</p>
                  <p v-if="event.description" class="text-sm text-stone-500">{{ event.description }}</p>
                  <p class="text-xs text-stone-400 mt-1">{{ event.date }}</p>
                </div>
              </div>
            </div>

            <!-- Delivery Photo -->
            <div v-if="order.deliveryPhoto" class="mt-6 p-4 bg-green-50 rounded-xl">
              <p class="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
                <CameraIcon class="w-4 h-4" />
                Photo de livraison
              </p>
              <img 
                :src="order.deliveryPhoto" 
                alt="Photo de livraison" 
                class="w-full max-w-md rounded-lg border border-green-200"
              />
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div class="p-6 border-b border-stone-100">
            <h2 class="text-lg font-semibold text-stone-800">
              Articles ({{ order.items.length }})
            </h2>
          </div>
          
          <div class="divide-y divide-stone-100">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center gap-4 p-6"
            >
              <div class="w-20 h-20 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                <img
                  v-if="item.thumbnail"
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="w-16 h-16 object-contain"
                />
                <PackageIcon v-else class="w-8 h-8 text-stone-400" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-stone-800">{{ item.title }}</p>
                <p class="text-sm text-stone-500">Quantité: {{ item.quantity }}</p>
              </div>
              <p class="font-semibold text-stone-800">{{ formatPrice(item.total) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Summary & Addresses -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Shipping Address -->
          <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div class="p-6 border-b border-stone-100">
              <h2 class="text-lg font-semibold text-stone-800">Adresse de livraison</h2>
            </div>
            <div class="p-6">
              <div class="flex items-start gap-3">
                <MapPinIcon class="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p class="font-medium text-stone-800">
                    {{ order.shippingAddress.firstName }} {{ order.shippingAddress.lastName }}
                  </p>
                  <p class="text-stone-600 mt-1">
                    {{ order.shippingAddress.address1 }}<br />
                    <span v-if="order.shippingAddress.address2">{{ order.shippingAddress.address2 }}<br /></span>
                    {{ order.shippingAddress.city }}, {{ order.shippingAddress.country }}
                  </p>
                  <p v-if="order.shippingAddress.phone" class="text-stone-500 mt-2 flex items-center gap-2">
                    <PhoneIcon class="w-4 h-4" />
                    {{ order.shippingAddress.phone }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div class="p-6 border-b border-stone-100">
              <h2 class="text-lg font-semibold text-stone-800">Récapitulatif</h2>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex justify-between text-stone-600">
                <span>Sous-total</span>
                <span>{{ formatPrice(order.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-stone-600">
                <span>Livraison</span>
                <span>{{ formatPrice(order.shippingTotal) }}</span>
              </div>
              <div class="pt-3 border-t border-stone-100 flex justify-between">
                <span class="font-semibold text-stone-800">Total</span>
                <div class="text-right">
                  <p class="font-bold text-lg text-stone-800">{{ formatPrice(order.total) }}</p>
                  <p class="text-xs text-stone-400">≈ {{ formatFCFA(order.total) }}</p>
                </div>
              </div>
              
              <!-- Payment Status -->
              <div class="pt-4 mt-4 border-t border-stone-100">
                <div class="flex items-center gap-2">
                  <CheckCircleIcon 
                    v-if="order.paymentStatus === 'captured'" 
                    class="w-5 h-5 text-green-500" 
                  />
                  <ClockIcon v-else class="w-5 h-5 text-amber-500" />
                  <span class="text-sm" :class="order.paymentStatus === 'captured' ? 'text-green-700' : 'text-amber-700'">
                    {{ order.paymentStatus === 'captured' ? 'Paiement confirmé' : 'Paiement en attente' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/catalogue"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
          >
            <RefreshCwIcon class="w-5 h-5" />
            Commander à nouveau
          </NuxtLink>
          <NuxtLink
            to="/compte/commandes"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
          >
            <ArrowLeftIcon class="w-5 h-5" />
            Retour aux commandes
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight as ChevronRightIcon,
  AlertCircle as AlertCircleIcon,
  ArrowLeft as ArrowLeftIcon,
  Download as DownloadIcon,
  MessageCircle as MessageCircleIcon,
  Package as PackageIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  RefreshCw as RefreshCwIcon,
  Camera as CameraIcon,
  ShoppingCart,
  CreditCard,
  Truck,
  Home,
  Check,
} from 'lucide-vue-next'
import type { Order, FulfillmentStatus } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const authStore = useAuthStore()

// State
const order = ref<Order | null>(null)
const isLoading = ref(true)
const error = ref('')

// Tracking steps
const trackingSteps = computed(() => {
  const status = order.value?.fulfillmentStatus || 'not_fulfilled'
  const statusOrder: FulfillmentStatus[] = ['not_fulfilled', 'fulfilled', 'shipped', 'delivered']
  const currentIndex = statusOrder.indexOf(status)
  
  return [
    { 
      id: 'ordered', 
      label: 'Commandé', 
      icon: ShoppingCart, 
      completed: true,
      date: order.value ? formatShortDate(order.value.createdAt) : '',
    },
    { 
      id: 'paid', 
      label: 'Payé', 
      icon: CreditCard, 
      completed: order.value?.paymentStatus === 'captured',
      date: order.value?.paymentStatus === 'captured' ? formatShortDate(order.value.createdAt) : '',
    },
    { 
      id: 'shipped', 
      label: 'Expédié', 
      icon: Truck, 
      completed: currentIndex >= 1,
      date: currentIndex >= 1 ? 'En cours' : '',
    },
    { 
      id: 'delivered', 
      label: 'Livré', 
      icon: Home, 
      completed: status === 'delivered',
      date: status === 'delivered' ? 'Reçu' : '',
    },
  ]
})

const progressWidth = computed(() => {
  const completedSteps = trackingSteps.value.filter(s => s.completed).length
  return ((completedSteps - 1) / (trackingSteps.value.length - 1)) * 100
})

const timeline = computed(() => {
  if (!order.value) return []
  
  const events = [
    {
      id: '1',
      title: 'Commande confirmée',
      description: 'Votre commande a été reçue et confirmée',
      date: formatDateTime(order.value.createdAt),
      completed: true,
    },
  ]
  
  if (order.value.paymentStatus === 'captured') {
    events.push({
      id: '2',
      title: 'Paiement reçu',
      description: 'Le paiement a été traité avec succès',
      date: formatDateTime(order.value.createdAt),
      completed: true,
    })
  }
  
  if (['fulfilled', 'shipped', 'delivered'].includes(order.value.fulfillmentStatus)) {
    events.push({
      id: '3',
      title: 'Colis expédié',
      description: 'Votre colis est en route depuis Paris',
      date: 'En cours',
      completed: true,
    })
  }
  
  if (order.value.fulfillmentStatus === 'shipped') {
    events.push({
      id: '4',
      title: 'En transit',
      description: 'Le colis est en route vers N\'Djamena',
      date: 'En cours',
      completed: true,
    })
  }
  
  if (order.value.fulfillmentStatus === 'delivered') {
    events.push({
      id: '5',
      title: 'Livré',
      description: 'Le colis a été remis au destinataire',
      date: formatDateTime(order.value.updatedAt),
      completed: true,
    })
  }
  
  return events
})

// SEO
useSeoMeta({
  title: () => order.value ? `Commande ${order.value.displayId} - TchadBox` : 'Commande - TchadBox',
})

// Fetch order
onMounted(async () => {
  await fetchOrder()
})

async function fetchOrder() {
  const { client } = useSupabase()
  const orderId = route.params.id as string
  
  if (!authStore.user) {
    error.value = 'Vous devez être connecté'
    isLoading.value = false
    return
  }

  try {
    const { data, error: fetchError } = await client
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .eq('user_id', authStore.user.id)
      .single()

    if (fetchError) {
      error.value = 'Commande introuvable'
    } else if (data) {
      order.value = transformOrder(data)
    }
  } catch (e) {
    error.value = 'Erreur lors du chargement'
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
    shippingAddress: dbOrder.shipping_address || {
      firstName: 'Destinataire',
      lastName: '',
      address1: 'N\'Djamena',
      city: 'N\'Djamena',
      country: 'Tchad',
    },
    subtotal: dbOrder.subtotal || 0,
    shippingTotal: dbOrder.shipping_total || 0,
    total: dbOrder.total || 0,
    currency: 'EUR',
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
    deliveryPhoto: dbOrder.delivery_photo,
  }
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatShortDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
}

function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
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

function downloadInvoice() {
  // Would generate/download PDF invoice
  alert('Téléchargement de la facture...')
}

function contactSupport() {
  // Would open support chat/form
  navigateTo('/contact')
}
</script>
