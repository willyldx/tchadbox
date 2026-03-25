import { d as useSeoMeta, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, computed, resolveDirective, withCtx, createTextVNode, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { ChevronRight } from 'lucide-vue-next';
import '../_/nitro.mjs';
import 'jose';
import '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';
import 'vue-router';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'tailwind-merge';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confidentialite",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Politique de Confidentialit\xE9 - TchadBox",
      description: "D\xE9couvrez comment TchadBox prot\xE8ge vos donn\xE9es personnelles."
    });
    const currentDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-20 overflow-hidden text-center"><div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]"></div><div class="orb orb-warm w-80 h-80 -bottom-20 -left-20 opacity-10"></div><div class="container-main relative z-10"><nav class="flex items-center justify-center gap-2 text-sm mb-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-white/60 hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Accueil`);
          } else {
            return [
              createTextVNode("Accueil")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-white/40" }, null, _parent));
      _push(`<span class="text-white font-medium">Politique de Confidentialit\xE9</span></nav><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Politique de <span class="text-gradient-gold">Confidentialit\xE9</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-white/60"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Derni\xE8re mise \xE0 jour : ${ssrInterpolate(unref(currentDate))}</p></div></section><div class="container-main py-12 max-w-4xl"><div class="card p-8 md:p-12"><div class="prose prose-stone max-w-none"><p class="lead"> Chez TchadBox, la protection de vos donn\xE9es personnelles est au c\u0153ur de nos engagements. Cette politique d\xE9taille de mani\xE8re transparente comment nous collectons, utilisons, prot\xE9geons et g\xE9rons vos informations personnelles. </p><h2>1. Responsable du Traitement</h2><p> Le responsable du traitement des donn\xE9es personnelles est la soci\xE9t\xE9 TchadBox, joignable \xE0 l\u2019adresse : contact@tchadbox.com. </p><h2>2. Donn\xE9es collect\xE9es</h2><p>Nous collectons les donn\xE9es suivantes :</p><h3>2.1 Donn\xE9es d&#39;identification</h3><ul><li>Nom et pr\xE9nom</li><li>Adresse email</li><li>Num\xE9ro de t\xE9l\xE9phone</li><li>Adresse postale (exp\xE9diteur et destinataire)</li></ul><h3>2.2 Donn\xE9es de transaction</h3><ul><li>Historique des commandes</li><li>Informations de paiement (trait\xE9es par Paystack)</li><li>Pr\xE9f\xE9rences de livraison</li></ul><h3>2.3 Donn\xE9es de navigation</h3><ul><li>Adresse IP</li><li>Type de navigateur</li><li>Pages visit\xE9es</li><li>Cookies</li></ul><h2>3. Finalit\xE9s du traitement</h2><p>Vos donn\xE9es sont utilis\xE9es pour :</p><ul><li>Traiter et livrer vos commandes</li><li>G\xE9rer votre compte client</li><li>Vous envoyer des notifications sur vos commandes</li><li>R\xE9pondre \xE0 vos demandes de support</li><li>Am\xE9liorer nos services</li><li>Vous envoyer des communications marketing (avec votre consentement)</li><li>Respecter nos obligations l\xE9gales</li></ul><h2>4. Base l\xE9gale du traitement</h2><p>Le traitement de vos donn\xE9es repose sur :</p><ul><li><strong>L&#39;ex\xE9cution du contrat</strong> : pour traiter vos commandes</li><li><strong>Le consentement</strong> : pour les communications marketing</li><li><strong>L&#39;int\xE9r\xEAt l\xE9gitime</strong> : pour am\xE9liorer nos services</li><li><strong>L&#39;obligation l\xE9gale</strong> : pour la conservation des factures</li></ul><h2>5. Destinataires des donn\xE9es</h2><p>Vos donn\xE9es peuvent \xEAtre partag\xE9es avec :</p><ul><li><strong>Nos partenaires de livraison</strong> : pour acheminer vos colis</li><li><strong>Paystack</strong> : pour le traitement des paiements</li><li><strong>Supabase</strong> : pour l&#39;h\xE9bergement des donn\xE9es</li><li><strong>Vercel</strong> : pour l&#39;h\xE9bergement du site</li></ul><p> Ces partenaires sont tenus de respecter la confidentialit\xE9 de vos donn\xE9es et ne peuvent les utiliser qu&#39;aux fins pr\xE9vues. </p><h2>6. Transferts internationaux</h2><p> Vos donn\xE9es peuvent \xEAtre transf\xE9r\xE9es vers des pays hors de l&#39;Union Europ\xE9enne (notamment les \xC9tats-Unis pour nos prestataires techniques). Ces transferts sont encadr\xE9s par des garanties appropri\xE9es (clauses contractuelles types, certification Privacy Shield, etc.). </p><h2>7. Dur\xE9e de conservation</h2><ul><li><strong>Donn\xE9es de compte</strong> : conserv\xE9es tant que le compte est actif, puis 3 ans apr\xE8s la derni\xE8re activit\xE9</li><li><strong>Donn\xE9es de commande</strong> : 10 ans (obligation comptable)</li><li><strong>Donn\xE9es de navigation</strong> : 13 mois maximum</li><li><strong>Cookies</strong> : 13 mois maximum</li></ul><h2>8. Vos droits</h2><p>Conform\xE9ment au RGPD, vous disposez des droits suivants :</p><ul><li><strong>Droit d&#39;acc\xE8s</strong> : obtenir une copie de vos donn\xE9es</li><li><strong>Droit de rectification</strong> : corriger vos donn\xE9es</li><li><strong>Droit \xE0 l&#39;effacement</strong> : supprimer vos donn\xE9es</li><li><strong>Droit \xE0 la portabilit\xE9</strong> : recevoir vos donn\xE9es dans un format structur\xE9</li><li><strong>Droit d&#39;opposition</strong> : vous opposer au traitement</li><li><strong>Droit de limitation</strong> : limiter le traitement</li><li><strong>Droit de retirer votre consentement</strong> : \xE0 tout moment</li></ul><p> Pour exercer ces droits, contactez-nous \xE0 : <strong>contact@tchadbox.com</strong></p><h2>9. Cookies</h2><p>Notre site utilise des cookies pour :</p><ul><li><strong>Cookies essentiels</strong> : fonctionnement du site, panier, session</li><li><strong>Cookies analytiques</strong> : comprendre l&#39;utilisation du site</li><li><strong>Cookies de pr\xE9f\xE9rence</strong> : m\xE9moriser vos choix</li></ul><p> Vous pouvez g\xE9rer vos pr\xE9f\xE9rences de cookies via les param\xE8tres de votre navigateur. </p><h2>10. S\xE9curit\xE9</h2><p> Nous mettons en \u0153uvre des mesures techniques et organisationnelles appropri\xE9es pour prot\xE9ger vos donn\xE9es : </p><ul><li>Chiffrement SSL/TLS des communications</li><li>Acc\xE8s restreint aux donn\xE9es personnelles</li><li>H\xE9bergement s\xE9curis\xE9</li><li>Mises \xE0 jour r\xE9guli\xE8res de s\xE9curit\xE9</li></ul><h2>11. Mineurs</h2><p> Notre service n&#39;est pas destin\xE9 aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de donn\xE9es personnelles de mineurs. </p><h2>12. Modifications</h2><p> Nous nous r\xE9servons le droit de modifier cette politique de confidentialit\xE9. Toute modification sera publi\xE9e sur cette page avec une nouvelle date de mise \xE0 jour. </p><h2>13. R\xE9clamation</h2><p> Si vous estimez que vos droits ne sont pas respect\xE9s, vous pouvez introduire une r\xE9clamation aupr\xE8s de la CNIL (Commission Nationale de l&#39;Informatique et des Libert\xE9s) : <a href="https://www.cnil.fr" target="_blank" rel="noopener" class="text-amber-600">www.cnil.fr</a></p><h2>14. Contact</h2><p> Pour toute question concernant cette politique de confidentialit\xE9 : </p><ul><li>Email : contact@tchadbox.com</li><li>Formulaire : `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-amber-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Page contact`);
          } else {
            return [
              createTextVNode("Page contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/confidentialite.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confidentialite-BEyFtQiJ.mjs.map
