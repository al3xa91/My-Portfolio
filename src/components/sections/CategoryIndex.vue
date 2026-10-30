<script setup>
defineProps({
  sections: {
    type: Array,
    default: () => [],
    validator: value => value.every(item => typeof item.category === 'string'),
  },
})

defineEmits({
  selectCategory: value => typeof value === 'string' && value.length > 0,
})

const mobileCategoryLabel = category => (category === 'Photography' ? 'Photo' : category)
</script>

<template>
  <section class="py-24 px-6 md:px-10 safe-px border-t border-slate-100 max-w-screen-2xl mx-auto">
    <div>
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
  </section>
</template>