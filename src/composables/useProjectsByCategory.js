/**
 * Groups projects into one section per category (in the order they appear
 * in projects.js) and handles scrolling to them.
 */
import { computed } from 'vue'

/**
 * @example getSectionId('UX/UI') // 'section-ux-ui'
 */
export const getSectionId = category => `section-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export function useProjectsByCategory(projects, categoryData = []) {
  const sections = computed(() => {
    const byCategory = new Map()

    projects.forEach(project => {
      if (!byCategory.has(project.category)) byCategory.set(project.category, [])
      byCategory.get(project.category).push(project)
    })

    return Array.from(byCategory, ([category, categoryProjects]) => ({
      category,
      thumbnailImageUrl: categoryData.find(cat => cat.name === category)?.thumbnailImageUrl,
      projects: categoryProjects,
    }))
  })

  const scrollToElement = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToCategory = category => scrollToElement(getSectionId(category))

  return {
    sections,
    scrollToCategory,
    scrollToElement,
  }
}
