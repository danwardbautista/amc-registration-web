<template>
  <div id="app">
    <RouterView />

    <ToastContainer />
  </div>


</template>

<script setup lang="ts">
import ToastContainer from './components/ToastContainer.vue'
</script>