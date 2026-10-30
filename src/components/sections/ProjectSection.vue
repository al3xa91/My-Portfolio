<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import { categoryData } from '@/data/portfolio.js'
import { getCategoryLabel } from '@/constants/ui.js'

const props = defineProps({
  section: {
    type: Object,
    required: true,
    default: () => ({ category: '', projects: [] }),
    validator: value => typeof value.category === 'string' && Array.isArray(value.projects),
  },
  index: {
    type: Number,
    default: 0,
  },
  sectionId: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: null,
  },
  // Link at the end of the section: next category, or back to the first after the last one
  nextCategory: {
    type: String,
    default: '',
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['goToCategory'])

const skillsByCategory = computed(() => {
  return categoryData.reduce((acc, item) => {
    acc[item.name] = item.skills
    return acc
  }, {})
})

const getSkills = categoryName => skillsByCategory.value[categoryName] ?? []

const overlineLabel = computed(() => getCategoryLabel(props.section.category))
const mobileSectionTitle = computed(() => (props.section.category))
</script>

<template>
  <div :id="sectionId" class="mb-40 scroll-mt-24">
    <div :class="['flex flex-col mb-12', index % 2 === 0 ? 'items-start' : 'items-end text-right']">
      <p class="text-pink-800 font-black text-[10px] tracking-[0.3em] uppercase mb-4">
        {{ overlineLabel }}
      </p>

      <h2 class="text-black text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
        <span class="md:hidden">{{ subtitle || mobileSectionTitle }}</span>
        <span class="hidden md:inline">{{ subtitle || section.category }}</span>
      </h2>

      <div :class="['flex flex-wrap gap-x-4 gap-y-1 max-w-2xl', index % 2 === 0 ? 'justify-start' : 'justify-end']">
        <span 
          v-for="skill in getSkills(section.category)" 
          :key="skill"
          class="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- Three projects per row on large screens, two on tablets, one on phones -->
    <div class="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in section.projects"
        :key="project.id"
        :project="project"
      />
    </div>

    <!-- Keep visitors moving through the portfolio -->
    <div v-if="nextCategory" class="mt-16 flex justify-start">
      <button
        type="button"
        @click="$emit('goToCategory', nextCategory)"
        class="group/next inline-flex items-center gap-3 rounded-full border border-pink-800 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-pink-800 transition-colors hover:border-black hover:bg-black hover:text-white"
      >
        <span class="text-slate-400 group-hover/next:text-white/60">{{ isLast ? 'Back to' : 'Next' }}</span>
        {{ nextCategory }}
        <svg class="h-3.5 w-3.5 transition-transform group-hover/next:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="isLast" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m-6 6l6-6 6 6" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </button>
    </div>
  </div>
</template>