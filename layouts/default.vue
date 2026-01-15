<template>
  <div class="min-h-screen flex flex-col">
    <!-- Announcement Bar -->
    <div class="bg-[var(--color-primary)] text-white py-2.5">
      <div class="container-main">
        <div class="flex items-center justify-center gap-2 text-sm">
          <Truck class="w-4 h-4 text-[var(--color-gold)]" />
          <span>Livraison garantie à N'Djamena en 3-5 jours avec photo</span>
          <span class="hidden sm:inline text-[var(--color-gold)]">•</span>
          <span class="hidden sm:inline">Paiement 100% sécurisé</span>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header 
      class="sticky top-0 z-50 transition-all duration-300"
      :class="isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'"
    >
      <div class="container-main">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex-shrink-0 group">
            <img 
              src="/logo.png" 
              alt="TchadBox" 
              class="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </NuxtLink>

          <!-- Navigation -->
          <nav class="hidden lg:flex items-center gap-8">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to" 
              :to="link.to"
              class="nav-link"
              :class="{ 'nav-link-active': isActive(link.to) }"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <!-- Search -->
            <button 
              @click="isSearchOpen = true"
              class="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Search class="w-5 h-5 text-gray-600" />
            </button>

            <!-- Favorites -->
            <NuxtLink
              to="/favoris"
              class="hidden md:flex relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <Heart class="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
              <span 
                v-if="favoritesStore.count > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {{ favoritesStore.count }}
              </span>
            </NuxtLink>

            <!-- User Menu -->
            <div class="hidden md:block relative" ref="userMenuRef">
              <button
                v-if="authStore.isAuthenticated"
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {{ authStore.initials }}
                </div>
                <ChevronDown class="w-4 h-4 text-gray-500" :class="{ 'rotate-180': isUserMenuOpen }" />
              </button>
              <NuxtLink
                v-else
                to="/auth/login"
                class="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
              >
                <User class="w-5 h-5" />
                <span class="text-sm font-medium">Connexion</span>
              </NuxtLink>

              <!-- User Dropdown -->
              <Transition
                enter-active-class="transition-all duration-200"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div 
                  v-if="isUserMenuOpen && authStore.isAuthenticated" 
                  class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                >
                  <div class="px-4 py-3 border-b border-gray-100">
                    <p class="font-medium text-gray-800">{{ authStore.fullName }}</p>
                    <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email }}</p>
                  </div>
                  <NuxtLink
                    to="/compte"
                    class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="isUserMenuOpen = false"
                  >
                    <LayoutDashboard class="w-4 h-4" />
                    <span>Tableau de bord</span>
                  </NuxtLink>
                  <NuxtLink
                    to="/compte/commandes"
                    class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="isUserMenuOpen = false"
                  >
                    <Package class="w-4 h-4" />
                    <span>Mes commandes</span>
                  </NuxtLink>
                  <NuxtLink
                    to="/compte/profil"
                    class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="isUserMenuOpen = false"
                  >
                    <UserCircle class="w-4 h-4" />
                    <span>Mon profil</span>
                  </NuxtLink>
                  <NuxtLink
                    to="/favoris"
                    class="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    @click="isUserMenuOpen = false"
                  >
                    <Heart class="w-4 h-4" />
                    <span>Mes favoris</span>
                  </NuxtLink>
                  <div class="border-t border-gray-100 mt-2 pt-2">
                    <button
                      @click="handleLogout"
                      class="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                      <LogOut class="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Cart -->
            <button 
              @click="cartStore.toggleCart"
              class="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <ShoppingBag class="w-5 h-5 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors" />
              <span 
                v-if="cartStore.itemCount > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gold)] text-[var(--color-primary-dark)] text-xs font-bold rounded-full flex items-center justify-center animate-scale-in"
              >
                {{ cartStore.itemCount }}
              </span>
            </button>

            <!-- Mobile Menu -->
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <component :is="isMobileMenuOpen ? X : Menu" class="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav class="container-main py-4 space-y-1">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.to" 
              :to="link.to"
              class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
              @click="isMobileMenuOpen = false"
            >
              <component :is="link.icon" class="w-5 h-5" />
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <!-- Main -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[var(--color-primary)] text-white mt-20">
      <div class="h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      
      <div class="container-main py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand -->
          <div>
            <img src="/logo.png" alt="TchadBox" class="h-14 w-auto mb-6" />
            <p class="text-blue-200 leading-relaxed mb-6">
              La diaspora tchadienne envoie des biens à sa famille. Livraison garantie avec photo.
            </p>
            <div class="flex gap-3">
              <a v-for="s in socials" :key="s.name" :href="s.url" class="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-gold)] hover:text-[var(--color-primary-dark)] flex items-center justify-center transition-all">
                <component :is="s.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-semibold mb-6 text-[var(--color-gold)]">Navigation</h4>
            <ul class="space-y-3">
              <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to" class="text-blue-200 hover:text-white transition-colors">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="font-semibold mb-6 text-[var(--color-gold)]">Catégories</h4>
            <ul class="space-y-3">
              <li><NuxtLink to="/catalogue?categorie=alimentaire" class="text-blue-200 hover:text-white transition-colors">Alimentaire</NuxtLink></li>
              <li><NuxtLink to="/catalogue?categorie=scolarite" class="text-blue-200 hover:text-white transition-colors">Scolarité</NuxtLink></li>
              <li><NuxtLink to="/catalogue?categorie=sante" class="text-blue-200 hover:text-white transition-colors">Santé & Bébé</NuxtLink></li>
              <li><NuxtLink to="/catalogue?categorie=fetes" class="text-blue-200 hover:text-white transition-colors">Fêtes</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold mb-6 text-[var(--color-gold)]">Contact</h4>
            <ul class="space-y-4">
              <li class="flex items-center gap-3 text-blue-200">
                <Mail class="w-5 h-5 text-[var(--color-gold)]" />
                contact@tchadbox.com
              </li>
              <li class="flex items-center gap-3 text-blue-200">
                <Phone class="w-5 h-5 text-[var(--color-gold)]" />
                +33 X XX XX XX XX
              </li>
              <li class="flex items-center gap-3 text-blue-200">
                <MapPin class="w-5 h-5 text-[var(--color-gold)]" />
                N'Djamena, Tchad
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-blue-200/70 text-sm">© {{ new Date().getFullYear() }} TchadBox. Tous droits réservés.</p>
          <div class="flex gap-6 text-sm text-blue-200/70">
            <NuxtLink to="/mentions-legales" class="hover:text-white transition-colors">Mentions légales</NuxtLink>
            <NuxtLink to="/confidentialite" class="hover:text-white transition-colors">Confidentialité</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- Search Modal -->
    <SearchModal v-model="isSearchOpen" />
  </div>
</template>

<script setup lang="ts">
import { 
  Search, ShoppingBag, Menu, X, Mail, Phone, MapPin, Truck,
  Home, Package, HelpCircle, MapPinned, MessageCircle,
  Facebook, Instagram, Twitter, Heart, User, ChevronDown,
  LayoutDashboard, UserCircle, LogOut
} from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'
import { onClickOutside } from '@vueuse/core'

const cartStore = useCartStore()
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const route = useRoute()
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const isScrolled = ref(false)
const isUserMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

// Close user menu when clicking outside
onClickOutside(userMenuRef, () => {
  isUserMenuOpen.value = false
})

const navLinks = [
  { label: 'Accueil', to: '/', icon: Home },
  { label: 'Catalogue', to: '/catalogue', icon: Package },
  { label: 'Comment ça marche', to: '/comment-ca-marche', icon: HelpCircle },
  { label: 'Suivi', to: '/suivi', icon: MapPinned },
  { label: 'Contact', to: '/contact', icon: MessageCircle },
]

const socials = [
  { name: 'Facebook', url: '#', icon: Facebook },
  { name: 'Instagram', url: '#', icon: Instagram },
  { name: 'Twitter', url: '#', icon: Twitter },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

async function handleLogout() {
  isUserMenuOpen.value = false
  await authStore.logout()
}

onMounted(async () => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  })
  
  // Check session on mount
  await authStore.checkSession()
  
  // Initialize favorites
  favoritesStore.initialize()
})

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
})
</script>

<style scoped>
.nav-link {
  @apply relative font-medium text-gray-600 transition-colors duration-300;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  @apply absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300;
  background: var(--color-gold);
}

.nav-link:hover::after,
.nav-link-active::after {
  @apply w-full;
}

.nav-link-active {
  color: var(--color-primary);
}
</style>
