/**
 * Eligibility checker state management composable
 * Handles form answers, localStorage persistence, validation, and navigation
 */
import { ref, readonly } from 'vue'

export interface CheckerAnswers {
  houseNumber: string
  postcode: string
  propertyType: string
  tenure: string
  heatingType: string
  insulation: readonly string[]
  benefits: readonly string[]
  incomeBand: string
  epcRating: string
  email: string
  phone: string
  wantsInstallerContact: boolean
  acceptTerms: boolean
  acceptPrivacy: boolean
}

export interface StepValidation {
  isValid: boolean
  errors: string[]
}

const STORAGE_KEY = 'ugrant-checker-state'
const TOTAL_STEPS = 10

// Default empty state
const defaultAnswers: CheckerAnswers = {
  houseNumber: '',
  postcode: '',
  propertyType: '',
  tenure: '',
  heatingType: '',
  insulation: [],
  benefits: [],
  incomeBand: '',
  epcRating: '',
  email: '',
  phone: '',
  wantsInstallerContact: false,
  acceptTerms: false,
  acceptPrivacy: false,
}

// Shared state across components (singleton pattern for SSR safety)
const answers = ref<CheckerAnswers>({ ...defaultAnswers })
const hasHydrated = ref(false)

export function useCheckerState() {
  /**
   * Load saved state from localStorage
   */
  function loadFromStorage(): void {
    if (import.meta.server) return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CheckerAnswers>
        // Merge with defaults to handle any missing fields
        answers.value = { ...defaultAnswers, ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load checker state from localStorage:', error)
    }
    hasHydrated.value = true
  }

  /**
   * Save current state to localStorage
   */
  function saveToStorage(): void {
    if (import.meta.server) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers.value))
    } catch (error) {
      console.warn('Failed to save checker state to localStorage:', error)
    }
  }

  /**
   * Set a single answer value
   */
  function setAnswer<K extends keyof CheckerAnswers>(
    key: K,
    value: CheckerAnswers[K]
  ): void {
    answers.value[key] = value
    saveToStorage()
  }

  /**
   * Get a single answer value
   */
  function getAnswer<K extends keyof CheckerAnswers>(key: K): CheckerAnswers[K] {
    return answers.value[key]
  }

  /**
   * Set multiple answers at once
   */
  function setAnswers(newAnswers: Partial<CheckerAnswers>): void {
    answers.value = { ...answers.value, ...newAnswers }
    saveToStorage()
  }

  /**
   * Clear all answers and storage
   */
  function clearAnswers(): void {
    answers.value = { ...defaultAnswers }
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  /**
   * UK postcode validation regex
   * Matches formats like: SW1A 1AA, M1 1AA, B33 8TH, etc.
   */
  function isValidPostcode(postcode: string): boolean {
    const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i
    return regex.test(postcode.trim())
  }

  /**
   * Email validation
   */
  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email.trim())
  }

  /**
   * UK phone validation (optional field - validates only if provided)
   */
  function isValidPhone(phone: string): boolean {
    if (!phone.trim()) return true // Optional field
    // UK phone: starts with 0 or +44, followed by 10-11 digits
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    const regex = /^(\+44|0)\d{9,10}$/
    return regex.test(cleaned)
  }

  /**
   * Validate a specific step
   */
  function validateStep(stepSlug: string): StepValidation {
    const errors: string[] = []

    switch (stepSlug) {
      case 'postcode':
        if (!answers.value.houseNumber.trim()) {
          errors.push('Please enter your house number or name')
        }
        if (!answers.value.postcode.trim()) {
          errors.push('Please enter your postcode')
        } else if (!isValidPostcode(answers.value.postcode)) {
          errors.push('Please enter a valid UK postcode')
        }
        break

      case 'property-type':
        if (!answers.value.propertyType) {
          errors.push('Please select your property type')
        }
        break

      case 'tenure':
        if (!answers.value.tenure) {
          errors.push('Please select your tenure type')
        }
        break

      case 'heating':
        if (!answers.value.heatingType) {
          errors.push('Please select your heating type')
        }
        break

      case 'insulation':
        // At least one option must be selected (including "None")
        if (answers.value.insulation.length === 0) {
          errors.push('Please select at least one option')
        }
        break

      case 'benefits':
        if (answers.value.benefits.length === 0) {
          errors.push('Please select at least one option')
        }
        break

      case 'income':
        if (!answers.value.incomeBand) {
          errors.push('Please select your income band')
        }
        break

      case 'epc':
        if (!answers.value.epcRating) {
          errors.push('Please select your EPC rating')
        }
        break

      case 'contact':
        // Only validate if user wants installer contact
        if (answers.value.wantsInstallerContact) {
          if (!answers.value.email.trim()) {
            errors.push('Please enter your email address')
          } else if (!isValidEmail(answers.value.email)) {
            errors.push('Please enter a valid email address')
          }
          if (!isValidPhone(answers.value.phone)) {
            errors.push('Please enter a valid UK phone number')
          }
        }
        break

      case 'confirm':
        if (!answers.value.acceptTerms) {
          errors.push('Please accept the Terms and Conditions')
        }
        if (!answers.value.acceptPrivacy) {
          errors.push('Please accept the Privacy Policy')
        }
        break
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Check if a step is complete (has valid answers)
   */
  function isStepComplete(stepSlug: string): boolean {
    return validateStep(stepSlug).isValid
  }

  /**
   * Get the furthest completed step number (for progress tracking)
   */
  function getCompletedSteps(): number {
    const stepSlugs = [
      'postcode',
      'property-type',
      'tenure',
      'heating',
      'insulation',
      'benefits',
      'income',
      'epc',
      'contact',
      'confirm',
    ]

    let completed = 0
    for (const slug of stepSlugs) {
      if (isStepComplete(slug)) {
        completed++
      } else {
        break
      }
    }
    return completed
  }

  /**
   * Initialize on client side
   */
  function initialize(): void {
    if (!hasHydrated.value) {
      loadFromStorage()
    }
  }

  return {
    // State
    answers: readonly(answers),
    hasHydrated: readonly(hasHydrated),
    totalSteps: TOTAL_STEPS,

    // Methods
    setAnswer,
    getAnswer,
    setAnswers,
    clearAnswers,
    validateStep,
    isStepComplete,
    getCompletedSteps,
    initialize,

    // Validators (exposed for component-level validation)
    isValidPostcode,
    isValidEmail,
    isValidPhone,
  }
}
