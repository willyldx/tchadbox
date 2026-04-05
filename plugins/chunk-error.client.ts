export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()

  router.onError((error, to) => {
    const isChunkError = 
      error.message && (
        error.message.includes('Failed to fetch dynamically imported module') ||
        error.message.includes('Importing a module script failed') ||
        error.name === 'ChunkLoadError'
      )

    if (isChunkError) {
      console.warn('🔄 ChunkLoadError détecté : Forçage du rechargement pour récupérer la version la plus récente déployée.')
      
      const reloadKey = `chunk-reload-${to.fullPath}`
      const reloadCount = parseInt(sessionStorage.getItem(reloadKey) || '0', 10)
      
      // Sécurité anti-boucle infinie
      if (reloadCount < 2) {
        sessionStorage.setItem(reloadKey, String(reloadCount + 1))
        // Recharge agressivement la page sans le cache
        window.location.href = to.fullPath
      } else {
        console.error('❌ Échec persistant : Le fichier demandé est introuvable même après rafraîchissement.')
        sessionStorage.removeItem(reloadKey)
      }
    }
  })

  // Nettoyage de la clé si la navigation réussit finalement
  router.afterEach((to) => {
    const reloadKey = `chunk-reload-${to.fullPath}`
    if (sessionStorage.getItem(reloadKey)) {
      sessionStorage.removeItem(reloadKey)
    }
  })
})
