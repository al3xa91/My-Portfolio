export const categories = ['All', 'Web Dev', 'Graphic Design', 'Photography', 'Video', 'UX/UI'];

const publicAsset = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const personalInfo = {
  name: "Alexa Cattaneo Piazza", 
  role: "Multimedia Designer",
  bio: "I craft visual narratives across digital platforms.",
  email: "Al3xa91@gmail.com",
  location: "Billund, Denmark", // Optional: helpful for recruiters
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/alexa-cattaneo-piazza" },
   
  ]
};

export const projects = [
  {
    id: 1,
    title: "Figma Project 1: Website Design",
    category: "UX/UI",
    subcategory: "UI",
    description: "A comprehensive web experience for a plant-based culinary platform, focusing on intuitive recipe navigation and high-conversion content layouts.",
    imageUrl: publicAsset('Vegama.webp'),
    embedUrl: "https://embed.figma.com/proto/3r8WbkB8qu0WKBRQXul1er/VEGAMA?node-id=1-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share&hide-ui=1",
  },
  {
    id: 1.1,
    title: "Figma Project 2: Website Design",
    category: "UX/UI",
    subcategory: "UI",
    description: "A narrative-driven web experience for a theatrical production, featuring custom illustrations and a streamlined ticket-booking flow.",
    imageUrl: publicAsset('Lionheart-mockup.jpg'),
    embedUrl: "https://embed.figma.com/proto/1tbzeWt4MYITMZWq35v5Fv/THE-BROTHERS-LIONHEART?node-id=88-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=88%3A2&embed-host=share&hide-ui=1",
  },
  {
    id: 1.3,
    title: "Figma Project 1: App Design",
    category: "UX/UI",
    subcategory: "UI",
    description: "Mobile banking app focusing on accessibility and clean data visualization.",
    imageUrl: publicAsset('Wanderly.jpg'),
    embedUrl: "https://embed.figma.com/proto/HbvZtWRpgpeHqCM7kJxubm/Ux-Travel-app?node-id=63-301&p=f&scaling=scale-down&content-scaling=fixed&page-id=63%3A21&starting-point-node-id=63%3A301&embed-host=share&hide-ui=1",
  },
  {
    id: 2,
    title: "Brand Identity: Vegama",
    category: "Graphic Design",
    description: "Complete visual overhaul including logo and typography systems.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200",
  },
{
    id: 3,
    title: "Cinematic Product Promo",
    category: "Video",
    description: "Motion graphics and post-production for luxury brands.",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200",
  },
  {
    id: 4,
    title: "Urban Architecture",
    category: "Photography",
    description: "High-contrast street photography focused on brutalist structures.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
  },
  {
    id: 5,
    title: "Travel Booking Flow",
    category: "UX/UI",
    subcategory: "UX",
    description: "A conversion-focused booking journey with clear hierarchy and accessibility-first forms.",
    imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200",
  },
  {
    id: 6,
    title: "Modern E-Commerce",
    category: "Web Dev",
    description: "A high-performance storefront built with Vue 3 and Tailwind CSS.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  },
  {
    id: 7,
    title: "Portfolio CMS",
    category: "Web Dev",
    description: "A modular content management dashboard with reusable Vue components.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
  },
];
export const categoryData = [
  { name: 'Web Dev', skills: ['Vue3', 'JavaScript', 'Tailwind', 'HTML5', 'WordPress'], thumbnailImageUrl: publicAsset('category-web-dev.webp') },
  { name: 'Graphic Design', skills: ['Photoshop', 'Illustrator', 'InDesign', 'Branding'], thumbnailImageUrl: publicAsset('category-graphic-design.webp') },
  { name: 'Photography', skills: ['Lightroom', 'Color Grading', 'Street Photography'], thumbnailImageUrl: publicAsset('category-photography.webp') },
  { name: 'Video', skills: ['Premiere Pro', 'After Effects', 'Motion Graphics'], thumbnailImageUrl: publicAsset('category-video.webp') },
  { name: 'UX/UI', skills: ['Figma', 'Prototyping', 'User Research'], thumbnailImageUrl: publicAsset('category-ux-ui.webp') }
];
export const cvData = {
  videoUrl: publicAsset('videos/cv-video.mp4'),
  resumeUrl: publicAsset('documents/alexa-cattaneo-piazza-cv.pdf'),
  resumeDownloadName: 'Alexa-Cattaneo-Piazza-CV.pdf',
  tagline: "Bridging the gap between motion and design.",
  education: [
    { school: "SEA-Syddansk Erhvervsakademi", degree: "Multimedia Design", year: "2025-2027" },
    { school: "Universidad de Las Palmas de Gran Canaria", degree: "Tourism Management", year: "2017-2018" }
  ],
  experience: [
    { company: "Compass Group for Lego Group", role: "Barista", year: "2023-Present" },
    { company: "MeMu Michelin Star Restaurant", role: "Waitress", year: "2023-2023" }
  ]
};
