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

export const PROJECT_BUTTONS = {
  GALLERY: 'Open Gallery',
  PROJECT: 'Open Project',
}

export const GALLERY_COMPONENTS = {
  PHOTOGRAPHY: 'PhotographySlideshow',
  GRAPHIC_DESIGN: 'GraphicDesignSlideshow',
}

export const getProjectButtonLabel = (category, componentName) => {
  const isGalleryStyle = category === 'Photography' || componentName === GALLERY_COMPONENTS.GRAPHIC_DESIGN
  return isGalleryStyle ? PROJECT_BUTTONS.GALLERY : PROJECT_BUTTONS.PROJECT
}

export const getCategoryLabel = (category) => {
  return PROJECT_CATEGORY_LABELS[category] ?? 'Selected Works'
}
