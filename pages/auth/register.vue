<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4 py-12">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl"></div>
    </div>

    <div class="w-full max-w-md relative">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-3 mb-8 group">
        <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <span class="text-2xl font-bold text-stone-800">TchadBox</span>
      </NuxtLink>

      <!-- Register Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-stone-200/50 border border-white/50 p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-stone-800 mb-2">Créer un compte</h1>
          <p class="text-stone-500">Rejoignez TchadBox et envoyez vos colis</p>
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
              <label for="firstName" class="block text-sm font-medium text-stone-700 mb-2">
                Prénom
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                autocomplete="given-name"
                placeholder="Jean"
                class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
                :disabled="authStore.isLoading"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-stone-700 mb-2">
                Nom
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                autocomplete="family-name"
                placeholder="Dupont"
                class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-stone-700 mb-2">
              Adresse email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-stone-700 mb-2">
              Téléphone <span class="text-stone-400 font-normal">(optionnel)</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                placeholder="+33 6 12 34 56 78"
                class="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
                :disabled="authStore.isLoading"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-stone-700 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="w-full pl-12 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
                :disabled="authStore.isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <svg v-if="!showPassword" class="w-5 h-5 text-stone-400 hover:text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5 text-stone-400 hover:text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  :class="i <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-stone-200'"
                ></div>
              </div>
              <p v-if="form.password" class="text-xs mt-1" :class="strengthTextColors[passwordStrength - 1] || 'text-stone-400'">
                {{ strengthLabels[passwordStrength] || 'Entrez un mot de passe' }}
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-stone-700 mb-2">
              Confirmer le mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-stone-400"
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
              class="w-4 h-4 mt-0.5 text-amber-500 border-stone-300 rounded focus:ring-amber-500/20 cursor-pointer"
            />
            <label for="terms" class="ml-2 text-sm text-stone-600 cursor-pointer">
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
            class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/25 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="authStore.isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ authStore.isLoading ? 'Création...' : 'Créer mon compte' }}</span>
          </button>
        </form>

        <!-- Login Link -->
        <p class="text-center text-stone-600 mt-8">
          Déjà un compte ?
          <NuxtLink to="/auth/login" class="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
            Se connecter
          </NuxtLink>
        </p>
      </div>

      <!-- Trust badges -->
      <div class="flex items-center justify-center gap-6 mt-8">
        <div class="flex items-center gap-2 text-xs text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>SSL sécurisé</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-stone-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Données protégées</span>
        </div>
      </div>
    </div>
  </div>
</template>

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
    form.password.length >= 6 &&
    passwordsMatch.value &&
    form.acceptTerms
  )
})

// Clear errors when component mounts
onMounted(() => {
  authStore.clearError()
})

async function handleSubmit() {
  if (!isFormValid.value) return
  
  const result = await authStore.register({
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone || undefined,
  })
  
  if (result.success) {
    if (result.requiresConfirmation) {
      showSuccess.value = true
    } else {
      navigateTo('/compte')
    }
  }
}
</script>
