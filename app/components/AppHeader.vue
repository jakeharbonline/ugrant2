<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Schemes', href: '/schemes' },
  { name: 'FAQ', href: '/faq' },
  { name: 'For Installers', href: '/for-installers' },
  { name: 'Contact', href: '/contact' },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="bg-white border-b border-neutral-200 sticky top-0 z-50">
    <nav
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-label="Main navigation"
    >
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center gap-2"
            aria-label="uGrant - Home"
          >
            <div class="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-primary-700">uGrant</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex lg:items-center lg:gap-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-4 py-2 text-base font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
            active-class="text-primary-700 bg-primary-50"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- CTA Button (Desktop) -->
        <div class="hidden lg:block">
          <NuxtLink
            to="/checker"
            class="inline-flex items-center px-5 py-2.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Check Eligibility
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-700 hover:text-primary-700 hover:bg-primary-50 transition-colors"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMobileMenu"
        >
          <span class="sr-only">{{ isMobileMenuOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg
            v-if="!isMobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          id="mobile-menu"
          class="lg:hidden py-4 border-t border-neutral-200"
        >
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              active-class="text-primary-700 bg-primary-50"
              @click="closeMobileMenu"
            >
              {{ item.name }}
            </NuxtLink>
            <NuxtLink
              to="/checker"
              class="mt-2 mx-4 text-center py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors"
              @click="closeMobileMenu"
            >
              Check Eligibility
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  </header>
</template>
