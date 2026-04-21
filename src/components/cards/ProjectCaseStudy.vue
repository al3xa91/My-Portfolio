<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const toSlug = (value, fallback) => {
  if (!value || typeof value !== 'string') return fallback
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || fallback
}

const caseStudy = computed(() => {
  const custom = props.project.caseStudy

  const defaultSections = [
    {
      slug: 'project-overview',
      eyebrow: 'Project Overview',
      title: 'Design challenge and scope',
      body: props.project.description,
      visual: {
        type: 'image',
        src: props.project.imageUrl,
        alt: `${props.project.title} mockup`,
      },
    },
    {
      slug: 'process',
      eyebrow: 'Process',
      title: 'How the concept was developed',
      body: 'The project moved from exploration to refined interface decisions, balancing visual direction, content clarity, and user flow consistency.',
      visual: {
        type: 'none',
      },
    },
    {
      slug: 'final-delivery',
      eyebrow: props.project.embedUrl ? 'Interactive Prototype' : 'Final Delivery',
      title: props.project.embedUrl ? 'Explore the final interactive prototype' : 'Final visual outcome',
      body: props.project.embedUrl
        ? 'Open the live prototype to review interactions, hierarchy, and flow decisions.'
        : 'This project is presented as a final visual deliverable. Additional documentation can be added later if needed.',
      visual: props.project.embedUrl
        ? {
            type: 'imageLink',
            src: props.project.imageUrl,
            alt: `${props.project.title} prototype mockup`,
            buttonLabel: 'Go to prototype',
          }
        : {
            type: 'image',
            src: props.project.imageUrl,
            alt: `${props.project.title} final preview`,
          },
    },
  ]

  const mergedSections = (custom?.sections?.length ? custom.sections : defaultSections).map((section, index) => ({
    ...section,
    slug: section.slug || toSlug(section.eyebrow, `section-${index + 1}`),
  }))

  return {
    role: custom?.role || `${props.project.category} Designer`,
    tools: custom?.tools?.length ? custom.tools : [props.project.category],
    problem: custom?.problem || `Create a strong ${props.project.category} solution with clear storytelling and a coherent user experience.`,
    outcome: custom?.outcome || props.project.description,
    sections: mergedSections,
  }
})

const sections = computed(() => caseStudy.value.sections)
const sectionLinks = computed(() => sections.value.map(section => ({
  label: section.eyebrow,
  slug: section.slug,
})))
</script>

<template>
  <div class="w-full h-full overflow-y-auto bg-white">
    <div class="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-10">
      <div class="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
        <!-- Sidebar: project meta, role/tools/problem, and jump links -->
        <aside class="lg:sticky lg:top-6 space-y-6 rounded-lg border border-pink-100 bg-white text-black p-6 shadow-2xl">
          <div class="space-y-4">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-pink-800">{{ project.category }} Case Study</p>
            <h3 class="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
              {{ project.title }}
            </h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <div class="space-y-4 border-t border-pink-100 pt-5">
            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Role</p>
              <p class="text-slate-900 font-semibold">{{ caseStudy.role }}</p>
            </div>

            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Tools</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tool in caseStudy.tools"
                  :key="tool"
                  class="px-3 py-1 rounded-full border border-pink-100 bg-pink-50 text-[10px] font-black uppercase tracking-widest text-slate-700"
                >
                  {{ tool }}
                </span>
              </div>
            </div>

            <div>
              <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Problem</p>
              <p class="text-slate-700 leading-relaxed text-sm">
                {{ caseStudy.problem }}
              </p>
            </div>
          </div>

          <div class="border-t border-pink-100 pt-5">
            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Jump to</p>
            <div class="flex flex-col gap-2 text-sm">
              <a
                v-for="(link, index) in sectionLinks"
                :key="link.slug"
                :href="`#case-${link.slug}`"
                class="rounded-lg border border-pink-100 bg-slate-50 px-3 py-2 hover:bg-pink-50 transition-colors text-slate-700"
              >
                {{ String(index + 1).padStart(2, '0') }}. {{ link.label }}
              </a>
            </div>
          </div>
        </aside>

        <main class="space-y-10 md:space-y-12">
          <!-- Intro card: hero image + short outcome summary -->
          <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start rounded-lg border border-pink-100 bg-slate-50 p-5 md:p-8 shadow-sm">
            <div class="space-y-4">
              <img
                :src="project.imageUrl"
                :alt="project.title"
                class="w-full rounded-lg object-cover aspect-16/10 shadow-2xl"
              />
            </div>

            <div class="space-y-6 lg:pl-2">
              <div class="space-y-3">
                <p class="text-pink-800 font-black uppercase tracking-[0.3em] text-[10px]">Introduction</p>
                <h4 class="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none text-black">
                  The project at a glance
                </h4>
                <p class="text-slate-600 text-base md:text-lg leading-relaxed">
                  {{ caseStudy.outcome }}
                </p>
              </div>
            </div>
          </section>

          <!-- Dynamic case-study sections from projects.js -> caseStudy.sections -->
          <section
            v-for="(section, index) in sections"
            :id="`case-${section.slug}`"
            :key="section.slug"
            :class="[
              'grid gap-5 items-start rounded-lg border border-pink-100 bg-white p-5 md:p-8 shadow-sm scroll-mt-6',
              section.visual?.type === 'none' ? 'lg:grid-cols-1' : 'lg:grid-cols-[0.95fr_1.05fr]'
            ]"
          >
            <div class="space-y-4">
              <p class="text-pink-800 font-black uppercase tracking-[0.3em] text-[10px]">
                {{ String(index + 1).padStart(2, '0') }}. {{ section.eyebrow }}
              </p>
              <h4 class="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-tight text-black">
                {{ section.title }}
              </h4>
              <p class="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl whitespace-pre-line">
                {{ section.body }}
              </p>
            </div>

            <!-- Visual renderer: switches by section.visual.type -->
            <div v-if="section.visual?.type !== 'none'">
              <!-- Single static image -->
              <div v-if="section.visual?.type === 'image'" class="overflow-hidden rounded-lg shadow-xl border border-slate-200 bg-slate-100">
                <img
                  :src="section.visual.src"
                  :alt="section.visual.alt"
                  class="w-full h-full object-cover aspect-16/10"
                />
              </div>

              <!-- Embedded prototype iframe -->
              <div v-else-if="section.visual?.type === 'embed'" class="overflow-hidden rounded-lg shadow-xl border border-slate-200 bg-slate-100 aspect-16/10 relative">
                <iframe
                  :src="project.embedUrl"
                  :title="`${project.title} prototype full view`"
                  allowfullscreen
                  loading="eager"
                  class="w-full h-full border-0"
                ></iframe>
              </div>

              <!-- Image plus CTA button linking to prototype -->
              <div v-else-if="section.visual?.type === 'imageLink'" class="space-y-4">
                <div class="overflow-hidden rounded-lg shadow-xl border border-slate-200 bg-slate-100">
                  <img
                    :src="section.visual.src"
                    :alt="section.visual.alt"
                    class="w-full h-full object-cover aspect-16/10"
                  />
                </div>
                <a
                  :href="project.embedUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center justify-center rounded-full bg-pink-800 text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 hover:bg-black transition-colors"
                >
                  {{ section.visual.buttonLabel }}
                </a>
              </div>

              <!-- Multi-image gallery -->
              <div v-else-if="section.visual?.type === 'gallery'" class="rounded-lg border border-pink-100 bg-slate-50 p-4 md:p-6 shadow-sm">
                <div class="space-y-4">
                  <div
                    v-for="frame in section.visual?.frames ?? []"
                    :key="frame.label"
                    class="rounded-lg border border-pink-100 bg-white overflow-hidden"
                  >
                    <img
                      v-if="frame.src"
                      :src="frame.src"
                      :alt="frame.label"
                      class="w-full h-auto max-h-[70svh] object-contain object-center bg-white"
                    />
                    <div v-else class="aspect-16/10 flex flex-col items-center justify-center text-center px-4 bg-slate-50 border-2 border-dashed border-pink-200">
                      <p class="text-slate-500 text-xs">Add image</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Fallback: bullet list block for custom text visuals -->
              <div v-else class="rounded-lg border border-pink-100 bg-slate-50 p-6 md:p-8 shadow-sm text-slate-900">
                <p class="text-[10px] font-black uppercase tracking-[0.3em] text-pink-800 mb-4">
                  {{ section.visual?.title }}
                </p>
                <ul class="space-y-3">
                  <li
                    v-for="item in section.visual?.items ?? []"
                    :key="item"
                    class="flex items-start gap-3 text-slate-700 leading-relaxed"
                  >
                    <span class="mt-2 h-1.5 w-1.5 rounded-full bg-pink-800 shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  </div>
</template>
