<script setup>
import { computed } from 'vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import { categoryData } from '@/data/portfolio.js'

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
</script>

<template>
  <div :id="sectionId" class="mb-40 scroll-mt-24">
    <div :class="['flex flex-col mb-12', index % 2 === 0 ? 'items-start' : 'items-end text-right']">
      <span class="text-pink-800 font-black text-[10px] tracking-[0.3em] uppercase mb-4">
        0{{ index + 1 }} — {{ section.category }}{{ subtitle ? ` / ${subtitle}` : '' }}
      </span>
      
      <h2 class="text-black text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
        {{ subtitle || section.category }}
      </h2>

      <div :class="['flex flex-wrap gap-2 max-w-2xl', index % 2 === 0 ? 'justify-start' : 'justify-end']">
        <span 
          v-for="skill in getSkills(section.category)" 
          :key="skill"
          class="px-4 py-1.5 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-full hover:border-pink-800 hover:text-pink-800 transition-all cursor-default"
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