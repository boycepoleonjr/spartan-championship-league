'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Custom hook that wraps React Query's useQuery with Supabase client
 * Provides type-safe queries with automatic error handling
 *
 * @template T - The expected data type returned from the query
 * @param {string[]} queryKey - Unique key for the query (used for caching)
 * @param {function} queryFn - Function that returns a Supabase query builder or promise
 * @param {UseQueryOptions} options - Additional React Query options
 * @returns {UseQueryResult} React Query result with data, loading, and error states
 *
 * @example
 * const { data, isLoading, error } = useSupabaseQuery(
 *   ['teams'],
 *   async (supabase) => {
 *     const { data, error } = await supabase.from('teams').select('*')
 *     if (error) throw error
 *     return data
 *   }
 * )
 */
export function useSupabaseQuery<T = unknown>(
  queryKey: string[],
  queryFn: (supabase: ReturnType<typeof createClient>) => Promise<T>,
  options?: Omit<UseQueryOptions<T, PostgrestError>, 'queryKey' | 'queryFn'>
): UseQueryResult<T, PostgrestError> {
  return useQuery<T, PostgrestError>({
    queryKey,
    queryFn: async () => {
      const supabase = createClient()
      return await queryFn(supabase)
    },
    ...options,
  })
}
