<script setup>
import { useCurrentTime } from '@/composables/useCurrentTime.js'
import { personalInfo } from '@/data/portfolio.js'

const { currentTime } = useCurrentTime('en-GB')

defineEmits({
  exploreWork: () => true,
})
</script>

<template>
  <section class="hero-mesh min-h-svh md:min-h-screen flex items-center px-6 md:px-10 safe-px py-6 md:py-24 relative overflow-hidden box-border">
    <div class="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-350 mx-auto relative z-10">
      <div class="flex justify-between items-center mb-8 md:mb-16 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] md:tracking-[0.3em] text-pink-800/60">
        <span>{{ personalInfo.location }} — {{ currentTime }}</span>
        <span class="hidden md:block italic">Currently available for hire</span>
      </div>

      <h1 class="text-[12vw] md:text-[11vw] font-black tracking-tighter leading-[0.82] uppercase mb-6 md:mb-12">
        <span class="block">{{ personalInfo.name.split(' ')[0] }}</span>
        <span class="block ml-[10vw]">
          <span class="inline-block text-transparent stroke-text stroke-hover-target">{{ personalInfo.name.split(' ').slice(1).join(' ') }}</span>
        </span>
      </h1>

      <div class="mt-10 md:mt-0 md:ml-[45vw] max-w-xl border-l-2 border-pink-800/20 pl-4 md:pl-8">
        <p class="text-base sm:text-lg md:text-3xl text-pink-900 font-medium leading-relaxed md:leading-tight mb-5 md:mb-6">
          {{ personalInfo.bio }}
        </p>
        <div class="flex gap-4">
          <button
            type="button"
            @click="$emit('exploreWork')"
            class="text-[10px] font-black uppercase tracking-widest bg-pink-800 text-white px-6 py-3 rounded-full hover:bg-black transition-colors"
          >
            Explore Work
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 1.5px #9d174d; /* Pink-800 */
}

.stroke-text:hover {
  -webkit-text-stroke: 1.5px #000000;
  transition: all 0.4s ease;
}

.stroke-hover-target {
  cursor: var(--cursor-heart);
}
</style>