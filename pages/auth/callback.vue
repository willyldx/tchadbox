<template>
  <div class="min-h-screen flex items-center justify-center bg-[var(--color-bg)] p-4">
    <div class="text-center">
      <Loader2 class="w-8 h-8 animate-spin text-amber-500 mx-auto mb-4" />
      <p class="text-[var(--color-text-muted)]">Redirection en cours...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

definePageMeta({ layout: false })

// This page is no longer needed (was for Clerk OAuth callbacks).
// Redirect to login page.
onMounted(() => {
  navigateTo('/auth/login')
})
</script>
