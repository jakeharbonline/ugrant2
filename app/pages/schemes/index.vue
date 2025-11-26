<script setup lang="ts">
useHead({
  title: 'Energy Schemes',
})

useSeoMeta({
  description: 'Explore all UK government energy efficiency schemes including ECO4, GBIS, Warm Home Discount, Boiler Upgrade Scheme, and LA Flex. Find out which grants you qualify for.',
  ogTitle: 'UK Energy Schemes | uGrant',
  ogDescription: 'Comprehensive guide to all UK energy efficiency grants and schemes.',
})

const schemes = [
  {
    title: 'ECO4',
    description: 'The Energy Company Obligation (ECO4) is the UK\'s largest energy efficiency scheme, providing free insulation and heating upgrades to eligible households.',
    href: '/schemes/eco4',
    icon: 'home' as const,
    savings: '£10,000',
    features: [
      'Loft and cavity wall insulation',
      'Solid wall insulation',
      'Boiler repairs and replacements',
      'Heating controls and upgrades',
    ],
    featured: true,
  },
  {
    title: 'Great British Insulation Scheme (GBIS)',
    description: 'A newer scheme focused on single insulation measures for homes with poor energy ratings, available to a wider range of households.',
    href: '/schemes/gbis',
    icon: 'shield' as const,
    savings: '£4,000',
    features: [
      'Cavity wall insulation',
      'Loft insulation',
      'Room-in-roof insulation',
      'Available without claiming benefits',
    ],
  },
  {
    title: 'Warm Home Discount',
    description: 'An annual discount on electricity bills for low-income and vulnerable households to help with winter heating costs.',
    href: '/schemes/warm-home-discount',
    icon: 'bolt' as const,
    savings: '£150',
    features: [
      '£150 discount on electricity',
      'Applied directly to your bill',
      'Available each winter',
      'Automatic for some recipients',
    ],
  },
  {
    title: 'Boiler Upgrade Scheme',
    description: 'Government grants towards heat pumps and biomass boilers to help households move away from fossil fuel heating.',
    href: '/schemes/boiler-upgrade-scheme',
    icon: 'fire' as const,
    savings: '£7,500',
    features: [
      'Up to £7,500 for heat pumps',
      'Up to £5,000 for biomass boilers',
      'Replaces oil, LPG, or electric heating',
      'Available until 2028',
    ],
  },
  {
    title: 'LA Flex (Local Authority Flexibility)',
    description: 'Local councils can refer households who don\'t receive qualifying benefits but are in fuel poverty or have health conditions.',
    href: '/schemes/la-flex',
    icon: 'building' as const,
    savings: '£10,000',
    features: [
      'Income-based eligibility',
      'Health condition criteria',
      'Fuel poverty targeting',
      'Same measures as ECO4',
    ],
  },
]

const schemeComparison = [
  {
    aspect: 'Insulation',
    eco4: true,
    gbis: true,
    whd: false,
    bus: false,
    laflex: true,
  },
  {
    aspect: 'Heating Upgrades',
    eco4: true,
    gbis: false,
    whd: false,
    bus: true,
    laflex: true,
  },
  {
    aspect: 'Bill Discount',
    eco4: false,
    gbis: false,
    whd: true,
    bus: false,
    laflex: false,
  },
  {
    aspect: 'Requires Benefits',
    eco4: 'Usually',
    gbis: 'No',
    whd: 'Usually',
    bus: 'No',
    laflex: 'No',
  },
  {
    aspect: 'EPC Requirement',
    eco4: 'D-G',
    gbis: 'D-E',
    whd: 'None',
    bus: 'None',
    laflex: 'D-G',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="UK Energy Efficiency Schemes"
      subtitle="Available Grants"
      description="The UK government offers several schemes to help households reduce energy bills and improve home comfort. Find out which ones you could benefit from."
      cta-text="Check My Eligibility"
      cta-link="/eligibility"
      variant="default"
    />

    <!-- Schemes Grid -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SchemeCard
            v-for="scheme in schemes"
            :key="scheme.title"
            :title="scheme.title"
            :description="scheme.description"
            :href="scheme.href"
            :icon="scheme.icon"
            :savings="scheme.savings"
            :features="scheme.features"
            :featured="scheme.featured"
          />
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Compare Schemes at a Glance
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Not sure which scheme is right for you? Here's a quick comparison of what each offers.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl shadow-card overflow-hidden">
            <thead>
              <tr class="bg-primary-700 text-white">
                <th class="px-6 py-4 text-left font-semibold">Feature</th>
                <th class="px-4 py-4 text-center font-semibold">ECO4</th>
                <th class="px-4 py-4 text-center font-semibold">GBIS</th>
                <th class="px-4 py-4 text-center font-semibold">WHD</th>
                <th class="px-4 py-4 text-center font-semibold">BUS</th>
                <th class="px-4 py-4 text-center font-semibold">LA Flex</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200">
              <tr
                v-for="(row, index) in schemeComparison"
                :key="row.aspect"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'"
              >
                <td class="px-6 py-4 font-medium text-neutral-900">{{ row.aspect }}</td>
                <td class="px-4 py-4 text-center">
                  <span v-if="row.eco4 === true" class="text-primary-600">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Yes">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="row.eco4 === false" class="text-neutral-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="No">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span v-else class="text-sm text-neutral-600">{{ row.eco4 }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span v-if="row.gbis === true" class="text-primary-600">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Yes">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="row.gbis === false" class="text-neutral-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="No">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span v-else class="text-sm text-neutral-600">{{ row.gbis }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span v-if="row.whd === true" class="text-primary-600">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Yes">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="row.whd === false" class="text-neutral-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="No">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span v-else class="text-sm text-neutral-600">{{ row.whd }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span v-if="row.bus === true" class="text-primary-600">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Yes">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="row.bus === false" class="text-neutral-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="No">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span v-else class="text-sm text-neutral-600">{{ row.bus }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span v-if="row.laflex === true" class="text-primary-600">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Yes">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span v-else-if="row.laflex === false" class="text-neutral-400">
                    <svg class="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="No">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span v-else class="text-sm text-neutral-600">{{ row.laflex }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-sm text-neutral-500 mt-4 text-center">
          WHD = Warm Home Discount, BUS = Boiler Upgrade Scheme
        </p>
      </div>
    </section>

    <!-- Not Sure Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="bg-primary-50 rounded-3xl p-8 md:p-12 lg:p-16">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Not Sure Which Scheme You Qualify For?
              </h2>
              <p class="text-lg text-neutral-600 mb-6">
                Don't worry - our eligibility checker does the hard work for you. Simply answer a few questions about your property and circumstances, and we'll instantly show you all the schemes you could benefit from.
              </p>
              <ul class="space-y-3 text-neutral-700 mb-8">
                <li class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Takes less than 2 minutes
                </li>
                <li class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Checks all schemes at once
                </li>
                <li class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  No obligation to proceed
                </li>
              </ul>
            </div>
            <div class="text-center lg:text-right">
              <NuxtLink
                to="/eligibility"
                class="inline-flex items-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-lg text-lg"
              >
                Check My Eligibility
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
