<script setup>
import { computed, defineAsyncComponent, onUnmounted, ref, watch } from 'vue'
import { isProject } from '@/utils/projectValidation.js'
import { getProjectButtonLabel } from '@/constants/ui.js'

const BaseCaseStudy = defineAsyncComponent(() => import('@/components/caseStudies/BaseCaseStudy.vue'))
const GallerySlideshow = defineAsyncComponent(() => import('@/components/caseStudies/GallerySlideshow.vue'))

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: isProject,
  },
})

const isPreviewOpen = ref(false)

// Projects with a gallery open as a slideshow, everything else as a written case study.
const caseStudyComponent = computed(() =>
  props.project.caseStudy?.gallery ? GallerySlideshow : BaseCaseStudy
)

const buttonLabel = computed(() => getProjectButtonLabel(props.project.category))

const openPreview = () => {
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') closePreview()
}

// Lock page scroll and listen for Escape while the overlay is open.
watch(isPreviewOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="group">
    <div class="aspect-16/10 bg-slate-100 mb-8 overflow-hidden rounded-sm relative">
      <img
        :src="project.imageUrl" 
        :alt="project.title"
        loading="lazy"
        class="w-full h-full object-cover grayscale group-hover:grayscale-0 touch-fullcolor group-hover:scale-105 transition-all duration-700 ease-out"
      />

      <button
        type="button"
        @click="openPreview"
        class="absolute bottom-4 right-4 bg-black/80 group-hover:bg-pink-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-black transition-colors"
      >
        {{ buttonLabel }}
      </button>
    </div>

    <div class="flex justify-between items-start">
      <div>
        <p class="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-2">
          {{ project.category }}
        </p>
        <h3 class="text-4xl font-bold tracking-tighter mb-4 uppercase">
          {{ project.title }}
        </h3>
      </div>
    </div>
    <p class="text-slate-500 text-lg leading-relaxed max-w-md">
      {{ project.description }}
    </p>

    <teleport to="body">
      <div
        v-if="isPreviewOpen"
        class="fixed inset-0 z-50 bg-black/80 p-0 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        :aria-label="project.title"
        @click.self="closePreview"
      >
        <div class="w-full h-full bg-white overflow-hidden shadow-2xl flex flex-col">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-200">
            <h4 class="font-black uppercase tracking-wider text-sm text-slate-800">{{ project.title }}</h4>
            <button
              type="button"
              @click="closePreview"
              class="bg-pink-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>

          <div class="flex-1 min-h-0 bg-slate-100 relative">
            <component :is="caseStudyComponent" :project="project" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>