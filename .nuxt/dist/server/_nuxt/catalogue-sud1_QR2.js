import { _ as _sfc_main$1 } from "./NuxtImg-CrKgy81i.js";
import { j as useRuntimeConfig, k as useRoute, a as useHead, d as __nuxt_component_0, e as _export_sfc } from "../server.mjs";
import { defineComponent, ref, watch, computed, withCtx, createTextVNode, unref, createVNode, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderVNode, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { ChevronRight, LayoutGrid, Package, Wheat, BookOpen, Heart, Gift, Euro, RotateCcw, Search, AlertCircle, SearchX } from "lucide-vue-next";
import { _ as _sfc_main$2 } from "./ProductCard-CwGfAaKN.js";
import { u as useMeilisearch } from "./useMeilisearch-Bt6eJ6ev.js";
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
import "@clerk/vue";
import "meilisearch";
const useProducts = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl;
  const getProducts = async (params) => {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.q) searchParams.set("q", params.q);
    const query = searchParams.toString();
    const url = `${baseUrl}/products${query ? "?" + query : ""}`;
    return $fetch(url);
  };
  const getProduct = async (slug) => {
    return $fetch(`${baseUrl}/products/${slug}`);
  };
  return { getProducts, getProduct };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "catalogue",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useProducts();
    const products = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    const isSearchMode = ref(false);
    const categories = [
      { name: "Alimentaire", handle: "alimentaire", icon: Wheat },
      { name: "Scolarité", handle: "scolarite", icon: BookOpen },
      { name: "Santé & Bébé", handle: "sante", icon: Heart },
      { name: "Fêtes", handle: "fetes", icon: Gift }
    ];
    const priceRanges = [
      { label: "Tous les prix", value: "" },
      { label: "Moins de 30€", value: "0-30" },
      { label: "30€ - 60€", value: "30-60" },
      { label: "Plus de 60€", value: "60+" }
    ];
    const selectedCategory = ref(route.query.categorie || "");
    const selectedPrice = ref("");
    const searchQuery = ref("");
    const allProducts = ref([]);
    const buildMeilisearchFilter = () => {
      const filters = [];
      if (selectedCategory.value) {
        filters.push(`category_handle = "${selectedCategory.value}"`);
      }
      if (selectedPrice.value) {
        const [min, max] = selectedPrice.value.split("-").map(Number);
        if (max) {
          filters.push(`price >= ${min}`);
          filters.push(`price <= ${max}`);
        } else {
          filters.push(`price >= ${min}`);
        }
      }
      filters.push("is_active = true");
      return filters;
    };
    const doMeilisearch = async (query) => {
      isLoading.value = true;
      try {
        const { performSearch } = useMeilisearch();
        const filter = buildMeilisearchFilter();
        const results = await performSearch(query, {
          limit: 50,
          filter
        });
        products.value = (results.hits || []).map((p) => ({
          id: p.id.toString(),
          title: p.title,
          handle: p.slug || p.id.toString(),
          subtitle: p.subtitle || "",
          description: p.description || "",
          price: p.price || 0,
          thumbnail: p.thumbnail || "",
          images: [],
          category: p.category || "",
          categoryHandle: p.category_handle || "",
          inStock: p.in_stock ?? true
        }));
        isSearchMode.value = true;
      } catch (e) {
        console.error("Meilisearch error, falling back to frontend filter:", e);
        isSearchMode.value = false;
      } finally {
        isLoading.value = false;
      }
    };
    let searchTimeout = null;
    watch(searchQuery, (q) => {
      if (searchTimeout) clearTimeout(searchTimeout);
      if (!q || q.length < 2) {
        isSearchMode.value = false;
        products.value = [...allProducts.value];
        return;
      }
      searchTimeout = setTimeout(() => doMeilisearch(q), 300);
    });
    watch([selectedCategory, selectedPrice], () => {
      if (searchQuery.value && searchQuery.value.length >= 2) {
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => doMeilisearch(searchQuery.value), 150);
      }
    });
    const filteredProducts = computed(() => {
      if (isSearchMode.value) {
        return products.value;
      }
      let result = [...products.value];
      if (selectedCategory.value) {
        result = result.filter((p) => p.categoryHandle === selectedCategory.value);
      }
      if (selectedPrice.value) {
        const [min, max] = selectedPrice.value.split("-").map(Number);
        result = max ? result.filter((p) => p.price >= min && p.price <= max) : result.filter((p) => p.price >= min);
      }
      return result;
    });
    const hasFilters = computed(() => selectedCategory.value || selectedPrice.value || searchQuery.value);
    const getCount = (handle) => allProducts.value.filter((p) => p.categoryHandle === handle).length;
    watch(() => route.query.categorie, (v) => {
      selectedCategory.value = v || "";
    }, { immediate: true });
    useHead({ title: "Catalogue" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-effa338c><section class="relative text-white py-20 overflow-hidden" data-v-effa338c>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/hero-catalogue.png",
        alt: "Catalogue TchadBox",
        class: "absolute inset-0 w-full h-full object-cover",
        loading: "eager",
        quality: "80",
        format: "webp",
        sizes: "100vw"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-[var(--color-primary)]/80" data-v-effa338c></div><div class="container-main relative z-10" data-v-effa338c><div class="flex items-center gap-2 text-white/60 text-sm mb-4" data-v-effa338c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-white transition-colors"
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
      _push(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4" }, null, _parent));
      _push(`<span class="text-white" data-v-effa338c>Catalogue</span></div><h1 class="heading-section text-white" data-v-effa338c>Notre Catalogue</h1><p class="text-white/60 mt-2" data-v-effa338c>${ssrInterpolate(unref(filteredProducts).length)} produit${ssrInterpolate(unref(filteredProducts).length > 1 ? "s" : "")} ${ssrInterpolate(unref(hasFilters) ? "trouvé" + (unref(filteredProducts).length > 1 ? "s" : "") : "disponible" + (unref(filteredProducts).length > 1 ? "s" : ""))}</p></div></section><div class="container-main py-10" data-v-effa338c><div class="flex flex-col lg:flex-row gap-8" data-v-effa338c><aside class="lg:w-72 flex-shrink-0" data-v-effa338c><div class="card p-6 sticky top-28" data-v-effa338c><div class="mb-8" data-v-effa338c><h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2" data-v-effa338c>`);
      _push(ssrRenderComponent(unref(LayoutGrid), { class: "w-5 h-5 text-[var(--color-accent-dark)]" }, null, _parent));
      _push(`Catégories </h3><div class="space-y-2" data-v-effa338c><button class="${ssrRenderClass([{ active: !unref(selectedCategory) }, "filter-btn w-full"])}" data-v-effa338c>`);
      _push(ssrRenderComponent(unref(Package), { class: "w-5 h-5" }, null, _parent));
      _push(`Toutes<span class="ml-auto text-sm opacity-50" data-v-effa338c>${ssrInterpolate(unref(products).length)}</span></button><!--[-->`);
      ssrRenderList(categories, (cat) => {
        _push(`<button class="${ssrRenderClass([{ active: unref(selectedCategory) === cat.handle }, "filter-btn w-full"])}" data-v-effa338c>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(cat.icon), { class: "w-5 h-5" }, null), _parent);
        _push(`${ssrInterpolate(cat.name)}<span class="ml-auto text-sm opacity-50" data-v-effa338c>${ssrInterpolate(getCount(cat.handle))}</span></button>`);
      });
      _push(`<!--]--></div></div><div class="mb-8" data-v-effa338c><h3 class="font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2" data-v-effa338c>`);
      _push(ssrRenderComponent(unref(Euro), { class: "w-5 h-5 text-[var(--color-accent-dark)]" }, null, _parent));
      _push(`Prix </h3><div class="space-y-2" data-v-effa338c><!--[-->`);
      ssrRenderList(priceRanges, (r) => {
        _push(`<label class="flex items-center gap-3 py-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors" data-v-effa338c><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedPrice), r.value)) ? " checked" : ""}${ssrRenderAttr("value", r.value)} class="sr-only" data-v-effa338c><span class="${ssrRenderClass([unref(selectedPrice) === r.value ? "border-[var(--color-accent)] bg-[var(--color-accent)]" : "border-gray-300", "w-4 h-4 rounded-full border-2 flex items-center justify-center"])}" data-v-effa338c>`);
        if (unref(selectedPrice) === r.value) {
          _push(`<span class="w-1.5 h-1.5 rounded-full bg-white" data-v-effa338c></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span> ${ssrInterpolate(r.label)}</label>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(hasFilters)) {
        _push(`<button class="btn-ghost w-full" data-v-effa338c>`);
        _push(ssrRenderComponent(unref(RotateCcw), { class: "w-4 h-4" }, null, _parent));
        _push(`Réinitialiser</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside><div class="flex-grow" data-v-effa338c><div class="card p-4 mb-6 flex gap-4 items-center" data-v-effa338c><div class="relative flex-grow" data-v-effa338c>`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Rechercher un produit..." class="input w-full" style="${ssrRenderStyle({ "padding-left": "3rem" })}" data-v-effa338c></div></div>`);
      if (unref(isLoading)) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" data-v-effa338c><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="card p-4 animate-pulse" data-v-effa338c><div class="aspect-square bg-gray-200 rounded-xl mb-4" data-v-effa338c></div><div class="h-4 bg-gray-200 rounded mb-2" data-v-effa338c></div><div class="h-4 bg-gray-200 rounded w-2/3" data-v-effa338c></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="card p-16 text-center" data-v-effa338c>`);
        _push(ssrRenderComponent(unref(AlertCircle), { class: "w-16 h-16 text-red-300 mx-auto mb-4" }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-[var(--color-text)] mb-2" data-v-effa338c>Chargement impossible</h3><p class="text-[var(--color-text-muted)] mb-6" data-v-effa338c>${ssrInterpolate(unref(error))}</p><button class="btn-primary" data-v-effa338c><span data-v-effa338c>Réessayer</span></button></div>`);
      } else if (unref(filteredProducts).length > 0) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" data-v-effa338c><!--[-->`);
        ssrRenderList(unref(filteredProducts), (p, i) => {
          _push(ssrRenderComponent(_sfc_main$2, {
            key: p.id,
            product: p,
            delay: i * 50
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="card p-16 text-center" data-v-effa338c>`);
        _push(ssrRenderComponent(unref(SearchX), { class: "w-16 h-16 text-gray-300 mx-auto mb-4" }, null, _parent));
        _push(`<h3 class="text-xl font-semibold text-[var(--color-text)] mb-2" data-v-effa338c>Aucun produit trouvé</h3><p class="text-[var(--color-text-muted)] mb-6" data-v-effa338c>Essayez d&#39;ajuster vos critères de recherche</p><button class="btn-primary" data-v-effa338c><span data-v-effa338c>Afficher tout le catalogue</span></button></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalogue.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const catalogue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-effa338c"]]);
export {
  catalogue as default
};
//# sourceMappingURL=catalogue-sud1_QR2.js.map
