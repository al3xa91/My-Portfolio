/**
 * UI Configuration & Constants
 * Centralized strings and configuration for consistent UI behavior
 */

export const PROJECT_CATEGORY_LABELS = {
  'Web Dev': 'Built For The Browser',
  'Graphic Design': 'Visual Identity In Focus',
  'Photography': 'Moments, Composed',
  'Video': 'Motion And Storytelling',
  'UX/UI': 'Experience First Decisions',
}

const GALLERY_CATEGORIES = ['Photography', 'Graphic Design']

export const getProjectButtonLabel = category => {
  return GALLERY_CATEGORIES.includes(category) ? 'Open Gallery' : 'Open Project'
}

export const getCategoryLabel = (category) => {
  return PROJECT_CATEGORY_LABELS[category] ?? 'Selected Works'
}
