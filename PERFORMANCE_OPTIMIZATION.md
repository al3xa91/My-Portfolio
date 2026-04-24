# Performance Optimization Guide

## Overview
This document outlines the performance optimizations implemented in the portfolio and best practices for maintaining high performance.

## Optimizations Implemented

### 1. Image Optimization
- **Native Lazy Loading**: All images use `loading="lazy"` attribute
- **Optimized URLs**: Unsplash images now include format optimization (`fm=auto` for WebP support)
- **Responsive Thumbnails**: Thumbnail images use smaller dimensions (400px) to reduce bandwidth
- **Quality Tuning**: Images use `q=80` for JPEGs and `fm=auto` for automatic format selection

**Before:**
```
https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200
```

**After:**
```
https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fm=auto
```

### 2. Resource Preconnection
Added preconnects for external domains to reduce DNS lookup and connection time:
- `https://images.unsplash.com` - External image CDN
- `https://embed.figma.com` - Figma embeds
- `https://www.figma.com` - Figma resources

Implemented in `src/utils/performanceOptimization.js` and initialized in `App.vue`.

### 3. Code Splitting (Already Implemented)
- AboutView uses route-level code splitting
- Case study components loaded dynamically with `defineAsyncComponent`
- Slideshow components only loaded when needed

### 4. Performance Monitoring
- Core Web Vitals tracking in development mode:
  - **LCP** (Largest Contentful Paint)
  - **FID** (First Input Delay)
  - **CLS** (Cumulative Layout Shift)

## Best Practices Going Forward

### Images
1. Always use `loading="lazy"` for images
2. Provide both src and thumb sizes
3. Use WebP format when possible via Unsplash's `fm=auto`
4. Optimize dimensions for your use case:
   - Thumbnails: 300-400px
   - Cards: 600-800px
   - Full-screen: 1200-1600px

### External Resources
1. Add preconnect links for frequently-used external domains
2. Use `dns-prefetch` for less critical domains
3. Defer Figma embed loading until needed

### Components
1. Use lazy loading with `defineAsyncComponent` for heavy components
2. Memoize computed properties that depend on arrays
3. Use `v-once` for static content
4. Avoid deep watchers on large data structures

### Bundle Size
- Monitor bundle size with `npm run build` analysis
- Keep components focused and single-purpose
- Extract repeated logic into composables
- Use tree-shaking for unused imports

### Performance Monitoring
View metrics in browser dev tools console during development:
```
LCP: ~2000ms
FID: ~50ms  
CLS: ~0.1
```

## Measurement & Testing

### Local Testing
1. Use Chrome DevTools Lighthouse for detailed performance reports
2. Check Network tab for waterfall and request sizes
3. Monitor Core Web Vitals in console (development mode)

### Production Monitoring
Consider adding:
- Web Vitals tracking with `web-vitals` npm package
- Real User Monitoring (RUM) with services like LogRocket
- Error tracking with Sentry

## Future Optimizations

### Potential Improvements
1. **Image CDN**: Replace Unsplash with custom CDN for better performance
2. **Service Workers**: Implement PWA features and offline support
3. **Asset Caching**: Set up aggressive caching strategies for static assets
4. **Font Optimization**: Use `font-display: swap` and subset fonts
5. **Critical CSS**: Extract and inline critical CSS for faster FCP

### Monitoring Tools
- PageSpeed Insights for automated reports
- WebPageTest for detailed analysis
- GTmetrix for performance tracking
- Lighthouse CI for automated testing

## File References

### Performance-Related Files
- `src/utils/performanceOptimization.js` - Performance utilities
- `src/App.vue` - Performance initialization
- `src/data/portfolio/projects.js` - Optimized image URLs
- `src/components/cards/ProjectCard.vue` - Lazy loading implementation

## Performance Checklist

Before deploying updates:
- [ ] Images use lazy loading
- [ ] External URLs include query optimization
- [ ] No console errors or warnings
- [ ] Lighthouse score > 80
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

## Resources

- [Web Vitals Guide](https://web.dev/vitals/)
- [Unsplash Image Optimization](https://unsplash.com/napi/documentation)
- [Vue 3 Performance Guide](https://vuejs.org/guide/best-practices/performance.html)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
