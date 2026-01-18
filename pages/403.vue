<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <div class="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <Icon name="lucide:shield-x" class="w-12 h-12 text-red-600" />
      </div>
      
      <h1 class="text-4xl font-bold text-gray-900 mb-2">403</h1>
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Accès refusé</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton 
          to="/" 
          color="primary"
          size="lg"
        >
          Retour à l'accueil
        </UButton>
        <UButton 
          @click="goBack" 
          color="gray"
          variant="outline"
          size="lg"
        >
          Page précédente
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()

const goBack = () => {
  router.back()
}

useHead({
  title: 'Accès refusé - TchadBox'
})
</script>
