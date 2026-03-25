import { c as useSeoMeta, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, computed, resolveDirective, withCtx, createTextVNode, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate } from "vue/server-renderer";
import { ChevronRight } from "lucide-vue-next";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/klona/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "tailwind-merge";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/@unhead/vue/dist/index.mjs";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/nuxt/node_modules/perfect-debounce/dist/index.mjs";
import "ohash/utils";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "conditions",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Conditions Générales de Vente - TchadBox",
      description: "Consultez les conditions générales de vente de TchadBox."
    });
    const currentDate = computed(() => {
      return (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
      _push(`<span class="text-white font-medium">Conditions Générales de Vente</span></nav><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Conditions Générales de <span class="text-gradient-gold">Vente</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-white/60"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Dernière mise à jour : ${ssrInterpolate(unref(currentDate))}</p></div></section><div class="container-main py-12 max-w-4xl"><div class="card p-8 md:p-12"><div class="prose prose-stone max-w-none"><h2>Article 1 — Objet</h2><p> Les présentes Conditions Générales de Vente (ci-après « CGV ») définissent les droits et obligations de la société TchadBox (ci-après « le Prestataire ») et de toute personne physique ou morale (ci-après « le Client ») passant commande sur la plateforme tchadbox.com. </p><p> TchadBox est une plateforme de commerce en ligne spécialisée dans l’acheminement de biens essentiels depuis l’Europe vers le Tchad, destinée à la diaspora tchadienne souhaitant soutenir ses proches sur place. </p><h2>Article 2 — Produits et Services</h2><p> Les produits proposés sont ceux référencés sur le site tchadbox.com au moment de la consultation. Chaque produit fait l’objet d’une fiche descriptive détaillée établie par le Prestataire. </p><p> Les photographies illustrant les produits sont les plus représentatives possibles. Toutefois, de légères variations peuvent exister entre l’image et le produit final livré. </p><h2>Article 3 — Tarification</h2><p> L’ensemble des prix sont libellés en Euros (€) avec une indication en Francs CFA (FCFA) à titre informatif. Les montants affichés sont toutes taxes comprises (TTC) et incluent la TVA en vigueur au jour de la commande. </p><p> Les frais de livraison sont communiqués de manière transparente avant la validation définitive de la commande. Le Prestataire se réserve le droit d’ajuster ses tarifs à tout moment. </p><h2>Article 4 — Processus de Commande</h2><p> Le Client sélectionne les produits souhaités et les ajoute à son panier. Il conserve la possibilité de modifier sa sélection à tout moment avant la validation. </p><p> La validation définitive de la commande vaut acceptation pleine et entière des présentes CGV. Un email de confirmation est automatiquement envoyé au Client. </p><h2>Article 5 — Modalités de Paiement</h2><p>Le Client peut régler sa commande par les moyens suivants :</p><ul><li>Carte bancaire (Visa, Mastercard)</li><li>Mobile Money (Orange Money, MTN Money, Wave)</li></ul><p> L’intégralité des transactions est sécurisée par notre partenaire certifié Paystack. Aucune information bancaire n’est stockée sur les serveurs de TchadBox. </p><h2>Article 6 — Livraison</h2><p> Les livraisons sont assurées à N&#39;Djamena, Tchad. Le délai standard de livraison est de 3 à 5 jours ouvrés à compter de la confirmation du paiement. </p><p> Une photo certifiée de la remise du colis est systématiquement adressée au Client comme preuve de livraison au destinataire. </p><p> En cas d&#39;absence du destinataire, notre livreur effectuera une nouvelle tentative. Après trois tentatives infructueuses, le colis sera conservé en attente et le Client sera contacté pour convenir d’un créneau de livraison. </p><h2>Article 7 — Droit de Rétractation</h2><p> Compte tenu de la nature spécifique du service (livraison internationale de biens de consommation), le droit de rétractation ne peut s’exercer une fois le colis expédié. </p><p> Avant expédition, le Client dispose de la faculté d’annuler sa commande. Le remboursement intégral sera effectué sous 14 jours ouvrés. </p><h2>Article 8 — Réclamations et Litiges</h2><p> Toute réclamation doit être adressée dans un délai de 48 heures suivant la livraison à l’adresse suivante : contact@tchadbox.com. </p><p> En cas de produit endommagé ou non conforme à la description, le Client est invité à fournir des justificatifs photographiques afin de faciliter le traitement de sa demande. </p><h2>Article 9 — Limitation de Responsabilité</h2><p> Le Prestataire ne saurait être tenu responsable des dommages résultant d’une utilisation inappropriée du produit, d’un cas de force majeure, ou d’un retard de livraison imputable à des circonstances indépendantes de sa volonté. </p><h2>Article 10 — Protection des Données Personnelles</h2><p> Les données personnelles collectées dans le cadre de votre commande sont traitées conformément à notre `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/confidentialite",
        class: "text-amber-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Politique de Confidentialité`);
          } else {
            return [
              createTextVNode("Politique de Confidentialité")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` et au Règlement Général sur la Protection des Données (RGPD). </p><h2>Article 11 — Droit Applicable et Juridiction</h2><p> Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents. </p><h2>Article 12 — Nous Contacter</h2><p>Pour toute question relative aux présentes CGV, notre équipe est à votre disposition :</p><ul><li>Email : contact@tchadbox.com</li><li>Formulaire : `);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=conditions-D_OuyGpb.js.map
