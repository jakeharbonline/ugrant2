<script setup lang="ts">
interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const form = reactive<FormData>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // This would integrate with an MCP tool or API endpoint
    // For now, simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    isSubmitted.value = true
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
  } catch {
    errorMessage.value = 'There was an error submitting your message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const subjectOptions = [
  'General Enquiry',
  'Eligibility Question',
  'Installer Partnership',
  'Technical Support',
  'Complaint',
  'Other',
]
</script>

<template>
  <form
    class="space-y-6"
    @submit.prevent="handleSubmit"
  >
    <!-- Success Message -->
    <div
      v-if="isSubmitted"
      class="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center"
      role="alert"
    >
      <svg
        class="w-12 h-12 text-primary-600 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-lg font-semibold text-primary-800 mb-2">Message Sent!</h3>
      <p class="text-primary-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
      <button
        type="button"
        class="mt-4 text-primary-700 font-semibold hover:text-primary-800"
        @click="isSubmitted = false"
      >
        Send another message
      </button>
    </div>

    <template v-else>
      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700"
        role="alert"
      >
        {{ errorMessage }}
      </div>

      <!-- Name -->
      <div>
        <label for="contact-name" class="block text-sm font-semibold text-neutral-900 mb-2">
          Full Name <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          required
          autocomplete="name"
          class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="John Smith"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="contact-email" class="block text-sm font-semibold text-neutral-900 mb-2">
          Email Address <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="john@example.com"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="contact-phone" class="block text-sm font-semibold text-neutral-900 mb-2">
          Phone Number
        </label>
        <input
          id="contact-phone"
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="07123 456789"
        />
      </div>

      <!-- Subject -->
      <div>
        <label for="contact-subject" class="block text-sm font-semibold text-neutral-900 mb-2">
          Subject <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <select
          id="contact-subject"
          v-model="form.subject"
          required
          class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
        >
          <option value="" disabled>Select a subject</option>
          <option v-for="option in subjectOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <!-- Message -->
      <div>
        <label for="contact-message" class="block text-sm font-semibold text-neutral-900 mb-2">
          Message <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="5"
          class="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-y"
          placeholder="How can we help you?"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-6 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
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
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>

      <p class="text-sm text-neutral-500 text-center">
        By submitting this form, you agree to our
        <NuxtLink to="/privacy" class="text-primary-700 hover:underline">Privacy Policy</NuxtLink>.
      </p>
    </template>
  </form>
</template>
