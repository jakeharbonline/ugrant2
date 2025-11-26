<script setup lang="ts">
useHead({
  title: 'Great British Insulation Scheme (GBIS)',
})

useSeoMeta({
  description: 'The Great British Insulation Scheme offers free cavity wall and loft insulation to homes with poor energy ratings. No benefits required. Check your eligibility today.',
  ogTitle: 'Great British Insulation Scheme | uGrant',
  ogDescription: 'Get free insulation worth up to £4,000 through GBIS - no benefits required.',
})

const eligibilityCriteria = [
  {
    title: 'General Group (No Benefits Required)',
    description: 'Your property has an EPC rating of D or E, you pay your own energy bills, and you live in Council Tax bands A-D (England) or A-E (Scotland/Wales).',
    icon: 'home' as const,
  },
  {
    title: 'Low Income Group',
    description: 'You receive qualifying benefits and have an EPC rating of D-G. Similar eligibility to ECO4 but focused specifically on insulation.',
    icon: 'check' as const,
  },
  {
    title: 'Property Requirements',
    description: 'Your home must be suitable for the insulation type. Properties must have unfilled cavity walls or insufficient loft insulation.',
    icon: 'document' as const,
  },
]

const availableMeasures = [
  {
    title: 'Cavity Wall Insulation',
    description: 'Insulation injected into the gap between your external walls. Quick to install with minimal disruption.',
    savings: 'Save up to £295/year',
  },
  {
    title: 'Loft Insulation',
    description: 'Up to 300mm of insulation laid in your loft space to reduce heat loss through the roof.',
    savings: 'Save up to £220/year',
  },
  {
    title: 'Room-in-Roof Insulation',
    description: 'Insulation for loft spaces that have been converted into living areas or bedrooms.',
    savings: 'Save up to £330/year',
  },
  {
    title: 'Flat Roof Insulation',
    description: 'Insulation for properties with flat roof extensions or flat-roofed buildings.',
    savings: 'Save up to £200/year',
  },
]

const faqs = [
  {
    question: 'What is the Great British Insulation Scheme?',
    answer: 'GBIS is a government scheme launched in 2023 to help households with poor energy efficiency get free or discounted insulation. Unlike ECO4, it\'s available to a wider range of households, including those who don\'t receive benefits but live in energy-inefficient properties.',
  },
  {
    question: 'How is GBIS different from ECO4?',
    answer: 'GBIS focuses specifically on single insulation measures and is available to middle-income households who don\'t receive benefits but have poorly insulated homes. ECO4 offers a wider range of measures but typically requires benefit receipt or local authority referral.',
  },
  {
    question: 'Do I need to receive benefits to qualify?',
    answer: 'No, that\'s the key difference with GBIS. If your property has an EPC rating of D or E and you\'re in a lower Council Tax band, you can qualify without receiving any benefits. This "General Group" route opens up free insulation to millions more households.',
  },
  {
    question: 'Can I get GBIS if I already have some insulation?',
    answer: 'It depends on the type and amount. For loft insulation, you may qualify if you have less than 100mm currently installed. For cavity wall insulation, the cavities must be unfilled. A survey will confirm whether your property is suitable.',
  },
  {
    question: 'Is GBIS really free?',
    answer: 'For eligible households in the Low Income Group, it\'s completely free. For the General Group, it\'s also typically free, though there may be a small contribution required in some cases. We\'ll confirm the exact costs (if any) during the eligibility check.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Great British Insulation Scheme"
      subtitle="Free Insulation"
      description="Free cavity wall and loft insulation for homes with poor energy ratings. Unlike other schemes, GBIS doesn't require you to be receiving benefits."
      cta-text="Check If I Qualify"
      cta-link="/eligibility"
      variant="green"
    />

    <!-- Key Info -->
    <section class="py-8 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-700">£4,000</p>
            <p class="text-sm text-neutral-600">Maximum value</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">No</p>
            <p class="text-sm text-neutral-600">Benefits required</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">D-E</p>
            <p class="text-sm text-neutral-600">EPC rating</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">4</p>
            <p class="text-sm text-neutral-600">Insulation types</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is GBIS -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What is the Great British Insulation Scheme?
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                The Great British Insulation Scheme (GBIS) is a government initiative launched in 2023 to help households improve their home insulation. It's designed to complement ECO4 by reaching households who might not qualify under traditional benefit-based criteria.
              </p>
              <p>
                GBIS is unique because it opens up free insulation to the "General Group" - homeowners and tenants who don't receive benefits but live in energy-inefficient properties. If your home has an EPC rating of D or E and you're in a lower Council Tax band, you could qualify.
              </p>
              <p>
                The scheme focuses on single insulation measures that can be installed quickly with minimal disruption, making homes warmer and reducing energy bills without major renovation work.
              </p>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">Key Benefits of GBIS</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">No benefits required for General Group eligibility</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Quick installation - often completed in a single day</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Immediate impact on energy bills and home comfort</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Minimal disruption to your daily life</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Eligibility -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Who Can Get GBIS?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            GBIS has two eligibility routes - the General Group for middle-income households, and the Low Income Group for those receiving benefits.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="criteria in eligibilityCriteria"
            :key="criteria.title"
            class="bg-white rounded-2xl p-6 md:p-8 shadow-card"
          >
            <FeatureCard
              :title="criteria.title"
              :description="criteria.description"
              :icon="criteria.icon"
            />
          </div>
        </div>

        <div class="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Council Tax Bands by Region</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <p class="font-medium text-neutral-900">England</p>
              <p class="text-neutral-600 text-sm">Bands A, B, C, or D</p>
            </div>
            <div>
              <p class="font-medium text-neutral-900">Scotland</p>
              <p class="text-neutral-600 text-sm">Bands A, B, C, D, or E</p>
            </div>
            <div>
              <p class="font-medium text-neutral-900">Wales</p>
              <p class="text-neutral-600 text-sm">Bands A, B, C, D, or E</p>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink
            to="/eligibility"
            class="inline-flex items-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
          >
            Check My Eligibility
            <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Available Measures -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Insulation Measures Available
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            GBIS provides funding for single insulation measures. The right measure for you depends on your property type and current insulation.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="measure in availableMeasures"
            :key="measure.title"
            class="bg-neutral-50 rounded-2xl p-6 md:p-8"
          >
            <h3 class="text-xl font-semibold text-neutral-900 mb-3">{{ measure.title }}</h3>
            <p class="text-neutral-600 mb-4">{{ measure.description }}</p>
            <div class="inline-flex items-center gap-2 bg-accent-100 text-accent-800 text-sm font-semibold px-3 py-1.5 rounded-full">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ measure.savings }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            GBIS Frequently Asked Questions
          </h2>
        </div>

        <div class="max-w-3xl mx-auto">
          <FaqAccordion :items="faqs" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Could You Qualify for Free Insulation?
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          GBIS makes free insulation available to millions more UK households. Check your eligibility in under 2 minutes.
        </p>
        <NuxtLink
          to="/eligibility"
          class="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg text-lg"
        >
          Check My Eligibility
          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
