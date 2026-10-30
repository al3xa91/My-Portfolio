<script setup>
import CategoryIndex from '@/components/sections/CategoryIndex.vue'
import HeroComponent from '@/components/sections/HeroComponent.vue'
import ProjectSection from '@/components/sections/ProjectSection.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import AboutHeart from '@/components/layout/AboutHeart.vue'
import CategoryNav from '@/components/layout/CategoryNav.vue'
import { getSectionId, useProjectsByCategory } from '@/composables/useProjectsByCategory.js'
import { projects as allProjects, categoryData } from '@/data/portfolio.js'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const { sections, visibleSections, activeCategory, activeSubcategory, scrollToCategory, selectSubcategory } = useProjectsByCategory(allProjects, categoryData)

// Render one ProjectSection per category and combine its visible subcategories.
const flattenedSections = computed(() => {
  return visibleSections.value.map(section => ({
    category: section.category,
    projects: section.visibleSubcategories.flatMap(subcategory => subcategory.projects),
  }))
})

const handleSelectCategory = (category) => {
  scrollToCategory(category)
}

const handleSelectSubcategory = ({ category, subcategory }) => {
  selectSubcategory(category, subcategory)
}

// --- Navigation between categories -------------------------------------
const categoryNames = computed(() => flattenedSections.value.map(section => section.category))

// What comes after each section: the next category, or back to the first one
const nextFor = index => {
  const names = categoryNames.value
  const isLast = index === names.length - 1
  return { category: isLast ? names[0] : names[index + 1], isLast }
}

// Show the sticky bar once the big category panels are scrolled past,
// and highlight the section currently on screen
const showCategoryNav = ref(false)
const currentCategory = ref('')

const updateCategoryNav = () => {
  const panels = document.getElementById('category-index')
  const footer = document.getElementById('contact')
  const pastPanels = panels ? panels.getBoundingClientRect().bottom < 160 : false
  const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight * 0.5 : false
  showCategoryNav.value = pastPanels && !atFooter

  let current = ''
  for (const name of categoryNames.value) {
    const el = document.getElementById(getSectionId(name))
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = name
  }
  currentCategory.value = current
}

onMounted(() => {
  window.addEventListener('scroll', updateCategoryNav, { passive: true })
  window.addEventListener('resize', updateCategoryNav)
  updateCategoryNav()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCategoryNav)
  window.removeEventListener('resize', updateCategoryNav)
})

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
          :key="section.category"
          :section="{ category: section.category, projects: section.projects }"
          :index="index"
          :section-id="getSectionId(section.category)"
          :next-category="nextFor(index).category"
          :is-last="nextFor(index).isLast"
          @go-to-category="handleSelectCategory"
        />
      </section>
    </main>

    <TheFooter />

    <AboutHeart />

    <CategoryNav
      :categories="categoryNames"
      :active="currentCategory"
      :visible="showCategoryNav"
      @select="handleSelectCategory"
    />
  </div>
</template>
