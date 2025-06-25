<template>
  <div class="min-h-screen bg-gray-50 p-2 sm:p-4">

    <!-- Settings Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
      
      <!-- Registration Settings -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8 border border-gray-100">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Registration Settings</h3>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <!-- Auto-approve registrations -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Auto-approve registrations</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Automatically approve new user registrations</p>
            </div>
            <button 
              @click="toggleAutoApprove"
              :class="autoApprove ? 'bg-purple-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="autoApprove ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Require email verification -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Require email verification</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Users must verify their email before activation</p>
            </div>
            <button 
              @click="toggleEmailVerification"
              :class="emailVerification ? 'bg-purple-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="emailVerification ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Maximum registrations per day -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Maximum registrations per day</label>
            <input 
              v-model="maxRegistrationsPerDay"
              type="number"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter limit"
            >
          </div>

          <!-- Required fields -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2 sm:mb-3">Required fields</label>
            <div class="space-y-2 sm:space-y-3">
              <label class="flex items-center">
                <input v-model="requiredFields.prefix" type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4">
                <span class="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">Prefix (Mr., Ms., Dr.)</span>
              </label>
              <label class="flex items-center">
                <input v-model="requiredFields.firstName" type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4" checked disabled>
                <span class="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">First Name (Required)</span>
              </label>
              <label class="flex items-center">
                <input v-model="requiredFields.lastName" type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4" checked disabled>
                <span class="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">Last Name (Required)</span>
              </label>
              <label class="flex items-center">
                <input v-model="requiredFields.mobile" type="checkbox" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4">
                <span class="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">Mobile Number</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8 border border-gray-100">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-5a7.81 7.81 0 0 1 5-1.84V17z M8 12H3l5-5 5 5H8v5a7.81 7.81 0 0 0 5 1.84V12z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Notifications</h3>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <!-- Email notifications -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Email notifications</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Receive email alerts for new registrations</p>
            </div>
            <button 
              @click="toggleEmailNotifications"
              :class="emailNotifications ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="emailNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Admin email address -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Admin email address</label>
            <input 
              v-model="adminEmail"
              type="email"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
            >
          </div>

          <!-- Notification frequency -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Notification frequency</label>
            <select 
              v-model="notificationFrequency"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="instant">Instant</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <!-- Slack notifications -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Slack notifications</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Send alerts to Slack channel</p>
            </div>
            <button 
              @click="toggleSlackNotifications"
              :class="slackNotifications ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="slackNotifications ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Analytics Settings -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8 border border-gray-100">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Analytics & Tracking</h3>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <!-- Google Analytics -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Google Analytics tracking</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Track registration funnel and conversions</p>
            </div>
            <button 
              @click="toggleGoogleAnalytics"
              :class="googleAnalytics ? 'bg-orange-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="googleAnalytics ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- GA Tracking ID -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Google Analytics Tracking ID</label>
            <input 
              v-model="gaTrackingId"
              type="text"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="GA-XXXXXXXXX-X"
            >
          </div>

          <!-- Data retention -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Data retention period</label>
            <select 
              v-model="dataRetention"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">6 months</option>
              <option value="365">1 year</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>

          <!-- Export settings -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Allow data export</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Enable CSV/Excel export of registration data</p>
            </div>
            <button 
              @click="toggleDataExport"
              :class="dataExport ? 'bg-orange-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="dataExport ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8 border border-gray-100">
        <div class="flex items-center mb-4 sm:mb-6">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Security & Privacy</h3>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Enable CAPTCHA</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Prevent spam registrations with CAPTCHA</p>
            </div>
            <button 
              @click="toggleCaptcha"
              :class="captcha ? 'bg-red-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="captcha ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Rate limiting -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 mb-2">Rate limiting (requests per minute)</label>
            <input 
              v-model="rateLimit"
              type="number"
              class="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="60"
            >
          </div>

          <!-- IP blocking -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Auto-block suspicious IPs</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Automatically block IPs with suspicious activity</p>
            </div>
            <button 
              @click="toggleIpBlocking"
              :class="ipBlocking ? 'bg-red-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="ipBlocking ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Data encryption -->
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900">Encrypt personal data</h4>
              <p class="text-xs sm:text-sm text-gray-500 mt-1">Encrypt sensitive registration data at rest</p>
            </div>
            <button 
              @click="toggleDataEncryption"
              :class="dataEncryption ? 'bg-red-600' : 'bg-gray-200'"
              class="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span 
                :class="dataEncryption ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Registration Settings
const autoApprove = ref(true)
const emailVerification = ref(false)
const maxRegistrationsPerDay = ref(1000)
const requiredFields = ref({
  prefix: true,
  firstName: true,
  lastName: true,
  mobile: true
})

// Notification Settings
const emailNotifications = ref(true)
const adminEmail = ref('owner@danwardbautista.com')
const notificationFrequency = ref('instant')
const slackNotifications = ref(false)

// Analytics Settings
const googleAnalytics = ref(true)
const gaTrackingId = ref('GA-123456789-1')
const dataRetention = ref('365')
const dataExport = ref(true)

// Security Settings
const captcha = ref(true)
const rateLimit = ref(60)
const ipBlocking = ref(true)
const dataEncryption = ref(true)

// UI State

const toggleAutoApprove = () => autoApprove.value = !autoApprove.value
const toggleEmailVerification = () => emailVerification.value = !emailVerification.value
const toggleEmailNotifications = () => emailNotifications.value = !emailNotifications.value
const toggleSlackNotifications = () => slackNotifications.value = !slackNotifications.value
const toggleGoogleAnalytics = () => googleAnalytics.value = !googleAnalytics.value
const toggleDataExport = () => dataExport.value = !dataExport.value
const toggleCaptcha = () => captcha.value = !captcha.value
const toggleIpBlocking = () => ipBlocking.value = !ipBlocking.value
const toggleDataEncryption = () => dataEncryption.value = !dataEncryption.value
</script>