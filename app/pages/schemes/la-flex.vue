<script setup lang="ts">
useHead({
  title: 'LA Flex - Local Authority Flexibility Scheme',
})

useSeoMeta({
  description: 'LA Flex allows local councils to refer households for ECO4 funding even without receiving benefits. Eligibility based on income, health, or fuel poverty status.',
  ogTitle: 'LA Flex Scheme | uGrant',
  ogDescription: 'Get free energy upgrades through your local council with LA Flex - even without claiming benefits.',
})

const eligibilityRoutes = [
  {
    title: 'Low Income Household',
    description: 'Your household income is below £31,000 and you live in a property with an EPC rating of D-G.',
    icon: 'currency' as const,
  },
  {
    title: 'Fuel Poverty',
    description: 'You spend more than 10% of your income on energy bills, or would need to spend that much to maintain adequate warmth.',
    icon: 'home' as const,
  },
  {
    title: 'Vulnerable to Cold',
    description: 'You or someone in your household has a health condition made worse by living in a cold home.',
    icon: 'shield' as const,
  },
  {
    title: 'On a Low-Income Benefits',
    description: 'You receive certain benefits but don\'t quite meet the standard ECO4 criteria.',
    icon: 'check' as const,
  },
]

const availableMeasures = [
  'Loft insulation',
  'Cavity wall insulation',
  'Solid wall insulation (internal or external)',
  'Boiler replacement or repair',
  'Heating controls',
  'Room-in-roof insulation',
  'Underfloor insulation',
  'First-time central heating',
]

const faqs = [
  {
    question: 'What is LA Flex?',
    answer: 'LA Flex (Local Authority Flexibility) is a route into ECO4 funding that allows local councils to refer households who don\'t receive qualifying benefits but are still in need of support. It\'s designed to help low-income households, those in fuel poverty, and people with health conditions affected by cold homes.',
  },
  {
    question: 'How is LA Flex different from standard ECO4?',
    answer: 'Standard ECO4 requires you to receive specific benefits to qualify. LA Flex opens up the same funding to households who don\'t receive benefits but meet alternative criteria set by their local council, such as having a low income or being in fuel poverty.',
  },
  {
    question: 'How do I apply through LA Flex?',
    answer: 'You don\'t apply directly to your council. When you complete our eligibility check and indicate you might qualify for LA Flex, we connect you with installers who can liaise with your local authority on your behalf to obtain the necessary referral.',
  },
  {
    question: 'What income level qualifies as "low income"?',
    answer: 'While criteria vary by council, households with an annual income below £31,000 are typically considered low income for LA Flex purposes. Some councils may have different thresholds or consider other factors like household size.',
  },
  {
    question: 'What health conditions qualify?',
    answer: 'Conditions that can be made worse by cold housing include respiratory diseases (asthma, COPD), cardiovascular conditions, mobility problems, mental health conditions, and conditions affecting the immune system. Age-related vulnerability (over 65 or under 5) is also considered.',
  },
  {
    question: 'Do all councils participate in LA Flex?',
    answer: 'Most local authorities in England, Scotland, and Wales participate in LA Flex, though the specific criteria and processes may vary. Our eligibility checker will help determine if LA Flex might be an option in your area.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="LA Flex Scheme"
      subtitle="Local Authority Flexibility"
      description="Don't receive benefits but struggling with energy costs? Your local council can help you access free energy efficiency improvements through LA Flex."
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
            <p class="text-3xl font-bold text-primary-700">£31k</p>
            <p class="text-sm text-neutral-600">Income threshold</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">No</p>
            <p class="text-sm text-neutral-600">Benefits required</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">Full</p>
            <p class="text-sm text-neutral-600">ECO4 measures</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is LA Flex -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What is LA Flex?
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                LA Flex (Local Authority Flexibility) is a route into ECO4 funding that doesn't require you to be receiving benefits. Instead, your local council can declare you eligible based on criteria like low income, fuel poverty, or health vulnerability.
              </p>
              <p>
                This pathway was created to ensure that households who are struggling with energy costs but don't claim benefits can still access help. Many working households on modest incomes, pensioners not receiving Pension Credit, and people with health conditions can qualify.
              </p>
              <p>
                Once referred through LA Flex, you can access the same measures as standard ECO4 - including insulation, heating upgrades, and more - all completely free of charge.
              </p>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">Available Measures</h3>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="measure in availableMeasures"
                :key="measure"
                class="flex items-start gap-2"
              >
                <svg class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700 text-sm">{{ measure }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Eligibility Routes -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Who Can Qualify Through LA Flex?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            There are several ways to qualify for LA Flex, even if you don't receive any benefits. You only need to meet one of these criteria.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="route in eligibilityRoutes"
            :key="route.title"
            class="bg-white rounded-2xl p-6 md:p-8 shadow-card"
          >
            <FeatureCard
              :title="route.title"
              :description="route.description"
              :icon="route.icon"
            />
          </div>
        </div>

        <div class="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Health Conditions That May Qualify</h3>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Asthma
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              COPD
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Heart disease
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Arthritis
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mental health conditions
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mobility issues
            </div>
          </div>
          <p class="text-sm text-neutral-500 mt-4">
            This is not an exhaustive list. If you have a condition that could be worsened by cold housing, you may still qualify.
          </p>
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

    <!-- How It Works -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How Does LA Flex Work?
          </h2>
        </div>

        <div class="max-w-3xl mx-auto space-y-8">
          <FeatureCard
            :step="1"
            title="Check Your Eligibility"
            description="Complete our eligibility checker, providing information about your income, health, and household circumstances. We'll assess whether LA Flex might be right for you."
          />
          <FeatureCard
            :step="2"
            title="Connect with an Installer"
            description="If you might qualify, we'll connect you with an installer who works with your local authority. They'll gather the necessary information for your referral."
          />
          <FeatureCard
            :step="3"
            title="Council Declaration"
            description="The installer submits your details to your local council, who issues a 'Statement of Intent' declaring you eligible under LA Flex criteria."
          />
          <FeatureCard
            :step="4"
            title="Survey & Installation"
            description="Once approved, a surveyor assesses your property and the installer completes the work - at no cost to you."
          />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            LA Flex Frequently Asked Questions
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
          Don't Let Your Income Hold You Back
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Even without claiming benefits, you could qualify for free energy efficiency improvements through LA Flex. Check your eligibility today.
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
