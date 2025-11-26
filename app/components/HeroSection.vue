<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  /** Whether to show the green gradient background */
  variant?: 'default' | 'green' | 'minimal'
  /** Alignment of content */
  align?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  align: 'center',
})

const backgroundClasses = computed(() => {
  switch (props.variant) {
    case 'green':
      return 'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white'
    case 'minimal':
      return 'bg-neutral-50'
    default:
      return 'bg-gradient-to-br from-primary-50 via-white to-primary-50'
  }
})

const textClasses = computed(() => {
  if (props.variant === 'green') {
    return {
      title: 'text-white',
      subtitle: 'text-primary-200',
      description: 'text-primary-100',
    }
  }
  return {
    title: 'text-neutral-900',
    subtitle: 'text-primary-700',
    description: 'text-neutral-600',
  }
})

const alignmentClasses = computed(() => {
  return props.align === 'center' ? 'text-center items-center' : 'text-left items-start'
})
</script>

<template>
  <section :class="['py-16 md:py-24 lg:py-32', backgroundClasses]">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div :class="['flex flex-col gap-6 max-w-4xl', alignmentClasses, align === 'center' ? 'mx-auto' : '']">
        <p
          v-if="subtitle"
          :class="['text-sm md:text-base font-semibold uppercase tracking-wider', textClasses.subtitle]"
        >
          {{ subtitle }}
        </p>

        <h1
          :class="['text-3xl md:text-4xl lg:text-5xl font-bold leading-tight', textClasses.title]"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          :class="['text-lg md:text-xl leading-relaxed max-w-3xl', textClasses.description]"
        >
          {{ description }}
        </p>

        <div
          v-if="ctaText || secondaryCtaText"
          :class="['flex flex-col sm:flex-row gap-4 mt-4', align === 'center' ? 'justify-center' : '']"
        >
          <NuxtLink
            v-if="ctaText && ctaLink"
            :to="ctaLink"
            :class="[
              'inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 text-lg',
              variant === 'green'
                ? 'bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl'
                : 'bg-primary-700 text-white hover:bg-primary-800 shadow-lg hover:shadow-xl'
            ]"
          >
            {{ ctaText }}
            <svg
              class="ml-2 w-5 h-5"
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

          <NuxtLink
            v-if="secondaryCtaText && secondaryCtaLink"
            :to="secondaryCtaLink"
            :class="[
              'inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-200 text-lg',
              variant === 'green'
                ? 'border-2 border-white/30 text-white hover:bg-white/10'
                : 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50'
            ]"
          >
            {{ secondaryCtaText }}
          </NuxtLink>
        </div>

        <slot />
      </div>
    </div>
  </section>
</template>
