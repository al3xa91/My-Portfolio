<script setup>
/**
 * LionheartCaseStudy Component
 * Displays The Brothers Lionheart theatre promotion UX/UI case study.
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
