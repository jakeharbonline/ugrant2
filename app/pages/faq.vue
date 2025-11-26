<script setup lang="ts">
useHead({
  title: 'Frequently Asked Questions',
})

useSeoMeta({
  description: 'Find answers to common questions about UK energy grants, eligibility criteria, the application process, and what to expect from free energy efficiency improvements.',
  ogTitle: 'FAQ | uGrant',
  ogDescription: 'Common questions and answers about UK energy efficiency grants and schemes.',
})

const categories = [
  {
    name: 'Eligibility',
    faqs: [
      {
        question: 'How do I know if I\'m eligible for energy grants?',
        answer: 'Eligibility depends on several factors including the benefits you receive, your household income, your property type and EPC rating, and your current heating system. Our free eligibility checker takes about 2 minutes and will tell you exactly which schemes you qualify for.',
      },
      {
        question: 'Do I need to be on benefits to qualify?',
        answer: 'Not necessarily. While receiving certain benefits (like Universal Credit, Pension Credit, or Child Tax Credits) can make you eligible for schemes like ECO4, there are other routes available. GBIS doesn\'t require benefits for the General Group, and LA Flex can help low-income households or those with health conditions regardless of benefit status.',
      },
      {
        question: 'Can I get help if I rent my home?',
        answer: 'Yes, both private and social housing tenants can be eligible for energy efficiency grants. Private tenants will need their landlord\'s permission before any work can be carried out. Social housing tenants should speak to their housing provider, as some may have their own improvement programmes.',
      },
      {
        question: 'What if I don\'t know my EPC rating?',
        answer: 'Our eligibility checker can automatically look up your EPC rating using your postcode and address. If your property doesn\'t have an EPC or it\'s very old, a surveyor can assess your property to determine what improvements are needed and appropriate.',
      },
      {
        question: 'Can I apply for multiple schemes?',
        answer: 'Yes! Many households qualify for more than one scheme. For example, you might be eligible for free insulation through ECO4 or GBIS, the Warm Home Discount for your electricity bill, and even a heat pump grant through BUS. Our checker will show you all your options.',
      },
    ],
  },
  {
    name: 'The Process',
    faqs: [
      {
        question: 'How long does the whole process take?',
        answer: 'The eligibility check takes about 2 minutes. If you\'re eligible and want to proceed, an installer typically contacts you within 48 hours. A property survey is usually scheduled within 1-2 weeks. Installation timing depends on the work - simple loft insulation might be done in a day, while more complex work like solid wall insulation can take several weeks.',
      },
      {
        question: 'What happens during the property survey?',
        answer: 'A qualified surveyor will visit your home to assess your current insulation, heating system, and the property\'s construction. They\'ll confirm which measures are suitable and verify your eligibility. The survey typically takes 30-60 minutes and is completely free with no obligation.',
      },
      {
        question: 'Do I need to be home during the installation?',
        answer: 'Yes, an adult (18+) needs to be present during the installation. For multi-day projects, you\'ll need to arrange access each day. The installer will give you a clear idea of timings and what to expect before the work begins.',
      },
      {
        question: 'Is the work guaranteed?',
        answer: 'Yes. All work done under ECO4 must be completed by TrustMark-registered installers and comes with guarantees. Insulation measures typically come with a 25-year guarantee, while heating systems come with manufacturer warranties. Details are provided before work begins.',
      },
    ],
  },
  {
    name: 'Costs & Payments',
    faqs: [
      {
        question: 'Are these grants really 100% free?',
        answer: 'If you meet the eligibility criteria, yes - the work is completely free. The funding comes from government schemes (like the Boiler Upgrade Scheme) and obligations on energy companies (ECO4, GBIS). You won\'t pay for the survey, materials, or installation.',
      },
      {
        question: 'Is there any catch or hidden costs?',
        answer: 'No catches. You won\'t be asked to pay anything, sign up for products, change your energy supplier, or enter into any financial agreement. The only requirement is that you meet the eligibility criteria and allow the work to be completed.',
      },
      {
        question: 'Will this affect my benefits?',
        answer: 'No, receiving energy efficiency improvements does not affect your benefits. These are in-kind improvements to your property, not income or capital, so they have no impact on means-tested benefits.',
      },
      {
        question: 'Will my energy bills go up or down?',
        answer: 'Energy efficiency improvements should reduce your energy bills. Better insulation means you need less heating to stay warm, and more efficient heating systems use less energy. The exact savings depend on your property and usage, but most households see noticeable reductions.',
      },
    ],
  },
  {
    name: 'Types of Improvements',
    faqs: [
      {
        question: 'What improvements can I get?',
        answer: 'Available improvements include: loft insulation, cavity wall insulation, solid wall insulation (internal or external), boiler repairs and replacements, heating controls and smart thermostats, room-in-roof insulation, underfloor insulation, and first-time central heating. The specific measures depend on your eligibility and what your home needs.',
      },
      {
        question: 'Can I choose which improvements I want?',
        answer: 'The measures offered depend on your property\'s needs and what will make the biggest difference to your energy efficiency. Schemes like ECO4 follow a "fabric first" approach, prioritising insulation before heating upgrades. The surveyor will recommend appropriate measures.',
      },
      {
        question: 'What if my home is unsuitable for certain measures?',
        answer: 'Not all properties are suitable for all measures. For example, some walls can\'t have cavity insulation due to structural issues or exposure. The surveyor will assess your property and recommend only suitable measures. If one measure isn\'t appropriate, others might still be available.',
      },
      {
        question: 'Will insulation cause any problems in my home?',
        answer: 'When properly installed by qualified professionals, insulation should not cause problems. In fact, it often improves comfort and reduces issues like condensation by keeping surfaces warmer. The surveyor will check your property\'s suitability and any potential concerns will be addressed before work begins.',
      },
    ],
  },
  {
    name: 'Specific Schemes',
    faqs: [
      {
        question: 'What\'s the difference between ECO4 and GBIS?',
        answer: 'ECO4 offers a wider range of measures (insulation and heating) but typically requires benefit receipt or LA Flex eligibility. GBIS focuses specifically on single insulation measures and is available to a broader range of households - including those who don\'t receive benefits but live in properties with EPC rating D or E.',
      },
      {
        question: 'How is LA Flex different from standard ECO4?',
        answer: 'LA Flex is a route into ECO4 for households who don\'t receive qualifying benefits but are still in need - such as low-income households, those in fuel poverty, or people with health conditions affected by cold. Your local council declares you eligible, and you can then access the same measures as standard ECO4.',
      },
      {
        question: 'Can I get a heat pump for free?',
        answer: 'The Boiler Upgrade Scheme provides grants of up to £7,500 towards heat pump costs, but this is a contribution rather than full funding - you\'ll typically pay the remaining amount. However, if you qualify for ECO4, you might be able to get free heating system upgrades including, in some cases, air source heat pumps.',
      },
      {
        question: 'Do I need to do anything to receive the Warm Home Discount?',
        answer: 'For most eligible households, the £150 Warm Home Discount is applied automatically. You should receive a letter from DWP between September and October confirming your eligibility if you\'re in Core Group 2. The discount will then be applied to your electricity bill without you needing to do anything.',
      },
    ],
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Frequently Asked Questions"
      subtitle="Help & Support"
      description="Find answers to common questions about UK energy grants, eligibility, and the application process."
      variant="default"
    />

    <!-- FAQ Categories -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Quick Nav -->
        <nav class="mb-12 flex flex-wrap gap-2 justify-center" aria-label="FAQ categories">
          <a
            v-for="category in categories"
            :key="category.name"
            :href="`#${category.name.toLowerCase().replace(/\s+/g, '-')}`"
            class="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
          >
            {{ category.name }}
          </a>
        </nav>

        <!-- FAQ Sections -->
        <div class="space-y-16">
          <section
            v-for="category in categories"
            :key="category.name"
            :id="category.name.toLowerCase().replace(/\s+/g, '-')"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              {{ category.name }}
            </h2>
            <FaqAccordion :items="category.faqs" />
          </section>
        </div>
      </div>
    </section>

    <!-- Still Have Questions -->
    <section class="py-16 md:py-24 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-soft">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Still Have Questions?
              </h2>
              <p class="text-lg text-neutral-600 mb-6">
                Can't find the answer you're looking for? Our team is here to help. Get in touch and we'll respond within 24 hours.
              </p>
              <div class="space-y-4">
                <a
                  href="mailto:hello@ugrant.co.uk"
                  class="flex items-center gap-3 text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@ugrant.co.uk
                </a>
                <a
                  href="tel:08001234567"
                  class="flex items-center gap-3 text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0800 123 4567
                </a>
              </div>
            </div>
            <div class="text-center lg:text-right">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors"
              >
                Contact Us
                <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Check Your Eligibility?
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Stop wondering and find out for sure. Our free eligibility checker takes just 2 minutes.
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
