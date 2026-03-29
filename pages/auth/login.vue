<template>
  <div class="min-h-screen flex bg-[var(--color-bg-warm)]">
    <!-- Left Section: Cinematic Image (Desktop Only) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[var(--color-primary)]">
      <img 
        src="/hero-bg.png" 
        alt="Famille au Tchad" 
        class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
      />
      <!-- Soft Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/90 via-[var(--color-primary)]/60 to-transparent"></div>
      
      <!-- Content over image -->
      <div class="relative z-10 p-16 flex flex-col justify-end h-full">
        <!-- Optional Decorative Elements -->
        <div class="w-20 h-2 bg-[var(--color-accent)] rounded-full mb-8"></div>
        <h2 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6" style="font-family: var(--font-display);">
          Votre lien direct<br/>avec la <span class="text-gradient-gold">famille</span>.
        </h2>
        <p class="text-xl text-white/80 font-light max-w-lg">
          Connectez-vous pour envoyer vos paniers de courses, kits scolaires et produits essentiels directement à N'Djamena.
        </p>
      </div>
    </div>

    <!-- Right Section: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative bg-white">
      <!-- Floating Orb Mobile Decoration -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none lg:hidden"></div>

      <div class="w-full max-w-md relative z-10">
        <!-- Back to Home -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-12">
          <ArrowLeft class="w-4 h-4" /> Retour à l'accueil
        </NuxtLink>

        <!-- Logo Mobile -->
        <div class="lg:hidden mb-8">
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <div class="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg">
              <Package class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-[var(--color-primary)] tracking-tight">TchadBox</span>
          </NuxtLink>
        </div>

        <!-- Logo Desktop (Optional, but good for branding consistency) -->
        <div class="hidden lg:flex mb-10 items-center gap-3">
          <div class="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-md">
            <Package class="w-6 h-6 text-white" />
          </div>
          <span class="text-2xl font-bold text-[var(--color-primary)] tracking-tight">TchadBox</span>
        </div>

        <!-- Form Container -->
        <div class="space-y-8">
          
          <!-- Step 1: Email -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-300 ease-in absolute w-full inset-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-8"
          >
            <div v-if="step === 'email'" class="w-full">
              <div>
                <h1 class="text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">Bienvenue</h1>
                <p class="text-[var(--color-text-muted)] font-light text-lg mb-8">Entrez votre email. Nous vous enverrons un code magique pour vous connecter, sans mot de passe.</p>
              </div>

              <form @submit.prevent="handleSendOtp" class="space-y-6">
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-[var(--color-text)] ml-1">Adresse email</label>
                  <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail class="w-5 h-5 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                    </div>
                    <input
                      v-model="email"
                      type="email"
                      required
                      autofocus
                      placeholder="vous@exemple.com"
                      class="block w-full pl-11 pr-4 py-4 bg-gray-50/50 border-2 border-transparent hover:border-gray-100 focus:bg-white focus:border-[var(--color-primary)] rounded-2xl outline-none transition-all placeholder:text-gray-400 text-[var(--color-text)] font-medium shadow-sm focus:shadow-md"
                    />
                  </div>
                </div>

                <!-- Error -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                >
                  <div v-if="authStore.error" class="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-start gap-3">
                    <AlertCircle class="w-5 h-5 mt-0.5 shrink-0" />
                    <span class="leading-relaxed">{{ authStore.error }}</span>
                  </div>
                </Transition>

                <button
                  type="submit"
                  :disabled="!email || authStore.isLoading"
                  class="w-full relative group overflow-hidden rounded-2xl p-[2px] disabled:opacity-60 transition-all custom-shadow"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] group-hover:scale-105 transition-transform duration-500"></span>
                  <div class="relative flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] rounded-[14px] text-white font-bold text-lg transition-colors group-hover:bg-transparent">
                    <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
                    <ArrowRight v-else class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    {{ authStore.isLoading ? 'Envoi en cours...' : 'Continuer' }}
                  </div>
                </button>
              </form>

              <div class="mt-8 pt-8 border-t border-gray-100 text-center">
                <p class="text-sm font-light text-[var(--color-text-muted)]">
                  Nouveau sur TchadBox ? <span class="text-[var(--color-primary)] font-medium">Votre compte sera créé instantanément.</span>
                </p>
              </div>
            </div>
          </Transition>

          <!-- Step 2: Name (for new users only) -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-300 ease-in absolute w-full inset-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-8"
          >
            <div v-if="step === 'name'" class="w-full">
              <button @click="step = 'email'" class="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8 transition-colors group">
                <div class="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Changer d'email
              </button>

              <div>
                <h1 class="text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">Faisons connaissance !</h1>
                <p class="text-[var(--color-text-muted)] font-light text-lg mb-8">Dites-nous comment vous appeler pour personnaliser votre espace.</p>
              </div>

              <form @submit.prevent="handleNameSubmit" class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-[var(--color-text)] ml-1">Prénom</label>
                    <input 
                      v-model="firstName" 
                      type="text" 
                      required 
                      autofocus
                      placeholder="Votre prénom" 
                      class="block w-full px-4 py-4 bg-gray-50/50 border-2 border-transparent hover:border-gray-100 focus:bg-white focus:border-[var(--color-primary)] rounded-2xl outline-none transition-all placeholder:text-gray-400 text-[var(--color-text)] font-medium shadow-sm focus:shadow-md"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-[var(--color-text)] ml-1">Nom</label>
                    <input 
                      v-model="lastName" 
                      type="text" 
                      required 
                      placeholder="Votre nom" 
                      class="block w-full px-4 py-4 bg-gray-50/50 border-2 border-transparent hover:border-gray-100 focus:bg-white focus:border-[var(--color-primary)] rounded-2xl outline-none transition-all placeholder:text-gray-400 text-[var(--color-text)] font-medium shadow-sm focus:shadow-md"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  :disabled="!firstName || !lastName" 
                  class="w-full relative group overflow-hidden rounded-2xl p-[2px] disabled:opacity-60 transition-all custom-shadow"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] group-hover:scale-105 transition-transform duration-500"></span>
                  <div class="relative flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] rounded-[14px] text-white font-bold text-lg transition-colors group-hover:bg-transparent">
                    <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Suivant
                  </div>
                </button>
              </form>
            </div>
          </Transition>

          <!-- Step 3: OTP Code -->
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-8"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-300 ease-in absolute w-full inset-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-8"
          >
            <div v-if="step === 'otp'" class="w-full">
              <button @click="step = isNewUser ? 'name' : 'email'" class="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8 transition-colors group">
                <div class="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Retour
              </button>

              <div class="flex flex-col items-center text-center">
                <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-[var(--color-primary)]/5 flex items-center justify-center border border-[var(--color-primary)]/10">
                  <ShieldCheck class="w-10 h-10 text-[var(--color-primary)]" />
                </div>

                <h1 class="text-3xl font-extrabold text-[var(--color-text)] mb-3 tracking-tight">Code de sécurité</h1>
                <p class="text-[var(--color-text-muted)] font-light text-lg mb-8 max-w-sm">
                  Un code à 6 chiffres a été envoyé à l'instant à<br>
                  <strong class="text-[var(--color-primary)] font-semibold mt-1 inline-block">{{ email }}</strong>
                </p>
              </div>

              <form @submit.prevent="handleVerifyOtp" class="space-y-8">
                <!-- Premium OTP Input boxes -->
                <div class="flex justify-center gap-2 sm:gap-4">
                  <input
                    v-for="(_, i) in 6"
                    :key="i"
                    :ref="el => otpRefs[i] = el as HTMLInputElement"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    class="w-12 h-16 sm:w-14 sm:h-16 text-center text-3xl font-extrabold rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(245,158,11,0.15)] outline-none transition-all text-[var(--color-primary)]"
                    @input="onOtpInput(i, $event)"
                    @keydown="onOtpKeydown(i, $event)"
                    @paste="onOtpPaste($event)"
                  />
                </div>

                <!-- Error -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                >
                  <div v-if="authStore.error" class="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-start gap-3 justify-center text-center">
                    <AlertCircle class="w-5 h-5 mt-0.5 shrink-0" />
                    <span class="leading-relaxed">{{ authStore.error }}</span>
                  </div>
                </Transition>

                <button
                  type="submit"
                  :disabled="otpCode.length < 6 || authStore.isLoading"
                  class="w-full relative group overflow-hidden rounded-2xl p-[2px] disabled:opacity-60 transition-all custom-shadow"
                >
                  <span class="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] via-yellow-400 to-[var(--color-accent)] group-hover:scale-105 transition-transform duration-500"></span>
                  <div class="relative flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-accent-light)] rounded-[14px] text-[var(--color-primary)] font-bold text-lg transition-colors border border-yellow-300/30">
                    <Loader2 v-if="authStore.isLoading" class="w-6 h-6 animate-spin" />
                    <LogIn v-else class="w-6 h-6" />
                    {{ authStore.isLoading ? 'Vérification...' : 'Accéder à mon espace' }}
                  </div>
                </button>

                <!-- Resend -->
                <div class="text-center">
                  <button
                    v-if="resendCooldown <= 0"
                    @click="handleSendOtp"
                    type="button"
                    class="text-sm text-[var(--color-primary)] hover:text-opacity-80 font-bold transition-opacity underline underline-offset-4"
                  >
                    Renvoyer le code
                  </button>
                  <p v-else class="text-sm font-medium text-[var(--color-text-muted)] bg-gray-50 inline-block px-4 py-2 rounded-full">
                    Renvoyer un code dans <span class="text-[var(--color-primary)] font-bold">{{ resendCooldown }}s</span>
                  </p>
                </div>
              </form>
            </div>
          </Transition>

        </div>

        <!-- Footer terms -->
        <div class="text-center mt-12 pt-8">
          <p class="text-[0.7rem] sm:text-xs text-[var(--color-text-muted)] font-light leading-relaxed max-w-sm mx-auto">
            En continuant, vous acceptez nos
            <NuxtLink to="/conditions" class="text-[var(--color-primary)] font-medium hover:underline">Conditions d'utilisation</NuxtLink> et notre
            <NuxtLink to="/confidentialite" class="text-[var(--color-primary)] font-medium hover:underline">Politique de confidentialité</NuxtLink>.
          </p>
        </div>

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
  description: 'Connectez-vous à votre espace TchadBox sécurisé et sans mot de passe.',
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

<style scoped>
.custom-shadow {
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.2);
}
.custom-shadow:hover {
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
}
/* Focus rings for iOS */
input, button {
  -webkit-tap-highlight-color: transparent;
}
</style>
