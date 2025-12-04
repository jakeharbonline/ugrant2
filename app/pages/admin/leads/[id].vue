<script setup lang="ts">
import type { Database } from '~/types/database.types'

type Lead = Database['public']['Tables']['leads']['Row']
type LeadStatus = Database['public']['Enums']['lead_status']

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()

const leadId = computed(() => route.params.id as string)

const { getLead, updateStatus, updatePrice, addNote, deleteLead, restoreLead } = useAdminLeads()

const lead = ref<Lead | null>(null)
const loading = ref(true)
const saving = ref(false)

// Form state
const newNote = ref('')
const newPrice = ref<number | null>(null)

// Load lead
onMounted(async () => {
  lead.value = await getLead(leadId.value)
  if (lead.value) {
    newPrice.value = lead.value.price
  }
  loading.value = false
})

useHead({
  title: computed(() => lead.value ? `Lead ${lead.value.postcode} - uGrant Admin` : 'Lead - uGrant Admin'),
})

// Actions
async function handleStatusChange(status: LeadStatus) {
  if (!lead.value) return
  saving.value = true
  if (await updateStatus(lead.value.id, status)) {
    lead.value.status = status
  }
  saving.value = false
}

async function handlePriceUpdate() {
  if (!lead.value || newPrice.value === null) return
  saving.value = true
  if (await updatePrice(lead.value.id, newPrice.value)) {
    lead.value.price = newPrice.value
  }
  saving.value = false
}

async function handleAddNote() {
  if (!lead.value || !newNote.value.trim()) return
  saving.value = true
  if (await addNote(lead.value.id, newNote.value.trim())) {
    // Refresh lead to get updated notes
    lead.value = await getLead(leadId.value)
    newNote.value = ''
  }
  saving.value = false
}

async function handleDelete() {
  if (!lead.value) return
  if (await deleteLead(lead.value.id)) {
    router.push('/admin/leads')
  }
}

async function handleRestore() {
  if (!lead.value) return
  saving.value = true
  if (await restoreLead(lead.value.id)) {
    lead.value.status = 'new'
    lead.value.deleted_at = null
  }
  saving.value = false
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

const statusOptions: LeadStatus[] = ['new', 'sent', 'purchased', 'resent', 'archived']
</script>

<template>
  <div>
    <!-- Back button -->
    <NuxtLink
      to="/admin/leads"
      class="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to leads
    </NuxtLink>

    <!-- Loading state -->
    <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
      <div class="flex items-center justify-center">
        <svg class="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span class="ml-3 text-neutral-600">Loading lead...</span>
      </div>
    </div>

    <!-- Not found -->
    <div v-else-if="!lead" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
      <h2 class="text-xl font-semibold text-neutral-900 mb-2">Lead not found</h2>
      <p class="text-neutral-600">This lead may have been deleted or doesn't exist.</p>
    </div>

    <!-- Lead details -->
    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Header -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-2xl font-bold text-neutral-900">{{ lead.postcode }}</h1>
                <p class="text-neutral-600">Created {{ formatDate(lead.created_at) }}</p>
              </div>
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize',
                  getStatusBadgeClass(lead.status)
                ]"
              >
                {{ lead.status }}
              </span>
            </div>

            <!-- Deleted banner -->
            <div v-if="lead.status === 'deleted'" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div class="flex items-center justify-between">
                <p class="text-red-800">This lead has been deleted</p>
                <button
                  type="button"
                  class="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                  :disabled="saving"
                  @click="handleRestore"
                >
                  Restore
                </button>
              </div>
            </div>

            <!-- Contact details -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Email</label>
                <p class="text-neutral-900">{{ lead.email || 'Not provided' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Phone</label>
                <p class="text-neutral-900">{{ lead.phone || 'Not provided' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Wants contact</label>
                <p class="text-neutral-900">{{ lead.wants_installer_contact ? 'Yes' : 'No' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Consent</label>
                <p class="text-neutral-900">
                  {{ lead.accepted_terms && lead.accepted_privacy ? 'Given' : 'Not given' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Property details -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Property Details</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Property Type</label>
                <p class="text-neutral-900 capitalize">{{ lead.property_type?.replace(/-/g, ' ') }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Tenure</label>
                <p class="text-neutral-900 capitalize">{{ lead.tenure?.replace(/-/g, ' ') }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Heating Type</label>
                <p class="text-neutral-900 capitalize">{{ lead.heating_type?.replace(/-/g, ' ') }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">EPC Rating</label>
                <p class="text-neutral-900">{{ lead.epc_rating || 'Unknown' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Insulation</label>
                <p class="text-neutral-900">
                  {{ lead.insulation?.length ? lead.insulation.join(', ').replace(/-/g, ' ') : 'None specified' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-500 mb-1">Income Band</label>
                <p class="text-neutral-900">{{ lead.income_band || 'Not specified' }}</p>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div v-if="lead.benefits?.length" class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Benefits</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="benefit in lead.benefits"
                :key="benefit"
                class="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {{ benefit.replace(/-/g, ' ') }}
              </span>
            </div>
          </div>

          <!-- Eligibility -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Eligibility</h2>
            <div class="mb-4">
              <span
                :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  lead.eligibility_tier === 'eligible' ? 'bg-green-100 text-green-800' :
                  lead.eligibility_tier === 'potentially_eligible' ? 'bg-amber-100 text-amber-800' :
                  'bg-neutral-100 text-neutral-800'
                ]"
              >
                {{ lead.eligibility_tier === 'eligible' ? 'Eligible' :
                   lead.eligibility_tier === 'potentially_eligible' ? 'Potentially Eligible' :
                   'Not Eligible' }}
              </span>
            </div>
            <div v-if="lead.eligible_schemes?.length">
              <label class="block text-sm font-medium text-neutral-500 mb-2">Eligible Schemes</label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="scheme in lead.eligible_schemes"
                  :key="scheme"
                  class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {{ scheme }}
                </span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Notes</h2>
            <div v-if="lead.notes" class="bg-neutral-50 rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm text-neutral-700">
              {{ lead.notes }}
            </div>
            <div v-else class="text-neutral-500 mb-4">No notes yet</div>

            <!-- Add note form -->
            <div class="flex gap-3">
              <textarea
                v-model="newNote"
                rows="2"
                placeholder="Add a note..."
                class="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              />
              <button
                type="button"
                class="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 self-end"
                :disabled="!newNote.trim() || saving"
                @click="handleAddNote"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Actions -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Actions</h2>

            <!-- Status change -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Change Status</label>
              <select
                :value="lead.status"
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                :disabled="lead.status === 'deleted' || saving"
                @change="handleStatusChange(($event.target as HTMLSelectElement).value as LeadStatus)"
              >
                <option v-for="status in statusOptions" :key="status" :value="status" class="capitalize">
                  {{ status }}
                </option>
              </select>
            </div>

            <!-- Price -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Lead Price (GBP)</label>
              <div class="flex gap-2">
                <input
                  v-model.number="newPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :disabled="saving"
                />
                <button
                  type="button"
                  class="px-3 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 disabled:opacity-50"
                  :disabled="saving"
                  @click="handlePriceUpdate"
                >
                  Set
                </button>
              </div>
            </div>

            <hr class="my-4 border-neutral-200" />

            <!-- Delete -->
            <button
              v-if="lead.status !== 'deleted'"
              type="button"
              class="w-full px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              @click="handleDelete"
            >
              Delete Lead
            </button>
          </div>

          <!-- Timeline -->
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 class="text-lg font-semibold text-neutral-900 mb-4">Timeline</h2>
            <div class="space-y-4 text-sm">
              <div class="flex gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                <div>
                  <p class="font-medium text-neutral-900">Created</p>
                  <p class="text-neutral-500">{{ formatDate(lead.created_at) }}</p>
                </div>
              </div>
              <div v-if="lead.updated_at !== lead.created_at" class="flex gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                <div>
                  <p class="font-medium text-neutral-900">Last updated</p>
                  <p class="text-neutral-500">{{ formatDate(lead.updated_at) }}</p>
                </div>
              </div>
              <div v-if="lead.deleted_at" class="flex gap-3">
                <div class="w-2 h-2 mt-1.5 rounded-full bg-red-500" />
                <div>
                  <p class="font-medium text-neutral-900">Deleted</p>
                  <p class="text-neutral-500">{{ formatDate(lead.deleted_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
