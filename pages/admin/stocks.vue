<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestion des stocks</h1>
        <p class="text-gray-500 mt-1">Suivez et mettez à jour les niveaux de stock</p>
      </div>
      <div class="flex gap-2">
        <UButton @click="fetchProducts" color="gray" variant="outline" icon="i-lucide-refresh-cw" :loading="loading">
          Actualiser
        </UButton>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Total produits</p>
        <p class="text-2xl font-bold text-gray-900">{{ products.length }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">En stock</p>
        <p class="text-2xl font-bold text-green-600">{{ inStockCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Stock faible</p>
        <p class="text-2xl font-bold text-amber-600">{{ lowStockCount }}</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">Rupture</p>
        <p class="text-2xl font-bold text-red-600">{{ outOfStockCount }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
      <UInput
        v-model="search"
        placeholder="Rechercher un produit..."
        icon="i-lucide-search"
        class="flex-grow"
      />
      <USelectMenu
        v-model="stockFilter"
        :options="stockFilterOptions"
        placeholder="Tous les statuts"
        class="w-48"
      />
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500 mx-auto" />
      </div>

      <div v-else-if="filteredProducts.length === 0" class="p-8 text-center">
        <Icon name="lucide:package" class="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <p class="text-gray-500">Aucun produit trouvé</p>
        <p class="text-sm text-gray-400 mt-1">Les produits apparaîtront ici quand vous les ajouterez via Medusa Admin</p>
      </div>

      <div v-else>
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 text-left">
              <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Produit</th>
              <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Prix</th>
              <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
              <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
              <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" />
                    <Icon v-else name="lucide:package" class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ product.title }}</p>
                    <p class="text-xs text-gray-400">{{ product.handle }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">{{ formatPrice(product.price) }}</td>
              <td class="px-6 py-4">
                <span class="font-semibold" :class="getStockColor(product)">
                  {{ product.stock_quantity ?? '—' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <UBadge :color="getStatusBadge(product).color" variant="soft" size="sm">
                  {{ getStatusBadge(product).label }}
                </UBadge>
              </td>
              <td class="px-6 py-4">
                <UButton
                  size="sm"
                  color="primary"
                  variant="soft"
                  icon="i-lucide-pencil"
                  @click="openEditModal(product)"
                >
                  Modifier
                </UButton>
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { client } = useSupabase()
const toast = useToast()

// State
const loading = ref(true)
const saving = ref(false)
const products = ref<any[]>([])
const search = ref('')
const stockFilter = ref('')
const showEditModal = ref(false)
const editingProduct = ref<any>(null)
const editForm = reactive({
  stockQuantity: 0,
  inStock: true
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

// Fetch products from the VIEW
const fetchProducts = async () => {
  loading.value = true
  try {
    const { data, error } = await client
      .from('products')
      .select('id, title, handle, price, thumbnail, in_stock, stock_quantity')
      .order('title')

    if (error) throw error
    products.value = data || []
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

// Save stock update — updates Medusa's product_variant directly
const saveStock = async () => {
  if (!editingProduct.value) return
  saving.value = true

  try {
    // Find the variant for this product and update its inventory
    const { data: variants, error: variantError } = await client
      .from('product_variant')
      .select('id')
      .eq('product_id', editingProduct.value.id)
      .is('deleted_at', null)
      .limit(1)

    if (variantError) throw variantError

    if (variants && variants.length > 0) {
      // Update the inventory level for this variant
      const variantId = variants[0].id

      const { data: invItems } = await client
        .from('product_variant_inventory_item')
        .select('inventory_item_id')
        .eq('variant_id', variantId)
        .limit(1)

      if (invItems && invItems.length > 0) {
        const { error: invError } = await client
          .from('inventory_level')
          .update({
            stocked_quantity: editForm.stockQuantity,
            raw_stocked_quantity: { value: editForm.stockQuantity.toString(), precision: 20 }
          })
          .eq('inventory_item_id', invItems[0].inventory_item_id)

        if (invError) throw invError
      }
    }

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

// Helpers
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount || 0)
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
