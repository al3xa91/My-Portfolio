<script setup>
import { computed } from 'vue'

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

const mobileCategoryLabel = category => (category === 'Photography' ? 'Photo' : category)
</script>

<template>
  <section class="py-24 px-6 md:px-10 safe-px border-t border-slate-100 max-w-screen-2xl mx-auto">
    <!-- Main Category Index -->
    <div v-if="!showSubcategories">
      <p class="text-slate-400 uppercase tracking-[0.4em] text-[9px] font-black mb-12 text-center md:text-left">Categories</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <button
          v-for="section in sections"
          :key="section.category"
          type="button"
          @click="$emit('selectCategory', section.category)"
          class="group relative aspect-square overflow-hidden rounded-l border border-slate-100"
        >
          <img
            v-if="section.thumbnailImageUrl"
            :src="section.thumbnailImageUrl"
            :alt="`${section.category} preview`"
            class="w-full h-full object-cover grayscale group-hover:grayscale-0 touch-fullcolor transition-all duration-700 opacity-30 group-hover:opacity-100 touch-fullopacity"
          />
          <div v-else class="w-full h-full bg-slate-100"></div>
          <div class="absolute inset-0 p-6 flex flex-col justify-end bg-linear-to-t from-black/50 to-transparent">
            <span class="text-white text-[10px] font-black uppercase tracking-widest">
              <span class="md:hidden">{{ mobileCategoryLabel(section.category) }}</span>
              <span class="hidden md:inline">{{ section.category }}</span>
            </span>
          </div>
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