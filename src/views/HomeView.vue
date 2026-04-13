<script setup>
import CVSection from '@/components/sections/CVSection.vue'
import CategoryIndex from '@/components/sections/CategoryIndex.vue'
import HeroComponent from '@/components/sections/HeroComponent.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { getSectionId, useProjectsByCategory } from '@/composables/useProjectsByCategory.js'
import { projects as allProjects, categoryData } from '@/data/portfolio.js'
import { computed, nextTick } from 'vue'

const { sections, visibleSections, activeCategory, activeSubcategory, scrollToCategory, selectSubcategory } = useProjectsByCategory(allProjects, categoryData)

// Flatten visibleSections to render each subcategory as a separate ProjectSection
const flattenedSections = computed(() => {
  return visibleSections.value.flatMap(section => 
    section.visibleSubcategories.map(subcategory => ({
      category: section.category,
      subcategory: subcategory.name,
      projects: subcategory.projects,
    }))
  )
})

const handleSelectCategory = (category) => {
  scrollToCategory(category)
}

const handleSelectSubcategory = ({ category, subcategory }) => {
  selectSubcategory(category, subcategory)
}

const handleExploreWork = () => {
  activeCategory.value = 'All'
  activeSubcategory.value = null

  nextTick(() => {
    const categoryIndex = document.getElementById('category-index')
    if (categoryIndex) {
      categoryIndex.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}
</script>

<template>
  <div class="w-full bg-white selection:bg-pink-200">
    <main class="w-full">
      <HeroComponent @exploreWork="handleExploreWork" />

      <div id="category-index">
        <CategoryIndex
          :sections="sections"
          :activeCategory="activeCategory"
          :activeSubcategory="activeSubcategory"
          @selectCategory="handleSelectCategory"
          @selectSubcategory="handleSelectSubcategory"
        />
      </div>

      <section class="py-20 px-6 md:px-10 safe-px max-w-350 mx-auto">
        <ProjectSection
          v-for="(section, index) in flattenedSections"
          :key="`${section.category}-${section.subcategory}`"
          :section="{ category: section.category, projects: section.projects }"
          :index="index"
          :section-id="section.subcategory === section.category ? getSectionId(section.category) : getSectionId(section.category, section.subcategory)"
          :subtitle="section.subcategory"
        />
      </section>

      <CVSection />
    </main>

    <TheFooter />
  </div>
</template>
