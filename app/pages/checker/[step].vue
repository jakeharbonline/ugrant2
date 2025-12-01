<script setup lang="ts">
import type { CheckerAnswers } from '~/composables/useCheckerState'
import type { EpcCertificate } from '~/composables/useEpcLookup'
import {
  getStepBySlug,
  getNextStepSlug,
  getPreviousStepSlug,
  isValidStepSlug,
  type StepConfig,
} from '~/utils/checkerSteps'

const route = useRoute()
const router = useRouter()

// Get the current step from the route parameter
const stepSlug = computed(() => route.params.step as string)

// Validate step slug and redirect if invalid
const stepConfig = computed<StepConfig | null>(() => {
  const slug = stepSlug.value
  if (!slug || !isValidStepSlug(slug)) {
    return null
  }
  return getStepBySlug(slug) ?? null
})

// Redirect to start if invalid step
watch(stepConfig, (config) => {
  if (!config) {
    navigateTo('/checker')
  }
}, { immediate: true })

// Page meta
useHead({
  title: computed(() =>
    stepConfig.value
      ? `Step ${stepConfig.value.number}: ${stepConfig.value.title} - Eligibility Checker`
      : 'Eligibility Checker'
  ),
})

// State management
const {
  answers,
  setAnswer,
  setAnswers,
  validateStep,
  initialize,
  totalSteps,
  hasHydrated,
} = useCheckerState()

// EPC lookup utilities for mapping data
const { parseInsulation, mapPropertyType, mapHeatingType } = useEpcLookup()

// Initialize state from localStorage on client
onMounted(() => {
  initialize()
})

// Local error state
const errors = ref<string[]>([])
const isSubmitting = ref(false)

// Computed answer values for two-way binding
const houseNumberValue = computed({
  get: () => answers.value.houseNumber,
  set: (value: string) => setAnswer('houseNumber', value),
})

const postcodeValue = computed({
  get: () => answers.value.postcode,
  set: (value: string) => setAnswer('postcode', value),
})

const propertyTypeValue = computed({
  get: () => answers.value.propertyType,
  set: (value: string) => setAnswer('propertyType', value),
})

const tenureValue = computed({
  get: () => answers.value.tenure,
  set: (value: string) => setAnswer('tenure', value),
})

const heatingTypeValue = computed({
  get: () => answers.value.heatingType,
  set: (value: string) => setAnswer('heatingType', value),
})

const insulationValue = computed({
  get: () => answers.value.insulation,
  set: (value: string[]) => setAnswer('insulation', value),
})

const benefitsValue = computed({
  get: () => answers.value.benefits,
  set: (value: string[]) => setAnswer('benefits', value),
})

const incomeBandValue = computed({
  get: () => answers.value.incomeBand,
  set: (value: string) => setAnswer('incomeBand', value),
})

const epcRatingValue = computed({
  get: () => answers.value.epcRating,
  set: (value: string) => setAnswer('epcRating', value),
})

const wantsInstallerContactValue = computed({
  get: () => answers.value.wantsInstallerContact,
  set: (value: boolean) => setAnswer('wantsInstallerContact', value),
})

const emailValue = computed({
  get: () => answers.value.email,
  set: (value: string) => setAnswer('email', value),
})

const phoneValue = computed({
  get: () => answers.value.phone,
  set: (value: string) => setAnswer('phone', value),
})

const acceptTermsValue = computed({
  get: () => answers.value.acceptTerms,
  set: (value: boolean) => setAnswer('acceptTerms', value),
})

const acceptPrivacyValue = computed({
  get: () => answers.value.acceptPrivacy,
  set: (value: boolean) => setAnswer('acceptPrivacy', value),
})

// Get specific error messages for contact step
const emailError = computed(() => {
  if (stepSlug.value !== 'contact') return ''
  return errors.value.find((e) => e.toLowerCase().includes('email')) ?? ''
})

const phoneError = computed(() => {
  if (stepSlug.value !== 'contact') return ''
  return errors.value.find((e) => e.toLowerCase().includes('phone')) ?? ''
})

// Get specific error messages for confirm step
const termsError = computed(() => {
  if (stepSlug.value !== 'confirm') return ''
  return errors.value.find((e) => e.toLowerCase().includes('terms')) ?? ''
})

const privacyError = computed(() => {
  if (stepSlug.value !== 'confirm') return ''
  return errors.value.find((e) => e.toLowerCase().includes('privacy')) ?? ''
})

// First error for other steps
const firstError = computed(() => errors.value[0] ?? '')

// Navigation
const previousStepSlug = computed(() => getPreviousStepSlug(stepSlug.value))
const nextStepSlug = computed(() => getNextStepSlug(stepSlug.value))
const isFinalStep = computed(() => stepConfig.value?.number === totalSteps)
const showBackButton = computed(() => previousStepSlug.value !== null)

function handleBack() {
  errors.value = []
  if (previousStepSlug.value) {
    router.push(`/checker/${previousStepSlug.value}`)
  }
}

async function handleNext() {
  errors.value = []

  // Validate current step
  const validation = validateStep(stepSlug.value)
  if (!validation.isValid) {
    errors.value = validation.errors
    return
  }

  // If final step, go to results
  if (isFinalStep.value) {
    isSubmitting.value = true

    // Simulate a brief processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    isSubmitting.value = false
    router.push('/checker/results')
    return
  }

  // Go to next step
  router.push(`/checker/${nextStepSlug.value}`)
}

// Clear errors when step changes
watch(stepSlug, () => {
  errors.value = []
})

// Track if we've auto-filled from EPC
const epcAutoFilled = ref(false)

// Handle EPC selection from postcode lookup
function handleEpcSelected(certificate: EpcCertificate) {
  // Map EPC data to our answer format
  const mappedPropertyType = mapPropertyType(certificate.propertyType)
  const mappedHeatingType = mapHeatingType(certificate.mainHeatDescription, certificate.mainFuel)
  const mappedInsulation = parseInsulation(certificate)

  // Prepare updates
  const updates: Partial<CheckerAnswers> = {
    epcRating: certificate.currentEnergyRating,
    heatingType: mappedHeatingType,
  }

  // Map property type to our options
  const propertyTypeMap: Record<string, string> = {
    'house': 'detached-house', // Default to detached, will be refined
    'flat': 'flat-purpose',
    'bungalow': 'bungalow',
    'maisonette': 'maisonette',
    'park-home': 'detached-house', // Closest match
  }

  // Try to get more specific property type from built form
  const builtForm = certificate.builtForm.toLowerCase()
  if (builtForm.includes('detached')) {
    updates.propertyType = 'detached-house'
  } else if (builtForm.includes('semi')) {
    updates.propertyType = 'semi-detached'
  } else if (builtForm.includes('end-terrace')) {
    updates.propertyType = 'end-terrace'
  } else if (builtForm.includes('terrace') || builtForm.includes('mid-terrace')) {
    updates.propertyType = 'terraced'
  } else if (mappedPropertyType === 'flat') {
    // Check if converted or purpose built
    if (certificate.propertyType.toLowerCase().includes('converted')) {
      updates.propertyType = 'flat-converted'
    } else {
      updates.propertyType = 'flat-purpose'
    }
  } else if (mappedPropertyType === 'bungalow') {
    updates.propertyType = 'bungalow'
  } else if (mappedPropertyType === 'maisonette') {
    updates.propertyType = 'maisonette'
  } else {
    updates.propertyType = propertyTypeMap[mappedPropertyType] || 'detached-house'
  }

  // Set insulation if we found any
  if (mappedInsulation.length > 0) {
    updates.insulation = mappedInsulation
  }

  // Apply all updates at once
  setAnswers(updates)
  epcAutoFilled.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <!-- Progress bar -->
      <div v-if="stepConfig" class="mb-8">
        <CheckerProgress
          :current-step="stepConfig.number"
          :total-steps="totalSteps"
        />
      </div>

      <!-- Main card -->
      <div
        v-if="stepConfig && hasHydrated"
        class="bg-white rounded-2xl shadow-elevated p-6 md:p-10"
      >
        <!-- Step header -->
        <div class="mb-8">
          <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            {{ stepConfig.title }}
          </h1>
          <p v-if="stepConfig.subtitle" class="text-neutral-600">
            {{ stepConfig.subtitle }}
          </p>
        </div>

        <!-- Step content -->
        <div class="mb-8">
          <!-- Postcode Input -->
          <template v-if="stepConfig.inputType === 'postcode'">
            <CheckerPostcodeInput
              v-model="postcodeValue"
              v-model:house-number="houseNumberValue"
              :error="firstError"
              :help-text="stepConfig.helpText"
              @epc-selected="handleEpcSelected"
            />

            <!-- Auto-fill success message -->
            <div
              v-if="epcAutoFilled"
              class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
            >
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-medium text-green-900 text-sm">Property details auto-filled</p>
                  <p class="text-xs text-green-700 mt-1">
                    We've pre-filled your property type, heating, insulation, and EPC rating from your certificate. You can review and change these on the following steps.
                  </p>
                </div>
              </div>
            </div>
          </template>

          <!-- Property Type Radio -->
          <template v-else-if="stepConfig.slug === 'property-type'">
            <CheckerRadioGroup
              v-model="propertyTypeValue"
              :options="stepConfig.options ?? []"
              name="property-type"
              :error="firstError"
              :card-style="true"
            />
          </template>

          <!-- Tenure Radio -->
          <template v-else-if="stepConfig.slug === 'tenure'">
            <CheckerRadioGroup
              v-model="tenureValue"
              :options="stepConfig.options ?? []"
              name="tenure"
              :error="firstError"
              :card-style="true"
            />
          </template>

          <!-- Heating Type Radio -->
          <template v-else-if="stepConfig.slug === 'heating'">
            <CheckerRadioGroup
              v-model="heatingTypeValue"
              :options="stepConfig.options ?? []"
              name="heating"
              :error="firstError"
              :card-style="true"
            />
          </template>

          <!-- Insulation Checkbox -->
          <template v-else-if="stepConfig.slug === 'insulation'">
            <CheckerCheckboxGroup
              v-model="insulationValue"
              :options="stepConfig.options ?? []"
              name="insulation"
              :error="firstError"
              :help-text="stepConfig.helpText"
            />
          </template>

          <!-- Benefits Checkbox -->
          <template v-else-if="stepConfig.slug === 'benefits'">
            <CheckerCheckboxGroup
              v-model="benefitsValue"
              :options="stepConfig.options ?? []"
              name="benefits"
              :error="firstError"
              :help-text="stepConfig.helpText"
            />
          </template>

          <!-- Income Radio -->
          <template v-else-if="stepConfig.slug === 'income'">
            <CheckerRadioGroup
              v-model="incomeBandValue"
              :options="stepConfig.options ?? []"
              name="income"
              :error="firstError"
              :card-style="true"
            />
          </template>

          <!-- EPC Selector -->
          <template v-else-if="stepConfig.inputType === 'epc'">
            <CheckerEpcSelector
              v-model="epcRatingValue"
              :error="firstError"
              :help-text="stepConfig.helpText"
            />
          </template>

          <!-- Contact Fields -->
          <template v-else-if="stepConfig.inputType === 'contact'">
            <CheckerContactFields
              v-model:wants-contact="wantsInstallerContactValue"
              v-model:email="emailValue"
              v-model:phone="phoneValue"
              :email-error="emailError"
              :phone-error="phoneError"
            />
          </template>

          <!-- Confirmation Step -->
          <template v-else-if="stepConfig.inputType === 'confirm'">
            <CheckerConfirmationStep
              v-model:accept-terms="acceptTermsValue"
              v-model:accept-privacy="acceptPrivacyValue"
              :terms-error="termsError"
              :privacy-error="privacyError"
            />
          </template>
        </div>

        <!-- Navigation -->
        <CheckerNavigation
          :show-back="showBackButton"
          :is-final-step="isFinalStep"
          :is-submitting="isSubmitting"
          @back="handleBack"
          @next="handleNext"
        />
      </div>

      <!-- Loading state -->
      <div
        v-else-if="stepConfig && !hasHydrated"
        class="bg-white rounded-2xl shadow-elevated p-6 md:p-10 animate-pulse"
      >
        <div class="h-8 bg-neutral-200 rounded w-3/4 mb-4" />
        <div class="h-4 bg-neutral-200 rounded w-1/2 mb-8" />
        <div class="space-y-4">
          <div class="h-16 bg-neutral-100 rounded-xl" />
          <div class="h-16 bg-neutral-100 rounded-xl" />
          <div class="h-16 bg-neutral-100 rounded-xl" />
        </div>
      </div>

      <!-- Help text -->
      <div class="mt-8 text-center">
        <p class="text-sm text-neutral-500">
          Need help? <NuxtLink to="/faq" class="text-primary-700 hover:underline">View our FAQs</NuxtLink>
          or <NuxtLink to="/contact" class="text-primary-700 hover:underline">contact us</NuxtLink>.
        </p>
      </div>
    </div>
  </div>
</template>
