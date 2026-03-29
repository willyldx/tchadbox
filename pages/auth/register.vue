<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--color-primary)]">
    <!-- Cinematic Full-screen Photo Background -->
    <div 
      class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
      style="background-image: url('/hero-bg.png');"
    ></div>
    
    <!-- Dark Luxury Overlay to ensure extremely legible texts on the glass card -->
    <div class="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/80 via-[var(--color-primary)]/60 to-[var(--color-primary)]/90 backdrop-blur-[2px]"></div>

    <!-- Centered Glassmorphism Card -->
    <div class="w-full max-w-md relative z-10 px-4 sm:px-0">
      
      <!-- Back to Home -->
      <NuxtLink to="/" class="mb-8 mx-auto flex w-fit items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/10">
        <ArrowLeft class="w-4 h-4" /> Retour à l'accueil
      </NuxtLink>

      <div class="bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden text-center">
        
        <!-- Logo -->
        <div class="pt-10 pb-2 flex justify-center">
          <img src="/logo.png" alt="TchadBox" class="h-10 sm:h-12 w-auto" />
        </div>

        <div class="px-8 sm:px-10 pb-12 pt-6">
          <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--color-primary)]/5 flex items-center justify-center border border-[var(--color-primary)]/10">
            <UserPlus class="w-8 h-8 text-[var(--color-primary)]" />
          </div>

          <h1 class="text-2xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">Créer un compte</h1>
          <p class="text-[var(--color-text-muted)] font-light text-sm mb-8 leading-relaxed max-w-[280px] mx-auto">
            Chez TchadBox, la simplicité est reine. Votre compte est créé <strong class="text-[var(--color-primary)] font-semibold">automatiquement</strong> lors de votre première connexion. Aucun formulaire complexe !
          </p>

          <NuxtLink to="/auth/login" class="w-full relative group overflow-hidden rounded-xl p-[2px] transition-all custom-shadow block">
            <span class="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] group-hover:scale-105 transition-transform duration-500"></span>
            <div class="relative flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] rounded-[10px] text-white font-bold text-lg transition-colors group-hover:bg-transparent">
              <Mail class="w-5 h-5" /> Se connecter
            </div>
          </NuxtLink>

          <p class="text-xs font-light text-[var(--color-text-muted)] mt-8 max-w-[250px] mx-auto">
            Nous utilisons la connexion magique sécurisée par code OTP.
          </p>
        </div>
      </div>
      
      <!-- Footer Text -->
      <div class="text-center mt-6">
        <p class="text-xs text-white/60 font-medium">
          En continuant, vous acceptez nos
          <NuxtLink to="/conditions" class="text-white hover:underline transition-colors">CGV</NuxtLink>.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { UserPlus, Mail, ArrowLeft } from 'lucide-vue-next'

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
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.3);
}
.custom-shadow:hover {
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.4);
}
</style>
