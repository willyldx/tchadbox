<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
    <div class="max-w-md w-full flex flex-col items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-3 mb-10 transition-transform hover:scale-105">
        <div class="w-12 h-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[var(--color-primary)]/20 transition-shadow">
          <Package class="w-6 h-6 text-white" />
        </div>
        <span class="text-2xl font-bold text-[var(--color-primary)] tracking-tight">TchadBox</span>
      </NuxtLink>

      <div class="bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.1)] p-8 sm:p-12 w-full text-center relative overflow-hidden">
        <!-- Decoration orb -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div class="relative z-10 flex flex-col items-center">
          <div class="w-20 h-20 mb-8 rounded-3xl bg-[var(--color-primary)]/5 flex items-center justify-center border border-[var(--color-primary)]/10">
            <UserPlus class="w-10 h-10 text-[var(--color-primary)]" />
          </div>

          <h1 class="text-3xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">Créer un compte</h1>
          <p class="text-[var(--color-text-muted)] font-light text-lg mb-8 leading-relaxed max-w-sm">
            Chez TchadBox, la simplicité est reine. Votre compte est créé **automatiquement** lors de votre première connexion. Aucun formulaire complexe !
          </p>

          <NuxtLink to="/auth/login" class="w-full relative group overflow-hidden rounded-2xl p-[2px] transition-all custom-shadow">
            <span class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] group-hover:scale-105 transition-transform duration-500"></span>
            <div class="relative flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] rounded-[14px] text-white font-bold text-lg transition-colors group-hover:bg-transparent">
              <Mail class="w-5 h-5" /> Se connecter
            </div>
          </NuxtLink>

          <p class="text-sm font-light text-[var(--color-text-muted)] mt-8 max-w-[250px] mx-auto">
            Nous utilisons la connexion magique sécurisée par code OTP.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, UserPlus, Mail } from 'lucide-vue-next'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Créer un compte - TchadBox',
  description: 'Créez votre compte TchadBox facilement grâce à notre système magique sans mot de passe.',
})

// Redirect if already logged in
onMounted(async () => {
  const authStore = useAuthStore()
  await authStore.checkSession()
  if (authStore.isAuthenticated) {
    navigateTo(authStore.getRedirectPath())
  }
})
</script>

<style scoped>
.custom-shadow {
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.2);
}
.custom-shadow:hover {
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
}
</style>
