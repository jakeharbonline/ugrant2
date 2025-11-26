<script setup lang="ts">
interface Props {
  /** Show back button */
  showBack?: boolean
  /** Back button disabled state */
  backDisabled?: boolean
  /** Next/Submit button disabled state */
  nextDisabled?: boolean
  /** Is this the final step (shows "See Results" instead of "Continue") */
  isFinalStep?: boolean
  /** Is the form submitting */
  isSubmitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBack: true,
  backDisabled: false,
  nextDisabled: false,
  isFinalStep: false,
  isSubmitting: false,
})

const emit = defineEmits<{
  back: []
  next: []
}>()

const nextButtonText = computed(() => {
  if (props.isSubmitting) return 'Checking...'
  if (props.isFinalStep) return 'See My Results'
  return 'Continue'
})
</script>

<template>
  <div class="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-neutral-200">
    <!-- Back Button -->
    <button
      v-if="showBack"
      type="button"
      :disabled="backDisabled"
      class="flex items-center justify-center gap-2 px-6 py-3 text-neutral-700 font-medium rounded-xl border border-neutral-300 hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      @click="emit('back')"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back</span>
    </button>

    <!-- Spacer for alignment when no back button -->
    <div v-else class="hidden sm:block" />

    <!-- Next/Submit Button -->
    <button
      type="button"
      :disabled="nextDisabled || isSubmitting"
      class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      @click="emit('next')"
    >
      <!-- Loading spinner -->
      <svg
        v-if="isSubmitting"
        class="w-5 h-5 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      <span>{{ nextButtonText }}</span>

      <!-- Arrow icon (hidden when loading) -->
      <svg
        v-if="!isSubmitting"
        class="w-5 h-5"
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
    </button>
  </div>
</template>
