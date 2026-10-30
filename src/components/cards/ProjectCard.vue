<script setup>
import { computed, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isProject } from '@/utils/projectValidation.js'
import { getProjectButtonLabel } from '@/constants/ui.js'
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

const buttonLabel = computed(() => 
  getProjectButtonLabel(props.project.category, props.project.caseStudyComponent)
)

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
    const { project, ...rest } = route.query
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
  <div class="group">
    <!-- The whole image opens the project -->
    <button
      type="button"
      :disabled="!hasPreview"
      :aria-label="`${buttonLabel}: ${project.title}`"
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
        v-if="hasPreview"
        aria-hidden="true"
        class="absolute bottom-4 right-4 bg-black/80 group-hover:bg-pink-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-colors"
      >
        {{ buttonLabel }}
      </span>
    </button>

    <div class="flex justify-between items-start">
      <div>
        <p class="text-pink-800 font-bold text-[10px] uppercase tracking-widest mb-2">
          {{ project.category }}
        </p>
        <h3 class="text-xl font-bold tracking-tighter mb-2 uppercase">
          {{ project.title }}
        </h3>
      </div>
    </div>
    <p class="text-slate-500 text-base leading-relaxed">
      {{ project.description }}
    </p>

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