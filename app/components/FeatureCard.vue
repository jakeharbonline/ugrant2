<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon?: 'check' | 'clock' | 'shield' | 'phone' | 'document' | 'home' | 'currency' | 'users'
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'check',
})

const iconPaths: Record<string, string> = {
  check: 'M5 13l4 4L19 7',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  currency: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
}
</script>

<template>
  <div class="flex gap-4 md:gap-6">
    <div class="flex-shrink-0">
      <div
        v-if="step"
        class="w-12 h-12 md:w-14 md:h-14 bg-primary-700 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold"
      >
        {{ step }}
      </div>
      <div
        v-else
        class="w-12 h-12 md:w-14 md:h-14 bg-primary-100 rounded-xl flex items-center justify-center"
      >
        <svg
          class="w-6 h-6 md:w-7 md:h-7 text-primary-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="iconPaths[icon]"
          />
        </svg>
      </div>
    </div>
    <div>
      <h3 class="text-lg md:text-xl font-semibold text-neutral-900 mb-2">
        {{ title }}
      </h3>
      <p class="text-neutral-600 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>
