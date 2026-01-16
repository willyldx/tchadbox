// Supabase Client Composable
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  // Create singleton client
  if (!supabaseClient) {
    supabaseClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }
    )
  }

  const client = supabaseClient

  // Storage helpers
  const getImageUrl = (bucket: string, path: string): string => {
    const { data } = client.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }

  const getProductImageUrl = (imagePath: string): string => {
    if (!imagePath) return '/images/placeholder-product.jpg'
    if (imagePath.startsWith('http')) return imagePath
    return getImageUrl('products', imagePath)
  }

  // Upload image
  const uploadImage = async (
    bucket: string, 
    path: string, 
    file: File
  ): Promise<string | null> => {
    const { data, error } = await client.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    return getImageUrl(bucket, data.path)
  }

  // Auth helpers
  const signUp = async (email: string, password: string, metadata?: object) => {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await client.auth.signOut()
    return { error }
  }

  const getUser = async () => {
    const { data: { user }, error } = await client.auth.getUser()
    return { user, error }
  }

  const getSession = async () => {
    const { data: { session }, error } = await client.auth.getSession()
    return { session, error }
  }

  // Listen to auth changes
  const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return client.auth.onAuthStateChange(callback)
  }

  return {
    client,
    
    // Storage
    getImageUrl,
    getProductImageUrl,
    uploadImage,
    
    // Auth
    signUp,
    signIn,
    signOut,
    getUser,
    getSession,
    onAuthStateChange,
  }
}
