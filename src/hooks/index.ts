/**
 * Custom Hooks Library for Spartan Championship League
 *
 * This module exports reusable React hooks for common patterns:
 * - useSupabaseQuery: Wrapper for React Query + Supabase
 * - useLocalStorage: Persistent state management
 * - useMediaQuery: Responsive breakpoints
 * - useDebounce: Input debouncing
 */

// Supabase + React Query integration
export { useSupabaseQuery } from './useSupabaseQuery'

// Persistent state management
export { useLocalStorage } from './useLocalStorage'

// Responsive breakpoints
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
} from './useMediaQuery'

// Debouncing utilities
export { useDebounce, useDebouncedCallback } from './useDebounce'
