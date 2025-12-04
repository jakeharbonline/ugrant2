/**
 * Admin leads management composable
 */
import { ref, readonly, computed } from 'vue'
import type { Database } from '~/types/database.types'

type Lead = Database['public']['Tables']['leads']['Row']
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
  const supabase = useSupabaseClient<Database>()

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

      leads.value = data || []
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

    return data
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
    const lead = leads.value.find(l => l.id === id)
    if (lead) {
      lead.status = status
    }

    return true
  }

  /**
   * Update lead price
   */
  async function updatePrice(id: string, price: number): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({ price, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update lead price:', updateError)
      return false
    }

    const lead = leads.value.find(l => l.id === id)
    if (lead) {
      lead.price = price
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
    leads.value = leads.value.filter(l => l.id !== id)
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

  return {
    leads: readonly(leads),
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
