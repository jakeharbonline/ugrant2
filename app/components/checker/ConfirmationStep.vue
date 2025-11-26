<script setup lang="ts">
interface Props {
  acceptTerms: boolean
  acceptPrivacy: boolean
  termsError?: string
  privacyError?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:acceptTerms': [value: boolean]
  'update:acceptPrivacy': [value: boolean]
}>()

const localAcceptTerms = computed({
  get: () => props.acceptTerms,
  set: (value: boolean) => emit('update:acceptTerms', value),
})

const localAcceptPrivacy = computed({
  get: () => props.acceptPrivacy,
  set: (value: boolean) => emit('update:acceptPrivacy', value),
})

const hasErrors = computed(() => props.termsError || props.privacyError)
</script>

<template>
  <div class="space-y-6">
    <!-- Summary of what happens next -->
    <div class="p-6 bg-primary-50 rounded-xl">
      <h3 class="font-semibold text-primary-900 mb-3 flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        What happens next?
      </h3>
      <ul class="space-y-2 text-sm text-primary-800">
        <li class="flex items-start gap-2">
          <span class="font-bold text-primary-600 mt-0.5">1.</span>
          <span>We'll check your eligibility across all available schemes</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="font-bold text-primary-600 mt-0.5">2.</span>
          <span>You'll see which grants and improvements you may qualify for</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="font-bold text-primary-600 mt-0.5">3.</span>
          <span>If you opted in, accredited installers will contact you</span>
        </li>
      </ul>
    </div>

    <!-- Error summary -->
    <div
      v-if="hasErrors"
      class="p-4 bg-red-50 border border-red-200 rounded-xl"
      role="alert"
    >
      <p class="text-sm text-red-700 font-medium">Please accept the required terms below:</p>
    </div>

    <!-- Required confirmations -->
    <fieldset class="space-y-4">
      <legend class="sr-only">Required confirmations</legend>

      <!-- Terms and Conditions -->
      <label
        :class="[
          'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
          'hover:border-primary-300',
          'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          localAcceptTerms
            ? 'border-primary-600 bg-primary-50'
            : termsError
              ? 'border-red-400 bg-red-50'
              : 'border-neutral-200 bg-white'
        ]"
      >
        <input
          v-model="localAcceptTerms"
          type="checkbox"
          class="mt-0.5 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          :aria-invalid="!!termsError"
        />
        <div>
          <span class="block font-medium text-neutral-900">
            I accept the
            <NuxtLink to="/terms" target="_blank" class="text-primary-700 hover:underline">
              Terms and Conditions
            </NuxtLink>
            <span class="text-red-600" aria-hidden="true">*</span>
          </span>
          <span class="block mt-1 text-sm text-neutral-500">
            By accepting, you agree to our terms of service for using this eligibility checker.
          </span>
          <p v-if="termsError" class="mt-1 text-sm text-red-600">{{ termsError }}</p>
        </div>
      </label>

      <!-- Privacy Policy -->
      <label
        :class="[
          'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
          'hover:border-primary-300',
          'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          localAcceptPrivacy
            ? 'border-primary-600 bg-primary-50'
            : privacyError
              ? 'border-red-400 bg-red-50'
              : 'border-neutral-200 bg-white'
        ]"
      >
        <input
          v-model="localAcceptPrivacy"
          type="checkbox"
          class="mt-0.5 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          :aria-invalid="!!privacyError"
        />
        <div>
          <span class="block font-medium text-neutral-900">
            I accept the
            <NuxtLink to="/privacy" target="_blank" class="text-primary-700 hover:underline">
              Privacy Policy
            </NuxtLink>
            <span class="text-red-600" aria-hidden="true">*</span>
          </span>
          <span class="block mt-1 text-sm text-neutral-500">
            By accepting, you consent to how we collect, use, and protect your personal information.
          </span>
          <p v-if="privacyError" class="mt-1 text-sm text-red-600">{{ privacyError }}</p>
        </div>
      </label>
    </fieldset>

    <!-- Trust indicators -->
    <div class="flex flex-wrap gap-4 pt-4 border-t border-neutral-200">
      <div class="flex items-center gap-2 text-sm text-neutral-600">
        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Your data is secure</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-neutral-600">
        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>GDPR compliant</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-neutral-600">
        <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span>No spam, ever</span>
      </div>
    </div>
  </div>
</template>
