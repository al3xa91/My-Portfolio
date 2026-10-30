<script setup>
import CVSection from '@/components/sections/CVSection.vue'
import CategoryIndex from '@/components/sections/CategoryIndex.vue'
import HeroComponent from '@/components/sections/HeroComponent.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { getSectionId, useProjectsByCategory } from '@/composables/useProjectsByCategory.js'
import { projects, categoryData } from '@/data/portfolio.js'

const { sections, scrollToCategory, scrollToElement } = useProjectsByCategory(projects, categoryData)
</script>

<template>
  <div class="w-full bg-white selection:bg-pink-200">
    <main class="w-full">
      <HeroComponent @exploreWork="scrollToElement('category-index')" />

      <CVSection />

      <div id="category-index">
        <CategoryIndex :sections="sections" @selectCategory="scrollToCategory" />
      </div>

      <section class="py-20 px-6 md:px-10 safe-px max-w-350 mx-auto">
        <ProjectSection
          v-for="(section, index) in sections"
          :key="section.category"
          :section="section"
          :index="index"
          :section-id="getSectionId(section.category)"
        />
      </section>
    </main>

    <TheFooter />
  </div>
</template>
