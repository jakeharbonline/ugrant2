<script setup lang="ts">
// Global app configuration and meta tags
useHead({
  htmlAttrs: {
    lang: 'en-GB',
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    },
  ],
})

// Global SEO defaults
useSeoMeta({
  titleTemplate: '%s | uGrant - UK Energy Scheme Eligibility',
  ogSiteName: 'uGrant',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Base styles */
html {
  scroll-behavior: smooth;
}

/* Focus visible styles for accessibility */
:focus-visible {
  outline: 3px solid #15803d;
  outline-offset: 2px;
}

/* Remove focus ring for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
</style>
