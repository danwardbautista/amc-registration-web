<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Left side -->
        <div class="flex-1 relative bg-gradient-to-br from-indigo-900 to-indigo-800 min-h-[30vh] lg:min-h-screen">
            <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
                style="background-image: url('/images/bg2k.webp')"></div>
            <div
                class="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-12 text-white justify-center lg:justify-start">
                <div class="max-w-md mx-auto lg:mx-0">
                    <div class="flex items-center justify-center space-x-3 transition-opacity duration-300">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 flex-shrink-0 touch-manipulation">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex flex-col text-left">
                            <span class="text-xl sm:text-2xl font-black text-white tracking-wide">AMC</span>
                            <span
                                class="text-lg sm:text-xl font-medium text-emerald-300 -mt-1 tracking-widest">REGISTRATION</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right side -->
        <div class="flex-1 bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-[70vh] lg:min-h-screen">
            <div class="w-full max-w-md">
                <div class="text-center mb-6 sm:mb-8">
                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back, friend!</h2>
                    <p class="text-sm sm:text-base text-gray-600">Use your account to continue</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input id="email" v-model="form.email" type="email" autocomplete="email" inputmode="email"
                            class="w-full px-3 py-3 sm:py-4 text-base border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors touch-manipulation"
                            placeholder="you@example.com" />
                        <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email[0] }}</p>
                    </div>


                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input id="password" v-model="form.password" type="password" autocomplete="current-password"
                            class="w-full px-3 py-3 sm:py-4 text-base border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors touch-manipulation"
                            placeholder="••••••" />
                        <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password[0] }}</p>
                    </div>


                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-indigo-600 text-white py-3 sm:py-4 px-4 rounded-lg font-medium text-base hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:bg-indigo-800 min-h-[48px]">
                        <span v-if="isLoading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Loading...
                        </span>
                        <span v-else>Login</span>
                    </button>
                </form>

                <div class="mt-6 sm:mt-8 text-center">
                    <p class="text-sm sm:text-base text-gray-600">
                        Lost your account?
                        <a href="https://amcasia.com/contact/" target="_blank"
                            class="text-indigo-600 hover:text-indigo-500 active:text-indigo-700 font-medium transition-colors touch-manipulation underline">
                            Contact our office
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

interface LoginForm {
  email: string
  password: string
}

interface ValidationErrors {
  email?: string[]
  password?: string[]
}

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const isLoading = ref(false)
const errors = ref<ValidationErrors>({})
const router = useRouter()
const auth = useAuthStore()

const validateForm = (): boolean => {
  errors.value = {}

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  let valid = true

  if (!form.email) {
    errors.value.email = ['Email is required.']
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.value.email = ['Invalid email format.']
    valid = false
  }

  if (!form.password) {
    errors.value.password = ['Password is required.']
    valid = false
  }

  return valid
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errors.value = {}

  try {
    const { success, errors: loginErrors } = await auth.login(form.email, form.password)

    if (!success) {
      errors.value = loginErrors
      return
    }

    router.push({ name: 'dashboard' })
  } catch (err) {
    console.error('Login failed:', err)
    errors.value.email = ['An unexpected error occurred.']
  } finally {
    isLoading.value = false
  }
}
</script>



<style scoped>
@media (max-width: 768px) {

    input,
    button,
    a {
        min-height: 44px;
    }
}

@supports (-webkit-touch-callout: none) {

    input[type="email"],
    input[type="password"] {
        font-size: 16px;
    }
}

input:focus {
    transform: none;
    box-shadow: 0 0 0 2px rgb(99 102 241 / 0.2);
}

button:active {
    transform: translateY(1px);
}
</style>