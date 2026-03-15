<template>
  <div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
            <PackageIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-[var(--color-text)]">TchadBox</span>
        </NuxtLink>
        
        <NuxtLink to="/panier" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)] flex items-center gap-1">
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
                :class="index <= currentStep ? 'text-amber-600' : 'text-[var(--color-text-muted)]'"
              >
                {{ step.label }}
              </span>
            </div>
            <div 
              v-if="index < steps.length - 1"
              class="w-20 sm:w-32 h-0.5 mx-2"
              :class="index < currentStep ? 'bg-amber-500' : 'bg-gray-200'"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Step 1: Information -->
          <div v-show="currentStep === 0" class="space-y-6">
            <div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <div class="p-6 border-b border-[var(--color-border)]">
                <h2 class="text-lg font-semibold text-[var(--color-text)]">Vos informations</h2>
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
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Prénom *</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      required
                      class="input"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom *</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      required
                      class="input"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="input"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Téléphone *</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+235 XX XX XX XX"
                    class="input"
                  />
                </div>
              </div>
            </div>

            <!-- Recipient Information -->
            <div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <div class="p-6 border-b border-[var(--color-border)]">
                <h2 class="text-lg font-semibold text-[var(--color-text)]">Destinataire au Tchad</h2>
                <p class="text-sm text-[var(--color-text-muted)]">Personne qui recevra le colis à N'Djamena</p>
              </div>
              
              <div class="p-6 space-y-5">
                <div class="flex items-center gap-2 mb-4">
                  <input
                    id="sameRecipient"
                    v-model="sameAsCustomer"
                    type="checkbox"
                    class="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20"
                  />
                  <label for="sameRecipient" class="text-sm text-[var(--color-text-secondary)]">
                    Je suis le destinataire
                  </label>
                </div>

                <div v-if="!sameAsCustomer" class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom du destinataire *</label>
                    <input
                      v-model="form.recipientName"
                      type="text"
                      required
                      class="input"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Téléphone du destinataire *</label>
                    <input
                      v-model="form.recipientPhone"
                      type="tel"
                      required
                      placeholder="+235 XX XX XX XX"
                      class="input"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse de livraison *</label>
                  <input
                    v-model="form.address.address1"
                    type="text"
                    required
                    placeholder="Quartier, rue, repère..."
                    class="input"
                  />
                </div>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Ville *</label>
                    <select
                      v-model="form.address.city"
                      required
                      class="input"
                    >
                      <option value="N'Djamena">N'Djamena</option>
                      <option value="Moundou">Moundou</option>
                      <option value="Sarh">Sarh</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Pays</label>
                    <input
                      value="Tchad"
                      disabled
                      class="w-full px-4 py-3 bg-gray-100 border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)]"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    Instructions de livraison <span class="text-[var(--color-text-muted)] font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    v-model="form.deliveryInstructions"
                    rows="3"
                    placeholder="Horaires préférés, instructions spéciales..."
                    class="input resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Payment -->
          <div v-show="currentStep === 1" class="space-y-6">
            <div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <div class="p-6 border-b border-[var(--color-border)]">
                <h2 class="text-lg font-semibold text-[var(--color-text)]">Mode de paiement</h2>
                <p class="text-sm text-[var(--color-text-muted)] mt-1">Paiement sécurisé via Paystack</p>
              </div>
              
              <div class="p-6 space-y-4">
                <!-- Payment Methods -->
                <label
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors"
                  :class="selectedPayment === method.id 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-[var(--color-border)] hover:border-gray-300'"
                >
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    :value="method.id"
                    class="w-5 h-5 text-amber-500 border-gray-300 focus:ring-amber-500/20"
                  />
                  <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <component :is="method.icon" class="w-6 h-6 text-[var(--color-text-secondary)]" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-[var(--color-text)]">{{ method.label }}</p>
                    <p class="text-sm text-[var(--color-text-muted)]">{{ method.description }}</p>
                  </div>
                </label>

                <!-- Paystack Security Info -->
                <div class="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3 mt-4">
                  <ShieldCheckIcon class="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p class="text-sm text-green-800 font-medium">Paiement 100% sécurisé</p>
                    <p class="text-sm text-green-600 mt-1">
                      Vos informations de paiement sont traitées de manière sécurisée par Paystack. 
                      Nous ne stockons jamais vos données bancaires.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error display -->
            <div v-if="paymentError" class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <InfoIcon class="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p class="text-sm text-red-800 font-medium">Erreur de paiement</p>
                <p class="text-sm text-red-600 mt-1">{{ paymentError }}</p>
              </div>
            </div>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-show="currentStep === 2" class="space-y-6">
            <div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden">
              <div class="p-6 border-b border-[var(--color-border)]">
                <h2 class="text-lg font-semibold text-[var(--color-text)]">Récapitulatif de votre commande</h2>
              </div>
              
              <div class="p-6 space-y-6">
                <!-- Customer Info -->
                <div>
                  <h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">EXPÉDITEUR</h3>
                  <p class="text-[var(--color-text)]">{{ form.firstName }} {{ form.lastName }}</p>
                  <p class="text-[var(--color-text-secondary)]">{{ form.email }}</p>
                  <p class="text-[var(--color-text-secondary)]">{{ form.phone }}</p>
                </div>

                <!-- Recipient Info -->
                <div>
                  <h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">DESTINATAIRE</h3>
                  <p class="text-[var(--color-text)]">{{ sameAsCustomer ? `${form.firstName} ${form.lastName}` : form.recipientName }}</p>
                  <p class="text-[var(--color-text-secondary)]">{{ sameAsCustomer ? form.phone : form.recipientPhone }}</p>
                  <p class="text-[var(--color-text-secondary)]">{{ form.address.address1 }}</p>
                  <p class="text-[var(--color-text-secondary)]">{{ form.address.city }}, Tchad</p>
                </div>

                <!-- Payment -->
                <div>
                  <h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">PAIEMENT</h3>
                  <p class="text-[var(--color-text)]">{{ paymentMethods.find(m => m.id === selectedPayment)?.label }}</p>
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
                class="w-5 h-5 mt-0.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20"
              />
              <label for="terms" class="text-sm text-[var(--color-text-secondary)]">
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
              class="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeftIcon class="w-5 h-5" />
              Retour
            </button>
            <button
              v-if="currentStep < 2"
              @click="nextStep"
              :disabled="!canProceed"
              class="flex-1 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continuer
              <ArrowRightIcon class="w-5 h-5" />
            </button>
            <button
              v-if="currentStep === 2"
              @click="submitOrder"
              :disabled="!acceptTerms || isSubmitting"
              class="flex-1 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LoaderIcon v-if="isSubmitting" class="w-5 h-5 animate-spin" />
              <LockIcon v-else class="w-5 h-5" />
              {{ isSubmitting ? 'Traitement...' : `Payer ${cartStore.totalFormatted}` }}
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden sticky top-8">
            <div class="p-6 border-b border-[var(--color-border)]">
              <h2 class="text-lg font-semibold text-[var(--color-text)]">Votre commande</h2>
            </div>
            
            <!-- Cart Items -->
            <div class="max-h-64 overflow-y-auto">
              <div
                v-for="item in cartStore.items"
                :key="item.productId"
                class="flex items-center gap-4 p-4 border-b border-gray-50"
              >
                <div class="relative">
                  <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      v-if="item.thumbnail"
                      :src="item.thumbnail"
                      :alt="item.title"
                      class="w-12 h-12 object-contain"
                    />
                    <PackageIcon v-else class="w-6 h-6 text-[var(--color-text-muted)]" />
                  </div>
                  <span class="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ item.quantity }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-[var(--color-text)] truncate">{{ item.title }}</p>
                  <p class="text-xs text-[var(--color-text-muted)]">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <p class="font-semibold text-[var(--color-text)]">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>

            <!-- Totals -->
            <div class="p-6 space-y-3">
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span>Sous-total</span>
                <span>{{ cartStore.subtotalFormatted }}</span>
              </div>
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span>Livraison</span>
                <span>{{ cartStore.shippingFormatted }}</span>
              </div>
              <div class="pt-3 border-t border-[var(--color-border)] flex justify-between">
                <span class="font-semibold text-[var(--color-text)]">Total</span>
                <div class="text-right">
                  <p class="font-bold text-lg text-[var(--color-text)]">{{ cartStore.totalFormatted }}</p>
                  <p class="text-xs text-[var(--color-text-muted)]">≈ {{ cartStore.totalFCFA }}</p>
                </div>
              </div>
            </div>

            <!-- Trust badges -->
            <div class="px-6 pb-6 flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)]">
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
  Banknote,
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
const { client: supabase } = useSupabase()
const { checkout: apiCheckout } = useBackendApi()
const { initializePayment, verifyPayment, eurToXof } = usePaystack()

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
const paymentError = ref<string | null>(null)

// Payment methods (Paystack supported channels)
const paymentMethods = [
  {
    id: 'card',
    label: 'Carte bancaire',
    description: 'Visa, Mastercard — sécurisé via Paystack',
    icon: CreditCard,
  },
  {
    id: 'mobile_money',
    label: 'Mobile Money',
    description: 'MTN, Orange Money, Wave',
    icon: Smartphone,
  },
  {
    id: 'bank_transfer',
    label: 'Virement bancaire',
    description: 'Transfert direct depuis votre banque',
    icon: Banknote,
  },
]

// Map selected payment to Paystack channels
const paystackChannels = computed(() => {
  const channelMap: Record<string, string[]> = {
    card: ['card'],
    mobile_money: ['mobile_money'],
    bank_transfer: ['bank_transfer'],
  }
  return channelMap[selectedPayment.value] || ['card', 'mobile_money', 'bank_transfer']
})

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
  return 'bg-gray-100 text-[var(--color-text-muted)]'
}

function nextStep() {
  if (canProceed.value && currentStep.value < 2) {
    currentStep.value++
  }
}

async function submitOrder() {
  if (!acceptTerms.value || isSubmitting.value) return

  isSubmitting.value = true
  paymentError.value = null

  try {
    const recipientName = sameAsCustomer.value
      ? `${form.firstName} ${form.lastName}`
      : form.recipientName
    const recipientPhone = sameAsCustomer.value ? form.phone : form.recipientPhone

    // 1. Créer la commande via l'API backend (gère invités + référence unique)
    const { orderId, reference } = await apiCheckout({
      user_id: authStore.user?.id,
      email: form.email,
      customer_first_name: form.firstName,
      customer_last_name: form.lastName,
      customer_phone: form.phone,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      shipping_address_1: form.address.address1,
      shipping_address_2: form.address.address2 || undefined,
      shipping_city: form.address.city,
      shipping_country: form.address.country,
      delivery_instructions: form.deliveryInstructions || undefined,
      subtotal: cartStore.subtotal,
      shipping_total: cartStore.shipping,
      total: cartStore.total,
      payment_method: selectedPayment.value,
      items: cartStore.items.map((item) => ({
        product_id: item.productId,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        total: item.price * item.quantity,
        thumbnail: item.thumbnail,
      })),
    })

    // 2. Ouvrir Paystack avec la référence renvoyée par l'API
    const amountInXof = eurToXof(cartStore.total)
    await initializePayment({
      email: form.email,
      amount: amountInXof * 100,
      currency: 'XOF',
      reference,
      channels: paystackChannels.value,
      metadata: {
        order_id: orderId,
        customer_name: `${form.firstName} ${form.lastName}`,
        recipient_name: recipientName,
        custom_fields: [
          { display_name: 'Commande', variable_name: 'order_ref', value: reference },
          { display_name: 'Destinataire', variable_name: 'recipient', value: recipientName },
        ],
      },
      onSuccess: async (response) => {
        try {
          const verification = await verifyPayment(response.reference)
          if (verification.success) {
            await supabase
              .from('orders')
              .update({
                payment_status: 'captured',
                status: 'processing',
              })
              .eq('id', orderId)
            cartStore.clearCart()
            navigateTo(`/checkout/confirmation?order=${reference}`)
          } else {
            paymentError.value = verification.error || 'La vérification du paiement a échoué.'
            await supabase
              .from('orders')
              .update({ payment_status: 'failed' })
              .eq('id', orderId)
          }
        } catch (err) {
          console.error('Payment verification error:', err)
          paymentError.value =
            'Erreur lors de la vérification. Contactez le support avec la référence: ' + reference
        } finally {
          isSubmitting.value = false
        }
      },
      onClose: () => {
        isSubmitting.value = false
        paymentError.value = 'Paiement annulé. Votre commande est en attente de paiement.'
      },
    })
  } catch (error: any) {
    console.error('Order failed:', error)
    paymentError.value = error.data?.message || error.message || 'Une erreur est survenue. Veuillez réessayer.'
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
