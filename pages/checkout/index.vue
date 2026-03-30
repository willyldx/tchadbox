<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-white relative">
    
    <!-- LEFT COLUMN: Form Area -->
    <div class="flex-1 flex flex-col w-full lg:w-[55%] xl:w-[60%] px-4 sm:px-12 lg:px-24 xl:px-32 pt-8 pb-24 lg:py-16 order-2 lg:order-1 border-r border-gray-100 z-10 bg-white">
      
      <!-- Header (Mobile & Desktop) -->
      <header class="mb-8 lg:mb-12">
        <NuxtLink to="/" class="flex items-center gap-3 w-max">
          <img src="/logo.png" alt="TchadBox" class="h-10 w-auto" />
        </NuxtLink>
        
        <!-- Breadcrumbs / Steps -->
        <nav class="mt-8 flex items-center text-sm font-medium">
          <button @click="cartStore.isOpen = true; navigateTo('/')" class="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Panier</button>
          <ChevronRightIcon class="w-4 h-4 mx-2 text-gray-300" />
          <span :class="currentStep === 0 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'">Informations</span>
          <ChevronRightIcon class="w-4 h-4 mx-2 text-gray-300" />
          <span :class="currentStep === 1 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'">Paiement</span>
          <ChevronRightIcon class="w-4 h-4 mx-2 text-gray-300" />
          <span :class="currentStep === 2 ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'">Vérification</span>
        </nav>
      </header>

      <!-- Main Form Area -->
      <main class="flex-grow max-w-2xl">
        
        <!-- Step 1: Information -->
        <div v-show="currentStep === 0" class="animate-fade-in">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold text-[var(--color-text)]">Vos informations</h2>
            <NuxtLink v-if="!authStore.isAuthenticated" to="/auth/login?redirect=/checkout" class="text-sm text-[var(--color-primary)] hover:underline font-medium">
              Déjà client ? Se connecter
            </NuxtLink>
          </div>
          
          <div class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="relative">
                <input v-model="form.firstName" type="text" id="fn" class="peer checkout-input" placeholder=" " required />
                <label for="fn" class="checkout-label">Prénom</label>
              </div>
              <div class="relative">
                <input v-model="form.lastName" type="text" id="ln" class="peer checkout-input" placeholder=" " required />
                <label for="ln" class="checkout-label">Nom</label>
              </div>
            </div>
            
            <div class="relative">
              <input v-model="form.email" type="email" id="email" class="peer checkout-input" placeholder=" " required />
              <label for="email" class="checkout-label">Adresse e-mail</label>
            </div>
            
            <div class="relative">
              <input v-model="form.phone" type="tel" id="phone" class="peer checkout-input" placeholder=" " required />
              <label for="phone" class="checkout-label">Téléphone (avec indicatif)</label>
            </div>
          </div>

          <h2 class="text-2xl font-semibold text-[var(--color-text)] mt-12 mb-6">Expédition au Tchad</h2>
          
          <div class="space-y-4">
            <label class="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input v-model="sameAsCustomer" type="checkbox" class="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-transparent" />
              <span class="text-sm font-medium text-[var(--color-text)]">Je suis le destinataire</span>
            </label>

            <div v-show="!sameAsCustomer" class="grid sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100 animate-fade-in">
              <div class="relative">
                <input v-model="form.recipientName" type="text" id="rn" class="peer checkout-input bg-white" placeholder=" " />
                <label for="rn" class="checkout-label">Nom du destinataire</label>
              </div>
              <div class="relative">
                <input v-model="form.recipientPhone" type="tel" id="rp" class="peer checkout-input bg-white" placeholder=" " />
                <label for="rp" class="checkout-label">Tél. du destinataire</label>
              </div>
            </div>

            <div class="relative">
              <input v-model="form.address.address1" type="text" id="addr" class="peer checkout-input" placeholder=" " required />
              <label for="addr" class="checkout-label">Adresse de livraison (Quartier, rue, repère...)</label>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="relative">
                <select v-model="form.address.city" id="city" class="peer checkout-input appearance-none bg-none" required>
                  <option value="N'Djamena">N'Djamena</option>
                  <option value="Moundou">Moundou</option>
                  <option value="Sarh">Sarh</option>
                </select>
                <label for="city" class="checkout-label">Ville</label>
                <ChevronDownIcon class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div class="relative">
                <input value="Tchad" disabled class="checkout-input bg-gray-50 text-gray-500" />
                <label class="checkout-label">Pays</label>
              </div>
            </div>
            
            <div class="relative">
              <textarea v-model="form.deliveryInstructions" id="instr" rows="2" class="peer checkout-input resize-none" placeholder=" "></textarea>
              <label for="instr" class="checkout-label">Instructions (optionnel)</label>
            </div>
          </div>
          
          <button @click="nextStep" :disabled="!canProceed" class="btn-gold w-full py-4 mt-8 rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
            Continuer vers le paiement
          </button>
        </div>

        <!-- Step 2: Payment -->
        <div v-show="currentStep === 1" class="animate-fade-in">
          <div class="flex items-center gap-3 text-sm text-[var(--color-primary)] font-medium mb-8 cursor-pointer hover:underline w-max" @click="currentStep = 0">
            <ChevronLeftIcon class="w-4 h-4" /> Retour aux coordonnées
          </div>
          
          <h2 class="text-2xl font-semibold text-[var(--color-text)] mb-2">Paiement</h2>
          <p class="text-sm text-gray-500 mb-6 flex items-center gap-1.5"><LockIcon class="w-4 h-4 text-gray-400" /> Toutes les transactions sont sécurisées et cryptées.</p>

          <div class="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <label 
              v-for="(method, index) in paymentMethods" 
              :key="method.id"
              class="flex flex-col border-b last:border-b-0 border-gray-200 cursor-pointer transition-colors"
              :class="selectedPayment === method.id ? 'bg-amber-50/30' : 'hover:bg-gray-50'"
            >
              <div class="flex items-center p-5 gap-4">
                <input v-model="selectedPayment" type="radio" :value="method.id" class="w-5 h-5 text-amber-500 border-gray-300 focus:ring-amber-500/20" />
                <div class="flex-1 flex justify-between items-center">
                  <span class="font-medium text-[var(--color-text)]">{{ method.label }}</span>
                  <div class="flex items-center gap-2" v-if="method.id === 'card'">
                    <img src="/icons/visa.svg" class="h-6" alt="Visa" onerror="this.style.display='none'" />
                    <img src="/icons/mastercard.svg" class="h-6" alt="Mastercard" onerror="this.style.display='none'" />
                  </div>
                  <SmartphoneIcon v-else-if="method.id === 'mobile_money' || method.id === 'tchad_mobile_money'" class="w-6 h-6 text-gray-400" />
                  <BanknoteIcon v-else class="w-6 h-6 text-gray-400" />
                </div>
              </div>
              
              <!-- Active Method Content -->
              <div v-show="selectedPayment === method.id" class="px-5 pb-5 pt-1 pl-[52px]">
                <p class="text-sm text-gray-500">{{ method.description }}</p>
                
                <!-- Specialized Mobile Money Tchad Panel -->
                <div v-if="method.id === 'tchad_mobile_money'" class="mt-4 bg-white border border-amber-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                  <div class="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <h4 class="font-semibold text-[var(--color-text)] text-sm mb-2 text-amber-900">Procédure Manuelle Tchad</h4>
                  <p class="text-sm text-gray-600 mb-3 leading-relaxed">
                    1. Envoyer exactement <b class="text-black">{{ cartStore.totalXAF }} FCFA</b> au :<br/>
                    <span class="inline-block mt-1 font-mono bg-amber-100 text-amber-800 px-2 rounded tracking-wide">+235 85 96 25 92 (Airtel)</span>
                  </p>
                  <div class="relative mt-2">
                    <input v-model="transferPhone" type="tel" id="tpl" class="peer checkout-input !bg-gray-50" placeholder=" " />
                    <label for="tpl" class="checkout-label">Votre n° de téléphone (qui a fait le transfert)</label>
                  </div>
                </div>
                
                <div v-else class="mt-4 bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                  <component :is="method.icon" class="w-8 h-8 text-gray-400 mb-3 opacity-50" />
                  <p class="text-sm text-gray-500 max-w-sm">Après avoir cliqué sur "Vérifier la commande", vous serez redirigé en toute sécurité vers Paystack pour finaliser le paiement.</p>
                </div>
              </div>
            </label>
          </div>

          <div v-if="paymentError" class="mt-4 bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 text-sm">
            <InfoIcon class="w-5 h-5 shrink-0" />
            <span>{{ paymentError }}</span>
          </div>

          <button @click="nextStep" :disabled="!canProceed" class="btn-gold w-full py-4 mt-8 rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
            Vérifier la commande
          </button>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-show="currentStep === 2" class="animate-fade-in">
           <div class="flex items-center gap-3 text-sm text-[var(--color-primary)] font-medium mb-8 cursor-pointer hover:underline w-max" @click="currentStep = 1">
            <ChevronLeftIcon class="w-4 h-4" /> Retour aux moyens de paiement
          </div>
          
          <h2 class="text-2xl font-semibold text-[var(--color-text)] mb-6">Résumé final</h2>

          <div class="border border-gray-200 rounded-2xl p-0 overflow-hidden mb-8 text-sm">
            <div class="flex items-center justify-between p-4 border-b border-gray-100">
              <span class="text-gray-500 w-24">Contact</span>
              <span class="font-medium text-[var(--color-text)] flex-1">{{ form.email }}</span>
              <button @click="currentStep = 0" class="text-[var(--color-primary)] hover:underline font-medium">Modifier</button>
            </div>
             <div class="flex items-center justify-between p-4 border-b border-gray-100">
              <span class="text-gray-500 w-24">Expédier à</span>
              <span class="font-medium text-[var(--color-text)] flex-1 truncate pr-4">{{ form.address.address1 }}, {{ form.address.city }}, Tchad</span>
              <button @click="currentStep = 0" class="text-[var(--color-primary)] hover:underline font-medium">Modifier</button>
            </div>
             <div class="flex items-center justify-between p-4">
              <span class="text-gray-500 w-24">Méthode</span>
              <span class="font-medium text-[var(--color-text)] flex-1">{{ paymentMethods.find(m => m.id === selectedPayment)?.label }}</span>
              <button @click="currentStep = 1" class="text-[var(--color-primary)] hover:underline font-medium">Modifier</button>
            </div>
          </div>

          <!-- Conditions -->
          <label class="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer">
            <input v-model="acceptTerms" type="checkbox" required class="w-5 h-5 mt-0.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20" />
            <span class="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              En procédant au paiement, j'accepte les <NuxtLink to="/conditions" class="text-amber-600 hover:underline">conditions générales de vente</NuxtLink> et je confirme que les informations fournies sont exactes.
            </span>
          </label>

          <button @click="submitOrder" :disabled="!acceptTerms || isSubmitting" class="btn-primary w-full py-4 mt-8 rounded-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed">
            <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer" />
            <div class="flex items-center justify-center gap-2 relative z-10">
              <LoaderIcon v-if="isSubmitting" class="w-5 h-5 animate-spin" />
              <LockIcon v-else class="w-5 h-5" />
              <span class="font-bold text-lg">{{ isSubmitting ? 'Traitement en cours...' : `Payer ${cartStore.formattedTotal}` }}</span>
            </div>
          </button>
        </div>

      </main>

      <!-- Footer Policy Links -->
      <footer class="mt-auto pt-8 border-t border-gray-100 text-xs font-medium text-[var(--color-text-muted)] flex flex-wrap gap-4">
        <NuxtLink to="/conditions" class="hover:text-[var(--color-text)] transition-colors">Politique de remboursement</NuxtLink>
        <NuxtLink to="/conditions" class="hover:text-[var(--color-text)] transition-colors">Politique de livraison</NuxtLink>
        <NuxtLink to="/confidentialite" class="hover:text-[var(--color-text)] transition-colors">Politique de confidentialité</NuxtLink>
        <NuxtLink to="/mentions-legales" class="hover:text-[var(--color-text)] transition-colors">Mentions légales</NuxtLink>
      </footer>
    </div>

    <!-- RIGHT COLUMN: Order Summary (Sticky Sidebar) -->
    <div class="w-full lg:w-[45%] xl:w-[40%] bg-[#f5f5f3] border-b lg:border-b-0 lg:border-l border-gray-200 px-4 sm:px-12 lg:px-16 xl:px-24 py-8 lg:py-16 order-1 lg:order-2">
      <!-- Mobile Toggle for Order Summary (Optional, but usually visible to start) -->
      <div class="lg:sticky lg:top-12">
        <!-- Products List -->
        <div class="space-y-4 mb-6 max-h-[40vh] lg:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center gap-4">
            <div class="relative shrink-0">
               <div class="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                  <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover mix-blend-multiply" />
                  <PackageIcon v-else class="w-6 h-6 text-gray-300" />
               </div>
               <div class="absolute -top-2 -right-2 w-5 h-5 bg-gray-500/90 backdrop-blur text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                 {{ item.quantity }}
               </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-[var(--color-text)] text-sm truncate">{{ item.title }}</p>
              <p v-if="item.variantTitle" class="text-xs text-[var(--color-text-muted)] mt-0.5">{{ item.variantTitle }}</p>
            </div>
            <div class="text-sm font-medium text-[var(--color-text)] shrink-0">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <!-- Discount Code (Visual Only for now) -->
        <div class="flex gap-2 mb-6 pt-6 border-t border-gray-200/80">
          <input type="text" placeholder="Code de réduction" class="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all placeholder-gray-400" />
          <button class="px-5 py-3 bg-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-300 transition-colors">Appliquer</button>
        </div>

        <!-- Totals -->
        <div class="space-y-3 pb-6 border-b border-gray-200/80">
          <div class="flex justify-between text-sm">
            <span class="text-[var(--color-text-secondary)]">Sous-total</span>
            <span class="font-medium text-[var(--color-text)]">{{ cartStore.subtotalFormatted }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-[var(--color-text-secondary)] flex items-center gap-1.5">Expédition <TruckIcon class="w-3.5 h-3.5 text-gray-400"/></span>
            <span class="font-medium text-[var(--color-text)]">{{ cartStore.shippingFormatted }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-6">
          <span class="text-lg text-[var(--color-text)]">Total</span>
          <div class="text-right flex items-end gap-3 lg:flex-col lg:items-end lg:gap-0">
            <span class="text-xs text-gray-500 font-medium tracking-wide">EUR</span>
            <span class="text-3xl font-black text-[var(--color-text)] -tracking-wider">{{ cartStore.totalFormatted }}</span>
          </div>
        </div>
        <div class="text-right mt-1">
          <span class="text-sm text-[var(--color-text-muted)] font-medium">≈ {{ cartStore.totalFCFA }}</span>
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
const { checkout: apiCheckout } = useBackendApi()
const { initializePayment, verifyPayment, eurToXof } = usePaystack()

const currentStep = ref(0)
const steps = [
  { id: 'info', label: 'Informations' },
  { id: 'payment', label: 'Paiement' },
  { id: 'confirm', label: 'Confirmation' },
]

// Redirect if cart is empty (wait for hydration)
watchEffect(() => {
  if (cartStore.isHydrated && cartStore.isEmpty) {
    navigateTo('/catalogue')
  }
})

// Currency Selection
const currencies = [
  { id: 'EUR', label: 'Euro (€)', icon: '€' },
  { id: 'USD', label: 'Dollar ($)', icon: '$' },
  { id: 'XAF', label: 'FCFA (CFA)', icon: 'FC' },
]

// Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\+?[\d\s-]{8,}$/

const errors = reactive({
  email: '',
  phone: '',
  recipientPhone: '',
})

function validateStep1() {
  let isValid = true
  errors.email = !emailRegex.test(form.email) ? 'Email invalide' : ''
  errors.phone = !phoneRegex.test(form.phone) ? 'Téléphone invalide' : ''
  
  if (!sameAsCustomer.value) {
    errors.recipientPhone = !phoneRegex.test(form.recipientPhone) ? 'Téléphone destinataire invalide' : ''
  } else {
    errors.recipientPhone = ''
  }

  if (errors.email || errors.phone || errors.recipientPhone) isValid = false
  return isValid
}

function nextStep() {
  if (currentStep.value === 0 && !validateStep1()) return
  
  if (canProceed.value && currentStep.value < 2) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

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
  {
    id: 'tchad_mobile_money',
    label: 'Mobile Money Tchad',
    description: 'Airtel Money ou Moov Africa (manuel)',
    icon: Smartphone,
  },
]

const transferPhone = ref(authStore.user?.phone || '')

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
    // Calculer le montant FCFA pour les commandes Mobile Money
    const isMobileMoney = selectedPayment.value === 'tchad_mobile_money'
    const paymentAmountFcfa = isMobileMoney ? cartStore.totalXAF : undefined

    const { orderId, reference } = await apiCheckout({
      user_id: authStore.user?.id,
      email: form.email,
      customer_first_name: form.firstName,
      customer_last_name: form.lastName,
      customer_phone: isMobileMoney ? transferPhone.value : form.phone,
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
      payment_amount_fcfa: paymentAmountFcfa,
      items: cartStore.items.map((item) => ({
        product_id: item.productId,
        variant_id: item.variantId,
        title: item.variantTitle ? `${item.title} (${item.variantTitle})` : item.title,
        quantity: item.quantity,
        unit_price: item.price,
        total: item.price * item.quantity,
        thumbnail: item.thumbnail,
      })),
    })

    // 2. Si Mobile Money Tchad, rediriger directement vers la confirmation avec instructions
    if (selectedPayment.value === 'tchad_mobile_money') {
      const totalFCFA = cartStore.totalFCFA
      cartStore.clearCart()
      navigateTo(`/checkout/confirmation?order=${reference}&method=tchad_mobile_money&amount=${totalFCFA}`)
      return
    }

    // 3. Ouvrir Paystack avec la référence renvoyée par l'API (pour les autres méthodes)
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
            // L'état de l'ordre est mis à jour en base de données par le webhook Laravel
            cartStore.clearCart()
            navigateTo(`/checkout/confirmation?order=${reference}`)
          } else {
            paymentError.value = verification.error || 'La vérification du paiement a échoué.'
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

<style scoped>
/* Stripe/Shopify style floating inputs */
.checkout-input {
  @apply block w-full px-4 pt-6 pb-2 text-sm text-[var(--color-text)] bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all font-medium;
}

.checkout-label {
  @apply absolute text-gray-500 text-sm duration-200 transform -translate-y-3 scale-[0.85] top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.85] peer-focus:-translate-y-3 pointer-events-none;
}

/* Custom Scrollbar for Cart sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
