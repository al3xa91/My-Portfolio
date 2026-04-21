import { publicAsset } from './shared.js'

export const categoryData = [
  { name: 'Web Dev', skills: ['Vue3', 'JavaScript', 'Tailwind', 'HTML5', 'WordPress'], thumbnailImageUrl: publicAsset('category-web-dev.webp') },
  { name: 'Graphic Design', skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding'], thumbnailImageUrl: publicAsset('category-graphic-design.webp') },
  { name: 'Photo', skills: ['Lightroom', 'Color Grading', 'Street Photography'], thumbnailImageUrl: publicAsset('category-photography.webp') },
  { name: 'Video', skills: ['Premiere Pro', 'After Effects', 'Motion Graphics'], thumbnailImageUrl: publicAsset('category-video.webp') },
  { name: 'UX/UI', skills: ['Figma', 'Prototyping', 'User Research'], thumbnailImageUrl: publicAsset('category-ux-ui.webp') },
]