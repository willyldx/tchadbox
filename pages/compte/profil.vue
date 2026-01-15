<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-stone-500 hover:text-amber-600">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <span class="text-stone-800 font-medium">Mon profil</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-amber-500/25">
              {{ authStore.initials }}
            </div>
            <h2 class="text-xl font-semibold text-stone-800 mt-4">{{ authStore.fullName }}</h2>
            <p class="text-stone-500">{{ authStore.user?.email }}</p>
            
            <div class="mt-6 pt-6 border-t border-stone-100">
              <p class="text-xs text-stone-400 mb-1">Membre depuis</p>
              <p class="text-sm text-stone-600">{{ memberSince }}</p>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div class="p-6 border-b border-stone-100">
              <h3 class="text-lg font-semibold text-stone-800">Informations personnelles</h3>
              <p class="text-sm text-stone-500">Modifiez vos informations de profil</p>
            </div>

            <form @submit.prevent="handleUpdateProfile" class="p-6 space-y-6">
              <!-- Success Message -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="showSuccess" class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                  <CheckCircleIcon class="w-5 h-5 text-green-500" />
                  <p class="text-sm text-green-700">Profil mis à jour avec succès !</p>
                </div>
              </Transition>

              <!-- Error Message -->
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div v-if="error" class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                  <AlertCircleIcon class="w-5 h-5 text-red-500" />
                  <p class="text-sm text-red-700">{{ error }}</p>
                </div>
              </Transition>

              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-stone-700 mb-2">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    :disabled="isLoading"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-stone-700 mb-2">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    :disabled="isLoading"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-stone-700 mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  :value="authStore.user?.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                />
                <p class="text-xs text-stone-400 mt-1">L'email ne peut pas être modifié</p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-stone-700 mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  :disabled="isLoading"
                />
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="isLoading || !hasChanges"
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/25 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <LoaderIcon v-if="isLoading" class="w-5 h-5 animate-spin" />
                  <SaveIcon v-else class="w-5 h-5" />
                  {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Password Change -->
          <div class="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div class="p-6 border-b border-stone-100">
              <h3 class="text-lg font-semibold text-stone-800">Mot de passe</h3>
              <p class="text-sm text-stone-500">Changez votre mot de passe de connexion</p>
            </div>

            <form @submit.prevent="handleChangePassword" class="p-6 space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-stone-700 mb-2">
                  Mot de passe actuel
                </label>
                <div class="relative">
                  <input
                    id="currentPassword"
                    v-model="passwordForm.current"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all pr-12"
                    :disabled="isChangingPassword"
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <EyeIcon v-if="!showCurrentPassword" class="w-5 h-5 text-stone-400 hover:text-stone-600" />
                    <EyeOffIcon v-else class="w-5 h-5 text-stone-400 hover:text-stone-600" />
                  </button>
                </div>
              </div>

              <div>
                <label for="newPassword" class="block text-sm font-medium text-stone-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div class="relative">
                  <input
                    id="newPassword"
                    v-model="passwordForm.new"
                    :type="showNewPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all pr-12"
                    :disabled="isChangingPassword"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <EyeIcon v-if="!showNewPassword" class="w-5 h-5 text-stone-400 hover:text-stone-600" />
                    <EyeOffIcon v-else class="w-5 h-5 text-stone-400 hover:text-stone-600" />
                  </button>
                </div>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-stone-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirm"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  :class="{ 'border-red-300': passwordForm.confirm && !passwordsMatch }"
                  :disabled="isChangingPassword"
                />
                <p v-if="passwordForm.confirm && !passwordsMatch" class="text-xs text-red-500 mt-1">
                  Les mots de passe ne correspondent pas
                </p>
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="isChangingPassword || !passwordsMatch || !passwordForm.current || !passwordForm.new"
                  class="px-6 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <LoaderIcon v-if="isChangingPassword" class="w-5 h-5 animate-spin" />
                  <KeyIcon v-else class="w-5 h-5" />
                  {{ isChangingPassword ? 'Modification...' : 'Changer le mot de passe' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Danger Zone -->
          <div class="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
            <div class="p-6 border-b border-red-100">
              <h3 class="text-lg font-semibold text-red-600">Zone de danger</h3>
              <p class="text-sm text-stone-500">Actions irréversibles sur votre compte</p>
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-stone-800">Supprimer mon compte</p>
                  <p class="text-sm text-stone-500">Cette action est irréversible</p>
                </div>
                <button
                  @click="showDeleteConfirm = true"
                  class="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-md w-full p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangleIcon class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-stone-800 text-center mb-2">Supprimer le compte ?</h3>
            <p class="text-stone-500 text-center mb-6">
              Cette action est irréversible. Toutes vos données seront supprimées définitivement.
            </p>
            <div class="flex gap-3">
              <button
                @click="showDeleteConfirm = false"
                class="flex-1 py-3 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
              >
                Annuler
              </button>
              <button
                @click="handleDeleteAccount"
                class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Save as SaveIcon,
  Loader as LoaderIcon,
  Key as KeyIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from 'lucide-vue-next'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Mon profil - TchadBox',
  description: 'Gérez vos informations personnelles TchadBox.',
})

const authStore = useAuthStore()

// Form state
const form = reactive({
  firstName: authStore.user?.firstName || '',
  lastName: authStore.user?.lastName || '',
  phone: authStore.user?.phone || '',
})

const passwordForm = reactive({
  current: '',
  new: '',
  confirm: '',
})

const isLoading = ref(false)
const isChangingPassword = ref(false)
const showSuccess = ref(false)
const error = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showDeleteConfirm = ref(false)

// Computed
const memberSince = computed(() => {
  // Mock date - would come from user data
  return new Date().toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })
})

const hasChanges = computed(() => {
  return (
    form.firstName !== (authStore.user?.firstName || '') ||
    form.lastName !== (authStore.user?.lastName || '') ||
    form.phone !== (authStore.user?.phone || '')
  )
})

const passwordsMatch = computed(() => {
  return passwordForm.new === passwordForm.confirm
})

// Watch for auth changes
watch(() => authStore.user, (user) => {
  if (user) {
    form.firstName = user.firstName || ''
    form.lastName = user.lastName || ''
    form.phone = user.phone || ''
  }
}, { immediate: true })

// Methods
async function handleUpdateProfile() {
  if (!hasChanges.value) return
  
  isLoading.value = true
  error.value = ''
  showSuccess.value = false
  
  const result = await authStore.updateProfile({
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  })
  
  isLoading.value = false
  
  if (result.success) {
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } else {
    error.value = result.error || 'Une erreur est survenue'
  }
}

async function handleChangePassword() {
  if (!passwordsMatch.value) return
  
  isChangingPassword.value = true
  
  const { client } = useSupabase()
  
  try {
    const { error: updateError } = await client.auth.updateUser({
      password: passwordForm.new,
    })
    
    if (updateError) {
      error.value = updateError.message
    } else {
      passwordForm.current = ''
      passwordForm.new = ''
      passwordForm.confirm = ''
      showSuccess.value = true
      setTimeout(() => {
        showSuccess.value = false
      }, 3000)
    }
  } catch (e: any) {
    error.value = e.message
  } finally {
    isChangingPassword.value = false
  }
}

async function handleDeleteAccount() {
  // In production, this would call an API to delete the account
  showDeleteConfirm.value = false
  await authStore.logout()
}
</script>
