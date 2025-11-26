<script setup lang="ts">
import type { EligibilityTier } from '~/components/checker/ResultsCard.vue'

useHead({
  title: 'Your Eligibility Results - uGrant',
})

useSeoMeta({
  description: 'Your personalized energy grant eligibility results.',
  robots: 'noindex, nofollow', // Don't index results pages
})

const { answers, hasHydrated, initialize, clearAnswers } = useCheckerState()

// Initialize state from localStorage on client
onMounted(() => {
  initialize()
})

// Redirect if no answers (user hasn't completed the checker)
watch(hasHydrated, (hydrated) => {
  if (hydrated && !answers.value.acceptTerms) {
    navigateTo('/checker')
  }
}, { immediate: true })

/**
 * Mock eligibility calculation
 * In production, this would call an API or use more sophisticated logic
 */
interface SchemeResult {
  name: string
  description: string
  potentialSavings?: string
  link: string
}

const eligibilityResult = computed(() => {
  const data = answers.value

  // Determine eligibility tier based on answers
  let tier: EligibilityTier = 'not-eligible'
  const schemes: SchemeResult[] = []

  // Check for strong eligibility indicators
  const hasQualifyingBenefit = data.benefits.some((b: string) =>
    ['universal-credit', 'pension-credit', 'income-support', 'jsa-income', 'esa-income'].includes(b)
  )

  const hasTaxCreditWithLowIncome = data.benefits.some((b: string) =>
    ['child-tax-credit', 'working-tax-credit', 'child-benefit'].includes(b)
  ) && data.incomeBand === 'under-31k'

  const hasPoorEpc = ['D', 'E', 'F', 'G', 'unknown'].includes(data.epcRating)
  const hasInefficientHeating = ['oil-boiler', 'lpg-boiler', 'coal', 'electric-storage', 'electric-panel', 'none'].includes(data.heatingType)
  const needsInsulation = !data.insulation.includes('cavity-wall') || !data.insulation.includes('loft-full')
  const isLowIncome = data.incomeBand === 'under-31k'

  // ECO4 eligibility (benefit-based)
  if (hasQualifyingBenefit || hasTaxCreditWithLowIncome) {
    tier = 'eligible'
    schemes.push({
      name: 'ECO4',
      description: 'The main government energy efficiency scheme providing free insulation and heating upgrades.',
      potentialSavings: '£10,000',
      link: '/schemes/eco4',
    })
  }

  // GBIS eligibility (EPC-based, no benefits required)
  if (hasPoorEpc && needsInsulation) {
    if (tier !== 'eligible') tier = 'potentially-eligible'
    schemes.push({
      name: 'Great British Insulation Scheme (GBIS)',
      description: 'Cavity wall and loft insulation for properties with poor energy ratings.',
      potentialSavings: '£4,000',
      link: '/schemes/gbis',
    })
  }

  // LA Flex (Local Authority Flex) - for vulnerable households
  if (isLowIncome && (hasPoorEpc || hasInefficientHeating)) {
    if (tier !== 'eligible') tier = 'potentially-eligible'
    const hasLaFlex = schemes.some((s) => s.name.includes('LA Flex'))
    if (!hasLaFlex) {
      schemes.push({
        name: 'LA Flex',
        description: 'Local authority scheme for fuel-poor households not on qualifying benefits.',
        potentialSavings: '£10,000',
        link: '/schemes/la-flex',
      })
    }
  }

  // Warm Home Discount
  if (hasQualifyingBenefit && data.incomeBand !== 'over-40k') {
    if (tier !== 'eligible') tier = 'potentially-eligible'
    schemes.push({
      name: 'Warm Home Discount',
      description: 'A £150 discount on your electricity bill each winter.',
      potentialSavings: '£150',
      link: '/schemes/warm-home-discount',
    })
  }

  // Boiler Upgrade Scheme (for owner-occupiers replacing fossil fuel heating)
  if (data.tenure === 'owner-occupied' && hasInefficientHeating && data.heatingType !== 'heat-pump') {
    if (tier !== 'eligible') tier = 'potentially-eligible'
    schemes.push({
      name: 'Boiler Upgrade Scheme',
      description: 'Grants up to £7,500 towards heat pumps to replace your current heating system.',
      potentialSavings: '£7,500',
      link: '/schemes/boiler-upgrade-scheme',
    })
  }

  return {
    tier,
    schemes,
    wantsInstallerContact: data.wantsInstallerContact,
  }
})

function handleRestart() {
  clearAnswers()
  navigateTo('/checker')
}

function handleGoHome() {
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Loading state -->
      <div
        v-if="!hasHydrated"
        class="bg-white rounded-2xl shadow-elevated p-6 md:p-10 animate-pulse"
      >
        <div class="flex items-start gap-4 mb-8">
          <div class="w-14 h-14 bg-neutral-200 rounded-full" />
          <div class="flex-1">
            <div class="h-8 bg-neutral-200 rounded w-3/4 mb-3" />
            <div class="h-4 bg-neutral-200 rounded w-1/2" />
          </div>
        </div>
        <div class="space-y-4">
          <div class="h-24 bg-neutral-100 rounded-xl" />
          <div class="h-24 bg-neutral-100 rounded-xl" />
        </div>
      </div>

      <!-- Results content -->
      <template v-else>
        <!-- Results header -->
        <div class="text-center mb-8">
          <span class="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Your Results
          </span>
          <h1 class="text-2xl md:text-3xl font-bold text-neutral-900">
            Eligibility Check Complete
          </h1>
        </div>

        <!-- Results card -->
        <ResultsCard
          :tier="eligibilityResult.tier"
          :schemes="eligibilityResult.schemes"
          :wants-installer-contact="eligibilityResult.wantsInstallerContact"
        />

        <!-- Actions -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            @click="handleRestart"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Check again
          </button>

          <NuxtLink
            to="/schemes"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Browse all schemes
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Share results info -->
        <div class="mt-12 p-6 bg-white rounded-xl border border-neutral-200">
          <h3 class="font-semibold text-neutral-900 mb-3">
            Save your results
          </h3>
          <p class="text-sm text-neutral-600 mb-4">
            Your eligibility results are saved in your browser. You can return to this page at any time to view them again, or start a new check if your circumstances change.
          </p>
          <button
            type="button"
            class="text-sm text-primary-700 font-medium hover:text-primary-800 hover:underline"
            @click="handleGoHome"
          >
            Return to homepage
          </button>
        </div>

        <!-- Disclaimer -->
        <div class="mt-8 p-4 bg-neutral-50 rounded-xl text-sm text-neutral-600">
          <p class="flex items-start gap-2">
            <svg class="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Disclaimer:</strong> These results are indicative only and based on the information you provided. Final eligibility is subject to verification by approved installers and scheme administrators. Eligibility criteria may change.
            </span>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
