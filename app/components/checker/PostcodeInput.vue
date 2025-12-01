<script setup lang="ts">
import type { EpcCertificate } from '~/composables/useEpcLookup'

interface Props {
  modelValue: string
  houseNumber?: string
  error?: string
  helpText?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:houseNumber': [value: string]
  'epc-selected': [certificate: EpcCertificate]
}>()

const { lookup, loading: epcLoading } = useEpcLookup()

const houseNumberRef = ref<HTMLInputElement | null>(null)
const certificates = ref<EpcCertificate[]>([])
const showAddressSelector = ref(false)
const lookupError = ref<string | null>(null)
const lookupStatus = ref<'idle' | 'loading' | 'success' | 'not-found' | 'error'>('idle')
const matchedCertificate = ref<EpcCertificate | null>(null)

const localHouseNumber = computed({
  get: () => props.houseNumber || '',
  set: (value: string) => {
    emit('update:houseNumber', value.trim())
    resetLookup()
  },
})

const localPostcode = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    emit('update:modelValue', value.toUpperCase().trim())
    resetLookup()
  },
})

function resetLookup() {
  if (lookupStatus.value !== 'idle') {
    lookupStatus.value = 'idle'
    certificates.value = []
    showAddressSelector.value = false
    lookupError.value = null
    matchedCertificate.value = null
  }
}

// Focus house number input on mount
onMounted(() => {
  nextTick(() => {
    houseNumberRef.value?.focus()
  })
})

// Format postcode with space
function formatPostcode(value: string): string {
  const cleaned = value.replace(/\s/g, '').toUpperCase()
  if (cleaned.length > 3) {
    return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`
  }
  return cleaned
}

function handlePostcodeBlur() {
  if (localPostcode.value) {
    localPostcode.value = formatPostcode(localPostcode.value)
  }
}

// UK postcode validation
function isValidPostcode(postcode: string): boolean {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
  return regex.test(postcode.trim())
}

// Check if we can lookup (both fields filled)
const canLookup = computed(() => {
  return localHouseNumber.value.trim() && isValidPostcode(localPostcode.value)
})

// Try to find exact match by house number
function findBestMatch(certs: EpcCertificate[], houseNum: string): EpcCertificate | null {
  const searchTerm = houseNum.toLowerCase().trim()

  // Try exact match at start of address
  for (const cert of certs) {
    const address = cert.address.toLowerCase()
    // Check if address starts with the house number
    if (address.startsWith(searchTerm + ' ') ||
        address.startsWith(searchTerm + ',') ||
        address.startsWith('flat ' + searchTerm) ||
        address.startsWith(searchTerm + '/')) {
      return cert
    }
  }

  // Try contains match
  for (const cert of certs) {
    const address = cert.address.toLowerCase()
    const parts = address.split(/[\s,]+/)
    if (parts.includes(searchTerm)) {
      return cert
    }
  }

  return null
}

// Look up EPC data
async function handleLookup() {
  if (!canLookup.value) {
    if (!localHouseNumber.value.trim()) {
      lookupError.value = 'Please enter your house number or name'
    } else {
      lookupError.value = 'Please enter a valid UK postcode'
    }
    return
  }

  lookupError.value = null
  lookupStatus.value = 'loading'
  matchedCertificate.value = null

  const result = await lookup(localPostcode.value)

  if (!result.success) {
    lookupStatus.value = 'error'
    lookupError.value = result.message || 'Failed to look up property data'
    return
  }

  if (!result.found || result.certificates.length === 0) {
    lookupStatus.value = 'not-found'
    lookupError.value = 'No EPC records found. You can still continue manually.'
    return
  }

  certificates.value = result.certificates

  // Try to find exact match
  const match = findBestMatch(result.certificates, localHouseNumber.value)

  if (match) {
    // Found exact match - auto-select it
    lookupStatus.value = 'success'
    matchedCertificate.value = match
    emit('epc-selected', match)
  } else if (result.certificates.length === 1 && result.certificates[0]) {
    // Only one result - use it
    const cert = result.certificates[0]
    lookupStatus.value = 'success'
    matchedCertificate.value = cert
    emit('epc-selected', cert)
  } else {
    // Multiple results, no exact match - show selector
    lookupStatus.value = 'success'
    showAddressSelector.value = true
  }
}

// Handle address selection from list
function selectAddress(certificate: EpcCertificate) {
  showAddressSelector.value = false
  matchedCertificate.value = certificate
  emit('epc-selected', certificate)
}

// Clear selection and try again
function clearSelection() {
  matchedCertificate.value = null
  lookupStatus.value = 'idle'
  showAddressSelector.value = false
}
</script>

<template>
  <div class="w-full">
    <!-- Two-field input: House number + Postcode -->
    <div class="grid grid-cols-[1fr,1.5fr] gap-3 max-w-md">
      <!-- House Number -->
      <div>
        <label
          for="house-number-input"
          class="block text-sm font-semibold text-neutral-900 mb-2"
        >
          House No./Name <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="house-number-input"
          ref="houseNumberRef"
          v-model="localHouseNumber"
          type="text"
          inputmode="text"
          placeholder="e.g., 42 or Flat 3"
          :class="[
            'w-full px-4 py-4 text-lg font-medium border rounded-xl transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
          ]"
        />
      </div>

      <!-- Postcode -->
      <div>
        <label
          for="postcode-input"
          class="block text-sm font-semibold text-neutral-900 mb-2"
        >
          Postcode <span class="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="postcode-input"
          v-model="localPostcode"
          type="text"
          inputmode="text"
          autocomplete="postal-code"
          placeholder="e.g., SW1A 1AA"
          maxlength="10"
          :aria-invalid="!!error"
          :class="[
            'w-full px-4 py-4 text-lg font-medium uppercase tracking-wider border rounded-xl transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
          ]"
          @blur="handlePostcodeBlur"
        />
      </div>
    </div>

    <!-- Lookup button -->
    <button
      type="button"
      :disabled="epcLoading || !canLookup"
      class="mt-4 w-full max-w-md px-6 py-3 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
      {{ epcLoading ? 'Looking up...' : 'Find my property' }}
    </button>

    <!-- Validation error -->
    <p
      v-if="error"
      class="mt-3 text-sm text-red-600 flex items-center gap-1"
      role="alert"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ error }}
    </p>

    <!-- Lookup error -->
    <p
      v-else-if="lookupError"
      class="mt-3 text-sm text-amber-600 flex items-center gap-1"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ lookupError }}
    </p>

    <!-- Success: Property found and matched -->
    <div
      v-if="matchedCertificate && !showAddressSelector"
      class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="font-medium text-green-900 text-sm">Property found</p>
            <p class="text-sm text-green-800 mt-1">{{ matchedCertificate.address }}</p>
            <div class="flex items-center gap-3 mt-2 text-xs text-green-700">
              <span class="flex items-center gap-1">
                <span
                  :class="[
                    'inline-block w-5 h-5 rounded text-center text-xs font-bold leading-5',
                    matchedCertificate.currentEnergyRating === 'A' ? 'bg-[#008054] text-white' :
                    matchedCertificate.currentEnergyRating === 'B' ? 'bg-[#19b459] text-white' :
                    matchedCertificate.currentEnergyRating === 'C' ? 'bg-[#8dce46] text-neutral-900' :
                    matchedCertificate.currentEnergyRating === 'D' ? 'bg-[#ffd500] text-neutral-900' :
                    matchedCertificate.currentEnergyRating === 'E' ? 'bg-[#fcaa65] text-neutral-900' :
                    matchedCertificate.currentEnergyRating === 'F' ? 'bg-[#ef8023] text-white' :
                    matchedCertificate.currentEnergyRating === 'G' ? 'bg-[#e9153b] text-white' :
                    'bg-neutral-400 text-white'
                  ]"
                >
                  {{ matchedCertificate.currentEnergyRating }}
                </span>
                EPC Rating
              </span>
              <span>{{ matchedCertificate.propertyType }}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="text-sm text-green-700 hover:text-green-800 underline"
          @click="clearSelection"
        >
          Change
        </button>
      </div>
    </div>

    <!-- Address selector (when multiple matches) -->
    <div
      v-if="showAddressSelector && certificates.length > 0"
      class="mt-4 border border-neutral-200 rounded-xl overflow-hidden"
    >
      <div class="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
        <p class="text-sm font-medium text-neutral-900">
          Select your property ({{ certificates.length }} found)
        </p>
        <p class="text-xs text-neutral-500 mt-1">
          We found multiple properties - please select yours
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

    <!-- Info text when idle -->
    <p
      v-if="lookupStatus === 'idle' && !error"
      class="mt-3 text-sm text-neutral-500"
    >
      Enter your house number and postcode to auto-fill property details from your EPC certificate
    </p>
  </div>
</template>
