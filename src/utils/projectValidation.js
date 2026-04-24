/**
 * Project Validation Utility
 * Validates project object structure for type safety and runtime checks
 */

/**
 * Validates if an object is a valid project
 * @param {*} value - The object to validate
 * @returns {boolean} True if the value is a valid project object
 * @example
 * const isValid = isProject(projectObject)
 */
export const isProject = value => {
  return Boolean(
    value
    && typeof value.id === 'number'
    && typeof value.title === 'string'
    && typeof value.category === 'string'
    && typeof value.description === 'string'
    && typeof value.imageUrl === 'string'
    && (value.prototypeVideoUrl === undefined || typeof value.prototypeVideoUrl === 'string')
    && (value.prototypeImageUrl === undefined || typeof value.prototypeImageUrl === 'string')
    && (value.prototypePdfUrl === undefined || typeof value.prototypePdfUrl === 'string')
    && (value.embedUrl === undefined || typeof value.embedUrl === 'string')
  )
}