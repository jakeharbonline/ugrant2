<script setup lang="ts">
export type EligibilityTier = 'eligible' | 'potentially-eligible' | 'not-eligible'

interface SchemeResult {
  name: string
  description: string
  potentialSavings?: string
  link: string
}

interface Props {
  tier: EligibilityTier
  schemes: SchemeResult[]
  wantsInstallerContact: boolean
}

const props = defineProps<Props>()

const tierConfig = computed(() => {
  switch (props.tier) {
    case 'eligible':
      return {
        title: 'Great news! You\'re eligible',
        subtitle: 'Based on your answers, you qualify for the following energy schemes:',
        icon: 'check-circle',
        bgColor: 'bg-primary-50',
        borderColor: 'border-primary-200',
        iconColor: 'text-primary-600',
        titleColor: 'text-primary-900',
      }
    case 'potentially-eligible':
      return {
        title: 'You might be eligible',
        subtitle: 'Based on your answers, you could potentially qualify for these schemes. An installer can confirm your eligibility:',
        icon: 'question-circle',
        bgColor: 'bg-accent-50',
        borderColor: 'border-accent-200',
        iconColor: 'text-accent-600',
        titleColor: 'text-accent-900',
      }
    case 'not-eligible':
      return {
        title: 'Unfortunately, you\'re not currently eligible',
        subtitle: 'Based on your answers, you don\'t currently qualify for any schemes. However, eligibility criteria may change.',
        icon: 'x-circle',
        bgColor: 'bg-neutral-50',
        borderColor: 'border-neutral-200',
        iconColor: 'text-neutral-500',
        titleColor: 'text-neutral-900',
      }
  }
})

const iconPaths: Record<string, string> = {
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'question-circle': 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'x-circle': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
}
</script>

<template>
  <div
    :class="[
      'rounded-2xl border-2 overflow-hidden',
      tierConfig.bgColor,
      tierConfig.borderColor
    ]"
  >
    <!-- Header -->
    <div class="p-6 md:p-8">
      <div class="flex items-start gap-4">
        <div
          :class="[
            'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0',
            tier === 'eligible' ? 'bg-primary-100' : tier === 'potentially-eligible' ? 'bg-accent-100' : 'bg-neutral-200'
          ]"
        >
          <svg
            :class="['w-8 h-8', tierConfig.iconColor]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPaths[tierConfig.icon]"
            />
          </svg>
        </div>
        <div>
          <h2 :class="['text-2xl md:text-3xl font-bold', tierConfig.titleColor]">
            {{ tierConfig.title }}
          </h2>
          <p class="mt-2 text-neutral-600">
            {{ tierConfig.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Schemes list (only for eligible/potentially eligible) -->
    <div
      v-if="tier !== 'not-eligible' && schemes.length > 0"
      class="border-t border-neutral-200 bg-white"
    >
      <div class="p-6 md:p-8">
        <h3 class="text-lg font-semibold text-neutral-900 mb-4">
          Schemes you may qualify for:
        </h3>
        <div class="space-y-4">
          <article
            v-for="scheme in schemes"
            :key="scheme.name"
            class="p-4 bg-neutral-50 rounded-xl"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h4 class="font-semibold text-neutral-900">
                  {{ scheme.name }}
                </h4>
                <p class="mt-1 text-sm text-neutral-600">
                  {{ scheme.description }}
                </p>
              </div>
              <div
                v-if="scheme.potentialSavings"
                class="flex-shrink-0 px-3 py-1 bg-accent-100 text-accent-800 text-sm font-semibold rounded-full"
              >
                Up to {{ scheme.potentialSavings }}
              </div>
            </div>
            <NuxtLink
              :to="scheme.link"
              class="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              Learn more
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>

    <!-- Installer contact confirmation -->
    <div
      v-if="tier !== 'not-eligible' && wantsInstallerContact"
      class="border-t border-neutral-200 bg-white p-6 md:p-8"
    >
      <div class="flex items-start gap-4 p-4 bg-primary-50 rounded-xl">
        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <h4 class="font-semibold text-primary-900">
            We'll be in touch soon
          </h4>
          <p class="mt-1 text-sm text-primary-700">
            Accredited installers in your area will contact you within 48 hours to discuss your options and arrange a survey.
          </p>
        </div>
      </div>
    </div>

    <!-- Not eligible alternatives -->
    <div
      v-if="tier === 'not-eligible'"
      class="border-t border-neutral-200 bg-white p-6 md:p-8"
    >
      <h3 class="text-lg font-semibold text-neutral-900 mb-4">
        What you can do:
      </h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-neutral-600">
            <strong class="text-neutral-900">Check back later</strong> - eligibility criteria change regularly as new schemes are introduced
          </span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-neutral-600">
            <strong class="text-neutral-900">Explore the Boiler Upgrade Scheme</strong> - grants up to £7,500 for heat pumps are available to most homeowners
          </span>
        </li>
        <li class="flex items-start gap-3">
          <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-neutral-600">
            <strong class="text-neutral-900">Get in touch</strong> - speak to our team who may be able to find additional options
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
