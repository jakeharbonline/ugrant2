/**
 * EPC Lookup composable
 * Fetches EPC data for a given postcode
 */
import { ref, readonly } from 'vue'

export interface EpcCertificate {
  address: string
  postcode: string
  currentEnergyRating: string
  potentialEnergyRating: string
  propertyType: string
  builtForm: string
  floorDescription: string
  wallsDescription: string
  roofDescription: string
  windowsDescription: string
  mainHeatDescription: string
  mainFuel: string
  hotWaterDescription: string
  floorArea: number
  lodgementDate: string
  certificateHash: string
}

export interface EpcLookupResult {
  success: boolean
  found: boolean
  message?: string
  count?: number
  certificates: EpcCertificate[]
}

export function useEpcLookup() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<EpcLookupResult | null>(null)

  /**
   * Look up EPC data for a postcode
   */
  async function lookup(postcode: string): Promise<EpcLookupResult> {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<EpcLookupResult>('/api/epc/lookup', {
        method: 'POST',
        body: { postcode },
      })

      result.value = response
      return response
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err
        ? String(err.message)
        : 'Failed to fetch EPC data'
      error.value = message
      result.value = {
        success: false,
        found: false,
        message,
        certificates: [],
      }
      return result.value
    } finally {
      loading.value = false
    }
  }

  /**
   * Extract insulation info from EPC data
   */
  function parseInsulation(certificate: EpcCertificate): string[] {
    const insulation: string[] = []

    // Check walls description for cavity wall
    const walls = certificate.wallsDescription.toLowerCase()
    if (walls.includes('cavity') && walls.includes('filled')) {
      insulation.push('cavity-wall')
    } else if (walls.includes('cavity') && !walls.includes('filled')) {
      // Has cavity but not filled
    }

    // Check roof description for loft insulation
    const roof = certificate.roofDescription.toLowerCase()
    if (roof.includes('insulated') || roof.includes('insulation')) {
      if (roof.includes('300mm') || roof.includes('270mm') || roof.includes('250mm')) {
        insulation.push('loft-full')
      } else if (roof.includes('100mm') || roof.includes('150mm')) {
        insulation.push('loft-partial')
      }
    }

    // Check floor description
    const floor = certificate.floorDescription.toLowerCase()
    if (floor.includes('insulated')) {
      insulation.push('underfloor')
    }

    return insulation
  }

  /**
   * Map EPC property type to our property types
   */
  function mapPropertyType(epcType: string): string {
    const type = epcType.toLowerCase()

    if (type.includes('house') || type.includes('detached') || type.includes('semi-detached') || type.includes('terrace')) {
      if (type.includes('bungalow')) return 'bungalow'
      return 'house'
    }
    if (type.includes('flat') || type.includes('maisonette') || type.includes('apartment')) {
      return 'flat'
    }
    if (type.includes('bungalow')) return 'bungalow'
    if (type.includes('park home')) return 'park-home'

    return 'house' // Default
  }

  /**
   * Map EPC heating type to our heating types
   */
  function mapHeatingType(mainHeat: string, mainFuel: string): string {
    const heat = mainHeat.toLowerCase()
    const fuel = mainFuel.toLowerCase()

    if (fuel.includes('mains gas') || fuel.includes('natural gas')) {
      return 'gas-boiler'
    }
    if (fuel.includes('oil')) {
      return 'oil-boiler'
    }
    if (fuel.includes('lpg') || fuel.includes('bottled')) {
      return 'lpg-boiler'
    }
    if (heat.includes('heat pump') || heat.includes('air source') || heat.includes('ground source')) {
      return 'heat-pump'
    }
    if (heat.includes('storage') && fuel.includes('electric')) {
      return 'electric-storage'
    }
    if (fuel.includes('electric')) {
      return 'electric-panel'
    }
    if (fuel.includes('coal') || fuel.includes('solid')) {
      return 'coal'
    }

    return 'gas-boiler' // Default
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    result: readonly(result),
    lookup,
    parseInsulation,
    mapPropertyType,
    mapHeatingType,
  }
}
