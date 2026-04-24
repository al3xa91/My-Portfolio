<script setup>
/**
 * VegamaCaseStudy Component
 * Displays the Vegama UX/UI project case study.
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
