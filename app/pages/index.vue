<script setup lang="ts">
useHead({
  title: 'Free Energy Grants for UK Homes',
})

useSeoMeta({
  description: 'Check your eligibility for free energy efficiency grants including ECO4, GBIS, Warm Home Discount and more. Save money on heating bills with government-backed schemes.',
  ogTitle: 'uGrant - Free Energy Grants for UK Homes',
  ogDescription: 'Check your eligibility for free energy efficiency grants including ECO4, GBIS, Warm Home Discount and more.',
  ogType: 'website',
})

const schemes = [
  {
    title: 'ECO4',
    description: 'Free insulation and heating upgrades for eligible households. The largest energy efficiency scheme in the UK.',
    href: '/schemes/eco4',
    icon: 'home' as const,
    savings: '£10,000',
    featured: true,
  },
  {
    title: 'Great British Insulation Scheme',
    description: 'Cavity wall and loft insulation for homes with poor energy ratings, regardless of benefits status.',
    href: '/schemes/gbis',
    icon: 'shield' as const,
    savings: '£4,000',
  },
  {
    title: 'Warm Home Discount',
    description: 'A £150 discount on your electricity bill to help with winter heating costs.',
    href: '/schemes/warm-home-discount',
    icon: 'bolt' as const,
    savings: '£150',
  },
  {
    title: 'Boiler Upgrade Scheme',
    description: 'Grants up to £7,500 towards heat pumps and biomass boilers to replace fossil fuel heating.',
    href: '/schemes/boiler-upgrade-scheme',
    icon: 'fire' as const,
    savings: '£7,500',
  },
]

const benefits = [
  {
    title: 'Reduce Energy Bills',
    description: 'Cut your heating costs by up to 50% with proper insulation and efficient heating systems.',
    icon: 'currency' as const,
  },
  {
    title: 'Warmer Home',
    description: 'Stay comfortable year-round with improved insulation that keeps heat in during winter and out during summer.',
    icon: 'home' as const,
  },
  {
    title: 'Lower Carbon Footprint',
    description: 'Reduce your environmental impact and help the UK reach its net-zero targets.',
    icon: 'shield' as const,
  },
  {
    title: 'Increase Property Value',
    description: 'Energy-efficient homes are more attractive to buyers and can command higher prices.',
    icon: 'check' as const,
  },
]

const trustStats = [
  { stat: '50,000+', label: 'Households helped', icon: 'users' as const },
  { stat: '98%', label: 'Success rate', icon: 'check' as const },
  { stat: '£15M+', label: 'In grants secured', icon: 'home' as const },
  { stat: '4.8/5', label: 'Customer rating', icon: 'star' as const },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Free Energy Grants for Your Home"
      subtitle="UK Energy Efficiency Schemes"
      description="Millions of UK households qualify for free insulation, heating upgrades, and bill discounts. Check your eligibility in under 2 minutes."
      cta-text="Check My Eligibility"
      cta-link="/checker"
      secondary-cta-text="Learn How It Works"
      secondary-cta-link="/how-it-works"
      variant="green"
    />

    <!-- Trust Indicators -->
    <section class="py-12 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustIndicator
            v-for="stat in trustStats"
            :key="stat.label"
            :stat="stat.stat"
            :label="stat.label"
            :icon="stat.icon"
          />
        </div>
      </div>
    </section>

    <!-- Available Schemes -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Energy Schemes Available Now
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            The UK government offers several schemes to help households improve their energy efficiency. Here are the main programmes you could qualify for.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <SchemeCard
            v-for="scheme in schemes"
            :key="scheme.title"
            :title="scheme.title"
            :description="scheme.description"
            :href="scheme.href"
            :icon="scheme.icon"
            :savings="scheme.savings"
            :featured="scheme.featured"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink
            to="/schemes"
            class="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
          >
            View all energy schemes
            <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works Summary -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Check Your Eligibility in 3 Simple Steps
            </h2>
            <div class="space-y-8">
              <FeatureCard
                :step="1"
                title="Answer a Few Questions"
                description="Tell us about your property, heating system, and household circumstances. It takes less than 2 minutes."
              />
              <FeatureCard
                :step="2"
                title="Get Your Results"
                description="We'll instantly check your eligibility across all available schemes and show you what you could receive."
              />
              <FeatureCard
                :step="3"
                title="Connect with Installers"
                description="If you're eligible, we'll connect you with trusted, accredited installers who can complete the work."
              />
            </div>
            <div class="mt-8">
              <NuxtLink
                to="/how-it-works"
                class="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800"
              >
                Learn more about the process
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <div class="bg-white rounded-2xl shadow-soft p-6 md:p-8">
              <h3 class="text-xl font-bold text-neutral-900 mb-4">
                Ready to check your eligibility?
              </h3>
              <p class="text-neutral-600 mb-6">
                Most households can save hundreds or even thousands of pounds on energy efficiency improvements. Find out what you qualify for today.
              </p>
              <NuxtLink
                to="/checker"
                class="w-full inline-flex items-center justify-center px-6 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
              >
                Start Eligibility Check
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
              <p class="text-sm text-neutral-500 mt-4 text-center">
                Free, no obligation, takes 2 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Improve Your Home's Energy Efficiency?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Energy efficiency upgrades don't just save money - they make your home more comfortable and valuable while helping the environment.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-white rounded-2xl p-6 md:p-8 shadow-card"
          >
            <FeatureCard
              :title="benefit.title"
              :description="benefit.description"
              :icon="benefit.icon"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Don't Miss Out on Free Grants
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Thousands of UK households are claiming their energy grants right now. Check if you qualify and start saving on your energy bills.
        </p>
        <NuxtLink
          to="/checker"
          class="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg text-lg"
        >
          Check My Eligibility Now
          <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- FAQ Preview -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-neutral-600">
            Quick answers to common questions about energy grants.
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <FaqAccordion
            :items="[
              {
                question: 'Are these grants really free?',
                answer: 'Yes, if you meet the eligibility criteria, the work is completely free. The funding comes from government-mandated obligations on energy companies and direct government schemes. You won\'t pay anything for qualifying improvements.'
              },
              {
                question: 'How do I know if I\'m eligible?',
                answer: 'Eligibility depends on several factors including your property type, heating system, EPC rating, and household circumstances (such as receiving certain benefits or having a low income). Our quick eligibility checker will tell you instantly which schemes you qualify for.'
              },
              {
                question: 'What improvements can I get?',
                answer: 'Depending on your eligibility, you could receive free loft insulation, cavity wall insulation, solid wall insulation, a new boiler or heating system, or even a heat pump. The specific measures depend on what your home needs and which schemes you qualify for.'
              },
            ]"
          />
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
  </div>
</template>
