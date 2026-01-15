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
      <div v-if="cartStore.isOpen" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" @click="cartStore.closeCart" />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-400 ease-out"
      enter-from-class="translate-x-full"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="cartStore.isOpen" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
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

        <!-- Content -->
        <div class="flex-grow overflow-y-auto">
          <!-- Empty -->
          <div v-if="cartStore.isEmpty" class="flex flex-col items-center justify-center h-full p-8 text-center">
            <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <ShoppingBag class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="font-semibold text-[var(--color-text)] mb-2">Panier vide</h3>
            <p class="text-[var(--color-text-muted)] text-sm mb-6">Découvrez nos produits</p>
            <NuxtLink to="/catalogue" class="btn-primary" @click="cartStore.closeCart">
              <span>Voir le catalogue</span>
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
                <p class="text-xs text-[var(--color-text-muted)]">{{ item.category }}</p>
                <p class="font-semibold text-[var(--color-primary)] text-sm mt-1">{{ formatPrice(item.price) }}</p>
              </div>
              <div class="flex flex-col items-end justify-between">
                <button @click="cartStore.removeItem(item.productId)" class="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 class="w-4 h-4" />
                </button>
                <div class="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
                  <button @click="cartStore.decrementQuantity(item.productId)" class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="w-6 text-center text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="cartStore.incrementQuantity(item.productId)" class="w-7 h-7 rounded flex items-center justify-center hover:bg-gray-100">
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!cartStore.isEmpty" class="border-t border-gray-100 p-6 bg-gray-50">
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-[var(--color-text-secondary)]">
              <span>Sous-total</span>
              <span>{{ cartStore.subtotalFormatted }}</span>
            </div>
            <div class="flex justify-between text-[var(--color-text-secondary)]">
              <span class="flex items-center gap-2"><Truck class="w-4 h-4" />Livraison</span>
              <span>{{ cartStore.shippingFormatted }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3 flex justify-between">
              <span class="font-semibold text-[var(--color-text)]">Total</span>
              <div class="text-right">
                <span class="text-xl font-bold text-[var(--color-primary)]">{{ cartStore.totalFormatted }}</span>
                <p class="text-xs text-[var(--color-text-muted)]">≈ {{ cartStore.totalFCFA }}</p>
              </div>
            </div>
          </div>
          <NuxtLink to="/panier" class="btn-primary w-full text-center mb-3" @click="cartStore.closeCart">
            <span>Finaliser la commande</span>
          </NuxtLink>
          <button @click="cartStore.closeCart" class="btn-ghost w-full">Continuer mes achats</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ShoppingBag, X, Package, Trash2, Minus, Plus, Truck } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
</script>
