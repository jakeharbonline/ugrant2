<script setup lang="ts">
useHead({
  title: 'Warm Home Discount - £150 Off Your Electricity Bill',
})

useSeoMeta({
  description: 'The Warm Home Discount provides a £150 discount on your electricity bill each winter. Learn about eligibility, how to apply, and when payments are made.',
  ogTitle: 'Warm Home Discount Scheme | uGrant',
  ogDescription: 'Get £150 off your electricity bill this winter through the Warm Home Discount scheme.',
})

const eligibilityGroups = [
  {
    title: 'Core Group 1',
    description: 'You receive the Guarantee Credit element of Pension Credit. You\'ll usually receive the discount automatically without needing to apply.',
    automatic: true,
    icon: 'check' as const,
  },
  {
    title: 'Core Group 2',
    description: 'You or your partner receive certain benefits (like Universal Credit, ESA, JSA) AND you have high energy costs relative to your income.',
    automatic: true,
    icon: 'check' as const,
  },
  {
    title: 'Legacy Applicants',
    description: 'If you received the discount in previous years, you may continue to be eligible. Check with your energy supplier.',
    automatic: false,
    icon: 'phone' as const,
  },
]

const timeline = [
  {
    month: 'September - October',
    description: 'Letters sent to Core Group 2 households confirming eligibility',
  },
  {
    month: 'October - November',
    description: 'Discount applied to electricity accounts',
  },
  {
    month: 'November - March',
    description: 'Most payments completed by end of March',
  },
]

const faqs = [
  {
    question: 'What is the Warm Home Discount?',
    answer: 'The Warm Home Discount is a government scheme that provides a £150 one-off discount on electricity bills for eligible low-income and vulnerable households. It\'s designed to help with heating costs during the winter months.',
  },
  {
    question: 'Do I need to apply for the Warm Home Discount?',
    answer: 'For most eligible households, the discount is applied automatically. You\'ll receive a letter from DWP confirming your eligibility if you\'re in Core Group 2. If you receive Pension Credit Guarantee Credit, you\'re usually eligible automatically as part of Core Group 1.',
  },
  {
    question: 'When will I receive my discount?',
    answer: 'Discounts are typically applied between October and March. You\'ll see the £150 credit appear on your electricity bill or account. If you have a prepayment meter, you may receive a voucher or the credit will be applied to your meter.',
  },
  {
    question: 'Will I get a letter if I\'m eligible?',
    answer: 'If you\'re in Core Group 2, you should receive a letter from DWP between September and October confirming your eligibility. You don\'t need to do anything - the discount will be applied automatically by your energy supplier.',
  },
  {
    question: 'What if I\'m on a prepayment meter?',
    answer: 'If you have a prepayment meter, you may receive a voucher to redeem at a PayPoint outlet, or the credit might be applied directly to your smart prepayment meter. Your energy supplier will contact you with instructions.',
  },
  {
    question: 'Can I get the Warm Home Discount AND other energy grants?',
    answer: 'Yes! The Warm Home Discount is completely separate from other schemes like ECO4 or GBIS. You can receive the bill discount and also qualify for free insulation or heating upgrades through other schemes.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Warm Home Discount"
      subtitle="£150 Bill Discount"
      description="A one-off £150 discount on your electricity bill to help with winter heating costs. Most eligible households receive it automatically."
      cta-text="Check All My Eligibility"
      cta-link="/eligibility"
      variant="green"
    />

    <!-- Key Info -->
    <section class="py-8 bg-white border-b border-neutral-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p class="text-3xl font-bold text-primary-700">£150</p>
            <p class="text-sm text-neutral-600">Discount amount</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">Auto</p>
            <p class="text-sm text-neutral-600">Usually automatic</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">Winter</p>
            <p class="text-sm text-neutral-600">Paid annually</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-primary-700">2024/25</p>
            <p class="text-sm text-neutral-600">Current scheme year</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is WHD -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              What is the Warm Home Discount?
            </h2>
            <div class="prose prose-lg text-neutral-600">
              <p>
                The Warm Home Discount is a government scheme that provides eligible households with a £150 discount on their electricity bill each winter. Unlike other energy grants, it's a direct financial payment rather than physical improvements to your home.
              </p>
              <p>
                The scheme is designed to help low-income and vulnerable households with their heating costs during the coldest months. Since 2022, the scheme has been reformed so that most eligible households receive the discount automatically based on their benefits and energy costs.
              </p>
              <p>
                The discount is applied directly to your electricity account - you don't receive cash. If you're in credit on your account, the balance will increase. If you owe money, the £150 will reduce what you owe.
              </p>
            </div>
          </div>
          <div class="bg-primary-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-6">2024/25 Scheme Timeline</h3>
            <div class="space-y-6">
              <div
                v-for="(item, index) in timeline"
                :key="index"
                class="flex gap-4"
              >
                <div class="w-12 h-12 bg-primary-700 text-white rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold">
                  {{ index + 1 }}
                </div>
                <div>
                  <p class="font-semibold text-neutral-900">{{ item.month }}</p>
                  <p class="text-neutral-600 text-sm">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Eligibility Groups -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Who Can Get the Warm Home Discount?
          </h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Eligibility is determined by your benefits status and energy costs. Most eligible households receive the discount automatically.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="group in eligibilityGroups"
            :key="group.title"
            class="bg-white rounded-2xl p-6 md:p-8 shadow-card"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  class="w-6 h-6 text-primary-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    v-if="group.icon === 'check'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-neutral-900">{{ group.title }}</h3>
                <span
                  v-if="group.automatic"
                  class="inline-block text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full mt-1"
                >
                  Usually automatic
                </span>
              </div>
            </div>
            <p class="text-neutral-600">{{ group.description }}</p>
          </div>
        </div>

        <div class="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <h3 class="text-lg font-semibold text-neutral-900 mb-4">Qualifying Benefits for Core Group 2</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Universal Credit
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Income-based JSA
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Income-related ESA
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Income Support
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Housing Benefit
            </div>
            <div class="flex items-center gap-2 text-neutral-700">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Pension Credit (Savings)
            </div>
          </div>
          <p class="text-sm text-neutral-500 mt-4">
            Note: Receiving benefits alone doesn't guarantee eligibility. Your energy costs relative to your income are also considered.
          </p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How Does It Work?
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <FeatureCard
              :step="1"
              title="Automatic Eligibility Check"
              description="DWP matches your benefits data with your energy supplier to determine if you qualify based on your benefits and energy costs."
            />
            <FeatureCard
              :step="2"
              title="Receive Confirmation Letter"
              description="If eligible, you'll receive a letter from DWP between September and October confirming that you'll receive the discount."
            />
            <FeatureCard
              :step="3"
              title="Discount Applied"
              description="Your energy supplier applies the £150 credit to your electricity account between October and March. You don't need to do anything."
            />
          </div>
          <div class="bg-accent-50 rounded-3xl p-8 lg:p-12">
            <h3 class="text-xl font-bold text-neutral-900 mb-4">Important Notes</h3>
            <ul class="space-y-4 text-neutral-700">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>The discount is applied to your electricity bill only, not gas</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Make sure your energy supplier has your correct name and address</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>If you change energy supplier, let your new supplier know</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Only one discount per household, even if you receive multiple benefits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Warm Home Discount FAQs
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
          Check All Your Energy Grant Eligibility
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          The Warm Home Discount is just one of several schemes available. Our eligibility checker will show you everything you could qualify for, including free insulation and heating upgrades.
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
