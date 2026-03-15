import type { H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'

export interface ServerUser {
  id: string
  email: string
  role: 'client' | 'livreur' | 'admin' | 'super_admin'
}

/** Récupère le token Bearer depuis la requête (pour créer un client Supabase avec RLS). */
export function getAuthToken(event: H3Event): string | null {
  const authHeader = getHeader(event, 'Authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '').trim()
  return token || null
}

/**
 * Récupère l'utilisateur courant à partir du JWT (header Authorization: Bearer <token>).
 * Vérifie le token auprès de Supabase et charge le rôle depuis profiles.
 */
export async function getServerUser(event: H3Event): Promise<ServerUser | null> {
  const authHeader = getHeader(event, 'Authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '').trim()

  if (!token) {
    return null
  }

  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl as string
  const anonKey = config.public.supabaseAnonKey as string

  const supabase = createClient(url, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(token)

  if (userError || !user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = (profile?.role as ServerUser['role']) || 'client'

  return {
    id: user.id,
    email: user.email ?? '',
    role,
  }
}

export function requireAuth(event: H3Event): Promise<ServerUser> {
  return getServerUser(event).then((user) => {
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié',
      })
    }
    return user
  })
}

export function requireAdmin(event: H3Event): Promise<ServerUser> {
  return requireAuth(event).then((user) => {
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès réservé aux administrateurs',
      })
    }
    return user
  })
}

export function requireLivreur(event: H3Event): Promise<ServerUser> {
  return requireAuth(event).then((user) => {
    if (user.role !== 'livreur' && user.role !== 'admin' && user.role !== 'super_admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès réservé aux livreurs',
      })
    }
    return user
  })
}
