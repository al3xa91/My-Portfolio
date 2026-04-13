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