import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Panier - identifié par visitorId (anonyme) ou userId (connecté)
  carts: defineTable({
    visitorId: v.string(),
    userId: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_visitorId", ["visitorId"])
    .index("by_userId", ["userId"]),

  // Items du panier
  cartItems: defineTable({
    cartId: v.id("carts"),
    productId: v.string(),
    variantId: v.optional(v.string()),
    title: v.string(),
    thumbnail: v.optional(v.string()),
    price: v.number(),
    quantity: v.number(),
  }).index("by_cartId", ["cartId"]),

  // Notifications temps réel
  notifications: defineTable({
    userId: v.string(),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    data: v.optional(v.any()),
    read: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_unread", ["userId", "read"]),
});
