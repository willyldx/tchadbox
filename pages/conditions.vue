<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <nav class="flex items-center gap-2 text-sm mb-6">
          <NuxtLink to="/" class="text-stone-500 hover:text-amber-600">Accueil</NuxtLink>
          <ChevronRightIcon class="w-4 h-4 text-stone-400" />
          <span class="text-stone-800 font-medium">Conditions Générales de Vente</span>
        </nav>
        <h1 class="text-4xl font-bold text-stone-800 mb-4">Conditions Générales de Vente</h1>
        <p class="text-stone-500">Dernière mise à jour : {{ currentDate }}</p>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl border border-stone-100 p-8 md:p-12">
        <div class="prose prose-stone max-w-none">
          <h2>Article 1 - Objet</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
            entre TchadBox, ci-après dénommé "le Vendeur", et toute personne physique ou morale 
            effectuant un achat sur le site tchadbox.com, ci-après dénommée "le Client".
          </p>
          <p>
            TchadBox est un service d'envoi de colis de la France vers le Tchad, permettant à la 
            diaspora tchadienne d'envoyer des biens à leurs proches.
          </p>

          <h2>Article 2 - Produits et Services</h2>
          <p>
            Les produits proposés à la vente sont ceux figurant sur le site tchadbox.com au moment 
            de la consultation par le Client. Chaque produit est accompagné d'un descriptif établi 
            par le Vendeur.
          </p>
          <p>
            Les photographies des produits sont les plus fidèles possibles mais ne peuvent assurer 
            une similitude parfaite avec le produit offert.
          </p>

          <h2>Article 3 - Prix</h2>
          <p>
            Les prix sont indiqués en Euros (€) et en Francs CFA (FCFA) à titre indicatif. 
            Ils sont toutes taxes comprises (TTC) et incluent la TVA applicable au jour de la commande.
          </p>
          <p>
            Les frais de livraison sont indiqués avant la validation finale de la commande. 
            Le Vendeur se réserve le droit de modifier ses prix à tout moment.
          </p>

          <h2>Article 4 - Commande</h2>
          <p>
            Le Client sélectionne les produits qu'il souhaite commander dans le panier. 
            Il peut à tout moment modifier sa sélection avant de valider sa commande.
          </p>
          <p>
            La validation de la commande implique l'acceptation intégrale des présentes CGV. 
            Le Vendeur confirmera la commande par email.
          </p>

          <h2>Article 5 - Paiement</h2>
          <p>Le paiement peut s'effectuer par :</p>
          <ul>
            <li>Carte bancaire (Visa, Mastercard)</li>
            <li>Mobile Money (Orange Money, MTN Money, Wave)</li>
          </ul>
          <p>
            Le paiement est sécurisé via notre partenaire Paystack. Les informations bancaires 
            ne sont jamais stockées sur nos serveurs.
          </p>

          <h2>Article 6 - Livraison</h2>
          <p>
            Les livraisons sont effectuées à N'Djamena, Tchad. Le délai de livraison est de 
            7 à 14 jours ouvrés à compter de la confirmation du paiement.
          </p>
          <p>
            Une photo de la livraison sera envoyée au Client comme preuve de remise au destinataire.
          </p>
          <p>
            En cas d'absence du destinataire, le livreur tentera un nouveau passage. 
            Après trois tentatives infructueuses, le colis sera mis en attente.
          </p>

          <h2>Article 7 - Droit de rétractation</h2>
          <p>
            En raison de la nature du service (livraison internationale de biens), le droit de 
            rétractation ne s'applique pas une fois le colis expédié depuis la France.
          </p>
          <p>
            Avant expédition, le Client peut annuler sa commande et sera remboursé intégralement 
            sous 14 jours.
          </p>

          <h2>Article 8 - Réclamations</h2>
          <p>
            Toute réclamation doit être adressée dans un délai de 48 heures suivant la livraison 
            à l'adresse contact@tchadbox.com.
          </p>
          <p>
            En cas de produit endommagé ou non conforme, le Client devra fournir des preuves 
            photographiques.
          </p>

          <h2>Article 9 - Responsabilité</h2>
          <p>
            Le Vendeur ne saurait être tenu responsable des dommages résultant d'une mauvaise 
            utilisation du produit, d'un cas de force majeure, ou d'un retard de livraison 
            imputable au transporteur.
          </p>

          <h2>Article 10 - Protection des données</h2>
          <p>
            Les données personnelles collectées sont traitées conformément à notre 
            <NuxtLink to="/confidentialite" class="text-amber-600">Politique de Confidentialité</NuxtLink>.
          </p>

          <h2>Article 11 - Droit applicable</h2>
          <p>
            Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux 
            français seront seuls compétents.
          </p>

          <h2>Article 12 - Contact</h2>
          <p>Pour toute question concernant ces CGV, contactez-nous :</p>
          <ul>
            <li>Email : contact@tchadbox.com</li>
            <li>Formulaire : <NuxtLink to="/contact" class="text-amber-600">Page contact</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'

useSeoMeta({
  title: 'Conditions Générales de Vente - TchadBox',
  description: 'Consultez les conditions générales de vente de TchadBox.',
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})
</script>
