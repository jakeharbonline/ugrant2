<script setup lang="ts">
interface FaqItem {
  question: string
  answer: string
}

interface Props {
  items: FaqItem[]
}

defineProps<Props>()

const openItems = ref<Set<number>>(new Set())

function toggleItem(index: number) {
  if (openItems.value.has(index)) {
    openItems.value.delete(index)
  } else {
    openItems.value.add(index)
  }
  // Trigger reactivity
  openItems.value = new Set(openItems.value)
}

function isOpen(index: number): boolean {
  return openItems.value.has(index)
}
</script>

<template>
  <div class="divide-y divide-neutral-200 border-y border-neutral-200">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="py-4 md:py-6"
    >
      <h3>
        <button
          type="button"
          class="flex w-full items-start justify-between text-left gap-4"
          :aria-expanded="isOpen(index)"
          :aria-controls="`faq-answer-${index}`"
          @click="toggleItem(index)"
        >
          <span class="text-base md:text-lg font-semibold text-neutral-900">
            {{ item.question }}
          </span>
          <span class="flex-shrink-0 ml-4">
            <svg
              :class="[
                'w-6 h-6 text-primary-600 transition-transform duration-200',
                isOpen(index) ? 'rotate-180' : ''
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </h3>
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-96"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 max-h-96"
        leave-to-class="opacity-0 max-h-0"
      >
        <div
          v-show="isOpen(index)"
          :id="`faq-answer-${index}`"
          class="overflow-hidden"
        >
          <p class="pt-4 text-neutral-600 leading-relaxed">
            {{ item.answer }}
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>
