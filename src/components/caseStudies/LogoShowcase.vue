<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * Logo Design project.
 * Opens straight into the first logo's presentation: hero, brief, variations,
 * colours, typography and mockups. Arrows and "More logos" switch between logos.
 * The open logo lives in the URL (?logo=2), so each one has its own link.
 */
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const logos = computed(() => props.project.caseStudy?.logos ?? [])

const openIndex = computed(() => {
  const index = Number(route.query.logo) - 1
  // No logo chosen yet: show the first one
  return Number.isInteger(index) && index >= 0 && index < logos.value.length ? index : 0
})
const logo = computed(() => logos.value[openIndex.value] ?? null)

// Move between logos (replace, so one Back closes the project)
const goTo = index => {
  if (index >= 0 && index < logos.value.length) {
    router.replace({ query: { ...route.query, logo: String(index + 1) } })
  }
}
const canPrevious = computed(() => openIndex.value > 0)
const canNext = computed(() => openIndex.value < logos.value.length - 1)

const handleKeydown = event => {
  if (!logo.value) return
  if (event.key === 'ArrowLeft') goTo(openIndex.value - 1)
  if (event.key === 'ArrowRight') goTo(openIndex.value + 1)
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

const details = computed(() => Object.entries(logo.value?.details ?? {}).filter(([, value]) => value))

// Start each presentation at the top
const scroller = ref(null)
watch(openIndex, () => scroller.value?.scrollTo({ top: 0 }))
</script>

<template>
  <!-- Full presentation of one logo -->
  <div v-if="logo" class="relative h-full w-full overflow-hidden bg-white text-black">
    <header class="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
      <div class="min-w-0">
        <p class="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-pink-800">{{ project.title }}</p>
        <h1 class="truncate text-sm font-bold uppercase tracking-wide text-black sm:text-base">{{ logo.name }}</h1>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          :disabled="!canPrevious"
          @click="goTo(openIndex - 1)"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20"
          aria-label="Previous logo"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span class="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-slate-600">
          {{ String(openIndex + 1).padStart(2, '0') }} / {{ String(logos.length).padStart(2, '0') }}
        </span>
        <button
          type="button"
          :disabled="!canNext"
          @click="goTo(openIndex + 1)"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:border-pink-300 hover:text-pink-800 disabled:pointer-events-none disabled:opacity-20"
          aria-label="Next logo"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </header>

    <div ref="scroller" :key="openIndex" class="logo-page h-[calc(100%-73px)] overflow-y-auto">
      <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 md:py-10">
        <!-- Hero -->
        <img
          :src="logo.hero"
          :alt="`${logo.name} logo`"
          fetchpriority="high"
          class="w-full rounded-sm"
        />

        <!-- Brief + details -->
        <section class="mt-10 mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div>
            <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">The brief</p>
            <h2 class="mb-4 text-3xl font-black uppercase leading-none tracking-tight sm:text-4xl">{{ logo.name }}</h2>
            <p class="max-w-2xl whitespace-pre-line text-base leading-relaxed text-slate-600">{{ logo.brief }}</p>
          </div>
          <dl v-if="details.length" class="self-start rounded-lg border border-pink-100 bg-slate-50 p-5">
            <div
              v-for="([label, value], index) in details"
              :key="label"
              :class="['py-2.5', index ? 'border-t border-pink-100' : 'pt-0']"
            >
              <dt class="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{{ label }}</dt>
              <dd class="text-sm font-semibold">{{ value }}</dd>
            </div>
          </dl>
        </section>

        <!-- Variations -->
        <section v-if="logo.variations?.length" class="mb-14">
          <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">Logo variations</p>
          <h3 class="mb-6 text-2xl font-black uppercase tracking-tight">One identity, every size</h3>
          <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <figure v-for="variation in logo.variations" :key="variation.label">
              <img :src="variation.src" :alt="`${logo.name} ${variation.label}`" loading="lazy" class="aspect-square w-full rounded-sm border border-slate-200 object-cover" />
              <figcaption class="mt-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{{ variation.label }}</figcaption>
            </figure>
          </div>
        </section>

        <!-- Colours + typography -->
        <section
          v-if="logo.colors?.length || logo.typography"
          class="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-2"
        >
          <div v-if="logo.colors?.length">
            <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">Colours</p>
            <h3 class="mb-6 text-2xl font-black uppercase tracking-tight">Palette</h3>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div v-for="color in logo.colors" :key="color.hex">
                <div class="aspect-square rounded-sm border border-slate-200" :style="{ backgroundColor: color.hex }"></div>
                <p class="mt-2 text-[11px] font-black uppercase">{{ color.name }}</p>
                <p class="font-mono text-xs text-slate-500">{{ color.hex }}</p>
              </div>
            </div>
          </div>
          <div v-if="logo.typography">
            <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">Typography</p>
            <h3 class="mb-6 text-2xl font-black uppercase tracking-tight">Typeface</h3>
            <img
              v-if="logo.typography.src"
              :src="logo.typography.src"
              :alt="`${logo.typography.name} typeface sample`"
              loading="lazy"
              class="w-full rounded-sm border border-slate-200"
            />
            <p class="mt-3 text-sm font-bold">{{ logo.typography.name }}</p>
            <p v-if="logo.typography.note" class="text-sm leading-relaxed text-slate-600">{{ logo.typography.note }}</p>
          </div>
        </section>

        <!-- Mockups -->
        <section v-if="logo.mockups?.length" class="mb-14">
          <p class="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">In use</p>
          <h3 class="mb-6 text-2xl font-black uppercase tracking-tight">Mockups</h3>
          <!-- Mockups marked `wide: true` span the full row; the rest share rows of up to three -->
          <div :class="['grid grid-cols-1 gap-4', logo.mockups.filter(m => !m.wide).length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2']">
            <figure
              v-for="mockup in logo.mockups"
              :key="mockup.src"
              :class="['relative overflow-hidden rounded-sm', mockup.wide ? 'md:col-span-full' : '']"
            >
              <img :src="mockup.src" :alt="`${logo.name} ${mockup.label}`" loading="lazy" :class="['w-full', mockup.wide ? '' : 'aspect-4/3 object-cover']" />
              <figcaption class="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                {{ mockup.label }}
              </figcaption>
            </figure>
          </div>
        </section>

        <!-- Other logos -->
        <nav v-if="logos.length > 1" class="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-7">
          <span class="mr-2 text-[10px] font-black uppercase tracking-[0.35em] text-pink-800">More logos</span>
          <button
            v-for="(item, index) in logos"
            :key="item.name"
            type="button"
            @click="goTo(index)"
            :aria-label="`View ${item.name} logo`"
            :aria-current="index === openIndex ? 'true' : undefined"
            :class="[
              'h-20 w-28 overflow-hidden rounded-sm border-2 transition',
              index === openIndex ? 'border-pink-800' : 'border-slate-200 opacity-70 hover:border-pink-300 hover:opacity-100',
            ]"
          >
            <img :src="item.thumb || item.hero" :alt="item.name" class="h-full w-full object-cover" />
          </button>
        </nav>
      </div>
    </div>

  </div>
</template>

<style scoped>
.logo-page {
  animation: fade-in 0.25s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
