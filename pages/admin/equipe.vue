<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h1 class="text-2xl font-bold text-gray-900">Équipe</h1>
          <UBadge color="amber" variant="soft">👑 CEO Only</UBadge>
        </div>
        <p class="text-gray-500">Gérez les administrateurs de TchadBox</p>
      </div>
      <UButton @click="showAddModal = true" color="primary" icon="i-lucide-user-plus">
        Ajouter un admin
      </UButton>
    </div>

    <!-- Team Members -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500 mx-auto" />
      </div>

      <div v-else class="divide-y divide-gray-100">
        <!-- Super Admin (You) -->
        <div class="p-4 bg-amber-50/50">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <span class="text-lg font-semibold text-amber-700">{{ authStore.initials }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <p class="font-medium text-gray-900">{{ authStore.fullName }}</p>
                <UBadge color="amber" variant="soft" size="xs">👑 CEO</UBadge>
              </div>
              <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
            </div>
            <p class="text-sm text-gray-400">C'est vous</p>
          </div>
        </div>

        <!-- Admins -->
        <div v-for="admin in admins" :key="admin.id" class="p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span class="text-lg font-semibold text-indigo-700">{{ getInitials(admin) }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <p class="font-medium text-gray-900">{{ admin.first_name }} {{ admin.last_name }}</p>
                <UBadge color="indigo" variant="soft" size="xs">🛡️ Admin</UBadge>
              </div>
              <p class="text-sm text-gray-500">{{ admin.email }}</p>
            </div>
            <div class="text-right text-sm text-gray-500">
              Ajouté le {{ formatDate(admin.created_at) }}
            </div>
            <UDropdown :items="getAdminActions(admin)" :popper="{ placement: 'bottom-end' }">
              <UButton color="gray" variant="ghost" icon="i-lucide-more-vertical" size="sm" />
            </UDropdown>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="admins.length === 0" class="p-8 text-center">
          <Icon name="lucide:users" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p class="text-gray-500">Aucun autre administrateur</p>
          <p class="text-sm text-gray-400 mt-1">Ajoutez des admins pour vous aider à gérer les commandes</p>
        </div>
      </div>
    </div>

    <!-- Livreurs Section -->
    <div class="mt-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Livreurs</h2>
        <NuxtLink to="/admin/livreurs" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Gérer les livreurs →
        </NuxtLink>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ livreursCount }}</p>
            <p class="text-sm text-gray-500">Livreurs actifs</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Icon name="lucide:truck" class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Admin Modal -->
    <UModal v-model="showAddModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Ajouter un administrateur</h3>
        
        <p class="text-sm text-gray-500 mb-4">
          Sélectionnez un utilisateur existant pour le promouvoir administrateur.
        </p>
        
        <USelectMenu
          v-model="selectedUser"
          :options="availableUsers"
          option-attribute="label"
          value-attribute="value"
          placeholder="Sélectionner un utilisateur"
          searchable
          class="mb-4"
        />

        <div class="flex justify-end gap-3">
          <UButton color="gray" variant="outline" @click="showAddModal = false">Annuler</UButton>
          <UButton color="primary" :loading="saving" @click="promoteToAdmin">Promouvoir</UButton>
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
const toast = useToast()

// Redirect if not super_admin
if (!authStore.isSuperAdmin) {
  navigateTo('/admin')
}

// State
const loading = ref(true)
const saving = ref(false)
const admins = ref<any[]>([])
const livreursCount = ref(0)

// Add modal
const showAddModal = ref(false)
const selectedUser = ref<string | null>(null)
const availableUsers = ref<{ label: string; value: string }[]>([])

// Fetch team & available users (Combined in Laravel API now)
const fetchTeam = async () => {
  loading.value = true
  try {
    const data = await useBackendApi().adminTeam()
    
    admins.value = data.admins || []
    livreursCount.value = data.livreurs_count || 0
    availableUsers.value = data.available_users || []
  } catch (error) {
    console.error('Error fetching team:', error)
  } finally {
    loading.value = false
  }
}

// (Optional alias, as they are now fetched together)
const fetchAvailableUsers = () => {}

// Promote to admin
const promoteToAdmin = async () => {
  if (!selectedUser.value) return

  saving.value = true
  try {
    await useBackendApi().adminPromoteTeam(selectedUser.value, 'admin')

    toast.add({ title: 'Succès', description: 'Utilisateur promu administrateur', color: 'green' })
    showAddModal.value = false
    selectedUser.value = null
    fetchTeam()
  } catch (error) {
    console.error('Error promoting user:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de promouvoir cet utilisateur', color: 'red' })
  } finally {
    saving.value = false
  }
}

// Demote admin
const demoteAdmin = async (admin: any) => {
  if (!confirm(`Retirer les droits admin de ${admin.first_name} ${admin.last_name} ?`)) return

  try {
    await useBackendApi().adminPromoteTeam(admin.id, 'client')

    toast.add({ title: 'Succès', description: 'Droits admin retirés', color: 'green' })
    fetchTeam()
  } catch (error) {
    console.error('Error demoting admin:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de retirer les droits', color: 'red' })
  }
}

// Actions dropdown
const getAdminActions = (admin: any) => [
  [{
    label: 'Retirer les droits admin',
    icon: 'i-lucide-user-minus',
    click: () => demoteAdmin(admin)
  }]
]

// Helpers
const getInitials = (user: any) => {
  return ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Fetch on mount
onMounted(() => {
  fetchTeam()
  fetchAvailableUsers()
})

useHead({
  title: 'Équipe - Admin TchadBox'
})
</script>
