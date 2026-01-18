<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button @click="sidebarOpen = true" class="p-2 rounded-lg hover:bg-gray-100">
          <Icon name="lucide:menu" class="w-6 h-6" />
        </button>
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <img src="/logo.png" alt="TchadBox" class="h-8 w-auto" />
          <span class="font-bold text-primary-600">Admin</span>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
          <UButton color="gray" variant="ghost" class="p-2">
            <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span class="text-sm font-semibold text-primary-700">{{ authStore.initials }}</span>
            </div>
          </UButton>
        </UDropdown>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-50 bg-black/50" @click="sidebarOpen = false" />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <NuxtLink to="/admin" class="flex items-center gap-2">
          <img src="/logo.png" alt="TchadBox" class="h-10 w-auto" />
          <div>
            <span class="font-bold text-gray-900">TchadBox</span>
            <span class="block text-xs text-primary-600 font-medium">Admin</span>
          </div>
        </NuxtLink>
        <button @click="sidebarOpen = false" class="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3">
        <div class="space-y-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive(item.to)
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            ]"
            @click="sidebarOpen = false"
          >
            <Icon :name="item.icon" class="w-5 h-5" />
            {{ item.label }}
            <span v-if="item.badge" class="ml-auto bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {{ item.badge }}
            </span>
          </NuxtLink>
        </div>

        <!-- Super Admin Section -->
        <div v-if="authStore.isSuperAdmin" class="mt-8">
          <p class="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            CEO Only
          </p>
          <div class="space-y-1">
            <NuxtLink
              v-for="item in superAdminItems"
              :key="item.to"
              :to="item.to"
              :class="[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(item.to)
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              ]"
              @click="sidebarOpen = false"
            >
              <Icon :name="item.icon" class="w-5 h-5" />
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User section -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span class="text-sm font-semibold text-primary-700">{{ authStore.initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ authStore.fullName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ roleLabel }}</p>
          </div>
          <UDropdown :items="userMenuItems" :popper="{ placement: 'top-end' }">
            <UButton color="gray" variant="ghost" icon="i-lucide-more-vertical" size="sm" />
          </UDropdown>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="lg:pl-64 pt-16 lg:pt-0">
      <div class="p-4 lg:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

const sidebarOpen = ref(false)

// Navigation items for all admins
const navigationItems = computed(() => [
  { to: '/admin', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/admin/commandes', label: 'Commandes', icon: 'lucide:package', badge: pendingOrdersCount.value || null },
  { to: '/admin/livreurs', label: 'Livreurs', icon: 'lucide:truck' },
  { to: '/admin/clients', label: 'Clients', icon: 'lucide:users' },
])

// Super admin only items
const superAdminItems = [
  { to: '/admin/equipe', label: 'Équipe', icon: 'lucide:user-cog' },
  { to: '/admin/finances', label: 'Finances', icon: 'lucide:wallet' },
]

// User menu
const userMenuItems = [
  [{
    label: 'Mon profil',
    icon: 'i-lucide-user',
    click: () => navigateTo('/compte/profil')
  }],
  [{
    label: 'Voir le site',
    icon: 'i-lucide-external-link',
    click: () => window.open('/', '_blank')
  }],
  [{
    label: 'Déconnexion',
    icon: 'i-lucide-log-out',
    click: () => authStore.logout()
  }]
]

// Role label
const roleLabel = computed(() => {
  const roles: Record<string, string> = {
    super_admin: '👑 CEO',
    admin: '🛡️ Admin',
    livreur: '🚚 Livreur',
    client: 'Client'
  }
  return roles[authStore.userRole] || 'Utilisateur'
})

// Check if route is active
const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

// Pending orders count (to be implemented)
const pendingOrdersCount = ref(0)

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>
