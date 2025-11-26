<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  schemes: [
    { name: 'ECO4', href: '/schemes/eco4' },
    { name: 'GBIS', href: '/schemes/gbis' },
    { name: 'Warm Home Discount', href: '/schemes/warm-home-discount' },
    { name: 'Boiler Upgrade Scheme', href: '/schemes/boiler-upgrade-scheme' },
    { name: 'LA Flex', href: '/schemes/la-flex' },
  ],
  company: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'For Installers', href: '/for-installers' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
}
</script>

<template>
  <footer class="bg-neutral-900 text-white" role="contentinfo">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2 mb-4" aria-label="uGrant - Home">
            <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
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
            <span class="text-xl font-bold">uGrant</span>
          </NuxtLink>
          <p class="text-neutral-400 text-sm leading-relaxed mb-6">
            Helping UK households discover their eligibility for energy efficiency grants and connect with trusted installers.
          </p>
          <NuxtLink
            to="/eligibility"
            class="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Check Your Eligibility
          </NuxtLink>
        </div>

        <!-- Schemes Links -->
        <nav aria-label="Energy Schemes">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Energy Schemes
          </h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.schemes" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-neutral-300 hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Company Links -->
        <nav aria-label="Company">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Company
          </h3>
          <ul class="space-y-3">
            <li v-for="link in footerLinks.company" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-neutral-300 hover:text-white transition-colors"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Legal & Contact -->
        <div>
          <nav aria-label="Legal">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Legal
            </h3>
            <ul class="space-y-3 mb-8">
              <li v-for="link in footerLinks.legal" :key="link.name">
                <NuxtLink
                  :to="link.href"
                  class="text-neutral-300 hover:text-white transition-colors"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Contact
            </h3>
            <address class="not-italic text-neutral-300 text-sm space-y-2">
              <p>
                <a href="mailto:hello@ugrant.co.uk" class="hover:text-white transition-colors">
                  hello@ugrant.co.uk
                </a>
              </p>
              <p>
                <a href="tel:08001234567" class="hover:text-white transition-colors">
                  0800 123 4567
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-neutral-800">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-neutral-400 text-sm">
            &copy; {{ currentYear }} uGrant. All rights reserved.
          </p>
          <p class="text-neutral-500 text-xs">
            uGrant is not affiliated with any government body. We help connect eligible households with approved installers.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
