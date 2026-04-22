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
    <!-- Full-width hero image -->
    <div class="w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <img
        :src="project.imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
    </div>

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

          <!-- Dynamic Sections -->
          <div class="space-y-16 md:space-y-20">
            <section
              v-for="(section, index) in sections"
              :id="`graphic-${section.slug}`"
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
                <p v-if="section.body" class="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl whitespace-pre-line">
                  {{ section.body }}
                </p>
              </div>

              <!-- Visual Content Renderer -->
              <div v-if="section.visual?.type !== 'none'" class="mt-8">
                <!-- Single image - full width -->
                <div v-if="section.visual?.type === 'image'" class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                  <img
                    :src="section.visual.src"
                    :alt="section.visual.alt"
                    class="w-full h-auto object-cover"
                  />
                </div>

                <!-- Color palette grid -->
                <div v-else-if="section.visual?.type === 'paletteGrid'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  <div
                    v-for="color in section.visual?.colors ?? []"
                    :key="color.hex"
                    class="flex flex-col gap-3"
                  >
                    <div
                      :style="{ backgroundColor: color.hex }"
                      class="aspect-square rounded-lg border border-slate-200 shadow-md"
                    ></div>
                    <div class="space-y-1">
                      <p class="text-xs font-black uppercase tracking-wider text-slate-900">{{ color.name }}</p>
                      <p class="text-xs text-slate-500 font-mono">{{ color.hex }}</p>
                      <p v-if="color.usage" class="text-xs text-slate-600">{{ color.usage }}</p>
                    </div>
                  </div>
                </div>

                <!-- Typography showcase -->
                <div v-else-if="section.visual?.type === 'typography'" class="space-y-8">
                  <div v-for="typeface in section.visual?.typefaces ?? []" :key="typeface.name" class="space-y-3 pb-8 border-b border-slate-200">
                    <div class="space-y-2">
                      <p class="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{{ typeface.name }}</p>
                      <p class="text-xs text-slate-600">{{ typeface.family }} • {{ typeface.weights }}</p>
                    </div>
                    <div v-if="typeface.preview" class="space-y-4">
                      <div v-for="sample in typeface.preview" :key="sample.size" class="space-y-2">
                        <p class="text-xs text-slate-500">{{ sample.size }}</p>
                        <p :style="{ fontSize: sample.size, fontWeight: sample.weight }" class="text-slate-900">
                          {{ sample.text }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Gallery grid for multiple images/designs -->
                <div v-else-if="section.visual?.type === 'gallery'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div
                    v-for="frame in section.visual?.frames ?? []"
                    :key="frame.label"
                    class="space-y-4"
                  >
                    <div class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100">
                      <img
                        v-if="frame.src"
                        :src="frame.src"
                        :alt="frame.label"
                        class="w-full h-auto object-cover aspect-4/3"
                      />
                      <div v-else class="aspect-4/3 flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300">
                        <p class="text-slate-400 text-xs font-medium">Image placeholder</p>
                      </div>
                    </div>
                    <div v-if="frame.label" class="space-y-1">
                      <p class="text-sm font-black uppercase tracking-tight text-slate-900">{{ frame.label }}</p>
                      <p v-if="frame.note" class="text-xs text-slate-600">{{ frame.note }}</p>
                    </div>
                  </div>
                </div>

                <!-- Gallery grid 3 columns for wide layouts -->
                <div v-else-if="section.visual?.type === 'galleryWide'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        class="w-full h-auto object-cover aspect-square"
                      />
                      <div v-else class="aspect-square flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300">
                        <p class="text-slate-400 text-xs font-medium">Image placeholder</p>
                      </div>
                    </div>
                    <div v-if="frame.label" class="space-y-1">
                      <p class="text-sm font-semibold uppercase tracking-tight text-slate-900">{{ frame.label }}</p>
                      <p v-if="frame.note" class="text-xs text-slate-600">{{ frame.note }}</p>
                    </div>
                  </div>
                </div>

                <!-- Mood board / full width gallery -->
                <div v-else-if="section.visual?.type === 'moodboard'" class="space-y-4">
                  <div
                    v-for="(item, idx) in section.visual?.items ?? []"
                    :key="idx"
                    class="overflow-hidden rounded-lg border border-slate-200 shadow-lg bg-slate-100"
                  >
                    <img
                      :src="item.src"
                      :alt="item.label || `Mood board item ${idx + 1}`"
                      class="w-full h-auto object-cover"
                    />
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
