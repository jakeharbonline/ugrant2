<script setup lang="ts">
interface Props {
  title: string
  description: string
  href: string
  icon?: 'home' | 'bolt' | 'fire' | 'sun' | 'shield' | 'building'
  savings?: string
  features?: string[]
  /** Highlight this card as featured */
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'bolt',
  featured: false,
})

const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  fire: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z',
  sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
}
</script>

<template>
  <article
    :class="[
      'group relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 h-full flex flex-col',
      featured
        ? 'ring-2 ring-primary-500 shadow-elevated'
        : 'shadow-card hover:shadow-elevated'
    ]"
  >
    <!-- Featured Badge -->
    <div
      v-if="featured"
      class="absolute -top-3 left-6 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
    >
      Most Popular
    </div>

    <!-- Icon -->
    <div
      :class="[
        'w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors',
        featured ? 'bg-primary-600' : 'bg-primary-100 group-hover:bg-primary-600'
      ]"
    >
      <svg
        :class="[
          'w-7 h-7 transition-colors',
          featured ? 'text-white' : 'text-primary-600 group-hover:text-white'
        ]"
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

    <!-- Content -->
    <h3 class="text-xl md:text-2xl font-bold text-neutral-900 mb-3">
      {{ title }}
    </h3>

    <p class="text-neutral-600 mb-4 flex-grow">
      {{ description }}
    </p>

    <!-- Savings Badge -->
    <div
      v-if="savings"
      class="inline-flex items-center gap-2 bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1.5 rounded-full mb-4 w-fit"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Save up to {{ savings }}
    </div>

    <!-- Features List -->
    <ul v-if="features && features.length > 0" class="space-y-2 mb-6">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-start gap-2 text-sm text-neutral-600"
      >
        <svg
          class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{{ feature }}</span>
      </li>
    </ul>

    <!-- Link -->
    <NuxtLink
      :to="href"
      class="inline-flex items-center font-semibold text-primary-700 hover:text-primary-800 mt-auto group/link"
    >
      Learn more
      <svg
        class="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </NuxtLink>
  </article>
</template>
