<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
    <div class="max-w-md w-full text-center">
      <!-- Logo -->
      <div class="mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-3 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package class="w-6 h-6 text-white" />
          </div>
          <span class="text-2xl font-bold text-[var(--color-text)]">TchadBox</span>
        </NuxtLink>
      </div>

      <div class="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl p-8">
        <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-green-50 flex items-center justify-center">
          <UserPlus class="w-8 h-8 text-green-600" />
        </div>

        <h1 class="text-2xl font-bold text-[var(--color-text)] mb-3">Créer un compte</h1>
        <p class="text-[var(--color-text-muted)] mb-8">
          Chez TchadBox, votre compte est créé automatiquement lors de votre première connexion. 
          Aucun mot de passe nécessaire — juste votre email.
        </p>

        <NuxtLink to="/auth/login" class="btn-gold w-full inline-block text-center">
          <span class="flex items-center justify-center gap-2">
            <Mail class="w-5 h-5" />Se connecter avec mon email
          </span>
        </NuxtLink>

        <p class="text-xs text-[var(--color-text-muted)] mt-6">
          Un code sécurisé vous sera envoyé par email pour vérifier votre identité.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Package, UserPlus, Mail } from 'lucide-vue-next'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Créer un compte - TchadBox',
  description: 'Créez votre compte TchadBox gratuitement pour envoyer des colis à vos proches au Tchad.',
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
