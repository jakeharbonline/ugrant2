// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      exclude: ['/', '/auth/*'],
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  runtimeConfig: {
    // Server-only (private) keys
    epcApiEmail: process.env.EPC_API_EMAIL || '',
    epcApiKey: process.env.EPC_API_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',

    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY || '',
    }
  }
})
