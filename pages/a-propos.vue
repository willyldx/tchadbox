<template>
  <div class="bg-white min-h-screen pt-32 pb-24">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 mb-24">
      <div class="max-w-4xl">
        <h1 class="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-6">Notre Histoire</h1>
        <h2 class="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-10 tracking-tight">
          La distance n'est <br/> plus une barrière.
        </h2>
        <p class="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          TchadBox est née d'une volonté simple : permettre à la diaspora tchadienne d'envoyer le meilleur à leurs proches restés au pays, sans friction, sans mauvaise surprise et avec une livraison garantie à N'Djamena.
        </p>
      </div>
    </section>

    <!-- Visual Divider -->
    <section class="w-full h-64 md:h-[500px] bg-gray-900 mb-24 overflow-hidden relative">
      <div class="absolute inset-0 opacity-20 bg-[url('https://api.spencerai.tech/storage/textures/noise.png')]"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <!-- Placeholder for a brand image -->
        <div class="w-24 h-24 rounded-full border border-gray-700 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Icon name="ph:anchor-simple-bold" class="w-8 h-8 text-white" />
        </div>
      </div>
    </section>

    <!-- Mission & Valeurs -->
    <section class="max-w-7xl mx-auto px-6 mb-32">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h3 class="text-3xl font-black text-gray-900 mb-6">Une confiance à <br/> toute épreuve.</h3>
          <p class="text-lg text-gray-600 leading-relaxed font-medium">
            Pendant trop longtemps, expédier des biens de valeur vers le Tchad a été synonyme d'insécurité, de vols, ou de frais de douanes inattendus infligés aux destinataires. 
            <br/><br/>
            Nous avons créé un réseau logistique de bout en bout qui prend tout en charge. Vous payez en ligne depuis l'Europe ou l'Amérique, nous gérons l'expédition, le fret, les taxes, et la livraison en main propre.
          </p>
        </div>

        <div class="space-y-12">
          <div class="border-t-2 border-gray-100 pt-8">
            <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
              Zéro frais cachés
            </h4>
            <p class="text-gray-500 font-medium leading-relaxed">
              Le prix sur le catalogue est le prix final. Votre destinataire ne paiera jamais pour récupérer son colis.
            </p>
          </div>
          <div class="border-t-2 border-gray-100 pt-8">
            <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
              Preuve de livraison
            </h4>
            <p class="text-gray-500 font-medium leading-relaxed">
              Notre équipe sur place prend une photo lors de la remise du colis. Vous recevez la confirmation visuelle que votre cadeau est arrivé à bon port.
            </p>
          </div>
          <div class="border-t-2 border-gray-100 pt-8">
            <h4 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
              Garantie Premium
            </h4>
            <p class="text-gray-500 font-medium leading-relaxed">
              Nous sélectionnons uniquement des produits authentiques et durables, sourcés pour supporter le climat et les standards locaux.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <section class="max-w-4xl mx-auto px-6 text-center">
      <div class="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100">
        <h2 class="text-4xl font-black text-gray-900 tracking-tight mb-6">Prêt à faire plaisir ?</h2>
        <p class="text-lg text-gray-500 font-medium mb-10 max-w-xl mx-auto">
          Découvrez notre sélection de biens essentiels et premium, prêts à être expédiés à N'Djamena dès aujourd'hui.
        </p>
        <NuxtLink to="/catalogue" class="inline-flex flex-col items-center justify-center px-10 py-5 bg-[var(--color-primary)] text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          Découvrir le catalogue
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Qui sommes-nous | TchadBox',
  meta: [
    { name: 'description', content: 'Découvrez la mission de TchadBox : simplifier l\'envoi de cadeaux et de biens de première nécessité vers N\'Djamena pour la diaspora.' }
  ]
})
</script>

<style scoped>
/* Scoped luxury animations if needed */
</style>
