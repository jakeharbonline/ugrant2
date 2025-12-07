<script setup lang="ts">
import type { Installer, InstallerFormData } from '~/composables/useAdminInstallers'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const route = useRoute()
const router = useRouter()

const installerId = computed(() => route.params.id as string)

const { getInstaller, updateInstaller, deleteInstaller } = useAdminInstallers()

const installer = ref<Installer | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const form = reactive<InstallerFormData>({
  name: '',
  company_name: '',
  email: '',
  phone: '',
  default_lead_price: 50,
  coverage_regions: [],
  coverage_postcodes: [],
  schemes_covered: [],
  active: true,
  verified: false,
})

// Load installer
onMounted(async () => {
  installer.value = await getInstaller(installerId.value)
  if (installer.value) {
    // Populate form
    form.name = installer.value.name
    form.company_name = installer.value.company_name || ''
    form.email = installer.value.email
    form.phone = installer.value.phone || ''
    form.default_lead_price = installer.value.default_lead_price
    form.coverage_regions = installer.value.coverage_regions || []
    form.coverage_postcodes = installer.value.coverage_postcodes || []
    form.schemes_covered = installer.value.schemes_covered || []
    form.active = installer.value.active
    form.verified = installer.value.verified
  }
  loading.value = false
})

useHead({
  title: computed(() => installer.value ? `${installer.value.name} - uGrant Admin` : 'Installer - uGrant Admin'),
})

// Available options
const regionOptions = [
  'North East',
  'North West',
  'Yorkshire',
  'East Midlands',
  'West Midlands',
  'East of England',
  'London',
  'South East',
  'South West',
  'Wales',
  'Scotland',
  'Northern Ireland',
]

const schemeOptions = [
  'ECO4',
  'GBIS',
  'Warm Home Discount',
  'Boiler Upgrade Scheme',
  'LA Flex',
]

// Postcode input handling
const postcodeInput = ref('')

function addPostcode() {
  const postcode = postcodeInput.value.trim().toUpperCase()
  if (postcode && !form.coverage_postcodes.includes(postcode)) {
    form.coverage_postcodes.push(postcode)
    postcodeInput.value = ''
  }
}

function removePostcode(postcode: string) {
  const idx = form.coverage_postcodes.indexOf(postcode)
  if (idx !== -1) {
    form.coverage_postcodes.splice(idx, 1)
  }
}

// Form submission
async function handleSubmit() {
  // Validation
  if (!form.name.trim()) {
    error.value = 'Name is required'
    return
  }
  if (!form.email.trim()) {
    error.value = 'Email is required'
    return
  }
  if (form.default_lead_price < 0) {
    error.value = 'Lead price must be a positive number'
    return
  }

  saving.value = true
  error.value = ''

  const success = await updateInstaller(installerId.value, form)

  if (success) {
    router.push('/admin/installers')
  } else {
    error.value = 'Failed to update installer. Please try again.'
    saving.value = false
  }
}

// Delete
const showDeleteConfirm = ref(false)

async function handleDelete() {
  if (await deleteInstaller(installerId.value)) {
    router.push('/admin/installers')
  }
}

// Format helpers
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}
</script>

<template>
  <div>
    <!-- Back button -->
    <NuxtLink
      to="/admin/installers"
      class="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to installers
    </NuxtLink>

    <!-- Loading state -->
    <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
      <div class="flex items-center justify-center">
        <svg class="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span class="ml-3 text-neutral-600">Loading installer...</span>
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!installer" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
      <h2 class="text-xl font-semibold text-neutral-900 mb-2">Installer not found</h2>
      <p class="text-neutral-600">This installer may have been deleted or doesn't exist.</p>
    </div>

    <!-- Edit form -->
    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Error message -->
            <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {{ error }}
            </div>

            <!-- Basic info -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 class="text-lg font-semibold text-neutral-900 mb-4">Basic Information</h2>
              <div class="space-y-4">
                <div>
                  <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">
                    Contact Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label for="company_name" class="block text-sm font-medium text-neutral-700 mb-1">
                    Company Name
                  </label>
                  <input
                    id="company_name"
                    v-model="form.company_name"
                    type="text"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 class="text-lg font-semibold text-neutral-900 mb-4">Pricing</h2>
              <div>
                <label for="default_lead_price" class="block text-sm font-medium text-neutral-700 mb-1">
                  Default Lead Price (GBP)
                </label>
                <input
                  id="default_lead_price"
                  v-model.number="form.default_lead_price"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <!-- Coverage -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 class="text-lg font-semibold text-neutral-900 mb-4">Coverage Area</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">
                    Regions
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <label
                      v-for="region in regionOptions"
                      :key="region"
                      class="flex items-center gap-2"
                    >
                      <input
                        v-model="form.coverage_regions"
                        type="checkbox"
                        :value="region"
                        class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span class="text-sm text-neutral-700">{{ region }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">
                    Postcode Areas
                  </label>
                  <div class="flex gap-2 mb-2">
                    <input
                      v-model="postcodeInput"
                      type="text"
                      placeholder="e.g. M1, M2, SW1"
                      class="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      @keyup.enter.prevent="addPostcode"
                    />
                    <button
                      type="button"
                      class="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200"
                      @click="addPostcode"
                    >
                      Add
                    </button>
                  </div>
                  <div v-if="form.coverage_postcodes.length > 0" class="flex flex-wrap gap-2">
                    <span
                      v-for="postcode in form.coverage_postcodes"
                      :key="postcode"
                      class="inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-sm"
                    >
                      {{ postcode }}
                      <button
                        type="button"
                        class="text-neutral-400 hover:text-neutral-600"
                        @click="removePostcode(postcode)"
                      >
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Schemes -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 class="text-lg font-semibold text-neutral-900 mb-4">Schemes Covered</h2>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <label
                  v-for="scheme in schemeOptions"
                  :key="scheme"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="form.schemes_covered"
                    type="checkbox"
                    :value="scheme"
                    class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-neutral-700">{{ scheme }}</span>
                </label>
              </div>
            </div>

            <!-- Status -->
            <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 class="text-lg font-semibold text-neutral-900 mb-4">Status</h2>
              <div class="space-y-3">
                <label class="flex items-center gap-3">
                  <input
                    v-model="form.active"
                    type="checkbox"
                    class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <span class="text-sm font-medium text-neutral-700">Active</span>
                    <p class="text-sm text-neutral-500">Installer can receive leads</p>
                  </div>
                </label>

                <label class="flex items-center gap-3">
                  <input
                    v-model="form.verified"
                    type="checkbox"
                    class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <span class="text-sm font-medium text-neutral-700">Verified</span>
                    <p class="text-sm text-neutral-500">Installer has been verified</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Submit -->
            <div class="flex gap-3">
              <NuxtLink
                to="/admin/installers"
                class="px-6 py-2.5 text-neutral-700 bg-white border border-neutral-300 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </NuxtLink>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Stats -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Statistics</h2>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-neutral-500">Leads Purchased</p>
                <p class="text-2xl font-bold text-neutral-900">{{ installer.total_leads_purchased }}</p>
              </div>
              <div>
                <p class="text-sm text-neutral-500">Total Spent</p>
                <p class="text-2xl font-bold text-neutral-900">{{ formatCurrency(installer.total_spent) }}</p>
              </div>
            </div>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Timeline</h2>
            <div class="space-y-4 text-sm">
              <div class="flex gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                <div>
                  <p class="font-medium text-neutral-900">Created</p>
                  <p class="text-neutral-500">{{ formatDate(installer.created_at) }}</p>
                </div>
              </div>
              <div v-if="installer.updated_at !== installer.created_at" class="flex gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                <div>
                  <p class="font-medium text-neutral-900">Last updated</p>
                  <p class="text-neutral-500">{{ formatDate(installer.updated_at) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Danger zone -->
          <div class="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <h2 class="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
            <p class="text-sm text-neutral-600 mb-4">
              Permanently delete this installer and all associated data.
            </p>
            <button
              type="button"
              class="w-full px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              @click="showDeleteConfirm = true"
            >
              Delete Installer
            </button>
          </div>
        </div>
      </div>
    </template>

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
          v-if="showDeleteConfirm"
          class="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50 p-4"
          @click.self="showDeleteConfirm = false"
        >
          <div class="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">Delete Installer?</h3>
            <p class="text-neutral-600 mb-6">
              This will permanently delete <strong>{{ installer?.name }}</strong>. This action cannot be undone.
            </p>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2 text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                @click="showDeleteConfirm = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                @click="handleDelete"
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
