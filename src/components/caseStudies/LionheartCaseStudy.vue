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
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div class="grid gap-10 lg:gap-12 lg:grid-cols-[320px_minmax(0,1fr)] items-start">
        <!-- Sidebar: project meta, role/tools/problem, and jump links -->
        <aside class="lg:sticky lg:top-8 order-2 lg:order-1">
          <!-- Project Header -->
          <div class="space-y-4 mb-8">
            <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">{{ project.category }} Case Study</p>
            <h2 class="text-lg sm:text-xl font-black uppercase tracking-tight leading-tight text-black">
              {{ project.title }}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Project Meta Info -->
          <div class="rounded-lg border border-pink-100 bg-slate-50 p-5 space-y-5 mb-8">
            <div>
              <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Role</p>
              <p class="text-sm font-semibold text-slate-900">{{ caseStudy.role }}</p>
            </div>

            <div class="border-t border-pink-100 pt-4">
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

            <div class="border-t border-pink-100 pt-4">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Challenge</p>
              <p class="text-sm text-slate-700 leading-relaxed">
                {{ caseStudy.problem }}
              </p>
            </div>
          </div>

          <!-- Jump Navigation -->
          <div>
            <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Sections</p>
            <div class="space-y-2">
              <a
                v-for="(link, index) in sectionLinks"
                :key="link.slug"
                :href="`#lionheart-${link.slug}`"
                class="block rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200"
              >
                <span class="font-black tracking-widest text-slate-400">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="ml-2">{{ link.label }}</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="order-1 lg:order-2 space-y-12 md:space-y-14">
          <!-- Intro Section -->
          <section class="grid gap-8 lg:gap-10 items-start">
            <div class="grid gap-6 md:gap-8 md:grid-cols-2 items-start">
              <div class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                <img
                  :src="project.imageUrl"
                  :alt="project.title"
                  class="w-full h-auto object-cover aspect-4/3"
                />
              </div>

              <div class="space-y-6">
                <div class="space-y-3">
                  <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">Overview</p>
                  <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-black">
                    The project at a glance
                  </h2>
                </div>
                <p class="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {{ caseStudy.outcome }}
                </p>
              </div>
            </div>
          </section>

          <!-- Content Sections -->
          <div class="space-y-16 md:space-y-20">
            <section
              v-for="(section, index) in sections"
              :id="`lionheart-${section.slug}`"
              :key="section.slug"
              class="scroll-mt-8"
            >
              <!-- Section Header -->
              <div class="space-y-3 mb-8">
                <p class="text-xs font-black uppercase tracking-[0.35em] text-pink-800">
                  {{ String(index + 1).padStart(2, '0') }}. {{ section.eyebrow }}
                </p>
                <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-black max-w-3xl">
                  {{ section.title }}
                </h3>
              </div>

              <!-- Alternating Layout: Text + Visual -->
              <div v-if="section.visual?.type !== 'none'" class="space-y-8">
                <!-- Odd sections: Text first, then image -->
                <div v-if="index % 2 === 0" class="space-y-8">
                  <p class="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line max-w-3xl">
                    {{ section.body }}
                  </p>
                  
                  <!-- Visual Content -->
                  <div class="w-full">
                    <!-- Single static image - full width -->
                    <div v-if="section.visual?.type === 'image'" class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                      <img
                        :src="section.visual.src"
                        :alt="section.visual.alt"
                        class="w-full h-auto object-cover aspect-16/10"
                      />
                    </div>

                    <!-- Image plus CTA button -->
                    <div v-else-if="section.visual?.type === 'imageLink'" class="space-y-6">
                      <div class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100 flex items-center justify-center min-h-[400px]">
                        <img
                          :src="section.visual.src"
                          :alt="section.visual.alt"
                          class="w-full h-auto object-contain max-h-[600px]"
                        />
                      </div>
                      <a
                        :href="project.embedUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center justify-center rounded-lg bg-pink-800 text-white text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-black transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {{ section.visual.buttonLabel }}
                      </a>
                    </div>

                    <!-- Multi-image gallery -->
                    <div v-else-if="section.visual?.type === 'gallery'" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div
                        v-for="frame in section.visual?.frames ?? []"
                        :key="frame.label"
                        class="space-y-3"
                      >
                        <div class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                          <img
                            v-if="frame.src"
                            :src="frame.src"
                            :alt="frame.label"
                            class="w-full h-auto max-h-[50vh] object-contain object-center bg-white"
                          />
                          <div v-else class="aspect-4/3 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300">
                            <p class="text-slate-400 text-xs font-medium">Image placeholder</p>
                          </div>
                        </div>
                        <div v-if="frame.label" class="space-y-1">
                          <p class="text-sm font-semibold text-slate-900">{{ frame.label }}</p>
                          <p v-if="frame.note" class="text-xs text-slate-600">{{ frame.note }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Even sections: Image first, then text (staggered) -->
                <div v-else class="grid gap-8 lg:gap-12 items-start lg:grid-cols-[1.1fr_0.9fr]">
                  <!-- Visual Content -->
                  <div class="w-full order-2 lg:order-1">
                    <!-- Single static image -->
                    <div v-if="section.visual?.type === 'image'" class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                      <img
                        :src="section.visual.src"
                        :alt="section.visual.alt"
                        class="w-full h-auto object-cover aspect-4/3"
                      />
                    </div>

                    <!-- Image plus CTA button -->
                    <div v-else-if="section.visual?.type === 'imageLink'" class="space-y-5">
                      <div class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100 flex items-center justify-center min-h-[400px]">
                        <img
                          :src="section.visual.src"
                          :alt="section.visual.alt"
                          class="w-full h-auto object-contain max-h-[600px]"
                        />
                      </div>
                      <a
                        :href="project.embedUrl"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center justify-center w-full rounded-lg bg-pink-800 text-white text-xs font-black uppercase tracking-widest px-6 py-3 hover:bg-black transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {{ section.visual.buttonLabel }}
                      </a>
                    </div>

                    <!-- Multi-image gallery -->
                    <div v-else-if="section.visual?.type === 'gallery'" class="space-y-4">
                      <div
                        v-for="frame in section.visual?.frames ?? []"
                        :key="frame.label"
                        class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100"
                      >
                        <img
                          v-if="frame.src"
                          :src="frame.src"
                          :alt="frame.label"
                          class="w-full h-auto max-h-[50vh] object-contain object-center bg-white"
                        />
                        <div v-else class="aspect-4/3 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300">
                          <p class="text-slate-400 text-xs font-medium">Image placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Text Content -->
                  <div class="order-1 lg:order-2">
                    <p class="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line max-w-2xl">
                      {{ section.body }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Full-width text-only section -->
              <div v-else class="max-w-3xl">
                <p class="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {{ section.body }}
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
