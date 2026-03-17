import type { H3Event } from 'h3'
import { createRemoteJWKSet, jwtVerify } from 'jose'

export interface ServerUser {
  id: string
  email: string
  role: 'client' | 'livreur' | 'admin' | 'super_admin'
}

// Clerk JWKS (JSON Web Key Set) for verifying JWTs
// Clerk publishable key format: pk_test_<base64>$ or pk_live_<base64>$
// The Clerk frontend instance domain is encoded in the publishable key
let _jwks: ReturnType<typeof createRemoteJWKSet> | null = null

function getClerkJWKS(): ReturnType<typeof createRemoteJWKSet> {
  if (_jwks) return _jwks

  const config = useRuntimeConfig()
  const publishableKey = (config.public.clerkPublishableKey || '') as string

  // Extract the Clerk Frontend API URL from the publishable key
  // Format: pk_test_<base64-encoded-domain> or pk_live_<base64-encoded-domain>
  const keyParts = publishableKey.replace(/^pk_(test|live)_/, '')
  // Remove trailing $ if present
  const base64Domain = keyParts.replace(/\$+$/, '')
  const domain = atob(base64Domain)

  _jwks = createRemoteJWKSet(
    new URL(`https://${domain}/.well-known/jwks.json`)
  )
  return _jwks
}

/** Récupère le token Bearer depuis la requête. */
export function getAuthToken(event: H3Event): string | null {
  const authHeader = getHeader(event, 'Authorization')
  const token = authHeader?.replace(/^Bearer\s+/i, '').trim()
  return token || null
}

/**
 * Vérifie le JWT Clerk et retourne l'utilisateur.
 * Le rôle est extrait des metadata publiques du JWT Clerk.
 */
export async function getServerUser(event: H3Event): Promise<ServerUser | null> {
  const token = getAuthToken(event)

  if (!token) {
    return null
  }

  try {
    const jwks = getClerkJWKS()
    const { payload } = await jwtVerify(token, jwks)

    // Clerk JWT payload contains:
    // - sub: user ID (e.g., user_xxx)
    // - email: user email (from session claims, if configured)
    // - metadata.publicMetadata.role (if configured in Clerk dashboard)
    const clerkUserId = payload.sub as string
    const email = (payload as any).email || (payload as any).email_address || ''

    // Role from Clerk's public metadata (set in Clerk Dashboard > Users > Public Metadata)
    const publicMetadata = (payload as any).public_metadata || (payload as any).publicMetadata || {}
    const role = (publicMetadata.role as ServerUser['role']) || 'client'

    return {
      id: clerkUserId,
      email,
      role,
    }
  } catch (error) {
    console.error('Clerk JWT verification failed:', error)
    return null
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
