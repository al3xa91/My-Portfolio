# Developer Checklist

Use this checklist when making changes to the portfolio.

## ✅ Before Committing Code

### Code Quality
- [ ] Code follows existing patterns and conventions
- [ ] No console warnings or errors
- [ ] Used constants instead of hardcoded strings
- [ ] Removed any debug code or console.logs
- [ ] Components have proper JSDoc comments

### Imports & Organization
- [ ] Used index files for imports (e.g., `from '@/constants'`)
- [ ] Import paths are as short as possible
- [ ] No unused imports in files
- [ ] Related utilities grouped together

### Components
- [ ] Component has a descriptive comment header
- [ ] Props are properly typed and documented
- [ ] Complex logic extracted to composables
- [ ] No prop drilling (use composables for deep data)

### Styling
- [ ] Using Tailwind utility classes consistently
- [ ] Responsive design considered (mobile-first)
- [ ] Color and spacing follow existing conventions
- [ ] No inline styles or custom CSS where Tailwind suffices

### Data
- [ ] Project objects pass `isProject()` validation
- [ ] Image paths use `publicAsset()` function
- [ ] All project IDs are unique
- [ ] Category is from allowed list: 'UX/UI', 'Graphic Design', 'Photography', 'Web Dev', 'Video'

---

## 🎯 Adding a New Project

- [ ] Project object created in `src/data/portfolio/projects.js`
- [ ] Unique ID assigned (use decimal like 2.4 for subcategories)
- [ ] Category is from approved list
- [ ] Images added to `public/` folder
- [ ] Image paths use `publicAsset()` function
- [ ] Chose correct case study component:
  - [ ] Gallery projects use `GraphicDesignSlideshow` or `PhotographySlideshow`
  - [ ] Other projects use custom component (extends `BaseCaseStudy`)
- [ ] Project tested in dev browser
- [ ] Responsive design verified on mobile

---

## 🔄 Updating Existing Components

- [ ] Changes tested in development
- [ ] No breaking changes to props
- [ ] Updated DEVELOPER_README.md if patterns changed
- [ ] If adding new component, added to index file
- [ ] If modifying exports, updated index files

---

## 📝 Adding New Features

### New Utility Function
- [ ] Added to appropriate file in `src/utils/`
- [ ] Added JSDoc documentation
- [ ] Exported in `src/utils/index.js`
- [ ] Function tested standalone

### New Composable
- [ ] Added to `src/composables/`
- [ ] Includes JSDoc documentation
- [ ] Exported in `src/composables/index.js`
- [ ] Used in at least one component

### New Component
- [ ] Added to appropriate folder in `src/components/`
- [ ] Includes component comment header
- [ ] Props documented with JSDoc
- [ ] Exported in `src/components/index.js`
- [ ] Example usage added to DEVELOPER_README.md

### New Constant
- [ ] Added to `src/constants/ui.js` or new file
- [ ] Exported in `src/constants/index.js`
- [ ] Avoid magic strings throughout codebase

---

## 🧪 Testing

- [ ] Run `npm run dev` and check terminal for errors
- [ ] Visual inspection in browser
  - [ ] Desktop (1920px+)
  - [ ] Tablet (768px-1024px)
  - [ ] Mobile (320px-480px)
- [ ] All links work correctly
- [ ] Images load without 404s
- [ ] Scroll navigation functions properly
- [ ] No console errors or warnings

---

## 📚 Documentation

### When Adding a Component Pattern
- [ ] Updated DEVELOPER_README.md with example
- [ ] Added JSDoc to component file
- [ ] Included usage instructions

### When Changing Architecture
- [ ] Updated CODE_CLEANUP_SUMMARY.md
- [ ] Updated DEVELOPER_README.md
- [ ] Consider impact on existing developers

---

## 🚀 Ready to Commit

- [ ] All checklist items above completed
- [ ] Code reviewed for consistency
- [ ] No breaking changes introduced
- [ ] Tests pass (if applicable)
- [ ] Branch is up to date with main
- [ ] Commit message is clear and descriptive

---

**Pro Tips:**
- Use the constants from `src/constants/ui.js` - don't hardcode labels
- Extend `BaseCaseStudy` for case study components - don't reinvent the wheel
- Use composables for shared logic - keep components focused
- Check DEVELOPER_README.md before starting - saves time!

For questions, refer to `DEVELOPER_README.md` or check existing component examples.
