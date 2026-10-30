<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Floating heart link to the About page, fixed in the bottom-right corner -->
  <RouterLink
    to="/about"
    aria-label="About me"
    class="about-heart group fixed right-3 bottom-4 z-40 block h-20 w-20 md:right-6 md:bottom-6 md:h-24 md:w-24 focus:outline-none"
  >
    <svg viewBox="0 0 100 92" class="h-full w-full drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110" aria-hidden="true">
      <path
        d="M50 88 C 22 66, 4 50, 4 29 C 4 14, 15 4, 28 4 C 38 4, 45 10, 50 18 C 55 10, 62 4, 72 4 C 85 4, 96 14, 96 29 C 96 50, 78 66, 50 88 Z"
        class="fill-pink-800 transition-colors duration-300 group-hover:fill-black"
      />
    </svg>
    <span class="absolute inset-0 flex flex-col items-center justify-center pb-2 text-center text-[9px] font-black uppercase leading-tight tracking-[0.2em] text-white md:text-[11px]">
      <span>About</span>
      <span>me</span>
    </span>
  </RouterLink>
</template>

<style scoped>
/* A lively double heartbeat ("lub-dub") about once a second and a half */
.about-heart svg {
  animation: heartbeat 1.6s ease-in-out infinite;
  transform-origin: center;
}

.about-heart:hover svg,
.about-heart:focus-visible svg {
  animation: none;
}

@keyframes heartbeat {
  0%, 55%, 100% { transform: scale(1); }
  12% { transform: scale(1.16); }
  24% { transform: scale(0.97); }
  36% { transform: scale(1.12); }
}

@media (prefers-reduced-motion: reduce) {
  .about-heart svg {
    animation: none;
  }
}
</style>
