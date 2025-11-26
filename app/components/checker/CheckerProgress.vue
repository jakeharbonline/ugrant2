<script setup lang="ts">
import { CHECKER_STEPS } from '~/utils/checkerSteps'

interface Props {
  /** Current step number (1-10) */
  currentStep: number
  /** Total number of steps */
  totalSteps?: number
}

const props = withDefaults(defineProps<Props>(), {
  totalSteps: 10,
})

const progressPercentage = computed(() => {
  return Math.round((props.currentStep / props.totalSteps) * 100)
})

const currentStepConfig = computed(() => {
  return CHECKER_STEPS.find((s) => s.number === props.currentStep)
})
</script>

<template>
  <div class="w-full">
    <!-- Mobile: Simple progress bar -->
    <div class="md:hidden">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium text-neutral-600">
          Step {{ currentStep }} of {{ totalSteps }}
        </span>
        <span class="text-sm font-semibold text-primary-700">
          {{ progressPercentage }}%
        </span>
      </div>
      <div
        class="h-2 bg-neutral-200 rounded-full overflow-hidden"
        role="progressbar"
        :aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Progress: Step ${currentStep} of ${totalSteps}`"
      >
        <div
          class="h-full bg-primary-600 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${progressPercentage}%` }"
        />
      </div>
    </div>

    <!-- Desktop: Step indicators with labels -->
    <div class="hidden md:block">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-neutral-600">
          Step {{ currentStep }} of {{ totalSteps }}
        </span>
        <span class="text-sm font-semibold text-primary-700">
          {{ progressPercentage }}% complete
        </span>
      </div>

      <!-- Progress bar with step markers -->
      <div class="relative">
        <!-- Background track -->
        <div class="h-2 bg-neutral-200 rounded-full" />

        <!-- Filled progress -->
        <div
          class="absolute top-0 left-0 h-2 bg-primary-600 rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${progressPercentage}%` }"
          role="progressbar"
          :aria-valuenow="progressPercentage"
          aria-valuemin="0"
          aria-valuemax="100"
        />

        <!-- Step dots -->
        <div class="absolute top-0 left-0 w-full flex justify-between -mt-1">
          <button
            v-for="step in totalSteps"
            :key="step"
            type="button"
            class="w-4 h-4 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="[
              step <= currentStep
                ? 'bg-primary-600 border-primary-600'
                : 'bg-white border-neutral-300',
              step === currentStep && 'ring-4 ring-primary-100'
            ]"
            :aria-label="`Step ${step}${step <= currentStep ? ' (completed)' : ''}`"
            :aria-current="step === currentStep ? 'step' : undefined"
            tabindex="-1"
          />
        </div>
      </div>

      <!-- Current step label -->
      <p
        v-if="currentStepConfig"
        class="mt-4 text-sm text-neutral-500 text-center"
      >
        {{ currentStepConfig.title }}
      </p>
    </div>
  </div>
</template>
