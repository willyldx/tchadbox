<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <PackageIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-stone-800">TchadBox</span>
        </NuxtLink>
        
        <NuxtLink to="/panier" class="text-sm text-stone-500 hover:text-amber-600 flex items-center gap-1">
          <ArrowLeftIcon class="w-4 h-4" />
          Retour au panier
        </NuxtLink>
      </div>

      <!-- Progress Steps -->
      <div class="mb-12">
        <div class="flex items-center justify-center">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
            <div class="flex flex-col items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors"
                :class="getStepClass(index)"
              >
                <CheckIcon v-if="index < currentStep" class="w-5 h-5" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span 
                class="text-xs mt-2 font-medium"
                :class="index <= currentStep ? 'text-amber-600' : 'text-stone-400'"
              >
                {{ step.label }}
              </span>
            </div>
            <div 
              v-if="index < steps.length - 1"
              class="w-20 sm:w-32 h-0.5 mx-2"
              :class="index < currentStep ? 'bg-amber-500' : 'bg-stone-200'"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Step 1: Information -->
          <div v-show="currentStep === 0" class="space-y-6">
            <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div class="p-6 border-b border-stone-100">
                <h2 class="text-lg font-semibold text-stone-800">Vos informations</h2>
              </div>
              
              <div class="p-6 space-y-5">
                <!-- Login prompt for guests -->
                <div v-if="!authStore.isAuthenticated" class="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <UserIcon class="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p class="text-sm text-amber-800 font-medium">Déjà client ?</p>
                    <p class="text-sm text-amber-600">
                      <NuxtLink to="/auth/login?redirect=/checkout" class="underline hover:no-underline">
                        Connectez-vous
                      </NuxtLink>
                      pour pré-remplir vos informations.
                    </p>
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Prénom *</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Nom *</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Téléphone *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+33 6 XX XX XX XX"
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <!-- Recipient Information -->
            <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div class="p-6 border-b border-stone-100">
                <h2 class="text-lg font-semibold text-stone-800">Destinataire au Tchad</h2>
                <p class="text-sm text-stone-500">Personne qui recevra le colis à N'Djamena</p>
              </div>
              
              <div class="p-6 space-y-5">
                <div class="flex items-center gap-2 mb-4">
                  <input
                    id="sameRecipient"
                    v-model="sameAsCustomer"
                    type="checkbox"
                    class="w-4 h-4 text-amber-500 border-stone-300 rounded focus:ring-amber-500/20"
                  />
                  <label for="sameRecipient" class="text-sm text-stone-600">
                    Je suis le destinataire
                  </label>
                </div>

                <div v-if="!sameAsCustomer" class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Nom du destinataire *</label>
                    <input
                      v-model="form.recipientName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Téléphone du destinataire *</label>
                    <input
                      v-model="form.recipientPhone"
                      type="tel"
                      required
                      placeholder="+235 XX XX XX XX"
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Adresse de livraison *</label>
                  <input
                    v-model="form.address.address1"
                    type="text"
                    required
                    placeholder="Quartier, rue, repère..."
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Ville *</label>
                    <select
                      v-model="form.address.city"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    >
                      <option value="N'Djamena">N'Djamena</option>
                      <option value="Moundou">Moundou</option>
                      <option value="Sarh">Sarh</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Pays</label>
                    <input
                      value="Tchad"
                      disabled
                      class="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-xl text-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">
                    Instructions de livraison <span class="text-stone-400 font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    v-model="form.deliveryInstructions"
                    rows="3"
                    placeholder="Horaires préférés, instructions spéciales..."
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-show="currentStep === 1" class="space-y-6">
            <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div class="p-6 border-b border-stone-100">
                <h2 class="text-lg font-semibold text-stone-800">Mode de paiement</h2>
              </div>
              
              <div class="p-6 space-y-4">
                <!-- Payment Methods -->
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors"
                  :class="selectedPayment === method.id 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-stone-200 hover:border-stone-300'"
                >
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    :value="method.id"
                    class="w-5 h-5 text-amber-500 border-stone-300 focus:ring-amber-500/20"
                  />
                  <div class="w-12 h-8 bg-stone-100 rounded flex items-center justify-center">
                    <component :is="method.icon" class="w-6 h-6 text-stone-600" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-stone-800">{{ method.label }}</p>
                    <p class="text-sm text-stone-500">{{ method.description }}</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Payment Form (for card) -->
            <div v-if="selectedPayment === 'card'" class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div class="p-6 border-b border-stone-100">
                <h2 class="text-lg font-semibold text-stone-800">Détails de la carte</h2>
              </div>
              
              <div class="p-6 space-y-5">
                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Numéro de carte</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Expiration</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Money Info -->
            <div v-if="selectedPayment === 'mobile'" class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <InfoIcon class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p class="text-sm text-blue-800 font-medium">Paiement Mobile Money</p>
                <p class="text-sm text-blue-600 mt-1">
                  Après confirmation, vous recevrez un SMS avec les instructions pour finaliser le paiement via Orange Money, MTN Money ou Wave.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-show="currentStep === 2" class="space-y-6">
            <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div class="p-6 border-b border-stone-100">
                <h2 class="text-lg font-semibold text-stone-800">Récapitulatif de votre commande</h2>
              </div>
              
              <div class="p-6 space-y-6">
                <!-- Customer Info -->
                <div>
                  <h3 class="text-sm font-medium text-stone-500 mb-3">EXPÉDITEUR</h3>
                  <p class="text-stone-800">{{ form.firstName }} {{ form.lastName }}</p>
                  <p class="text-stone-600">{{ form.email }}</p>
                  <p class="text-stone-600">{{ form.phone }}</p>
                </div>

                <!-- Recipient Info -->
                <div>
                  <h3 class="text-sm font-medium text-stone-500 mb-3">DESTINATAIRE</h3>
                  <p class="text-stone-800">{{ sameAsCustomer ? `${form.firstName} ${form.lastName}` : form.recipientName }}</p>
                  <p class="text-stone-600">{{ sameAsCustomer ? form.phone : form.recipientPhone }}</p>
                  <p class="text-stone-600">{{ form.address.address1 }}</p>
                  <p class="text-stone-600">{{ form.address.city }}, Tchad</p>
                </div>

                <!-- Payment -->
                <div>
                  <h3 class="text-sm font-medium text-stone-500 mb-3">PAIEMENT</h3>
                  <p class="text-stone-800">{{ paymentMethods.find(m => m.id === selectedPayment)?.label }}</p>
                </div>
              </div>
            </div>

            <!-- Terms -->
            <div class="flex items-start gap-3">
              <input
                id="terms"
                v-model="acceptTerms"
                type="checkbox"
                required
                class="w-5 h-5 mt-0.5 text-amber-500 border-stone-300 rounded focus:ring-amber-500/20"
              />
              <label for="terms" class="text-sm text-stone-600">
                J'accepte les 
                <NuxtLink to="/conditions" class="text-amber-600 hover:underline">conditions générales de vente</NuxtLink>
                et la 
                <NuxtLink to="/confidentialite" class="text-amber-600 hover:underline">politique de confidentialité</NuxtLink>
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex gap-4 mt-8">
            <button
              v-if="currentStep > 0"
              @click="currentStep--"
              class="px-6 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeftIcon class="w-5 h-5" />
              Retour
            </button>
            <button
              v-if="currentStep < 2"
              @click="nextStep"
              :disabled="!canProceed"
              class="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continuer
              <ArrowRightIcon class="w-5 h-5" />
            </button>
            <button
              v-if="currentStep === 2"
              @click="submitOrder"
              :disabled="!acceptTerms || isSubmitting"
              class="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoaderIcon v-if="isSubmitting" class="w-5 h-5 animate-spin" />
              <LockIcon v-else class="w-5 h-5" />
              {{ isSubmitting ? 'Traitement...' : `Payer ${cartStore.totalFormatted}` }}
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden sticky top-8">
            <div class="p-6 border-b border-stone-100">
              <h2 class="text-lg font-semibold text-stone-800">Votre commande</h2>
            </div>
            
            <!-- Cart Items -->
            <div class="max-h-64 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.productId"
                class="flex items-center gap-4 p-4 border-b border-stone-50"
              >
                <div class="relative">
                  <div class="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">
                    <img
                      v-if="item.thumbnail"
                      :src="item.thumbnail"
                      :alt="item.title"
                      class="w-12 h-12 object-contain"
                    />
                    <PackageIcon v-else class="w-6 h-6 text-stone-400" />
                  </div>
                  <span class="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ item.quantity }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-stone-800 truncate">{{ item.title }}</p>
                  <p class="text-xs text-stone-500">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <p class="font-semibold text-stone-800">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <!-- Totals -->
            <div class="p-6 space-y-3">
              <div class="flex justify-between text-stone-600">
                <span>Sous-total</span>
                <span>{{ cartStore.subtotalFormatted }}</span>
              </div>
              <div class="flex justify-between text-stone-600">
                <span>Livraison</span>
                <span>{{ cartStore.shippingFormatted }}</span>
              </div>
              <div class="pt-3 border-t border-stone-100 flex justify-between">
                <span class="font-semibold text-stone-800">Total</span>
                <div class="text-right">
                  <p class="font-bold text-lg text-stone-800">{{ cartStore.totalFormatted }}</p>
                  <p class="text-xs text-stone-400">≈ {{ cartStore.totalFCFA }}</p>
                </div>
              </div>
            </div>

            <!-- Trust badges -->
            <div class="px-6 pb-6 flex items-center justify-center gap-4 text-xs text-stone-400">
              <span class="flex items-center gap-1">
                <LockIcon class="w-4 h-4" />
                SSL sécurisé
              </span>
              <span class="flex items-center gap-1">
                <ShieldCheckIcon class="w-4 h-4" />
                Paiement protégé
              </span>
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
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon,
  User as UserIcon,
  CreditCard,
  Smartphone,
  Info as InfoIcon,
  Lock as LockIcon,
  ShieldCheck as ShieldCheckIcon,
  Loader as LoaderIcon,
} from 'lucide-vue-next'

definePageMeta({
  layout: false,
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Paiement - TchadBox',
  description: 'Finalisez votre commande TchadBox.',
})

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// Redirect if cart is empty
onMounted(() => {
  if (cartStore.isEmpty) {
    navigateTo('/catalogue')
  }
})

// Steps
const steps = [
  { id: 'info', label: 'Informations' },
  { id: 'payment', label: 'Paiement' },
  { id: 'confirm', label: 'Confirmation' },
]

const currentStep = ref(0)

// Form
const form = reactive({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  recipientName: '',
  recipientPhone: '',
  address: {
    address1: '',
    address2: '',
    city: "N'Djamena",
    country: 'Tchad',
  },
  deliveryInstructions: '',
})

const sameAsCustomer = ref(true)
const selectedPayment = ref('card')
const acceptTerms = ref(false)
const isSubmitting = ref(false)

// Payment methods
const paymentMethods = [
  {
    id: 'card',
    label: 'Carte bancaire',
    description: 'Visa, Mastercard, CB',
    icon: CreditCard,
  },
  {
    id: 'mobile',
    label: 'Mobile Money',
    description: 'Orange Money, MTN, Wave',
    icon: Smartphone,
  },
]

// Computed
const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return (
      form.firstName &&
      form.lastName &&
      form.email &&
      form.phone &&
      form.address.address1 &&
      (sameAsCustomer.value || (form.recipientName && form.recipientPhone))
    )
  }
  if (currentStep.value === 1) {
    return selectedPayment.value
  }
  return true
})

// Methods
function getStepClass(index: number): string {
  if (index < currentStep.value) {
    return 'bg-amber-500 text-white'
  }
  if (index === currentStep.value) {
    return 'bg-amber-500 text-white'
  }
  return 'bg-stone-100 text-stone-400'
}

function nextStep() {
  if (canProceed.value && currentStep.value < 2) {
    currentStep.value++
  }
}

async function submitOrder() {
  if (!acceptTerms.value || isSubmitting.value) return
  
  isSubmitting.value = true

  try {
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order ID
    const orderId = 'TCB-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    
    // Clear cart
    cartStore.clearCart()
    
    // Redirect to confirmation
    navigateTo(`/checkout/confirmation?order=${orderId}`)
  } catch (error) {
    console.error('Order failed:', error)
  } finally {
    isSubmitting.value = false
  }
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}
</script>
