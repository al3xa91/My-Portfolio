<script setup>
/**
 * WanderlyCaseStudy Component
 * Displays the Wanderly travel planning case study.
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
