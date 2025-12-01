<script setup lang="ts">
useHead({
  title: 'Your Eligibility Results - uGrant',
})

useSeoMeta({
  description: 'Your personalized energy grant eligibility results.',
  robots: 'noindex, nofollow', // Don't index results pages
})

const { answers, hasHydrated, initialize, clearAnswers } = useCheckerState()
const { evaluate } = useEligibility()
const { createLead, loading: savingLead } = useLead()

// Track if lead has been saved
const leadSaved = ref(false)
const leadId = ref<string | null>(null)
const saveError = ref<string | null>(null)

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

// Calculate eligibility using the real engine
const eligibilityResult = computed(() => {
  return evaluate(answers.value)
})

// Map eligibility tier for the ResultsCard component
const resultTier = computed(() => {
  const tierMap: Record<string, 'eligible' | 'potentially-eligible' | 'not-eligible'> = {
    'eligible': 'eligible',
    'potentially_eligible': 'potentially-eligible',
    'not_eligible': 'not-eligible',
  }
  return tierMap[eligibilityResult.value.overallTier] ?? 'not-eligible'
})

// Format schemes for ResultsCard
const formattedSchemes = computed(() => {
  return eligibilityResult.value.schemes
    .filter((s: { tier: string }) => s.tier === 'eligible' || s.tier === 'potentially_eligible')
    .map((scheme: { name: string; reasons: string[]; maxGrant?: number; slug: string }) => ({
      name: scheme.name,
      description: scheme.reasons.join(' '),
      potentialSavings: scheme.maxGrant ? `£${scheme.maxGrant.toLocaleString()}` : undefined,
      link: `/schemes/${scheme.slug}`,
    }))
})

// Save lead to database when results are shown (if eligible and opted for contact)
watch([hasHydrated, eligibilityResult], async ([hydrated, result]) => {
  if (!hydrated || leadSaved.value || savingLead.value) return

  // Only save leads that are eligible or potentially eligible
  if (result.overallTier === 'not_eligible') {
    leadSaved.value = true // Mark as "saved" to prevent retries
    return
  }

  // Save the lead
  const { success, leadId: newLeadId, error } = await createLead(answers.value, result)

  if (success && newLeadId) {
    leadSaved.value = true
    leadId.value = newLeadId
    console.log('Lead saved:', newLeadId)
  } else {
    saveError.value = error || 'Failed to save results'
    console.error('Failed to save lead:', error)
  }
}, { immediate: true })

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
        <CheckerResultsCard
          :tier="resultTier"
          :schemes="formattedSchemes"
          :wants-installer-contact="answers.wantsInstallerContact"
        />

        <!-- Lead saved confirmation -->
        <div
          v-if="leadSaved && answers.wantsInstallerContact && resultTier !== 'not-eligible'"
          class="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-xl"
        >
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p class="font-medium text-primary-900">Your details have been saved</p>
              <p class="text-sm text-primary-700 mt-1">
                An approved installer will be in touch soon to discuss your options and verify your eligibility.
              </p>
            </div>
          </div>
        </div>

        <!-- Error saving lead -->
        <div
          v-if="saveError"
          class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <div class="flex items-start gap-3">
            <svg class="w-6 h-6 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p class="font-medium text-red-900">There was a problem saving your details</p>
              <p class="text-sm text-red-700 mt-1">
                Please try again later or contact us directly.
              </p>
            </div>
          </div>
        </div>

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
