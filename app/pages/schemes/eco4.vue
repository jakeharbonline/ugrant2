<script setup lang="ts">
useHead({
  title: 'ECO4 Scheme - Free Insulation & Heating Upgrades',
})

useSeoMeta({
  description: 'ECO4 provides free insulation and heating upgrades for eligible UK households. Learn about eligibility criteria, available measures, and how to apply for ECO4 grants.',
  ogTitle: 'ECO4 Scheme | uGrant',
  ogDescription: 'Get free insulation and heating upgrades worth up to £10,000 through the ECO4 scheme.',
})

const eligibilityCriteria = [
  {
    title: 'Receive Qualifying Benefits',
    description: 'You or someone in your household receives benefits such as Universal Credit, Pension Credit, Child Tax Credits, Income Support, or Housing Benefit.',
    icon: 'check' as const,
  },
  {
    title: 'Property EPC Rating D-G',
    description: 'Your home has an Energy Performance Certificate rating of D, E, F, or G. We can check this for you automatically using your postcode.',
    icon: 'document' as const,
  },
  {
    title: 'Owner or Tenant',
    description: 'Both homeowners and tenants can apply. Private tenants will need landlord permission, while social housing tenants should contact their housing provider.',
    icon: 'home' as const,
  },
]

const availableMeasures = [
  {
    title: 'Loft Insulation',
    description: 'Up to 300mm of insulation installed in your loft to reduce heat loss through the roof.',
    savings: 'Save up to £220/year',
  },
  {
    title: 'Cavity Wall Insulation',
    description: 'Insulation material injected into the gap between your external walls to prevent heat escaping.',
    savings: 'Save up to £295/year',
  },
  {
    title: 'Solid Wall Insulation',
    description: 'Internal or external insulation for properties without cavity walls, providing excellent thermal performance.',
    savings: 'Save up to £455/year',
  },
  {
    title: 'Boiler Replacement',
    description: 'A new energy-efficient boiler to replace your old, inefficient heating system.',
    savings: 'Save up to £315/year',
  },
  {
    title: 'Heating Controls',
    description: 'Smart thermostats, programmers, and thermostatic radiator valves to better control your heating.',
    savings: 'Save up to £120/year',
  },
  {
    title: 'Room-in-Roof Insulation',
    description: 'Insulation for converted loft spaces that are used as living areas.',
    savings: 'Save up to £330/year',
  },
]

const faqs = [
  {
    question: 'What is ECO4?',
    answer: 'ECO4 (Energy Company Obligation 4) is a government scheme that requires large energy suppliers to fund energy efficiency improvements in eligible households. It runs from April 2022 to March 2026 and helps reduce fuel poverty while cutting carbon emissions.',
  },
  {
    question: 'Is ECO4 really free?',
    answer: 'Yes, if you meet the eligibility criteria. The cost is covered by the energy companies as part of their legal obligations. You won\'t pay anything for the survey, materials, or installation.',
  },
  {
    question: 'What benefits qualify for ECO4?',
    answer: 'Qualifying benefits include: Universal Credit, Pension Credit (Guarantee Credit), Income-related ESA, Income-based JSA, Income Support, Working Tax Credit, Child Tax Credit, Housing Benefit, and Child Benefit (with income under £31,000).',
  },
  {
    question: 'Can I get ECO4 if I don\'t receive benefits?',
    answer: 'Yes, through the LA Flex route. Your local council can refer you if you\'re in fuel poverty, have a low income, or have a health condition made worse by living in a cold home. Our eligibility checker will tell you if you might qualify.',
  },
  {
    question: 'What if my property has a better EPC rating?',
    answer: 'ECO4 primarily targets properties rated D-G. However, some measures may still be available for properties with better ratings through other schemes like GBIS. Our eligibility checker will show you all your options.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="ECO4 Scheme"
      subtitle="Free Energy Upgrades"
      description="The UK's largest energy efficiency programme, providing free insulation and heating improvements worth up to £10,000 for eligible households."
      cta-text="Check If I Qualify"
      cta-link="/eligibility"
      variant="green"
    />

    <!-- Key Info -->
    <section class="py-8 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-700">£10,000</p>
            <p class="text-sm text-neutral-600">Maximum value</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">100%</p>
            <p class="text-sm text-neutral-600">Fully funded</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">2026</p>
            <p class="text-sm text-neutral-600">Scheme runs until</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">6+</p>
            <p class="text-sm text-neutral-600">Measures available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is ECO4 -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What is the ECO4 Scheme?
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                The Energy Company Obligation (ECO4) is a government scheme that requires large energy suppliers to help households improve their energy efficiency. Running from April 2022 to March 2026, it's the main route for UK households to receive free insulation and heating upgrades.
              </p>
              <p>
                ECO4 focuses on a "fabric first" approach, meaning it prioritises insulation and draught-proofing to reduce heat loss before considering heating system upgrades. This ensures your home retains heat more effectively.
              </p>
              <p>
                The scheme aims to improve properties to at least an EPC rating of D (or C where practical), which can significantly reduce energy bills and make homes warmer and more comfortable.
              </p>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">Quick Facts</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Funded by the Big Six energy suppliers and other obligated companies</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Multiple measures can be installed under one application</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Work must be completed by TrustMark-registered installers</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Comes with quality guarantees and warranty protection</span>
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
            Who Can Get ECO4?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            ECO4 eligibility is based on your household circumstances and property. Here's what you typically need to qualify.
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

        <div class="mt-12 text-center">
          <p class="text-neutral-600 mb-6">
            Not sure if you qualify? Our eligibility checker will tell you in under 2 minutes.
          </p>
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
            What Can You Get Through ECO4?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            ECO4 offers a range of energy efficiency measures. The specific improvements available depend on your property and current installations.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="measure in availableMeasures"
            :key="measure.title"
            class="bg-neutral-50 rounded-2xl p-6"
          >
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">{{ measure.title }}</h3>
            <p class="text-neutral-600 text-sm mb-4">{{ measure.description }}</p>
            <p class="text-primary-700 font-semibold text-sm">{{ measure.savings }}</p>
          </div>
        </div>

        <p class="text-sm text-neutral-500 mt-8 text-center">
          Savings figures from the Energy Saving Trust. Actual savings depend on your property and usage.
        </p>
      </div>
    </section>

    <!-- How to Apply -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            How to Apply for ECO4
          </h2>
          <p class="text-lg text-primary-100 max-w-2xl mx-auto">
            Getting ECO4 funding is straightforward. Here's what to expect.
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 class="font-semibold mb-2">Check Eligibility</h3>
            <p class="text-primary-100 text-sm">Complete our quick online form to see if you qualify</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 class="font-semibold mb-2">Home Survey</h3>
            <p class="text-primary-100 text-sm">A surveyor visits to assess what work is needed</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 class="font-semibold mb-2">Installation</h3>
            <p class="text-primary-100 text-sm">Accredited installers complete the work</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 class="font-semibold mb-2">Start Saving</h3>
            <p class="text-primary-100 text-sm">Enjoy a warmer home and lower energy bills</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            ECO4 Frequently Asked Questions
          </h2>
        </div>

        <div class="max-w-3xl mx-auto">
          <FaqAccordion :items="faqs" />
        </div>

        <div class="text-center mt-8">
          <NuxtLink
            to="/faq"
            class="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
          >
            View all FAQs
            <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
          Ready to Check Your ECO4 Eligibility?
        </h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          Thousands of UK households have already benefited from ECO4. Find out if you qualify for free energy efficiency upgrades today.
        </p>
        <NuxtLink
          to="/eligibility"
          class="inline-flex items-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors shadow-lg text-lg"
        >
          Start Eligibility Check
          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
