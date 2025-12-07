<script setup lang="ts">
import type { InstallerFormData } from '~/composables/useAdminInstallers'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

useHead({
  title: 'Add Installer - uGrant Admin',
})

const router = useRouter()
const { createInstaller } = useAdminInstallers()

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

  const installer = await createInstaller(form)

  if (installer) {
    router.push('/admin/installers')
  } else {
    error.value = 'Failed to create installer. Please try again.'
    saving.value = false
  }
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

    <div class="max-w-2xl">
      <h1 class="text-2xl font-bold text-neutral-900 mb-6">Add New Installer</h1>

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
                placeholder="John Smith"
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
                placeholder="ABC Heating Ltd"
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
                  placeholder="john@example.com"
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
                  placeholder="07123 456789"
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
            <p class="mt-1 text-sm text-neutral-500">
              The price charged to this installer for each lead
            </p>
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
            {{ saving ? 'Creating...' : 'Create Installer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
