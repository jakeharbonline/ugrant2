<script setup lang="ts">
import type { Database } from '~/types/database.types'

type LeadStatus = Database['public']['Enums']['lead_status']
type EligibilityTier = Database['public']['Enums']['eligibility_tier']

definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Leads - uGrant Admin',
})

const route = useRoute()
const router = useRouter()

const { leads, loading, error, totalCount, fetchLeads, deleteLead } = useAdminLeads()

// Filters from query params
const filters = reactive({
  status: (route.query.status as LeadStatus | 'all') || 'all',
  eligibilityTier: (route.query.tier as EligibilityTier | 'all') || 'all',
  search: (route.query.search as string) || '',
})

const currentPage = ref(Number(route.query.page) || 1)
const perPage = 20

// Fetch leads on mount and when filters change
async function loadLeads() {
  await fetchLeads(filters, currentPage.value, perPage)
}

onMounted(loadLeads)

watch([filters, currentPage], () => {
  // Update URL
  router.replace({
    query: {
      ...(filters.status !== 'all' && { status: filters.status }),
      ...(filters.eligibilityTier !== 'all' && { tier: filters.eligibilityTier }),
      ...(filters.search && { search: filters.search }),
      ...(currentPage.value > 1 && { page: currentPage.value }),
    },
  })
  loadLeads()
}, { deep: true })

// Delete confirmation
const deleteConfirmId = ref<string | null>(null)

async function confirmDelete(id: string) {
  if (await deleteLead(id)) {
    deleteConfirmId.value = null
  }
}

// Format helpers
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getStatusBadgeClass(status: LeadStatus) {
  const classes: Record<LeadStatus, string> = {
    new: 'bg-green-100 text-green-800',
    sent: 'bg-amber-100 text-amber-800',
    purchased: 'bg-blue-100 text-blue-800',
    resent: 'bg-purple-100 text-purple-800',
    archived: 'bg-neutral-100 text-neutral-800',
    deleted: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

function getTierBadgeClass(tier: EligibilityTier) {
  const classes: Record<EligibilityTier, string> = {
    eligible: 'bg-green-100 text-green-800',
    potentially_eligible: 'bg-amber-100 text-amber-800',
    not_eligible: 'bg-neutral-100 text-neutral-600',
  }
  return classes[tier] || 'bg-neutral-100 text-neutral-600'
}

function formatTier(tier: EligibilityTier) {
  const labels: Record<EligibilityTier, string> = {
    eligible: 'Eligible',
    potentially_eligible: 'Potential',
    not_eligible: 'Not Eligible',
  }
  return labels[tier] || tier
}

const totalPages = computed(() => Math.ceil(totalCount.value / perPage))
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Leads</h1>
        <p class="text-neutral-600 mt-1">Manage and track all leads</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-neutral-700 mb-1">Search</label>
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="Postcode, email, phone..."
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <!-- Status filter -->
        <div>
          <label for="status" class="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select
            id="status"
            v-model="filters.status"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="sent">Sent</option>
            <option value="purchased">Purchased</option>
            <option value="resent">Resent</option>
            <option value="archived">Archived</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        <!-- Eligibility filter -->
        <div>
          <label for="tier" class="block text-sm font-medium text-neutral-700 mb-1">Eligibility</label>
          <select
            id="tier"
            v-model="filters.eligibilityTier"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Tiers</option>
            <option value="eligible">Eligible</option>
            <option value="potentially_eligible">Potentially Eligible</option>
            <option value="not_eligible">Not Eligible</option>
          </select>
        </div>

        <!-- Results count -->
        <div class="flex items-end">
          <p class="text-sm text-neutral-600">
            Showing <span class="font-medium">{{ leads.length }}</span> of
            <span class="font-medium">{{ totalCount }}</span> leads
          </p>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <p class="text-red-800">{{ error }}</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
      <div class="flex items-center justify-center">
        <svg class="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span class="ml-3 text-neutral-600">Loading leads...</span>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="leads.length === 0" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
      <svg class="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="text-lg font-medium text-neutral-900 mb-1">No leads found</h3>
      <p class="text-neutral-600">Try adjusting your filters or check back later.</p>
    </div>

    <!-- Leads table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Property
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Eligibility
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Created
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100">
            <tr
              v-for="lead in leads"
              :key="lead.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <!-- Contact -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="font-medium text-neutral-900">{{ lead.email || 'No email' }}</p>
                  <p class="text-neutral-500">{{ lead.phone || 'No phone' }}</p>
                </div>
              </td>

              <!-- Property -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="font-medium text-neutral-900">{{ lead.postcode }}</p>
                  <p class="text-neutral-500 capitalize">{{ lead.property_type?.replace(/-/g, ' ') }}</p>
                </div>
              </td>

              <!-- Eligibility -->
              <td class="px-4 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getTierBadgeClass(lead.eligibility_tier)
                  ]"
                >
                  {{ formatTier(lead.eligibility_tier) }}
                </span>
                <p v-if="lead.eligible_schemes?.length" class="text-xs text-neutral-500 mt-1">
                  {{ lead.eligible_schemes.length }} scheme(s)
                </p>
              </td>

              <!-- Status -->
              <td class="px-4 py-4">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                    getStatusBadgeClass(lead.status)
                  ]"
                >
                  {{ lead.status }}
                </span>
              </td>

              <!-- Created -->
              <td class="px-4 py-4 text-sm text-neutral-600">
                {{ formatDate(lead.created_at) }}
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/leads/${lead.id}`"
                    class="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View details"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </NuxtLink>
                  <button
                    v-if="lead.status !== 'deleted'"
                    type="button"
                    class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                    @click="deleteConfirmId = lead.id"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-4 py-3 border-t border-neutral-200 flex items-center justify-between">
        <button
          type="button"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="currentPage--"
        >
          Previous
        </button>
        <span class="text-sm text-neutral-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="deleteConfirmId"
          class="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4"
          @click.self="deleteConfirmId = null"
        >
          <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Delete Lead?</h3>
            <p class="text-neutral-600 mb-6">
              This will soft-delete the lead. You can restore it later if needed.
            </p>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                @click="deleteConfirmId = null"
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                @click="confirmDelete(deleteConfirmId!)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
