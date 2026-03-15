import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let serviceClient: SupabaseClient | null = null

/**
 * Client Supabase avec service role (côté serveur uniquement).
 * Bypass RLS — à utiliser pour: création de commande (guest), webhook Paystack.
 * Ne pas exposer au client.
 */
export function getSupabaseService(): SupabaseClient {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const serviceKey = config.supabaseServiceKey as string

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }

  if (!serviceClient) {
    serviceClient = createClient(url, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return serviceClient
}

/**
 * Client Supabase avec le JWT de l'utilisateur (pour RLS).
 * À utiliser dans les routes protégées (admin, livreur) pour que les politiques RLS s'appliquent.
 */
export function getSupabaseWithAuth(accessToken: string): SupabaseClient {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const anonKey = config.public.supabaseAnonKey as string

  return createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
