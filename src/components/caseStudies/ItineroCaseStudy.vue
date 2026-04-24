<script setup>
/**
 * ItineroCaseStudy Component
 * Displays the Itinero travel app UX/UI case study.
 * Uses the BaseCaseStudy component for rendering.
 */
import BaseCaseStudy from './BaseCaseStudy.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <BaseCaseStudy :project="project" />
</template>
