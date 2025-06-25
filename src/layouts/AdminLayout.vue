<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">


    <!-- Sidebar -->
    <div
      class="bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl transition-all duration-300 ease-in-out border-r border-slate-700 z-40"
      :class="getSidebarClasses()">

      <!-- Sidebar Header -->
      <div class="p-4 border-b border-slate-700 flex items-center overflow-hidden relative"
        :class="sidebarCollapsed ? 'justify-center' : 'justify-between'">
        <div class="flex items-center space-x-3 transition-opacity duration-300">
          <!-- Logo -->
          <div
            class="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>
          <!-- Title -->
          <div v-if="!sidebarCollapsed" class="flex flex-col">
            <span class="text-lg font-black text-white tracking-wide">AMC</span>
            <span class="text-sm font-medium text-emerald-300 -mt-1 tracking-widest">REGISTRATION</span>
          </div>
        </div>

        <!-- Toggle normal -->
        <button v-if="!sidebarCollapsed" @click="toggleSidebar"
          class="p-2 rounded-lg bg-slate-700 hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg border border-slate-600 hover:border-emerald-500 cursor-pointer">
          <svg class="w-5 h-5 text-white transition-transform duration-300" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>

      <!-- Toggle collapsed -->
      <button v-if="sidebarCollapsed && !isMobile" @click="toggleSidebar"
        class="absolute top-4 p-2 rounded-lg bg-slate-700 hover:bg-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg border border-slate-600 hover:border-emerald-500 z-50 cursor-pointer -right-4">
        <svg class="w-5 h-5 text-white transition-transform duration-300 rotate-180" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <nav class="flex-1 py-6">
        <div class="px-3 space-y-3">
          <!-- Dashboard Nav -->
          <div class="relative">
            <RouterLink to="/admin"
              class="flex items-center text-slate-300 rounded-xl hover:bg-emerald-700 hover:text-white transition-all duration-300 group border border-transparent hover:border-emerald-600"
              :class="sidebarCollapsed ? 'px-3 py-4 justify-center' : 'px-4 py-4'"
              active-class="bg-emerald-600 text-white border-emerald-500"
              exact-active-class="bg-emerald-600 text-white border-emerald-500" @click="handleNavClick">
              <div class="relative">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                  </path>
                </svg>
              </div>
              <span v-if="!sidebarCollapsed" class="ml-4 font-semibold transition-opacity duration-300 truncate">
                Dashboard
              </span>
            </RouterLink>
            <!-- Desktop tooltip -->
            <div v-if="sidebarCollapsed && !isMobile"
              class="absolute left-16 top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-600">
              Dashboard
            </div>
          </div>

          <!-- Registration Nav -->
          <div class="relative">
            <RouterLink to="/admin/registration"
              class="flex items-center text-slate-300 rounded-xl hover:bg-emerald-700 hover:text-white transition-all duration-300 group border border-transparent hover:border-emerald-600"
              :class="sidebarCollapsed ? 'px-3 py-4 justify-center' : 'px-4 py-4'"
              active-class="bg-emerald-600 text-white border-emerald-500" @click="handleNavClick">
              <div class="relative">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 8v6m3-3h-6"></path>
                </svg>
              </div>
              <span v-if="!sidebarCollapsed" class="ml-4 font-semibold transition-opacity duration-300 truncate">
                Registration
              </span>
            </RouterLink>
            <!-- Desktop tooltip -->
            <div v-if="sidebarCollapsed && !isMobile"
              class="absolute left-16 top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-600">
              Registration
            </div>
          </div>

          <!-- Settings Nav -->
          <div class="relative">
            <RouterLink to="/admin/settings"
              class="flex items-center text-slate-300 rounded-xl hover:bg-emerald-700 hover:text-white transition-all duration-300 group border border-transparent hover:border-emerald-600"
              :class="sidebarCollapsed ? 'px-3 py-4 justify-center' : 'px-4 py-4'"
              active-class="bg-emerald-600 text-white border-emerald-500" @click="handleNavClick">
              <div class="relative">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                  </path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <span v-if="!sidebarCollapsed" class="ml-4 font-semibold transition-opacity duration-300 truncate">
                Settings
              </span>
            </RouterLink>
            <!-- Desktop tooltip -->
            <div v-if="sidebarCollapsed && !isMobile"
              class="absolute left-16 top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-600">
              Settings
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden" :class="getMainContentClasses()">

      <header class="bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg border-emerald-800 flex-shrink-0">
        <div class="px-6 py-3 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Mobile hamburger menu -->
            <button v-if="isMobile && sidebarCollapsed" @click="openSidebar"
              class="p-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </button>

            <h2 class="text-2xl font-bold text-white tracking-wide">
              {{ pageTitle }}
            </h2>
          </div>

          <!-- User profile -->
          <div class="relative" ref="dropdownRef">
            <button @click="toggleDropdown"
              class="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
              <div
                class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-sm">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <svg class="w-3 h-3 text-slate-700 transition-transform duration-200"
                :class="dropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
              <div class="p-4 border-b border-gray-100">
                <div class="p-4 border-b border-gray-100">
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="font-semibold text-slate-800 truncate">Owner</div>
                      <div class="text-sm text-slate-500 truncate">owner@danwardbautista.com</div>
                      <div class="text-xs text-emerald-600 font-medium">Administrator</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-2">
                <button @click="handleLogout"
                  class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="h-full">
          <div class="bg-white h-full">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const route = useRoute()
const sidebarCollapsed = ref(false)
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)

// Check if screen is mobile size
const checkMobile = () => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < 768

  // If switching to mobile
  if (!wasMobile && isMobile.value) {
    sidebarCollapsed.value = true
  }
}

const getSidebarClasses = () => {
  const baseClasses = []

  if (sidebarCollapsed.value) {
    baseClasses.push('w-16')
  } else {
    baseClasses.push('w-64')
  }

  if (isMobile.value) {
    baseClasses.push('fixed', 'top-0', 'left-0', 'h-full')
  } else {
    baseClasses.push('flex-shrink-0', 'relative')
  }

  return baseClasses.join(' ')
}

// Get main content classes based on state
const getMainContentClasses = () => {
  const baseClasses = []

  if (isMobile.value && sidebarCollapsed.value) {
    baseClasses.push('ml-16')
  }

  return baseClasses.join(' ')
}

const openSidebar = () => {
  sidebarCollapsed.value = false
}

const closeSidebar = () => {
  sidebarCollapsed.value = true
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Handle navigation clicks on mobile
const handleNavClick = () => {
  if (isMobile.value && !sidebarCollapsed.value) {
    setTimeout(() => {
      closeSidebar()
    }, 150)
  }
}

const handleLogout = async () => {
  dropdownOpen.value = false
  await auth.logout()
  router.push({ name: 'login' })
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

// Initialize
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleClickOutside)
})

const pageTitle = computed(() => {
  const routeName = route.name as string

  switch (routeName) {
    case 'dashboard':
      return 'Dashboard'
    case 'registration':
      return 'Registration'
    case 'settings':
      return 'Settings'
    default:
      return 'Dashboard'
  }
})
</script>