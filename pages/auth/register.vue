<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 py-12 overflow-hidden">
    <!-- Dynamic Background Image -->
    <Transition name="fade">
      <div 
        v-if="currentBg" 
        class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[40000ms] ease-out scale-105"
        :style="{ backgroundImage: `url(${currentBg})` }"
      ></div>
    </Transition>
    <!-- Background Overlay for readability -->
    <div class="absolute inset-0 z-0 bg-black/60 backdrop-blur-[4px]"></div>

    <!-- Background decoration -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
      <div class="orb orb-amber w-80 h-80 -top-40 -right-40"></div>
      <div class="orb orb-warm w-80 h-80 -bottom-40 -left-40"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <!-- Logo -->
      <NuxtLink to="/" class="flex flex-col items-center justify-center gap-4 mb-10 group">
        <div class="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white rounded-2xl shadow-xl shadow-amber-500/10 group-hover:shadow-amber-500/20 transition-all duration-300 transform group-hover:-translate-y-1">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100/50"></div>
          <img src="/logo.png" alt="TchadBox Logo" class="w-20 h-20 sm:w-24 sm:h-24 object-contain relative z-10 p-2" />
        </div>
        <div class="text-center">
          <span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400 tracking-tight">TchadBox</span>
          <div class="h-1 w-12 bg-amber-400 rounded-full mx-auto mt-2 opacity-50 group-hover:w-16 transition-all duration-300"></div>
        </div>
      </NuxtLink>

      <!-- Register Card -->
      <div class="card-glass rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Créer un compte</h1>
          <p class="text-[var(--color-text-muted)]">Rejoignez TchadBox et envoyez vos colis</p>
        </div>

        <!-- Success Message -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div v-if="showSuccess" class="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-green-800">Compte créé avec succès !</p>
                <p class="text-sm text-green-600 mt-1">Vérifiez votre email pour confirmer votre compte.</p>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Error Alert -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="authStore.error" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-600">{{ authStore.error }}</p>
          </div>
        </Transition>

        <!-- Register Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Prénom
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                autocomplete="given-name"
                placeholder="Jean"
                class="input"
                :disabled="authStore.isLoading"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Nom
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                autocomplete="family-name"
                placeholder="Dupont"
                class="input"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Adresse email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                placeholder="votre@email.com"
                class="input"
                style="padding-left: 3rem;"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Téléphone <span class="text-[var(--color-text-muted)] font-normal">(optionnel)</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                placeholder="+235 XX XX XX XX"
                class="input"
                style="padding-left: 3rem;"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Pays de résidence -->
          <div>
            <label for="country" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Pays de résidence
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                id="country"
                v-model="form.country"
                required
                class="input appearance-none cursor-pointer"
                style="padding-left: 3rem; padding-right: 2.5rem;"
                :disabled="authStore.isLoading"
              >
                <option value="" disabled>Sélectionnez votre pays</option>
                <option value="TD">🇹🇩 Tchad</option>
                <option value="FR">🇫🇷 France</option>
                <option value="US">🇺🇸 États-Unis</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="BE">🇧🇪 Belgique</option>
                <option value="DE">🇩🇪 Allemagne</option>
                <option value="GB">🇬🇧 Royaume-Uni</option>
                <option value="CH">🇨🇭 Suisse</option>
                <option value="CM">🇨🇲 Cameroun</option>
                <option value="SN">🇸🇳 Sénégal</option>
                <option value="CI">🇨🇮 Côte d'Ivoire</option>
                <option value="CG">🇨🇬 Congo</option>
                <option value="GA">🇬🇦 Gabon</option>
                <option value="IT">🇮🇹 Italie</option>
                <option value="ES">🇪🇸 Espagne</option>
                <option value="NL">🇳🇱 Pays-Bas</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="new-password"
                placeholder="••••••••"
                minlength="6"
                class="input"
                style="padding-left: 3rem; padding-right: 3rem;"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg v-if="!showPassword" class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <!-- Password strength indicator -->
            <div class="mt-2">
              <div class="flex gap-1">
                <div 
                  v-for="i in 4" 
                  :key="i" 
                  class="h-1 flex-1 rounded-full transition-colors"
                  :class="i <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'"
                ></div>
              </div>
              <p v-if="form.password" class="text-xs mt-1" :class="strengthTextColors[passwordStrength - 1] || 'text-[var(--color-text-muted)]'">
                {{ strengthLabels[passwordStrength] || 'Entrez un mot de passe' }}
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Confirmer le mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                autocomplete="new-password"
                placeholder="••••••••"
                class="input"
                style="padding-left: 3rem;"
                :class="{ 'border-red-300 focus:border-red-500': form.confirmPassword && !passwordsMatch }"
                :disabled="authStore.isLoading"
              />
            </div>
            <p v-if="form.confirmPassword && !passwordsMatch" class="text-xs text-red-500 mt-1">
              Les mots de passe ne correspondent pas
            </p>
          </div>

          <!-- Terms -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.acceptTerms"
              type="checkbox"
              required
              class="w-4 h-4 mt-0.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20 cursor-pointer"
            />
            <label for="terms" class="ml-2 text-sm text-[var(--color-text-secondary)] cursor-pointer">
              J'accepte les 
              <NuxtLink to="/conditions" class="text-amber-600 hover:underline">conditions d'utilisation</NuxtLink>
              et la 
              <NuxtLink to="/confidentialite" class="text-amber-600 hover:underline">politique de confidentialité</NuxtLink>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading || !isFormValid"
            class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="authStore.isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ authStore.isLoading ? 'Création...' : 'Créer mon compte' }}</span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center text-[var(--color-text-secondary)] mt-8">
          Déjà un compte ?
          <NuxtLink to="/auth/login" class="text-[var(--color-accent-dark)] hover:text-[var(--color-accent)] font-semibold transition-colors">
            Se connecter
          </NuxtLink>
        </p>
      </div>

      <!-- Trust badges -->
      <div class="flex items-center justify-center gap-6 mt-8">
        <div class="flex items-center gap-2 text-xs text-white/80 font-medium">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>SSL sécurisé</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-white/80 font-medium">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Données protégées</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.card-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Créer un compte - TchadBox',
  description: 'Créez votre compte TchadBox et commencez à envoyer des colis de la France vers le Tchad.',
})

const authStore = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const showPassword = ref(false)
const showSuccess = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 6) strength++
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const strengthLabels = ['', 'Faible', 'Moyen', 'Bon', 'Excellent']
const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400']
const strengthTextColors = ['text-red-500', 'text-orange-500', 'text-yellow-600', 'text-green-500']

const passwordsMatch = computed(() => {
  return form.password === form.confirmPassword
})

const isFormValid = computed(() => {
  return (
    form.firstName &&
    form.lastName &&
    form.email &&
    form.country &&
    form.password.length >= 6 &&
    passwordsMatch.value &&
    form.acceptTerms
  )
})

const currentBg = ref('/auth-bg.png')

// Automatically redirect if Clerk loads and finds an active session
watch(() => authStore.isAuthenticated, (isAuth) => {
   if (isAuth) {
      navigateTo(authStore.getRedirectPath())
   }
}, { immediate: true })

// Clear errors when component mounts
onMounted(() => {
  authStore.clearError()
  // Add a slight delay to trigger the slow zoom animation
  setTimeout(() => {
    const bgElement = document.querySelector('.bg-cover') as HTMLElement
    if (bgElement) bgElement.style.transform = 'scale(1.15)'
  }, 100)
})

async function handleSubmit() {
  if (!isFormValid.value) return
  
  const result = await authStore.register({
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone || undefined,
    country: form.country || undefined,
  })
  
  // Store country in Clerk unsafeMetadata
  if (result.success && form.country) {
    try {
      if (window.Clerk?.user) {
        await window.Clerk.user.update({
          unsafeMetadata: {
            ...window.Clerk.user.unsafeMetadata,
            country: form.country,
          },
        })
      }
    } catch { /* non-blocking */ }

    // Auto-switch currency based on selected country
    const { setCurrencyFromCountry } = useCurrency()
    setCurrencyFromCountry(form.country)
  }

  if (result.success) {
    if (result.requiresConfirmation) {
      showSuccess.value = true
    } else {
      navigateTo('/compte')
    }
  }
}
</script>
