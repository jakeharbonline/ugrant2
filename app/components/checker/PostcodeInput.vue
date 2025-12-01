<script setup lang="ts">
import type { EpcCertificate } from '~/composables/useEpcLookup'

interface Props {
  modelValue: string
  error?: string
  helpText?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'epc-selected': [certificate: EpcCertificate]
}>()

const { lookup, loading: epcLoading, parseInsulation, mapPropertyType, mapHeatingType } = useEpcLookup()

const inputRef = ref<HTMLInputElement | null>(null)
const certificates = ref<EpcCertificate[]>([])
const showAddressSelector = ref(false)
const lookupError = ref<string | null>(null)
const hasLookedUp = ref(false)

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    // Convert to uppercase and trim
    emit('update:modelValue', value.toUpperCase().trim())
    // Reset lookup state when postcode changes
    if (hasLookedUp.value) {
      hasLookedUp.value = false
      certificates.value = []
      showAddressSelector.value = false
      lookupError.value = null
    }
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

// UK postcode validation
function isValidPostcode(postcode: string): boolean {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
  return regex.test(postcode.trim())
}

// Look up EPC data for the postcode
async function handleLookup() {
  if (!localValue.value || !isValidPostcode(localValue.value)) {
    lookupError.value = 'Please enter a valid UK postcode first'
    return
  }

  lookupError.value = null
  hasLookedUp.value = true

  const result = await lookup(localValue.value)

  if (!result.success) {
    lookupError.value = result.message || 'Failed to look up property data'
    return
  }

  if (!result.found || result.certificates.length === 0) {
    lookupError.value = 'No EPC records found for this postcode. You can still continue manually.'
    return
  }

  certificates.value = result.certificates
  showAddressSelector.value = true
}

// Handle address selection
function selectAddress(certificate: EpcCertificate) {
  showAddressSelector.value = false
  emit('epc-selected', certificate)
}

// Skip EPC lookup and continue manually
function skipLookup() {
  showAddressSelector.value = false
  hasLookedUp.value = false
  certificates.value = []
}
</script>

<template>
  <div class="w-full">
    <label
      for="postcode-input"
      class="block text-sm font-semibold text-neutral-900 mb-2"
    >
      Postcode <span class="text-red-600" aria-hidden="true">*</span>
    </label>

    <div class="flex gap-3 max-w-md">
      <div class="relative flex-1">
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

      <!-- Lookup button -->
      <button
        type="button"
        :disabled="epcLoading || !localValue"
        class="px-4 py-4 bg-primary-100 text-primary-700 font-medium rounded-xl hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        @click="handleLookup"
      >
        <svg
          v-if="epcLoading"
          class="w-5 h-5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <svg
          v-else
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="hidden sm:inline">Find address</span>
      </button>
    </div>

    <!-- Validation error message -->
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

    <!-- Lookup error message -->
    <p
      v-else-if="lookupError"
      class="mt-2 text-sm text-amber-600 flex items-center gap-1"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ lookupError }}
    </p>

    <!-- Help text -->
    <p
      v-else-if="helpText && !showAddressSelector"
      id="postcode-help"
      class="mt-2 text-sm text-neutral-500"
    >
      {{ helpText }}
    </p>

    <!-- Address selector -->
    <div
      v-if="showAddressSelector && certificates.length > 0"
      class="mt-4 border border-neutral-200 rounded-xl overflow-hidden"
    >
      <div class="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-neutral-900">
            Select your address ({{ certificates.length }} found)
          </p>
          <button
            type="button"
            class="text-sm text-neutral-500 hover:text-neutral-700"
            @click="skipLookup"
          >
            Skip
          </button>
        </div>
        <p class="text-xs text-neutral-500 mt-1">
          Selecting your address will auto-fill property details from your EPC certificate
        </p>
      </div>

      <ul class="divide-y divide-neutral-100 max-h-64 overflow-y-auto">
        <li
          v-for="cert in certificates"
          :key="cert.certificateHash"
        >
          <button
            type="button"
            class="w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors focus:outline-none focus:bg-primary-50"
            @click="selectAddress(cert)"
          >
            <p class="font-medium text-neutral-900 text-sm">
              {{ cert.address }}
            </p>
            <div class="flex items-center gap-3 mt-1 text-xs text-neutral-500">
              <span class="flex items-center gap-1">
                <span
                  :class="[
                    'inline-block w-4 h-4 rounded text-center text-[10px] font-bold leading-4',
                    cert.currentEnergyRating === 'A' ? 'bg-[#008054] text-white' :
                    cert.currentEnergyRating === 'B' ? 'bg-[#19b459] text-white' :
                    cert.currentEnergyRating === 'C' ? 'bg-[#8dce46] text-neutral-900' :
                    cert.currentEnergyRating === 'D' ? 'bg-[#ffd500] text-neutral-900' :
                    cert.currentEnergyRating === 'E' ? 'bg-[#fcaa65] text-neutral-900' :
                    cert.currentEnergyRating === 'F' ? 'bg-[#ef8023] text-white' :
                    cert.currentEnergyRating === 'G' ? 'bg-[#e9153b] text-white' :
                    'bg-neutral-400 text-white'
                  ]"
                >
                  {{ cert.currentEnergyRating }}
                </span>
                EPC {{ cert.currentEnergyRating }}
              </span>
              <span>{{ cert.propertyType }}</span>
              <span>{{ new Date(cert.lodgementDate).getFullYear() }}</span>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <!-- Auto-fill info -->
    <div
      v-if="!showAddressSelector && !hasLookedUp && !error"
      class="mt-3 p-3 bg-primary-50 rounded-lg"
    >
      <p class="text-sm text-primary-800 flex items-start gap-2">
        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          <strong>Save time:</strong> Click "Find address" to auto-fill your property details from EPC records
        </span>
      </p>
    </div>
  </div>
</template>
