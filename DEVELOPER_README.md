# Portfolio Codebase Guide

**Last Updated:** April 2026

## 📁 Project Structure

```
my-portfolio-3/
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   ├── ProjectCard.vue          # Individual project thumbnail
│   │   │   └── ProjectCaseStudy.vue     # Default case study template
│   │   ├── caseStudies/
│   │   │   ├── BaseCaseStudy.vue        # Base component for all case studies
│   │   │   ├── PhotographySlideshow.vue # Gallery for photography projects
│   │   │   ├── GraphicDesignSlideshow.vue # Gallery for graphic design projects
│   │   │   ├── VegamaCaseStudy.vue      # Wrapper using BaseCaseStudy
│   │   │   ├── ItineroCaseStudy.vue     # Wrapper using BaseCaseStudy
│   │   │   ├── LionheartCaseStudy.vue   # Wrapper using BaseCaseStudy
│   │   │   └── WanderlyCaseStudy.vue    # Wrapper using BaseCaseStudy
│   │   ├── sections/
│   │   │   ├── ProjectSection.vue       # Category section renderer
│   │   │   ├── CategoryIndex.vue        # Category filter/selector
│   │   │   ├── CVSection.vue            # CV/Resume section
│   │   │   └── HeroComponent.vue        # Hero/landing section
│   │   └── layout/
│   │       └── TheFooter.vue            # Footer component
│   ├── constants/
│   │   └── ui.js                        # UI labels and configuration
│   ├── data/
│   │   └── portfolio/
│   │       ├── projects.js              # Project data (UX/UI, Graphics, etc.)
│   │       ├── categoryData.js          # Category metadata
│   │       ├── cvData.js                # CV/Resume data
│   │       ├── personalInfo.js          # Personal information
│   │       ├── shared.js                # Shared utility functions
│   │       └── index.js                 # Data exports
│   ├── router/
│   │   └── index.js                     # Vue Router configuration
│   ├── views/
│   │   ├── HomeView.vue                 # Main portfolio page
│   │   └── AboutView.vue                # About page
│   ├── composables/
│   │   ├── useProjectsByCategory.js    # Project organization logic
│   │   └── useCurrentTime.js            # Time utility
│   ├── utils/
│   │   └── projectValidation.js         # Project object validation
│   ├── assets/
│   │   └── *.css                        # Tailwind & global styles
│   ├── App.vue                          # Root component
│   └── main.js                          # Application entry point
├── public/                              # Static assets
│   ├── documents/
│   ├── itinero/
│   ├── lionheart/
│   ├── vegama/
│   └── videos/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Key Architecture Decisions

### Component Reusability
- **BaseCaseStudy.vue**: All detailed project case studies extend this base component
- **Slideshow Components**: Photography and Graphic Design projects use dedicated slideshow components
- **Dynamic Imports**: Case study components are loaded dynamically based on project configuration

### Data Organization
- All project data lives in `/src/data/portfolio/projects.js`
- Each project object includes metadata and optional custom case study data
- Gallery images use a standardized `gallery.images` array structure

### Constants & Configuration
- UI labels, button text, and category mappings centralized in `/src/constants/ui.js`
- Reduces repetition and makes future updates easier
- Add new labels/categories in one place only

## 📋 Project Object Structure

```javascript
{
  id: 1,                          // Unique identifier (numeric)
  title: 'Project Name',          // Display title
  category: 'UX/UI',              // Category: UX/UI, Graphic Design, Photography, Web Dev, Video
  description: 'Brief...',        // Short description
  imageUrl: publicAsset('...'),   // Thumbnail image
  
  // Optional properties
  embedUrl: 'https://...',        // Figma embed for prototypes
  caseStudyComponent: 'ComponentName', // Custom case study component name
  
  // Optional detailed case study
  caseStudy: {
    role: 'Designer',
    tools: ['Figma', 'Illustrator'],
    problem: 'Challenge description',
    outcome: 'Result description',
    sections: [
      {
        slug: 'unique-id',
        eyebrow: 'Section Label',
        title: 'Section Title',
        body: 'Content text...',
        visual: { type: 'image', src: '...', alt: '...' }
      }
    ],
    // OR for galleries:
    gallery: {
      images: [
        { src: '...', thumb: '...', title: '...', description: '...' }
      ]
    }
  }
}
```

## 🎨 Visual Types Supported

| Type | Usage | Example |
|------|-------|---------|
| `image` | Single static image | Design mockup |
| `imageLink` | Image with CTA button | Prototype preview |
| `gallery` | 2-column image grid | Research artifacts |
| `galleryWide` | 3-column image grid | Logo variations |
| `paletteGrid` | Color palette display | Brand colors |
| `typography` | Typography showcase | Font samples |
| `none` | Text-only section | No visual |

## 🔄 Adding a New Project

1. **Open** `src/data/portfolio/projects.js`
2. **Create** a new project object with required fields
3. **Add images** to `public/` folder in a category subfolder
4. **Use** `publicAsset()` for image paths
5. **Choose** a `caseStudyComponent`:
   - Use `GraphicDesignSlideshow` for galleries
   - Use custom component wrapper (extends BaseCaseStudy)
   - Omit for auto-generated default layout

Example:
```javascript
{
  id: 2.4,
  title: 'New Project',
  category: 'Graphic Design',
  description: 'A fresh design project.',
  imageUrl: publicAsset('newproject/thumb.webp'),
  caseStudyComponent: 'GraphicDesignSlideshow',
  caseStudy: {
    gallery: {
      images: [
        { src: publicAsset('newproject/1.webp'), thumb: publicAsset('newproject/1_thumb.webp'), title: 'Design 1', description: 'First design' }
      ]
    }
  }
}
```

## 📦 Component Composition Patterns

### Extending BaseCaseStudy
```vue
<script setup>
import BaseCaseStudy from './BaseCaseStudy.vue'
defineProps({ project: { type: Object, required: true } })
</script>
<template>
  <BaseCaseStudy :project="project" />
</template>
```

### Using Constants
```javascript
import { getProjectButtonLabel, getCategoryLabel } from '@/constants/ui.js'

const buttonLabel = computed(() => 
  getProjectButtonLabel(project.category, project.caseStudyComponent)
)
```

## 🔗 Navigation & Routing

- **Home**: `/` - Main portfolio with all projects
- **About**: `/about` - About/CV page
- **Sections**: Auto-scroll to category sections via `getSectionId()`

## 🎯 Best Practices

### Code Organization
- Keep components focused and single-purpose
- Extract repeated logic into composables
- Use constants for string literals and configuration
- Always add JSDoc comments to utilities and functions

### Styling
- Use Tailwind CSS utility classes
- Follow existing spacing and color conventions
- Maintain responsive design (mobile-first approach)
- Use the established class patterns for consistency

### Data Management
- Validate project objects with `isProject()` validator
- Use `publicAsset()` for all relative asset paths
- Keep project data in `projects.js` - don't scatter it
- Use `categoryData.js` for category metadata

### Performance
- Images use lazy loading
- Case study components loaded dynamically
- Use computed properties for derived data
- Minimize prop drilling with composables

## 🐛 Common Issues & Solutions

### Images Not Loading
- **Issue**: Images appear broken
- **Solution**: Ensure paths use `publicAsset()` function and files exist in `/public/`

### Component Not Rendering
- **Issue**: Custom case study doesn't show
- **Solution**: Check `caseStudyComponent` name matches filename exactly (case-sensitive)

### Style Inconsistencies
- **Issue**: Different components look different
- **Solution**: Use constants from `ui.js` and extend BaseCaseStudy

## 📚 Available Utilities

### Composables
- `useProjectsByCategory()` - Project organization and filtering
- `useCurrentTime()` - Current time display

### Utils
- `isProject()` - Validate project object structure

### Data
- `publicAsset()` - Convert relative to public paths
- `getSectionId()` - Generate navigation IDs

### Constants
- `PROJECT_CATEGORY_LABELS` - Category display names
- `getProjectButtonLabel()` - Smart button label selection
- `getCategoryLabel()` - Readable category labels

## 🚀 Development Workflow

1. **Start dev server**: `npm run dev`
2. **Build for production**: `npm run build`
3. **Preview build**: `npm run preview`
4. **Lint code**: `npm run lint`

## 📝 Git Workflow Recommendations

```bash
# Create a feature branch for changes
git checkout -b feature/add-new-project

# Make your changes
# Commit with clear messages
git commit -m "feat: add new project"

# Push and create PR
git push origin feature/add-new-project
```

---

**Questions?** Check the component source files - they're well-commented!
