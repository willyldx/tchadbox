<template>
  <div>
    <!-- Hero -->
    <section class="relative py-14 bg-[var(--color-bg-warm)] overflow-hidden">
      <div class="container-main relative">
        <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-4">
          <NuxtLink to="/" class="hover:text-[var(--color-accent-dark)] transition-colors">Accueil</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-[var(--color-text)]">Mon panier</span>
        </div>
        <h1 class="heading-section flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
            <ShoppingBag class="w-6 h-6 text-[var(--color-accent-dark)]" />
          </div>
          Mon Panier
          <span v-if="!cartStore.isEmpty" class="text-lg font-normal text-[var(--color-text-muted)]">
            ({{ cartStore.itemCount }} article{{ cartStore.itemCount > 1 ? 's' : '' }})
          </span>
        </h1>
      </div>
    </section>

    <div class="container-main py-10">
      <!-- Empty State -->
      <div v-if="cartStore.isEmpty" class="max-w-xl mx-auto py-12">
        <div 
          v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1 }"
          class="card p-16 text-center"
        >
          <div class="w-24 h-24 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag class="w-12 h-12 text-amber-300" />
          </div>
          <h2 class="text-2xl font-bold text-[var(--color-text)] mb-3">Votre panier est vide</h2>
          <p class="text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
            Parcourez notre catalogue et faites plaisir à votre famille au Tchad
          </p>
          <NuxtLink to="/catalogue" class="btn-gold">
            <span><ArrowRight class="w-5 h-5" />Découvrir le catalogue</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Items -->
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup 
            enter-active-class="transition-all duration-300" 
            enter-from-class="opacity-0 translate-x-4"
            leave-active-class="transition-all duration-200" 
            leave-to-class="opacity-0 -translate-x-4"
          >
            <div v-for="item in cartStore.items" :key="item.id" class="card p-5 group hover:!border-[var(--color-accent)]/15">
              <div class="flex gap-5">
                <!-- Thumbnail -->
                <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    v-if="item.thumbnail" 
                    :src="item.thumbnail" 
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  />
                  <Package v-else class="w-10 h-10 text-gray-200" />
                </div>
                
                <!-- Details -->
                <div class="flex-grow min-w-0">
                  <div class="flex justify-between items-start gap-3">
                    <div class="min-w-0">
                      <h3 class="text-lg font-semibold text-[var(--color-text)] truncate">{{ item.title }}</h3>
                      <span v-if="item.variantTitle" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mt-1">
                        {{ item.variantTitle }}
                      </span>
                      <span v-else-if="item.category" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mt-1">
                        {{ item.category }}
                      </span>
                    </div>
                    <button 
                      @click="removeItem(item.id)" 
                      class="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <Trash2 class="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div class="flex items-end justify-between mt-4">
                    <!-- Quantity controls -->
                    <div class="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
                      <button 
                        @click="cartStore.decrementQuantity(item.id)" 
                        class="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center transition-all active:scale-95"
                        :class="item.quantity <= 1 ? 'text-gray-300' : 'text-[var(--color-text)]'"
                      >
                        <Minus class="w-4 h-4" />
                      </button>
                      <span class="w-10 text-center font-semibold text-[var(--color-text)]">{{ item.quantity }}</span>
                      <button 
                        @click="cartStore.incrementQuantity(item.id)" 
                        class="w-9 h-9 rounded-lg hover:bg-white flex items-center justify-center transition-all active:scale-95 text-[var(--color-text)]"
                      >
                        <Plus class="w-4 h-4" />
                      </button>
                    </div>
                    
                    <!-- Price -->
                    <div class="text-right">
                      <span class="text-xl font-bold text-[var(--color-text)]">{{ cartStore.formatPrice(item.price * item.quantity) }}</span>
                      <p v-if="item.quantity > 1" class="text-xs text-[var(--color-text-muted)]">{{ cartStore.formatPrice(item.price) }} /pièce</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
          
          <!-- Continue shopping link -->
          <NuxtLink 
            to="/catalogue" 
            class="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)] transition-colors mt-4"
          >
            <ArrowLeft class="w-4 h-4" />
            Continuer les achats
          </NuxtLink>
        </div>

        <!-- Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-28 space-y-6">
            <h2 class="text-xl font-bold text-[var(--color-text)]">Résumé</h2>
            
            <!-- Items summary -->
            <div class="space-y-3">
              <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-[var(--color-text-secondary)] truncate mr-3">{{ item.title }} × {{ item.quantity }}</span>
                <span class="text-[var(--color-text)] font-medium flex-shrink-0">{{ cartStore.formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            
            <div class="section-divider" />
            
            <!-- Totals -->
            <div class="space-y-3">
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span>Sous-total</span>
                <span>{{ cartStore.subtotalFormatted }}</span>
              </div>
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span class="flex items-center gap-2"><Truck class="w-4 h-4" />Livraison</span>
                <span>{{ cartStore.shippingFormatted }}</span>
              </div>
              <div class="section-divider" />
              <div class="flex justify-between items-end">
                <span class="font-semibold text-[var(--color-text)]">Total</span>
                <div class="text-right">
                  <span class="text-2xl font-bold text-[var(--color-text)]">{{ cartStore.totalFormatted }}</span>
                  <p class="text-xs text-[var(--color-text-muted)]">≈ {{ cartStore.totalFCFA }}</p>
                </div>
              </div>
            </div>
            
            <!-- Checkout button -->
            <NuxtLink to="/checkout" class="btn-gold w-full text-center">
              <span><CreditCard class="w-5 h-5" />Commander</span>
            </NuxtLink>
            
            <!-- Trust badges -->
            <div class="space-y-2.5 pt-4 border-t border-[var(--color-border)]">
              <div v-for="badge in trustBadges" :key="badge.label" class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <component :is="badge.icon" class="w-3.5 h-3.5 text-green-600" />
                </div>
                <span class="text-sm text-[var(--color-text-muted)]">{{ badge.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ShoppingBag, Package, Trash2, Minus, Plus, Truck, CreditCard, Shield, Camera,
  ChevronRight, ArrowRight, ArrowLeft
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const toast = useToast()

onMounted(() => cartStore.loadFromStorage())

const removeItem = (itemId: string) => {
  cartStore.removeItem(itemId)
  toast.add({ title: 'Produit retiré', icon: 'i-heroicons-check-circle', color: 'amber', timeout: 2000 })
}

const trustBadges = [
  { icon: Shield, label: 'Paiement sécurisé Paystack' },
  { icon: Truck, label: 'Livraison en 3-5 jours' },
  { icon: Camera, label: 'Photo de preuve garantie' },
]

useHead({ title: 'Mon Panier' })
</script>
