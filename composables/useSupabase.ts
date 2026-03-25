/**
 * Dummy Supabase Composable.
 * The project has migrated away from Supabase, but legacy components still reference it.
 * This mock prevents SSR crashes without requiring `@supabase/supabase-js`.
 */
export function useSupabase() {
  const mockChain = {
    select: () => mockChain,
    eq: () => mockChain,
    or: () => mockChain,
    order: () => mockChain,
    limit: () => mockChain,
    single: () => Promise.resolve({ data: null, error: new Error('Supabase is deprecated') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase is deprecated') }),
    delete: () => mockChain,
    match: () => Promise.resolve({ data: null, error: new Error('Supabase is deprecated') }),
    upsert: () => Promise.resolve({ data: null, error: new Error('Supabase is deprecated') }),
    then: (resolve: any) => resolve({ data: null, error: new Error('Supabase is deprecated') })
  }

  const client = {
    from: () => mockChain,
    rpc: () => Promise.resolve({ data: null, error: new Error('Supabase is deprecated') })
  }

  const uploadImage = async () => {
    throw new Error('Supabase is deprecated')
  }

  return { client, uploadImage }
}
