/**
 * Tools shown as icons in the Skills & Tools section.
 * Icons come from Iconify's free "logos" set (https://icon-sets.iconify.design/logos/),
 * which has the current versions of the Adobe icons.
 * To add a tool: search for it on that page and copy its name below.
 * Tools with `icon: null` show a simple badge with their first letter.
 */
const logo = name => `https://api.iconify.design/logos/${name}.svg`

export const toolsData = [
  { name: 'Figma', icon: logo('figma') },
  { name: 'Photoshop', icon: logo('adobe-photoshop') },
  { name: 'Illustrator', icon: logo('adobe-illustrator') },
  { name: 'InDesign', icon: logo('adobe-indesign') },
  { name: 'Premiere Pro', icon: logo('adobe-premiere') },
  { name: 'After Effects', icon: logo('adobe-after-effects') },
  { name: 'Vue 3', icon: logo('vue') },
  { name: 'JavaScript', icon: logo('javascript') },
  { name: 'Tailwind', icon: logo('tailwindcss-icon') },
  { name: 'HTML5', icon: logo('html-5') },
  { name: 'WordPress', icon: logo('wordpress-icon') },
]

/** Skills that aren't software, shown as text tags next to the icons */
export const expertiseData = [
  'User Research',
  'Prototyping',
  'Branding',
  'Motion Graphics',
  'Color Grading',
]
