<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

useHead({
  title: 'Dashboard - uGrant Admin',
})

const { getStats } = useAdminLeads()

const stats = ref({
  total: 0,
  new: 0,
  sent: 0,
  purchased: 0,
  byTier: { eligible: 0, potentially_eligible: 0, not_eligible: 0 },
})
const loading = ref(true)

onMounted(async () => {
  stats.value = await getStats()
  loading.value = false
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p class="text-neutral-600 mt-1">Overview of your lead management system</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Leads -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-600">Total Leads</p>
            <p class="text-3xl font-bold text-neutral-900 mt-1">
              <span v-if="loading" class="animate-pulse">...</span>
              <span v-else>{{ stats.total }}</span>
            </p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- New Leads -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-600">New Leads</p>
            <p class="text-3xl font-bold text-green-600 mt-1">
              <span v-if="loading" class="animate-pulse">...</span>
              <span v-else>{{ stats.new }}</span>
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Sent to Installers -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-600">Sent</p>
            <p class="text-3xl font-bold text-amber-600 mt-1">
              <span v-if="loading" class="animate-pulse">...</span>
              <span v-else>{{ stats.sent }}</span>
            </p>
          </div>
          <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Purchased -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-600">Purchased</p>
            <p class="text-3xl font-bold text-blue-600 mt-1">
              <span v-if="loading" class="animate-pulse">...</span>
              <span v-else>{{ stats.purchased }}</span>
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Eligibility breakdown -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-8">
      <h2 class="text-lg font-semibold text-neutral-900 mb-4">Eligibility Breakdown</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-green-50 rounded-lg">
          <p class="text-sm font-medium text-green-800">Eligible</p>
          <p class="text-2xl font-bold text-green-600 mt-1">
            <span v-if="loading" class="animate-pulse">...</span>
            <span v-else>{{ stats.byTier.eligible }}</span>
          </p>
        </div>
        <div class="p-4 bg-amber-50 rounded-lg">
          <p class="text-sm font-medium text-amber-800">Potentially Eligible</p>
          <p class="text-2xl font-bold text-amber-600 mt-1">
            <span v-if="loading" class="animate-pulse">...</span>
            <span v-else>{{ stats.byTier.potentially_eligible }}</span>
          </p>
        </div>
        <div class="p-4 bg-neutral-100 rounded-lg">
          <p class="text-sm font-medium text-neutral-800">Not Eligible</p>
          <p class="text-2xl font-bold text-neutral-600 mt-1">
            <span v-if="loading" class="animate-pulse">...</span>
            <span v-else>{{ stats.byTier.not_eligible }}</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
      <h2 class="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          to="/admin/leads"
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View All Leads
        </NuxtLink>
        <NuxtLink
          to="/admin/leads?status=new"
          class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Leads ({{ stats.new }})
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
