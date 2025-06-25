<!-- /src/views/admin/Registration.vue do not delete this tag -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex-1 max-w-md">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input v-model="searchTerm" @keypress.enter="handleSearch" @input="onSearchInput" type="text"
                placeholder="Search registrants..."
                class="block w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
              <button v-if="searchTerm && hasSearched" @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <div class="bg-red-500 hover:bg-red-600 rounded p-1 transition-colors">
                  <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <button @click="openAddModal"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Registrant
          </button>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- During load -->
        <div v-if="registrationStore.loading" class="flex items-center justify-center py-16">
          <div class="flex items-center space-x-3">
            <svg class="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <span class="text-lg font-medium text-gray-600">Loading registrants...</span>
          </div>
        </div>

        <!-- Full Table -->
        <div v-else-if="registrationStore.registrants.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('first_name')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>First Name</span>
                    <svg v-if="sortBy === 'first_name'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('last_name')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>Last Name</span>
                    <svg v-if="sortBy === 'last_name'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('email')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>Email</span>
                    <svg v-if="sortBy === 'email'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('mobile_number')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>Mobile Number</span>
                    <svg v-if="sortBy === 'mobile_number'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('created_at')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>Registration Date</span>
                    <svg v-if="sortBy === 'created_at'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <button @click="sortByColumn('updated_at')"
                    class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
                    <span>Last Updated</span>
                    <svg v-if="sortBy === 'updated_at'" class="h-4 w-4" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 15l7-7 7 7" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="registrant in registrationStore.registrants" :key="registrant.id"
                class="hover:bg-gray-50 transition-colors">
                <!-- First Name Col -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">
                    {{ registrant.first_name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ registrant.prefix }}
                  </div>
                </td>

                <!-- Last Name Col -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">
                    {{ registrant.last_name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ID: {{ registrant.id }}
                  </div>
                </td>

                <!-- Email Col -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-900">
                    <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {{ registrant.email }}
                  </div>
                </td>

                <!-- Mobile Number Col-->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center text-sm text-gray-900">
                    <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{ registrant.mobile_number }}
                  </div>
                </td>

                <!-- Registration Date Col -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDateTime(registrant.created_at) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatTimeAgo(registrant.created_at) }}
                  </div>
                </td>

                <!-- Last Updated Col -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDateTime(registrant.updated_at) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatTimeAgo(registrant.updated_at) }}
                  </div>
                </td>

                <!-- Actions Col -->
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button @click="editRegistrant(registrant.id)"
                      class="inline-flex items-center px-3 py-1.5 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer">
                      <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button @click="deleteRegistrant(registrant.id)"
                      class="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                      <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No registrants found</h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first registrant' }}
          </p>
          <div class="mt-6">
            <button @click="openAddModal"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer">
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add First Registrant
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="registrationStore.pagination && registrationStore.pagination.last_page > 1"
          class="bg-white px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-gray-700">
              <span>
                Showing {{ registrationStore.pagination.from }} to {{ registrationStore.pagination.to }}
                of {{ registrationStore.pagination.total }} results
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1" :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                currentPage <= 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
              ]">
                Previous
              </button>

              <template v-for="page in paginationPages" :key="page">
                <button v-if="page !== '...'" @click="goToPage(page as number)" :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                ]">
                  {{ page }}
                </button>
                <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
              </template>

              <button @click="goToPage(currentPage + 1)"
                :disabled="currentPage >= registrationStore.pagination.last_page" :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  currentPage >= registrationStore.pagination.last_page
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                ]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Registrant Modal -->
    <RegistrantModal ref="modalRef" :is-open="isModalOpen" :registrant="currentEditingRegistrant"
      :loading="registrationStore.loading" @close="closeModal" @submit="handleModalSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRegistrationStore } from '../../stores/registration'
import RegistrantModal from '../../components/RegistrantModal.vue'
import type { RegistrantForm, Registrant } from '../../stores/registration'

const registrationStore = useRegistrationStore()

const searchTerm = ref('')
const hasSearched = ref(false)
const sortBy = ref('created_at')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const perPage = ref(10)

const isModalOpen = ref(false)
const currentEditingRegistrant = ref<Registrant | null>(null)
const modalRef = ref<InstanceType<typeof RegistrantModal> | null>(null)

let searchTimeout: number
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadRegistrants()
  }, 500)
}

const paginationPages = computed(() => {
  if (!registrationStore.pagination) return []

  const pages = []
  const current = currentPage.value
  const total = registrationStore.pagination.last_page

  // First page
  if (current > 3) {
    pages.push(1)
    if (current > 4) pages.push('...')
  }

  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    if (current < total - 3) pages.push('...')
    pages.push(total)
  }

  return pages
})

// Methods
const loadRegistrants = async () => {
  await registrationStore.getAllRegistrants({
    search: searchTerm.value || undefined,
    sort_by: sortBy.value,
    sort_order: sortOrder.value,
    per_page: perPage.value,
    page: currentPage.value
  })
}

const sortByColumn = (column: string) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
  currentPage.value = 1
  loadRegistrants()
}

const handleSearch = () => {
  currentPage.value = 1
  hasSearched.value = true
  loadRegistrants()
}

// Search input handler
const onSearchInput = () => {
  if (searchTerm.value === '' && hasSearched.value) {
    hasSearched.value = false
    currentPage.value = 1
    loadRegistrants()
  } else if (searchTerm.value.length > 0) {
    hasSearched.value = true
    debouncedSearch()
  }
}

const clearSearch = () => {
  searchTerm.value = ''
  hasSearched.value = false
  currentPage.value = 1
  loadRegistrants()
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= (registrationStore.pagination?.last_page || 1)) {
    currentPage.value = page
    loadRegistrants()
  }
}

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  return `${Math.floor(diffInDays / 30)} months ago`
}

const openAddModal = () => {
  currentEditingRegistrant.value = null
  isModalOpen.value = true
}

const editRegistrant = async (id: number) => {
  const existingRegistrant = registrationStore.registrants.find(r => r.id === id)

  if (existingRegistrant) {
    currentEditingRegistrant.value = existingRegistrant
    isModalOpen.value = true
  } else {

    const result = await registrationStore.getRegistrantById(id)
    if (result.success) {
      currentEditingRegistrant.value = result.data
      isModalOpen.value = true
    }
  }
}

const closeModal = () => {
  isModalOpen.value = false
  currentEditingRegistrant.value = null
}

const handleModalSubmit = async (formData: RegistrantForm) => {
  let result

  if (currentEditingRegistrant.value) {
    result = await registrationStore.updateRegistrant(currentEditingRegistrant.value.id, formData)
  } else {
    result = await registrationStore.createRegistrant(formData)
  }

  if (result.success) {
    closeModal()
    await loadRegistrants()
  } else if (result.errors && modalRef.value) {
    modalRef.value.setErrors(result.errors)

  }
}

const deleteRegistrant = async (id: number) => {
  if (confirm('Are you sure you want to delete this registrant?')) {
    await registrationStore.deleteRegistrant(id)
    if (registrationStore.registrants.length === 0 && currentPage.value > 1) {
      currentPage.value = currentPage.value - 1
    }
    loadRegistrants()
  }
}

onMounted(() => {
  loadRegistrants()
})
</script>