import { publicAsset } from './shared.js'

// The order here is the order of the sections on the homepage
export const categoryData = [
  { name: 'Graphic Design', skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding'], thumbnailImageUrl: publicAsset('category-graphic-design.webp') },
  { name: 'UX/UI', skills: ['Figma', 'Prototyping', 'User Research'], thumbnailImageUrl: publicAsset('category-ux-ui.webp') },
  { name: 'Photo & Video', skills: ['Photoshop', 'Color Grading', 'Premiere Pro', 'After Effects', 'Motion Graphics'], thumbnailImageUrl: publicAsset('category-photography.webp') },
  { name: 'Web Dev', skills: ['Vue3', 'JavaScript', 'Tailwind', 'HTML5', 'WordPress'], thumbnailImageUrl: publicAsset('category-web-dev.webp') },
]
