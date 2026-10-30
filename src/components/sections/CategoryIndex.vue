<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    default: () => [],
    validator: value => value.every(item => 
      typeof item.category === 'string' && 
      Array.isArray(item.subcategories)
    ),
  },
  activeCategory: {
    type: String,
    default: 'All',
  },
  activeSubcategory: {
    type: String,
    default: null,
  },
})

const emit = defineEmits({
  selectCategory: value => typeof value === 'string' && value.length > 0,
  selectSubcategory: value => {
    return value && typeof value.category === 'string' && typeof value.subcategory === 'string'
  },
})

const currentCategory = computed(() => {
  if (props.activeCategory === 'All') return null
  return props.sections.find(s => s.category === props.activeCategory)
})

const showSubcategories = computed(() => {
  return currentCategory.value && currentCategory.value.hasSubcategories
})

const mobileCategoryLabel = category => (category)

// Expanding panels: the hovered (or focused) category opens wide on large screens
const activePanel = ref(0)
const projectCount = section => section.subcategories.reduce((total, sub) => total + sub.projects.length, 0)
</script>

<template>
  <section class="py-16 px-6 md:px-10 safe-px border-t border-slate-100 max-w-screen-2xl mx-auto">
    <!-- Main Category Index -->
    <div v-if="!showSubcategories">
      <p class="text-slate-400 uppercase tracking-[0.4em] text-[9px] font-black mb-12 text-center md:text-left">Categories</p>
      <!-- Phones/tablets: stacked bands. Large screens: panels that expand on hover. -->
      <div class="flex flex-col gap-3 lg:flex-row lg:h-130" @mouseleave="activePanel = 0">
        <button
          v-for="(section, index) in sections"
          :key="section.category"
          type="button"
          @click="$emit('selectCategory', section.category)"
          @mouseenter="activePanel = index"
          @focus="activePanel = index"
          :class="[
            'group relative h-28 sm:h-36 lg:h-auto overflow-hidden rounded-sm text-left transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-800 focus-visible:ring-offset-4',
            activePanel === index ? 'lg:flex-[3.2]' : 'lg:flex-1',
          ]"
        >
          <img
            v-if="section.thumbnailImageUrl"
            :src="section.thumbnailImageUrl"
            :alt="`${section.category} preview`"
            :class="[
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              activePanel === index ? 'lg:scale-105' : 'lg:grayscale',
            ]"
          />
          <div v-else class="absolute inset-0 bg-slate-100"></div>
          <div class="absolute inset-0 bg-linear-to-r lg:bg-linear-to-t from-black/60 via-black/20 lg:via-transparent to-transparent"></div>

          <!-- Name across: always on phones, on the open panel on large screens -->
          <span
            :class="[
              'absolute left-4 bottom-4 lg:left-6 lg:bottom-6 text-white transition-opacity duration-500',
              activePanel === index ? 'lg:opacity-100 lg:delay-200' : 'lg:opacity-0',
            ]"
          >
            <span class="block text-[9px] lg:text-[10px] font-black uppercase tracking-[0.25em] text-pink-200 mb-1 lg:mb-2">
              {{ String(index + 1).padStart(2, '0') }} · {{ projectCount(section) }} {{ projectCount(section) === 1 ? 'project' : 'projects' }}
            </span>
            <span class="block text-2xl lg:text-5xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
              {{ mobileCategoryLabel(section.category) }}
            </span>
          </span>

          <!-- Vertical name on closed panels (large screens only) -->
          <span
            :class="[
              'hidden lg:block absolute left-5 bottom-6 text-white text-[11px] font-black uppercase tracking-[0.3em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180 transition-opacity duration-300',
              activePanel === index ? 'opacity-0' : 'opacity-100',
            ]"
            aria-hidden="true"
          >
            {{ section.category }}
          </span>
        </button>
      </div>
    </div>

    <!-- Subcategory Index -->
    <div v-if="showSubcategories">
      <div class="flex items-center gap-6 mb-12">
        <button
          @click="$emit('selectCategory', 'All')"
          class="text-[10px] font-black uppercase tracking-widest bg-pink-800 text-white px-4 py-2 rounded-full hover:bg-black transition-colors"
        >
          ← Back
        </button>
        <p class="text-slate-400 uppercase tracking-[0.4em] text-[9px] font-black">
          <span class="md:hidden">{{ mobileCategoryLabel(currentCategory.category) }}</span>
          <span class="hidden md:inline">{{ currentCategory.category }}</span>
          / Choose Type
        </p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <button
          v-for="subcategory in currentCategory.subcategories"
          :key="subcategory.name"
          type="button"
          @click="$emit('selectSubcategory', { category: currentCategory.category, subcategory: subcategory.name })"
          :class="[
            'group relative aspect-square overflow-hidden rounded-3xl border transition-all duration-300',
            activeSubcategory === subcategory.name 
              ? 'border-pink-400 bg-pink-50' 
              : 'border-slate-100 hover:border-slate-300'
          ]"
        >
          <img
            v-if="subcategory.projects.length"
            :src="subcategory.projects[0].imageUrl"
            :alt="`${subcategory.name} preview`"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 touch-fullcolor transition-all duration-700 opacity-30 group-hover:opacity-100 touch-fullopacity"
          />
          <div v-else class="w-full h-full bg-slate-100"></div>
          <div class="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black/50 to-transparent">
            <span class="text-white text-[10px] font-black uppercase tracking-widest">{{ subcategory.name }}</span>
            <span class="text-slate-200 text-[8px] mt-1">{{ subcategory.projects.length }} {{ subcategory.projects.length === 1 ? 'project' : 'projects' }}</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>