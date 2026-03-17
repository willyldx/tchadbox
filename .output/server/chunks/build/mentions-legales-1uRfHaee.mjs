import { d as useSeoMeta, e as __nuxt_component_0$4 } from './server.mjs';
import { defineComponent, resolveDirective, withCtx, createTextVNode, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps } from 'vue/server-renderer';
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
  __name: "mentions-legales",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Mentions L\xE9gales - TchadBox",
      description: "Mentions l\xE9gales du site TchadBox."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-20 overflow-hidden text-center"><div class="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)]"></div><div class="orb orb-amber w-80 h-80 -top-20 left-1/4 opacity-10"></div><div class="container-main relative z-10"><nav class="flex items-center justify-center gap-2 text-sm mb-6">`);
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
      _push(`<span class="text-white font-medium">Mentions L\xE9gales</span></nav><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Mentions <span class="text-gradient-gold">L\xE9gales</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-white/60"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Informations l\xE9gales relatives \xE0 la plateforme tchadbox.com</p></div></section><div class="container-main py-12 max-w-4xl"><div class="card p-8 md:p-12"><div class="prose prose-stone max-w-none"><h2>1. \xC9diteur du Site</h2><p>La plateforme tchadbox.com est \xE9dit\xE9e par :</p><ul><li><strong>Raison sociale :</strong> TchadBox</li><li><strong>Forme juridique :</strong> [\xC0 compl\xE9ter]</li><li><strong>Capital social :</strong> [\xC0 compl\xE9ter]</li><li><strong>Si\xE8ge social :</strong> [Adresse \xE0 compl\xE9ter], France</li><li><strong>SIRET :</strong> [\xC0 compl\xE9ter]</li><li><strong>RCS :</strong> [\xC0 compl\xE9ter]</li><li><strong>TVA Intracommunautaire :</strong> [\xC0 compl\xE9ter]</li><li><strong>Email :</strong> contact@tchadbox.com</li></ul><h2>2. Directeur de la Publication</h2><p> Le directeur de la publication est [Nom du responsable], en qualit\xE9 de [Fonction]. </p><h2>3. H\xE9bergement</h2><p>Le site est h\xE9berg\xE9 par :</p><ul><li><strong>Vercel Inc.</strong></li><li>340 S Lemon Ave #4133</li><li>Walnut, CA 91789, USA</li><li>Site web : vercel.com</li></ul><h2>4. Propri\xE9t\xE9 Intellectuelle</h2><p> L\u2019int\xE9gralit\xE9 du contenu de ce site (textes, images, vid\xE9os, logos, ic\xF4nes, sons, logiciels, etc.) est la propri\xE9t\xE9 exclusive de TchadBox ou de ses partenaires et b\xE9n\xE9ficie de la protection conf\xE9r\xE9e par les lois fran\xE7aises et internationales relatives \xE0 la propri\xE9t\xE9 intellectuelle. </p><p> Toute reproduction, repr\xE9sentation, modification, publication, adaptation totale ou partielle des \xE9l\xE9ments du site, quel que soit le moyen ou le proc\xE9d\xE9 utilis\xE9, est strictement interdite sans autorisation \xE9crite pr\xE9alable de TchadBox. </p><h2>5. Donn\xE9es Personnelles</h2><p> Conform\xE9ment au R\xE8glement G\xE9n\xE9ral sur la Protection des Donn\xE9es (RGPD) et \xE0 la loi Informatique et Libert\xE9s, vous b\xE9n\xE9ficiez d\u2019un droit d\u2019acc\xE8s, de rectification, de suppression et de portabilit\xE9 de vos donn\xE9es personnelles. </p><p> Pour exercer ces droits, adressez votre demande \xE0 : contact@tchadbox.com </p><p> Pour de plus amples informations, veuillez consulter notre `);
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
      _push(`. </p><h2>6. Cookies</h2><p> La plateforme tchadbox.com utilise des cookies pour am\xE9liorer votre exp\xE9rience de navigation, analyser le trafic et personnaliser le contenu. En poursuivant votre navigation, vous consentez \xE0 l\u2019utilisation de ces cookies. </p><p> Vous conservez la possibilit\xE9 de configurer votre navigateur pour refuser les cookies ou \xEAtre alert\xE9 lors de leur envoi. </p><h2>7. Liens Hypertextes</h2><p> Le site peut contenir des liens vers des sites tiers. TchadBox d\xE9cline toute responsabilit\xE9 quant au contenu de ces sites externes et \xE0 leurs pratiques en mati\xE8re de protection des donn\xE9es. </p><h2>8. Limitation de Responsabilit\xE9</h2><p> TchadBox met tout en \u0153uvre pour garantir l\u2019exactitude et l\u2019actualit\xE9 des informations diffus\xE9es sur son site. Toutefois, TchadBox ne peut garantir l\u2019absence d\u2019erreurs ou d\u2019omissions dans les informations mises \xE0 disposition. </p><p> TchadBox d\xE9cline toute responsabilit\xE9 pour toute impr\xE9cision, inexactitude ou omission portant sur les informations disponibles sur le site. </p><h2>9. Droit Applicable et Juridiction</h2><p> Les pr\xE9sentes mentions l\xE9gales sont r\xE9gies par le droit fran\xE7ais. En cas de litige, et apr\xE8s \xE9puisement de toute tentative de r\xE9solution amiable, les tribunaux fran\xE7ais seront seuls comp\xE9tents. </p><h2>10. Nous Contacter</h2><p> Pour toute question relative aux pr\xE9sentes mentions l\xE9gales, vous pouvez nous contacter : </p><ul><li>Par email : contact@tchadbox.com</li><li>Via notre `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-amber-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`formulaire de contact`);
          } else {
            return [
              createTextVNode("formulaire de contact")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mentions-legales.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mentions-legales-1uRfHaee.mjs.map
