<!-- /src/components/TablePagination.vue -->
<template>
  <div class="bg-white px-6 py-4 border-t border-gray-200">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <!-- Results info -->
        <div class="flex items-center text-sm text-gray-700">
          <span>
            Showing {{ pagination.from }} to {{ pagination.to }}
            of {{ pagination.total }} results
          </span>
        </div>
        
        <!-- Per page selector -->
        <div class="flex items-center space-x-2">
          <label for="per-page" class="text-sm text-gray-700">Show:</label>
          <select 
            id="per-page"
            :value="perPage" 
            @change="$emit('change-per-page', parseInt(($event.target as HTMLSelectElement).value))"
            class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            <option 
              v-for="option in perPageOptions" 
              :key="option" 
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <span class="text-sm text-gray-700">per page</span>
        </div>
      </div>
      
      <!-- Pagination controls -->
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('go-to-page', currentPage - 1)" 
          :disabled="currentPage <= 1" 
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage <= 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'
          ]"
        >
          Previous
        </button>

        <template v-for="page in paginationPages" :key="page">
          <button 
            v-if="page !== '...'" 
            @click="$emit('go-to-page', page as number)" 
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer',
              page === currentPage
                ? 'bg-emerald-500 text-white'
                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
        </template>

        <button 
          @click="$emit('go-to-page', currentPage + 1)"
          :disabled="currentPage >= pagination.last_page" 
          :class="[
            'px-3 py-2 rounded-md text-sm font-medium transition-colors',
            currentPage >= pagination.last_page
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300 cursor-pointer'
          ]"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PaginatedResponse } from '../stores/registration'

interface Props {
  pagination: PaginatedResponse
  currentPage: number
  perPage: number
  perPageOptions?: number[]
}

interface Emits {
  (e: 'go-to-page', page: number): void
  (e: 'change-per-page', perPage: number): void
}

const props = withDefaults(defineProps<Props>(), {
  perPageOptions: () => [10, 20, 50]
})

defineEmits<Emits>()

const paginationPages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.currentPage
  const total = props.pagination.last_page

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
</script>