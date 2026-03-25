import { c as defineEventHandler, r as requireAdmin, g as getAuthToken, e as createError, h as getSupabaseWithAuth } from '../../../_/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  await requireAdmin(event);
  const token = getAuthToken(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Token manquant" });
  }
  const supabase = getSupabaseWithAuth(token);
  const { data: orders, error } = await supabase.from("orders").select("id, status, payment_status, fulfillment_status, total, created_at, delivered_at").in("status", ["pending", "processing", "completed"]).order("created_at", { ascending: false });
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors du chargement des commandes"
    });
  }
  const list = orders || [];
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = list.filter((o) => new Date(o.created_at) >= today);
  const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total || 0), 0);
  const pendingOrders = list.filter((o) => o.status === "pending");
  const inDeliveryOrders = list.filter(
    (o) => ["shipped", "partially_fulfilled", "fulfilled"].includes(o.fulfillment_status || "")
  );
  const completedOrders = list.filter((o) => o.status === "completed" || o.fulfillment_status === "delivered");
  const totalRevenue = list.filter((o) => o.payment_status === "captured" || o.status !== "cancelled").reduce((s, o) => s + Number(o.total || 0), 0);
  return {
    totalOrders: list.length,
    pendingOrders: pendingOrders.length,
    inDeliveryOrders: inDeliveryOrders.length,
    completedOrders: completedOrders.length,
    totalRevenue,
    todayOrders: todayOrders.length,
    todayRevenue
  };
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
