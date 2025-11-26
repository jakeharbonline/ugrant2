<script setup lang="ts">
useHead({
  title: 'For Installers - Partner With uGrant',
})

useSeoMeta({
  description: 'Partner with uGrant to receive pre-qualified energy efficiency leads. Join our network of trusted installers delivering ECO4, GBIS, and other energy schemes.',
  ogTitle: 'Installer Partnerships | uGrant',
  ogDescription: 'Access pre-qualified energy efficiency leads. Partner with uGrant today.',
})

const benefits = [
  {
    title: 'Pre-Qualified Leads',
    description: 'Every lead has completed our eligibility checker and confirmed interest in proceeding. No cold calling - only warm prospects ready for a survey.',
    icon: 'check' as const,
  },
  {
    title: 'Eligibility Verified',
    description: 'We check eligibility criteria including benefits status, EPC rating, and property type before sending leads. Reduce wasted surveys.',
    icon: 'shield' as const,
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear, competitive pricing per lead with no hidden fees. Pay only for leads that meet your criteria and service area.',
    icon: 'currency' as const,
  },
  {
    title: 'Flexible Coverage',
    description: 'Choose the geographic areas you want to cover. Expand or contract your coverage as your capacity changes.',
    icon: 'home' as const,
  },
  {
    title: 'Dedicated Support',
    description: 'Our installer success team is here to help you get the most from the platform. Regular check-ins and responsive support.',
    icon: 'phone' as const,
  },
  {
    title: 'Quality Traffic',
    description: 'Our leads come from SEO, content marketing, and educational resources - not incentivised surveys or misleading ads.',
    icon: 'users' as const,
  },
]

const requirements = [
  {
    title: 'TrustMark Registration',
    description: 'You must be registered with TrustMark and comply with their requirements for ECO4 work.',
  },
  {
    title: 'PAS 2030/2035 Certification',
    description: 'Current PAS certification appropriate for the measures you install.',
  },
  {
    title: 'Adequate Insurance',
    description: 'Public liability and professional indemnity insurance meeting scheme requirements.',
  },
  {
    title: 'Scheme Compliance',
    description: 'Demonstrated track record of compliant installations under ECO or similar schemes.',
  },
]

const process = [
  {
    step: 1,
    title: 'Apply to Join',
    description: 'Complete our installer application form with your business details, certifications, and coverage areas.',
  },
  {
    step: 2,
    title: 'Verification',
    description: 'We verify your credentials, TrustMark registration, and compliance history.',
  },
  {
    step: 3,
    title: 'Onboarding',
    description: 'Once approved, we set up your account, discuss pricing, and agree your coverage areas.',
  },
  {
    step: 4,
    title: 'Start Receiving Leads',
    description: 'Leads matching your criteria are sent to you. You purchase and contact the customer.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Partner With uGrant"
      subtitle="For Installers"
      description="Access a steady stream of pre-qualified leads for ECO4, GBIS, and other energy efficiency schemes. Grow your business with customers ready for installation."
      cta-text="Apply to Join"
      cta-link="/contact?type=installer"
      secondary-cta-text="Learn More"
      secondary-cta-link="#benefits"
      variant="green"
    />

    <!-- Stats -->
    <section class="py-12 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p class="text-3xl md:text-4xl font-bold text-primary-700">5,000+</p>
            <p class="text-sm text-neutral-600">Leads generated monthly</p>
          </div>
          <div>
            <p class="text-3xl md:text-4xl font-bold text-primary-700">85%</p>
            <p class="text-sm text-neutral-600">Survey conversion rate</p>
          </div>
          <div>
            <p class="text-3xl md:text-4xl font-bold text-primary-700">UK-Wide</p>
            <p class="text-sm text-neutral-600">Coverage available</p>
          </div>
          <div>
            <p class="text-3xl md:text-4xl font-bold text-primary-700">24hrs</p>
            <p class="text-sm text-neutral-600">Average lead response</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section id="benefits" class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Partner With uGrant?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            We're not just another lead generation company. We're committed to providing quality leads that convert.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-neutral-50 rounded-2xl p-6 md:p-8"
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

    <!-- How It Works -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Getting started is straightforward. Here's what to expect.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="item in process"
            :key="item.step"
            class="text-center"
          >
            <div class="w-16 h-16 bg-primary-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              {{ item.step }}
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">{{ item.title }}</h3>
            <p class="text-neutral-600 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Lead Quality -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Quality Leads, Not Just Quantity
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                We know the energy efficiency industry has been plagued by poor quality leads. That's why we've built uGrant differently.
              </p>
              <p>
                Our leads come from homeowners actively researching energy grants through our educational content. They've completed our eligibility checker, understood what they're likely to qualify for, and explicitly requested installer contact.
              </p>
              <p>
                Every lead includes the customer's contact details, property information, EPC data (where available), benefits status, and the schemes they're potentially eligible for. You know exactly what you're getting before you buy.
              </p>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">What's Included With Each Lead</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Full name and contact details (phone & email)</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Full property address and postcode</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Property type, tenure, and heating details</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">EPC rating and data (where available)</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Benefits received and eligibility route</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-neutral-700">Schemes they're potentially eligible for</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Requirements to Join
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            We work with established, accredited installers who share our commitment to quality.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="requirement in requirements"
            :key="requirement.title"
            class="bg-white rounded-2xl p-6 shadow-card"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-neutral-900 mb-1">{{ requirement.title }}</h3>
                <p class="text-neutral-600 text-sm">{{ requirement.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p class="text-lg text-primary-100 mb-8">
              Join our network of trusted installers and start receiving pre-qualified leads in your area. Apply today and our team will be in touch within 48 hours.
            </p>
            <ul class="space-y-3 text-primary-100">
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                No sign-up fees or monthly minimums
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Pay per lead, scale at your pace
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Dedicated account support
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-4">
              Apply to Become a Partner
            </h3>
            <p class="text-neutral-600 mb-6">
              Fill out our application form and we'll review your details. Approval typically takes 2-3 business days.
            </p>
            <NuxtLink
              to="/contact?type=installer"
              class="w-full inline-flex items-center justify-center px-6 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
            >
              Apply Now
              <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            <p class="text-sm text-neutral-500 mt-4 text-center">
              Questions? Email us at <a href="mailto:partners@ugrant.co.uk" class="text-primary-700 hover:underline">partners@ugrant.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
