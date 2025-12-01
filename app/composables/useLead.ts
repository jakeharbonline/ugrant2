/**
 * Lead management composable
 * Handles creating and managing leads in Supabase
 */

import { ref, readonly } from 'vue'
import type { CheckerAnswers } from './useCheckerState'
import type { EligibilityResult } from './useEligibility'
import type { Database, Json } from '~/types/database.types'

type Lead = Database['public']['Tables']['leads']['Row']
type LeadInsert = Database['public']['Tables']['leads']['Insert']

export interface LeadSubmissionResult {
  success: boolean
  leadId?: string
  error?: string
}

export function useLead() {
  const supabase = useSupabaseClient<Database>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Create a new lead from checker answers and eligibility result
   */
  async function createLead(
    answers: CheckerAnswers,
    eligibility: EligibilityResult
  ): Promise<LeadSubmissionResult> {
    loading.value = true
    error.value = null

    try {
      // Map eligibility tier to database enum
      const tierMap: Record<string, Database['public']['Enums']['eligibility_tier']> = {
        'eligible': 'eligible',
        'potentially_eligible': 'potentially_eligible',
        'not_eligible': 'not_eligible',
      }

      // Get list of eligible scheme slugs
      const eligibleSchemes = eligibility.schemes
        .filter(s => s.tier === 'eligible' || s.tier === 'potentially_eligible')
        .map(s => s.slug)

      // Prepare lead data
      const leadData: LeadInsert = {
        // Contact info
        email: answers.wantsInstallerContact ? answers.email : null,
        phone: answers.wantsInstallerContact ? answers.phone : null,
        wants_installer_contact: answers.wantsInstallerContact,

        // Property info
        postcode: answers.postcode.toUpperCase().replace(/\s+/g, ' '),
        property_type: answers.propertyType,
        tenure: answers.tenure,
        heating_type: answers.heatingType,
        insulation: answers.insulation,
        epc_rating: answers.epcRating || null,

        // Financial info
        benefits: answers.benefits,
        income_band: answers.incomeBand,

        // Eligibility results
        eligibility_tier: tierMap[eligibility.overallTier],
        eligible_schemes: eligibleSchemes,
        eligibility_details: {
          summary: eligibility.summary,
          schemes: eligibility.schemes.map(s => ({
            slug: s.slug,
            name: s.name,
            tier: s.tier,
            reasons: s.reasons,
            maxGrant: s.maxGrant,
          })),
          evaluatedAt: new Date().toISOString(),
        } as Json,

        // Consent
        accepted_terms: answers.acceptTerms,
        accepted_privacy: answers.acceptPrivacy,
        consent_timestamp: new Date().toISOString(),

        // Status
        status: 'new',
      }

      // Insert into database
      const { data, error: insertError } = await supabase
        .from('leads')
        .insert(leadData)
        .select('id')
        .single()

      if (insertError) {
        console.error('Failed to create lead:', insertError)
        error.value = insertError.message
        return {
          success: false,
          error: insertError.message,
        }
      }

      return {
        success: true,
        leadId: data.id,
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create lead'
      console.error('Lead creation error:', err)
      error.value = message
      return {
        success: false,
        error: message,
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a lead by ID (admin only)
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
   * Update lead status (admin only)
   */
  async function updateLeadStatus(
    id: string,
    status: Database['public']['Enums']['lead_status']
  ): Promise<boolean> {
    const { error: updateError } = await supabase
      .from('leads')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update lead status:', updateError)
      return false
    }

    return true
  }

  /**
   * Add a note to a lead (admin only)
   */
  async function addNote(id: string, note: string): Promise<boolean> {
    // Get existing notes
    const { data: lead } = await supabase
      .from('leads')
      .select('notes')
      .eq('id', id)
      .single()

    const existingNotes = lead?.notes || ''
    const timestamp = new Date().toISOString()
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
   * Soft delete a lead (admin only)
   */
  async function softDeleteLead(id: string): Promise<boolean> {
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

    return true
  }

  /**
   * Restore a soft-deleted lead (admin only)
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

  return {
    loading: readonly(loading),
    error: readonly(error),
    createLead,
    getLead,
    updateLeadStatus,
    addNote,
    softDeleteLead,
    restoreLead,
  }
}
