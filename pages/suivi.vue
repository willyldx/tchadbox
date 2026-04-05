<template>
  <div class="min-h-screen bg-gray-50/50 pt-24 pb-24">
    <!-- Hero -->
    <section class="relative py-20 overflow-hidden">
      <!-- Minimalist abstract grid background -->
      <div class="absolute inset-0 z-0 opacity-[0.03]" style="background-image: radial-gradient(circle at center, #000 1px, transparent 1px); background-size: 24px 24px;"></div>
      
      <div class="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <div 
          v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
          class="w-20 h-20 mx-auto rounded-[2rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-8 relative group"
        >
           <div class="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
          <MapPin class="w-8 h-8 text-gray-900 group-hover:text-white transition-colors duration-500 relative z-10" />
        </div>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6"
        >
          Radar Logistique
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-lg font-medium text-gray-500 max-w-lg mx-auto leading-relaxed"
        >
          Traçabilité sécurisée. Entrez votre référence pour localiser votre bordereau en temps réel.
        </p>
      </div>
    </section>

    <div class="max-w-2xl mx-auto px-6 pb-20">
      <!-- Search Form Box -->
      <div class="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-8 sm:p-10 mb-10">
        <form @submit.prevent="trackOrder" class="relative">
          <label class="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Référence du Dossier</label>
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative flex-grow">
              <Package class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                v-model="orderNumber" 
                type="text" 
                placeholder="Ex: TCB-2024-001234" 
                class="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all shadow-sm"
                required 
              />
            </div>
            <button type="submit" :disabled="isSearching" class="px-10 py-5 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto w-full shrink-0">
              <Loader v-if="isSearching" class="w-5 h-5 animate-spin text-gray-400" />
               <Search v-else class="w-5 h-5 text-gray-400" />
              <span v-if="!isSearching">Scanner</span>
              <span v-else>Analyse...</span>
            </button>
          </div>
           <!-- Optical scan line effect when searching -->
            <div v-if="isSearching" class="absolute -bottom-10 left-0 right-0 h-0.5 bg-gray-900/10 overflow-hidden rounded-full">
               <div class="w-1/3 h-full bg-gray-900 rounded-full animate-[wiggle_1s_ease-in-out_infinite]"></div>
            </div>
        </form>
      </div>

      <!-- Order Found Result -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-8"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="order" class="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden relative">
           <div class="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] pointer-events-none -z-0"></div>
           
          <!-- Premium Order Header -->
          <div class="p-8 sm:p-10 border-b border-gray-50 relative z-10 flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Manifeste Logistique</p>
              <p class="text-3xl font-black text-gray-900 tracking-tight">{{ order.reference }}</p>
              <div v-if="order.recipient_name" class="mt-4 flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl inline-flex border border-gray-100">
                 <User class="w-4 h-4 text-gray-400" />
                 <span class="text-sm font-bold text-gray-900">{{ order.recipient_name }} <span class="text-gray-400 font-medium">| {{ order.shipping_city }}</span></span>
              </div>
            </div>
            
            <span class="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border"
              :class="order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' : 'bg-gray-900 text-white shadow-lg'"
            >
              {{ order.status === 'delivered' ? 'Dossier Clos' : 'En Opération' }}
            </span>
          </div>
          
          <!-- Ultra Sleek Timeline -->
          <div class="p-8 sm:p-10 bg-gray-50/50">
             <div class="flex items-center justify-between mb-8">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-500">Avancement</span>
                <span class="text-lg font-black text-gray-900">{{ Math.round(completedPercent) }}%</span>
             </div>
             
             <!-- Smooth Progress Bar -->
             <div class="h-2 bg-gray-200 rounded-full mb-12 overflow-hidden shadow-inner">
                <div 
                  class="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out relative"
                  :style="{ width: `${completedPercent}%` }"
                >
                   <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
             </div>

            <div class="relative max-w-lg mx-auto">
              <!-- Thin structural line -->
              <div class="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200" />
              
              <div v-for="(step, i) in order.timeline" :key="i" class="relative pl-16 pb-10 last:pb-0 group">
                <!-- Status Node -->
                <div 
                  class="absolute left-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-sm"
                  :class="step.completed 
                    ? 'bg-gray-900 text-white scale-100' 
                    : 'bg-gray-100 text-gray-400 scale-90'"
                >
                  <Check v-if="step.completed && i !== order.timeline.length - 1" class="w-5 h-5" />
                  <component v-else :is="step.icon" class="w-5 h-5" />
                  
                  <!-- Radar pulse for current active step -->
                  <div v-if="step.completed && i === order.timeline.filter(s=>s.completed).length - 1 && order.status !== 'delivered'" class="absolute -inset-2 rounded-2xl border-2 border-gray-900 animate-ping opacity-20"></div>
                </div>
                
                <div class="pt-2">
                  <p class="text-xl font-black tracking-tight" :class="step.completed ? 'text-gray-900' : 'text-gray-400'">
                    {{ step.title }}
                  </p>
                  <p v-if="step.detail" class="text-sm font-medium leading-relaxed mt-2" :class="step.completed ? 'text-gray-500' : 'text-gray-400 opacity-60'">
                    {{ step.detail }}
                  </p>
                  <p class="text-xs font-bold uppercase tracking-widest mt-3" :class="step.completed ? 'text-gray-400' : 'text-gray-300'">
                    {{ step.date || 'En attente' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- VIP Delivery Photo Proof -->
          <div v-if="order.delivery_photo" class="p-8 sm:p-10 border-t border-gray-50">
            <div class="bg-gray-900 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
               <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
               <div class="flex items-center gap-3 mb-6 relative z-10">
                  <Camera class="w-5 h-5 text-gray-400" />
                  <p class="text-sm font-bold uppercase tracking-widest text-white">Preuve visuelle de remise</p>
               </div>
              <img
                :src="order.delivery_photo"
                alt="Preuve certifiée de livraison"
                class="w-full rounded-2xl object-cover border border-gray-800 shadow-xl max-h-96 relative z-10"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="p-8 sm:p-10 border-t border-gray-50 flex justify-center">
            <NuxtLink to="/contact" class="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-900 transition-all shadow-sm active:scale-95">
              <MessageCircle class="w-5 h-5 text-gray-400" />
              Requête au Concierge
            </NuxtLink>
          </div>
        </div>
      </Transition>

      <!-- Not Found Error State -->
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
      >
        <div v-if="notFound" class="bg-white rounded-[2rem] border border-red-100 p-12 text-center shadow-xl">
          <div class="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <SearchX class="w-10 h-10 text-red-500" />
          </div>
           <h3 class="text-2xl font-black text-gray-900 mb-3 tracking-tight">Signal Perdu</h3>
           <p class="text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
             Le radar logistique ne détecte aucun bordereau pour "<span class="font-bold text-gray-900">{{ orderNumber }}</span>". Vérifiez l'exactitude de la référence.
           </p>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg">
            <MessageCircle class="w-4 h-4 text-gray-400" />
            Contacter l'Assistance
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Search, Check, SearchX, Package, Info, MessageCircle, Loader, Clock, User, Camera } from 'lucide-vue-next'

const route = useRoute()
const config = useRuntimeConfig()

const orderNumber = ref((route.query.ref as string) || '')
const order = ref<any>(null)
const notFound = ref(false)
const isSearching = ref(false)

const completedPercent = computed(() => {
  if (!order.value?.timeline) return 0
  const completed = order.value.timeline.filter((s: any) => s.completed).length
  return (completed / order.value.timeline.length) * 100
})

const trackOrder = async () => {
  if (!orderNumber.value.trim()) return
  order.value = null
  notFound.value = false
  isSearching.value = true

  // Artificial delay to feel the radar scanning (luxury feel)
  await new Promise(resolve => setTimeout(resolve, 800))

  try {
    const data = await $fetch<any>(
      `${config.public.apiUrl}/orders/status/${encodeURIComponent(orderNumber.value.trim())}`
    )
    order.value = data
  } catch (e: any) {
    notFound.value = true
    if (e?.status !== 404) console.error('Tracking error:', e)
  } finally {
    isSearching.value = false
  }
}

onMounted(() => {
  if (orderNumber.value) trackOrder()
})

useHead({ title: 'Radar Logistique | Conciergerie TchadBox' })
</script>

<style scoped>
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(200%); }
}
</style>
