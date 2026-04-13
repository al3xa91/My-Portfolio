<script setup>
import { computed, onMounted, ref } from 'vue'
import { isProject } from '@/utils/projectValidation.js'
import ProjectCaseStudy from '@/components/cards/ProjectCaseStudy.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: isProject,
  },
})

const isPreviewOpen = ref(false)
const hasPreview = computed(() => Boolean(props.project?.title))

const hasEmbed = computed(() => Boolean(props.project.embedUrl))

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
    isPreviewOpen.value = true
  }
}

const closePreview = () => {
  isPreviewOpen.value = false
}
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
        v-if="hasPreview"
        type="button"
        @click="openPreview"
        class="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-pink-800 transition-colors"
      >
        Open Project
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
        @click.self="closePreview"
      >
        <div class="w-full h-full bg-white overflow-hidden shadow-2xl flex flex-col">
          <div class="flex items-center justify-between px-5 py-3 border-b border-slate-200">
            <h4 class="font-black uppercase tracking-wider text-sm text-slate-800">{{ project.title }}</h4>
            <button
              type="button"
              @click="closePreview"
              class="text-slate-500 hover:text-black font-black text-xs uppercase tracking-wider"
            >
              Close
            </button>
          </div>

          <div class="flex-1 min-h-0 bg-slate-100 relative">
            <ProjectCaseStudy :project="project" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>