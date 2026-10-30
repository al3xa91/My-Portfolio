<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CVSection from '@/components/sections/CVSection.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import { aboutData, personalInfo } from '@/data/portfolio.js'

// Images that haven't been added yet show a placeholder instead of a broken icon
const missingImages = reactive(new Set())
const markMissing = src => missingImages.add(src)

// Lightbox: remembers which group and which photo is open
const lightbox = ref(null) // { group, index }
const lightboxPhotos = computed(() => lightbox.value ? aboutData.personal.groups[lightbox.value.group].photos : [])
const lightboxPhoto = computed(() => lightbox.value ? lightboxPhotos.value[lightbox.value.index] : null)

const openPhoto = (group, index) => {
  const photo = aboutData.personal.groups[group].photos[index]
  if (!missingImages.has(photo.src)) lightbox.value = { group, index }
}
const closePhoto = () => { lightbox.value = null }
const step = direction => {
  const next = lightbox.value.index + direction
  if (next >= 0 && next < lightboxPhotos.value.length) lightbox.value = { ...lightbox.value, index: next }
}

const handleKeydown = event => {
  if (!lightbox.value) return
  if (event.key === 'Escape') closePhoto()
  if (event.key === 'ArrowLeft') step(-1)
  if (event.key === 'ArrowRight') step(1)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="w-full bg-white selection:bg-pink-200">
    <!-- Top bar -->
    <nav class="safe-px px-6 md:px-10 py-6 max-w-350 mx-auto flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em]">
      <RouterLink to="/" class="text-pink-800 hover:text-black transition-colors">← Home</RouterLink>
      <span class="text-pink-800/60">{{ personalInfo.location }}</span>
    </nav>

    <main>
      <!-- 1. Intro: photo + heading -->
      <section class="hero-mesh safe-px px-6 md:px-10 py-12 md:py-20">
        <div class="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 md:gap-20 items-center">
          <div class="aspect-[4/5] w-full max-w-md rounded-sm overflow-hidden bg-pink-50 border border-pink-100">
            <img
              v-if="!missingImages.has(aboutData.portrait.src)"
              :src="aboutData.portrait.src"
              :alt="aboutData.portrait.alt"
              fetchpriority="high"
              class="w-full h-full object-cover grayscale hover:grayscale-0 touch-fullcolor transition-all duration-700"
              @error="markMissing(aboutData.portrait.src)"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-xs font-bold uppercase tracking-widest text-pink-800/50">
              Your photo here
            </div>
          </div>

          <div>
            <p class="text-pink-800 font-black text-[10px] uppercase tracking-[0.35em] mb-6">About me</p>
            <h1 class="text-[13vw] md:text-[7vw] font-black tracking-tighter leading-[0.85] uppercase mb-8">
              <span class="block">Hi, I'm</span>
              <span class="block text-transparent stroke-text">{{ personalInfo.name.split(' ')[0] }}.</span>
            </h1>
            <p class="text-xl md:text-3xl text-pink-900 font-medium leading-snug border-l-2 border-pink-800/20 pl-4 md:pl-8">
              {{ aboutData.intro }}
            </p>
          </div>
        </div>
      </section>

      <!-- 2. Story -->
      <section class="safe-px px-6 md:px-10 py-14 md:py-20 max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-16">
        <div>
          <p class="text-pink-800 font-black text-[10px] uppercase tracking-[0.35em] mb-3">My story</p>
          <h2 class="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">From people to pixels</h2>
        </div>
        <div class="space-y-6 max-w-3xl">
          <p
            v-for="(paragraph, index) in aboutData.story"
            :key="index"
            class="text-base md:text-lg text-slate-700 leading-relaxed"
            :class="{ 'text-xl md:text-2xl text-black font-medium': index === 0 }"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- 3. Professional profile (moved from the homepage) -->
      <CVSection />

      <!-- 4. Outside of work -->
      <section class="border-t border-cv">
        <div class="safe-px px-6 md:px-10 py-14 md:py-20 max-w-350 mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-16 mb-12">
            <div>
              <p class="text-pink-800 font-black text-[10px] uppercase tracking-[0.35em] mb-3">Personal</p>
              <h2 class="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">{{ aboutData.personal.title }}</h2>
            </div>
            <p class="text-xl md:text-2xl text-black font-medium leading-relaxed max-w-3xl self-end">
              {{ aboutData.personal.text }}
            </p>
          </div>

          <div class="space-y-12 md:space-y-16">
            <div
              v-for="(group, groupIndex) in aboutData.personal.groups"
              :key="group.title"
              class="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 lg:gap-16"
            >
              <div>
                <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{{ String(groupIndex + 1).padStart(2, '0') }}</p>
                <h3 class="text-xl font-black uppercase tracking-tight mb-3">{{ group.title }}</h3>
                <p class="text-sm text-slate-600 leading-relaxed">{{ group.text }}</p>
              </div>

              <div :class="['grid grid-cols-2 gap-3 md:gap-4', group.photos.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3']">
                <button
                  v-for="(photo, index) in group.photos"
                  :key="photo.src"
                  type="button"
                  class="group relative aspect-4/5 overflow-hidden rounded-sm bg-pink-50 border border-pink-100 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800"
                  :aria-label="`Open photo: ${photo.caption}`"
                  @click="openPhoto(groupIndex, index)"
                >
                  <img
                    v-if="!missingImages.has(photo.src)"
                    :src="photo.src"
                    :alt="photo.caption"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 touch-fullcolor group-hover:scale-105 transition-all duration-700"
                    @error="markMissing(photo.src)"
                  />
                  <span v-else class="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-pink-800/50">
                    Photo {{ index + 1 }}
                  </span>
                  <span class="absolute left-0 right-0 bottom-0 p-3 text-left text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    {{ photo.caption }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TheFooter />

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxPhoto"
        class="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4 sm:p-10"
        @click.self="closePhoto"
      >
        <button
          type="button"
          class="absolute right-5 top-5 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:text-pink-800 hover:border-pink-300 transition"
          aria-label="Close photo"
          @click="closePhoto"
        >✕</button>
        <img
          :src="lightboxPhoto.src"
          :alt="lightboxPhoto.caption"
          class="max-h-[80vh] max-w-full object-contain"
        />
        <p class="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-pink-800">{{ lightboxPhoto.caption }}</p>
        <button
          type="button"
          :disabled="lightbox.index === 0"
          class="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-slate-200 bg-white shadow-md hover:text-pink-800 disabled:opacity-20"
          aria-label="Previous photo"
          @click="step(-1)"
        >←</button>
        <button
          type="button"
          :disabled="lightbox.index === lightboxPhotos.length - 1"
          class="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-slate-200 bg-white shadow-md hover:text-pink-800 disabled:opacity-20"
          aria-label="Next photo"
          @click="step(1)"
        >→</button>
      </div>
    </Teleport>
  </div>
</template>
