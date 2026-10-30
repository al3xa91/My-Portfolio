<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

// Slides with `detailsLabel` show a button that asks the parent to open a detailed page
const emit = defineEmits(['openItem'])

const currentIndex = ref(0)
const isImageFullscreen = ref(false)

// Works for every gallery project: images, videos, or a mix of both
const images = computed(() => {
  const gallery = props.project.caseStudy?.gallery ?? {}
  return [
    ...(gallery.images ?? []),
    ...(gallery.videos ?? []).map(video => ({ ...video, type: 'video' })),
  ]
})

// Links for the current slide: the slide's own links first, then the project's
const links = computed(() => {
  const item = currentImage.value ?? {}
  const project = props.project.caseStudy ?? {}
  return [
    { label: 'View project', url: item.externalUrl },
    { label: 'Visit live site', url: item.liveUrl || project.liveUrl },
    { label: 'View code', url: item.codeUrl || project.codeUrl },
  ].filter(link => link.url)
})

const isVideo = item => item?.type === 'video' || /\.(mp4|webm|mov)$/i.test(item?.src ?? '')

const currentImage = computed(() => {
  return images.value[currentIndex.value] ?? null
})

const totalImages = computed(() => images.value.length)

const canPrevious = computed(() => currentIndex.value > 0)
const canNext = computed(() => currentIndex.value < totalImages.value - 1)

const goToPrevious = () => {
  if (canPrevious.value) {
    currentIndex.value -= 1
  }
}

const goToNext = () => {
  if (canNext.value) {
    currentIndex.value += 1
  }
}

const goToImage = index => {
  if (index >= 0 && index < totalImages.value) {
    currentIndex.value = index
  }
}

const openImageFullscreen = () => {
  if (currentImage.value && !isVideo(currentImage.value)) {
    isImageFullscreen.value = true
  }
}

const closeImageFullscreen = () => {
  isImageFullscreen.value = false
}

const handleKeydown = event => {
  if (event.key === 'Escape' && isImageFullscreen.value) {
    closeImageFullscreen()
    return
  }

  if (event.key === 'ArrowLeft') {
    goToPrevious()
  }

  if (event.key === 'ArrowRight') {
    goToNext()
  }
}

watch(images, () => {
  if (currentIndex.value >= images.value.length) {
    currentIndex.value = Math.max(images.value.length - 1, 0)
  }
})

watch(currentIndex, index => {
  ;[index - 1, index + 1].forEach(i => {
    const item = images.value[i]
    if (item && !isVideo(item)) new Image().src = item.src
  })
}, { immediate: true })

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-white text-black">
    <!-- Simple header without overlays -->
    <header class="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
      <div class="min-w-0">
        <p class="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-pink-800">
          {{ project.label || project.category }}
        </p>

        <h1 class="truncate text-sm font-bold uppercase tracking-wide text-black sm:text-base">
          {{ project.title }}
        </h1>
      </div>

      <div
        class="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-slate-600"
      >
        {{ String(currentIndex + 1).padStart(2, '0') }}
        /
        {{ String(totalImages).padStart(2, '0') }}
      </div>
    </header>

    <!-- Main gallery layout -->
    <main
      v-if="currentImage"
      class="grid h-[calc(100%-73px)] min-h-0 grid-cols-1 gap-6 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10"
    >
      <!-- Image area -->
      <section class="relative flex min-h-0 items-center justify-center">
        <!-- Video: plays in place with its own controls -->
        <div v-if="isVideo(currentImage)" class="flex h-full min-h-0 w-full items-center justify-center px-12">
          <video
            :key="currentImage.src"
            :src="currentImage.src"
            :poster="currentImage.poster"
            controls
            playsinline
            preload="metadata"
            class="max-h-full max-w-full rounded-sm bg-black shadow-lg"
          ></video>
        </div>

        <button
          v-else
          type="button"
          :class="[
            'group relative flex h-full min-h-0 w-full items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800 focus-visible:ring-offset-4',
            currentImage.detailsLabel ? 'cursor-pointer' : 'cursor-zoom-in',
          ]"
          @click="currentImage.detailsLabel ? emit('openItem', currentIndex) : openImageFullscreen()"
          :aria-label="currentImage.detailsLabel ? `${currentImage.detailsLabel}: ${currentImage.title}` : 'Open image fullscreen'"
        >
          <img
            :key="currentIndex"
            :src="currentImage.src"
            :alt="currentImage.title"
            fetchpriority="high"
            class="fade-in max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />

          <span
            class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
          >
            {{ currentImage.detailsLabel ? 'Click to open' : 'Click to enlarge' }}
          </span>
        </button>

        <!-- Previous image -->
        <button
          type="button"
          :disabled="!canPrevious"
          @click.stop="goToPrevious"
          class="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20 sm:left-3"
          aria-label="Previous image"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Next image -->
        <button
          type="button"
          :disabled="!canNext"
          @click.stop="goToNext"
          class="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20 sm:right-3"
          aria-label="Next image"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </section>

      <!-- Information area beside image -->
      <aside class="flex min-h-0 flex-col justify-center border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div>
          <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-pink-800">
            {{ project.label || project.category }}
          </p>

          <h2 class="text-xl font-black uppercase tracking-tight text-black sm:text-2xl">
            {{ currentImage.title }}
          </h2>

          <p
            v-if="currentImage.description"
            class="mt-4 text-sm leading-relaxed text-slate-600"
          >
            {{ currentImage.description }}
          </p>

          <button
            v-if="currentImage.detailsLabel"
            type="button"
            @click="emit('openItem', currentIndex)"
            class="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-pink-800 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-black"
          >
            {{ currentImage.detailsLabel }}
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <!-- Optional links: each one only shows when its address is filled in -->
          <div v-if="links.length" class="mt-6 flex flex-wrap gap-3">
            <a
              v-for="(link, index) in links"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :class="[
                'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors',
                index === 0 && !currentImage.detailsLabel
                  ? 'bg-pink-800 text-white hover:bg-black'
                  : 'border border-pink-800 text-pink-800 hover:border-black hover:bg-black hover:text-white',
              ]"
            >
              {{ link.label }}
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Thumbnail navigation -->
        <div
          v-if="images.length > 1"
          class="mt-8"
        >
          <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            View all
          </p>

          <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
            <button
              v-for="(image, index) in images"
              :key="`${image.src}-${index}`"
              type="button"
              :aria-label="`View ${image.title}`"
              :aria-current="currentIndex === index ? 'true' : undefined"
              @click="goToImage(index)"
              :class="[
                'relative aspect-square overflow-hidden rounded border bg-slate-100 transition-all duration-200',
                currentIndex === index
                  ? 'border-pink-800 opacity-100 ring-1 ring-pink-200'
                  : 'border-slate-200 opacity-60 hover:border-pink-300 hover:opacity-100'
              ]"
            >
              <template v-if="isVideo(image)">
                <img
                  v-if="image.poster"
                  :src="image.poster"
                  :alt="image.title"
                  class="h-full w-full object-cover"
                />
                <video
                  v-else
                  :src="`${image.src}#t=0.5`"
                  muted
                  playsinline
                  preload="metadata"
                  class="h-full w-full object-cover pointer-events-none"
                ></video>
                <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-pink-800 shadow">
                    <svg class="h-3 w-3 translate-x-px" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </template>
              <img
                v-else
                :src="image.thumb || image.src"
                :alt="image.title"
                fetchpriority="low"
                class="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      </aside>
    </main>

    <!-- Empty gallery state -->
    <div
      v-else
      class="flex h-[calc(100%-73px)] items-center justify-center px-6 text-center text-sm text-slate-500"
    >
      Nothing to show for this project yet.
    </div>

    <!-- Fullscreen image viewer -->
    <Teleport to="body">
      <div
        v-if="isImageFullscreen && currentImage"
        class="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center overflow-hidden bg-white"
        @click.self="closeImageFullscreen"
      >
        <!-- Close button only: no text or overlays -->
        <button
          type="button"
          @click="closeImageFullscreen"
          class="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-pink-300 hover:text-pink-800 sm:right-8 sm:top-8"
          aria-label="Close fullscreen image"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>

        <!-- Fullscreen artwork -->
        <img
          :src="currentImage.src"
          :alt="currentImage.title"
          class="max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] object-contain sm:max-h-[calc(100vh-4rem)] sm:max-w-[calc(100vw-6rem)]"
        />

        <!-- Fullscreen previous -->
        <button
          type="button"
          :disabled="!canPrevious"
          @click="goToPrevious"
          class="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20 sm:left-8"
          aria-label="Previous image"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <!-- Fullscreen next -->
        <button
          type="button"
          :disabled="!canNext"
          @click="goToNext"
          class="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-md transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20 sm:right-8"
          aria-label="Next image"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
/* New image fades in as soon as it is shown (no waiting for the old one to fade out) */
.fade-in {
  animation: fade-in 0.25s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>