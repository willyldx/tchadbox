<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Stocks</h1>
        <p class="text-sm text-gray-500 mt-1 font-medium">Gérez votre inventaire et ajoutez de nouveaux produits au catalogue.</p>
      </div>
      <div class="flex items-center gap-3">
        <UButton @click="fetchProducts" color="gray" variant="ghost" icon="i-lucide-refresh-cw" :loading="loading" class="text-gray-500 hover:bg-gray-100" />
        <UButton @click="showCreateModal = true" color="black" icon="i-lucide-plus" class="shadow-sm font-semibold px-4">
          Nouveau produit
        </UButton>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white rounded-2xl border border-gray-200/60 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
             <Icon name="lucide:package" class="w-4 h-4 text-gray-500" />
          </div>
          <p class="text-sm font-semibold text-gray-500">Total produits</p>
        </div>
        <p class="text-3xl font-black text-gray-900 mt-3">{{ products.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-green-200/60 p-5 shadow-[0_2px_10px_rgba(34,197,94,0.04)] relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center gap-3 mb-2 relative z-10">
          <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
             <Icon name="lucide:check-circle" class="w-4 h-4 text-green-500" />
          </div>
          <p class="text-sm font-semibold text-gray-500">En stock</p>
        </div>
        <p class="text-3xl font-black text-gray-900 mt-3 relative z-10">{{ inStockCount }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-amber-200/60 p-5 shadow-[0_2px_10px_rgba(245,158,11,0.04)] relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center gap-3 mb-2 relative z-10">
          <div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
             <Icon name="lucide:alert-triangle" class="w-4 h-4 text-amber-500" />
          </div>
          <p class="text-sm font-semibold text-gray-500">Stock faible</p>
        </div>
        <p class="text-3xl font-black text-gray-900 mt-3 relative z-10">{{ lowStockCount }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-red-200/60 p-5 shadow-[0_2px_10px_rgba(239,68,68,0.04)] relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-red-50 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-center gap-3 mb-2 relative z-10">
           <div class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
             <Icon name="lucide:x-circle" class="w-4 h-4 text-red-500" />
          </div>
          <p class="text-sm font-semibold text-gray-500">Rupture</p>
        </div>
        <p class="text-3xl font-black text-gray-900 mt-3 relative z-10">{{ outOfStockCount }}</p>
      </div>
    </div>

    <!-- Toolbar / Filters -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
      <UInput
        v-model="search"
        placeholder="Rechercher par nom ou référence..."
        icon="i-lucide-search"
        class="w-full sm:w-80"
        size="lg"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
           <UButton v-show="search" color="gray" variant="link" icon="i-lucide-x" :padded="false" @click="search = ''" />
        </template>
      </UInput>
      <USelectMenu
        v-model="stockFilter"
        :options="stockFilterOptions"
        placeholder="Tous les statuts"
        class="w-full sm:w-48"
        size="lg"
      />
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl border border-gray-200/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
      <div v-if="loading" class="p-16 text-center">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-gray-400 mx-auto" />
      </div>

      <div v-else-if="filteredProducts.length === 0" class="p-16 text-center flex flex-col items-center">
        <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Icon name="lucide:package-open" class="w-8 h-8 text-gray-400" />
        </div>
        <p class="text-lg font-semibold text-gray-900">Aucun produit trouvé</p>
        <p class="text-sm text-gray-500 mt-1 max-w-sm">Ajustez vos filtres de recherche ou ajoutez un nouveau produit au catalogue.</p>
        <UButton @click="showCreateModal = true" color="black" icon="i-lucide-plus" class="mt-6">Nouveau produit</UButton>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50/50 text-gray-500 uppercase text-xs font-bold tracking-wider border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4">Produit</th>
              <th scope="col" class="px-6 py-4">Prix</th>
              <th scope="col" class="px-6 py-4">Inventaire</th>
              <th scope="col" class="px-6 py-4">État</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/80 transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-105">
                    <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover mix-blend-multiply" />
                    <Icon v-else name="lucide:image" class="w-5 h-5 text-gray-300" />
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-gray-900 truncate">{{ product.title }}</p>
                    <p class="text-xs text-gray-500 font-mono mt-0.5 truncate">{{ product.handle }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{{ formatPrice(product.price) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-bold text-base font-mono bg-gray-50 px-2 py-1 rounded" :class="getStockColor(product)">
                  {{ product.stock_quantity ?? '∞' }}
                </span>
                <span class="text-xs text-gray-400 ml-2">unités</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <UBadge :color="getStatusBadge(product).color" variant="subtle" class="font-semibold px-2.5 py-1">
                  {{ getStatusBadge(product).label }}
                </UBadge>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <UButton
                    size="sm"
                    color="gray"
                    variant="ghost"
                    icon="i-lucide-edit-3"
                    title="Modifier le stock"
                    @click="openEditModal(product)"
                  />
                  <UButton
                    size="sm"
                    color="red"
                    variant="ghost"
                    icon="i-lucide-trash-2"
                    title="Supprimer"
                    @click="deleteProduct(product)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Stock Modal -->
    <UModal v-model="showEditModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Modifier le stock</h3>
        <p class="text-sm text-gray-500 mb-6">{{ editingProduct?.title }}</p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Quantité en stock</label>
            <UInput v-model.number="editForm.stockQuantity" type="number" min="0" placeholder="0" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
            <USelectMenu
              v-model="editForm.inStock"
              :options="[
                { label: 'En stock', value: true },
                { label: 'Rupture de stock', value: false }
              ]"
              value-attribute="value"
              option-attribute="label"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" variant="outline" @click="showEditModal = false">Annuler</UButton>
          <UButton color="primary" :loading="saving" @click="saveStock">Enregistrer</UButton>
        </div>
      </div>
    </UModal>

    <!-- Create Product Modal -->
    <UModal v-model="showCreateModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-1">Ajouter un produit</h3>
        <p class="text-sm text-gray-500 mb-6">Remplissez les informations du nouveau produit</p>

        <div class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
            <UInput v-model="createForm.title" placeholder="Ex: Sac de riz 25kg" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Prix (€) *</label>
              <UInput v-model.number="createForm.price" type="number" min="0" step="0.01" placeholder="0.00" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stock initial *</label>
              <UInput v-model.number="createForm.stock_quantity" type="number" min="0" placeholder="0" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sous-titre (Optionnel)</label>
            <UInput v-model="createForm.subtitle" placeholder="Courte description d'accroche" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <UInput v-model="createForm.category" placeholder="Ex: Alimentaire" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Slug catégorie *</label>
              <UInput v-model="createForm.category_handle" placeholder="Ex: alimentaire" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image du produit *</label>
            <div class="flex flex-col gap-2">
              <UInput type="file" accept="image/*" :loading="uploadingImage" @change="onImageSelected" />
              <img v-if="createForm.thumbnail" :src="createForm.thumbnail" class="h-20 w-20 object-cover rounded-md border border-gray-200" alt="Aperçu" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description détaillée *</label>
            <UTextarea v-model="createForm.description" :rows="3" placeholder="Description complète du produit..." />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton color="gray" variant="outline" @click="showCreateModal = false">Annuler</UButton>
          <UButton color="primary" :loading="creating" :disabled="!createForm.title || !createForm.price || !createForm.category || !createForm.category_handle || !createForm.thumbnail || !createForm.description" @click="createProduct">Créer le produit</UButton>
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

const api = useBackendApi()
const toast = useToast()

// State
const loading = ref(true)
const saving = ref(false)
const creating = ref(false)
const uploadingImage = ref(false)
const products = ref<any[]>([])
const search = ref('')
const stockFilter = ref('')
const showEditModal = ref(false)
const showCreateModal = ref(false)
const editingProduct = ref<any>(null)
const editForm = reactive({
  stockQuantity: 0,
  inStock: true
})
const createForm = reactive({
  title: '',
  price: 0,
  subtitle: '',
  description: '',
  category: '',
  category_handle: '',
  thumbnail: '',
  stock_quantity: 0,
})

const stockFilterOptions = [
  { label: 'Tous les statuts', value: '' },
  { label: 'En stock', value: 'in_stock' },
  { label: 'Stock faible (< 10)', value: 'low_stock' },
  { label: 'Rupture', value: 'out_of_stock' },
]

// Computed
const inStockCount = computed(() => products.value.filter(p => p.in_stock && (p.stock_quantity ?? 1) > 0).length)
const lowStockCount = computed(() => products.value.filter(p => p.stock_quantity !== null && p.stock_quantity > 0 && p.stock_quantity < 10).length)
const outOfStockCount = computed(() => products.value.filter(p => !p.in_stock || p.stock_quantity === 0).length)

const filteredProducts = computed(() => {
  let result = [...products.value]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(p => p.title?.toLowerCase().includes(q) || p.handle?.toLowerCase().includes(q))
  }

  if (stockFilter.value === 'in_stock') {
    result = result.filter(p => p.in_stock && (p.stock_quantity ?? 1) > 0)
  } else if (stockFilter.value === 'low_stock') {
    result = result.filter(p => p.stock_quantity !== null && p.stock_quantity > 0 && p.stock_quantity < 10)
  } else if (stockFilter.value === 'out_of_stock') {
    result = result.filter(p => !p.in_stock || p.stock_quantity === 0)
  }

  return result
})

// Fetch products from backend API
const fetchProducts = async () => {
  loading.value = true
  try {
    const result = await api.adminStocks()
    products.value = result?.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les produits', color: 'red' })
  } finally {
    loading.value = false
  }
}

// Open edit modal
const openEditModal = (product: any) => {
  editingProduct.value = product
  editForm.stockQuantity = product.stock_quantity ?? 0
  editForm.inStock = product.in_stock ?? true
  showEditModal.value = true
}

// Save stock update via backend API
const saveStock = async () => {
  if (!editingProduct.value) return
  saving.value = true

  try {
    await api.adminStockUpdate(editingProduct.value.id, {
      stock_quantity: editForm.stockQuantity,
      in_stock: editForm.inStock,
    })

    toast.add({ title: 'Succès', description: 'Stock mis à jour', color: 'green' })
    showEditModal.value = false
    fetchProducts()
  } catch (error: any) {
    console.error('Error saving stock:', error)
    toast.add({ title: 'Erreur', description: error.message || 'Impossible de mettre à jour le stock', color: 'red' })
  } finally {
    saving.value = false
  }
}

// Create new product
const createProduct = async () => {
  creating.value = true
  try {
    await api.adminProductCreate({
      title: createForm.title,
      price: createForm.price,
      subtitle: createForm.subtitle || undefined,
      description: createForm.description || undefined,
      category: createForm.category || undefined,
      category_handle: createForm.category_handle || undefined,
      thumbnail: createForm.thumbnail || undefined,
      stock_quantity: createForm.stock_quantity,
      in_stock: true,
    })

    toast.add({ title: 'Succès', description: 'Produit créé avec succès', color: 'green' })
    showCreateModal.value = false
    // Reset form
    Object.assign(createForm, { title: '', price: 0, subtitle: '', description: '', category: '', category_handle: '', thumbnail: '', stock_quantity: 0 })
    fetchProducts()
  } catch (error: any) {
    console.error('Error creating product:', error)
    toast.add({ title: 'Erreur', description: error?.data?.message || error.message || 'Impossible de créer le produit', color: 'red' })
  } finally {
    creating.value = false
  }
}

// Upload Image
const onImageSelected = async (e: any) => {
  // Gère à la fois l'événement natif et l'émission directe de liste de fichiers par Nuxt UI
  const file = e?.target?.files?.[0] || (e instanceof FileList ? e[0] : null) || (Array.isArray(e) ? e[0] : e)
  
  if (!file || !(file instanceof File)) {
    console.error('Aucun fichier valide sélectionné', e);
    return;
  }
  
  uploadingImage.value = true
  try {
    const res = await api.adminUploadFile(file)
    createForm.thumbnail = res.url
    toast.add({ title: 'Aperçu généré', description: `L'image est prête !`, color: 'green' })
  } catch (error: any) {
    console.error('Upload failed:', error)
    toast.add({ title: 'Erreur', description: `Impossible de télécharger l'image.`, color: 'red' })
  } finally {
    uploadingImage.value = false
  }
}

// Delete product
const deleteProduct = async (product: any) => {
  if (!confirm(`Supprimer "${product.title}" ? Cette action est irréversible.`)) return

  try {
    await api.adminProductDelete(product.id)
    toast.add({ title: 'Supprimé', description: 'Produit supprimé', color: 'green' })
    fetchProducts()
  } catch (error: any) {
    toast.add({ title: 'Erreur', description: error.message || 'Impossible de supprimer', color: 'red' })
  }
}

// Helpers
const formatPrice = (amount: number) => {
  return useCartStore().formatPrice(amount || 0)
}

const getStockColor = (product: any) => {
  const qty = product.stock_quantity
  if (qty === null || qty === undefined) return 'text-gray-400'
  if (qty === 0) return 'text-red-600'
  if (qty < 10) return 'text-amber-600'
  return 'text-green-600'
}

const getStatusBadge = (product: any) => {
  const qty = product.stock_quantity
  if (!product.in_stock || qty === 0) return { label: 'Rupture', color: 'red' }
  if (qty !== null && qty < 10) return { label: 'Stock faible', color: 'amber' }
  return { label: 'En stock', color: 'green' }
}

// Fetch on mount
onMounted(() => {
  fetchProducts()
})

useHead({
  title: 'Stocks - Admin TchadBox'
})
</script>

