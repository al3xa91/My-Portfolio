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
               { label: 'Empathy Map', src: publicAsset('vegama/emphatymap.webp')
                 
              },
              { label: 'Survey Results', src: publicAsset('vegama/survey.webp')
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
              { label: 'Moscow', src: publicAsset('lionheart/moscow.webp')
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
    imageUrl: publicAsset('posters/posterscover.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: publicAsset('posters/lionheartbrothers.webp'),
            thumb: publicAsset('posters/lionheartbrothers.webp'), 
            title: 'THE BROTHERS LIONHEART',
            description: 'Enchanting theatrical poster featuring storybook-style illustrations and soft textures to promote a live stage adaptation of the classic fantasy adventure.',
          },
          {
            src: publicAsset('posters/sæddingposter.webp'),
            thumb: publicAsset('posters/sæddingposter.webp'),
            title: 'SÆDDING TOURIST GUIDE',
            description: 'Minimalist travel poster using a striking two-tone silhouette of coastal landmarks to represent the unique character of Esbjerg’s seaside district.',
          },
          {
            src: publicAsset('posters/infography.webp'),
            thumb: publicAsset('posters/infography.webp'),
            title: 'GLOBAL FOOD WASTE',
                 description: 'Comprehensive infographic poster utilizing earthy tones and bold data visualization to highlight the environmental and social impact of food loss.',
       
          },
          {
            src: publicAsset('posters/lego-application.webp'),
            title: 'BUILDING MY STORY',
            description: 'A personal poster created for my internship application at the LEGO Group. The Colosseum is partly rebuilt in bricks with me sitting on top, surrounded by hand-cut collage letters spelling the qualities I bring: curious, kind, focused, brave, creative and passionate.',
          },
          {
            src: publicAsset('posters/esbjerg-jazz.webp'),
            title: 'ESBJERG JAZZ FESTIVAL',
            description: 'I designed this poster for the Esbjerg Jazz Festival. The four musicians are inspired by Men at Sea, the big white figures sitting by the water in Esbjerg: I imagined them coming to life and playing together as a jazz band. The piano keys curve around them like a stage, and I kept the colours warm, like a jazz club at night.',
          },
         
        ],
      },
    },
  },
  {
    id: 2.2,
    title: 'Brochures Collection',
    category: 'Graphic Design',
    description: 'Brochure designs for product marketing.',
    imageUrl: publicAsset('brochures/brochurecover.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: publicAsset('brochures/sæddingmockup.webp'),
            thumb: publicAsset('brochures/sæddingmockup.webp'),
            title: 'SÆDDING LIGHTHOUSE GUIDE',
            description: 'Informative layout for a local tourism guide, blending the historical context of the maritime beacon with a focus on the serene coastal environment of Esbjerg',
            externalUrl: 'https://indd.adobe.com/view/686daddf-2960-40d1-9233-39e5fe29fdba',
          },
          {
            src: publicAsset('brochures/lionheartmockup.jpg'),
            thumb: publicAsset('brochures/lionheartmockup.jpg'),
            title: 'LIONHEART THEATER PROGRAM',
            description: 'A structured layout for a production program , focusing on the story\'s themes of courage, love, and brotherhood through a reflection on the power of moving and hopeful narratives.',
            externalUrl: 'https://indd.adobe.com/view/4402c09a-bd1a-49a7-a694-533ed8f0205c',
          },
          
        ],
      },
    },
  },
  {
    id: 2.3,
    title: 'Logo Design',
    category: 'Graphic Design',
    description: 'Logos and visual identities, from the first idea to colours, typography and real-life use.',
    imageUrl: publicAsset('logos/cover.webp'),
    caseStudyComponent: 'LogoShowcase',
    caseStudy: {
      // One entry per logo: it appears as a slide in the gallery (hero + summary),
      // and "View full presentation" opens the full page.
      // Every section except name, hero, summary and brief is optional:
      // remove variations, colors, typography or mockups if a logo doesn't have them.
      logos: [
        {
          name: 'Vegama',
          hero: publicAsset('logos/vegama/hero.webp'),
          thumb: publicAsset('logos/vegama/icon.webp'),
          // Short text shown in the gallery overview
          summary: 'A warm, friendly identity for a plant-based cooking brand in Esbjerg: a heart that grows like a root vegetable, with hand-drawn lettering.',
          brief: 'Vegama is a plant-based cooking brand from Esbjerg with a simple message: one dinner counts. I wanted the logo to feel warm and welcoming, not strict or preachy. The mark is a heart that grows like a root vegetable, with leaves sprouting on top, so love for food and for the planet live in one shape. The hand-drawn lettering and the soft greens and terracotta keep it friendly, like cooking at home.',
          details: {
            Client: 'Vegama',
            Year: '', // ← add the year
            Tools: 'Illustrator',
            Deliverables: 'Logo, icon, colours, typography',
          },
          variations: [
            { label: 'Primary', src: publicAsset('logos/vegama/primary.webp') },
            { label: 'Icon', src: publicAsset('logos/vegama/icon.webp') },
            { label: 'Black', src: publicAsset('logos/vegama/black.webp') },
            { label: 'White', src: publicAsset('logos/vegama/white.webp') },
          ],
          colors: [
            { name: 'Forest green', hex: '#185F30' },
            { name: 'Fresh green', hex: '#A6CE81' },
            { name: 'Terracotta', hex: '#E2775A' },
            { name: 'Oat cream', hex: '#F4EEDC' },
          ],
          typography: {
            name: 'Barriecito',
            src: publicAsset('logos/vegama/type.webp'),
            note: 'A hand-drawn typeface with uneven, playful letters, used for the wordmark and headlines.',
          },
          mockups: [
            { label: 'Website', src: publicAsset('vegama-web/overview.webp'), wide: true },
            { label: 'Business cards, tote bag & T-shirt', src: publicAsset('logos/vegama/merch.webp'), wide: true },
          ],
        },
        {
          name: 'Mikkelborg Kro',
          hero: publicAsset('logos/mikkelborg/hero.webp'),
          thumb: publicAsset('logos/mikkelborg/primary.webp'),
          // Short text shown in the gallery overview
          summary: 'A rebranding proposal for an inn from 1907 in Rødding, keeping the roof-shaped emblem from the original facade in a calm charcoal and ivory palette.',
          brief: 'Mikkelborg Kro is an old inn in Rødding, built in 1907 and today a restaurant and Kulturhus. My idea was to give it a modern look without losing the history of the house. I kept the roof-shaped emblem and the year 1907 from the original facade, so the new logo still points back to the building itself.\n\nThe charcoal and ivory colours feel calm and timeless next to the red brick walls. I then tried the logo on everything from the facade and windows to aprons, menus and candles, to make sure the whole place feels like one identity.',
          details: {
            Client: 'Mikkelborg Kro, Rødding',
            Type: 'Rebranding proposal',
            Year: '2026',
            Tools: '', // ← add the tools you used
            Deliverables: 'Logo, colours, facade signage, business cards, apron, menu, tableware',
          },
          variations: [
            { label: 'Primary', src: publicAsset('logos/mikkelborg/primary.webp') },
            { label: 'Charcoal', src: publicAsset('logos/mikkelborg/charcoal.webp') },
            { label: 'Black', src: publicAsset('logos/mikkelborg/black.webp') },
            { label: 'White', src: publicAsset('logos/mikkelborg/white.webp') },
          ],
          colors: [
            { name: 'Charcoal', hex: '#3B3433' },
            { name: 'Ivory', hex: '#FFF6E7' },
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
          ],
          mockups: [
            { label: 'From the facade to the logo', src: publicAsset('logos/mikkelborg/before-after.webp'), wide: true },
            { label: 'Facade', src: publicAsset('logos/mikkelborg/facade.webp'), wide: true },
            { label: 'Windows', src: publicAsset('logos/mikkelborg/windows.webp'), wide: true },
            { label: 'Business cards', src: publicAsset('logos/mikkelborg/business-cards.webp'), wide: true },
            { label: 'Apron & menu', src: publicAsset('logos/mikkelborg/apron-menu.webp'), wide: true },
            { label: 'Table setting', src: publicAsset('logos/mikkelborg/table.webp') },
            { label: 'Candles & coasters', src: publicAsset('logos/mikkelborg/candles.webp') },
          ],
        },
      ],
    },
  },
  {
    id: 2.1,
    title: 'Character Design',
    category: 'Graphic Design',
    description: 'Original character designs and illustrations.',
    imageUrl: publicAsset('characters/characterscover.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: publicAsset('characters/minime1.webp'),
            thumb: publicAsset('characters/minime1.webp'),
            title: 'MINI ME CHARACTER KIT',
            description: 'A playful design sheet featuring a customizable cartoon avatar alongside a variety of modular facial expressions and limb poses for personalized digital creation.',
          },
          {
            src: publicAsset('characters/characterslionheart.webp'),
            thumb: publicAsset('characters/characterslionheart.webp'),
            title: 'LIONHEART CHARACTER ASSETS',
            description: 'A collection of stylized character illustrations developed for the theater production, featuring the protagonists and visual elements of the story\'s fantasy world.',
          },
          {
            src: publicAsset('characters/dragon.webp'),
            thumb: publicAsset('characters/dragon.webp'),
            title: 'KATLA THE DRAGON',
            description: 'Detailed character illustration of a legendary creature, featuring textured digital brushwork and a classic fantasy aesthetic to serve as a key visual for the world of The Brothers Lionheart.',
          },
         
          
        ],
      },
    },
  },
  /* {
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
  }, */
  {
    id: 3,
    title: 'VIDEO PRODUCTION',
    category: 'Photo & Video',
    label: 'Video',
    description: 'Creative video editing and motion graphics focused on bringing narratives to life through high-impact visuals and polished post-production.',
    imageUrl: publicAsset('category-video.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        videos: [
          {
            src: publicAsset('videos/sea.mp4'),
            title: 'Sea Opening Day',
            description: 'A vibrant promotional feature designed to capture our school’s creative spirit, inviting future students and families to join us for a wonderful adventure as they discover our story and meet our team.',
          },
          /* {
            src: publicAsset('videos/cv-video.mp4'),
            title: 'Brand Intro',
            description: 'Dynamic brand introduction with 3D elements and visual effects.',
          }, */
        ],
      },
    },
  },
  
  {
    id: 5.5,
    title: 'Vegama Website',
    category: 'Web Dev',
    description: 'A live WordPress and WooCommerce site for a plant-based cooking brand in Esbjerg, with masterclass booking, an online shop, recipes and a newsletter.',
    imageUrl: publicAsset('vegama-web/cover.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      // Links shown on every slide. Leave a link empty ('') to hide its button.
      liveUrl: 'https://vegama.dk',
      codeUrl: '',
      gallery: {
        images: [
          {
            src: publicAsset('vegama-web/overview.webp'),
            title: 'ONE DINNER COUNTS',
            description: 'The Vegama brand brought to life online: a warm, food-first homepage with a clear message and two direct paths, free recipes or booking a masterclass. [Add your role here, e.g. designed and built in WordPress.]',
          },
          {
            src: publicAsset('vegama-web/masterclasses.webp'),
            title: 'MASTERCLASS BOOKING',
            description: 'Cooking classes presented as cards with date, description and price, plus a gift card option. Visitors can book a seat directly on the site through WooCommerce.',
          },
          {
            src: publicAsset('vegama-web/shop.webp'),
            title: 'ONLINE SHOP',
            description: 'A product carousel with e-books, kitchen merchandise and cookbooks, connected to a full WooCommerce shop with cart and checkout.',
          },
          {
            src: publicAsset('vegama-web/responsive.webp'),
            title: 'RESPONSIVE',
            description: 'Every section adapts to phones: a compact header with menu, stacked class cards and a swipeable product row.',
          },
        ],
      },
    },
  },
  {
    id: 6,
    title: 'My Portfolio Website',
    category: 'Web Dev',
    description: 'The site you are looking at: a responsive portfolio built from scratch with Vue 3, Tailwind CSS and Vite, deployed on Vercel.',
    imageUrl: publicAsset('webdev/cover.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      // Links shown on every slide. Leave a link empty ('') to hide its button.
      liveUrl: '', // ← add your Vercel address here, e.g. 'https://your-site.vercel.app'
      codeUrl: 'https://github.com/al3xa91/My-Portfolio',
      gallery: {
        images: [
          {
            src: publicAsset('webdev/overview.webp'),
            title: 'OVERVIEW',
            description: 'A single-page portfolio designed and coded by me, from the bold typographic hero to the project galleries. Built with Vue 3 components and Tailwind CSS, with all content kept in simple data files so new projects can be added without touching the layout.',
          },
          {
            src: publicAsset('webdev/interactions.webp'),
            title: 'INTERACTIONS',
            description: 'Category panels that expand on hover and become tappable bands on phones. Projects open in a full-screen view with their own link, and the browser back button returns visitors to exactly where they were.',
          },
          {
            src: publicAsset('webdev/project-view.webp'),
            title: 'PROJECT VIEW',
            description: 'One reusable gallery component for every project type: images, posters and videos. The main image loads first, neighbouring images are preloaded, and the gallery code only downloads when it is needed.',
          },
          {
            src: publicAsset('webdev/responsive.webp'),
            title: 'RESPONSIVE',
            description: 'Designed mobile-first: layouts, type sizes and interactions adapt from phone to large desktop screens, including safe areas for notched phones.',
          },
        ],
      },
    },
  },
  /* {
    id: 7,
    title: 'Portfolio CMS',
    category: 'Web Dev',
    description: 'A modular content management dashboard with reusable Vue components.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fm=auto',
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fm=auto',
            thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fm=auto',
            title: 'Dashboard Overview',
            description: 'Central hub for managing portfolio projects, case studies, and media assets.',
          },
          {
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&fm=auto',
            thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&fm=auto',
            title: 'Content Editor',
            description: 'Rich text editor with drag-and-drop image uploads and real-time preview.',
          },
          {
            src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80&fm=auto',
            thumb: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80&fm=auto',
            title: 'Media Library',
            description: 'Organized asset management with tags, search, and version history.',
          },
        ],
      },
    },
  }, */
 {
    id: 4,
    title: 'NATURAL OBSERVATIONS',
    category: 'Photo & Video',
    label: 'Photography',
    description: 'Atmospheric imagery capturing the vibrant transition of the seasons, from candid moments of joy to the quiet, intricate textures of the natural landscape.',
    imageUrl: publicAsset('photography/redrose.webp'),
    caseStudyComponent: 'GraphicDesignSlideshow',
    caseStudy: {
      gallery: {
        images: [
          {
            src: publicAsset('photography/happiness.webp'),
            thumb: publicAsset('photography/happiness.webp'),
            title: 'Happiness',
            description: 'A high-energy action photograph capturing a moment of pure childhood bliss, utilizing dynamic composition and the vibrant contrast of falling leaves against a clear blue sky.',
          },
          {
            src: publicAsset('photography/fountain.webp'),
            thumb: publicAsset('photography/fountain.webp'),
            title: 'URBAN OASIS',
            description: 'A serene capture of a modern park fountain, featuring symmetrical water "umbrellas" and geometric concrete spheres that create a sense of architectural calm.',
          },
          {
            src: publicAsset('photography/woods.jpg'),
            thumb: publicAsset('photography/woods.jpg'),
            title: 'EMERALD CANOPY',
            description: 'A dramatic, low-angle perspective looking up into a dense evergreen forest, capturing the towering strength of the trees against a deep twilight sky.',
          },
          {
            src: publicAsset('photography/leaves.webp'),
            thumb: publicAsset('photography/leaves.webp'),
            title: 'THE LONE BLOOM',
            description: 'A striking composition highlighting the contrast between the fleeting colors of fallen maple leaves and the resilient, simple beauty of a single white daisy.',
          },
          {
            src: publicAsset('photography/rose.webp'),
            thumb: publicAsset('photography/rose.webp'),
            title: 'AUTUMN’S GOLDEN ROSE',
            description: 'A delicate close-up of a vibrant yellow rose, standing out in soft focus against a rustic carpet of fallen autumn leaves.',
          },
        ],
      },
    },
  },
]