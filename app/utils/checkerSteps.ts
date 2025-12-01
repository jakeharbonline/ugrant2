/**
 * Eligibility checker step configuration
 * Defines all 10 steps with their questions, options, and validation requirements
 */

export interface StepOption {
  value: string
  label: string
  description?: string
}

export interface StepConfig {
  number: number
  slug: string
  title: string
  subtitle?: string
  helpText?: string
  inputType: 'postcode' | 'radio' | 'checkbox' | 'epc' | 'contact' | 'confirm'
  options?: StepOption[]
  answerKey: string
}

export const BENEFITS_LIST: StepOption[] = [
  { value: 'universal-credit', label: 'Universal Credit' },
  { value: 'pension-credit', label: 'Pension Credit (Guarantee Credit)' },
  { value: 'income-support', label: 'Income Support' },
  { value: 'jsa-income', label: 'Income-based Jobseeker\'s Allowance (JSA)' },
  { value: 'esa-income', label: 'Income-related Employment and Support Allowance (ESA)' },
  { value: 'child-tax-credit', label: 'Child Tax Credit (income under £18,500)' },
  { value: 'working-tax-credit', label: 'Working Tax Credit' },
  { value: 'housing-benefit', label: 'Housing Benefit' },
  { value: 'child-benefit', label: 'Child Benefit (income under £18,500)' },
  { value: 'none', label: 'None of the above' },
]

export const CHECKER_STEPS: StepConfig[] = [
  {
    number: 1,
    slug: 'postcode',
    title: 'Where is your property?',
    subtitle: 'We\'ll look up your property details to speed things up',
    inputType: 'postcode',
    answerKey: 'postcode',
  },
  {
    number: 2,
    slug: 'property-type',
    title: 'What type of property do you live in?',
    subtitle: 'This helps us determine which improvements are suitable',
    inputType: 'radio',
    answerKey: 'propertyType',
    options: [
      { value: 'detached-house', label: 'Detached House' },
      { value: 'semi-detached', label: 'Semi-Detached House' },
      { value: 'terraced', label: 'Terraced House' },
      { value: 'end-terrace', label: 'End Terrace House' },
      { value: 'bungalow', label: 'Bungalow' },
      { value: 'flat-purpose', label: 'Flat (Purpose Built)' },
      { value: 'flat-converted', label: 'Flat (Converted)' },
      { value: 'maisonette', label: 'Maisonette' },
    ],
  },
  {
    number: 3,
    slug: 'tenure',
    title: 'Do you own or rent your property?',
    subtitle: 'Different schemes have different eligibility rules for tenants and owners',
    inputType: 'radio',
    answerKey: 'tenure',
    options: [
      {
        value: 'owner-occupied',
        label: 'Owner Occupied',
        description: 'You own and live in the property',
      },
      {
        value: 'private-rental',
        label: 'Private Rental',
        description: 'You rent from a private landlord',
      },
      {
        value: 'social-housing',
        label: 'Social Housing',
        description: 'You rent from a council or housing association',
      },
    ],
  },
  {
    number: 4,
    slug: 'heating',
    title: 'What is your main heating system?',
    subtitle: 'This affects which heating upgrades you might be eligible for',
    inputType: 'radio',
    answerKey: 'heatingType',
    options: [
      { value: 'gas-boiler', label: 'Gas Boiler' },
      { value: 'oil-boiler', label: 'Oil Boiler' },
      { value: 'electric-storage', label: 'Electric Storage Heaters' },
      { value: 'electric-panel', label: 'Electric Panel Heaters' },
      { value: 'lpg-boiler', label: 'LPG Boiler' },
      { value: 'coal', label: 'Coal or Solid Fuel' },
      { value: 'heat-pump', label: 'Heat Pump (Air or Ground Source)' },
      { value: 'none', label: 'No Central Heating' },
    ],
  },
  {
    number: 5,
    slug: 'insulation',
    title: 'What insulation does your property have?',
    subtitle: 'Select all that apply',
    helpText: 'If you\'re unsure, select "Don\'t know"',
    inputType: 'checkbox',
    answerKey: 'insulation',
    options: [
      { value: 'loft-full', label: 'Loft Insulation (Full - 270mm+)' },
      { value: 'loft-partial', label: 'Loft Insulation (Partial or thin)' },
      { value: 'cavity-wall', label: 'Cavity Wall Insulation' },
      { value: 'solid-wall-internal', label: 'Solid Wall Insulation (Internal)' },
      { value: 'solid-wall-external', label: 'Solid Wall Insulation (External)' },
      { value: 'underfloor', label: 'Underfloor Insulation' },
      { value: 'none', label: 'No insulation' },
      { value: 'dont-know', label: 'Don\'t know' },
    ],
  },
  {
    number: 6,
    slug: 'benefits',
    title: 'Do you or anyone in your household receive any of these benefits?',
    subtitle: 'Select all that apply',
    helpText: 'Receiving certain benefits can increase your eligibility for grants',
    inputType: 'checkbox',
    answerKey: 'benefits',
    options: BENEFITS_LIST,
  },
  {
    number: 7,
    slug: 'income',
    title: 'What is your annual household income?',
    subtitle: 'This is the combined income of everyone in your household',
    helpText: 'Your income is used to determine eligibility - we never share this information',
    inputType: 'radio',
    answerKey: 'incomeBand',
    options: [
      { value: 'under-31k', label: 'Under £31,000' },
      { value: '31k-40k', label: '£31,000 - £40,000' },
      { value: 'over-40k', label: 'Over £40,000' },
      { value: 'prefer-not-say', label: 'Prefer not to say' },
    ],
  },
  {
    number: 8,
    slug: 'epc',
    title: 'What is your property\'s EPC rating?',
    subtitle: 'Energy Performance Certificate rating from A (best) to G (worst)',
    helpText: 'If you don\'t know, you can check at gov.uk/find-energy-certificate or select "Don\'t know"',
    inputType: 'epc',
    answerKey: 'epcRating',
  },
  {
    number: 9,
    slug: 'contact',
    title: 'Would you like to be contacted by installers?',
    subtitle: 'If eligible, we can connect you with accredited installers in your area',
    helpText: 'Your details will only be shared if you opt in below',
    inputType: 'contact',
    answerKey: 'contact',
  },
  {
    number: 10,
    slug: 'confirm',
    title: 'Almost there! Please confirm the following',
    subtitle: 'Review and accept to see your eligibility results',
    inputType: 'confirm',
    answerKey: 'confirm',
  },
]

/**
 * Get step config by slug
 */
export function getStepBySlug(slug: string): StepConfig | undefined {
  return CHECKER_STEPS.find((s) => s.slug === slug)
}

/**
 * Get step config by number
 */
export function getStepByNumber(num: number): StepConfig | undefined {
  return CHECKER_STEPS.find((s) => s.number === num)
}

/**
 * Get next step slug (or 'results' if at end)
 */
export function getNextStepSlug(currentSlug: string): string {
  const currentStep = getStepBySlug(currentSlug)
  if (!currentStep) return 'postcode'

  if (currentStep.number >= CHECKER_STEPS.length) {
    return 'results'
  }

  const nextStep = getStepByNumber(currentStep.number + 1)
  return nextStep?.slug ?? 'results'
}

/**
 * Get previous step slug (or null if at start)
 */
export function getPreviousStepSlug(currentSlug: string): string | null {
  const currentStep = getStepBySlug(currentSlug)
  if (!currentStep || currentStep.number <= 1) return null

  const prevStep = getStepByNumber(currentStep.number - 1)
  return prevStep?.slug ?? null
}

/**
 * Check if a slug is valid
 */
export function isValidStepSlug(slug: string): boolean {
  return CHECKER_STEPS.some((s) => s.slug === slug)
}

/**
 * Get all step slugs in order
 */
export function getAllStepSlugs(): string[] {
  return CHECKER_STEPS.map((s) => s.slug)
}
