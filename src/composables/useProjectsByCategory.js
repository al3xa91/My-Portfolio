/**
 * Portfolio Projects Composable
 * Handles project organization, filtering, and navigation logic
 */
import { computed, nextTick, ref } from 'vue'

const ALL_CATEGORIES = 'All'

/**
 * Generates a section ID for navigation and scroll targets
 * @param {string} category - The project category (e.g., 'UX/UI')
 * @param {string|null} subcategory - Optional subcategory name
 * @returns {string} URL-safe section ID
 * @example
 * getSectionId('UX/UI') // Returns: 'section-ux-ui'
 * getSectionId('Graphic Design', 'Logos') // Returns: 'section-graphic-design-logos'
 */
export const getSectionId = (category, subcategory = null) => {
  const base = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return subcategory ? `section-${base}-${subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : `section-${base}`
}

export function useProjectsByCategory(projects, categoryData = []) {
  const activeCategory = ref(ALL_CATEGORIES)
  const activeSubcategory = ref(null)

  const sortedProjects = computed(() => {
    return [...projects].sort((a, b) => a.id - b.id)
  })

  const sections = computed(() => {
    const sectionMap = new Map()

    sortedProjects.value.forEach(project => {
      if (!sectionMap.has(project.category)) {
        sectionMap.set(project.category, new Map())
      }
      
      const subcategory = project.subcategory || project.category
      const categoryMap = sectionMap.get(project.category)
      
      if (!categoryMap.has(subcategory)) {
        categoryMap.set(subcategory, [])
      }
      categoryMap.get(subcategory).push(project)
    })

    return Array.from(sectionMap, ([category, subcategoryMap]) => {
      const categoryInfo = categoryData.find(cat => cat.name === category)
      const subcategories = Array.from(subcategoryMap, ([name, categoryProjects]) => ({
        name,
        projects: categoryProjects,
      }))
      
      return {
        category,
        thumbnailImageUrl: categoryInfo?.thumbnailImageUrl,
        subcategories,
        hasSubcategories: subcategories.length > 1,
      }
    })
  })

  const visibleSections = computed(() => {
    if (activeCategory.value === ALL_CATEGORIES) {
      // Show all categories with all subcategories
      return sections.value.map(section => ({
        ...section,
        visibleSubcategories: section.subcategories,
      }))
    }

    return sections.value
      .filter(section => section.category === activeCategory.value)
      .map(section => {
        // If category has subcategories and one is selected, show only that one
        if (section.hasSubcategories && activeSubcategory.value) {
          return {
            ...section,
            visibleSubcategories: section.subcategories.filter(
              sub => sub.name === activeSubcategory.value
            ),
          }
        }
        // Otherwise show all subcategories of this category
        return {
          ...section,
          visibleSubcategories: section.subcategories,
        }
      })
  })

  const scrollToCategory = async category => {
    if (category === ALL_CATEGORIES) {
      activeCategory.value = ALL_CATEGORIES
      activeSubcategory.value = null

      await nextTick()

      const indexTarget = document.getElementById('category-index')
      if (indexTarget) {
        indexTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    const currentSection = sections.value.find(section => section.category === category)
    const hasSubcategories = Boolean(currentSection?.hasSubcategories)

    // Keep all sections visible for single-category clicks to avoid layout collapse
    // that can snap the viewport to the bottom on some scroll states.
    activeCategory.value = hasSubcategories ? category : ALL_CATEGORIES
    activeSubcategory.value = null

    await nextTick()

    let target = document.getElementById(getSectionId(category))

    // For categories rendered only as subcategory sections (e.g. UX/UI),
    // fall back to the first subcategory section anchor.
    if (!target) {
      const firstSubcategory = currentSection?.subcategories?.[0]?.name
      if (firstSubcategory) {
        target = document.getElementById(getSectionId(category, firstSubcategory))
      }
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const selectSubcategory = async (category, subcategory) => {
    activeCategory.value = category
    activeSubcategory.value = subcategory

    await nextTick()

    const target = document.getElementById(getSectionId(category, subcategory))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return {
    activeCategory,
    activeSubcategory,
    sections,
    visibleSections,
    scrollToCategory,
    selectSubcategory,
  }
}
