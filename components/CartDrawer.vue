<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="cartStore.isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity" @click="cartStore.closeCart" />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-300 ease-in-out"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="cartStore.isOpen" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] z-[110] flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <ShoppingBag class="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <h2 class="text-lg font-semibold text-[var(--color-text)]">Mon Panier</h2>
              <p class="text-sm text-[var(--color-text-muted)]" v-if="cartStore.itemCount > 0">
                {{ cartStore.itemCount }} article{{ cartStore.itemCount > 1 ? 's' : '' }}
              </p>
            </div>
          </div>
          <button @click="cartStore.closeCart" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- Free Shipping Progress -->
        <div v-if="!cartStore.isEmpty" class="px-6 py-4 bg-amber-50/50 border-b border-amber-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-amber-800 flex items-center gap-1.5">
              <template v-if="cartStore.amountToFreeShipping > 0">
                <Truck class="w-3.5 h-3.5" />
                Plus que <span class="font-bold">{{ cartStore.formatPrice(cartStore.amountToFreeShipping) }}</span> pour la livraison offerte !
              </template>
              <template v-else>
                <div class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <Check class="w-2.5 h-2.5 text-white" />
                </div>
                Félicitations ! La livraison est <span class="font-bold uppercase">offerte</span>
              </template>
            </span>
            <span class="text-[10px] font-bold text-amber-600 bg-white px-1.5 py-0.5 rounded shadow-sm">
              Objectif: {{ cartStore.formatPrice(cartStore.freeShippingThreshold) }}
            </span>
          </div>
          <div class="h-2 w-full bg-amber-100 rounded-full overflow-hidden shadow-inner">
            <div 
              class="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-1000 ease-out relative"
              :style="{ width: `${cartStore.freeShippingProgress}%` }"
            >
              <div class="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-grow overflow-y-auto">
          <!-- Empty -->
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50/30">
            <div class="w-24 h-24 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6">
              <ShoppingBag class="w-10 h-10 text-gray-300" />
            </div>
            <h3 class="text-xl font-bold text-[var(--color-primary)] mb-2">Votre panier est vide</h3>
            <p class="text-gray-500 text-sm font-medium mb-8">Découvrez notre catalogue et ajoutez vos produits favoris.</p>
            <NuxtLink to="/catalogue" class="btn-gold px-8 py-4 text-sm w-full font-bold shadow-lg shadow-[var(--color-primary)]/10" @click="cartStore.closeCart">
              <ShoppingBag class="w-4 h-4" /> Commencer mes achats
            </NuxtLink>
          </div>

          <!-- Items -->
          <div v-else class="p-4 space-y-3">
            <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-16 h-16 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-gray-100">
                <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover rounded-lg" />
                <Package v-else class="w-6 h-6 text-gray-300" />
              </div>
              <div class="flex-grow min-w-0">
                <h4 class="font-medium text-[var(--color-text)] text-sm truncate">{{ item.title }}</h4>
                <p v-if="item.variantTitle" class="text-xs text-amber-600 font-medium">{{ item.variantTitle }}</p>
                <p v-else class="text-xs text-[var(--color-text-muted)]">{{ item.category }}</p>
                <p class="font-semibold text-[var(--color-primary)] text-sm mt-1">{{ cartStore.formatPrice(item.price) }}</p>
              </div>
              <div class="flex flex-col items-end justify-between">
                <button @click="cartStore.removeItem(item.id)" class="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 class="w-4 h-4" />
                </button>
                <div class="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
                  <button @click="cartStore.decrementQuantity(item.id)" class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="w-6 text-center text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="cartStore.incrementQuantity(item.id)" class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!cartStore.isEmpty" class="border-t border-gray-100 p-6 bg-white shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-[var(--color-text-secondary)] text-sm">
              <span>Sous-total</span>
              <span class="font-medium text-[var(--color-text)]">{{ cartStore.formattedSubtotal }}</span>
            </div>
            <div class="flex justify-between text-[var(--color-text-secondary)] text-sm">
              <span class="flex items-center gap-2"><Truck class="w-4 h-4 text-amber-500" />Livraison estimée</span>
              <span class="font-medium text-[var(--color-text)]">{{ cartStore.formattedShipping }}</span>
            </div>
            <div class="border-t border-gray-100 pt-4 flex justify-between items-end">
              <span class="font-semibold text-[var(--color-text)]">Total</span>
              <div class="text-right">
                <span class="text-2xl font-black text-[var(--color-text)]">{{ cartStore.formattedTotal }}</span>
                <p v-if="cartStore.currency !== 'XAF'" class="text-xs text-[var(--color-text-muted)] font-medium mt-0.5">≈ {{ cartStore.totalXAF }} FCFA</p>
              </div>
            </div>
          </div>
          
          <NuxtLink to="/checkout" class="btn-gold w-full text-center py-4 mb-3 rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2" @click="cartStore.closeCart">
            <Lock class="w-4 h-4" /> Passer la commande sécurisée
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ShoppingBag, X, Package, Trash2, Minus, Plus, Truck, Check, Lock } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

