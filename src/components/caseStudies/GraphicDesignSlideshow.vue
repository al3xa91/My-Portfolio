<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const currentIndex = ref(0)
const isImageFullscreen = ref(false)

const images = computed(() => {
  return props.project.caseStudy?.gallery?.images ?? []
})

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
  if (currentImage.value) {
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
    const src = images.value[i]?.src
    if (src) new Image().src = src
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
          {{ project.category }}
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
        <button
          type="button"
          class="group relative flex h-full min-h-0 w-full cursor-zoom-in items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800 focus-visible:ring-offset-4"
          @click="openImageFullscreen"
          aria-label="Open image fullscreen"
        >
          <transition name="fade-slide" mode="out-in">
            <img
              :key="currentIndex"
              :src="currentImage.src"
              :alt="currentImage.title"
              fetchpriority="high"
              class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </transition>

          <span
            class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
          >
            Click to enlarge
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
            {{ project.category }}
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

          <a
            v-if="currentImage.externalUrl"
            :href="currentImage.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-800 transition hover:text-black"
          >
            View project

            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
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
                'aspect-square overflow-hidden rounded border transition-all duration-200',
                currentIndex === index
                  ? 'border-pink-800 opacity-100 ring-1 ring-pink-200'
                  : 'border-slate-200 opacity-60 hover:border-pink-300 hover:opacity-100'
              ]"
            >
              <img
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
      No images are available for this project.
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.15s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>