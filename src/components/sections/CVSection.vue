<script setup>
import { ref } from 'vue'
import { cvData, expertiseData, toolsData } from '@/data/portfolio.js'

// The video shows in colour while it plays (and always in full screen)
const isPlaying = ref(false)
</script>

<template>
  <section id="cv" class="py-12 safe-px max-w-350 mx-auto border-t border-cv scroll-mt-24">
    <!-- Header -->
    <div class="mb-10">
      <span class="text-accent font-black text-[10px] tracking-[0.3em] uppercase mb-4 ml-2 block">CV</span>
      <h2 class="text-[13vw] md:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase mb-12">
        <p class="text-3xl sm:text-6xl font-black uppercase tracking-tight text-black">Professional</p>
        <p class="text-3xl sm:text-6xl font-black uppercase tracking-tight text-black">Profile</p>
      </h2>
    </div>

    <!-- Video CV Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-20">
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-black uppercase tracking-wider mb-3 text-cv-heading">Motion CV</h3>
          <p class="text-cv-body text-base leading-relaxed">
            Produced with Premiere Pro and After Effects, this video explores my creative process and visual philosophy.
          </p>
        </div>

        <div class="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative group">
          <video 
            controls 
            playsinline
            preload="metadata"
            :class="[
              'cv-video w-full h-full object-cover touch-fullcolor touch-fullopacity transition-all duration-700 ease-out',
              isPlaying ? '' : 'grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100',
            ]"
            @play="isPlaying = true"
            @pause="isPlaying = false"
            @ended="isPlaying = false"
          >
            <source :src="cvData.videoUrl" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-cv-surface p-8 rounded-lg hover:bg-black transition-all duration-500 group cursor-pointer">
          <a :href="cvData.resumeUrl" :download="cvData.resumeDownloadName" class="flex justify-between items-center">
            <div>
              <p class="text-cv-heading group-hover:text-white font-black uppercase tracking-tighter text-xl">Download CV</p>
              <p class="text-cv-muted text-[10px] uppercase tracking-widest mt-2">Ready for Print / PDF</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
          </a>
        </div>

        <!-- Education & Experience -->
        <div class="space-y-6">
          <div class="border-l-4 border-accent pl-6 py-2">
            <p class="text-[10px] font-black uppercase tracking-widest text-cv-muted mb-3">Education</p>
            <div v-for="edu in cvData.education" :key="edu.school" class="space-y-1">
              <p class="font-black text-cv-heading">{{ edu.degree }}</p>
              <p class="text-cv-body text-sm">{{ edu.school }} • {{ edu.year }}</p>
            </div>
          </div>

          <div class="border-l-4 border-accent pl-6 py-2">
            <p class="text-[10px] font-black uppercase tracking-widest text-cv-muted mb-3">Experience</p>
            <div v-for="exp in cvData.experience" :key="exp.company" class="space-y-1">
              <p class="font-black text-cv-heading">{{ exp.role }}</p>
              <p class="text-cv-body text-sm">{{ exp.company }} • {{ exp.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills & Tools -->
    <div class="border-t border-cv pt-20">
      <h3 class="text-lg font-black uppercase tracking-wider mb-10 text-cv-heading">Skills & Tools</h3>

      <ul class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-10">
        <li
          v-for="tool in toolsData"
          :key="tool.name"
          class="group flex flex-col items-center gap-3 text-center"
        >
          <img
            v-if="tool.icon"
            :src="tool.icon"
            :alt="tool.name"
            width="48"
            height="48"
            loading="lazy"
            class="w-12 h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-1 touch-fullcolor transition-all duration-500"
          />
          <span
            v-else
            aria-hidden="true"
            class="w-12 h-12 rounded-xl border-2 border-cv flex items-center justify-center text-lg font-black text-cv-body group-hover:border-pink-800 group-hover:text-pink-800 group-hover:-translate-y-1 transition-all duration-500"
          >
            {{ tool.name.charAt(0) }}
          </span>
          <span class="text-[10px] font-black uppercase tracking-[0.14em] text-cv-body group-hover:text-cv-heading transition-colors">
            {{ tool.name }}
          </span>
        </li>
      </ul>

      <div class="mt-14 flex flex-wrap items-center gap-3">
        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-cv-muted mr-2">Expertise</span>
        <span
          v-for="skill in expertiseData"
          :key="skill"
          class="px-3 py-1.5 rounded-md border border-pink-100 bg-white text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Always full colour in full screen */
.cv-video:fullscreen,
.cv-video:-webkit-full-screen {
  filter: none !important;
  opacity: 1 !important;
}
</style>
