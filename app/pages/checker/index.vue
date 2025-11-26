<script setup lang="ts">
useHead({
  title: 'Check Your Eligibility - Free Energy Grants',
})

useSeoMeta({
  description: 'Check if you qualify for free energy efficiency grants in just 2 minutes. Find out about ECO4, GBIS, Warm Home Discount and more.',
  ogTitle: 'Check Your Eligibility for Free Energy Grants',
  ogDescription: 'Answer a few simple questions to see which energy schemes you could qualify for.',
})

const { clearAnswers } = useCheckerState()

// Clear any previous answers when starting fresh
function handleStart() {
  clearAnswers()
  navigateTo('/checker/postcode')
}

const benefits = [
  {
    title: 'Free Improvements',
    description: 'Eligible households can receive free insulation, heating upgrades, and more',
    icon: 'home',
  },
  {
    title: 'Lower Bills',
    description: 'Reduce your energy costs by up to 50% with proper insulation',
    icon: 'currency',
  },
  {
    title: 'Quick Check',
    description: 'Takes less than 2 minutes to complete our eligibility checker',
    icon: 'clock',
  },
]

const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  currency: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
          Free Eligibility Check
        </span>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
          See If You Qualify for Free Energy Grants
        </h1>
        <p class="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
          Thousands of UK households are eligible for free insulation and heating upgrades.
          Check if you qualify in under 2 minutes.
        </p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-3xl shadow-elevated p-8 md:p-12 mb-8">
        <!-- Benefits Grid -->
        <div class="grid md:grid-cols-3 gap-6 mb-10">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="flex items-start gap-4"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                class="w-6 h-6 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="iconPaths[benefit.icon]"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-neutral-900">{{ benefit.title }}</h3>
              <p class="text-sm text-neutral-600 mt-1">{{ benefit.description }}</p>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="border-neutral-200 mb-10" />

        <!-- What we'll ask section -->
        <div class="mb-10">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">
            What we'll ask you:
          </h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="flex items-center gap-3 text-neutral-600">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Your postcode</span>
            </div>
            <div class="flex items-center gap-3 text-neutral-600">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Property type and tenure</span>
            </div>
            <div class="flex items-center gap-3 text-neutral-600">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Current heating and insulation</span>
            </div>
            <div class="flex items-center gap-3 text-neutral-600">
              <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Benefits and income (optional)</span>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          type="button"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary-700 text-white text-lg font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          @click="handleStart"
        >
          Start Eligibility Check
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p class="mt-4 text-sm text-neutral-500">
          Free, no obligation - your data is protected
        </p>
      </div>

      <!-- Trust indicators -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p class="text-2xl font-bold text-primary-700">50,000+</p>
          <p class="text-sm text-neutral-500">Households helped</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-primary-700">98%</p>
          <p class="text-sm text-neutral-500">Success rate</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-primary-700">2 mins</p>
          <p class="text-sm text-neutral-500">To complete</p>
        </div>
        <div>
          <p class="text-2xl font-bold text-primary-700">100%</p>
          <p class="text-sm text-neutral-500">Free & secure</p>
        </div>
      </div>
    </div>
  </div>
</template>
