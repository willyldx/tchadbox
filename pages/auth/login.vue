<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package class="w-6 h-6 text-white" />
          </div>
          <span class="text-2xl font-bold text-[var(--color-text)]">TchadBox</span>
        </NuxtLink>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl overflow-hidden">
        <!-- Step 1: Email -->
        <div v-if="step === 'email'" class="p-8">
          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Connexion</h1>
          <p class="text-[var(--color-text-muted)] mb-8">Entrez votre email pour recevoir un code de connexion sécurisé.</p>

          <form @submit.prevent="handleSendOtp" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse email</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="email"
                  type="email"
                  required
                  autofocus
                  placeholder="vous@exemple.com"
                  class="input pl-12"
                />
              </div>
            </div>

            <!-- Error -->
            <div v-if="authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
              <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" />
              {{ authStore.error }}
            </div>

            <button
              type="submit"
              :disabled="!email || authStore.isLoading"
              class="btn-gold w-full disabled:opacity-50"
            >
              <span class="flex items-center justify-center gap-2">
                <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
                <ArrowRight v-else class="w-5 h-5" />
                {{ authStore.isLoading ? 'Envoi en cours...' : 'Recevoir le code' }}
              </span>
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
            <p class="text-sm text-[var(--color-text-muted)]">
              Pas encore de compte ? <span class="text-amber-600 font-medium">Il sera créé automatiquement.</span>
            </p>
          </div>
        </div>

        <!-- Step 2: Name (for new users only) -->
        <div v-else-if="step === 'name'" class="p-8">
          <button @click="step = 'email'" class="flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" />Retour
          </button>

          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Bienvenue !</h1>
          <p class="text-[var(--color-text-muted)] mb-8">Dites-nous comment vous appeler.</p>

          <form @submit.prevent="handleNameSubmit" class="space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Prénom</label>
                <input v-model="firstName" type="text" required placeholder="Prénom" class="input" />
              </div>
              <div>
                <label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom</label>
                <input v-model="lastName" type="text" required placeholder="Nom" class="input" />
              </div>
            </div>

            <button type="submit" :disabled="!firstName || !lastName" class="btn-gold w-full disabled:opacity-50">
              <span class="flex items-center justify-center gap-2">
                <ArrowRight class="w-5 h-5" />Continuer
              </span>
            </button>
          </form>
        </div>

        <!-- Step 3: OTP Code -->
        <div v-else-if="step === 'otp'" class="p-8">
          <button @click="step = isNewUser ? 'name' : 'email'" class="flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6 transition-colors">
            <ArrowLeft class="w-4 h-4" />Retour
          </button>

          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-50 flex items-center justify-center">
            <ShieldCheck class="w-8 h-8 text-amber-600" />
          </div>

          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2 text-center">Vérification</h1>
          <p class="text-[var(--color-text-muted)] mb-8 text-center">
            Un code à 6 chiffres a été envoyé à<br>
            <strong class="text-[var(--color-text)]">{{ email }}</strong>
          </p>

          <form @submit.prevent="handleVerifyOtp" class="space-y-5">
            <!-- OTP Input boxes -->
            <div class="flex justify-center gap-3">
              <input
                v-for="(_, i) in 6"
                :key="i"
                :ref="el => otpRefs[i] = el as HTMLInputElement"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                @input="onOtpInput(i, $event)"
                @keydown="onOtpKeydown(i, $event)"
                @paste="onOtpPaste($event)"
              />
            </div>

            <!-- Error -->
            <div v-if="authStore.error" class="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
              <AlertCircle class="w-4 h-4 mt-0.5 shrink-0" />
              {{ authStore.error }}
            </div>

            <button
              type="submit"
              :disabled="otpCode.length < 6 || authStore.isLoading"
              class="btn-gold w-full disabled:opacity-50"
            >
              <span class="flex items-center justify-center gap-2">
                <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
                <LogIn v-else class="w-5 h-5" />
                {{ authStore.isLoading ? 'Vérification...' : 'Se connecter' }}
              </span>
            </button>

            <!-- Resend -->
            <div class="text-center">
              <button
                v-if="resendCooldown <= 0"
                @click="handleSendOtp"
                type="button"
                class="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Renvoyer le code
              </button>
              <p v-else class="text-sm text-[var(--color-text-muted)]">
                Renvoyer dans {{ resendCooldown }}s
              </p>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6">
        <p class="text-xs text-[var(--color-text-muted)]">
          En vous connectant, vous acceptez nos
          <NuxtLink to="/conditions" class="text-amber-600 hover:underline">CGV</NuxtLink> et notre
          <NuxtLink to="/confidentialite" class="text-amber-600 hover:underline">politique de confidentialité</NuxtLink>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Package, Mail, ArrowRight, ArrowLeft, Loader2, AlertCircle,
  ShieldCheck, LogIn
} from 'lucide-vue-next'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Connexion - TchadBox',
  description: 'Connectez-vous à votre espace TchadBox pour envoyer des colis à vos proches au Tchad.',
})

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// State
const step = ref<'email' | 'name' | 'otp'>('email')
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const isNewUser = ref(false)
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])
const resendCooldown = ref(0)
let cooldownInterval: ReturnType<typeof setInterval> | null = null

const otpCode = computed(() => otpDigits.value.join(''))

// Redirect if already logged in
onMounted(async () => {
  await authStore.checkSession()
  if (authStore.isAuthenticated) {
    const redirect = (route.query.redirect as string) || authStore.getRedirectPath()
    navigateTo(redirect)
  }
})

// OTP input logic
function onOtpInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')
  otpDigits.value[index] = value ? value[0] : ''
  input.value = otpDigits.value[index]

  if (value && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
}

function onOtpKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
}

function onOtpPaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '') || ''
  for (let i = 0; i < 6; i++) {
    otpDigits.value[i] = pasted[i] || ''
    if (otpRefs.value[i]) otpRefs.value[i].value = otpDigits.value[i]
  }
  const focusIdx = Math.min(pasted.length, 5)
  otpRefs.value[focusIdx]?.focus()
}

function startResendCooldown() {
  resendCooldown.value = 60
  if (cooldownInterval) clearInterval(cooldownInterval)
  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0 && cooldownInterval) clearInterval(cooldownInterval)
  }, 1000)
}

// Handlers
async function handleSendOtp() {
  authStore.clearError()
  const result = await authStore.sendOtp(email.value, firstName.value || undefined, lastName.value || undefined)

  if (result.success) {
    isNewUser.value = !!result.isNewUser
    if (result.isNewUser && !firstName.value) {
      step.value = 'name'
    } else {
      step.value = 'otp'
      startResendCooldown()
      nextTick(() => otpRefs.value[0]?.focus())
    }
  }
}

function handleNameSubmit() {
  handleSendOtpAfterName()
}

async function handleSendOtpAfterName() {
  authStore.clearError()
  const result = await authStore.sendOtp(email.value, firstName.value, lastName.value)
  if (result.success) {
    step.value = 'otp'
    startResendCooldown()
    nextTick(() => otpRefs.value[0]?.focus())
  }
}

async function handleVerifyOtp() {
  authStore.clearError()
  const result = await authStore.verifyOtp(email.value, otpCode.value, firstName.value, lastName.value)

  if (result.success) {
    const redirect = (route.query.redirect as string) || authStore.getRedirectPath()
    navigateTo(redirect)
  } else {
    // Clear OTP fields on error
    otpDigits.value = ['', '', '', '', '', '']
    otpRefs.value.forEach(ref => { if (ref) ref.value = '' })
    nextTick(() => otpRefs.value[0]?.focus())
  }
}

onUnmounted(() => {
  if (cooldownInterval) clearInterval(cooldownInterval)
})
</script>
