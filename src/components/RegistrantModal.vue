<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-400 transition-opacity" style="opacity: 0.3;" @click="closeModal"></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ isEditing ? 'Edit Registrant' : 'Add New Registrant' }}
            </h3>
            <button @click="closeModal"
              class="text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:text-gray-600 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <!-- Prefix -->
              <div>
                <label for="prefix" class="block text-sm font-medium text-gray-700 mb-1">
                  Prefix <span class="text-red-500">*</span>
                </label>
                <select id="prefix" v-model="selectedPrefixOption" @change="onPrefixChange"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.prefix }">
                  <option value="">Select prefix</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Other">Other</option>
                </select>

                <div v-if="selectedPrefixOption === 'Other'" class="mt-2">
                  <input id="custom_prefix" v-model="form.prefix" type="text" placeholder="Enter custom prefix"
                    maxlength="20"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.prefix }" />
                  <p v-if="errors.prefix" class="mt-1 text-sm text-red-600">
                    {{ errors.prefix[0] }}
                  </p>
                </div>
                <p v-else-if="errors.prefix" class="mt-1 text-sm text-red-600">
                  {{ errors.prefix[0] }}
                </p>
              </div>

              <!-- First Name -->
              <div>
                <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span class="text-red-500">*</span>
                </label>
                <input id="first_name" v-model="form.first_name" type="text" maxlength="100"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.first_name }"
                  placeholder="Enter first name" />
                <p v-if="errors.first_name" class="mt-1 text-sm text-red-600">
                  {{ errors.first_name[0] }}
                </p>
              </div>

              <!-- Last Name -->
              <div>
                <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span class="text-red-500">*</span>
                </label>
                <input id="last_name" v-model="form.last_name" type="text" maxlength="100"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.last_name }"
                  placeholder="Enter last name" />
                <p v-if="errors.last_name" class="mt-1 text-sm text-red-600">
                  {{ errors.last_name[0] }}
                </p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input id="email" v-model="form.email" type="email" maxlength="255"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.email }"
                  placeholder="Enter email address" />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                  {{ errors.email[0] }}
                </p>
              </div>

              <!-- Mobile Number -->
              <div>
                <label for="mobile_number" class="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span class="text-red-500">*</span>
                </label>
                <input id="mobile_number" v-model="form.mobile_number" type="tel" maxlength="20"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.mobile_number }"
                  placeholder="Enter mobile number" />
                <p v-if="errors.mobile_number" class="mt-1 text-sm text-red-600">
                  {{ errors.mobile_number[0] }}
                </p>
              </div>
            </div>

            <!-- Form Actions -->
            <div
              class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 pt-4 border-t border-gray-200">
              <button type="button" @click="closeModal" :disabled="loading"
                class="mt-3 sm:mt-0 w-full sm:w-auto inline-flex cursor-pointer justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="loading"
                class="w-full sm:w-auto inline-flex cursor-pointer justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
                {{ loading ? 'Saving...' : (isEditing ? 'Update Registrant' : 'Add Registrant') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import type { RegistrantForm, Registrant } from '../stores/registration'

interface Props {
  isOpen: boolean
  registrant?: Registrant | null
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: RegistrantForm): void
}

const props = withDefaults(defineProps<Props>(), {
  registrant: null,
  loading: false
})

const emit = defineEmits<Emits>()

const form = reactive<RegistrantForm>({
  prefix: '',
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: ''
})

const errors = ref<Record<string, string[]>>({})
const selectedPrefixOption = ref('')

const isEditing = computed(() => !!props.registrant)

const resetForm = () => {
  form.prefix = ''
  form.first_name = ''
  form.last_name = ''
  form.email = ''
  form.mobile_number = ''
  selectedPrefixOption.value = ''
  errors.value = {}
}

const populateForm = (registrant: Registrant) => {
  form.prefix = registrant.prefix || ''
  form.first_name = registrant.first_name
  form.last_name = registrant.last_name
  form.email = registrant.email
  form.mobile_number = registrant.mobile_number

  if (registrant.prefix) {
    if (['Mr', 'Ms', 'Mrs'].includes(registrant.prefix)) {
      selectedPrefixOption.value = registrant.prefix
    } else {
      selectedPrefixOption.value = 'Other'
    }
  } else {
    selectedPrefixOption.value = ''
  }
}

const onPrefixChange = () => {
  if (selectedPrefixOption.value === 'Other') {
    form.prefix = ''
  } else if (selectedPrefixOption.value === '') {
    form.prefix = ''
  } else {
    form.prefix = selectedPrefixOption.value
  }
}

const closeModal = () => {
  if (!props.loading) {
    resetForm()
    emit('close')
  }
}

const handleSubmit = () => {
  errors.value = {}

  const validationErrors = validateForm()

  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors
    return
  }

  emit('submit', { ...form })
}

const validateForm = (): Record<string, string[]> => {
  const validationErrors: Record<string, string[]> = {}

  // Prefix validation
  if (!form.prefix || !form.prefix.trim()) {
    validationErrors.prefix = ['The prefix field is required.']
  } else {
    if (form.prefix.length < 2) {
      validationErrors.prefix = ['The prefix must be at least 2 characters.']
    } else if (form.prefix.length > 20) {
      validationErrors.prefix = ['The prefix must not exceed 20 characters.']
    } else if (!/^[a-zA-ZÀ-ÿ.]+[a-zA-ZÀ-ÿ.\s]*[a-zA-ZÀ-ÿ.]$/.test(form.prefix)) {
      validationErrors.prefix = ['The prefix format is invalid.']
    } else if (/[.]{2,}/.test(form.prefix) || /[\s]{2,}/.test(form.prefix)) {
      validationErrors.prefix = ['The prefix format is invalid.']
    }
  }

  // First name validation
  if (!form.first_name || !form.first_name.trim()) {
    validationErrors.first_name = ['The first name field is required.']
  } else {
    if (form.first_name.length < 2) {
      validationErrors.first_name = ['The first name must be at least 2 characters.']
    } else if (form.first_name.length > 100) {
      validationErrors.first_name = ['The first name must not exceed 100 characters.']
    } else if (!/^[a-zA-ZÀ-ÿ]+[a-zA-ZÀ-ÿ\s\'-]*[a-zA-ZÀ-ÿ]$/.test(form.first_name)) {
      validationErrors.first_name = ['The first name format is invalid.']
    } else if (/[\s]{2,}/.test(form.first_name) || /[\-]{2,}/.test(form.first_name) || /[\'][\']/.test(form.first_name)) {
      validationErrors.first_name = ['The first name format is invalid.']
    }
  }

  // Last name validation
  if (!form.last_name || !form.last_name.trim()) {
    validationErrors.last_name = ['The last name field is required.']
  } else {
    if (form.last_name.length < 2) {
      validationErrors.last_name = ['The last name must be at least 2 characters.']
    } else if (form.last_name.length > 100) {
      validationErrors.last_name = ['The last name must not exceed 100 characters.']
    } else if (!/^[a-zA-ZÀ-ÿ]+[a-zA-ZÀ-ÿ\s\'-]*[a-zA-ZÀ-ÿ]$/.test(form.last_name)) {
      validationErrors.last_name = ['The last name format is invalid.']
    } else if (/[\s]{2,}/.test(form.last_name) || /[\-]{2,}/.test(form.last_name) || /[\'][\']/.test(form.last_name)) {
      validationErrors.last_name = ['The last name format is invalid.']
    }
  }

  // Email validation
  if (!form.email || !form.email.trim()) {
    validationErrors.email = ['The email field is required.']
  } else {
    if (form.email.length < 5) {
      validationErrors.email = ['The email must be at least 5 characters.']
    } else if (form.email.length > 255) {
      validationErrors.email = ['The email must not exceed 255 characters.']
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = ['Please enter a valid email address.']
    }
  }

  // Mobile number validation
  if (!form.mobile_number || !form.mobile_number.trim()) {
    validationErrors.mobile_number = ['The mobile number field is required.']
  } else {
    if (form.mobile_number.length < 7) {
      validationErrors.mobile_number = ['The mobile number must be at least 7 characters.']
    } else if (form.mobile_number.length > 20) {
      validationErrors.mobile_number = ['The mobile number must not exceed 20 characters.']
    } else if (!/^(\+?[1-9]\d{0,3})?[\s\-\(\)]?[1-9][\d\s\-\(\)]*\d$/.test(form.mobile_number)) {
      validationErrors.mobile_number = ['The mobile number format is invalid.']
    } else {
      const cleaned = form.mobile_number.replace(/[^\+0-9]/g, '')
      const digitCount = cleaned.replace(/[^\d]/g, '').length
      
      if (digitCount < 7) {
        validationErrors.mobile_number = ['The mobile number must contain at least 7 digits.']
      } else if (/^[\+\-\s\(\)]+$/.test(form.mobile_number) ||
                 /[\+]{2,}/.test(form.mobile_number) ||
                 /[\-]{3,}/.test(form.mobile_number) ||
                 /[\s]{3,}/.test(form.mobile_number) ||
                 /[\(\)]{3,}/.test(form.mobile_number) ||
                 /\+.*\+/.test(form.mobile_number)) {
        validationErrors.mobile_number = ['The mobile number format is invalid.']
      }
    }
  }

  return validationErrors
}

watch(() => props.registrant, (newRegistrant) => {
  if (newRegistrant) {
    populateForm(newRegistrant)
  } else {
    resetForm()
  }
}, { immediate: true })

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && !props.registrant) {
    resetForm()
  }
})

const setErrors = (newErrors: Record<string, string[]>) => {
  errors.value = newErrors
}

defineExpose({ setErrors })
</script>