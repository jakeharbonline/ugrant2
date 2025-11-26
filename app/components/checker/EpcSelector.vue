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

interface EpcBand {
  rating: string
  label: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  description: string
}

const epcBands: EpcBand[] = [
  {
    rating: 'A',
    label: 'A (92+)',
    color: '#008054',
    bgColor: 'bg-[#008054]',
    borderColor: 'border-[#008054]',
    textColor: 'text-white',
    description: 'Very efficient',
  },
  {
    rating: 'B',
    label: 'B (81-91)',
    color: '#19b459',
    bgColor: 'bg-[#19b459]',
    borderColor: 'border-[#19b459]',
    textColor: 'text-white',
    description: 'Efficient',
  },
  {
    rating: 'C',
    label: 'C (69-80)',
    color: '#8dce46',
    bgColor: 'bg-[#8dce46]',
    borderColor: 'border-[#8dce46]',
    textColor: 'text-neutral-900',
    description: 'Fairly efficient',
  },
  {
    rating: 'D',
    label: 'D (55-68)',
    color: '#ffd500',
    bgColor: 'bg-[#ffd500]',
    borderColor: 'border-[#ffd500]',
    textColor: 'text-neutral-900',
    description: 'Average',
  },
  {
    rating: 'E',
    label: 'E (39-54)',
    color: '#fcaa65',
    bgColor: 'bg-[#fcaa65]',
    borderColor: 'border-[#fcaa65]',
    textColor: 'text-neutral-900',
    description: 'Below average',
  },
  {
    rating: 'F',
    label: 'F (21-38)',
    color: '#ef8023',
    bgColor: 'bg-[#ef8023]',
    borderColor: 'border-[#ef8023]',
    textColor: 'text-white',
    description: 'Poor',
  },
  {
    rating: 'G',
    label: 'G (1-20)',
    color: '#e9153b',
    bgColor: 'bg-[#e9153b]',
    borderColor: 'border-[#e9153b]',
    textColor: 'text-white',
    description: 'Very poor',
  },
  {
    rating: 'unknown',
    label: "Don't know",
    color: '#737373',
    bgColor: 'bg-neutral-500',
    borderColor: 'border-neutral-500',
    textColor: 'text-white',
    description: "We'll estimate based on your property",
  },
]

function selectRating(rating: string) {
  emit('update:modelValue', rating)
}

function isSelected(rating: string): boolean {
  return props.modelValue === rating
}
</script>

<template>
  <fieldset>
    <legend class="sr-only">Select your EPC rating</legend>

    <!-- Error message -->
    <p
      v-if="error"
      class="mb-4 text-sm text-red-600 flex items-center gap-1"
      role="alert"
    >
      <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ error }}
    </p>

    <!-- EPC Rating Visual Scale -->
    <div class="space-y-2" role="radiogroup">
      <label
        v-for="band in epcBands"
        :key="band.rating"
        :class="[
          'group relative flex items-stretch cursor-pointer transition-all rounded-lg overflow-hidden',
          'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500',
          isSelected(band.rating) ? 'ring-2 ring-primary-600 ring-offset-2' : ''
        ]"
      >
        <input
          type="radio"
          name="epc-rating"
          :value="band.rating"
          :checked="isSelected(band.rating)"
          class="sr-only"
          @change="selectRating(band.rating)"
        />

        <!-- Color band indicator -->
        <div
          :class="[
            'w-16 sm:w-20 flex items-center justify-center font-bold text-lg sm:text-xl py-3',
            band.bgColor,
            band.textColor
          ]"
        >
          {{ band.rating === 'unknown' ? '?' : band.rating }}
        </div>

        <!-- Label and description -->
        <div
          :class="[
            'flex-1 flex items-center justify-between px-4 py-3 border-2 border-l-0 transition-colors',
            isSelected(band.rating)
              ? `${band.borderColor} bg-opacity-10`
              : 'border-neutral-200 group-hover:border-neutral-300'
          ]"
          :style="isSelected(band.rating) ? { backgroundColor: `${band.color}15` } : {}"
        >
          <div>
            <span class="font-medium text-neutral-900">{{ band.label }}</span>
            <span class="hidden sm:inline text-sm text-neutral-500 ml-2">
              - {{ band.description }}
            </span>
          </div>

          <!-- Selected indicator -->
          <div
            v-if="isSelected(band.rating)"
            :class="[
              'w-6 h-6 rounded-full flex items-center justify-center',
              band.bgColor
            ]"
          >
            <svg :class="['w-4 h-4', band.textColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </label>
    </div>

    <!-- Help text -->
    <p
      v-if="helpText"
      class="mt-4 text-sm text-neutral-500"
    >
      {{ helpText }}
    </p>

    <!-- Link to check EPC -->
    <a
      href="https://www.gov.uk/find-energy-certificate"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1 mt-3 text-sm text-primary-700 hover:text-primary-800 hover:underline"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      Find your EPC certificate on GOV.UK
    </a>
  </fieldset>
</template>
