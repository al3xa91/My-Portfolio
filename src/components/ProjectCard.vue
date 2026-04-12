<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: value => {
      return (
        typeof value.id === 'number'
        && typeof value.title === 'string'
        && typeof value.category === 'string'
        && typeof value.description === 'string'
        && typeof value.imageUrl === 'string'
        && (value.prototypeVideoUrl === undefined || typeof value.prototypeVideoUrl === 'string')
        && (value.prototypeImageUrl === undefined || typeof value.prototypeImageUrl === 'string')
        && (value.prototypePdfUrl === undefined || typeof value.prototypePdfUrl === 'string')
        && (value.embedUrl === undefined || typeof value.embedUrl === 'string')
      )
    },
  },
})

const isPreviewOpen = ref(false)
const isEmbedLoading = ref(false)

const hasPreview = computed(() => {
  return Boolean(
    props.project.prototypeVideoUrl
    || props.project.prototypeImageUrl
    || props.project.prototypePdfUrl
    || props.project.embedUrl
  )
})

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
    isEmbedLoading.value = hasEmbed.value
    isPreviewOpen.value = true
  }
}

const closePreview = () => {
  isPreviewOpen.value = false
  isEmbedLoading.value = false
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
        Open Preview
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
            <video
              v-if="project.prototypeVideoUrl"
              controls
              playsinline
              class="w-full h-full object-cover"
            >
              <source :src="project.prototypeVideoUrl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <iframe
              v-else-if="project.embedUrl"
              :src="project.embedUrl"
              :title="`${project.title} prototype full view`"
              allowfullscreen
              loading="eager"
              @load="isEmbedLoading = false"
              class="w-full h-full border-0"
            ></iframe>
            <div
              v-if="project.embedUrl && isEmbedLoading"
              class="absolute inset-0 flex items-center justify-center bg-slate-100"
            >
              <p class="text-slate-500 text-sm uppercase tracking-widest font-black">Loading prototype...</p>
            </div>
            <img
              v-else-if="project.prototypeImageUrl"
              :src="project.prototypeImageUrl"
              :alt="`${project.title} preview`"
              class="w-full h-full object-cover"
            />
            <object
              v-else-if="project.prototypePdfUrl"
              :data="project.prototypePdfUrl"
              type="application/pdf"
              class="w-full h-full"
            >
              <div class="w-full h-full flex items-center justify-center px-6 text-center">
                <div>
                  <p class="text-slate-700 font-black uppercase tracking-wider text-xs mb-3">PDF preview not supported in this browser</p>
                  <a
                    :href="project.prototypePdfUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="text-[10px] font-black uppercase tracking-widest text-pink-800 hover:text-black"
                  >
                    Open PDF in New Tab
                  </a>
                </div>
              </div>
            </object>
            <div v-else class="w-full h-full flex items-center justify-center text-slate-500 text-sm">
              Preview not available
            </div>
          </div>

          <div v-if="project.prototypePdfUrl" class="px-5 py-3 border-t border-slate-200 bg-white">
            <div class="flex items-center">
              <a
                :href="project.prototypePdfUrl"
                target="_blank"
                rel="noreferrer"
                class="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-pink-800"
              >
                Open PDF in New Tab
              </a>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>