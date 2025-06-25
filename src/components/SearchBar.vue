<!-- /src/components/SearchBar.vue -->
<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex-1 max-w-full sm:max-w-md">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          :value="modelValue" 
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          @keypress.enter="$emit('search')" 
          type="text"
          :placeholder="placeholder"
          class="block w-full pl-9 pr-9 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
        />
        <button 
          v-if="modelValue && hasSearched" 
          @click="$emit('clear')"
          class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
        >
          <div class="bg-red-500 hover:bg-red-600 rounded p-1 transition-colors">
            <svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </div>
    </div>
    <button 
      @click="$emit('add')"
      class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 sm:py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
    >
      <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {{ addButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  hasSearched: boolean
  placeholder?: string
  addButtonText?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
  (e: 'clear'): void
  (e: 'add'): void
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  addButtonText: 'Add'
})

defineEmits<Emits>()
</script>