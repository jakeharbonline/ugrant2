/**
 * EPC Lookup API endpoint
 * Fetches EPC data from the Open Data Communities API
 * POST /api/epc/lookup
 * Body: { postcode: string }
 */

interface EpcCertificate {
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

interface EpcApiResponse {
  'column-names': string[]
  rows: string[][]
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { postcode } = body

  if (!postcode) {
    throw createError({
      statusCode: 400,
      message: 'Postcode is required',
    })
  }

  // Clean and format postcode
  const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase()

  // Get API credentials from environment
  const config = useRuntimeConfig()
  const apiEmail = config.epcApiEmail
  const apiKey = config.epcApiKey

  if (!apiKey || !apiEmail) {
    console.warn('EPC API credentials not configured')
    throw createError({
      statusCode: 503,
      message: 'EPC lookup service unavailable',
    })
  }

  try {
    // Query the EPC API
    // API docs: https://epc.opendatacommunities.org/docs/api
    // Uses Basic Auth with email:apikey format
    const response = await $fetch<EpcApiResponse>(
      `https://epc.opendatacommunities.org/api/v1/domestic/search`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${apiEmail}:${apiKey}`).toString('base64')}`,
        },
        query: {
          postcode: cleanPostcode,
          size: 10, // Get up to 10 results for the postcode
        },
      }
    )

    if (!response.rows || response.rows.length === 0) {
      return {
        success: true,
        found: false,
        message: 'No EPC records found for this postcode',
        certificates: [],
      }
    }

    // Map column names to indices for easier access
    const columns = response['column-names']
    const getColumnIndex = (name: string) => columns.indexOf(name)

    // Parse the results
    const certificates: EpcCertificate[] = response.rows.map((row) => ({
      address: row[getColumnIndex('address')] || '',
      postcode: row[getColumnIndex('postcode')] || '',
      currentEnergyRating: row[getColumnIndex('current-energy-rating')] || '',
      potentialEnergyRating: row[getColumnIndex('potential-energy-rating')] || '',
      propertyType: row[getColumnIndex('property-type')] || '',
      builtForm: row[getColumnIndex('built-form')] || '',
      floorDescription: row[getColumnIndex('floor-description')] || '',
      wallsDescription: row[getColumnIndex('walls-description')] || '',
      roofDescription: row[getColumnIndex('roof-description')] || '',
      windowsDescription: row[getColumnIndex('windows-description')] || '',
      mainHeatDescription: row[getColumnIndex('mainheat-description')] || '',
      mainFuel: row[getColumnIndex('main-fuel')] || '',
      hotWaterDescription: row[getColumnIndex('hotwater-description')] || '',
      floorArea: parseFloat(row[getColumnIndex('total-floor-area')]) || 0,
      lodgementDate: row[getColumnIndex('lodgement-date')] || '',
      certificateHash: row[getColumnIndex('lmk-key')] || '',
    }))

    // Sort by lodgement date (most recent first)
    certificates.sort((a, b) =>
      new Date(b.lodgementDate).getTime() - new Date(a.lodgementDate).getTime()
    )

    return {
      success: true,
      found: true,
      count: certificates.length,
      certificates,
    }
  } catch (error: unknown) {
    console.error('EPC API error:', error)

    // Check if it's a 404 (no results)
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
      return {
        success: true,
        found: false,
        message: 'No EPC records found for this postcode',
        certificates: [],
      }
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to fetch EPC data',
    })
  }
})
