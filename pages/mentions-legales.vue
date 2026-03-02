<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 overflow-hidden text-center">
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]" />
      <div class="orb orb-amber w-80 h-80 -top-20 left-1/4 opacity-10" />
      
      <div class="container-main relative z-10">
        <nav class="flex items-center justify-center gap-2 text-sm mb-6">
          <NuxtLink to="/" class="text-white/60 hover:text-white transition-colors">Accueil</NuxtLink>
          <ChevronRightIcon class="w-4 h-4 text-white/40" />
          <span class="text-white font-medium">Mentions Légales</span>
        </nav>
        <h1 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          class="heading-section text-white mb-4"
        >
          Mentions <span class="text-gradient-gold">Légales</span>
        </h1>
        <p 
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          class="text-white/60"
        >Informations légales relatives à la plateforme tchadbox.com</p>
      </div>
    </section>

    <!-- Content -->
    <div class="container-main py-12 max-w-4xl">
      <div class="card p-8 md:p-12">
        <div class="prose prose-stone max-w-none">
          <h2>1. Éditeur du Site</h2>
          <p>La plateforme tchadbox.com est éditée par :</p>
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

          <h2>2. Directeur de la Publication</h2>
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

          <h2>4. Propriété Intellectuelle</h2>
          <p>
            L’intégralité du contenu de ce site (textes, images, vidéos, logos, icônes, sons, 
            logiciels, etc.) est la propriété exclusive de TchadBox ou de ses partenaires 
            et bénéficie de la protection conférée par les lois françaises et internationales 
            relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation totale 
            ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, 
            est strictement interdite sans autorisation écrite préalable de TchadBox.
          </p>

          <h2>5. Données Personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la 
            loi Informatique et Libertés, vous bénéficiez d’un droit d’accès, de rectification, 
            de suppression et de portabilité de vos données personnelles.
          </p>
          <p>
            Pour exercer ces droits, adressez votre demande à : contact@tchadbox.com
          </p>
          <p>
            Pour de plus amples informations, veuillez consulter notre 
            <NuxtLink to="/confidentialite" class="text-amber-600">Politique de Confidentialité</NuxtLink>.
          </p>

          <h2>6. Cookies</h2>
          <p>
            La plateforme tchadbox.com utilise des cookies pour améliorer votre expérience 
            de navigation, analyser le trafic et personnaliser le contenu. En poursuivant 
            votre navigation, vous consentez à l’utilisation de ces cookies.
          </p>
          <p>
            Vous conservez la possibilité de configurer votre navigateur pour refuser les cookies 
            ou être alerté lors de leur envoi.
          </p>

          <h2>7. Liens Hypertextes</h2>
          <p>
            Le site peut contenir des liens vers des sites tiers. TchadBox décline toute 
            responsabilité quant au contenu de ces sites externes et à leurs pratiques 
            en matière de protection des données.
          </p>

          <h2>8. Limitation de Responsabilité</h2>
          <p>
            TchadBox met tout en œuvre pour garantir l’exactitude et l’actualité des informations 
            diffusées sur son site. Toutefois, TchadBox ne peut garantir l’absence d’erreurs 
            ou d’omissions dans les informations mises à disposition.
          </p>
          <p>
            TchadBox décline toute responsabilité pour toute imprécision, inexactitude 
            ou omission portant sur les informations disponibles sur le site.
          </p>

          <h2>9. Droit Applicable et Juridiction</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de 
            litige, et après épuisement de toute tentative de résolution amiable, 
            les tribunaux français seront seuls compétents.
          </p>

          <h2>10. Nous Contacter</h2>
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
