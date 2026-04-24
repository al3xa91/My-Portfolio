/**
 * BaseCaseStudy Component
 * Reusable base component for case study layouts
 * Used by: VegamaCaseStudy, ItineroCaseStudy, LionheartCaseStudy, WanderlyCaseStudy
 */
<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const caseStudy = computed(() => props.project.caseStudy)
const sections = computed(() => caseStudy.value?.sections ?? [])
const sectionLinks = computed(() => sections.value.map(section => ({
  label: section.eyebrow,
  slug: section.slug,
})))
</script>

<template>
  <div class="w-full h-full overflow-y-auto bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid gap-12 lg:gap-16 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
        <!-- Sidebar -->
        <aside class="lg:sticky lg:top-8 order-2 lg:order-1">
          <!-- Project Header -->
          <div class="space-y-4 mb-8">
            <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">{{ project.category }}</p>
            <h2 class="text-lg sm:text-xl font-black uppercase tracking-tight leading-tight text-black">
              {{ project.title }}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Project Meta Info -->
          <div class="rounded-lg border border-pink-100 bg-slate-50 p-5 space-y-5 mb-8">
            <div v-if="caseStudy?.role">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Role</p>
              <p class="text-sm font-semibold text-slate-900">{{ caseStudy.role }}</p>
            </div>

            <div v-if="caseStudy?.tools?.length" class="border-t border-pink-100 pt-4">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Tools</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tool in caseStudy.tools"
                  :key="tool"
                  class="px-3 py-1.5 rounded-md border border-pink-100 bg-white text-xs font-semibold uppercase tracking-wider text-slate-700 hover:bg-pink-50 transition-colors"
                >
                  {{ tool }}
                </span>
              </div>
            </div>

            <div v-if="caseStudy?.problem" class="border-t border-pink-100 pt-4">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Brief</p>
              <p class="text-sm text-slate-700 leading-relaxed">
                {{ caseStudy.problem }}
              </p>
            </div>
          </div>

          <!-- Jump Navigation -->
          <div v-if="sectionLinks.length">
            <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Sections</p>
            <div class="space-y-2">
              <a
                v-for="(link, index) in sectionLinks"
                :key="link.slug"
                :href="`#graphic-${link.slug}`"
                class="block rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200"
              >
                <span class="font-black tracking-widest text-slate-400">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="ml-2">{{ link.label }}</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="order-1 lg:order-2 space-y-16 md:space-y-20">
          <!-- Outcome/Vision -->
          <section v-if="caseStudy?.outcome" class="space-y-4">
            <div class="space-y-3">
              <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">Vision</p>
              <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-black">
                Design outcome
              </h2>
            </div>
            <p class="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              {{ caseStudy.outcome }}
            </p>
          </section>

          <!-- Content Sections -->
          <div class="space-y-16 md:space-y-20">
            <section
              v-for="(section, sectionIndex) in sections"
              :key="section.slug"
              :id="`graphic-${section.slug}`"
              class="scroll-mt-24"
            >
              <div class="space-y-4 md:space-y-6">
                <div class="space-y-2">
                  <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">
                    {{ String(sectionIndex + 1).padStart(2, '0') }} • {{ section.eyebrow }}
                  </p>
                  <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-black">
                    {{ section.title }}
                  </h3>
                </div>

                <p class="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl whitespace-pre-line">
                  {{ section.body }}
                </p>
              </div>

              <!-- Visual -->
              <div v-if="section.visual && section.visual.type !== 'none'" class="mt-8">
                <!-- Image -->
                <div v-if="section.visual.type === 'image'" class="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    :src="section.visual.src"
                    :alt="section.visual.alt"
                    class="w-full h-auto object-cover"
                  />
                </div>

                <!-- Image Link (Side by Side) -->
                <div v-else-if="section.visual.type === 'imageLink'" class="max-w-sm">
                  <div class="rounded-lg overflow-hidden border border-slate-200 shadow-lg mb-4">
                    <img
                      :src="section.visual.src"
                      :alt="section.visual.alt"
                      class="w-full h-auto object-cover"
                    />
                  </div>
                  <a
                    v-if="project.embedUrl"
                    :href="project.embedUrl"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center justify-center rounded-lg bg-pink-800 text-white text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-black transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {{ section.visual.buttonLabel || 'Go to prototype' }}
                  </a>
                </div>

                <!-- Gallery -->
                <div v-else-if="section.visual.type === 'gallery'" class="space-y-4">
                  <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                    {{ section.visual.title }}
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(frame, i) in section.visual.frames" :key="i" class="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
                      <img
                        :src="frame.src"
                        :alt="frame.label"
                        class="w-full h-auto object-cover"
                      />
                      <div class="p-4 bg-slate-50">
                        <p class="text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-1">{{ frame.label }}</p>
                        <p v-if="frame.note" class="text-xs text-slate-600">{{ frame.note }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Gallery Wide -->
                <div v-else-if="section.visual.type === 'galleryWide'" class="space-y-4">
                  <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                    {{ section.visual.title }}
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div v-for="(frame, i) in section.visual.frames" :key="i" class="rounded-lg overflow-hidden border border-slate-200 shadow-lg">
                      <img
                        :src="frame.src"
                        :alt="frame.label"
                        class="w-full h-auto object-cover"
                      />
                      <div class="p-4 bg-slate-50">
                        <p class="text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-1">{{ frame.label }}</p>
                        <p v-if="frame.note" class="text-xs text-slate-600">{{ frame.note }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Palette Grid -->
                <div v-else-if="section.visual.type === 'paletteGrid'" class="space-y-4">
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="color in section.visual.colors" :key="color.hex" class="space-y-2">
                      <div class="rounded-lg overflow-hidden border border-slate-200 shadow-md h-24" :style="{ backgroundColor: color.hex }"></div>
                      <div>
                        <p class="text-xs font-black uppercase tracking-widest text-slate-900">{{ color.name }}</p>
                        <p class="text-xs text-slate-600 font-mono">{{ color.hex }}</p>
                        <p class="text-xs text-slate-500 mt-1">{{ color.usage }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Typography -->
                <div v-else-if="section.visual.type === 'typography'" class="space-y-6">
                  <div v-for="typeface in section.visual.typefaces" :key="typeface.name" class="space-y-3">
                    <div>
                      <p class="text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-1">{{ typeface.name }}</p>
                      <p class="text-sm text-slate-600">{{ typeface.family }} • Weight {{ typeface.weights }}</p>
                    </div>
                    <div class="space-y-2">
                      <div v-for="(preview, i) in typeface.preview" :key="i" :style="{ fontSize: preview.size, fontWeight: preview.weight }" class="text-slate-900">
                        {{ preview.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scrolling for jump navigation */
html {
  scroll-behavior: smooth;
}
</style>
