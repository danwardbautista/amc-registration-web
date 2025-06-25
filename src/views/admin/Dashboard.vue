<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Today's Registrations -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">TODAY'S REGISTRATIONS</p>
            <p class="text-3xl font-bold text-gray-900">{{ todaysRegistrations }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm font-medium text-green-600">+55%</span>
          <span class="text-sm text-gray-500 ml-2">since yesterday</span>
        </div>
      </div>

      <!-- Active Users -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">ACTIVE USERS</p>
            <p class="text-3xl font-bold text-gray-900">{{ activeUsers }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm font-medium text-green-600">+3%</span>
          <span class="text-sm text-gray-500 ml-2">since last week</span>
        </div>
      </div>

      <!-- New Registrations -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">NEW REGISTRATIONS</p>
            <p class="text-3xl font-bold text-gray-900">+{{ newRegistrations }}</p>
          </div>
          <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm font-medium text-red-600">-2%</span>
          <span class="text-sm text-gray-500 ml-2">since last quarter</span>
        </div>
      </div>

      <!-- Web Traffic -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">WEB TRAFFIC</p>
            <p class="text-3xl font-bold text-gray-900">{{ webTraffic.toLocaleString() }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div class="flex items-center">
          <span class="text-sm font-medium text-green-600">+5%</span>
          <span class="text-sm text-gray-500 ml-2">than last month</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Registration Overview Chart -->
      <div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Registration Overview</h3>
            <p class="text-sm text-gray-500 mt-1">4% more in 2024</p>
          </div>
        </div>
        
        <!-- Chart Container -->
        <div class="relative h-64">
          <svg class="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <!-- Grid lines -->
            <defs>
              <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <path d="M 0 180 Q 100 120 200 140 T 400 80 T 600 60 T 800 40" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  stroke-width="3"/>
            
            <path d="M 0 180 Q 100 120 200 140 T 400 80 T 600 60 T 800 40 L 800 200 L 0 200 Z" 
                  fill="url(#areaGradient)" 
                  opacity="0.3"/>
            
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.1" />
              </linearGradient>
            </defs>
          </svg>
          
          <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>

      <!-- Registrants by Country -->
      <div class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Registrants by Country</h3>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-8 h-6 rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                🇺🇸
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Country:</p>
                <p class="text-base font-semibold text-gray-900">United States</p>
              </div>
            </div>
            <div class="text-right space-x-8 flex">
              <div>
                <p class="text-sm font-medium text-gray-500">Registrants:</p>
                <p class="text-base font-semibold text-gray-900">2,500</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Web Traffic:</p>
                <p class="text-base font-semibold text-gray-900">230,900</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Bounce:</p>
                <p class="text-base font-semibold text-gray-900">29.9%</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-8 h-6 rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                🇩🇪
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Country:</p>
                <p class="text-base font-semibold text-gray-900">Germany</p>
              </div>
            </div>
            <div class="text-right space-x-8 flex">
              <div>
                <p class="text-sm font-medium text-gray-500">Registrants:</p>
                <p class="text-base font-semibold text-gray-900">3,900</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Web Traffic:</p>
                <p class="text-base font-semibold text-gray-900">440,000</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Bounce:</p>
                <p class="text-base font-semibold text-gray-900">40.22%</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-8 h-6 rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                🇬🇧
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Country:</p>
                <p class="text-base font-semibold text-gray-900">Great Britain</p>
              </div>
            </div>
            <div class="text-right space-x-8 flex">
              <div>
                <p class="text-sm font-medium text-gray-500">Registrants:</p>
                <p class="text-base font-semibold text-gray-900">1,400</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Web Traffic:</p>
                <p class="text-base font-semibold text-gray-900">190,700</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Bounce:</p>
                <p class="text-base font-semibold text-gray-900">23.44%</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-8 h-6 rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                🇧🇷
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Country:</p>
                <p class="text-base font-semibold text-gray-900">Brazil</p>
              </div>
            </div>
            <div class="text-right space-x-8 flex">
              <div>
                <p class="text-sm font-medium text-gray-500">Registrants:</p>
                <p class="text-base font-semibold text-gray-900">562</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Web Traffic:</p>
                <p class="text-base font-semibold text-gray-900">143,960</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Bounce:</p>
                <p class="text-base font-semibold text-gray-900">32.14%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Daily Web Traffic</h3>
            <p class="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>
        </div>
        
        <div class="relative h-48">
          <svg class="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
            <rect x="20" y="120" width="25" height="20" fill="#8b5cf6" rx="2"/>
            <rect x="55" y="100" width="25" height="40" fill="#8b5cf6" rx="2"/>
            <rect x="90" y="80" width="25" height="60" fill="#8b5cf6" rx="2"/>
            <rect x="125" y="60" width="25" height="80" fill="#8b5cf6" rx="2"/>
            <rect x="160" y="40" width="25" height="100" fill="#8b5cf6" rx="2"/>
            <rect x="195" y="70" width="25" height="70" fill="#8b5cf6" rx="2"/>
            <rect x="230" y="90" width="25" height="50" fill="#8b5cf6" rx="2"/>
          </svg>
          
          <!-- Day labels -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold text-gray-900">12,547</p>
          <p class="text-sm text-gray-500">Average daily visits</p>
        </div>
      </div>

      <!-- Bounce Rate Trend -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Bounce Rate Trend</h3>
            <p class="text-sm text-gray-500 mt-1">Weekly average</p>
          </div>
        </div>
        
        <div class="relative h-48">
          <svg class="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
            <path d="M 20 100 L 60 80 L 100 120 L 140 90 L 180 70 L 220 110 L 260 85" 
                  fill="none" 
                  stroke="#ef4444" 
                  stroke-width="3"
                  stroke-linecap="round"/>
            
            <!-- Data points -->
            <circle cx="20" cy="100" r="4" fill="#ef4444"/>
            <circle cx="60" cy="80" r="4" fill="#ef4444"/>
            <circle cx="100" cy="120" r="4" fill="#ef4444"/>
            <circle cx="140" cy="90" r="4" fill="#ef4444"/>
            <circle cx="180" cy="70" r="4" fill="#ef4444"/>
            <circle cx="220" cy="110" r="4" fill="#ef4444"/>
            <circle cx="260" cy="85" r="4" fill="#ef4444"/>
          </svg>
          
          <!-- Week labels -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
            <span>W5</span>
            <span>W6</span>
            <span>W7</span>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold text-gray-900">31.2%</p>
          <p class="text-sm text-gray-500">Current bounce rate</p>
        </div>
      </div>

      <!-- Registration Conversion -->
      <div class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Registration Conversion</h3>
            <p class="text-sm text-gray-500 mt-1">Visitor to registration</p>
          </div>
        </div>
        
        <div class="relative h-48 flex items-center justify-center">
          <!-- Donut Chart -->
          <svg class="w-32 h-32" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle cx="50" cy="50" r="35" fill="none" stroke="#f3f4f6" stroke-width="10"/>
            <!-- Progress circle -->
            <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" stroke-width="10"
                    stroke-dasharray="154.9" stroke-dashoffset="108.43"
                    transform="rotate(-90 50 50)" stroke-linecap="round"/>
          </svg>
          
          <!-- Center text -->
          <div class="absolute inset-0 flex items-center justify-center flex-col">
            <p class="text-2xl font-bold text-gray-900">21%</p>
            <p class="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        <div class="mt-4 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Visitors</span>
            <span class="font-medium text-gray-900">45,230</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Registrations</span>
            <span class="font-medium text-gray-900">9,498</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Stats data
const todaysRegistrations = ref(53)
const activeUsers = ref(2300)
const newRegistrations = ref(3462)
const webTraffic = ref(103430)
</script>