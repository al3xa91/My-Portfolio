<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const currentIndex = ref(0)

const images = computed(() => {
  if (props.project.caseStudy?.gallery?.images) {
    return props.project.caseStudy.gallery.images
  }
  return []
})

const currentImage = computed(() => images.value[currentIndex.value] || null)

const totalImages = computed(() => images.value.length)

const canPrevious = computed(() => currentIndex.value > 0)
const canNext = computed(() => currentIndex.value < totalImages.value - 1)

const goToPrevious = () => {
  if (canPrevious.value) {
    currentIndex.value--
  }
}

const goToNext = () => {
  if (canNext.value) {
    currentIndex.value++
  }
}

const goToImage = (index) => {
  currentIndex.value = index
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowLeft') goToPrevious()
  if (e.key === 'ArrowRight') goToNext()
}

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
        <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">{{ project.category }} Portfolio</p>
        <h1 class="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">{{ project.title }}</h1>
        <p class="text-slate-600 max-w-2xl">{{ project.description }}</p>
      </div>

      <!-- Main Gallery -->
      <div class="space-y-8">
        <!-- Featured Image -->
        <div v-if="currentImage" class="relative rounded-lg overflow-hidden border border-slate-200 shadow-lg bg-slate-100 aspect-16/10">
          <transition name="fade-slide" mode="out-in">
            <img
              :key="currentIndex"
              :src="currentImage.src"
              :alt="currentImage.title"
              class="w-full h-full object-cover"
            />
          </transition>

          <!-- Navigation Buttons -->
          <button
            @click="goToPrevious"
            :disabled="!canPrevious"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 p-2.5 rounded-full transition-all duration-200 border border-slate-200 shadow-md hover:shadow-lg"
            aria-label="Previous image"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            @click="goToNext"
            :disabled="!canNext"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 p-2.5 rounded-full transition-all duration-200 border border-slate-200 shadow-md hover:shadow-lg"
            aria-label="Next image"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Counter Badge -->
          <div class="absolute top-4 right-4 bg-white/95 border border-slate-200 text-slate-900 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(totalImages).padStart(2, '0') }}
          </div>
        </div>

        <!-- Image Info -->
        <div v-if="currentImage" class="space-y-3">
          <h2 class="text-2xl font-black uppercase tracking-tight text-black">{{ currentImage.title }}</h2>
          <p v-if="currentImage.description" class="text-slate-600 leading-relaxed max-w-2xl">{{ currentImage.description }}</p>
        </div>

        <!-- Thumbnail Strip -->
        <div class="space-y-4">
          <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">View All</p>
          <div class="overflow-x-auto pb-2">
            <div class="flex gap-4 min-w-min">
              <button
                v-for="(image, index) in images"
                :key="index"
                @click="goToImage(index)"
                :class="[
                  'relative shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200',
                  currentIndex === index
                    ? 'border-pink-800 ring-2 ring-pink-200'
                    : 'border-slate-200 hover:border-slate-300'
                ]"
              >
                <img
                  :src="image.thumb || image.src"
                  :alt="image.title"
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
