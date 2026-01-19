import { useQuery, useMutation } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const VISITOR_ID_KEY = "tchadbox_visitor_id";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export function useCart() {
  const visitorId = ref(getVisitorId());
  const authStore = useAuthStore();

  // Query réactive du panier
  const cart = useQuery(api.cart.getCart, () => ({
    visitorId: visitorId.value,
  }));

  // Mutations
  const addItemMutation = useMutation(api.cart.addItem);
  const updateQuantityMutation = useMutation(api.cart.updateQuantity);
  const removeItemMutation = useMutation(api.cart.removeItem);
  const clearCartMutation = useMutation(api.cart.clearCart);
  const mergeCartMutation = useMutation(api.cart.mergeCartOnLogin);

  // Ajouter au panier
  async function addItem(product: {
    productId: string;
    variantId?: string;
    title: string;
    thumbnail?: string;
    price: number;
    quantity?: number;
  }) {
    await addItemMutation({
      visitorId: visitorId.value,
      productId: product.productId,
      variantId: product.variantId,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      quantity: product.quantity || 1,
    });
  }

  // Mettre à jour quantité
  async function updateQuantity(itemId: Id<"cartItems">, quantity: number) {
    await updateQuantityMutation({ itemId, quantity });
  }

  // Supprimer item
  async function removeItem(itemId: Id<"cartItems">) {
    await removeItemMutation({ itemId });
  }

  // Vider le panier
  async function clearCart() {
    await clearCartMutation({ visitorId: visitorId.value });
  }

  // Merger au login
  async function mergeOnLogin(userId: string) {
    await mergeCartMutation({
      visitorId: visitorId.value,
      userId,
    });
  }

  // Computed
  const items = computed(() => cart.value?.items || []);
  const totalItems = computed(() => cart.value?.totalItems || 0);
  const totalPrice = computed(() => cart.value?.totalPrice || 0);
  const isEmpty = computed(() => totalItems.value === 0);

  return {
    cart,
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    mergeOnLogin,
  };
}
