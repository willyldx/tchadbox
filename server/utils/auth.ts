// Server-side auth utility for Sanctum token verification
// This proxies auth to the Laravel backend via the Bearer token

import type { H3Event } from 'h3'

interface AuthUser {
  id: string | number
  email: string
  role: string
}

/**
 * Verifies the Sanctum Bearer token by calling the Laravel /api/user endpoint.
 * Returns the authenticated user or null.
 */
export async function verifyAuth(event: H3Event): Promise<AuthUser | null> {
  const config = useRuntimeConfig()
  const authHeader = getRequestHeader(event, 'authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  try {
    const response = await $fetch<{ user: any }>(`${config.public.apiUrl}/user`, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
    })

    if (response.user) {
      return {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role || 'client',
      }
    }
    return null
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
