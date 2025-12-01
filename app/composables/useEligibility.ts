/**
 * Eligibility Logic Engine
 * Evaluates user answers against scheme rules to determine eligibility
 */

import type { CheckerAnswers } from './useCheckerState'

export type EligibilityTier = 'eligible' | 'potentially_eligible' | 'not_eligible'

export interface SchemeEligibility {
  slug: string
  name: string
  tier: EligibilityTier
  reasons: string[]
  maxGrant?: number
}

export interface EligibilityResult {
  overallTier: EligibilityTier
  schemes: SchemeEligibility[]
  summary: string
}

// Qualifying benefits for ECO4 and similar schemes
const QUALIFYING_BENEFITS = [
  'universal-credit',
  'pension-credit',
  'income-support',
  'jsa-income',
  'esa-income',
]

const TAX_CREDIT_BENEFITS = [
  'child-tax-credit',
  'working-tax-credit',
  'child-benefit',
]

export function useEligibility() {
  /**
   * Check ECO4 eligibility
   */
  function checkEco4(answers: CheckerAnswers): SchemeEligibility {
    const reasons: string[] = []
    let tier: EligibilityTier = 'not_eligible'

    // Check qualifying benefits
    const hasQualifyingBenefit = answers.benefits.some(b =>
      QUALIFYING_BENEFITS.includes(b)
    )

    const hasTaxCreditWithLowIncome = answers.benefits.some(b =>
      TAX_CREDIT_BENEFITS.includes(b)
    ) && answers.incomeBand === 'under-31k'

    // Check EPC rating
    const hasPoorEpc = ['D', 'E', 'F', 'G'].includes(answers.epcRating)
    const hasUnknownEpc = answers.epcRating === 'unknown'

    // Check tenure
    const validTenure = ['owner-occupied', 'private-rental', 'social-housing'].includes(answers.tenure)

    // Determine eligibility
    if (hasQualifyingBenefit && hasPoorEpc && validTenure) {
      tier = 'eligible'
      reasons.push('You receive a qualifying benefit')
      reasons.push('Your property has an EPC rating of D-G')
    } else if (hasTaxCreditWithLowIncome && hasPoorEpc && validTenure) {
      tier = 'eligible'
      reasons.push('You receive tax credits with household income under £31,000')
      reasons.push('Your property has an EPC rating of D-G')
    } else if (hasQualifyingBenefit && hasUnknownEpc && validTenure) {
      tier = 'potentially_eligible'
      reasons.push('You receive a qualifying benefit')
      reasons.push('EPC rating unknown - may qualify if D-G')
    } else if (hasPoorEpc && validTenure && answers.incomeBand === 'under-31k') {
      tier = 'potentially_eligible'
      reasons.push('Your property has a poor EPC rating')
      reasons.push('May qualify through LA Flex if referred by local council')
    } else {
      reasons.push('Does not meet benefit or income requirements')
    }

    return {
      slug: 'eco4',
      name: 'ECO4',
      tier,
      reasons,
    }
  }

  /**
   * Check GBIS (Great British Insulation Scheme) eligibility
   */
  function checkGbis(answers: CheckerAnswers): SchemeEligibility {
    const reasons: string[] = []
    let tier: EligibilityTier = 'not_eligible'

    // Check EPC rating (D-G required)
    const hasPoorEpc = ['D', 'E', 'F', 'G'].includes(answers.epcRating)
    const hasUnknownEpc = answers.epcRating === 'unknown'

    // Check if needs insulation
    const needsCavityWall = !answers.insulation.includes('cavity-wall')
    const needsLoftInsulation = !answers.insulation.includes('loft-full')
    const needsInsulation = needsCavityWall || needsLoftInsulation

    // Valid tenure
    const validTenure = ['owner-occupied', 'private-rental', 'social-housing'].includes(answers.tenure)

    if (hasPoorEpc && needsInsulation && validTenure) {
      tier = 'eligible'
      if (needsCavityWall) reasons.push('Your property may benefit from cavity wall insulation')
      if (needsLoftInsulation) reasons.push('Your property may benefit from loft insulation')
      reasons.push('Your property has an EPC rating of D-G')
    } else if (hasUnknownEpc && needsInsulation && validTenure) {
      tier = 'potentially_eligible'
      reasons.push('EPC rating unknown - may qualify if D-G')
      reasons.push('Insulation improvements may be available')
    } else if (!needsInsulation) {
      reasons.push('Your property appears to already have adequate insulation')
    } else {
      reasons.push('Does not meet EPC requirements')
    }

    return {
      slug: 'gbis',
      name: 'Great British Insulation Scheme',
      tier,
      reasons,
    }
  }

  /**
   * Check Warm Home Discount eligibility
   */
  function checkWarmHomeDiscount(answers: CheckerAnswers): SchemeEligibility {
    const reasons: string[] = []
    let tier: EligibilityTier = 'not_eligible'

    // Check Pension Credit (automatic qualification)
    const hasPensionCredit = answers.benefits.includes('pension-credit')

    // Low income pathway
    const isLowIncome = answers.incomeBand === 'under-31k'
    const hasQualifyingBenefit = answers.benefits.some(b =>
      [...QUALIFYING_BENEFITS, ...TAX_CREDIT_BENEFITS].includes(b)
    )

    if (hasPensionCredit) {
      tier = 'eligible'
      reasons.push('You receive Pension Credit Guarantee Credit')
      reasons.push('You should receive the discount automatically')
    } else if (isLowIncome && hasQualifyingBenefit) {
      tier = 'potentially_eligible'
      reasons.push('You may qualify through the broader group')
      reasons.push('Contact your energy supplier to check eligibility')
    } else {
      reasons.push('Requires Pension Credit or qualifying benefit with low income')
    }

    return {
      slug: 'warm-home-discount',
      name: 'Warm Home Discount',
      tier,
      reasons,
      maxGrant: 150,
    }
  }

  /**
   * Check Boiler Upgrade Scheme eligibility
   */
  function checkBoilerUpgradeScheme(answers: CheckerAnswers): SchemeEligibility {
    const reasons: string[] = []
    let tier: EligibilityTier = 'not_eligible'

    // Must be owner-occupied
    const isOwnerOccupied = answers.tenure === 'owner-occupied'

    // Must have fossil fuel heating (not mains gas for most grants)
    const fossilFuelHeating = ['oil-boiler', 'lpg-boiler', 'coal', 'electric-storage', 'electric-panel'].includes(answers.heatingType)
    const hasGasBoiler = answers.heatingType === 'gas-boiler'

    // Check insulation requirements
    const hasBasicInsulation = answers.insulation.includes('cavity-wall') || answers.insulation.includes('loft-full')

    if (isOwnerOccupied && fossilFuelHeating) {
      tier = 'eligible'
      reasons.push('You own your property')
      reasons.push('You have non-gas heating that can be replaced')
      reasons.push('Up to £7,500 towards a heat pump')
    } else if (isOwnerOccupied && hasGasBoiler) {
      tier = 'potentially_eligible'
      reasons.push('You own your property')
      reasons.push('Gas boilers may qualify in some circumstances')
      reasons.push('Contact a certified installer to discuss options')
    } else if (!isOwnerOccupied) {
      reasons.push('Only available for owner-occupied properties')
    } else {
      reasons.push('Current heating type may not qualify')
    }

    return {
      slug: 'boiler-upgrade-scheme',
      name: 'Boiler Upgrade Scheme',
      tier,
      reasons,
      maxGrant: 7500,
    }
  }

  /**
   * Check LA Flex eligibility
   */
  function checkLaFlex(answers: CheckerAnswers): SchemeEligibility {
    const reasons: string[] = []
    let tier: EligibilityTier = 'not_eligible'

    // LA Flex is for people who don't qualify through standard routes
    const isLowIncome = answers.incomeBand === 'under-31k'
    const hasPoorEpc = ['D', 'E', 'F', 'G'].includes(answers.epcRating)
    const hasUnknownEpc = answers.epcRating === 'unknown'
    const validTenure = ['owner-occupied', 'private-rental'].includes(answers.tenure)

    // Check if they already qualify for ECO4 through benefits
    const hasQualifyingBenefit = answers.benefits.some(b =>
      QUALIFYING_BENEFITS.includes(b)
    )

    if (!hasQualifyingBenefit && isLowIncome && (hasPoorEpc || hasUnknownEpc) && validTenure) {
      tier = 'potentially_eligible'
      reasons.push('You may qualify through your local council\'s flexible eligibility scheme')
      reasons.push('Contact your local authority to request a referral')
      reasons.push('Criteria vary by council area')
    } else if (hasQualifyingBenefit) {
      tier = 'not_eligible'
      reasons.push('You may qualify directly through ECO4 instead')
    } else {
      reasons.push('LA Flex is typically for low-income households without qualifying benefits')
    }

    return {
      slug: 'la-flex',
      name: 'LA Flex',
      tier,
      reasons,
    }
  }

  /**
   * Evaluate eligibility for all schemes
   */
  function evaluate(answers: CheckerAnswers): EligibilityResult {
    const schemes: SchemeEligibility[] = [
      checkEco4(answers),
      checkGbis(answers),
      checkWarmHomeDiscount(answers),
      checkBoilerUpgradeScheme(answers),
      checkLaFlex(answers),
    ]

    // Determine overall tier
    const hasEligible = schemes.some(s => s.tier === 'eligible')
    const hasPotential = schemes.some(s => s.tier === 'potentially_eligible')

    let overallTier: EligibilityTier
    let summary: string

    if (hasEligible) {
      overallTier = 'eligible'
      const eligibleCount = schemes.filter(s => s.tier === 'eligible').length
      summary = `Great news! You appear to be eligible for ${eligibleCount} energy scheme${eligibleCount > 1 ? 's' : ''}.`
    } else if (hasPotential) {
      overallTier = 'potentially_eligible'
      const potentialCount = schemes.filter(s => s.tier === 'potentially_eligible').length
      summary = `You may be eligible for ${potentialCount} energy scheme${potentialCount > 1 ? 's' : ''}. Further verification is needed.`
    } else {
      overallTier = 'not_eligible'
      summary = 'Based on the information provided, you don\'t currently qualify for the main energy schemes. However, circumstances can change - check back if your situation changes.'
    }

    return {
      overallTier,
      schemes,
      summary,
    }
  }

  return {
    evaluate,
    checkEco4,
    checkGbis,
    checkWarmHomeDiscount,
    checkBoilerUpgradeScheme,
    checkLaFlex,
  }
}
