<!-- /src/components/TableHeader.vue -->
<template>
  <thead class="bg-gray-50">
    <tr>
      <th 
        v-for="column in visibleColumns" 
        :key="column.key"
        class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
      >
        <button 
          v-if="column.sortable !== false"
          @click="$emit('sort', column.key)"
          class="flex items-center space-x-1 hover:text-gray-700 cursor-pointer"
        >
          <span>{{ column.label }}</span>
          <svg 
            v-if="sortBy === column.key" 
            class="h-4 w-4" 
            fill="none" 
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              v-if="sortOrder === 'asc'" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M5 15l7-7 7 7" 
            />
            <path 
              v-else 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
        <span v-else>{{ column.label }}</span>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: TableColumn[]
  columnVisibility: Record<string, boolean>
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface Emits {
  (e: 'sort', column: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const visibleColumns = computed(() => {
  return props.columns.filter(column => props.columnVisibility[column.key])
})
</script>

<script lang="ts">
import { computed } from 'vue'
</script>