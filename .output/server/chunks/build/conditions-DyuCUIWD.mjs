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
import '@clerk/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "conditions",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Conditions G\xE9n\xE9rales de Vente - TchadBox",
      description: "Consultez les conditions g\xE9n\xE9rales de vente de TchadBox."
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
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-20 overflow-hidden text-center"><div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]"></div><div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10"></div><div class="container-main relative z-10"><nav class="flex items-center justify-center gap-2 text-sm mb-6">`);
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
      _push(`<span class="text-white font-medium">Conditions G\xE9n\xE9rales de Vente</span></nav><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Conditions G\xE9n\xE9rales de <span class="text-gradient-gold">Vente</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-white/60"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Derni\xE8re mise \xE0 jour : ${ssrInterpolate(unref(currentDate))}</p></div></section><div class="container-main py-12 max-w-4xl"><div class="card p-8 md:p-12"><div class="prose prose-stone max-w-none"><h2>Article 1 \u2014 Objet</h2><p> Les pr\xE9sentes Conditions G\xE9n\xE9rales de Vente (ci-apr\xE8s \xAB\xA0CGV\xA0\xBB) d\xE9finissent les droits et obligations de la soci\xE9t\xE9 TchadBox (ci-apr\xE8s \xAB\xA0le Prestataire\xA0\xBB) et de toute personne physique ou morale (ci-apr\xE8s \xAB\xA0le Client\xA0\xBB) passant commande sur la plateforme tchadbox.com. </p><p> TchadBox est une plateforme de commerce en ligne sp\xE9cialis\xE9e dans l\u2019acheminement de biens essentiels depuis l\u2019Europe vers le Tchad, destin\xE9e \xE0 la diaspora tchadienne souhaitant soutenir ses proches sur place. </p><h2>Article 2 \u2014 Produits et Services</h2><p> Les produits propos\xE9s sont ceux r\xE9f\xE9renc\xE9s sur le site tchadbox.com au moment de la consultation. Chaque produit fait l\u2019objet d\u2019une fiche descriptive d\xE9taill\xE9e \xE9tablie par le Prestataire. </p><p> Les photographies illustrant les produits sont les plus repr\xE9sentatives possibles. Toutefois, de l\xE9g\xE8res variations peuvent exister entre l\u2019image et le produit final livr\xE9. </p><h2>Article 3 \u2014 Tarification</h2><p> L\u2019ensemble des prix sont libell\xE9s en Euros (\u20AC) avec une indication en Francs CFA (FCFA) \xE0 titre informatif. Les montants affich\xE9s sont toutes taxes comprises (TTC) et incluent la TVA en vigueur au jour de la commande. </p><p> Les frais de livraison sont communiqu\xE9s de mani\xE8re transparente avant la validation d\xE9finitive de la commande. Le Prestataire se r\xE9serve le droit d\u2019ajuster ses tarifs \xE0 tout moment. </p><h2>Article 4 \u2014 Processus de Commande</h2><p> Le Client s\xE9lectionne les produits souhait\xE9s et les ajoute \xE0 son panier. Il conserve la possibilit\xE9 de modifier sa s\xE9lection \xE0 tout moment avant la validation. </p><p> La validation d\xE9finitive de la commande vaut acceptation pleine et enti\xE8re des pr\xE9sentes CGV. Un email de confirmation est automatiquement envoy\xE9 au Client. </p><h2>Article 5 \u2014 Modalit\xE9s de Paiement</h2><p>Le Client peut r\xE9gler sa commande par les moyens suivants :</p><ul><li>Carte bancaire (Visa, Mastercard)</li><li>Mobile Money (Orange Money, MTN Money, Wave)</li></ul><p> L\u2019int\xE9gralit\xE9 des transactions est s\xE9curis\xE9e par notre partenaire certifi\xE9 Paystack. Aucune information bancaire n\u2019est stock\xE9e sur les serveurs de TchadBox. </p><h2>Article 6 \u2014 Livraison</h2><p> Les livraisons sont assur\xE9es \xE0 N&#39;Djamena, Tchad. Le d\xE9lai standard de livraison est de 3 \xE0 5 jours ouvr\xE9s \xE0 compter de la confirmation du paiement. </p><p> Une photo certifi\xE9e de la remise du colis est syst\xE9matiquement adress\xE9e au Client comme preuve de livraison au destinataire. </p><p> En cas d&#39;absence du destinataire, notre livreur effectuera une nouvelle tentative. Apr\xE8s trois tentatives infructueuses, le colis sera conserv\xE9 en attente et le Client sera contact\xE9 pour convenir d\u2019un cr\xE9neau de livraison. </p><h2>Article 7 \u2014 Droit de R\xE9tractation</h2><p> Compte tenu de la nature sp\xE9cifique du service (livraison internationale de biens de consommation), le droit de r\xE9tractation ne peut s\u2019exercer une fois le colis exp\xE9di\xE9. </p><p> Avant exp\xE9dition, le Client dispose de la facult\xE9 d\u2019annuler sa commande. Le remboursement int\xE9gral sera effectu\xE9 sous 14 jours ouvr\xE9s. </p><h2>Article 8 \u2014 R\xE9clamations et Litiges</h2><p> Toute r\xE9clamation doit \xEAtre adress\xE9e dans un d\xE9lai de 48 heures suivant la livraison \xE0 l\u2019adresse suivante : contact@tchadbox.com. </p><p> En cas de produit endommag\xE9 ou non conforme \xE0 la description, le Client est invit\xE9 \xE0 fournir des justificatifs photographiques afin de faciliter le traitement de sa demande. </p><h2>Article 9 \u2014 Limitation de Responsabilit\xE9</h2><p> Le Prestataire ne saurait \xEAtre tenu responsable des dommages r\xE9sultant d\u2019une utilisation inappropri\xE9e du produit, d\u2019un cas de force majeure, ou d\u2019un retard de livraison imputable \xE0 des circonstances ind\xE9pendantes de sa volont\xE9. </p><h2>Article 10 \u2014 Protection des Donn\xE9es Personnelles</h2><p> Les donn\xE9es personnelles collect\xE9es dans le cadre de votre commande sont trait\xE9es conform\xE9ment \xE0 notre `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/confidentialite",
        class: "text-amber-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Politique de Confidentialit\xE9`);
          } else {
            return [
              createTextVNode("Politique de Confidentialit\xE9")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` et au R\xE8glement G\xE9n\xE9ral sur la Protection des Donn\xE9es (RGPD). </p><h2>Article 11 \u2014 Droit Applicable et Juridiction</h2><p> Les pr\xE9sentes CGV sont soumises au droit fran\xE7ais. En cas de litige, et apr\xE8s tentative de r\xE9solution amiable, les tribunaux fran\xE7ais seront seuls comp\xE9tents. </p><h2>Article 12 \u2014 Nous Contacter</h2><p>Pour toute question relative aux pr\xE9sentes CGV, notre \xE9quipe est \xE0 votre disposition :</p><ul><li>Email : contact@tchadbox.com</li><li>Formulaire : `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-amber-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Page de contact`);
          } else {
            return [
              createTextVNode("Page de contact")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/conditions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=conditions-DyuCUIWD.mjs.map
