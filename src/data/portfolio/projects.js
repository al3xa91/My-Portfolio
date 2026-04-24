import { publicAsset } from './shared.js'

export const projects = [
  {
    id: 1,
    title: 'Vegama',
    category: 'UX/UI',
    description: 'A comprehensive web experience for a plant-based culinary platform, focusing on intuitive recipe navigation and high-conversion content layouts.',
    imageUrl: publicAsset('vegama/cover.webp'),
    embedUrl: 'https://embed.figma.com/proto/3r8WbkB8qu0WKBRQXul1er/VEGAMA?node-id=1-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&embed-host=share&hide-ui=1',
    caseStudyComponent: 'VegamaCaseStudy',
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
              { label: 'Personas', src: publicAsset('vegama/personas.webp'),
              },
               { label: 'Affinity Map', src: publicAsset('vegama/emphatymap.webp')
                 
              },
              { label: 'Double Diamond', src: publicAsset('vegama/survey.webp')
                ,
               },
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
            src: publicAsset('vegama/prototype.webp'),
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
    title: 'The Brothers Lionheart',
    category: 'UX/UI',
    description: 'A UX/UI case study for a theatre promotion site that balances emotional storytelling for children with fast, clear ticket information for parents.',
    imageUrl: publicAsset('lionheart/mockup.jpg'),
    embedUrl: 'https://embed.figma.com/proto/1tbzeWt4MYITMZWq35v5Fv/THE-BROTHERS-LIONHEART?node-id=88-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=88%3A2&embed-host=share&hide-ui=1',
    caseStudyComponent: 'LionheartCaseStudy',
    caseStudy: {
      role: 'UX/UI Designer & Researcher',
      tools: ['Figma', 'Adobe Illustrator'],
      problem: 'Skarntyden needed a promotional site for "The Brothers Lionheart" at Musikhuset Esbjerg. The challenge was designing for a dual-audience: appealing to children (8+) emotionally while giving parents the logistical clarity they need to make purchasing decisions.',
      outcome: 'A cohesive, accessible booking flow with a strong visual identity. The platform successfully bridges the gap between fantasy immersion and practical e-commerce needs for families.',
      sections: [
        {
          slug: 'research',
          eyebrow: 'Research',
          title: 'Understanding the audience before designing the interface',
          body: 'Through surveys and interviews, I developed three distinct personas. Using Affinity Mapping and MOSCOW prioritization, I determined that parents heavily prioritize clear age guidance, show duration, simple story summaries, and logistical details like parking.',
          visual: {
            type: 'gallery',
            title: 'Research Artifacts',
            frames: [
              { label: 'Personas', src: publicAsset('lionheart/personas.webp')},
              { label: 'Affinity Map', src: publicAsset('lionheart/affinitymap.webp')
                 
              },
              { label: 'Double Diamond', src: publicAsset('lionheart/moscow.webp')
                ,
               },
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
            src: publicAsset('lionheart/lowfidelity.webp'),
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
            src: publicAsset('lionheart/mockup.jpg'),
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
    title: 'ITINERO',
    category: 'UX/UI',
    description: 'A personalized travel companion focused on centralized itineraries and smart scheduling.',
    imageUrl: publicAsset('itinero/mockup.webp'),
    embedUrl: 'https://embed.figma.com/proto/HbvZtWRpgpeHqCM7kJxubm/Ux-Travel-app?node-id=141-531&p=f&scaling=scale-down&content-scaling=fixed&page-id=115%3A9&starting-point-node-id=141%3A531&embed-host=share',
    caseStudyComponent: 'ItineroCaseStudy',
    caseStudy: {
      role: 'UX/UI Designer',
      tools: ['Figma'],
      problem: 'Design a unified travel experience that consolidates fragmented data into a clear, fast, and accessible mobile itinerary.',
      outcome: 'A mobile-first travel ecosystem designed to bridge the gap between inspiration and logistical execution through AI-driven planning.',
      sections: [
        {
          slug: 'research',
          eyebrow: 'User Discovery',
          title: 'Mapping Pain Points and Strategic Opportunities',
          body: 'I conducted research into the traveler’s journey, identifying that users feel overwhelmed by managing logistics across multiple fragmented platforms. \n My research uncovered key pain points, such as the disconnect between initial inspiration and actual scheduling, as well as the dissatisfaction with traditional, "boring" guided tours. \n By mapping these challenges, I identified critical opportunities to bridge the gap between marketing and reality through authentic customer proof and a unified master interface.',
          visual: {
            type: 'gallery',
            title: 'Research Artifacts',
            frames: [
              { label: 'Pain points and Opportunity Map', src: publicAsset('itinero/painpoints.webp') },
              { label: 'Business Model', src: publicAsset('itinero/businessmodel.webp') },
              { label: 'Moscow', src: publicAsset('itinero/moscow.webp') },
            ],
          },
        },
        {
          slug: 'wireframes',
          eyebrow: 'Architecture & Strategy',
          title: 'Prioritizing Features for a Unified Ecosystem',
          body: 'To solve the fragmentation issue, I developed a strategy focused on a centralized itinerary format that organizes trips by days, times, and specific activities. \n Using a MoSCoW matrix, I prioritized "Must-Have" features like an AI itinerary generator and collaborative planning tools for groups and digital nomads. \n This architecture ensures a seamless flow from a "Quick Save" inspiration list into a structured, real-time schedule that users can access even while offline.',
          visual: {
            type: 'image',
            src: publicAsset('itinero/wireframes.webp'),
            alt: 'Wanderly app mockup',
          },
        },
        {
          slug: 'interactive-prototype',
          eyebrow: 'Interactive Prototype',
          title: 'The Visual Timeline & Digital Concierge Experience',
          body: 'The prototype translates complex logistics into a visual timeline where users can instantly "pin" app suggestions into a structured daily plan. \n I integrated a "Digital Concierge" system that uses smart notifications to provide contextual reminders about upcoming attractions and closing times without being rigid. \n The interactive experience also features location-based suggestions and an authentic review filtering system designed to flag tourist traps and highlight hidden local gems.',
          visual: {
            type: 'imageLink',
            src: publicAsset('itinero/prototype.webp'),
            alt: 'Itinero prototype mockup',
            buttonLabel: 'Go to prototype',
          },
          
        },
         {
          slug: 'final-design-system',
          eyebrow: 'Visual Identity & Business Logic',
          title: 'Turning the solution into a cohesive visual language',
          body: 'The final visual identity for Itinero centers on the concept of a "personalized travel companion" that feels both professional and adventurous. \n I designed a clean, cohesive interface with a strong information hierarchy to ensure that high-conversion layouts never sacrifice usability during a trip. \n The resulting design system offers a high-reliability hub that successfully transforms travel inspiration into actionable, effortless plans for solo and group travelers alike.',
          visual: {
            type: 'none',
          },
        },
      ],
    },
  },

  {
    id: 2,
    title: 'Posters Collection',
    category: 'Graphic Design',
    description: 'Bold and impactful poster designs for cultural events and brand campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1578432537557-37b37e9c5d22?q=80&w=1200',
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1578432537557-37b37e9c5d22?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1578432537557-37b37e9c5d22?q=80&w=200',
            title: 'Spring Festival',
            description: 'Vibrant poster design for a cultural celebration, combining typography with dynamic color blocking.',
          },
          {
            src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200',
            title: 'Music Conference',
            description: 'Modern concert poster featuring innovative typography and layered geometric elements.',
          },
          {
            src: 'https://images.unsplash.com/photo-1581291518633-83b6b2065dba?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1581291518633-83b6b2065dba?q=80&w=200',
            title: 'Art Exhibition',
            description: 'Contemporary gallery poster using minimalist design with bold color accents.',
          },
          {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200',
            title: 'Film Festival',
            description: 'Cinematic poster design combining photography with integrated typography.',
          },
          {
            src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=200',
            title: 'Sports Campaign',
            description: 'High-energy poster with dynamic composition and motivational messaging.',
          },
        ],
      },
    },
  },
  {
    id: 2.2,
    title: 'Brochures Collection',
    category: 'Graphic Design',
    description: 'Professional brochure designs for corporate communication and product marketing.',
    imageUrl: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?q=80&w=1200',
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?q=80&w=200',
            title: 'Corporate Brochure',
            description: 'Multi-page brochure showcasing company values, services, and case studies with professional layout.',
          },
          {
            src: 'https://images.unsplash.com/photo-1570129477492-45202b8055b3?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1570129477492-45202b8055b3?q=80&w=200',
            title: 'Product Catalog',
            description: 'Elegant product brochure featuring high-quality photography and descriptive content.',
          },
          {
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
            title: 'Travel Brochure',
            description: 'Destination marketing brochure with immersive imagery and travel information.',
          },
          {
            src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=200',
            title: 'Services Guide',
            description: 'Comprehensive service brochure with clear hierarchy and call-to-action sections.',
          },
          {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200',
            title: 'Annual Report',
            description: 'Professional annual report brochure combining data visualization with corporate branding.',
          },
        ],
      },
    },
  },
  {
    id: 2.1,
    title: 'Character Design',
    category: 'Graphic Design',
    description: 'Original character designs and illustrations for branding and storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200',
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200',
            title: 'Mascot Character',
            description: 'Friendly, approachable mascot design for brand identity and marketing materials.',
          },
          {
            src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200',
            title: 'Adventure Hero',
            description: 'Dynamic character illustration suitable for game and entertainment branding.',
          },
          {
            src: 'https://images.unsplash.com/photo-1557804506-669714d2e745?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1557804506-669714d2e745?q=80&w=200',
            title: 'Lifestyle Characters',
            description: 'Series of characters representing diverse personas for community engagement.',
          },
          {
            src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=200',
            title: 'Brand Ambassador',
            description: 'Professional character design for corporate training and educational content.',
          },
          {
            src: 'https://images.unsplash.com/photo-1572007062606-b46f969c24eb?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1572007062606-b46f969c24eb?q=80&w=200',
            title: 'Illustrated Family',
            description: 'Cohesive character set showcasing relationships and emotional storytelling.',
          },
        ],
      },
    },
  },
  {
    id: 2.3,
    title: 'Logos & Marks',
    category: 'Graphic Design',
    description: 'Professional logo designs and brand marks for diverse industries and businesses.',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200',
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=200',
            title: 'Tech Startup Logo',
            description: 'Modern, minimalist logo design symbolizing innovation and forward-thinking approach.',
          },
          {
            src: 'https://images.unsplash.com/photo-1563062810-1210a35a4c7d?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1563062810-1210a35a4c7d?q=80&w=200',
            title: 'Sustainable Brand Mark',
            description: 'Eco-friendly logo combining natural elements with geometric precision.',
          },
          {
            src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200',
            title: 'Creative Agency Logo',
            description: 'Dynamic logo mark representing creativity, collaboration, and growth.',
          },
          {
            src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200',
            title: 'Fitness Brand Identity',
            description: 'Strong, energetic logo design for health and wellness sector.',
          },
          {
            src: 'https://images.unsplash.com/photo-1581291518633-83b6b2065dba?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1581291518633-83b6b2065dba?q=80&w=200',
            title: 'Heritage Brand Logo',
            description: 'Timeless logo design combining traditional elements with contemporary styling.',
          },
        ],
      },
    },
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
    caseStudyComponent: 'PhotographySlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200',
            title: 'Geometric Brutalism',
            description: 'Concrete forms frame the urban landscape, exploring the relationship between light and shadow.',
          },
          {
            src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=200',
            title: 'Metropolitan Rise',
            description: 'Vertical lines of steel and glass create a rhythm across the skyline.',
          },
          {
            src: 'https://images.unsplash.com/photo-1497366216548-495546845299?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1497366216548-495546845299?q=80&w=200',
            title: 'Industrial Heritage',
            description: 'Abandoned factories reveal the textures of a bygone era.',
          },
          {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=200',
            title: 'Urban Contrast',
            description: 'Modern architecture against timeless structural elements.',
          },
          {
            src: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?q=80&w=200',
            title: 'Glass Reflections',
            description: 'Building facades create infinite mirrored perspectives.',
          },
          {
            src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600',
            thumb: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200',
            title: 'Skyline Symphony',
            description: 'Layered architecture creating depth and dimension.',
          },
        ],
      },
    },
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