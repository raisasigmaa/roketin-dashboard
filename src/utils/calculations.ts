import { User, DashboardStats } from '../types'

/**
 * Count how many unique nationalities exist among users
 */
export function countDifferentNationalities(users: User[]): number {
  const nationalities = new Set(users.map((u) => u.nat))
  return nationalities.size
}

/**
 * Find the most common gender among users
 */
export function getMostCommonGender(users: User[]): string {
  const counts: Record<string, number> = {}
  users.forEach((u) => {
    counts[u.gender] = (counts[u.gender] || 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'male'
}

/**
 * Calculate average age, rounded to nearest integer
 */
export function getAverageAge(users: User[]): number {
  if (users.length === 0) return 0
  const total = users.reduce((sum, u) => sum + u.dob.age, 0)
  return Math.round(total / users.length)
}

/**
 * Calculate membership duration in years from registration date to today
 */
export function getMembershipYears(registeredDate: string): number {
  const reg = new Date(registeredDate)
  const now = new Date()
  const diffMs = now.getTime() - reg.getTime()
  return diffMs / (1000 * 60 * 60 * 24 * 365.25)
}

/**
 * Calculate average membership in years, rounded to nearest integer
 */
export function getAverageMembershipYears(users: User[]): number {
  if (users.length === 0) return 0
  const total = users.reduce(
    (sum, u) => sum + getMembershipYears(u.registered.date),
    0
  )
  return Math.round(total / users.length)
}

/**
 * Compute all dashboard statistics from a list of users
 */
export function computeDashboardStats(users: User[]): DashboardStats {
  return {
    differentNationality: countDifferentNationalities(users),
    mostGender: getMostCommonGender(users),
    averageAge: getAverageAge(users),
    averageMembershipYears: getAverageMembershipYears(users),
  }
}

/**
 * Format a user's full address string
 */
export function formatAddress(user: User): string {
  const { street, city, country } = user.location
  return `${street.name} ${street.number}, ${city}, ${country}`
}

/**
 * Format a user's full name
 */
export function formatFullName(user: User): string {
  return `${user.name.first} ${user.name.last}`
}

/**
 * Get flag image URL from Flagpedia CDN (https://flagpedia.net/download/api)
 */
export function getFlagUrl(nat: string, size: '20x15' | '40x30' = '20x15'): string {
  return `https://flagcdn.com/${size}/${nat.toLowerCase()}.png`
}
