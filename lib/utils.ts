import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculateSavings(original: number, current: number): number {
  return original - current
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return { full, half, empty }
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function generateWhatsAppUrl(message: string): string {
  const phone = '918459556244'
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function getConditionColor(condition: string): string {
  switch (condition) {
    case 'Like New': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
    case 'Excellent': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    case 'Good': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    case 'Fair': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'Grade A+': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
    case 'Grade A': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    case 'Grade B': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    case 'Grade C': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
    default: return 'text-gray-600 bg-gray-50'
  }
}
