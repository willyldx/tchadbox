<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <NuxtLink to="/compte" class="text-stone-500 hover:text-amber-600">Mon compte</NuxtLink>
        <ChevronRightIcon class="w-4 h-4 text-stone-400" />
        <span class="text-stone-800 font-medium">Mes adresses</span>
      </nav>

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-stone-800">Mes adresses</h1>
          <p class="text-stone-500 mt-1">Gérez vos adresses de livraison</p>
        </div>
        <button
          @click="openAddModal"
          class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
        >
          <PlusIcon class="w-5 h-5" />
          Ajouter
        </button>
      </div>

      <!-- Addresses Grid -->
      <div v-if="isLoading" class="grid md:grid-cols-2 gap-4">
        <div v-for="i in 2" :key="i" class="bg-white rounded-2xl border border-stone-100 p-6 animate-pulse">
          <div class="h-4 bg-stone-200 rounded w-32 mb-3"></div>
          <div class="h-3 bg-stone-200 rounded w-48 mb-2"></div>
          <div class="h-3 bg-stone-200 rounded w-40"></div>
        </div>
      </div>

      <div v-else-if="addresses.length === 0" class="bg-white rounded-2xl border border-stone-100 p-12 text-center">
        <div class="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPinIcon class="w-10 h-10 text-stone-400" />
        </div>
        <h3 class="text-lg font-semibold text-stone-800 mb-2">Aucune adresse enregistrée</h3>
        <p class="text-stone-500 mb-6">Ajoutez une adresse pour faciliter vos commandes</p>
        <button
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/25"
        >
          <PlusIcon class="w-5 h-5" />
          Ajouter une adresse
        </button>
      </div>

      <div v-else class="grid md:grid-cols-2 gap-4">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="bg-white rounded-2xl border border-stone-100 p-6 relative group hover:border-stone-200 hover:shadow-lg transition-all"
        >
          <!-- Default Badge -->
          <span
            v-if="address.isDefault"
            class="absolute top-4 right-4 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium"
          >
            Par défaut
          </span>

          <!-- Address Content -->
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <MapPinIcon class="w-6 h-6 text-amber-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-stone-800">
                {{ address.firstName }} {{ address.lastName }}
              </p>
              <p class="text-stone-600 mt-1">
                {{ address.address1 }}
                <span v-if="address.address2"><br />{{ address.address2 }}</span>
              </p>
              <p class="text-stone-600">
                {{ address.city }}, {{ address.country }}
              </p>
              <p v-if="address.phone" class="text-stone-500 mt-2 flex items-center gap-2">
                <PhoneIcon class="w-4 h-4" />
                {{ address.phone }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-4 pt-4 border-t border-stone-100">
            <button
              @click="editAddress(address)"
              class="flex items-center gap-1 px-3 py-1.5 text-sm text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <EditIcon class="w-4 h-4" />
              Modifier
            </button>
            <button
              v-if="!address.isDefault"
              @click="setAsDefault(address.id)"
              class="flex items-center gap-1 px-3 py-1.5 text-sm text-stone-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <StarIcon class="w-4 h-4" />
              Par défaut
            </button>
            <button
              @click="confirmDelete(address)"
              class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
            >
              <TrashIcon class="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- Info Note -->
      <div class="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
        <InfoIcon class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p class="text-sm text-blue-800 font-medium">Livraison au Tchad</p>
          <p class="text-sm text-blue-600 mt-1">
            Toutes les livraisons sont effectuées à N'Djamena. Pour les autres villes, veuillez nous contacter.
          </p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div v-if="showModal" class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <!-- Modal Header -->
              <div class="flex items-center justify-between p-6 border-b border-stone-100">
                <h3 class="text-lg font-semibold text-stone-800">
                  {{ editingAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse' }}
                </h3>
                <button @click="closeModal" class="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <XIcon class="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <!-- Modal Form -->
              <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Prénom</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Nom</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Adresse</label>
                  <input
                    v-model="form.address1"
                    type="text"
                    required
                    placeholder="Rue, numéro, quartier..."
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">
                    Complément <span class="text-stone-400 font-normal">(optionnel)</span>
                  </label>
                  <input
                    v-model="form.address2"
                    type="text"
                    placeholder="Appartement, étage, repère..."
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Ville</label>
                    <select
                      v-model="form.city"
                      required
                      class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    >
                      <option value="N'Djamena">N'Djamena</option>
                      <option value="Moundou">Moundou</option>
                      <option value="Sarh">Sarh</option>
                      <option value="Abéché">Abéché</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-stone-700 mb-2">Pays</label>
                    <input
                      v-model="form.country"
                      type="text"
                      disabled
                      class="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-xl text-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-stone-700 mb-2">Téléphone</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    required
                    placeholder="+235 XX XX XX XX"
                    class="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                </div>

                <div class="flex items-center gap-2">
                  <input
                    id="isDefault"
                    v-model="form.isDefault"
                    type="checkbox"
                    class="w-4 h-4 text-amber-500 border-stone-300 rounded focus:ring-amber-500/20"
                  />
                  <label for="isDefault" class="text-sm text-stone-600">
                    Définir comme adresse par défaut
                  </label>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    @click="closeModal"
                    class="flex-1 py-3 border border-stone-200 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    :disabled="isSaving"
                    class="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <LoaderIcon v-if="isSaving" class="w-5 h-5 animate-spin" />
                    {{ isSaving ? 'Enregistrement...' : (editingAddress ? 'Enregistrer' : 'Ajouter') }}
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

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
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-md w-full p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-stone-800 text-center mb-2">Supprimer l'adresse ?</h3>
            <p class="text-stone-500 text-center mb-6">
              Cette action est irréversible.
            </p>
            <div class="flex gap-3">
              <button
                @click="showDeleteModal = false"
                class="flex-1 py-3 border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
              >
                Annuler
              </button>
              <button
                @click="handleDelete"
                :disabled="isDeleting"
                class="flex-1 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <LoaderIcon v-if="isDeleting" class="w-5 h-5 animate-spin" />
                {{ isDeleting ? 'Suppression...' : 'Supprimer' }}
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
  MapPin as MapPinIcon,
  Plus as PlusIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Star as StarIcon,
  Trash as TrashIcon,
  Info as InfoIcon,
  X as XIcon,
  Loader as LoaderIcon,
} from 'lucide-vue-next'
import type { Address } from '~/types'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Mes adresses - TchadBox',
  description: 'Gérez vos adresses de livraison TchadBox.',
})

const authStore = useAuthStore()

// State
const addresses = ref<Address[]>([])
const isLoading = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingAddress = ref<Address | null>(null)
const deletingAddress = ref<Address | null>(null)
const isSaving = ref(false)
const isDeleting = ref(false)

// Form
const form = reactive({
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: "N'Djamena",
  country: 'Tchad',
  phone: '',
  isDefault: false,
})

// Load addresses from auth store
watch(() => authStore.user?.addresses, (newAddresses) => {
  if (newAddresses) {
    addresses.value = newAddresses
    isLoading.value = false
  }
}, { immediate: true })

// Methods
function openAddModal() {
  editingAddress.value = null
  resetForm()
  showModal.value = true
}

function editAddress(address: Address) {
  editingAddress.value = address
  form.firstName = address.firstName
  form.lastName = address.lastName
  form.address1 = address.address1
  form.address2 = address.address2 || ''
  form.city = address.city
  form.country = address.country
  form.phone = address.phone || ''
  form.isDefault = address.isDefault || false
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingAddress.value = null
  resetForm()
}

function resetForm() {
  form.firstName = authStore.user?.firstName || ''
  form.lastName = authStore.user?.lastName || ''
  form.address1 = ''
  form.address2 = ''
  form.city = "N'Djamena"
  form.country = 'Tchad'
  form.phone = ''
  form.isDefault = addresses.value.length === 0
}

function confirmDelete(address: Address) {
  deletingAddress.value = address
  showDeleteModal.value = true
}

async function handleSubmit() {
  isSaving.value = true

  try {
    if (editingAddress.value) {
      // Update existing
      await authStore.updateAddress(editingAddress.value.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        address1: form.address1,
        address2: form.address2 || undefined,
        city: form.city,
        country: form.country,
        phone: form.phone,
        isDefault: form.isDefault,
      })
    } else {
      // Add new
      await authStore.addAddress({
        firstName: form.firstName,
        lastName: form.lastName,
        address1: form.address1,
        address2: form.address2 || undefined,
        city: form.city,
        country: form.country,
        phone: form.phone,
        isDefault: form.isDefault,
      })
    }

    closeModal()
  } catch (error) {
    console.error('Failed to save address:', error)
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!deletingAddress.value) return

  isDeleting.value = true

  try {
    await authStore.deleteAddress(deletingAddress.value.id)
    showDeleteModal.value = false
    deletingAddress.value = null
  } catch (error) {
    console.error('Failed to delete address:', error)
  } finally {
    isDeleting.value = false
  }
}

async function setAsDefault(addressId: string) {
  await authStore.updateAddress(addressId, { isDefault: true })
}
</script>
