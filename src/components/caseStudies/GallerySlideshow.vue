<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

// Frame shape and labels per category. Anything not listed falls back to a 16:9 frame.
const LAYOUTS = {
  'Photography': {
    frame: 'aspect-16/10',
    eyebrow: 'Photography Portfolio',
    mobileEyebrow: 'Photo',
  },
  'Graphic Design': {
    frame: 'content-center aspect-[21/29.7] h-full max-h-[70vh] w-auto',
  },
  'Video': {
    frame: 'aspect-9/16 max-w-xs mx-auto',
  },
}

const layout = computed(() => LAYOUTS[props.project.category] ?? { frame: 'aspect-video' })

const gallery = computed(() => props.project.caseStudy?.gallery ?? {})
const isVideo = computed(() => Boolean(gallery.value.videos))
const items = computed(() => gallery.value.videos ?? gallery.value.images ?? [])
const itemLabel = computed(() => (isVideo.value ? 'video' : 'image'))

const currentIndex = ref(0)
const currentItem = computed(() => items.value[currentIndex.value] || null)
const total = computed(() => items.value.length)

const canPrevious = computed(() => currentIndex.value > 0)
const canNext = computed(() => currentIndex.value < total.value - 1)

const goToPrevious = () => {
  if (canPrevious.value) currentIndex.value--
}

const goToNext = () => {
  if (canNext.value) currentIndex.value++
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') goToPrevious()
  if (e.key === 'ArrowRight') goToNext()
}

const pad = value => String(value).padStart(2, '0')

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="w-full h-full overflow-y-auto bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Header -->
      <div class="mb-12 space-y-4">
        <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">
          <template v-if="layout.mobileEyebrow">
            <span class="hidden md:inline">{{ layout.eyebrow }}</span>
            <span class="md:hidden">{{ layout.mobileEyebrow }}</span>
          </template>
          <template v-else>{{ layout.eyebrow || project.category }}</template>
        </p>
        <h1 class="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">{{ project.title }}</h1>
        <p class="text-slate-600 max-w-2xl">{{ project.description }}</p>
      </div>

      <div class="space-y-8">
        <!-- Featured item -->
        <div
          v-if="currentItem"
          :class="['relative rounded-lg overflow-hidden border border-slate-200 shadow-lg bg-slate-100', layout.frame]"
        >
          <transition name="fade-slide" mode="out-in">
            <video
              v-if="isVideo"
              :key="currentIndex"
              :src="currentItem.src"
              controls
              playsinline
              preload="metadata"
              class="w-full h-full object-cover"
            />
            <img
              v-else
              :key="currentIndex"
              :src="currentItem.src"
              :alt="currentItem.title"
              class="w-full h-full object-cover"
            />
          </transition>

          <button
            @click="goToPrevious"
            :disabled="!canPrevious"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 p-2.5 rounded-full transition-all duration-200 border border-slate-200 shadow-md hover:shadow-lg"
            :aria-label="`Previous ${itemLabel}`"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            @click="goToNext"
            :disabled="!canNext"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 p-2.5 rounded-full transition-all duration-200 border border-slate-200 shadow-md hover:shadow-lg"
            :aria-label="`Next ${itemLabel}`"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <div class="absolute top-4 right-4 bg-white/95 border border-slate-200 text-slate-900 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            {{ pad(currentIndex + 1) }} / {{ pad(total) }}
          </div>
        </div>

        <!-- Item info -->
        <div v-if="currentItem" class="space-y-4">
          <div class="space-y-3">
            <h2 class="text-2xl font-black uppercase tracking-tight text-black">{{ currentItem.title }}</h2>
            <p v-if="currentItem.description" class="text-slate-600 leading-relaxed max-w-2xl">{{ currentItem.description }}</p>
          </div>
          <div v-if="currentItem.externalUrl" class="pt-2">
            <a
              :href="currentItem.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-pink-800 hover:bg-pink-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              {{ currentItem.externalLabel || 'View Project' }}
            </a>
          </div>
        </div>

        <!-- Thumbnail strip -->
        <div class="space-y-4">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">View All</p>
          <div class="overflow-x-auto pb-2">
            <div class="flex gap-4 min-w-min">
              <button
                v-for="(item, index) in items"
                :key="item.src"
                @click="currentIndex = index"
                :aria-label="`Show ${item.title}`"
                :class="[
                  'relative shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200',
                  currentIndex === index
                    ? 'border-pink-800 ring-2 ring-pink-200'
                    : 'border-slate-200 hover:border-slate-300'
                ]"
              >
                <template v-if="isVideo">
                  <video :src="item.src" preload="metadata" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  </div>
                </template>
                <img
                  v-else
                  :src="item.thumb || item.src"
                  :alt="item.title"
                  loading="lazy"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>
