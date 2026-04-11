<script setup>
import { personalInfo } from '@/data/portfolio.js'

const linkedInUrl = 'https://www.linkedin.com/in/alexa-cattaneo-piazza'

const getSocialUrl = link => {
  if (link?.name === 'LinkedIn') return linkedInUrl
  return link?.url || '#'
}
</script>

<template>
  <footer id="contact" class="footer-mesh footer-mesh-animated text-white pt-70 pb-20 px-10 relative overflow-hidden">
    
    <div class="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

    <div class="max-w-screen-2xl mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-32">
        
        <div>
          <p class="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-8">Next Step</p>
          <h2 class="text-[13vw] md:text-[10vw] font-black tracking-tighter leading-[0.8] uppercase">
            <span class="block text-black">Let's</span>
            <span class="block ml-[10vw] text-transparent stroke-text">Connect.</span>
          </h2>
        </div>

        <div class="flex flex-col lg:items-end space-y-12">
          <div class="lg:text-right">
            <p class="text-slate-500 uppercase text-[10px] font-black tracking-[0.3em] mb-6">Direct Inquiry</p>
            <a 
              :href="`mailto:${personalInfo.email}`" 
              class="text-3xl md:text-5xl font-light tracking-tighter text-black border-b border-black/20 pb-4 hover:text-black hover:border-black transition-all duration-500"
            >
              {{ personalInfo.email }}
            </a>
          </div>

          <div class="lg:text-right">
            <p class="text-slate-500 uppercase text-[10px] font-black tracking-[0.3em] mb-6">Digital Spaces</p>
            <div class="flex gap-8 lg:justify-end">
              <a 
                v-for="link in personalInfo.socials" 
                :key="link.name" 
                :href="getSocialUrl(link)" 
                target="_blank"
                rel="noreferrer"
                class="text-sm font-black uppercase tracking-widest text-black hover-text-social transition-colors"
              >
                {{ link.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-10 border-t border-white/5 flex justify-between items-center text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">
        <span>© {{ new Date().getFullYear() }} {{ personalInfo.name }}</span>
        <div class="flex items-center gap-3">
          <div class="w-1 h-1 bg-accent rounded-full"></div>
          <span>Denmark — Global</span>
        </div>
      </div>
    </div>
  </footer>
</template>