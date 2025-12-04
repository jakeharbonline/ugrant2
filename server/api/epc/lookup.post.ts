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

// Response could have rows as arrays (positional) or objects (keyed)
interface EpcApiResponse {
  'column-names'?: string[]
  rows: (string[] | Record<string, string>)[]
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
          size: 100, // Get all results for the postcode
        },
      }
    )

    console.log('EPC API response received, rows:', response.rows?.length ?? 0)
    console.log('Response keys:', Object.keys(response))
    console.log('Response type:', typeof response)

    // Debug: Log the raw first row to see actual data structure
    if (response.rows && response.rows.length > 0) {
      const debugRow = response.rows[0]
      console.log('First row type:', typeof debugRow)
      console.log('First row is array:', Array.isArray(debugRow))
      if (Array.isArray(debugRow)) {
        console.log('First row length:', debugRow.length)
        console.log('First row (first 10 elements):', debugRow.slice(0, 10))
      } else {
        console.log('First row keys:', Object.keys(debugRow || {}))
      }
      console.log('First row (raw):', JSON.stringify(debugRow))
    }

    if (!response.rows || response.rows.length === 0) {
      return {
        success: true,
        found: false,
        message: 'No EPC records found for this postcode',
        certificates: [],
      }
    }

    // Check if rows are arrays (positional) or objects (keyed)
    const firstRow = response.rows[0]
    const rowsAreObjects = firstRow && !Array.isArray(firstRow)
    console.log('Rows are objects (keyed):', rowsAreObjects)

    // Map column names to indices for easier access (only needed for array format)
    const columns = response['column-names'] || []
    console.log('EPC API columns count:', columns?.length)

    // Flexible value getter that works with both array and object rows
    const getValue = (row: string[] | Record<string, string>, name: string): string => {
      if (rowsAreObjects) {
        // Row is an object with string keys
        const objRow = row as Record<string, string>
        return objRow[name] || ''
      } else {
        // Row is an array, use column index
        const index = columns.indexOf(name)
        if (index === -1) {
          console.warn(`Column '${name}' not found in EPC response`)
          return ''
        }
        const arrRow = row as string[]
        return arrRow[index] || ''
      }
    }

    // Debug: Check actual values
    if (firstRow) {
      console.log('Address value:', getValue(firstRow, 'address'))
      console.log('Energy rating value:', getValue(firstRow, 'current-energy-rating'))
    }

    // Parse the results - EPC API uses lowercase column names with hyphens
    const certificates: EpcCertificate[] = response.rows.map((row) => ({
      address: getValue(row, 'address'),
      postcode: getValue(row, 'postcode'),
      currentEnergyRating: getValue(row, 'current-energy-rating'),
      potentialEnergyRating: getValue(row, 'potential-energy-rating'),
      propertyType: getValue(row, 'property-type'),
      builtForm: getValue(row, 'built-form'),
      floorDescription: getValue(row, 'floor-description'),
      wallsDescription: getValue(row, 'walls-description'),
      roofDescription: getValue(row, 'roof-description'),
      windowsDescription: getValue(row, 'windows-description'),
      mainHeatDescription: getValue(row, 'mainheat-description'),
      mainFuel: getValue(row, 'main-fuel'),
      hotWaterDescription: getValue(row, 'hotwater-description'),
      floorArea: parseFloat(getValue(row, 'total-floor-area') || '0') || 0,
      lodgementDate: getValue(row, 'lodgement-date'),
      certificateHash: getValue(row, 'lmk-key'),
    }))

    // Log first certificate to debug
    if (certificates.length > 0) {
      console.log('First certificate:', JSON.stringify(certificates[0], null, 2))
    }

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
