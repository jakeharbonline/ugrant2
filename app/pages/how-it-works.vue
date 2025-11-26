<script setup lang="ts">
useHead({
  title: 'How It Works',
})

useSeoMeta({
  description: 'Learn how to check your eligibility for UK energy grants and get connected with trusted installers. Simple 3-step process to claim free insulation and heating upgrades.',
  ogTitle: 'How It Works | uGrant',
  ogDescription: 'Simple 3-step process to check eligibility and claim free energy grants for your home.',
})

const steps = [
  {
    number: 1,
    title: 'Complete Our Quick Eligibility Check',
    description: 'Answer a few simple questions about your property, heating system, and household circumstances. Our checker is designed to be quick and easy - most people complete it in under 2 minutes.',
    details: [
      'Tell us your postcode and property type',
      'Share details about your current heating and insulation',
      'Provide information about your household (benefits, income)',
      'We\'ll automatically check your EPC rating where possible',
    ],
  },
  {
    number: 2,
    title: 'Get Your Personalised Results',
    description: 'We instantly check your eligibility across all available UK energy schemes. You\'ll see exactly which grants you qualify for and what improvements you could receive.',
    details: [
      'See all schemes you\'re eligible for',
      'Understand what measures are available',
      'Learn how much you could save on energy bills',
      'Get a clear explanation of next steps',
    ],
  },
  {
    number: 3,
    title: 'Connect with Trusted Installers',
    description: 'If you\'re eligible and want to proceed, we\'ll connect you with accredited installers who specialise in energy efficiency work. They\'ll arrange a survey and complete the installation.',
    details: [
      'Choose to be contacted by approved installers',
      'A surveyor will assess your property',
      'Work is scheduled at a time that suits you',
      'Professional installation with quality guarantees',
    ],
  },
]

const eligibilityCriteria = [
  {
    title: 'Property Type',
    description: 'Most property types qualify, including houses, bungalows, flats, and maisonettes. Both owned and rented properties can be eligible.',
    icon: 'home' as const,
  },
  {
    title: 'EPC Rating',
    description: 'Properties with lower EPC ratings (D, E, F, or G) are more likely to qualify for multiple schemes. Some schemes are available regardless of EPC.',
    icon: 'document' as const,
  },
  {
    title: 'Benefits or Low Income',
    description: 'Receiving certain benefits like Universal Credit, Pension Credit, or Child Tax Credits can make you eligible. Low-income households may also qualify.',
    icon: 'currency' as const,
  },
  {
    title: 'Current Heating',
    description: 'Your current heating type affects which improvements you can receive. Homes with oil, LPG, or electric heating often have more options available.',
    icon: 'check' as const,
  },
]

const faqs = [
  {
    question: 'How long does the whole process take?',
    answer: 'The eligibility check takes about 2 minutes. If eligible, an installer will typically contact you within 48 hours. A survey is usually completed within 2 weeks, and installation timing depends on the work required - simple jobs like loft insulation can be done in a day, while larger projects may take longer.',
  },
  {
    question: 'Do I need my landlord\'s permission?',
    answer: 'If you rent your home, you\'ll need your landlord\'s permission before any work can be done. Many landlords are happy to approve energy efficiency improvements as they increase the property value. Some schemes even specifically target the private rented sector.',
  },
  {
    question: 'What happens during the survey?',
    answer: 'A qualified surveyor will visit your home to assess what improvements are needed and confirm your eligibility. They\'ll check your existing insulation, heating system, and the property\'s construction. This typically takes 30-60 minutes.',
  },
  {
    question: 'Is there really no catch?',
    answer: 'There\'s no catch if you meet the eligibility criteria. The funding comes from government schemes and obligations placed on energy companies. You won\'t be asked to pay anything, sign up for expensive products, or change energy supplier.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="How uGrant Works"
      subtitle="Simple Process"
      description="From eligibility check to installation, we make it easy to claim your free energy grants. Here's everything you need to know."
      variant="default"
    />

    <!-- Steps Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="space-y-16 md:space-y-24">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            :class="['grid lg:grid-cols-2 gap-12 items-center', index % 2 === 1 ? 'lg:grid-flow-dense' : '']"
          >
            <div :class="index % 2 === 1 ? 'lg:col-start-2' : ''">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-primary-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold">
                  {{ step.number }}
                </div>
                <div class="h-1 flex-1 bg-primary-100 rounded-full max-w-24" />
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                {{ step.title }}
              </h2>
              <p class="text-lg text-neutral-600 mb-6">
                {{ step.description }}
              </p>
              <ul class="space-y-3">
                <li
                  v-for="detail in step.details"
                  :key="detail"
                  class="flex items-start gap-3"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-neutral-700">{{ detail }}</span>
                </li>
              </ul>
            </div>
            <div class="bg-neutral-50 rounded-3xl p-8 lg:p-12 aspect-square lg:aspect-auto flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    v-if="step.number === 1"
                    class="w-16 h-16 text-primary-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <svg
                    v-else-if="step.number === 2"
                    class="w-16 h-16 text-primary-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <svg
                    v-else
                    class="w-16 h-16 text-primary-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p class="text-neutral-600 font-medium">Step {{ step.number }} of 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Check Section -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What Determines Your Eligibility?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Different schemes have different criteria. Here's what typically affects your eligibility for energy grants.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
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
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Ready to Check Your Eligibility?
            </h2>
            <p class="text-lg text-primary-100 mb-8">
              Join thousands of UK households who have already claimed their free energy grants. Our quick eligibility check takes less than 2 minutes.
            </p>
            <ul class="space-y-3 text-primary-100">
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                100% free eligibility check
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                No obligation to proceed
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Instant results
              </li>
            </ul>
          </div>
          <div class="bg-white rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-4">
              Start Your Eligibility Check
            </h3>
            <p class="text-neutral-600 mb-6">
              Answer a few quick questions to find out which energy grants you could receive.
            </p>
            <NuxtLink
              to="/eligibility"
              class="w-full inline-flex items-center justify-center px-6 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
            >
              Check My Eligibility
              <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Common Questions
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
  </div>
</template>
