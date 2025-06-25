<!-- /src/components/RegistrantRow.vue -->
<template>
  <!-- Desktop Table Row -->
  <tr 
    v-if="!isMobile"
    :class="[
      'transition-all duration-300',
      isRecentlyEdited 
        ? 'ring-2 ring-green-400 bg-green-50 shadow-sm' 
        : 'hover:bg-gray-50'
    ]"
  >
    <!-- First Name Col -->
    <td v-if="columnVisibility.first_name" class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm font-semibold text-gray-900">
        {{ registrant.first_name }}
      </div>
      <div class="text-sm text-gray-500">
        {{ registrant.prefix }}
      </div>
    </td>

    <!-- Last Name Col -->
    <td v-if="columnVisibility.last_name" class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm font-semibold text-gray-900">
        {{ registrant.last_name }}
      </div>
      <div class="text-sm text-gray-500">
        ID: {{ registrant.id }}
      </div>
    </td>

    <!-- Email Col -->
    <td v-if="columnVisibility.email" class="px-6 py-4 whitespace-nowrap">
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
    <td v-if="columnVisibility.mobile_number" class="px-6 py-4 whitespace-nowrap">
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
    <td v-if="columnVisibility.created_at" class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ formatDateTime(registrant.created_at) }}
      </div>
      <div class="text-sm text-gray-500">
        {{ formatTimeAgo(registrant.created_at) }}
      </div>
    </td>

    <!-- Last Updated Col -->
    <td v-if="columnVisibility.updated_at" class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ formatDateTime(registrant.updated_at) }}
      </div>
      <div class="text-sm text-gray-500">
        {{ formatTimeAgo(registrant.updated_at) }}
      </div>
    </td>

    <!-- Actions Col -->
    <td v-if="columnVisibility.actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div class="flex items-center space-x-2">
        <button 
          @click="$emit('edit', registrant.id)"
          class="inline-flex items-center px-3 py-1.5 border border-indigo-300 rounded-md text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer"
        >
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button 
          @click="$emit('delete', registrant)"
          class="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors cursor-pointer"
        >
          <svg class="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </td>
  </tr>

  <!-- Mobile Card Layout -->
  <tr v-else class="block border-b border-gray-200">
    <td class="block px-4 py-4">
      <div 
        :class="[
          'bg-white rounded-lg border transition-all duration-300 p-4',
          isRecentlyEdited 
            ? 'border-green-400 bg-green-50 shadow-sm' 
            : 'border-gray-200 hover:shadow-md'
        ]"
      >
        <!-- Header with name and ID -->
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="flex items-center space-x-2">
              <span v-if="registrant.prefix" class="text-sm text-gray-500">{{ registrant.prefix }}</span>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ registrant.first_name }} {{ registrant.last_name }}
              </h3>
            </div>
            <p class="text-sm text-gray-500">ID: {{ registrant.id }}</p>
          </div>
          
          <!-- Mobile Actions -->
          <div class="flex space-x-2">
            <button 
              @click="$emit('edit', registrant.id)"
              class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer"
              title="Edit"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              @click="$emit('delete', registrant)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              title="Delete"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-2 mb-3">
          <div v-if="columnVisibility.email" class="flex items-center text-sm text-gray-600">
            <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a :href="`mailto:${registrant.email}`" class="hover:text-indigo-600 transition-colors">
              {{ registrant.email }}
            </a>
          </div>
          
          <div v-if="columnVisibility.mobile_number" class="flex items-center text-sm text-gray-600">
            <svg class="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a :href="`tel:${registrant.mobile_number}`" class="hover:text-indigo-600 transition-colors">
              {{ registrant.mobile_number }}
            </a>
          </div>
        </div>

        <!-- Timestamps -->
        <div class="text-xs text-gray-500 space-y-1">
          <div v-if="columnVisibility.created_at">
            <span class="font-medium">Registered:</span> {{ formatDateTime(registrant.created_at) }}
          </div>
          <div v-if="columnVisibility.updated_at">
            <span class="font-medium">Updated:</span> {{ formatDateTime(registrant.updated_at) }}
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { Registrant } from '../stores/registration'

interface Props {
  registrant: Registrant
  columnVisibility: Record<string, boolean>
  isRecentlyEdited?: boolean
}

interface Emits {
  (e: 'edit', id: number): void
  (e: 'delete', registrant: Registrant): void
}

defineProps<Props>()
defineEmits<Emits>()

// Mobile detection
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

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
</script>