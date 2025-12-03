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
    console.log('EPC API request for postcode:', cleanPostcode)
    console.log('Using API email:', apiEmail ? apiEmail.substring(0, 5) + '...' : 'NOT SET')
    console.log('Using API key:', apiKey ? 'SET (' + apiKey.length + ' chars)' : 'NOT SET')

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

    console.log('EPC API response received, rows:', response.rows?.length ?? 0)

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
    console.log('EPC API columns:', columns)

    // Safe column getter - returns empty string if column not found
    const getColumn = (row: string[], name: string): string => {
      const index = columns.indexOf(name)
      if (index === -1) {
        console.warn(`Column '${name}' not found in EPC response`)
        return ''
      }
      return row[index] || ''
    }

    // Parse the results - EPC API uses UPPERCASE column names with underscores
    const certificates: EpcCertificate[] = response.rows.map((row) => ({
      address: getColumn(row, 'ADDRESS'),
      postcode: getColumn(row, 'POSTCODE'),
      currentEnergyRating: getColumn(row, 'CURRENT_ENERGY_RATING'),
      potentialEnergyRating: getColumn(row, 'POTENTIAL_ENERGY_RATING'),
      propertyType: getColumn(row, 'PROPERTY_TYPE'),
      builtForm: getColumn(row, 'BUILT_FORM'),
      floorDescription: getColumn(row, 'FLOOR_DESCRIPTION'),
      wallsDescription: getColumn(row, 'WALLS_DESCRIPTION'),
      roofDescription: getColumn(row, 'ROOF_DESCRIPTION'),
      windowsDescription: getColumn(row, 'WINDOWS_DESCRIPTION'),
      mainHeatDescription: getColumn(row, 'MAINHEAT_DESCRIPTION'),
      mainFuel: getColumn(row, 'MAIN_FUEL'),
      hotWaterDescription: getColumn(row, 'HOTWATER_DESCRIPTION'),
      floorArea: parseFloat(getColumn(row, 'TOTAL_FLOOR_AREA') || '0') || 0,
      lodgementDate: getColumn(row, 'LODGEMENT_DATE'),
      certificateHash: getColumn(row, 'LMK_KEY'),
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

    // Log more details about the error
    if (error && typeof error === 'object') {
      console.error('Error details:', JSON.stringify(error, null, 2))
      if ('data' in error) console.error('Error data:', error.data)
      if ('statusCode' in error) console.error('Status code:', error.statusCode)
      if ('message' in error) console.error('Error message:', error.message)
    }

    // Check if it's a 404 (no results)
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
      return {
        success: true,
        found: false,
        message: 'No EPC records found for this postcode',
        certificates: [],
      }
    }

    // Check for 401/403 auth errors
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const statusCode = error.statusCode as number
      if (statusCode === 401 || statusCode === 403) {
        throw createError({
          statusCode: 503,
          message: 'EPC API authentication failed - check credentials',
        })
      }
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to fetch EPC data',
    })
  }
})
