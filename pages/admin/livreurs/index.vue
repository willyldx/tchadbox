<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Livreurs</h1>
        <p class="text-gray-500 mt-1">Gérez votre équipe de livreurs</p>
      </div>
      <UButton v-if="authStore.isSuperAdmin" @click="showAddModal = true" color="primary" icon="i-lucide-plus">
        Ajouter un livreur
      </UButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Total livreurs</p>
        <p class="text-2xl font-bold text-gray-900">{{ livreurs.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Actifs</p>
        <p class="text-2xl font-bold text-green-600">{{ activeLivreurs }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Livraisons ce mois</p>
        <p class="text-2xl font-bold text-gray-900">{{ monthlyDeliveries }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Note moyenne</p>
        <p class="text-2xl font-bold text-amber-600">{{ averageRating }}/5</p>
      </div>
    </div>

    <!-- Livreurs List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500 mx-auto" />
      </div>
      
      <div v-else-if="livreurs.length === 0" class="p-8 text-center">
        <Icon name="lucide:truck" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p class="text-gray-500">Aucun livreur pour le moment</p>
        <UButton v-if="authStore.isSuperAdmin" @click="showAddModal = true" color="primary" class="mt-4">
          Ajouter le premier livreur
        </UButton>
      </div>

      <div v-else class="divide-y divide-gray-100">
        <div v-for="livreur in livreurs" :key="livreur.id" class="p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <!-- Avatar -->
            <div :class="['w-12 h-12 rounded-full flex items-center justify-center', livreur.is_active ? 'bg-green-100' : 'bg-gray-100']">
              <span :class="['text-lg font-semibold', livreur.is_active ? 'text-green-700' : 'text-gray-500']">
                {{ getInitials(livreur) }}
              </span>
            </div>

            <!-- Info -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <p class="font-medium text-gray-900">{{ livreur.first_name }} {{ livreur.last_name }}</p>
                <UBadge :color="livreur.is_active ? 'green' : 'gray'" variant="soft" size="xs">
                  {{ livreur.is_active ? 'Actif' : 'Inactif' }}
                </UBadge>
              </div>
              <p class="text-sm text-gray-500">{{ livreur.phone }} · {{ livreur.zone }}</p>
            </div>

            <!-- Stats -->
            <div class="text-right hidden sm:block">
              <p class="text-sm font-medium text-gray-900">{{ livreur.total_deliveries }} livraisons</p>
              <div class="flex items-center justify-end gap-1 text-amber-500">
                <Icon name="lucide:star" class="w-4 h-4 fill-current" />
                <span class="text-sm font-medium">{{ Number(livreur.rating).toFixed(1) }}</span>
              </div>
            </div>

            <!-- Actions -->
            <UDropdown v-if="authStore.isSuperAdmin" :items="getLivreurActions(livreur)" :popper="{ placement: 'bottom-end' }">
              <UButton color="gray" variant="ghost" icon="i-lucide-more-vertical" size="sm" />
            </UDropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Livreur Modal -->
    <UModal v-model="showAddModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Ajouter un livreur</h3>
        
        <div class="space-y-4">
          <p class="text-sm text-gray-500">
            Sélectionnez un utilisateur existant ou créez-en un nouveau pour l'ajouter comme livreur.
          </p>
          
          <USelectMenu
            v-model="selectedUser"
            :options="availableUsers"
            option-attribute="label"
            value-attribute="value"
            placeholder="Sélectionner un utilisateur"
            searchable
          />

          <UInput v-model="newLivreurPhone" placeholder="Téléphone" icon="i-lucide-phone" />
          
          <UInput v-model="newLivreurZone" placeholder="Zone de livraison" icon="i-lucide-map-pin" />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" variant="outline" @click="showAddModal = false">Annuler</UButton>
          <UButton color="primary" :loading="saving" @click="addLivreur">Ajouter</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const authStore = useAuthStore()
const { client } = useSupabase()
const toast = useToast()

// State
const loading = ref(true)
const saving = ref(false)
const livreurs = ref<any[]>([])

// Add modal
const showAddModal = ref(false)
const selectedUser = ref<string | null>(null)
const newLivreurPhone = ref('')
const newLivreurZone = ref("N'Djamena")
const availableUsers = ref<{ label: string; value: string }[]>([])

// Computed stats
const activeLivreurs = computed(() => livreurs.value.filter(l => l.is_active).length)
const monthlyDeliveries = computed(() => livreurs.value.reduce((sum, l) => sum + (l.total_deliveries || 0), 0))
const averageRating = computed(() => {
  if (livreurs.value.length === 0) return '0.0'
  const total = livreurs.value.reduce((sum, l) => sum + Number(l.rating || 5), 0)
  return (total / livreurs.value.length).toFixed(1)
})

// Fetch livreurs
const fetchLivreurs = async () => {
  loading.value = true
  try {
    const { data, error } = await client.rpc('get_all_delivery_agents')

    if (error) throw error

    livreurs.value = data || []
  } catch (error) {
    console.error('Error fetching livreurs:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les livreurs', color: 'red' })
  } finally {
    loading.value = false
  }
}

// Fetch available users (clients who can be promoted to livreur)
const fetchAvailableUsers = async () => {
  const { data, error } = await client.rpc('get_profiles_by_role', { target_role: 'client' })

  if (!error && data) {
    availableUsers.value = data.map((u: any) => ({
      label: `${u.first_name} ${u.last_name} (${u.email})`,
      value: u.id
    }))
  }
}

// Add livreur
const addLivreur = async () => {
  if (!selectedUser.value || !newLivreurPhone.value) {
    toast.add({ title: 'Erreur', description: 'Veuillez remplir tous les champs', color: 'red' })
    return
  }

  saving.value = true
  try {
    // Update user role to livreur via RPC
    const { error: roleError } = await client.rpc('update_user_role', {
      target_user_id: selectedUser.value,
      new_role: 'livreur'
    })

    if (roleError) throw roleError

    // Create delivery_agent entry
    const { error } = await client
      .from('delivery_agents')
      .insert({
        user_id: selectedUser.value,
        phone: newLivreurPhone.value,
        zone: newLivreurZone.value || "N'Djamena",
        is_active: true
      })

    if (error) throw error

    toast.add({ title: 'Succès', description: 'Livreur ajouté avec succès', color: 'green' })
    showAddModal.value = false
    selectedUser.value = null
    newLivreurPhone.value = ''
    newLivreurZone.value = "N'Djamena"
    fetchLivreurs()
    fetchAvailableUsers()
  } catch (error) {
    console.error('Error adding livreur:', error)
    toast.add({ title: 'Erreur', description: "Impossible d'ajouter le livreur", color: 'red' })
  } finally {
    saving.value = false
  }
}

// Toggle livreur status
const toggleStatus = async (livreur: any) => {
  try {
    const { error } = await client
      .from('delivery_agents')
      .update({ is_active: !livreur.is_active })
      .eq('id', livreur.id)

    if (error) throw error

    toast.add({ title: 'Succès', description: 'Statut mis à jour', color: 'green' })
    fetchLivreurs()
  } catch (error) {
    console.error('Error toggling status:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de modifier le statut', color: 'red' })
  }
}

// Remove livreur
const removeLivreur = async (livreur: any) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer ce livreur ?')) return

  try {
    // Delete delivery_agent entry
    await client.from('delivery_agents').delete().eq('id', livreur.id)
    
    // Revert user role to client via RPC
    await client.rpc('update_user_role', {
      target_user_id: livreur.user_id,
      new_role: 'client'
    })

    toast.add({ title: 'Succès', description: 'Livreur retiré', color: 'green' })
    fetchLivreurs()
    fetchAvailableUsers()
  } catch (error) {
    console.error('Error removing livreur:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de retirer le livreur', color: 'red' })
  }
}

// Get actions for dropdown
const getLivreurActions = (livreur: any) => [
  [{
    label: livreur.is_active ? 'Désactiver' : 'Activer',
    icon: livreur.is_active ? 'i-lucide-pause' : 'i-lucide-play',
    click: () => toggleStatus(livreur)
  }],
  [{
    label: 'Retirer',
    icon: 'i-lucide-trash-2',
    click: () => removeLivreur(livreur)
  }]
]

// Helpers
const getInitials = (livreur: any) => {
  return ((livreur.first_name?.[0] || '') + (livreur.last_name?.[0] || '')).toUpperCase() || '?'
}

// Fetch on mount
onMounted(() => {
  fetchLivreurs()
  if (authStore.isSuperAdmin) {
    fetchAvailableUsers()
  }
})

useHead({
  title: 'Livreurs - Admin TchadBox'
})
</script>
