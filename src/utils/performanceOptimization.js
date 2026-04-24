/**
 * Performance Optimization Utilities
 * Handles image optimization, preconnects, and performance best practices
 */

/**
 * Adds preconnect links for external domains
 * Improves connection speed for external resources
 */
export const setupPreconnects = () => {
  const domains = [
    { href: 'https://images.unsplash.com', rel: 'preconnect' },
    { href: 'https://embed.figma.com', rel: 'preconnect' },
    { href: 'https://www.figma.com', rel: 'preconnect' },
  ]

  domains.forEach(({ href, rel }) => {
    const existing = document.querySelector(`link[href="${href}"]`)
    if (!existing) {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (rel === 'preconnect') {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    }
  })
}

/**
 * Optimizes image URL for faster loading
 * Reduces file size for thumbnails and smaller screens
 * @param {string} url - Original image URL
 * @param {string} size - Size variant ('thumb', 'medium', 'large')
 * @returns {string} Optimized URL
 */
export const optimizeImageUrl = (url, size = 'medium') => {
  if (!url) return url

  // For unsplash URLs, optimize query parameters
  if (url.includes('unsplash.com')) {
    const sizeMap = {
      thumb: { w: 300, q: 80, fmt: 'auto' },
      medium: { w: 800, q: 80, fmt: 'auto' },
      large: { w: 1600, q: 85, fmt: 'auto' },
    }

    const params = sizeMap[size] || sizeMap.medium

    // Check if URL already has query params
    const separator = url.includes('?') ? '&' : '?'
    const newParams = `${separator}w=${params.w}&q=${params.q}&fm=${params.fmt}`

    // Remove existing w and q params if present
    const baseUrl = url.replace(/[&?](w|q|fm)=[^&]*/g, '')
    return `${baseUrl}${newParams}`
  }

  return url
}

/**
 * Registers performance observer to track Core Web Vitals
 * Useful for monitoring and analytics
 */
export const observePerformanceMetrics = () => {
  // Check if PerformanceObserver is available
  if (!window.PerformanceObserver) return

  try {
    // Observe Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const lastEntry = list.getEntries().pop()
      if (lastEntry) {
        console.log('LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime))
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // Observe First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', Math.round(entry.processingDuration))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Observe Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      console.log('CLS:', clsValue)
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  } catch (error) {
    console.log('Performance monitoring not fully supported')
  }
}

/**
 * Lazy loads images when they come into view
 * Improves initial page load performance
 */
export const setupIntersectionObserver = () => {
  if (!window.IntersectionObserver) return

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      }
    })
  })

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img)
  })
}

/**
 * Defers non-critical CSS loading
 * Improves First Contentful Paint
 */
export const deferNonCriticalCSS = () => {
  const links = document.querySelectorAll('link[data-defer]')
  links.forEach((link) => {
    const href = link.href
    link.rel = 'preload'
    link.as = 'style'
    link.onload = function () {
      this.rel = 'stylesheet'
    }
  })
}
