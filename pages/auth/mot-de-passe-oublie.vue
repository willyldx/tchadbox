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

      <!-- Card -->
      <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-stone-200/50 border border-white/50 p-8">
        <!-- Success State -->
        <div v-if="emailSent" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-stone-800 mb-2">Email envoyé !</h1>
          <p class="text-stone-500 mb-6">
            Si un compte existe avec l'adresse <strong>{{ form.email }}</strong>, vous recevrez un lien de réinitialisation.
          </p>
          <p class="text-sm text-stone-400 mb-8">
            N'oubliez pas de vérifier vos spams si vous ne voyez pas l'email.
          </p>
          
          <div class="space-y-3">
            <button
              @click="resetForm"
              class="w-full py-3 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
            >
              Essayer une autre adresse
            </button>
            <NuxtLink
              to="/auth/login"
              class="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all text-center"
            >
              Retour à la connexion
            </NuxtLink>
          </div>
        </div>

        <!-- Form State -->
        <div v-else>
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-stone-800 mb-2">Mot de passe oublié ?</h1>
            <p class="text-stone-500">Entrez votre email et nous vous enverrons un lien de réinitialisation.</p>
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
            <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <svg class="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>
          </Transition>

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
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading || !form.email"
              class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/25 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isLoading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Envoi...' : 'Envoyer le lien' }}</span>
            </button>
          </form>

          <!-- Back to login -->
          <div class="mt-8 text-center">
            <NuxtLink 
              to="/auth/login" 
              class="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la connexion
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'Mot de passe oublié - TchadBox',
  description: 'Réinitialisez votre mot de passe TchadBox.',
})

const authStore = useAuthStore()

const form = reactive({
  email: '',
})

const isLoading = ref(false)
const emailSent = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!form.email) return
  
  isLoading.value = true
  error.value = ''
  
  const result = await authStore.requestPasswordReset(form.email)
  
  isLoading.value = false
  
  if (result.success) {
    emailSent.value = true
  } else {
    error.value = result.error || 'Une erreur est survenue'
  }
}

function resetForm() {
  form.email = ''
  emailSent.value = false
  error.value = ''
}
</script>
