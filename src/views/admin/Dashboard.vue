<template>
  <div>
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Dashboard Section!</h1>
      <p class="text-gray-600">This is a simple dashboard.</p>
      
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-200 p-4 rounded-lg">
          <h3 class="font-semibold text-blue-800">Total Attendees</h3>
          <p class="text-2xl font-bold text-blue-900">150</p>
        </div>
        
        <div class="bg-red-100 p-4 rounded-lg">
          <h3 class="font-semibold text-red-800">Registrants</h3>
          <p class="text-2xl font-bold text-red-900">75</p>
        </div>
        
        <div class="bg-purple-100 p-4 rounded-lg">
          <h3 class="font-semibold text-purple-800">Events</h3>
          <p class="text-2xl font-bold text-purple-900">23</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple dashboard
</script>