<script setup lang="ts">
import type { StepOption } from '~/utils/checkerSteps'

interface Props {
  modelValue: string
  options: StepOption[]
  name: string
  error?: string
  /** Use card-style layout instead of compact list */
  cardStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cardStyle: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function selectOption(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <fieldset>
    <legend class="sr-only">Select an option</legend>

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

    <!-- Card-style options -->
    <div
      v-if="cardStyle"
      class="grid gap-3"
      role="radiogroup"
    >
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          'relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
          'hover:border-primary-300 hover:bg-primary-50/50',
          'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          modelValue === option.value
            ? 'border-primary-600 bg-primary-50'
            : 'border-neutral-200 bg-white'
        ]"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          class="mt-1 w-5 h-5 text-primary-600 border-neutral-300 focus:ring-primary-500"
          @change="selectOption(option.value)"
        />
        <div class="flex-1">
          <span
            :class="[
              'block font-medium',
              modelValue === option.value ? 'text-primary-900' : 'text-neutral-900'
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

        <!-- Check icon for selected -->
        <div
          v-if="modelValue === option.value"
          class="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
        >
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
    </div>

    <!-- Compact list style (for many options) -->
    <div
      v-else
      class="space-y-2"
      role="radiogroup"
    >
      <label
        v-for="option in options"
        :key="option.value"
        :class="[
          'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors',
          'hover:bg-neutral-50',
          modelValue === option.value ? 'bg-primary-50' : ''
        ]"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          class="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
          @change="selectOption(option.value)"
        />
        <span
          :class="[
            'text-sm',
            modelValue === option.value ? 'text-primary-900 font-medium' : 'text-neutral-700'
          ]"
        >
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
