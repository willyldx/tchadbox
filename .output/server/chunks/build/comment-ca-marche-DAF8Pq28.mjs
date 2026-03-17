import { _ as _sfc_main$1 } from './NuxtImg-CrKgy81i.mjs';
import { a as useHead, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, ref, resolveDirective, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderVNode } from 'vue/server-renderer';
import { Package, CreditCard, Truck, Camera, CheckCircle, ChevronDown, ShoppingBag, MessageCircle } from 'lucide-vue-next';
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
  __name: "comment-ca-marche",
  __ssrInlineRender: true,
  setup(__props) {
    const openFaq = ref(null);
    const steps = [
      {
        title: "Composez votre commande",
        description: "Parcourez notre catalogue et choisissez les produits de qualit\xE9 \xE0 faire livrer \xE0 vos proches au Tchad.",
        subtitle: "Catalogue riche et vari\xE9",
        icon: Package,
        color: "#2563EB",
        features: [
          "Gammes alimentaire, scolarit\xE9, sant\xE9 et f\xEAtes",
          "Prix affich\xE9s en euros et en FCFA, en toute transparence",
          "Descriptions d\xE9taill\xE9es et photos r\xE9elles de chaque produit"
        ]
      },
      {
        title: "R\xE9glez en toute confiance",
        description: "Finalisez votre achat gr\xE2ce \xE0 notre plateforme de paiement s\xE9curis\xE9e, propuls\xE9e par Paystack, leader du paiement en Afrique.",
        subtitle: "Paiement s\xE9curis\xE9 Paystack",
        icon: CreditCard,
        color: "#D97706",
        features: [
          "Visa, Mastercard et Mobile Money accept\xE9s",
          "Cryptage SSL 256-bit pour prot\xE9ger vos donn\xE9es",
          "Confirmation de commande instantan\xE9e par email"
        ]
      },
      {
        title: "Livraison \xE0 domicile \xE0 N'Djamena",
        description: "Notre \xE9quipe terrain, bas\xE9e \xE0 N'Djamena, pr\xE9pare et achemine votre commande directement au domicile du destinataire sous 3 \xE0 5 jours ouvr\xE9s.",
        subtitle: "Livraison express et fiable",
        icon: Truck,
        color: "#059669",
        features: [
          "Livraison porte-\xE0-porte dans tout N'Djamena",
          "Suivi de commande en temps r\xE9el depuis votre espace client",
          "\xC9quipe locale professionnelle et de confiance"
        ]
      },
      {
        title: "Preuve de livraison certifi\xE9e",
        description: "Une fois le colis remis, recevez une photo confirmant la r\xE9ception par votre famille. Votre tranquillit\xE9 d'esprit est notre priorit\xE9.",
        subtitle: "Transparence totale",
        icon: Camera,
        color: "#EC4899",
        features: [
          "Photo de remise envoy\xE9e par WhatsApp ou email",
          "Notification automatique d\xE8s la livraison effectu\xE9e",
          "Engagement satisfaction : livraison garantie \xE0 100%"
        ]
      }
    ];
    const faqs = [
      { question: "Dans quelles villes livrez-vous actuellement ?", answer: "Notre service de livraison couvre actuellement l'ensemble de N'Djamena. Nous travaillons activement \xE0 l'ouverture de Moundou et Sarh dans les prochains mois. Inscrivez-vous \xE0 notre newsletter pour \xEAtre inform\xE9 d\xE8s leur lancement." },
      { question: "Quel est le d\xE9lai de livraison garanti ?", answer: "Comptez 3 \xE0 5 jours ouvr\xE9s apr\xE8s la confirmation de votre paiement. Pour les commandes urgentes, notre \xE9quipe peut organiser une livraison express \u2014 contactez-nous directement par WhatsApp pour en discuter." },
      { question: "Comment \xEAtre s\xFBr que ma famille a bien re\xE7u le colis ?", answer: "C'est notre engagement phare : chaque livraison est accompagn\xE9e d'une photo de preuve envoy\xE9e par WhatsApp ou email. Vous pouvez \xE9galement suivre l'avancement de votre commande en temps r\xE9el depuis votre espace client sur notre site." },
      { question: "Quels moyens de paiement sont accept\xE9s ?", answer: "Nous offrons une large palette de solutions de paiement : cartes Visa et Mastercard, Mobile Money (MTN Money, Orange Money, Wave), ainsi que le virement bancaire. Toutes les transactions sont s\xE9curis\xE9es par notre partenaire Paystack." },
      { question: "Est-il possible d'annuler une commande ?", answer: "Oui, l'annulation est gratuite tant que la pr\xE9paration de votre colis n'a pas d\xE9but\xE9. Il vous suffit de nous contacter par email ou WhatsApp et nous proc\xE9derons au remboursement int\xE9gral sous 48h." },
      { question: "Les frais de livraison sont-ils inclus dans les prix ?", answer: "Les frais de livraison sont calcul\xE9s s\xE9par\xE9ment en fonction de la zone de livraison \xE0 N'Djamena et affich\xE9s de mani\xE8re transparente avant la validation de votre commande. Aucun frais cach\xE9." }
    ];
    useHead({ title: "Comment \xE7a marche" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-24 overflow-hidden text-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/hero-howto.png",
        alt: "Comment \xE7a marche",
        class: "absolute inset-0 w-full h-full object-cover",
        loading: "eager",
        quality: "80",
        format: "webp",
        sizes: "100vw"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-[var(--color-primary)]/75"></div><div class="container-main relative z-10"><span${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 10 },
        enter: { opacity: 1, y: 0 },
        class: "inline-block text-[var(--color-accent)] text-sm font-semibold tracking-wider uppercase mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Guide</span><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Comment \xE7a <span class="text-gradient-gold">marche</span> ? </h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-lg text-white/70 max-w-lg mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> En 4 \xE9tapes simples, offrez le meilleur \xE0 votre famille au Tchad sans quitter votre canap\xE9 </p></div></section><section class="py-24"><div class="container-main max-w-5xl"><div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent"></div><div class="space-y-24"><!--[-->`);
      ssrRenderList(steps, (step, i) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: i,
          class: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
          initial: { opacity: 0, y: 40 },
          visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 100, duration: 600 } }
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="${ssrRenderClass({ "md:order-2": i % 2 === 1 })}"><div class="flex items-center gap-4 mb-5"><span class="w-12 h-12 rounded-xl bg-[var(--color-accent)] text-white flex items-center justify-center font-bold text-xl shadow-md">${ssrInterpolate(i + 1)}</span><h2 class="text-2xl font-bold text-[var(--color-text)]">${ssrInterpolate(step.title)}</h2></div><p class="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">${ssrInterpolate(step.description)}</p><ul class="space-y-3"><!--[-->`);
        ssrRenderList(step.features, (feature) => {
          _push(`<li class="flex items-start gap-3">`);
          _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" }, null, _parent));
          _push(`<span class="text-[var(--color-text-secondary)]">${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="${ssrRenderClass({ "md:order-1": i % 2 === 1 })}"><div class="card p-10 text-center group hover:!border-[var(--color-accent)]/20 relative overflow-hidden"><div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${step.color}08 0%, transparent 100%)` })}"></div><div class="relative"><div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl" style="${ssrRenderStyle({ background: `${step.color}12` })}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(step.icon), {
          class: "w-12 h-12 transition-transform duration-500",
          style: { color: step.color }
        }, null), _parent);
        _push(`</div><p class="text-sm text-[var(--color-text-muted)] font-medium">${ssrInterpolate(step.subtitle)}</p></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 bg-[var(--color-bg-warm)]"><div class="container-main max-w-3xl"><div class="text-center mb-14"><span class="label mb-4 block">FAQ</span><h2 class="heading-section">Questions <span class="text-gradient">fr\xE9quentes</span></h2></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(faqs, (faq, i) => {
        _push(`<div class="${ssrRenderClass([unref(openFaq) === i ? "ring-1 ring-[var(--color-accent)]/30" : "", "card overflow-hidden transition-all duration-300"])}"><button class="w-full p-6 text-left flex justify-between items-center gap-4 group"><span class="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent-dark)] transition-colors">${ssrInterpolate(faq.question)}</span><div class="${ssrRenderClass([unref(openFaq) === i ? "bg-[var(--color-accent)] text-white rotate-180" : "bg-gray-100 text-[var(--color-text-muted)]", "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"])}">`);
        _push(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 transition-transform" }, null, _parent));
        _push(`</div></button>`);
        if (unref(openFaq) === i) {
          _push(`<div class="px-6 pb-6 text-[var(--color-text-secondary)] leading-relaxed overflow-hidden">${ssrInterpolate(faq.answer)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-24 text-center"><div class="container-main"><div${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        visibleOnce: { opacity: 1, y: 0 },
        class: "max-w-2xl mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><h2 class="heading-section mb-4">Pr\xEAt \xE0 <span class="text-gradient">commencer</span> ?</h2><p class="text-lg text-[var(--color-text-muted)] mb-8"> Rejoignez les centaines de familles qui font d\xE9j\xE0 confiance \xE0 TchadBox </p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue",
        class: "btn-gold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`Voir le catalogue</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode(unref(ShoppingBag), { class: "w-5 h-5" }),
                createTextVNode("Voir le catalogue")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "btn-outline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MessageCircle), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`Nous contacter</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode(unref(MessageCircle), { class: "w-5 h-5" }),
                createTextVNode("Nous contacter")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/comment-ca-marche.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=comment-ca-marche-DAF8Pq28.mjs.map
