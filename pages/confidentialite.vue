<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <nav class="flex items-center gap-2 text-sm mb-6">
          <NuxtLink to="/" class="text-stone-500 hover:text-amber-600">Accueil</NuxtLink>
          <ChevronRightIcon class="w-4 h-4 text-stone-400" />
          <span class="text-stone-800 font-medium">Politique de Confidentialité</span>
        </nav>
        <h1 class="text-4xl font-bold text-stone-800 mb-4">Politique de Confidentialité</h1>
        <p class="text-stone-500">Dernière mise à jour : {{ currentDate }}</p>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl border border-stone-100 p-8 md:p-12">
        <div class="prose prose-stone max-w-none">
          <p class="lead">
            Chez TchadBox, nous accordons une grande importance à la protection de vos données 
            personnelles. Cette politique de confidentialité explique comment nous collectons, 
            utilisons et protégeons vos informations.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est TchadBox, joignable à l'adresse 
            contact@tchadbox.com.
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          
          <h3>2.1 Données d'identification</h3>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale (expéditeur et destinataire)</li>
          </ul>

          <h3>2.2 Données de transaction</h3>
          <ul>
            <li>Historique des commandes</li>
            <li>Informations de paiement (traitées par Paystack)</li>
            <li>Préférences de livraison</li>
          </ul>

          <h3>2.3 Données de navigation</h3>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Pages visitées</li>
            <li>Cookies</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Traiter et livrer vos commandes</li>
            <li>Gérer votre compte client</li>
            <li>Vous envoyer des notifications sur vos commandes</li>
            <li>Répondre à vos demandes de support</li>
            <li>Améliorer nos services</li>
            <li>Vous envoyer des communications marketing (avec votre consentement)</li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>L'exécution du contrat</strong> : pour traiter vos commandes</li>
            <li><strong>Le consentement</strong> : pour les communications marketing</li>
            <li><strong>L'intérêt légitime</strong> : pour améliorer nos services</li>
            <li><strong>L'obligation légale</strong> : pour la conservation des factures</li>
          </ul>

          <h2>5. Destinataires des données</h2>
          <p>Vos données peuvent être partagées avec :</p>
          <ul>
            <li><strong>Nos partenaires de livraison</strong> : pour acheminer vos colis</li>
            <li><strong>Paystack</strong> : pour le traitement des paiements</li>
            <li><strong>Supabase</strong> : pour l'hébergement des données</li>
            <li><strong>Vercel</strong> : pour l'hébergement du site</li>
          </ul>
          <p>
            Ces partenaires sont tenus de respecter la confidentialité de vos données et 
            ne peuvent les utiliser qu'aux fins prévues.
          </p>

          <h2>6. Transferts internationaux</h2>
          <p>
            Vos données peuvent être transférées vers des pays hors de l'Union Européenne 
            (notamment les États-Unis pour nos prestataires techniques). Ces transferts 
            sont encadrés par des garanties appropriées (clauses contractuelles types, 
            certification Privacy Shield, etc.).
          </p>

          <h2>7. Durée de conservation</h2>
          <ul>
            <li><strong>Données de compte</strong> : conservées tant que le compte est actif, puis 3 ans après la dernière activité</li>
            <li><strong>Données de commande</strong> : 10 ans (obligation comptable)</li>
            <li><strong>Données de navigation</strong> : 13 mois maximum</li>
            <li><strong>Cookies</strong> : 13 mois maximum</li>
          </ul>

          <h2>8. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger vos données</li>
            <li><strong>Droit à l'effacement</strong> : supprimer vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement</li>
            <li><strong>Droit de limitation</strong> : limiter le traitement</li>
            <li><strong>Droit de retirer votre consentement</strong> : à tout moment</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <strong>contact@tchadbox.com</strong>
          </p>

          <h2>9. Cookies</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li><strong>Cookies essentiels</strong> : fonctionnement du site, panier, session</li>
            <li><strong>Cookies analytiques</strong> : comprendre l'utilisation du site</li>
            <li><strong>Cookies de préférence</strong> : mémoriser vos choix</li>
          </ul>
          <p>
            Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
          </p>

          <h2>10. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
            pour protéger vos données :
          </p>
          <ul>
            <li>Chiffrement SSL/TLS des communications</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Hébergement sécurisé</li>
            <li>Mises à jour régulières de sécurité</li>
          </ul>

          <h2>11. Mineurs</h2>
          <p>
            Notre service n'est pas destiné aux personnes de moins de 18 ans. Nous ne 
            collectons pas sciemment de données personnelles de mineurs.
          </p>

          <h2>12. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité. 
            Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
          </p>

          <h2>13. Réclamation</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire 
            une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et 
            des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener" class="text-amber-600">www.cnil.fr</a>
          </p>

          <h2>14. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité :
          </p>
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
  title: 'Politique de Confidentialité - TchadBox',
  description: 'Découvrez comment TchadBox protège vos données personnelles.',
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})
</script>
