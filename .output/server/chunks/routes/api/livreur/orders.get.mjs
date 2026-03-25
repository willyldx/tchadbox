import { c as defineEventHandler, k as requireLivreur, g as getAuthToken, e as createError, f as getQuery, h as getSupabaseWithAuth } from '../../../_/nitro.mjs';
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

const orders_get = defineEventHandler(async (event) => {
  var _a;
  const user = await requireLivreur(event);
  const token = getAuthToken(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Token manquant" });
  }
  const query = getQuery(event);
  const limit = Math.min(Number(query.limit) || 50, 100);
  const offset = Number(query.offset) || 0;
  const status = query.status;
  const supabase = getSupabaseWithAuth(token);
  let req = supabase.from("orders").select("*", { count: "exact" }).eq("assigned_to", user.id).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  if (status) {
    req = req.eq("fulfillment_status", status);
  }
  const { data: orders, error, count } = await req;
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors du chargement des commandes"
    });
  }
  return {
    data: orders || [],
    count: count != null ? count : 0,
    offset,
    limit,
    hasMore: (count != null ? count : 0) > offset + ((_a = orders == null ? void 0 : orders.length) != null ? _a : 0)
  };
});

export { orders_get as default };
//# sourceMappingURL=orders.get.mjs.map
