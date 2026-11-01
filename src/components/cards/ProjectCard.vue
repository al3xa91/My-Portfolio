<script setup>
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isProject } from '@/utils/projectValidation.js'
import ProjectCaseStudy from '@/components/cards/ProjectCaseStudy.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: isProject,
  },
})

const route = useRoute()
const router = useRouter()

// The open project lives in the URL (e.g. /?project=1), so the browser's
// back button and the phone's back gesture return to the project list,
// and each project has its own link that can be shared.
const isPreviewOpen = computed(() => route.query.project === String(props.project.id))
const hasPreview = computed(() => Boolean(props.project?.title))

const hasEmbed = computed(() => Boolean(props.project.embedUrl))

/**
 * Dynamically load the case study component for this project
 * Provides component composition flexibility for different project types
 */
const caseStudyComponent = computed(() => {
  if (!props.project.caseStudyComponent) {
    return ProjectCaseStudy
  }

  try {
    return defineAsyncComponent(() =>
      import(`@/components/caseStudies/${props.project.caseStudyComponent}.vue`)
    )
  } catch {
    return ProjectCaseStudy
  }
})

// How many pieces are inside (posters, photos, logos…), shown on the card
const itemCount = computed(() => {
  const caseStudy = props.project.caseStudy ?? {}
  if (caseStudy.logos) return caseStudy.logos.length
  const gallery = caseStudy.gallery ?? {}
  return (gallery.images?.length ?? 0) + (gallery.videos?.length ?? 0)
})
const countLabel = computed(() =>
  props.project.itemName && itemCount.value > 1 ? `${itemCount.value} ${props.project.itemName}` : ''
)

// Text on the card's button: set per project with `cta`, otherwise based on what's inside
const ctaLabel = computed(() => {
  if (props.project.cta) return props.project.cta
  if (countLabel.value) return `View ${countLabel.value}`
  return props.project.caseStudy?.sections ? 'Read case study' : 'View project'
})

const ensureFigmaPreconnect = () => {
  const hosts = ['https://embed.figma.com', 'https://www.figma.com']

  hosts.forEach(host => {
    const exists = document.querySelector(`link[data-preconnect="${host}"]`)
    if (!exists) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = host
      link.crossOrigin = 'anonymous'
      link.setAttribute('data-preconnect', host)
      document.head.appendChild(link)
    }
  })
}

onMounted(() => {
  if (hasEmbed.value) {
    ensureFigmaPreconnect()
  }
})

const openPreview = () => {
  if (hasPreview.value) {
    router.push({ query: { ...route.query, project: String(props.project.id) } })
  }
}

const closePreview = () => {
  // Opened from the list: go back one step. Opened from a shared link: just remove the project from the URL.
  if (window.history.state?.back) {
    router.back()
  } else {
    const { project, logo, ...rest } = route.query
    router.replace({ query: rest })
  }
}

const handleKeydown = event => {
  // Only close if no fullscreen image is open on top of the project
  if (event.key === 'Escape' && isPreviewOpen.value && !document.querySelector('.z-\\[100\\]')) {
    closePreview()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const preloadCaseStudy = () => {
  if (props.project.caseStudyComponent) {
    import(`@/components/caseStudies/${props.project.caseStudyComponent}.vue`).catch(() => {})
  }
}
</script>

<template>
  <!-- Full-height column so the buttons line up across a row -->
  <div class="group flex h-full flex-col">
    <!-- The whole image opens the project -->
    <button
      type="button"
      :disabled="!hasPreview"
      :aria-label="`${ctaLabel}: ${project.title}`"
      @click="openPreview"
      @mouseenter="preloadCaseStudy"
      @focus="preloadCaseStudy"
      class="block w-full aspect-16/10 bg-slate-100 mb-6 overflow-hidden rounded-sm relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800 focus-visible:ring-offset-4"
    >
      <img
        :src="project.imageUrl"
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover grayscale group-hover:grayscale-0 touch-fullcolor group-hover:scale-105 transition-all duration-700 ease-out"
      />

      <span
        v-if="countLabel"
        aria-hidden="true"
        class="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm"
      >
        <svg class="h-3 w-3 text-pink-800" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="7" y="7" width="13" height="13" rx="2" /><path d="M4 16V6a2 2 0 012-2h10" stroke-linecap="round" /></svg>
        {{ countLabel }}
      </span>
    </button>

    <div class="flex justify-between items-start">
      <div>
        <p class="text-pink-800 font-bold text-[10px] uppercase tracking-widest mb-2">
          {{ project.label || project.category }}
        </p>
        <h3 class="text-xl font-bold tracking-tighter mb-2 uppercase">
          <button
            type="button"
            tabindex="-1"
            @click="openPreview"
            class="text-left uppercase transition-colors hover:text-pink-800"
          >
            {{ project.title }}
          </button>
        </h3>
      </div>
    </div>
    <p class="flex-1 text-slate-500 text-base leading-relaxed">
      {{ project.description }}
    </p>

    <!-- Clear call to action, same style as the other pink buttons -->
    <button
      v-if="hasPreview"
      type="button"
      @click="openPreview"
      @mouseenter="preloadCaseStudy"
      @focus="preloadCaseStudy"
      class="mt-5 self-start inline-flex items-center gap-2 rounded-full bg-pink-800 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-black"
    >
      {{ ctaLabel }}
      <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6l6 6-6 6" /></svg>
    </button>

    <teleport to="body">
      <div
        v-if="isPreviewOpen"
        class="fixed inset-0 z-50 bg-black/80 p-0 flex items-center justify-center"
        @click.self="closePreview"
      >
        <div class="w-full h-full bg-white overflow-hidden shadow-2xl flex flex-col">
          <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 border-b border-slate-200">
            <button
              type="button"
              @click="closePreview"
              class="justify-self-start inline-flex items-center gap-2 -ml-2 px-2 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-pink-800 hover:text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800"
              aria-label="Back to all projects"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h4 class="font-black uppercase tracking-wider text-sm text-slate-800 truncate text-center">{{ project.title }}</h4>
            <span aria-hidden="true"></span>
          </div>

          <div class="flex-1 min-h-0 bg-slate-100 relative">
            <component :is="caseStudyComponent" :project="project" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>