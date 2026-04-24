<script setup>
import { onMounted } from 'vue'
import { setupPreconnects, observePerformanceMetrics } from '@/utils/performanceOptimization.js'

// Initialize performance optimizations
onMounted(() => {
  // Add preconnect links for external resources
  setupPreconnects()

  // Track Core Web Vitals in development
  if (import.meta.env.DEV) {
    observePerformanceMetrics()
  }
})
</script>

<template>
  <div id="app" class="w-full min-h-svh md:min-h-screen bg-white">
    <router-view />
  </div>
</template>

<style>
html {
  background-color: white;
}
</style>