<script setup lang="ts">
interface Props {
  modelValue: string
  error?: string
  helpText?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    // Convert to uppercase and trim
    emit('update:modelValue', value.toUpperCase().trim())
  },
})

// Focus input on mount
onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus()
  })
})

// Format postcode with space (if valid length)
function formatPostcode(value: string): string {
  const cleaned = value.replace(/\s/g, '').toUpperCase()
  if (cleaned.length > 3) {
    // Insert space before last 3 characters
    return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`
  }
  return cleaned
}

function handleBlur() {
  if (localValue.value) {
    localValue.value = formatPostcode(localValue.value)
  }
}
</script>

<template>
  <div class="w-full max-w-sm">
    <label
      for="postcode-input"
      class="block text-sm font-semibold text-neutral-900 mb-2"
    >
      Postcode <span class="text-red-600" aria-hidden="true">*</span>
    </label>

    <div class="relative">
      <!-- Location icon -->
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          class="w-5 h-5 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <input
        id="postcode-input"
        ref="inputRef"
        v-model="localValue"
        type="text"
        inputmode="text"
        autocomplete="postal-code"
        placeholder="e.g., SW1A 1AA"
        maxlength="10"
        :aria-invalid="!!error"
        :aria-describedby="error ? 'postcode-error' : helpText ? 'postcode-help' : undefined"
        :class="[
          'w-full pl-12 pr-4 py-4 text-lg font-medium uppercase tracking-wider border rounded-xl transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
        ]"
        @blur="handleBlur"
      />
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      id="postcode-error"
      class="mt-2 text-sm text-red-600 flex items-center gap-1"
      role="alert"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ error }}
    </p>

    <!-- Help text -->
    <p
      v-else-if="helpText"
      id="postcode-help"
      class="mt-2 text-sm text-neutral-500"
    >
      {{ helpText }}
    </p>
  </div>
</template>
