<template>
  <div class="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <nav class="flex items-center gap-2 text-sm mb-6">
          <NuxtLink to="/" class="text-stone-500 hover:text-amber-600">Accueil</NuxtLink>
          <ChevronRightIcon class="w-4 h-4 text-stone-400" />
          <span class="text-stone-800 font-medium">Mentions Légales</span>
        </nav>
        <h1 class="text-4xl font-bold text-stone-800 mb-4">Mentions Légales</h1>
        <p class="text-stone-500">Informations légales relatives au site tchadbox.com</p>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl border border-stone-100 p-8 md:p-12">
        <div class="prose prose-stone max-w-none">
          <h2>1. Éditeur du site</h2>
          <p>Le site tchadbox.com est édité par :</p>
          <ul>
            <li><strong>Raison sociale :</strong> TchadBox</li>
            <li><strong>Forme juridique :</strong> [À compléter]</li>
            <li><strong>Capital social :</strong> [À compléter]</li>
            <li><strong>Siège social :</strong> [Adresse à compléter], France</li>
            <li><strong>SIRET :</strong> [À compléter]</li>
            <li><strong>RCS :</strong> [À compléter]</li>
            <li><strong>TVA Intracommunautaire :</strong> [À compléter]</li>
            <li><strong>Email :</strong> contact@tchadbox.com</li>
          </ul>

          <h2>2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication est [Nom du responsable], en qualité de [Fonction].
          </p>

          <h2>3. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Vercel Inc.</strong></li>
            <li>340 S Lemon Ave #4133</li>
            <li>Walnut, CA 91789, USA</li>
            <li>Site web : vercel.com</li>
          </ul>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, 
            logiciels, etc.) est la propriété exclusive de TchadBox ou de ses partenaires 
            et est protégé par les lois françaises et internationales relatives à la 
            propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation totale 
            ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, 
            est interdite sans autorisation écrite préalable de TchadBox.
          </p>

          <h2>5. Données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la 
            loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, 
            de suppression et de portabilité de vos données personnelles.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à : contact@tchadbox.com
          </p>
          <p>
            Pour plus d'informations, consultez notre 
            <NuxtLink to="/confidentialite" class="text-amber-600">Politique de Confidentialité</NuxtLink>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Le site tchadbox.com utilise des cookies pour améliorer l'expérience utilisateur, 
            analyser le trafic et personnaliser le contenu. En continuant à naviguer sur ce 
            site, vous acceptez l'utilisation des cookies.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
            lorsqu'un cookie est envoyé.
          </p>

          <h2>7. Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d'autres sites web. TchadBox n'est pas 
            responsable du contenu de ces sites externes ni de leurs pratiques en matière 
            de protection des données.
          </p>

          <h2>8. Limitation de responsabilité</h2>
          <p>
            TchadBox s'efforce d'assurer l'exactitude et la mise à jour des informations 
            diffusées sur ce site. Toutefois, TchadBox ne peut garantir l'exactitude, 
            la précision ou l'exhaustivité des informations mises à disposition.
          </p>
          <p>
            TchadBox décline toute responsabilité pour toute imprécision, inexactitude 
            ou omission portant sur des informations disponibles sur le site.
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de 
            litige, et après échec de toute tentative de recherche d'une solution amiable, 
            les tribunaux français seront seuls compétents.
          </p>

          <h2>10. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez 
            nous contacter :
          </p>
          <ul>
            <li>Par email : contact@tchadbox.com</li>
            <li>Via notre <NuxtLink to="/contact" class="text-amber-600">formulaire de contact</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'

useSeoMeta({
  title: 'Mentions Légales - TchadBox',
  description: 'Mentions légales du site TchadBox.',
})
</script>
