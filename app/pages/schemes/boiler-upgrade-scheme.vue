<script setup lang="ts">
useHead({
  title: 'Boiler Upgrade Scheme - Heat Pump Grants up to £7,500',
})

useSeoMeta({
  description: 'The Boiler Upgrade Scheme provides grants up to £7,500 towards heat pumps and £5,000 towards biomass boilers. Replace fossil fuel heating with clean energy.',
  ogTitle: 'Boiler Upgrade Scheme | uGrant',
  ogDescription: 'Get up to £7,500 towards a heat pump through the Boiler Upgrade Scheme.',
})

const grantAmounts = [
  {
    technology: 'Air Source Heat Pump',
    amount: '£7,500',
    description: 'The most common type of heat pump, extracting heat from outside air to warm your home.',
  },
  {
    technology: 'Ground Source Heat Pump',
    amount: '£7,500',
    description: 'Uses underground pipes to extract heat from the ground. More efficient but requires garden space.',
  },
  {
    technology: 'Biomass Boiler',
    amount: '£5,000',
    description: 'Burns wood pellets, chips, or logs to heat your home. Requires fuel storage space.',
  },
]

const eligibilityCriteria = [
  {
    title: 'Replace Fossil Fuel Heating',
    description: 'Your current heating must be oil, LPG, coal, or electric (not mains gas). You can also replace an existing heat pump.',
    icon: 'fire' as const,
  },
  {
    title: 'Valid EPC',
    description: 'You need an Energy Performance Certificate issued within the last 10 years with no outstanding recommendations for loft or cavity wall insulation.',
    icon: 'document' as const,
  },
  {
    title: 'Property Ownership',
    description: 'You must own your property (including if owned through a company). The scheme is not available for new builds less than 2 years old.',
    icon: 'home' as const,
  },
]

const faqs = [
  {
    question: 'What is the Boiler Upgrade Scheme?',
    answer: 'The Boiler Upgrade Scheme (BUS) is a government grant programme that helps homeowners in England and Wales replace fossil fuel heating systems with cleaner alternatives like heat pumps and biomass boilers. It provides upfront grants to reduce the cost of installation.',
  },
  {
    question: 'Can I get a grant if I have mains gas?',
    answer: 'No, properties with mains gas heating are not eligible for the Boiler Upgrade Scheme. The scheme specifically targets properties using oil, LPG, coal, or electric heating. If you have gas, you may be able to get a free boiler replacement through ECO4 instead.',
  },
  {
    question: 'How much does a heat pump actually cost?',
    answer: 'A typical air source heat pump installation costs between £10,000 and £18,000 before the grant. With the £7,500 BUS grant, you\'d pay between £2,500 and £10,500. Costs vary depending on your property size and the complexity of installation.',
  },
  {
    question: 'Will a heat pump work in my home?',
    answer: 'Heat pumps work in most properties, but they\'re most effective in well-insulated homes. Your installer will assess your property and may recommend insulation improvements first. Heat pumps work at lower temperatures than gas boilers, so you may need larger radiators.',
  },
  {
    question: 'How do I apply for the Boiler Upgrade Scheme?',
    answer: 'You don\'t apply directly. Instead, find an MCS-certified installer who will apply on your behalf. The grant is deducted from your quote, so you only pay the remaining balance. Our eligibility checker can help you get started.',
  },
  {
    question: 'Can I combine BUS with other grants?',
    answer: 'You cannot combine BUS with ECO4 or GBIS for the same measure. However, if you\'re eligible for free insulation through those schemes, you could get that installed first (improving your EPC) and then apply for BUS for a heat pump.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Boiler Upgrade Scheme"
      subtitle="Heat Pump Grants"
      description="Get up to £7,500 towards replacing your fossil fuel heating with a clean, efficient heat pump. Available for homeowners in England and Wales."
      cta-text="Check If I Qualify"
      cta-link="/eligibility"
      variant="green"
    />

    <!-- Key Info -->
    <section class="py-8 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-700">£7,500</p>
            <p class="text-sm text-neutral-600">Maximum grant</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">2028</p>
            <p class="text-sm text-neutral-600">Scheme runs until</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">Off-Gas</p>
            <p class="text-sm text-neutral-600">Properties only</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">MCS</p>
            <p class="text-sm text-neutral-600">Certified installers</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Grant Amounts -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Available Grant Amounts
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            The grant amount depends on the technology you're installing. Here's what you could receive.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="grant in grantAmounts"
            :key="grant.technology"
            class="bg-neutral-50 rounded-2xl p-6 md:p-8 text-center"
          >
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                class="w-8 h-8 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">{{ grant.technology }}</h3>
            <p class="text-4xl font-bold text-primary-700 mb-4">{{ grant.amount }}</p>
            <p class="text-neutral-600 text-sm">{{ grant.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is BUS -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What is the Boiler Upgrade Scheme?
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                The Boiler Upgrade Scheme (BUS) is a government initiative to help homeowners in England and Wales transition from fossil fuel heating to low-carbon alternatives. It provides upfront grants that reduce the cost of installing heat pumps and biomass boilers.
              </p>
              <p>
                The scheme is specifically designed for properties that are off the gas grid - those currently using oil, LPG, coal, or electric heating. By replacing these systems with heat pumps, households can significantly reduce their carbon emissions while also cutting long-term energy costs.
              </p>
              <p>
                The grant is automatically deducted from your installation quote by an MCS-certified installer, so you only pay the difference between the full cost and the grant amount.
              </p>
            </div>
          </div>
          <div class="bg-white rounded-3xl p-8 lg:p-12 shadow-soft">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">Why Choose a Heat Pump?</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">300-400% efficient - produces more heat than energy used</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Lower running costs than oil or LPG boilers</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Zero carbon emissions at point of use</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Low maintenance with 20+ year lifespan</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Can provide both heating and cooling</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Eligibility -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Am I Eligible?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            The Boiler Upgrade Scheme has specific eligibility criteria. Here's what you need to qualify.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="criteria in eligibilityCriteria"
            :key="criteria.title"
            class="bg-neutral-50 rounded-2xl p-6 md:p-8"
          >
            <FeatureCard
              :title="criteria.title"
              :description="criteria.description"
              :icon="criteria.icon"
            />
          </div>
        </div>

        <div class="mt-12 bg-accent-50 rounded-2xl p-6 md:p-8">
          <div class="flex items-start gap-4">
            <svg class="w-8 h-8 text-accent-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-neutral-900 mb-2">Important: EPC Recommendations</h3>
              <p class="text-neutral-700">
                If your EPC has recommendations for loft or cavity wall insulation, you'll need to either install that insulation first or get a new EPC assessment that confirms the recommendations don't apply. Our eligibility checker can help you understand your options.
              </p>
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

    <!-- Process -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            How to Get Your Grant
          </h2>
          <p class="text-lg text-primary-100 max-w-2xl mx-auto">
            The process is straightforward - your MCS-certified installer handles the grant application for you.
          </p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 class="font-semibold mb-2">Check Eligibility</h3>
            <p class="text-primary-100 text-sm">Confirm your property and current heating qualify for the scheme</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 class="font-semibold mb-2">Get Quotes</h3>
            <p class="text-primary-100 text-sm">Request quotes from MCS-certified installers</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 class="font-semibold mb-2">Grant Applied</h3>
            <p class="text-primary-100 text-sm">Your installer applies for the grant - deducted from your quote</p>
          </div>
          <div class="text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 class="font-semibold mb-2">Installation</h3>
            <p class="text-primary-100 text-sm">Heat pump installed and you start saving</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Boiler Upgrade Scheme FAQs
          </h2>
        </div>

        <div class="max-w-3xl mx-auto">
          <FaqAccordion :items="faqs" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
          Ready to Upgrade Your Heating?
        </h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          Check if you qualify for a £7,500 heat pump grant through the Boiler Upgrade Scheme. Our eligibility checker will also show you other schemes you might benefit from.
        </p>
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
    </section>
  </div>
</template>
