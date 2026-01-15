<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 flex items-center justify-center p-4">
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

      <!-- Login Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-stone-200/50 border border-white/50 p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-stone-800 mb-2">Bon retour !</h1>
          <p class="text-stone-500">Connectez-vous à votre compte TchadBox</p>
        </div>

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

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
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

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-medium text-stone-700">
                Mot de passe
              </label>
              <NuxtLink 
                to="/auth/mot-de-passe-oublie" 
                class="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Oublié ?
              </NuxtLink>
            </div>
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
                autocomplete="current-password"
                placeholder="••••••••"
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
          </div>

          <!-- Remember me -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 text-amber-500 border-stone-300 rounded focus:ring-amber-500/20 cursor-pointer"
            />
            <label for="remember" class="ml-2 text-sm text-stone-600 cursor-pointer">
              Se souvenir de moi
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/25 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="authStore.isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ authStore.isLoading ? 'Connexion...' : 'Se connecter' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-stone-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-stone-500">ou continuer avec</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="handleGoogleLogin"
            class="flex items-center justify-center gap-2 py-3 px-4 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="text-sm font-medium text-stone-700">Google</span>
          </button>
          <button
            type="button"
            @click="handleAppleLogin"
            class="flex items-center justify-center gap-2 py-3 px-4 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span class="text-sm font-medium text-stone-700">Apple</span>
          </button>
        </div>

        <!-- Register Link -->
        <p class="text-center text-stone-600 mt-8">
          Pas encore de compte ?
          <NuxtLink to="/auth/register" class="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
            Créer un compte
          </NuxtLink>
        </p>
      </div>

      <!-- Security Note -->
      <p class="text-center text-xs text-stone-400 mt-6">
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Connexion sécurisée via SSL
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Connexion - TchadBox',
  description: 'Connectez-vous à votre compte TchadBox pour suivre vos commandes et gérer vos colis.',
})

const authStore = useAuthStore()
const route = useRoute()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

// Clear errors when component mounts
onMounted(() => {
  authStore.clearError()
})

async function handleSubmit() {
  const result = await authStore.login(form.email, form.password)
  
  if (result.success) {
    // Redirect to intended page or account
    const redirect = route.query.redirect as string || '/compte'
    navigateTo(redirect)
  }
}

async function handleGoogleLogin() {
  const { client } = useSupabase()
  
  await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}

async function handleAppleLogin() {
  const { client } = useSupabase()
  
  await client.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}
</script>
