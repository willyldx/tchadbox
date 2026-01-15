<template>
  <div>
    <section class="hero-gradient text-white py-12">
      <div class="container-main">
        <h1 class="heading-section text-white flex items-center gap-4">
          <ShoppingBag class="w-10 h-10" />Mon Panier
        </h1>
      </div>
    </section>

    <div class="container-main py-10">
      <div v-if="cartStore.isEmpty" class="card p-16 text-center max-w-2xl mx-auto">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag class="w-12 h-12 text-gray-300" />
        </div>
        <h2 class="text-2xl font-bold text-[var(--color-text)] mb-4">Panier vide</h2>
        <p class="text-[var(--color-text-muted)] mb-8">Découvrez nos produits</p>
        <NuxtLink to="/catalogue" class="btn-primary"><span>Voir le catalogue</span></NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="card p-6">
            <div class="flex gap-6">
              <div class="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Package class="w-10 h-10 text-gray-300" />
              </div>
              <div class="flex-grow">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-semibold text-[var(--color-text)]">{{ item.title }}</h3>
                    <p class="text-[var(--color-text-muted)]">{{ item.category }}</p>
                  </div>
                  <button @click="cartStore.removeItem(item.productId)" class="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
                <div class="flex items-end justify-between mt-4">
                  <div class="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                    <button @click="cartStore.decrementQuantity(item.productId)" class="w-10 h-10 rounded-lg hover:bg-white flex items-center justify-center transition-colors">
                      <Minus class="w-4 h-4" />
                    </button>
                    <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                    <button @click="cartStore.incrementQuantity(item.productId)" class="w-10 h-10 rounded-lg hover:bg-white flex items-center justify-center transition-colors">
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                  <span class="text-2xl font-bold text-[var(--color-primary)]">{{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-28">
            <h2 class="text-xl font-bold text-[var(--color-text)] mb-6">Résumé</h2>
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span>Sous-total</span><span>{{ cartStore.subtotalFormatted }}</span>
              </div>
              <div class="flex justify-between text-[var(--color-text-secondary)]">
                <span class="flex items-center gap-2"><Truck class="w-4 h-4" />Livraison</span>
                <span>{{ cartStore.shippingFormatted }}</span>
              </div>
              <div class="border-t border-gray-100 pt-4 flex justify-between">
                <span class="font-semibold text-[var(--color-text)]">Total</span>
                <div class="text-right">
                  <span class="text-2xl font-bold text-[var(--color-primary)]">{{ cartStore.totalFormatted }}</span>
                  <p class="text-sm text-[var(--color-text-muted)]">≈ {{ cartStore.totalFCFA }}</p>
                </div>
              </div>
            </div>
            <button @click="checkout" class="btn-primary w-full mb-4"><span><CreditCard class="w-5 h-5" />Commander</span></button>
            <div class="space-y-2 pt-4 border-t border-gray-100">
              <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"><Shield class="w-4 h-4 text-green-500" />Paiement sécurisé</div>
              <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"><Truck class="w-4 h-4 text-green-500" />Livraison 3-5 jours</div>
              <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"><Camera class="w-4 h-4 text-green-500" />Photo de preuve</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingBag, Package, Trash2, Minus, Plus, Truck, CreditCard, Shield, Camera } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const toast = useToast()

onMounted(() => cartStore.loadFromStorage())

const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)

const checkout = () => {
  toast.add({ title: 'Bientôt disponible', description: 'Paiement Paystack à venir !', icon: 'i-heroicons-information-circle', color: 'blue' })
}

useHead({ title: 'Mon Panier' })
</script>
