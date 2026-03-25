import { a as useHead, d as __nuxt_component_0, e as _export_sfc } from "../server.mjs";
import { defineComponent, ref, resolveDirective, unref, withCtx, createVNode, createTextVNode, resolveDynamicComponent, mergeProps, openBlock, createBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderVNode, ssrGetDirectiveProps } from "vue/server-renderer";
import { ShoppingBag, Play, Shield, Truck, Camera, Users, CheckCircle, Clock, MessageCircle, Wheat, BookOpen, Heart, Gift, ArrowRight, Package, CreditCard, Star, MapPin } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./ProductCard-FQ3ZH5LB.js";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/hookable/dist/index.mjs";
import "C:/Users/adoum/Desktop/Free Project/tchadbox/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
const slideDuration = 6e3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const heroSlides = [
      {
        image: "/hero-bg.png",
        title: 'Offrez le meilleur<br />à vos <span class="text-gradient-gold">proches</span> au Tchad',
        subtitle: "Où que vous soyez dans le monde, envoyez des produits de qualité à votre famille. Livraison sécurisée et confirmée par photo."
      },
      {
        image: "/hero-slide2.png",
        title: `La joie de <span class="text-gradient-gold">recevoir</span>,<br />le bonheur d'offrir`,
        subtitle: "Chaque colis TchadBox crée un moment de bonheur. Découvrez nos packs alimentaires, scolaires et bien plus encore."
      },
      {
        image: "/hero-slide3.png",
        title: 'Un service <span class="text-gradient-gold">fiable</span><br />qui vous ressemble',
        subtitle: "Plus de 500 familles nous font confiance. Rejoignez la communauté TchadBox et restez connecté avec vos proches."
      }
    ];
    const currentSlide = ref(0);
    const trustBadges = [
      { icon: Shield, label: "Paiement 100% sécurisé" },
      { icon: Truck, label: "Livré en 3 à 5 jours" },
      { icon: Camera, label: "Photo de livraison certifiée" }
    ];
    const stats = [
      { value: "500+", label: "Familles accompagnées", icon: Users, bgColor: "rgba(245, 158, 11, 0.1)", iconColor: "#D97706" },
      { value: "100%", label: "Satisfaction garantie", icon: CheckCircle, bgColor: "rgba(5, 150, 105, 0.1)", iconColor: "#059669" },
      { value: "3-5j", label: "Délai de livraison", icon: Clock, bgColor: "rgba(59, 130, 246, 0.1)", iconColor: "#2563EB" },
      { value: "24/7", label: "Service client dédié", icon: MessageCircle, bgColor: "rgba(168, 85, 247, 0.1)", iconColor: "#7C3AED" }
    ];
    const categories = [
      { name: "Alimentaire", handle: "alimentaire", description: "Riz, huile, sucre, farine et produits de première nécessité", icon: Wheat, color: "#059669" },
      { name: "Scolarité", handle: "scolarite", description: "Kits scolaires complets pour la réussite de vos enfants", icon: BookOpen, color: "#2563EB" },
      { name: "Santé & Bébé", handle: "sante", description: "Médicaments, couches et soins essentiels", icon: Heart, color: "#EC4899" },
      { name: "Fêtes", handle: "fetes", description: "Packs spéciaux Ramadan, Tabaski et occasions", icon: Gift, color: "#D97706" }
    ];
    const featuredProducts = ref([]);
    const steps = [
      { title: "Sélectionnez", description: "Choisissez parmi nos produits de qualité vérifiée", icon: Package },
      { title: "Réglez en toute sérénité", description: "Paiement sécurisé par carte bancaire ou Mobile Money", icon: CreditCard },
      { title: "Nous livrons", description: "Notre équipe locale livre directement à domicile en 3-5 jours", icon: Truck },
      { title: "Preuve certifiée", description: "Recevez la photo de remise par WhatsApp ou email", icon: Camera }
    ];
    const testimonials = [];
    useHead({ title: "Accueil" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1bea5839><section class="hero-image relative min-h-[65vh] flex items-center overflow-hidden" data-v-1bea5839><!--[-->`);
      ssrRenderList(heroSlides, (slide, i) => {
        _push(`<div data-v-1bea5839><img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.title)} class="${ssrRenderClass([{ "hero-zoom": unref(currentSlide) === i }, "absolute inset-0 w-full h-full object-cover"])}" loading="eager" style="${ssrRenderStyle(unref(currentSlide) === i ? null : { display: "none" })}" data-v-1bea5839></div>`);
      });
      _push(`<!--]--><div class="orb orb-amber w-96 h-96 -top-20 right-0 animate-float" style="${ssrRenderStyle({ "z-index": "2" })}" data-v-1bea5839></div><div class="container-main relative z-10 py-20" data-v-1bea5839><div class="max-w-2xl" data-v-1bea5839><div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8" data-v-1bea5839><span class="w-2 h-2 rounded-full bg-green-400 animate-pulse" data-v-1bea5839></span><span class="text-sm font-medium text-white/90" data-v-1bea5839>🇹🇩 Service de livraison premium à N&#39;Djamena — Preuve photo garantie</span></div><div class="relative min-h-[180px] md:min-h-[160px]" data-v-1bea5839><!--[--><div data-v-1bea5839><h1 class="heading-hero text-white mb-6" data-v-1bea5839>${heroSlides[unref(currentSlide)].title ?? ""}</h1><p class="text-xl text-white/80 mb-10 max-w-lg leading-relaxed" data-v-1bea5839>${ssrInterpolate(heroSlides[unref(currentSlide)].subtitle)}</p></div><!--]--></div><div class="flex flex-col sm:flex-row gap-4" data-v-1bea5839>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue",
        class: "btn-gold text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-1bea5839${_scopeId}>`);
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
        to: "/comment-ca-marche",
        class: "btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-[var(--color-primary)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-1bea5839${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Play), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`Comment ça marche</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode(unref(Play), { class: "w-5 h-5" }),
                createTextVNode("Comment ça marche")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap items-center gap-6 mt-14 pt-8 border-t border-white/10" data-v-1bea5839><!--[-->`);
      ssrRenderList(trustBadges, (badge) => {
        _push(`<div class="flex items-center gap-2.5" data-v-1bea5839><div class="w-8 h-8 rounded-lg bg-[var(--color-accent)]/20 flex items-center justify-center" data-v-1bea5839>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(badge.icon), { class: "w-4 h-4 text-[var(--color-accent)]" }, null), _parent);
        _push(`</div><span class="text-sm text-white/80 font-medium" data-v-1bea5839>${ssrInterpolate(badge.label)}</span></div>`);
      });
      _push(`<!--]--></div><div class="flex items-center gap-3 mt-8" data-v-1bea5839><!--[-->`);
      ssrRenderList(heroSlides, (slide, i) => {
        _push(`<button class="${ssrRenderClass([unref(currentSlide) === i ? "w-12 bg-white/30" : "w-6 bg-white/20 hover:bg-white/30", "relative h-1.5 rounded-full overflow-hidden transition-all duration-500"])}" data-v-1bea5839>`);
        if (unref(currentSlide) === i) {
          _push(`<div class="absolute inset-0 bg-[var(--color-accent)] rounded-full hero-progress" style="${ssrRenderStyle({ animationDuration: slideDuration + "ms" })}" data-v-1bea5839></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div></div><div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10" data-v-1bea5839></div></section><section class="py-16 bg-[var(--color-bg)]" data-v-1bea5839><div class="container-main" data-v-1bea5839><div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-v-1bea5839><!--[-->`);
      ssrRenderList(stats, (stat, i) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: stat.label,
          initial: { opacity: 0, y: 20 },
          visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 100 } },
          class: "card-stat text-center group"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-1bea5839><div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300" style="${ssrRenderStyle({ background: stat.bgColor })}" data-v-1bea5839>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(stat.icon), {
          class: "w-6 h-6",
          style: { color: stat.iconColor }
        }, null), _parent);
        _push(`</div><div class="text-3xl font-bold text-[var(--color-text)] mb-1" style="${ssrRenderStyle({ "font-family": "var(--font-display)" })}" data-v-1bea5839>${ssrInterpolate(stat.value)}</div><div class="text-sm text-[var(--color-text-muted)]" data-v-1bea5839>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 bg-[var(--color-bg-warm)]" data-v-1bea5839><div class="container-main" data-v-1bea5839><div class="text-center mb-14" data-v-1bea5839><span class="label mb-3 block" data-v-1bea5839>Nos gammes</span><h2 class="heading-section" data-v-1bea5839>Explorez nos <span class="text-gradient" data-v-1bea5839>catégories</span></h2><p class="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto" data-v-1bea5839> Des produits rigoureusement sélectionnés, sourcés localement pour garantir fraîcheur et qualité </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-v-1bea5839><!--[-->`);
      ssrRenderList(categories, (cat, i) => {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          key: cat.handle,
          to: `/catalogue?categorie=${cat.handle}`,
          initial: { opacity: 0, y: 30 },
          visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 100 } },
          class: "group"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="card p-8 text-center h-full hover:!border-transparent relative overflow-hidden" style="${ssrRenderStyle({ "--hover-bg": `${cat.color}08` })}" data-v-1bea5839${_scopeId}><div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="${ssrRenderStyle({ background: `linear-gradient(135deg, ${cat.color}08 0%, transparent 100%)` })}" data-v-1bea5839${_scopeId}></div><div class="relative z-10" data-v-1bea5839${_scopeId}><div class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl group-hover:shadow-lg" style="${ssrRenderStyle({ background: `${cat.color}12`, boxShadow: `0 0 0 0 ${cat.color}00` })}" data-v-1bea5839${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(cat.icon), {
                class: "w-8 h-8 transition-transform duration-500",
                style: { color: cat.color }
              }, null), _parent2, _scopeId);
              _push2(`</div><h3 class="text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-text)] transition-colors" data-v-1bea5839${_scopeId}>${ssrInterpolate(cat.name)}</h3><p class="text-sm text-[var(--color-text-muted)]" data-v-1bea5839${_scopeId}>${ssrInterpolate(cat.description)}</p></div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: "card p-8 text-center h-full hover:!border-transparent relative overflow-hidden",
                  style: { "--hover-bg": `${cat.color}08` }
                }, [
                  createVNode("div", {
                    class: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    style: { background: `linear-gradient(135deg, ${cat.color}08 0%, transparent 100%)` }
                  }, null, 4),
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("div", {
                      class: "w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rounded-xl group-hover:shadow-lg",
                      style: { background: `${cat.color}12`, boxShadow: `0 0 0 0 ${cat.color}00` }
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(cat.icon), {
                        class: "w-8 h-8 transition-transform duration-500",
                        style: { color: cat.color }
                      }, null, 8, ["style"]))
                    ], 4),
                    createVNode("h3", { class: "text-lg font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-text)] transition-colors" }, toDisplayString(cat.name), 1),
                    createVNode("p", { class: "text-sm text-[var(--color-text-muted)]" }, toDisplayString(cat.description), 1)
                  ])
                ], 4)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
      if (unref(featuredProducts).length > 0) {
        _push(`<section class="py-20 bg-[var(--color-bg)]" data-v-1bea5839><div class="container-main" data-v-1bea5839><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14" data-v-1bea5839><div data-v-1bea5839><span class="label mb-3 block" data-v-1bea5839>Les plus demandés</span><h2 class="heading-section" data-v-1bea5839>Nos <span class="text-gradient" data-v-1bea5839>best-sellers</span></h2></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalogue",
          class: "btn-outline self-start group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-1bea5839${_scopeId}>Voir tout `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "w-4 h-4 transition-transform group-hover:translate-x-1" }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createTextVNode("Voir tout "),
                  createVNode(unref(ArrowRight), { class: "w-4 h-4 transition-transform group-hover:translate-x-1" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-v-1bea5839><!--[-->`);
        ssrRenderList(unref(featuredProducts), (product, i) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            key: product.id,
            product,
            delay: i * 100
          }, null, _parent));
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="py-24 bg-[var(--color-bg-warm)] relative overflow-hidden" data-v-1bea5839><div class="orb orb-amber w-80 h-80 -top-20 -right-20 opacity-10" data-v-1bea5839></div><div class="container-main relative" data-v-1bea5839><div class="text-center mb-16" data-v-1bea5839><span class="label mb-3 block" data-v-1bea5839>Simple et rapide</span><h2 class="heading-section" data-v-1bea5839>Comment ça <span class="text-gradient" data-v-1bea5839>marche</span></h2><p class="text-[var(--color-text-muted)] mt-3 max-w-lg mx-auto" data-v-1bea5839> Un processus en 4 étapes pensé pour votre tranquillité d&#39;esprit </p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative" data-v-1bea5839><div class="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px" data-v-1bea5839><div class="w-full h-full bg-gradient-to-r from-[var(--color-accent)]/20 via-[var(--color-accent)]/40 to-[var(--color-accent)]/20" data-v-1bea5839></div></div><!--[-->`);
      ssrRenderList(steps, (step, i) => {
        _push(`<div${ssrRenderAttrs(mergeProps({
          key: i,
          initial: { opacity: 0, y: 30 },
          visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 150 } },
          class: "text-center relative group"
        }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-1bea5839><div class="relative mx-auto mb-6" data-v-1bea5839><div class="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center relative z-10 shadow-lg transition-all duration-500 group-hover:rounded-xl group-hover:scale-110 group-hover:shadow-xl" data-v-1bea5839>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(step.icon), { class: "w-7 h-7" }, null), _parent);
        _push(`</div><span class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-accent)] text-white text-sm font-bold flex items-center justify-center shadow-md z-20" data-v-1bea5839>${ssrInterpolate(i + 1)}</span></div><h3 class="font-semibold text-[var(--color-text)] mb-2 text-lg" data-v-1bea5839>${ssrInterpolate(step.title)}</h3><p class="text-sm text-[var(--color-text-muted)] max-w-[200px] mx-auto" data-v-1bea5839>${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section>`);
      if (testimonials.length > 0) {
        _push(`<section class="py-24 bg-[var(--color-bg)]" data-v-1bea5839><div class="container-main" data-v-1bea5839><div class="text-center mb-14" data-v-1bea5839><span class="label mb-3 block" data-v-1bea5839>Ils nous font confiance</span><h2 class="heading-section" data-v-1bea5839>La parole à notre <span class="text-gradient" data-v-1bea5839>communauté</span></h2></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1bea5839><!--[-->`);
        ssrRenderList(testimonials, (t, i) => {
          _push(`<div${ssrRenderAttrs(mergeProps({
            key: t.id,
            initial: { opacity: 0, scale: 0.95 },
            visibleOnce: { opacity: 1, scale: 1, transition: { delay: i * 100 } },
            class: "card p-8 group hover:!border-[var(--color-accent)]/20"
          }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-1bea5839><div class="flex gap-1 mb-5" data-v-1bea5839><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(ssrRenderComponent(unref(Star), {
              key: n,
              class: "w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
            }, null, _parent));
          });
          _push(`<!--]--></div><p class="text-[var(--color-text-secondary)] mb-6 leading-relaxed" data-v-1bea5839>&quot;${ssrInterpolate(t.message)}&quot;</p><div class="flex items-center gap-4 pt-5 border-t border-[var(--color-border)]" data-v-1bea5839><div class="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white flex items-center justify-center font-bold text-sm" data-v-1bea5839>${ssrInterpolate(t.name.charAt(0))}</div><div data-v-1bea5839><div class="font-semibold text-[var(--color-text)] text-sm" data-v-1bea5839>${ssrInterpolate(t.name)}</div><div class="text-xs text-[var(--color-text-muted)] flex items-center gap-1" data-v-1bea5839>`);
          _push(ssrRenderComponent(unref(MapPin), { class: "w-3 h-3" }, null, _parent));
          _push(`${ssrInterpolate(t.location)}</div></div></div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="relative py-28 overflow-hidden" data-v-1bea5839><div class="absolute inset-0 bg-[var(--color-primary)]" data-v-1bea5839><div class="absolute inset-0 opacity-10" style="${ssrRenderStyle({ "background-image": "url('/hero-bg.png')", "background-size": "cover", "background-position": "center" })}" data-v-1bea5839></div></div><div class="orb orb-amber w-96 h-96 top-0 left-1/4 opacity-15" data-v-1bea5839></div><div class="orb orb-warm w-80 h-80 bottom-0 right-1/4 opacity-10" data-v-1bea5839></div><div class="container-main relative z-10 text-center" data-v-1bea5839><h2${ssrRenderAttrs(mergeProps({
        initial: { opacity: 0, y: 30 },
        visibleOnce: { opacity: 1, y: 0 },
        class: "heading-section text-white mb-6"
      }, ssrGetDirectiveProps(_ctx, _directive_motion)))} data-v-1bea5839> Faites la différence <span class="text-gradient-gold" data-v-1bea5839>aujourd&#39;hui</span></h2><p class="text-xl text-white/70 mb-12 max-w-2xl mx-auto" data-v-1bea5839> Des milliers de familles reçoivent déjà leurs colis grâce à TchadBox. Rejoignez-les et offrez le sourire à vos proches. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-1bea5839>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalogue",
        class: "btn-gold text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-1bea5839${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`Commander maintenant</span>`);
          } else {
            return [
              createVNode("span", null, [
                createVNode(unref(ShoppingBag), { class: "w-5 h-5" }),
                createTextVNode("Commander maintenant")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "btn-outline !border-white/25 !text-white hover:!bg-white hover:!text-[var(--color-primary)]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-1bea5839${_scopeId}>`);
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
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bea5839"]]);
export {
  index as default
};
//# sourceMappingURL=index-Bp7T9mtY.js.map
