<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
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

      <!-- Card -->
      <div class="card-glass rounded-2xl shadow-xl p-8">
        <!-- Success State -->
        <div v-if="emailSent" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Email envoyé !</h1>
          <p class="text-[var(--color-text-muted)] mb-6">
            Si un compte existe avec l'adresse <strong>{{ form.email }}</strong>, vous recevrez un lien de réinitialisation.
          </p>
          <p class="text-sm text-[var(--color-text-muted)] mb-8">
            N'oubliez pas de vérifier vos spams si vous ne voyez pas l'email.
          </p>
          
          <div class="space-y-3">
            <button
              @click="resetForm"
              class="w-full py-3 btn-outline"
            >
              Essayer une autre adresse
            </button>
            <NuxtLink
              to="/auth/login"
              class="block w-full py-3 btn-gold !rounded-xl text-center"
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
            <h1 class="text-2xl font-bold text-[var(--color-text)] mb-2">Mot de passe oublié ?</h1>
            <p class="text-[var(--color-text-muted)]">Entrez votre email et nous vous enverrons un lien de réinitialisation.</p>
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
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="isLoading || !form.email"
              class="w-full py-3.5 btn-gold !rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-dark)] transition-colors"
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

const currentBg = ref('/auth-bg.png')

onMounted(() => {
  // Add a slight delay to trigger the slow zoom animation
  setTimeout(() => {
    const bgElement = document.querySelector('.bg-cover') as HTMLElement
    if (bgElement) bgElement.style.transform = 'scale(1.15)'
  }, 100)
})

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
