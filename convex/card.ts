import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ============================================
// QUERIES
// ============================================

export const getCart = query({
  args: { visitorId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", args.visitorId))
      .first();

    if (!cart) return null;

    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_cartId", (q) => q.eq("cartId", cart._id))
      .collect();

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      ...cart,
      items,
      totalItems,
      totalPrice,
    };
  },
});

export const getCartByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!cart) return null;

    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_cartId", (q) => q.eq("cartId", cart._id))
      .collect();

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      ...cart,
      items,
      totalItems,
      totalPrice,
    };
  },
});

// ============================================
// MUTATIONS
// ============================================

export const addItem = mutation({
  args: {
    visitorId: v.string(),
    productId: v.string(),
    variantId: v.optional(v.string()),
    title: v.string(),
    thumbnail: v.optional(v.string()),
    price: v.number(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Récupérer ou créer le panier
    let cart = await ctx.db
      .query("carts")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", args.visitorId))
      .first();

    if (!cart) {
      const cartId = await ctx.db.insert("carts", {
        visitorId: args.visitorId,
        userId: undefined,
        updatedAt: Date.now(),
      });
      cart = await ctx.db.get(cartId);
    }

    if (!cart) throw new Error("Failed to create cart");

    // Vérifier si l'item existe déjà
    const existingItem = await ctx.db
      .query("cartItems")
      .withIndex("by_cartId", (q) => q.eq("cartId", cart._id))
      .filter((q) => q.eq(q.field("productId"), args.productId))
      .first();

    if (existingItem) {
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
    } else {
      await ctx.db.insert("cartItems", {
        cartId: cart._id,
        productId: args.productId,
        variantId: args.variantId,
        title: args.title,
        thumbnail: args.thumbnail,
        price: args.price,
        quantity: args.quantity,
      });
    }

    await ctx.db.patch(cart._id, { updatedAt: Date.now() });
    return true;
  },
});

export const updateQuantity = mutation({
  args: {
    itemId: v.id("cartItems"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    if (args.quantity <= 0) {
      await ctx.db.delete(args.itemId);
    } else {
      await ctx.db.patch(args.itemId, { quantity: args.quantity });
    }
    return true;
  },
});

export const removeItem = mutation({
  args: { itemId: v.id("cartItems") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.itemId);
    return true;
  },
});

export const clearCart = mutation({
  args: { visitorId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", args.visitorId))
      .first();

    if (!cart) return false;

    const items = await ctx.db
      .query("cartItems")
      .withIndex("by_cartId", (q) => q.eq("cartId", cart._id))
      .collect();

    for (const item of items) {
      await ctx.db.delete(item._id);
    }

    return true;
  },
});

export const mergeCartOnLogin = mutation({
  args: {
    visitorId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const anonymousCart = await ctx.db
      .query("carts")
      .withIndex("by_visitorId", (q) => q.eq("visitorId", args.visitorId))
      .first();

    if (!anonymousCart) return null;

    const userCart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (userCart && userCart._id !== anonymousCart._id) {
      const anonymousItems = await ctx.db
        .query("cartItems")
        .withIndex("by_cartId", (q) => q.eq("cartId", anonymousCart._id))
        .collect();

      for (const item of anonymousItems) {
        const existingItem = await ctx.db
          .query("cartItems")
          .withIndex("by_cartId", (q) => q.eq("cartId", userCart._id))
          .filter((q) => q.eq(q.field("productId"), item.productId))
          .first();

        if (existingItem) {
          await ctx.db.patch(existingItem._id, {
            quantity: existingItem.quantity + item.quantity,
          });
        } else {
          await ctx.db.insert("cartItems", {
            cartId: userCart._id,
            productId: item.productId,
            variantId: item.variantId,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            quantity: item.quantity,
          });
        }

        await ctx.db.delete(item._id);
      }

      await ctx.db.delete(anonymousCart._id);
      return userCart._id;
    } else {
      await ctx.db.patch(anonymousCart._id, {
        userId: args.userId,
        updatedAt: Date.now(),
      });
      return anonymousCart._id;
    }
  },
});
