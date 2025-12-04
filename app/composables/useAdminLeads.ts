/**
 * Admin leads management composable
 */
import { ref, readonly, computed } from 'vue'
import type { Database } from '~/types/database.types'

// Simplified Lead type to avoid deep type instantiation
// Using Record<string, unknown> instead of Json to prevent recursive type issues
export interface Lead {
  id: string
  email: string | null
  phone: string | null
  postcode: string
  property_type: string
  tenure: string
  heating_type: string
  insulation: string[] | null
  benefits: string[] | null
  income_band: string | null
  epc_rating: string | null
  epc_data: Record<string, unknown> | null
  eligibility_tier: 'eligible' | 'potentially_eligible' | 'not_eligible'
  eligible_schemes: string[] | null
  eligibility_details: Record<string, unknown> | null
  status: 'new' | 'sent' | 'purchased' | 'resent' | 'archived' | 'deleted'
  price: number | null
  notes: string | null
  wants_installer_contact: boolean
  accepted_terms: boolean
  accepted_privacy: boolean
  consent_timestamp: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

type LeadStatus = Database['public']['Enums']['lead_status']
type EligibilityTier = Database['public']['Enums']['eligibility_tier']

export interface LeadFilters {
  status?: LeadStatus | 'all'
  eligibilityTier?: EligibilityTier | 'all'
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface LeadStats {
  total: number
  new: number
  sent: number
  purchased: number
  byTier: {
    eligible: number
    potentially_eligible: number
    not_eligible: number
  }
}

export function useAdminLeads() {
  // Use untyped client to avoid deep type instantiation issues
  const supabase = useSupabaseClient()

  const leads = ref<Lead[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)

  /**
   * Fetch leads with optional filters
   */
  async function fetchLeads(
    filters: LeadFilters = {},
    page = 1,
    perPage = 20
  ): Promise<void> {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      } else {
        // Exclude deleted by default
        query = query.neq('status', 'deleted')
      }

      if (filters.eligibilityTier && filters.eligibilityTier !== 'all') {
        query = query.eq('eligibility_tier', filters.eligibilityTier)
      }

      if (filters.search) {
        query = query.or(`postcode.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`)
      }

      if (filters.dateFrom) {
        query = query.gte('created_at', filters.dateFrom)
      }

      if (filters.dateTo) {
        query = query.lte('created_at', filters.dateTo + 'T23:59:59')
      }

      // Pagination
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw fetchError
      }

      leads.value = (data as Lead[]) || []
      totalCount.value = count || 0
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch leads'
      error.value = message
      console.error('Failed to fetch leads:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a single lead by ID
   */
  async function getLead(id: string): Promise<Lead | null> {
    const { data, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Failed to fetch lead:', fetchError)
      return null
    }

    return data as Lead
  }

  /**
   * Update lead status
   */
  async function updateStatus(id: string, status: LeadStatus): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update lead status:', updateError)
      return false
    }

    // Update local state
    const idx = leads.value.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads.value[idx]!.status = status
    }

    return true
  }

  /**
   * Update lead price
   */
  async function updatePrice(id: string, price: number): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({ price, updated_at: new Date().toISOString() } as any)
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update lead price:', updateError)
      return false
    }

    const idx = leads.value.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads.value[idx]!.price = price
    }

    return true
  }

  /**
   * Add note to lead
   */
  async function addNote(id: string, note: string): Promise<boolean> {
    // Get existing notes
    const { data: lead } = await supabase
      .from('leads')
      .select('notes')
      .eq('id', id)
      .single()

    const existingNotes = lead?.notes || ''
    const timestamp = new Date().toLocaleString('en-GB')
    const newNotes = existingNotes
      ? `${existingNotes}\n\n[${timestamp}]\n${note}`
      : `[${timestamp}]\n${note}`

    const { error: updateError } = await supabase
      .from('leads')
      .update({ notes: newNotes, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to add note:', updateError)
      return false
    }

    return true
  }

  /**
   * Soft delete a lead
   */
  async function deleteLead(id: string): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        status: 'deleted',
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to delete lead:', updateError)
      return false
    }

    // Remove from local state
    const idx = leads.value.findIndex(l => l.id === id)
    if (idx !== -1) {
      leads.value.splice(idx, 1)
    }
    totalCount.value--

    return true
  }

  /**
   * Restore a deleted lead
   */
  async function restoreLead(id: string): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        status: 'new',
        deleted_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to restore lead:', updateError)
      return false
    }

    return true
  }

  /**
   * Get lead statistics
   */
  async function getStats(): Promise<LeadStats> {
    const { data, error: fetchError } = await supabase
      .from('leads')
      .select('status, eligibility_tier')
      .neq('status', 'deleted')

    if (fetchError || !data) {
      return {
        total: 0,
        new: 0,
        sent: 0,
        purchased: 0,
        byTier: { eligible: 0, potentially_eligible: 0, not_eligible: 0 },
      }
    }

    return {
      total: data.length,
      new: data.filter(l => l.status === 'new').length,
      sent: data.filter(l => l.status === 'sent').length,
      purchased: data.filter(l => l.status === 'purchased').length,
      byTier: {
        eligible: data.filter(l => l.eligibility_tier === 'eligible').length,
        potentially_eligible: data.filter(l => l.eligibility_tier === 'potentially_eligible').length,
        not_eligible: data.filter(l => l.eligibility_tier === 'not_eligible').length,
      },
    }
  }

  // Use computed to avoid deep readonly type issues with Supabase types
  const leadsReadonly = computed(() => leads.value)

  return {
    leads: leadsReadonly,
    loading: readonly(loading),
    error: readonly(error),
    totalCount: readonly(totalCount),
    fetchLeads,
    getLead,
    updateStatus,
    updatePrice,
    addNote,
    deleteLead,
    restoreLead,
    getStats,
  }
}
