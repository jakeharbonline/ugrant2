<script setup lang="ts">
import type { StepOption } from '~/utils/checkerSteps'

interface Props {
  modelValue: string[]
  options: StepOption[]
  name: string
  error?: string
  /** Help text displayed below the options */
  helpText?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

function toggleOption(value: string) {
  const currentValues = [...props.modelValue]

  // Special handling for "none" option
  if (value === 'none') {
    // If selecting "none", clear all other selections
    if (!currentValues.includes('none')) {
      emit('update:modelValue', ['none'])
    } else {
      emit('update:modelValue', [])
    }
    return
  }

  // If selecting any other option, remove "none" from selection
  const filteredValues = currentValues.filter((v) => v !== 'none')

  if (filteredValues.includes(value)) {
    // Remove the value
    emit('update:modelValue', filteredValues.filter((v) => v !== value))
  } else {
    // Add the value
    emit('update:modelValue', [...filteredValues, value])
  }
}

function isChecked(value: string): boolean {
  return props.modelValue.includes(value)
}
</script>

<template>
  <fieldset>
    <legend class="sr-only">Select all that apply</legend>

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

    <div class="grid gap-3">
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          'relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
          'hover:border-primary-300 hover:bg-primary-50/50',
          'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          isChecked(option.value)
            ? 'border-primary-600 bg-primary-50'
            : 'border-neutral-200 bg-white'
        ]"
      >
        <input
          type="checkbox"
          :name="name"
          :value="option.value"
          :checked="isChecked(option.value)"
          class="mt-0.5 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
          @change="toggleOption(option.value)"
        />
        <div class="flex-1">
          <span
            :class="[
              'block font-medium',
              isChecked(option.value) ? 'text-primary-900' : 'text-neutral-900'
            ]"
          >
            {{ option.label }}
          </span>
          <span
            v-if="option.description"
            class="block mt-1 text-sm text-neutral-500"
          >
            {{ option.description }}
          </span>
        </div>

        <!-- Check indicator -->
        <div
          :class="[
            'absolute top-4 right-4 w-6 h-6 rounded flex items-center justify-center transition-all',
            isChecked(option.value)
              ? 'bg-primary-600'
              : 'bg-neutral-200'
          ]"
        >
          <svg
            :class="[
              'w-4 h-4 transition-opacity',
              isChecked(option.value) ? 'text-white opacity-100' : 'text-neutral-400 opacity-0'
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
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
  </fieldset>
</template>
