<template>
  <div class="bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.08),transparent_45%),#f8fafc] min-h-screen pt-32 pb-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Minimalist Header -->
      <div class="flex items-center gap-3 text-sm font-medium text-gray-500 mb-6">
        <NuxtLink to="/" class="hover:text-gray-900 transition-colors">Accueil</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <span class="text-gray-900">Panier</span>
      </div>
      
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-up">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-4">
          Mon Panier
          <span v-if="!cartStore.isEmpty" class="px-3 py-1 rounded-lg bg-gray-100 text-gray-900 text-sm font-bold align-middle">
            {{ cartStore.itemCount }}
          </span>
        </h1>
      </div>

      <!-- Empty State Premium -->
      <div v-if="cartStore.isEmpty" class="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-16 text-center max-w-3xl mx-auto mt-10">
        <div class="relative mb-10 group mx-auto w-max">
           <div class="absolute inset-0 bg-gray-100 rounded-full scale-150 opacity-50 blur-2xl"></div>
           <div class="w-32 h-32 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center relative z-10">
             <ShoppingBag class="w-12 h-12 text-gray-200" />
           </div>
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-4 tracking-tight">Votre panier est vide</h2>
        <p class="text-gray-500 font-medium mb-12 max-w-md mx-auto leading-relaxed">
          Garssez votre panier avec les essentiels, et laissez TchadBox s'occuper de la livraison sécurisée jusqu'à N'Djamena.
        </p>
        <NuxtLink to="/catalogue" class="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
          <ArrowRight class="w-5 h-5 opacity-70" /> Sélectionner des produits
        </NuxtLink>
      </div>

      <!-- Cart Content (Layout with Items and Sidebar) -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10 reveal-up">
        <!-- Main Cart Items -->
        <div class="lg:col-span-2 space-y-5">
          <TransitionGroup 
            enter-active-class="transition-all duration-500 ease-out" 
            enter-from-class="opacity-0 translate-y-4"
            leave-active-class="transition-all duration-300 ease-in" 
            leave-to-class="opacity-0 -translate-x-4"
          >
            <div v-for="item in cartStore.items" :key="item.id" class="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] group hover:border-gray-200 transition-all">
              <div class="flex gap-6 sm:gap-8">
                <!-- Thumbnail -->
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <img 
                    v-if="item.thumbnail" 
                    :src="item.thumbnail" 
                    :alt="item.title"
                    class="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                  <Package v-else class="w-10 h-10 text-gray-200" />
                </div>
                
                <!-- Details & Controls -->
                <div class="flex-grow min-w-0 flex flex-col">
                  <div class="flex justify-between items-start gap-4">
                    <div class="min-w-0">
                      <h3 class="text-lg font-bold text-gray-900 mb-1 lg:text-xl">{{ item.title }}</h3>
                      <span v-if="item.variantTitle" class="inline-block text-xs font-bold text-gray-500 tracking-wide uppercase px-2 py-1 bg-gray-50 rounded-md">
                        {{ item.variantTitle }}
                      </span>
                      <span v-else-if="item.category" class="inline-block text-xs font-bold text-gray-500 tracking-wide uppercase px-2 py-1 bg-gray-50 rounded-md">
                        {{ item.category }}
                      </span>
                    </div>
                    <button 
                      @click="removeItem(item.id)" 
                      class="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div class="flex items-end justify-between mt-auto pt-4">
                    <!-- Premium Quantity controls -->
                    <div class="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg p-1.5">
                      <button 
                        @click="cartStore.decrementQuantity(item.id)" 
                        class="w-8 h-8 rounded-md bg-white hover:shadow text-gray-500 flex items-center justify-center transition-all disabled:opacity-50"
                        :disabled="item.quantity <= 1"
                      >
                        <Minus class="w-3 h-3" />
                      </button>
                      <span class="w-8 text-center font-bold text-gray-900 text-sm">{{ item.quantity }}</span>
                      <button 
                        @click="cartStore.incrementQuantity(item.id)" 
                        class="w-8 h-8 rounded-md bg-white hover:shadow text-gray-500 flex items-center justify-center transition-all"
                      >
                        <Plus class="w-3 h-3" />
                      </button>
                    </div>
                    
                    <!-- Price section -->
                    <div class="text-right">
                      <p v-if="item.quantity > 1" class="text-xs text-gray-400 font-medium mb-1">{{ cartStore.formatPrice(item.price) }} unitaire</p>
                      <span class="text-2xl font-black text-gray-900">{{ cartStore.formatPrice(item.price * item.quantity) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
          
          <!-- Continue shopping backlink -->
          <NuxtLink 
            to="/catalogue" 
            class="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors mt-6 px-4"
          >
            <ArrowLeft class="w-4 h-4" /> Continuer mes achats
          </NuxtLink>
        </div>

        <!-- Sticky Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-gray-900 rounded-2xl p-8 sticky top-32 text-white shadow-2xl">
            <h2 class="text-xl font-black mb-8 border-b border-white/10 pb-6 uppercase tracking-widest text-white/50 text-sm">Résumé de la commande</h2>
            
            <!-- Items summary breakdown -->
            <div class="space-y-4 mb-8">
              <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between text-sm">
                <span class="text-gray-400 truncate mr-3 flex-grow">{{ item.title }} <span class="text-white/30 ml-1">×{{ item.quantity }}</span></span>
                <span class="text-white font-medium flex-shrink-0">{{ cartStore.formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            
            <div class="border-t border-white/10 pt-6 mb-8 space-y-4">
              <div class="flex justify-between text-gray-400 text-sm">
                <span>Sous-total articles</span>
                <span class="text-white">{{ cartStore.subtotalFormatted }}</span>
              </div>
              <div class="flex justify-between text-gray-400 text-sm">
                <span class="flex items-center gap-2"><Truck class="w-4 h-4 text-gray-500" />Taxes & Livraison</span>
                <span class="text-white">{{ cartStore.shippingFormatted }}</span>
              </div>
            </div>
            
            <!-- Grand Total -->
            <div class="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
              <span class="font-bold text-white/50 uppercase tracking-widest text-xs">Total TTC</span>
              <div class="text-right">
                <span class="text-4xl font-black text-white tracking-tight">{{ cartStore.totalFormatted }}</span>
                <p class="text-xs text-[var(--color-accent)] font-bold mt-1 tracking-wider">≈ {{ cartStore.totalFCFA }} FCFA</p>
              </div>
            </div>
            
            <!-- Checkout Action -->
            <NuxtLink to="/checkout" class="w-full flex items-center justify-center gap-3 py-5 bg-white text-gray-900 font-black rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg mb-6">
              <CreditCard class="w-5 h-5 text-gray-400" /> Payer la commande
            </NuxtLink>
            
            <!-- Logistics Badges -->
            <div class="space-y-3 pt-6 border-t border-white/10">
              <div v-for="badge in trustBadges" :key="badge.label" class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <component :is="badge.icon" class="w-4 h-4 text-gray-400" />
                </div>
                <span class="text-xs font-bold text-gray-400 tracking-wide">{{ badge.label }}</span>
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
  // Use generic style for toaster
  toast.add({ title: 'Produit retiré', description: "L'article a été enlevé de votre panier.", icon: 'i-heroicons-trash', color: 'gray', timeout: 2000 })
}

const trustBadges = [
  { icon: Shield, label: 'Paiement sécurisé crypté' },
  { icon: Truck, label: 'Livraison 3-5 jours (N\'Djamena)' },
  { icon: Camera, label: 'Preuve photo garantie' },
]

useHead({ title: 'Mon Panier | TchadBox' })
</script>
