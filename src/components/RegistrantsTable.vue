<!-- /src/components/RegistrantsTable.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-16">
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

    <!-- Table Content -->
    <div v-else-if="registrants.length > 0">
      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <TableHeader
            :columns="tableColumns"
            :column-visibility="columnVisibility"
            :sort-by="sortBy"
            :sort-order="sortOrder"
            @sort="$emit('sort', $event)"
          />
          <tbody class="bg-white divide-y divide-gray-200">
            <RegistrantRow
              v-for="registrant in registrants"
              :key="registrant.id"
              :registrant="registrant"
              :column-visibility="columnVisibility"
              :is-recently-edited="recentlyEditedId === registrant.id"
              @edit="$emit('edit', $event)"
              @delete="$emit('delete', $event)"
            />
          </tbody>
        </table>
      </div>

      <!-- Mobile List View -->
      <div class="md:hidden">
        <!-- Mobile Sort Controls -->
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Sort by:</span>
            <select 
              :value="`${sortBy}-${sortOrder}`"
              @change="handleMobileSort"
              class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            >
              <option value="created_at-desc">Newest First</option>
              <option value="created_at-asc">Oldest First</option>
              <option value="first_name-asc">Name A-Z</option>
              <option value="first_name-desc">Name Z-A</option>
              <option value="email-asc">Email A-Z</option>
              <option value="email-desc">Email Z-A</option>
            </select>
          </div>
        </div>

        <!-- Mobile Cards -->
        <div class="divide-y divide-gray-200">
          <RegistrantRow
            v-for="registrant in registrants"
            :key="registrant.id"
            :registrant="registrant"
            :column-visibility="columnVisibility"
            :is-recently-edited="recentlyEditedId === registrant.id"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
          />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <TableEmptyState
      v-else
      :title="emptyTitle"
      :description="emptyDescription"
      :add-button-text="emptyAddButtonText"
      @add="$emit('add')"
    />

    <!-- Pagination -->
    <TablePagination
      v-if="pagination && pagination.total > 0"
      :pagination="pagination"
      :current-page="currentPage"
      :per-page="perPage"
      @go-to-page="$emit('go-to-page', $event)"
      @change-per-page="$emit('change-per-page', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TableHeader from './TableHeader.vue'
import RegistrantRow from './RegistrantRow.vue'
import TableEmptyState from './TableEmptyState.vue'
import TablePagination from './TablePagination.vue'
import type { Registrant, PaginatedResponse } from '../stores/registration'
import type { TableColumn } from './TableHeader.vue'

interface Props {
  registrants: Registrant[]
  loading: boolean
  columnVisibility: Record<string, boolean>
  sortBy: string
  sortOrder: 'asc' | 'desc'
  pagination?: PaginatedResponse | null
  currentPage: number
  perPage: number
  searchTerm?: string
  recentlyEditedId?: number | null
}

interface Emits {
  (e: 'sort', column: string): void
  (e: 'edit', id: number): void
  (e: 'delete', registrant: Registrant): void
  (e: 'add'): void
  (e: 'go-to-page', page: number): void
  (e: 'change-per-page', perPage: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tableColumns: TableColumn[] = [
  { key: 'first_name', label: 'First Name', sortable: true },
  { key: 'last_name', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'mobile_number', label: 'Mobile Number', sortable: true },
  { key: 'created_at', label: 'Registration Date', sortable: true },
  { key: 'updated_at', label: 'Last Updated', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
]

const emptyTitle = computed(() => {
  return 'No registrants found'
})

const emptyDescription = computed(() => {
  return props.searchTerm 
    ? 'Try adjusting your search criteria' 
    : 'Get started by creating your first registrant'
})

const emptyAddButtonText = computed(() => {
  return props.searchTerm ? 'Add Registrant' : 'Add First Registrant'
})

const handleMobileSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  const [column, order] = value.split('-')
  
  // First emit sort for column to set it
  emit('sort', column)
  
  // Then emit again if order doesn't match to flip it
  setTimeout(() => {
    if (props.sortOrder !== order) {
      emit('sort', column)
    }
  }, 0)
}
</script>