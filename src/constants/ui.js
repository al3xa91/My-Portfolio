/**
 * UI Configuration & Constants
 * Centralized strings and configuration for consistent UI behavior
 */

export const PROJECT_CATEGORY_LABELS = {
  'Web Dev': 'Built For The Browser',
  'Graphic Design': 'Visual Identity In Focus',
  'Photo & Video': 'Moments, Composed And In Motion',
  'UX/UI': 'Experience First Decisions',
}

export const PROJECT_BUTTONS = {
  GALLERY: 'Open Gallery',
  PROJECT: 'Open Project',
}

export const GALLERY_COMPONENTS = {
  PHOTOGRAPHY: 'PhotographySlideshow',
  GRAPHIC_DESIGN: 'GraphicDesignSlideshow',
  LOGO_DESIGN: 'LogoShowcase',
}

export const getProjectButtonLabel = (category, componentName) => {
  const isGalleryStyle = Object.values(GALLERY_COMPONENTS).includes(componentName)
  return isGalleryStyle ? PROJECT_BUTTONS.GALLERY : PROJECT_BUTTONS.PROJECT
}

export const getCategoryLabel = (category) => {
  return PROJECT_CATEGORY_LABELS[category] ?? 'Selected Works'
}
