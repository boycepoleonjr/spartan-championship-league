'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing values (e.g., search input)
 * Delays updating the debounced value until after the specified delay
 *
 * @template T - The type of value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {T} The debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 500)
 *
 * useEffect(() => {
 *   // This will only run 500ms after the user stops typing
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timer if value changes before delay completes
    // This ensures we only update after the user has stopped changing the value
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook for debouncing callbacks
 * Returns a debounced version of the callback function
 *
 * @param {Function} callback - The callback function to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {Function} The debounced callback function
 *
 * @example
 * const handleSearch = useDebouncedCallback((searchTerm: string) => {
 *   performSearch(searchTerm)
 * }, 500)
 *
 * <input onChange={(e) => handleSearch(e.target.value)} />
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return (...args: Parameters<T>) => {
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Set new timeout
    const newTimeoutId = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimeoutId(newTimeoutId)
  }
}
