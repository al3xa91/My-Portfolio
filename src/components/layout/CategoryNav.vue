<script setup>
/**
 * Slim category bar that slides in at the top once the visitor has scrolled
 * past the big category panels, so the other categories are always one click away.
 */
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  active: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <nav
    aria-label="Categories"
    :class="[
      'fixed inset-x-0 top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-transform duration-500 ease-out',
      visible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <div class="mx-auto flex max-w-350 items-center gap-6 px-6 md:px-10 safe-px">
      <span class="hidden shrink-0 text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 md:block">
        Categories
      </span>
      <ul class="no-scrollbar -mx-2 flex flex-1 items-center justify-between gap-0 overflow-x-auto md:justify-end md:gap-1">
        <li v-for="category in categories" :key="category">
          <button
            type="button"
            :aria-current="active === category ? 'true' : undefined"
            @click="$emit('select', category)"
            :class="[
              'relative whitespace-nowrap px-2 py-4 text-[9px] font-black uppercase tracking-[0.12em] transition-colors md:px-3 md:text-[10px] md:tracking-[0.2em]',
              active === category ? 'text-pink-800' : 'text-slate-500 hover:text-black',
            ]"
          >
            {{ category }}
            <span
              :class="[
                'absolute inset-x-2 md:inset-x-3 bottom-2.5 h-0.5 rounded-full bg-pink-800 transition-transform duration-300 origin-left',
                active === category ? 'scale-x-100' : 'scale-x-0',
              ]"
              aria-hidden="true"
            ></span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
