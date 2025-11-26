<script setup lang="ts">
interface Props {
  wantsContact: boolean
  email: string
  phone: string
  emailError?: string
  phoneError?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:wantsContact': [value: boolean]
  'update:email': [value: string]
  'update:phone': [value: string]
}>()

const localWantsContact = computed({
  get: () => props.wantsContact,
  set: (value: boolean) => emit('update:wantsContact', value),
})

const localEmail = computed({
  get: () => props.email,
  set: (value: string) => emit('update:email', value),
})

const localPhone = computed({
  get: () => props.phone,
  set: (value: string) => emit('update:phone', value),
})

const emailInputRef = ref<HTMLInputElement | null>(null)

// Focus email input when contact is enabled
watch(localWantsContact, (value) => {
  if (value) {
    nextTick(() => {
      emailInputRef.value?.focus()
    })
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Opt-in checkbox -->
    <label class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary-300"
      :class="[
        localWantsContact
          ? 'border-primary-600 bg-primary-50'
          : 'border-neutral-200 bg-white'
      ]"
    >
      <input
        v-model="localWantsContact"
        type="checkbox"
        class="mt-1 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
      />
      <div>
        <span class="block font-medium text-neutral-900">
          Yes, connect me with accredited installers
        </span>
        <span class="block mt-1 text-sm text-neutral-500">
          We'll share your details with trusted, vetted installers in your area who can help with your installation.
        </span>
      </div>
    </label>

    <!-- Contact fields (shown when opted in) -->
    <div
      v-if="localWantsContact"
      class="space-y-4 p-6 bg-neutral-50 rounded-xl"
    >
      <p class="text-sm text-neutral-600 mb-4">
        Please provide your contact details so installers can reach you.
      </p>

      <!-- Email -->
      <div>
        <label
          for="contact-email"
          class="block text-sm font-semibold text-neutral-900 mb-2"
        >
          Email Address <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          ref="emailInputRef"
          v-model="localEmail"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required
          :aria-invalid="!!emailError"
          :aria-describedby="emailError ? 'email-error' : undefined"
          :class="[
            'w-full px-4 py-3 border rounded-xl transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            emailError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
          ]"
        />
        <p
          v-if="emailError"
          id="email-error"
          class="mt-2 text-sm text-red-600 flex items-center gap-1"
          role="alert"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ emailError }}
        </p>
      </div>

      <!-- Phone -->
      <div>
        <label
          for="contact-phone"
          class="block text-sm font-semibold text-neutral-900 mb-2"
        >
          Phone Number <span class="text-neutral-400 font-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          v-model="localPhone"
          type="tel"
          autocomplete="tel"
          placeholder="07123 456789"
          :aria-invalid="!!phoneError"
          :aria-describedby="phoneError ? 'phone-error' : 'phone-help'"
          :class="[
            'w-full px-4 py-3 border rounded-xl transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            phoneError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
          ]"
        />
        <p
          v-if="phoneError"
          id="phone-error"
          class="mt-2 text-sm text-red-600 flex items-center gap-1"
          role="alert"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ phoneError }}
        </p>
        <p
          v-else
          id="phone-help"
          class="mt-2 text-sm text-neutral-500"
        >
          Add your phone number if you'd prefer a call
        </p>
      </div>

      <!-- Privacy note -->
      <p class="text-xs text-neutral-500 pt-2 border-t border-neutral-200">
        Your contact details will only be shared with installers if you are eligible for a scheme. See our
        <NuxtLink to="/privacy" class="text-primary-700 hover:underline">Privacy Policy</NuxtLink>
        for more information.
      </p>
    </div>

    <!-- No contact selected info -->
    <div
      v-else
      class="p-4 bg-neutral-50 rounded-xl text-sm text-neutral-600"
    >
      <p class="flex items-start gap-2">
        <svg class="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          You can still see your eligibility results without providing contact details. However, you won't be connected with installers automatically.
        </span>
      </p>
    </div>
  </div>
</template>
