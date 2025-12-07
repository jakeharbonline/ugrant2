<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

useHead({
  title: 'Installers - uGrant Admin',
})

const { installers, loading, error, totalCount, fetchInstallers, toggleActive, deleteInstaller } = useAdminInstallers()

// Filters
const filters = reactive({
  active: 'all' as boolean | 'all',
  search: '',
})

const currentPage = ref(1)
const perPage = 20

// Fetch installers on mount and when filters change
async function loadInstallers() {
  await fetchInstallers(filters, currentPage.value, perPage)
}

onMounted(loadInstallers)

watch([filters, currentPage], loadInstallers, { deep: true })

// Delete confirmation
const deleteConfirmId = ref<string | null>(null)

async function confirmDelete(id: string) {
  if (await deleteInstaller(id)) {
    deleteConfirmId.value = null
  }
}

// Toggle active status
async function handleToggleActive(id: string, currentStatus: boolean) {
  await toggleActive(id, !currentStatus)
  await loadInstallers()
}

// Format helpers
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

const totalPages = computed(() => Math.ceil(totalCount.value / perPage))
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Installers</h1>
        <p class="text-neutral-600 mt-1">Manage installer accounts and settings</p>
      </div>
      <NuxtLink
        to="/admin/installers/new"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Installer
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Search -->
        <div>
          <label for="search" class="block text-sm font-medium text-neutral-700 mb-1">Search</label>
          <input
            id="search"
            v-model="filters.search"
            type="text"
            placeholder="Name, company, email..."
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <!-- Status filter -->
        <div>
          <label for="status" class="block text-sm font-medium text-neutral-700 mb-1">Status</label>
          <select
            id="status"
            v-model="filters.active"
            class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All</option>
            <option :value="true">Active</option>
            <option :value="false">Inactive</option>
          </select>
        </div>

        <!-- Results count -->
        <div class="flex items-end">
          <p class="text-sm text-neutral-600">
            Showing <span class="font-medium">{{ installers.length }}</span> of
            <span class="font-medium">{{ totalCount }}</span> installers
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
        <span class="ml-3 text-neutral-600">Loading installers...</span>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="installers.length === 0" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
      <svg class="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <h3 class="text-lg font-medium text-neutral-900 mb-1">No installers found</h3>
      <p class="text-neutral-600 mb-4">Get started by adding your first installer.</p>
      <NuxtLink
        to="/admin/installers/new"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
      >
        Add Installer
      </NuxtLink>
    </div>

    <!-- Installers table -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Installer
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Contact
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Lead Price
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Stats
              </th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100">
            <tr
              v-for="installer in installers"
              :key="installer.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <!-- Installer -->
              <td class="px-4 py-4">
                <div>
                  <p class="font-medium text-neutral-900">{{ installer.name }}</p>
                  <p v-if="installer.company_name" class="text-sm text-neutral-500">{{ installer.company_name }}</p>
                </div>
              </td>

              <!-- Contact -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-neutral-900">{{ installer.email }}</p>
                  <p v-if="installer.phone" class="text-neutral-500">{{ installer.phone }}</p>
                </div>
              </td>

              <!-- Lead Price -->
              <td class="px-4 py-4">
                <span class="font-medium text-neutral-900">{{ formatCurrency(installer.default_lead_price) }}</span>
              </td>

              <!-- Stats -->
              <td class="px-4 py-4">
                <div class="text-sm">
                  <p class="text-neutral-900">{{ installer.total_leads_purchased }} leads</p>
                  <p class="text-neutral-500">{{ formatCurrency(installer.total_spent) }} spent</p>
                </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-4">
                <div class="flex flex-col gap-1">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit',
                      installer.active ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'
                    ]"
                  >
                    {{ installer.active ? 'Active' : 'Inactive' }}
                  </span>
                  <span
                    v-if="installer.verified"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit"
                  >
                    Verified
                  </span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-4 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    :to="`/admin/installers/${installer.id}`"
                    class="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </NuxtLink>
                  <button
                    type="button"
                    class="p-2 text-neutral-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    :title="installer.active ? 'Deactivate' : 'Activate'"
                    @click="handleToggleActive(installer.id, installer.active)"
                  >
                    <svg v-if="installer.active" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                    @click="deleteConfirmId = installer.id"
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
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Delete Installer?</h3>
            <p class="text-neutral-600 mb-6">
              This will permanently delete the installer. This action cannot be undone.
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
