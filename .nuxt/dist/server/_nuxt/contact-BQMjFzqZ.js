import { _ as _sfc_main$1 } from "./NuxtImg-DmYb7cK6.js";
import { defineComponent, ref, resolveDirective, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderVNode, ssrRenderClass } from "vue/server-renderer";
import { Loader, Send, Mail, MessageSquare, MapPin, Clock, Zap } from "lucide-vue-next";
import { g as useToast, a as useHead } from "../server.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/defu/dist/defu.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ufo/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/h3/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/unctx/dist/index.mjs";
import "vue-router";
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const form = ref({ name: "", email: "", subject: "", message: "" });
    const isSubmitting = ref(false);
    const contactInfo = [
      { label: "Email professionnel", value: "contact@tchadbox.com", href: "mailto:contact@tchadbox.com", icon: Mail, color: "#2563EB", note: "Réponse garantie sous 24h" },
      { label: "WhatsApp direct", value: "+33 X XX XX XX XX", href: "#", icon: MessageSquare, color: "#059669", note: "Assistance en temps réel" },
      { label: "Zone de livraison", value: "N'Djamena, Tchad", href: null, icon: MapPin, color: "#D97706", note: "Couverture complète de la capitale" }
    ];
    const hours = [
      { day: "Lun - Ven", time: "9h - 18h", closed: false },
      { day: "Samedi", time: "10h - 14h", closed: false },
      { day: "Dimanche", time: "", closed: true }
    ];
    useHead({ title: "Contact" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative py-24 overflow-hidden text-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/hero-contact.png",
        alt: "Contact TchadBox",
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
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}>Support</span><h1${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 100 } },
        class: "heading-section text-white mb-4"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Contactez-<span class="text-gradient-gold">nous</span></h1><p${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 20 },
        enter: { opacity: 1, y: 0, transition: { delay: 200 } },
        class: "text-lg text-white/70 max-w-lg mx-auto"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))}> Notre équipe dédiée est à votre écoute pour vous accompagner à chaque étape </p></div></section><div class="container-main py-16"><div class="grid grid-cols-1 lg:grid-cols-5 gap-10"><div class="lg:col-span-3"><div class="card p-8 md:p-10"><h2 class="text-2xl font-bold text-[var(--color-text)] mb-2">Écrivez-nous</h2><p class="text-[var(--color-text-muted)] mb-8">Notre équipe s&#39;engage à vous répondre sous 24 heures</p><form class="space-y-6"><div class="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-[var(--color-text)] mb-2">Nom complet</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Votre nom" class="input" required></div><div><label class="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="votre@email.com" class="input" required></div></div><div><label class="block text-sm font-medium text-[var(--color-text)] mb-2">Sujet</label><select class="input" required><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "") : ssrLooseEqual(unref(form).subject, "")) ? " selected" : ""}>Choisir un sujet</option><option value="commande"${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "commande") : ssrLooseEqual(unref(form).subject, "commande")) ? " selected" : ""}>Ma commande</option><option value="livraison"${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "livraison") : ssrLooseEqual(unref(form).subject, "livraison")) ? " selected" : ""}>Livraison</option><option value="paiement"${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "paiement") : ssrLooseEqual(unref(form).subject, "paiement")) ? " selected" : ""}>Paiement</option><option value="autre"${ssrIncludeBooleanAttr(Array.isArray(unref(form).subject) ? ssrLooseContain(unref(form).subject, "autre") : ssrLooseEqual(unref(form).subject, "autre")) ? " selected" : ""}>Autre question</option></select></div><div><label class="block text-sm font-medium text-[var(--color-text)] mb-2">Message</label><textarea rows="5" placeholder="Décrivez votre question en détail..." class="input resize-none" required>${ssrInterpolate(unref(form).message)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="btn-gold w-full"><span>`);
      if (unref(isSubmitting)) {
        _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Send), { class: "w-5 h-5" }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(isSubmitting) ? "Envoi..." : "Envoyer le message")}</span></button></form></div></div><div class="lg:col-span-2 space-y-6"><!--[-->`);
      ssrRenderList(contactInfo, (info, i) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: info.label,
          initial: { opacity: 0, x: 20 },
          visibleOnce: { opacity: 1, x: 0, transition: { delay: i * 100 } },
          class: "card p-6 group hover:!border-[var(--color-accent)]/20"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))}><div class="flex items-start gap-4"><div class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style="${ssrRenderStyle({ background: `${info.color}12` })}">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(info.icon), {
          class: "w-6 h-6",
          style: { color: info.color }
        }, null), _parent);
        _push(`</div><div><h3 class="font-semibold text-[var(--color-text)] mb-1">${ssrInterpolate(info.label)}</h3>`);
        if (info.href) {
          _push(`<a${ssrRenderAttr("href", info.href)} class="text-[var(--color-accent-dark)] hover:underline">${ssrInterpolate(info.value)}</a>`);
        } else {
          _push(`<p class="text-[var(--color-text-muted)]">${ssrInterpolate(info.value)}</p>`);
        }
        if (info.note) {
          _push(`<p class="text-xs text-[var(--color-text-muted)] mt-1">${ssrInterpolate(info.note)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--><div class="card p-6"><div class="flex items-center gap-3 mb-5"><div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(Clock), { class: "w-5 h-5 text-purple-600" }, null, _parent));
      _push(`</div><h3 class="font-semibold text-[var(--color-text)]">Horaires</h3></div><div class="space-y-3"><!--[-->`);
      ssrRenderList(hours, (h) => {
        _push(`<div class="flex justify-between items-center"><span class="text-[var(--color-text-secondary)]">${ssrInterpolate(h.day)}</span><span class="${ssrRenderClass([h.closed ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600", "text-sm font-medium px-3 py-1 rounded-full"])}">${ssrInterpolate(h.closed ? "Fermé" : h.time)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/15 rounded-2xl p-5 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">`);
      _push(ssrRenderComponent(unref(Zap), { class: "w-6 h-6 text-[var(--color-accent-dark)]" }, null, _parent));
      _push(`</div><div><p class="font-semibold text-[var(--color-text)] text-sm">Temps de réponse moyen</p><p class="text-xs text-[var(--color-text-muted)]">Moins de 24h — votre satisfaction est notre priorité</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=contact-BQMjFzqZ.js.map
