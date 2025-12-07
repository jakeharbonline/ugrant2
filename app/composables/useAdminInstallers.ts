/**
 * Admin installer management composable
 */
import { ref, readonly, computed } from 'vue'

// Simplified Installer type to avoid deep type instantiation
export interface Installer {
  id: string
  name: string
  company_name: string | null
  email: string
  phone: string | null
  default_lead_price: number
  coverage_regions: string[] | null
  coverage_postcodes: string[] | null
  schemes_covered: string[] | null
  active: boolean
  verified: boolean
  total_leads_purchased: number
  total_spent: number
  created_at: string
  updated_at: string
}

export interface InstallerFilters {
  active?: boolean | 'all'
  verified?: boolean | 'all'
  search?: string
}

export interface InstallerFormData {
  name: string
  company_name: string
  email: string
  phone: string
  default_lead_price: number
  coverage_regions: string[]
  coverage_postcodes: string[]
  schemes_covered: string[]
  active: boolean
  verified: boolean
}

export function useAdminInstallers() {
  const supabase = useSupabaseClient()

  const installers = ref<Installer[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalCount = ref(0)

  /**
   * Fetch installers with optional filters
   */
  async function fetchInstallers(
    filters: InstallerFilters = {},
    page = 1,
    perPage = 20
  ): Promise<void> {
    loading.value = true
    error.value = null

    try {
      let query = supabase
        .from('installers')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters.active !== undefined && filters.active !== 'all') {
        query = query.eq('active', filters.active)
      }

      if (filters.verified !== undefined && filters.verified !== 'all') {
        query = query.eq('verified', filters.verified)
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
      }

      // Pagination
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      query = query.range(from, to)

      const { data, error: fetchError, count } = await query

      if (fetchError) {
        throw fetchError
      }

      installers.value = (data as Installer[]) || []
      totalCount.value = count || 0
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch installers'
      error.value = message
      console.error('Failed to fetch installers:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a single installer by ID
   */
  async function getInstaller(id: string): Promise<Installer | null> {
    const { data, error: fetchError } = await supabase
      .from('installers')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Failed to fetch installer:', fetchError)
      return null
    }

    return data as Installer
  }

  /**
   * Create a new installer
   */
  async function createInstaller(formData: InstallerFormData): Promise<Installer | null> {
    const { data, error: createError } = await supabase
      .from('installers')
      .insert({
        name: formData.name,
        company_name: formData.company_name || null,
        email: formData.email,
        phone: formData.phone || null,
        default_lead_price: formData.default_lead_price,
        coverage_regions: formData.coverage_regions.length > 0 ? formData.coverage_regions : null,
        coverage_postcodes: formData.coverage_postcodes.length > 0 ? formData.coverage_postcodes : null,
        schemes_covered: formData.schemes_covered.length > 0 ? formData.schemes_covered : null,
        active: formData.active,
        verified: formData.verified,
      })
      .select()
      .single()

    if (createError) {
      console.error('Failed to create installer:', createError)
      return null
    }

    return data as Installer
  }

  /**
   * Update an installer
   */
  async function updateInstaller(id: string, formData: Partial<InstallerFormData>): Promise<boolean> {
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (formData.name !== undefined) updateData.name = formData.name
    if (formData.company_name !== undefined) updateData.company_name = formData.company_name || null
    if (formData.email !== undefined) updateData.email = formData.email
    if (formData.phone !== undefined) updateData.phone = formData.phone || null
    if (formData.default_lead_price !== undefined) updateData.default_lead_price = formData.default_lead_price
    if (formData.coverage_regions !== undefined) updateData.coverage_regions = formData.coverage_regions.length > 0 ? formData.coverage_regions : null
    if (formData.coverage_postcodes !== undefined) updateData.coverage_postcodes = formData.coverage_postcodes.length > 0 ? formData.coverage_postcodes : null
    if (formData.schemes_covered !== undefined) updateData.schemes_covered = formData.schemes_covered.length > 0 ? formData.schemes_covered : null
    if (formData.active !== undefined) updateData.active = formData.active
    if (formData.verified !== undefined) updateData.verified = formData.verified

    const { error: updateError } = await supabase
      .from('installers')
      .update(updateData)
      .eq('id', id)

    if (updateError) {
      console.error('Failed to update installer:', updateError)
      return false
    }

    // Update local state
    const idx = installers.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      installers.value[idx] = { ...installers.value[idx]!, ...updateData } as Installer
    }

    return true
  }

  /**
   * Toggle installer active status
   */
  async function toggleActive(id: string, active: boolean): Promise<boolean> {
    return updateInstaller(id, { active })
  }

  /**
   * Toggle installer verified status
   */
  async function toggleVerified(id: string, verified: boolean): Promise<boolean> {
    return updateInstaller(id, { verified })
  }

  /**
   * Delete an installer
   */
  async function deleteInstaller(id: string): Promise<boolean> {
    const { error: deleteError } = await supabase
      .from('installers')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Failed to delete installer:', deleteError)
      return false
    }

    // Remove from local state
    const idx = installers.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      installers.value.splice(idx, 1)
    }
    totalCount.value--

    return true
  }

  /**
   * Get installer statistics
   */
  async function getStats(): Promise<{ total: number; active: number; verified: number }> {
    const { data, error: fetchError } = await supabase
      .from('installers')
      .select('active, verified')

    if (fetchError || !data) {
      return { total: 0, active: 0, verified: 0 }
    }

    return {
      total: data.length,
      active: data.filter(i => i.active).length,
      verified: data.filter(i => i.verified).length,
    }
  }

  const installersReadonly = computed(() => installers.value)

  return {
    installers: installersReadonly,
    loading: readonly(loading),
    error: readonly(error),
    totalCount: readonly(totalCount),
    fetchInstallers,
    getInstaller,
    createInstaller,
    updateInstaller,
    toggleActive,
    toggleVerified,
    deleteInstaller,
    getStats,
  }
}
