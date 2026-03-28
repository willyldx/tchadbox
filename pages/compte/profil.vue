<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)]">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-[var(--color-text-muted)]" />
        <span class="text-[var(--color-text)] font-medium">Mon profil</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg shadow-amber-500/25">
              {{ authStore.initials }}
            </div>
            <h2 class="text-xl font-semibold text-[var(--color-text)] mt-4">{{ authStore.fullName }}</h2>
            <p class="text-[var(--color-text-muted)]">{{ authStore.user?.email }}</p>
            
            <div class="mt-6 pt-6 border-t border-[var(--color-border)]">
              <p class="text-xs text-[var(--color-text-muted)] mb-1">Membre depuis</p>
              <p class="text-sm text-[var(--color-text-secondary)]">{{ memberSince }}</p>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Info -->
          <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            <div class="p-6 border-b border-[var(--color-border)]">
              <h3 class="text-lg font-semibold text-[var(--color-text)]">Informations personnelles</h3>
              <p class="text-sm text-[var(--color-text-muted)]">Modifiez vos informations de profil</p>
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
                  <label for="firstName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input"
                    :disabled="isLoading"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input"
                    :disabled="isLoading"
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Adresse email
                </label>
                <input
                  id="email"
                  :value="authStore.user?.email"
                  type="email"
                  disabled
                  class="w-full px-4 py-3 bg-gray-100 border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)] cursor-not-allowed"
                />
                <p class="text-xs text-[var(--color-text-muted)] mt-1">L'email ne peut pas être modifié</p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+235 XX XX XX XX"
                  class="input"
                  :disabled="isLoading"
                />
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="isLoading || !hasChanges"
                  class="px-6 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <LoaderIcon v-if="isLoading" class="w-5 h-5 animate-spin" />
                  <SaveIcon v-else class="w-5 h-5" />
                  {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Password Change -->
          <div class="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
            <div class="p-6 border-b border-[var(--color-border)]">
              <h3 class="text-lg font-semibold text-[var(--color-text)]">Mot de passe</h3>
              <p class="text-sm text-[var(--color-text-muted)]">Changez votre mot de passe de connexion</p>
            </div>

            <form @submit.prevent="handleChangePassword" class="p-6 space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Mot de passe actuel
                </label>
                <div class="relative">
                  <input
                    id="currentPassword"
                    v-model="passwordForm.current"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    required
                    class="input pr-12"
                    :disabled="isChangingPassword"
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <EyeIcon v-if="!showCurrentPassword" class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" />
                    <EyeOffIcon v-else class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" />
                  </button>
                </div>
              </div>

              <div>
                <label for="newPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Nouveau mot de passe
                </label>
                <div class="relative">
                  <input
                    id="newPassword"
                    v-model="passwordForm.new"
                    :type="showNewPassword ? 'text' : 'password'"
                    required
                    minlength="6"
                    class="input pr-12"
                    :disabled="isChangingPassword"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <EyeIcon v-if="!showNewPassword" class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" />
                    <EyeOffIcon v-else class="w-5 h-5 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]" />
                  </button>
                </div>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  id="confirmPassword"
                  v-model="passwordForm.confirm"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  class="input"
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
                  class="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
              <p class="text-sm text-[var(--color-text-muted)]">Actions irréversibles sur votre compte</p>
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-[var(--color-text)]">Supprimer mon compte</p>
                  <p class="text-sm text-[var(--color-text-muted)]">Cette action est irréversible</p>
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
            <h3 class="text-xl font-bold text-[var(--color-text)] text-center mb-2">Supprimer le compte ?</h3>
            <p class="text-[var(--color-text-muted)] text-center mb-6">
              Cette action est irréversible. Toutes vos données seront supprimées définitivement.
            </p>
            <div class="flex gap-3">
              <button
                @click="showDeleteConfirm = false"
                class="flex-1 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium rounded-xl hover:bg-gray-50 transition-colors"
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
  const createdAt = authStore.user?.createdAt
  if (createdAt) {
    return new Date(createdAt).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    })
  }
  return 'Récemment'
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
  
  try {
    // TODO: Implement password change via Laravel API endpoint
    throw new Error('La modification de mot de passe sera disponible dans une prochaine mise à jour.')
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
