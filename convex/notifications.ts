import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Récupérer les notifications d'un utilisateur
export const getNotifications = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(50);
  },
});

// Compter les notifications non lues
export const getUnreadCount = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_userId_unread", (q) => 
        q.eq("userId", args.userId).eq("read", false)
      )
      .collect();
    return unread.length;
  },
});

// Créer une notification
export const create = mutation({
  args: {
    userId: v.string(),
    type: v.string(),
    title: v.string(),
    message: v.string(),
    data: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      message: args.message,
      data: args.data,
      read: false,
      createdAt: Date.now(),
    });
  },
});

// Marquer comme lue
export const markAsRead = mutation({
  args: { notificationId: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.notificationId, { read: true });
    return true;
  },
});

// Marquer toutes comme lues
export const markAllAsRead = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_userId_unread", (q) => 
        q.eq("userId", args.userId).eq("read", false)
      )
      .collect();

    for (const notification of unread) {
      await ctx.db.patch(notification._id, { read: true });
    }

    return unread.length;
  },
});
