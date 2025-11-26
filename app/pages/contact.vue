<script setup lang="ts">
useHead({
  title: 'Contact Us',
})

useSeoMeta({
  description: 'Get in touch with uGrant. We\'re here to help with questions about energy grants, eligibility, or our installer partnership programme.',
  ogTitle: 'Contact Us | uGrant',
  ogDescription: 'Contact uGrant for questions about UK energy grants and eligibility.',
})

const contactMethods = [
  {
    title: 'Email Us',
    description: 'For general enquiries and support',
    detail: 'hello@ugrant.co.uk',
    href: 'mailto:hello@ugrant.co.uk',
    icon: 'email',
  },
  {
    title: 'Call Us',
    description: 'Mon-Fri, 9am-5pm',
    detail: '0800 123 4567',
    href: 'tel:08001234567',
    icon: 'phone',
  },
  {
    title: 'Installer Partnerships',
    description: 'Join our installer network',
    detail: 'partners@ugrant.co.uk',
    href: 'mailto:partners@ugrant.co.uk',
    icon: 'users',
  },
]

const iconPaths: Record<string, string> = {
  email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
}
</script>

<template>
  <div>
    <!-- Hero -->
    <HeroSection
      title="Contact Us"
      subtitle="Get In Touch"
      description="Have a question about energy grants or need help with your application? We're here to help."
      variant="default"
    />

    <!-- Contact Methods -->
    <section class="py-16 md:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <a
            v-for="method in contactMethods"
            :key="method.title"
            :href="method.href"
            class="bg-neutral-50 rounded-2xl p-6 md:p-8 text-center hover:bg-primary-50 transition-colors group"
          >
            <div class="w-14 h-14 bg-primary-100 group-hover:bg-primary-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
              <svg
                class="w-7 h-7 text-primary-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="iconPaths[method.icon]"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-1">{{ method.title }}</h3>
            <p class="text-sm text-neutral-500 mb-2">{{ method.description }}</p>
            <p class="text-primary-700 font-semibold">{{ method.detail }}</p>
          </a>
        </div>

        <!-- Contact Form Section -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              Send Us a Message
            </h2>
            <p class="text-neutral-600 mb-8">
              Fill out the form and we'll get back to you within 24 hours. For urgent enquiries, please call our freephone number.
            </p>

            <div class="bg-neutral-50 rounded-2xl p-6 md:p-8">
              <h3 class="font-semibold text-neutral-900 mb-4">Before you contact us</h3>
              <p class="text-neutral-600 mb-4">
                Many questions can be answered quickly by checking our resources:
              </p>
              <ul class="space-y-3">
                <li>
                  <NuxtLink
                    to="/faq"
                    class="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Frequently Asked Questions
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/how-it-works"
                    class="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    How It Works
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/schemes"
                    class="flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Available Schemes
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Response Time -->
    <section class="py-12 bg-neutral-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-neutral-900 mb-2">Our Response Times</h3>
          <p class="text-neutral-600">
            We aim to respond to all enquiries within 24 hours during business days. For eligibility questions, we recommend using our
            <NuxtLink to="/eligibility" class="text-primary-700 hover:underline font-medium">free eligibility checker</NuxtLink>
            for instant results.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-primary-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Prefer to Check Your Eligibility First?
        </h2>
        <p class="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
          Our free eligibility checker will tell you which energy grants you could qualify for in under 2 minutes. No need to wait for a response.
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
