<!-- /src/views/admin/Registration.vue (Modularized Version) -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <SearchBar
          v-model="searchTerm"
          :has-searched="hasSearched"
          placeholder="Search registrants..."
          add-button-text="Add Registrant"
          @search="handleSearch"
          @clear="clearSearch"
          @add="openAddModal"
        />
        
        <!-- Column Visibility Button -->
        <div class="mt-4">
          <button 
            @click="isColumnModalOpen = true"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Edit Columns
          </button>
        </div>
      </div>

      <!-- Main Table Component -->
      <RegistrantsTable
        :registrants="registrationStore.registrants"
        :loading="registrationStore.loading"
        :column-visibility="columnVisibility"
        :sort-by="sortBy"
        :sort-order="sortOrder"
        :pagination="registrationStore.pagination"
        :current-page="currentPage"
        :per-page="perPage"
        :search-term="searchTerm"
        :recently-edited-id="recentlyEditedId"
        @sort="sortByColumn"
        @edit="editRegistrant"
        @delete="confirmDelete"
        @add="openAddModal"
        @go-to-page="goToPage"
        @change-per-page="changePerPage"
      />
    </div>

    <!-- Registrant Modal -->
    <RegistrantModal 
      ref="modalRef" 
      :is-open="isModalOpen" 
      :registrant="currentEditingRegistrant"
      :loading="registrationStore.loading" 
      @close="closeModal" 
      @submit="handleModalSubmit" 
    />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      :is-open="isDeleteDialogOpen"
      :title="deleteDialogTitle"
      :message="deleteDialogMessage"
      :loading="deleteLoading"
      type="danger"
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />

    <!-- Column Visibility Modal -->
    <ColumnVisibilityModal
      :is-open="isColumnModalOpen"
      :columns="availableColumns"
      :visibility="columnVisibility"
      @close="isColumnModalOpen = false"
      @update="updateColumnVisibility"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRegistrationStore } from '../../stores/registration'
import SearchBar from '../../components/SearchBar.vue'
import RegistrantsTable from '../../components/RegistrantsTable.vue'
import RegistrantModal from '../../components/RegistrantModal.vue'
import ConfirmationDialog from '../../components/ConfirmationDialog.vue'
import ColumnVisibilityModal from '../../components/ColumnVisibilityModal.vue'
import type { RegistrantForm, Registrant } from '../../stores/registration'
import type { TableColumn } from '../../components/ColumnVisibilityModal.vue'

const registrationStore = useRegistrationStore()

// Search and pagination state
const searchTerm = ref('')
const hasSearched = ref(false)
const sortBy = ref('created_at')
const sortOrder = ref<'asc' | 'desc'>('desc')
const currentPage = ref(1)
const perPage = ref(
  parseInt(localStorage.getItem('registrants_per_page') || '10')
)

// Modal state
const isModalOpen = ref(false)
const currentEditingRegistrant = ref<Registrant | null>(null)
const modalRef = ref<InstanceType<typeof RegistrantModal> | null>(null)

// Delete confirmation dialog state
const isDeleteDialogOpen = ref(false)
const registrantToDelete = ref<Registrant | null>(null)
const deleteLoading = ref(false)

// Recently edited highlight state
const recentlyEditedId = ref<number | null>(null)

// Column visibility state
const isColumnModalOpen = ref(false)
const availableColumns: TableColumn[] = [
  { key: 'first_name', label: 'First Name', description: 'Given name' },
  { key: 'last_name', label: 'Last Name', description: 'Family name' },
  { key: 'email', label: 'Email', description: 'Email address' },
  { key: 'mobile_number', label: 'Mobile Number', description: 'Phone number' },
  { key: 'created_at', label: 'Registration Date', description: 'When registered' },
  { key: 'updated_at', label: 'Last Updated', description: 'Last modification' },
  { key: 'actions', label: 'Actions', description: 'Edit/Delete buttons', required: true }
]

// Load column visibility from localStorage or set defaults
const getInitialVisibility = (): Record<string, boolean> => {
  const saved = localStorage.getItem('registrants_column_visibility')
  if (saved) {
    return JSON.parse(saved)
  }
  // Default: all columns visible
  const defaultVisibility: Record<string, boolean> = {}
  availableColumns.forEach(col => {
    defaultVisibility[col.key] = true
  })
  return defaultVisibility
}

const columnVisibility = ref<Record<string, boolean>>(getInitialVisibility())

// Computed properties
const deleteDialogTitle = computed(() => {
  return registrantToDelete.value 
    ? `Delete ${registrantToDelete.value.first_name} ${registrantToDelete.value.last_name}?`
    : 'Delete Registrant?'
})

const deleteDialogMessage = computed(() => {
  return registrantToDelete.value
    ? `Are you sure you want to delete ${registrantToDelete.value.first_name} ${registrantToDelete.value.last_name}? This action cannot be undone.`
    : 'Are you sure you want to delete this registrant? This action cannot be undone.'
})

// Search debouncing
let searchTimeout: number
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    loadRegistrants()
  }, 500)
}

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

// Updated search input handler to work with v-model
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

// Watch for searchTerm changes (since we're now using v-model)
watch(() => searchTerm.value, () => {
  onSearchInput()
})

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

const changePerPage = (newPerPage: number) => {
  perPage.value = newPerPage
  localStorage.setItem('registrants_per_page', newPerPage.toString())
  currentPage.value = 1 // Reset to first page when changing per page
  loadRegistrants()
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
    
    // Highlight the edited row
    if (result.success) {
      recentlyEditedId.value = currentEditingRegistrant.value.id
      closeModal()
      await loadRegistrants()
      
      // Auto-remove highlight after 4 seconds
      setTimeout(() => {
        recentlyEditedId.value = null
      }, 4000)
    }
  } else {
    result = await registrationStore.createRegistrant(formData)
    
    if (result.success) {
      closeModal()
      await loadRegistrants()
    }
  }

  if (!result.success && result.errors && modalRef.value) {
    modalRef.value.setErrors(result.errors)
  }
}

// Delete functionality
const confirmDelete = (registrant: Registrant) => {
  registrantToDelete.value = registrant
  isDeleteDialogOpen.value = true
}

const handleDeleteConfirm = async () => {
  if (!registrantToDelete.value) return

  deleteLoading.value = true
  
  try {
    const result = await registrationStore.deleteRegistrant(registrantToDelete.value.id)
    
    if (result.success) {
      // Check if we need to go to previous page
      if (registrationStore.registrants.length === 0 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1
      }
      await loadRegistrants()
      handleDeleteCancel() // Close dialog
    }
  } finally {
    deleteLoading.value = false
  }
}

const handleDeleteCancel = () => {
  isDeleteDialogOpen.value = false
  registrantToDelete.value = null
  deleteLoading.value = false
}

// Column visibility functions
const updateColumnVisibility = (newVisibility: Record<string, boolean>) => {
  columnVisibility.value = newVisibility
  localStorage.setItem('registrants_column_visibility', JSON.stringify(newVisibility))
}

onMounted(() => {
  loadRegistrants()
})
</script>