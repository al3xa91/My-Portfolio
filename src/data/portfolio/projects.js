import { publicAsset } from './shared.js'

export const projects = [
  {
    id: 1,
    title: 'Figma Project 1: Website Design',
    category: 'UX/UI',
    description: 'A comprehensive web experience for a plant-based culinary platform, focusing on intuitive recipe navigation and high-conversion content layouts.',
    imageUrl: publicAsset('public/vegama/cover.webp'),
    embedUrl: 'https://embed.figma.com/proto/3r8WbkB8qu0WKBRQXul1er/VEGAMA?node-id=1-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share&hide-ui=1',
    caseStudy: {
      role: 'UX Researcher & UI Designer',
      tools: ['Figma', 'Adobe Illustrator'], 
      problem: 'Many users want to cook plant-based meals but find it complicated, time-consuming, or are frustrated by unclear online recipes.',
      outcome: 'A friendly experience designed to help users explore and cook vegan dishes with ease and confidence.',
      sections: [
        {
          slug: 'research',
          eyebrow: 'Research',
          title: 'Identifying the barriers to plant-based cooking',
          body: 'I conducted a survey with 14 participants which revealed that 64% prioritize quick and easy recipes. \n I developed two distinct personas: Freja, a minimalist interior designer from Aarhus, and Clara, a social marketing specialist from Valencia. \n Research highlighted that 43% of users specifically desire photos with instructions, while another 43% look for step-by-step videos to simplify the cooking process.',
          visual: {
            type: 'gallery',
            title: 'Research Artifacts',
            frames: [
              { label: 'Personas', src: publicAsset('vegama/personas.webp'), note: 'Freja and Clara personas' },
            ],
          },
        },
        {
          slug: 'architecture',
          eyebrow: 'Information Architecture',
          title: 'Organizing content for intuitive navigation',
          body: 'The project moved from exploration to refined interface decisions, balancing visual direction and content clarity. \n I structured the platform with dedicated sections for Basics, E-books, and Wellness to address the lack of knowledge identified in research. \n This flow ensures that users can move seamlessly from learning foundational vegan tips to executing full recipes.',
          visual: {
            type: 'none',
          },
        },
        {
          slug: 'interactive-prototype',
          eyebrow: 'Interactive Prototype',
          title: 'A high-conversion mobile-first culinary experience',
          body: 'The prototype focuses on intuitive recipe navigation and clear storytelling to create a coherent user experience. \n By addressing the 43% demand for visual aids, the design utilizes instruction-heavy layouts for signature dishes. \n This allows users to review interactions, hierarchy, and flow decisions in a realistic cooking environment.',
          visual: {
            type: 'imageLink',
            src: publicAsset('public/vegama/prototype.webp'),
            alt: 'Vegama interactive mobile prototype',
            buttonLabel: 'Go to prototype',
          },
        },
        {
          slug: 'final-design-system',
          eyebrow: 'Final Design System',
          title: 'Friendly, accessible, and nature-inspired visuals',
          body: 'The final visual identity balances a calm, minimalist aesthetic with an energetic and curious brand voice. \n Using nature-inspired elements and clean typography, the design system proves that vegan cooking can be tasty, colorful, and easy to fit into daily life. \n The result is an accessible solution that aligns with eco-conscious values while remaining practical for busy lifestyles.',
          visual: {
            type: 'none',
          },
        },
      ],
    },
  },
  {
    id: 1.1,
    title: 'The Brothers Lionheart - Theatre Promotion',
    category: 'UX/UI',
    description: 'A UX/UI case study for a theatre promotion site that balances emotional storytelling for children with fast, clear ticket information for parents.',
    imageUrl: publicAsset('Lionheart-mockup.jpg'),
    embedUrl: 'https://embed.figma.com/proto/1tbzeWt4MYITMZWq35v5Fv/THE-BROTHERS-LIONHEART?node-id=88-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=88%3A2&embed-host=share&hide-ui=1',
    caseStudy: {
      role: 'UX/UI Designer & Researcher',
      tools: ['Figma', 'Adobe Illustrator'],
      problem: 'Musikhuset Esbjerg needed a way to sell tickets for a fantasy play that appealed to children emotionally but gave parents quick, clear logistical information.',
      outcome: 'A cohesive, accessible booking flow with a strong visual identity and a clear information hierarchy.',
      sections: [
        {
          slug: 'research',
          eyebrow: 'Research',
          title: 'Understanding the audience before designing the interface',
          body: 'I did not design for children alone. I mapped three audience types and used target group research and card sorting to decide what had to surface first: price, age rating, dates, and booking certainty.',
          visual: {
            type: 'gallery',
            title: 'Research Artifacts',
            frames: [
              { label: 'Personas', note: 'Add personas image' },
              { label: 'Affinity Map', note: 'Add affinity map image' },
              { label: 'Double Diamond', note: 'Add double diamond image' },
            ],
          },
        },
        {
          slug: 'wireframing-iteration',
          eyebrow: 'Wireframing & Iteration',
          title: 'From low-fidelity sketches to responsive layout decisions',
          body: 'I translated the content hierarchy into wireframes and then refined the solution in Figma with a 12-column grid, sticky navigation, and breadcrumbs so users never felt lost in the fantasy world.',
          visual: {
            type: 'image',
            src: publicAsset('Lionheart-mockup.jpg'),
            alt: 'The Brothers Lionheart desktop and mobile mockup',
          },
        },
        {
          slug: 'interactive-prototype',
          eyebrow: 'Interactive Prototype',
          title: 'Testing the Figma prototype with real users',
          body: 'The interactive prototype was usability tested with the Think Aloud method, which helped me refine the flow based on what users actually expected rather than what simply looked polished.',
          visual: {
            type: 'imageLink',
            src: publicAsset('Lionheart-mockup.jpg'),
            alt: 'The Brothers Lionheart prototype mockup',
            buttonLabel: 'Go to prototype',
          },
        },
        {
          slug: 'final-design-system',
          eyebrow: 'Final Design System',
          title: 'Turning the solution into a cohesive visual language',
          body: 'The final result was a clear, accessible design system with strong typography, consistent components, and a booking flow that feels immersive without sacrificing usability.',
          visual: {
            type: 'none',
          },
        },
      ],
    },
  },
  {
    id: 1.3,
    title: 'Figma Project 1: App Design',
    category: 'UX/UI',
    description: 'Mobile banking app focusing on accessibility and clean data visualization.',
    imageUrl: publicAsset('Wanderly.webp'),
    embedUrl: 'https://embed.figma.com/proto/HbvZtWRpgpeHqCM7kJxubm/Ux-Travel-app?node-id=63-301&p=f&scaling=scale-down&content-scaling=fixed&page-id=63%3A21&starting-point-node-id=63%3A301&embed-host=share&hide-ui=1',
    caseStudy: {
      role: 'UX/UI Designer',
      tools: ['Figma'],
      problem: 'Design a travel app experience that keeps planning clear, fast, and accessible on mobile.',
      outcome: 'A mobile-first booking journey with strong hierarchy and intuitive actions.',
      sections: [
        {
          slug: 'research',
          eyebrow: 'Research',
          title: 'Discovery and user understanding',
          body: 'Document your key findings here and attach the visuals you want to showcase for this project.',
          visual: {
            type: 'gallery',
            title: 'Research Artifacts',
            frames: [
              { label: 'Personas', note: 'Replace with your personas image file', src: publicAsset('wanderly/personas.webp') },
              { label: 'User Flow', note: 'Replace with your user flow image file', src: publicAsset('wanderly/user-flow.webp') },
              { label: 'Insights', note: 'Replace with your insights image file', src: publicAsset('wanderly/insights.webp') },
            ],
          },
        },
        {
          slug: 'wireframes',
          eyebrow: 'Wireframes',
          title: 'From structure to polished interface',
          body: 'Explain how layout and navigation evolved from low-fidelity concepts into final mobile screens.',
          visual: {
            type: 'image',
            src: publicAsset('Wanderly.webp'),
            alt: 'Wanderly app mockup',
          },
        },
        {
          slug: 'interactive-prototype',
          eyebrow: 'Interactive Prototype',
          title: 'Navigate the prototype',
          body: 'Open the prototype to review interactions, transitions, and task flow.',
          visual: {
            type: 'imageLink',
            src: publicAsset('Wanderly.webp'),
            alt: 'Wanderly prototype mockup',
            buttonLabel: 'Go to prototype',
          },
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Brand Identity: Vegama',
    category: 'Graphic Design',
    description: 'Complete visual overhaul including logo and typography systems.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200',
  },
  {
    id: 3,
    title: 'Cinematic Product Promo',
    category: 'Video',
    description: 'Motion graphics and post-production for luxury brands.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200',
  },
  {
    id: 4,
    title: 'Urban Architecture',
    category: 'Photography',
    description: 'High-contrast street photography focused on brutalist structures.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
  },
  {
    id: 5,
    title: 'Travel Booking Flow',
    category: 'UX/UI',
    description: 'A conversion-focused booking journey with clear hierarchy and accessibility-first forms.',
    imageUrl: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200',
  },
  {
    id: 6,
    title: 'Modern E-Commerce',
    category: 'Web Dev',
    description: 'A high-performance storefront built with Vue 3 and Tailwind CSS.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
  },
  {
    id: 7,
    title: 'Portfolio CMS',
    category: 'Web Dev',
    description: 'A modular content management dashboard with reusable Vue components.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
  },
]