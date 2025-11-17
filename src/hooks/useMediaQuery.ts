'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook for responsive breakpoints using CSS media queries
 * Listens to media query changes and returns boolean match status
 *
 * @param {string} query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} Whether the media query currently matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 *
 * @example
 * // Using Tailwind breakpoints
 * const isMd = useMediaQuery('(min-width: 768px)')  // md breakpoint
 * const isLg = useMediaQuery('(min-width: 1024px)') // lg breakpoint
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match status or false for SSR
  const [matches, setMatches] = useState<boolean>(() => {
    // Return false during SSR (server-side rendering)
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    // Return early if window is not available (SSR)
    if (typeof window === 'undefined') return

    // Create media query list
    const mediaQuery = window.matchMedia(query)

    // Define listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers support addEventListener on MediaQueryList
    // Older browsers use addListener (deprecated but still supported)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

/**
 * Preset breakpoint hooks for common Tailwind CSS breakpoints
 */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1280px)')
