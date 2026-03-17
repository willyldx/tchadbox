import { MeiliSearch } from 'meilisearch'

export const useMeilisearch = () => {
  const config = useRuntimeConfig()
  const host = config.public.meilisearchHost as string
  const apiKey = config.public.meilisearchKey as string

  // We only run this on the client usually, or we just ensure keys are present
  if (!host || !apiKey) {
    console.warn('Meilisearch configuration missing.')
  }

  const client = new MeiliSearch({
    host: host || 'http://localhost:7700',
    apiKey: apiKey || '',
  })

  const index = client.index('products')

  // Helper function to map Meilisearch hits back to our Product type structure if needed
  const performSearch = async (query: string, options = {}) => {
      try {
          const results = await index.search(query, {
             limit: 20,
             ...options
          })
          return results;
      } catch (e) {
          console.error("Meilisearch Error", e)
          return { hits: [], query, estimatedTotalHits: 0 }
      }
  }

  return {
    client,
    index,
    performSearch
  }
}
