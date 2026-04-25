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
})

const skillsByCategory = computed(() => {
  return categoryData.reduce((acc, item) => {
    acc[item.name] = item.skills
    return acc
  }, {})
})

const getSkills = categoryName => skillsByCategory.value[categoryName] ?? []

const hasMultipleProjects = computed(() => props.section.projects.length > 1)

const overlineLabel = computed(() => getCategoryLabel(props.section.category))
const mobileSectionTitle = computed(() => (props.section.category === 'Photography' ? 'Photo' : props.section.category))
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

    <div :class="['grid gap-20', hasMultipleProjects ? 'md:grid-cols-2' : 'grid-cols-1']">
      <ProjectCard
        v-for="project in section.projects"
        :key="project.id"
        :project="project"
        :class="hasMultipleProjects ? '' : 'max-w-4xl mx-auto'"
      />
    </div>
  </div>
</template>