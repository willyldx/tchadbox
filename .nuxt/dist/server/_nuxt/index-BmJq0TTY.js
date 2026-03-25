import { j as useRuntimeConfig, f as useCartStore, c as useSeoMeta, u as useRouter, i as useAuthStore, n as navigateTo, d as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, watchEffect, reactive, ref, computed, withCtx, unref, createVNode, createTextVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderVNode } from "vue/server-renderer";
import { Package, ArrowLeft, Check, User, CreditCard, Smartphone, Banknote, ShieldCheck, Info, ArrowRight, Loader, Lock } from "lucide-vue-next";
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
const usePaystack = () => {
  const config = useRuntimeConfig();
  const publicKey = config.public.paystackPublicKey;
  const loadScript = () => {
    return new Promise((resolve, reject) => {
      {
        reject(new Error("Paystack can only be used in the browser"));
        return;
      }
    });
  };
  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `TCB-${timestamp}-${random}`.toUpperCase();
  };
  const convertToPaymentAmount = (amount, currency) => {
    const cartStore = useCartStore();
    if (currency === "XAF" || currency === "XOF") {
      return Math.round(amount * cartStore.rates.XAF);
    }
    if (currency === "USD") {
      return Math.round(amount * cartStore.rates.USD * 100);
    }
    return Math.round(amount * 100);
  };
  const initializePayment = async (options) => {
    await loadScript();
    const PaystackPop = (void 0).PaystackPop;
    if (!PaystackPop) {
      throw new Error("Paystack SDK not loaded");
    }
    const currencyCode = options.currency === "XAF" ? "XOF" : options.currency || "EUR";
    const handler = PaystackPop.setup({
      key: publicKey,
      email: options.email,
      amount: options.amount,
      currency: currencyCode,
      ref: options.reference || generateReference(),
      metadata: {
        custom_fields: [
          ...options.metadata?.custom_fields || []
        ],
        ...options.metadata
      },
      channels: options.channels || ["card", "mobile_money", "bank_transfer"],
      callback: (response) => {
        options.onSuccess(response);
      },
      onClose: () => {
        options.onClose();
      }
    });
    handler.openIframe();
  };
  return {
    initializePayment,
    verifyPayment,
    generateReference,
    convertToPaymentAmount,
    formatXof
  };
  const formatXof = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0
    }).format(amount);
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Paiement - TchadBox",
      description: "Finalisez votre commande TchadBox."
    });
    useRouter();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const { initializePayment, verifyPayment: verifyPayment2, eurToXof } = usePaystack();
    watchEffect(() => {
      if (cartStore.isHydrated && cartStore.isEmpty) {
        navigateTo("/catalogue");
      }
    });
    reactive({
      email: "",
      phone: "",
      recipientPhone: ""
    });
    const form = reactive({
      firstName: authStore.user?.firstName || "",
      lastName: authStore.user?.lastName || "",
      email: authStore.user?.email || "",
      phone: authStore.user?.phone || "",
      recipientName: "",
      recipientPhone: "",
      address: {
        address1: "",
        address2: "",
        city: "N'Djamena",
        country: "Tchad"
      },
      deliveryInstructions: ""
    });
    const sameAsCustomer = ref(true);
    const selectedPayment = ref("card");
    const acceptTerms = ref(false);
    const isSubmitting = ref(false);
    const paymentError = ref(null);
    const paymentMethods = [
      {
        id: "card",
        label: "Carte bancaire",
        description: "Visa, Mastercard — sécurisé via Paystack",
        icon: CreditCard
      },
      {
        id: "mobile_money",
        label: "Mobile Money",
        description: "MTN, Orange Money, Wave",
        icon: Smartphone
      },
      {
        id: "bank_transfer",
        label: "Virement bancaire",
        description: "Transfert direct depuis votre banque",
        icon: Banknote
      }
    ];
    computed(() => {
      const channelMap = {
        card: ["card"],
        mobile_money: ["mobile_money"],
        bank_transfer: ["bank_transfer"]
      };
      return channelMap[selectedPayment.value] || ["card", "mobile_money", "bank_transfer"];
    });
    const canProceed = computed(() => {
      if (currentStep.value === 0) {
        return form.firstName && form.lastName && form.email && form.phone && form.address.address1 && (sameAsCustomer.value || form.recipientName && form.recipientPhone);
      }
      if (currentStep.value === 1) {
        return selectedPayment.value;
      }
      return true;
    });
    function getStepClass(index) {
      if (index < currentStep.value) {
        return "bg-amber-500 text-white";
      }
      if (index === currentStep.value) {
        return "bg-amber-500 text-white";
      }
      return "bg-gray-100 text-[var(--color-text-muted)]";
    }
    function formatPrice(amount) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(amount);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex items-center justify-between mb-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Package), { class: "w-5 h-5 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-xl font-bold text-[var(--color-text)]"${_scopeId}>TchadBox</span>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center" }, [
                createVNode(unref(Package), { class: "w-5 h-5 text-white" })
              ]),
              createVNode("span", { class: "text-xl font-bold text-[var(--color-text)]" }, "TchadBox")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/panier",
        class: "text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent-dark)] flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4" }, null, _parent2, _scopeId));
            _push2(` Retour au panier `);
          } else {
            return [
              createVNode(unref(ArrowLeft), { class: "w-4 h-4" }),
              createTextVNode(" Retour au panier ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mb-12"><div class="flex items-center justify-center"><!--[-->`);
      ssrRenderList(_ctx.steps, (step, index) => {
        _push(`<div class="flex items-center"><div class="flex flex-col items-center"><div class="${ssrRenderClass([getStepClass(index), "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors"])}">`);
        if (index < _ctx.currentStep) {
          _push(ssrRenderComponent(unref(Check), { class: "w-5 h-5" }, null, _parent));
        } else {
          _push(`<span>${ssrInterpolate(index + 1)}</span>`);
        }
        _push(`</div><span class="${ssrRenderClass([index <= _ctx.currentStep ? "text-amber-600" : "text-[var(--color-text-muted)]", "text-xs mt-2 font-medium"])}">${ssrInterpolate(step.label)}</span></div>`);
        if (index < _ctx.steps.length - 1) {
          _push(`<div class="${ssrRenderClass([index < _ctx.currentStep ? "bg-amber-500" : "bg-gray-200", "w-20 sm:w-32 h-0.5 mx-2"])}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="space-y-6" style="${ssrRenderStyle(_ctx.currentStep === 0 ? null : { display: "none" })}"><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Vos informations</h2></div><div class="p-6 space-y-5">`);
      if (!unref(authStore).isAuthenticated) {
        _push(`<div class="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">`);
        _push(ssrRenderComponent(unref(User), { class: "w-5 h-5 text-amber-600 mt-0.5 shrink-0" }, null, _parent));
        _push(`<div><p class="text-sm text-amber-800 font-medium">Déjà client ?</p><p class="text-sm text-amber-600">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login?redirect=/checkout",
          class: "underline hover:no-underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Connectez-vous `);
            } else {
              return [
                createTextVNode(" Connectez-vous ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` pour pré-remplir vos informations. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Prénom *</label><input${ssrRenderAttr("value", unref(form).firstName)} type="text" required class="input"></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom *</label><input${ssrRenderAttr("value", unref(form).lastName)} type="text" required class="input"></div></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Email *</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="input"></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Téléphone *</label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" required placeholder="+235 XX XX XX XX" class="input"></div></div></div><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Destinataire au Tchad</h2><p class="text-sm text-[var(--color-text-muted)]">Personne qui recevra le colis à N&#39;Djamena</p></div><div class="p-6 space-y-5"><div class="flex items-center gap-2 mb-4"><input id="sameRecipient"${ssrIncludeBooleanAttr(Array.isArray(unref(sameAsCustomer)) ? ssrLooseContain(unref(sameAsCustomer), null) : unref(sameAsCustomer)) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20"><label for="sameRecipient" class="text-sm text-[var(--color-text-secondary)]"> Je suis le destinataire </label></div>`);
      if (!unref(sameAsCustomer)) {
        _push(`<div class="space-y-5"><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nom du destinataire *</label><input${ssrRenderAttr("value", unref(form).recipientName)} type="text" required class="input"></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Téléphone du destinataire *</label><input${ssrRenderAttr("value", unref(form).recipientPhone)} type="tel" required placeholder="+235 XX XX XX XX" class="input"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adresse de livraison *</label><input${ssrRenderAttr("value", unref(form).address.address1)} type="text" required placeholder="Quartier, rue, repère..." class="input"></div><div class="grid sm:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Ville *</label><select required class="input"><option value="N&#39;Djamena"${ssrIncludeBooleanAttr(Array.isArray(unref(form).address.city) ? ssrLooseContain(unref(form).address.city, "N'Djamena") : ssrLooseEqual(unref(form).address.city, "N'Djamena")) ? " selected" : ""}>N&#39;Djamena</option><option value="Moundou"${ssrIncludeBooleanAttr(Array.isArray(unref(form).address.city) ? ssrLooseContain(unref(form).address.city, "Moundou") : ssrLooseEqual(unref(form).address.city, "Moundou")) ? " selected" : ""}>Moundou</option><option value="Sarh"${ssrIncludeBooleanAttr(Array.isArray(unref(form).address.city) ? ssrLooseContain(unref(form).address.city, "Sarh") : ssrLooseEqual(unref(form).address.city, "Sarh")) ? " selected" : ""}>Sarh</option></select></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Pays</label><input value="Tchad" disabled class="w-full px-4 py-3 bg-gray-100 border border-[var(--color-border)] rounded-xl text-[var(--color-text-muted)]"></div></div><div><label class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"> Instructions de livraison <span class="text-[var(--color-text-muted)] font-normal">(optionnel)</span></label><textarea rows="3" placeholder="Horaires préférés, instructions spéciales..." class="input resize-none">${ssrInterpolate(unref(form).deliveryInstructions)}</textarea></div></div></div></div><div class="space-y-6" style="${ssrRenderStyle(_ctx.currentStep === 1 ? null : { display: "none" })}"><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Mode de paiement</h2><p class="text-sm text-[var(--color-text-muted)] mt-1">Paiement sécurisé via Paystack</p></div><div class="p-6 space-y-4"><!--[-->`);
      ssrRenderList(paymentMethods, (method) => {
        _push(`<label class="${ssrRenderClass([unref(selectedPayment) === method.id ? "border-amber-500 bg-amber-50" : "border-[var(--color-border)] hover:border-gray-300", "flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors"])}"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedPayment), method.id)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", method.id)} class="w-5 h-5 text-amber-500 border-gray-300 focus:ring-amber-500/20"><div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(method.icon), { class: "w-6 h-6 text-[var(--color-text-secondary)]" }, null), _parent);
        _push(`</div><div class="flex-1"><p class="font-medium text-[var(--color-text)]">${ssrInterpolate(method.label)}</p><p class="text-sm text-[var(--color-text-muted)]">${ssrInterpolate(method.description)}</p></div></label>`);
      });
      _push(`<!--]--><div class="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3 mt-4">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-5 h-5 text-green-600 mt-0.5 shrink-0" }, null, _parent));
      _push(`<div><p class="text-sm text-green-800 font-medium">Paiement 100% sécurisé</p><p class="text-sm text-green-600 mt-1"> Vos informations de paiement sont traitées de manière sécurisée par Paystack. Nous ne stockons jamais vos données bancaires. </p></div></div></div></div>`);
      if (unref(paymentError)) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">`);
        _push(ssrRenderComponent(unref(Info), { class: "w-5 h-5 text-red-500 mt-0.5 shrink-0" }, null, _parent));
        _push(`<div><p class="text-sm text-red-800 font-medium">Erreur de paiement</p><p class="text-sm text-red-600 mt-1">${ssrInterpolate(unref(paymentError))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6" style="${ssrRenderStyle(_ctx.currentStep === 2 ? null : { display: "none" })}"><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Récapitulatif de votre commande</h2></div><div class="p-6 space-y-6"><div><h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">EXPÉDITEUR</h3><p class="text-[var(--color-text)]">${ssrInterpolate(unref(form).firstName)} ${ssrInterpolate(unref(form).lastName)}</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(unref(form).email)}</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(unref(form).phone)}</p></div><div><h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">DESTINATAIRE</h3><p class="text-[var(--color-text)]">${ssrInterpolate(unref(sameAsCustomer) ? `${unref(form).firstName} ${unref(form).lastName}` : unref(form).recipientName)}</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(unref(sameAsCustomer) ? unref(form).phone : unref(form).recipientPhone)}</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(unref(form).address.address1)}</p><p class="text-[var(--color-text-secondary)]">${ssrInterpolate(unref(form).address.city)}, Tchad</p></div><div><h3 class="text-sm font-medium text-[var(--color-text-muted)] mb-3">PAIEMENT</h3><p class="text-[var(--color-text)]">${ssrInterpolate(paymentMethods.find((m) => m.id === unref(selectedPayment))?.label)}</p></div></div></div><div class="flex items-start gap-3"><input id="terms"${ssrIncludeBooleanAttr(Array.isArray(unref(acceptTerms)) ? ssrLooseContain(unref(acceptTerms), null) : unref(acceptTerms)) ? " checked" : ""} type="checkbox" required class="w-5 h-5 mt-0.5 text-amber-500 border-gray-300 rounded focus:ring-amber-500/20"><label for="terms" class="text-sm text-[var(--color-text-secondary)]"> J&#39;accepte les `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/conditions",
        class: "text-amber-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`conditions générales de vente`);
          } else {
            return [
              createTextVNode("conditions générales de vente")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` et la `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/confidentialite",
        class: "text-amber-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`politique de confidentialité`);
          } else {
            return [
              createTextVNode("politique de confidentialité")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</label></div></div><div class="flex gap-4 mt-8">`);
      if (_ctx.currentStep > 0) {
        _push(`<button class="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent));
        _push(` Retour </button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.currentStep < 2) {
        _push(`<button${ssrIncludeBooleanAttr(!unref(canProceed)) ? " disabled" : ""} class="flex-1 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"> Continuer `);
        _push(ssrRenderComponent(unref(ArrowRight), { class: "w-5 h-5" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.currentStep === 2) {
        _push(`<button${ssrIncludeBooleanAttr(!unref(acceptTerms) || unref(isSubmitting)) ? " disabled" : ""} class="flex-1 py-3 btn-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isSubmitting)) {
          _push(ssrRenderComponent(unref(Loader), { class: "w-5 h-5 animate-spin" }, null, _parent));
        } else {
          _push(ssrRenderComponent(unref(Lock), { class: "w-5 h-5" }, null, _parent));
        }
        _push(` ${ssrInterpolate(unref(isSubmitting) ? "Traitement..." : `Payer ${unref(cartStore).totalFormatted}`)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="lg:col-span-1"><div class="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden sticky top-8"><div class="p-6 border-b border-[var(--color-border)]"><h2 class="text-lg font-semibold text-[var(--color-text)]">Votre commande</h2></div><div class="max-h-64 overflow-y-auto"><!--[-->`);
      ssrRenderList(unref(cartStore).items, (item) => {
        _push(`<div class="flex items-center gap-4 p-4 border-b border-gray-50"><div class="relative"><div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">`);
        if (item.thumbnail) {
          _push(`<img${ssrRenderAttr("src", item.thumbnail)}${ssrRenderAttr("alt", item.title)} class="w-12 h-12 object-contain">`);
        } else {
          _push(ssrRenderComponent(unref(Package), { class: "w-6 h-6 text-[var(--color-text-muted)]" }, null, _parent));
        }
        _push(`</div><span class="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">${ssrInterpolate(item.quantity)}</span></div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-[var(--color-text)] truncate">${ssrInterpolate(item.title)}</p><p class="text-xs text-[var(--color-text-muted)]">${ssrInterpolate(formatPrice(item.price))} × ${ssrInterpolate(item.quantity)}</p></div><p class="font-semibold text-[var(--color-text)]">${ssrInterpolate(formatPrice(item.price * item.quantity))}</p></div>`);
      });
      _push(`<!--]--></div><div class="p-6 space-y-3"><div class="flex justify-between text-[var(--color-text-secondary)]"><span>Sous-total</span><span>${ssrInterpolate(unref(cartStore).subtotalFormatted)}</span></div><div class="flex justify-between text-[var(--color-text-secondary)]"><span>Livraison</span><span>${ssrInterpolate(unref(cartStore).shippingFormatted)}</span></div><div class="pt-3 border-t border-[var(--color-border)] flex justify-between"><span class="font-semibold text-[var(--color-text)]">Total</span><div class="text-right"><p class="font-bold text-lg text-[var(--color-text)]">${ssrInterpolate(unref(cartStore).totalFormatted)}</p><p class="text-xs text-[var(--color-text-muted)]">≈ ${ssrInterpolate(unref(cartStore).totalFCFA)}</p></div></div></div><div class="px-6 pb-6 flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)]"><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(Lock), { class: "w-4 h-4" }, null, _parent));
      _push(` SSL sécurisé </span><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "w-4 h-4" }, null, _parent));
      _push(` Paiement protégé </span></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BmJq0TTY.js.map
