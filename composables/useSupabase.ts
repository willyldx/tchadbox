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

  return {
    client,
    
    // Storage
    getImageUrl,
    getProductImageUrl,
    uploadImage,
  }
}
