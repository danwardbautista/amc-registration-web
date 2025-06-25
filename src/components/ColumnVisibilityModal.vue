<!-- /src/components/ColumnVisibilityModal.vue -->
<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[60] flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background overlay -->
      <div 
        class="absolute inset-0 bg-gray-400 transition-opacity" 
        style="opacity: 0.3;"
        @click="closeModal"
      ></div>

      <!-- Modal Content -->
      <div 
        class="relative bg-white rounded-lg shadow-xl max-w-md w-full"
        @click.stop
      >
        <!-- Header -->
        <div class="p-6 pb-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900" id="modal-title">
              Edit Columns
            </h3>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors cursor-pointer"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mb-6">
            Select which columns to show or hide in the table.
          </p>
        </div>

        <!-- Column Checkboxes -->
        <div class="px-6 pb-4 max-h-96 overflow-y-auto">
          <div class="space-y-3">
            <div 
              v-for="column in columns" 
              :key="column.key"
              class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <input
                  :id="`column-${column.key}`"
                  v-model="localVisibility[column.key]"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                />
                <label 
                  :for="`column-${column.key}`" 
                  class="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {{ column.label }}
                </label>
              </div>
              
              <!-- Optional: Show column type or description -->
              <div v-if="column.description" class="text-xs text-gray-400">
                {{ column.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="bg-gray-50 px-6 py-4 rounded-b-lg">
          <div class="flex items-center justify-between">
            <!-- Reset to defaults -->
            <button
              @click="resetToDefaults"
              class="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              Reset to defaults
            </button>
            
            <!-- Action buttons -->
            <div class="flex space-x-3">
              <button
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                @click="applyChanges"
                class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export interface TableColumn {
  key: string
  label: string
  description?: string
  required?: boolean // Some columns req
}

export interface ColumnVisibilityModalProps {
  isOpen: boolean
  columns: TableColumn[]
  visibility: Record<string, boolean>
}

const props = defineProps<ColumnVisibilityModalProps>()

const emit = defineEmits<{
  close: []
  update: [visibility: Record<string, boolean>]
}>()

// Local state for the checkboxes
const localVisibility = ref<Record<string, boolean>>({})

// Watch for changes in visibility prop to update local state
watch(() => props.visibility, (newVisibility) => {
  localVisibility.value = { ...newVisibility }
}, { immediate: true })

// Watch for modal opening to reset local state
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    localVisibility.value = { ...props.visibility }
  }
})

const closeModal = () => {
  emit('close')
}

const applyChanges = () => {
  emit('update', { ...localVisibility.value })
  emit('close')
}

const resetToDefaults = () => {
  // Reset all columns to visible (default state)
  const defaultVisibility: Record<string, boolean> = {}
  props.columns.forEach(column => {
    defaultVisibility[column.key] = true
  })
  localVisibility.value = defaultVisibility
}
</script>