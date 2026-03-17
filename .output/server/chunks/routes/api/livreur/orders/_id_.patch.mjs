import { c as defineEventHandler, k as requireLivreur, g as getAuthToken, e as createError, l as getRouterParam, i as readBody, h as getSupabaseWithAuth } from '../../../../_/nitro.mjs';
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

const _id__patch = defineEventHandler(async (event) => {
  await requireLivreur(event);
  const token = getAuthToken(event);
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Token manquant" });
  }
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID commande manquant" });
  }
  const body = await readBody(event);
  if (!body || Object.keys(body).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Corps de requ\xEAte vide ou invalide"
    });
  }
  const supabase = getSupabaseWithAuth(token);
  const updates = {
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (body.fulfillment_status !== void 0) updates.fulfillment_status = body.fulfillment_status;
  if (body.delivery_photo !== void 0) updates.delivery_photo = body.delivery_photo;
  if (body.tracking_number !== void 0) updates.tracking_number = body.tracking_number;
  if (body.notes !== void 0) updates.notes = body.notes;
  if (body.delivered_at !== void 0) updates.delivered_at = body.delivered_at;
  if (body.picked_up_at !== void 0) updates.picked_up_at = body.picked_up_at;
  const { data, error } = await supabase.from("orders").update(updates).eq("id", id).select().single();
  if (error) {
    if (error.code === "PGRST116") {
      throw createError({ statusCode: 404, statusMessage: "Commande non trouv\xE9e ou non assign\xE9e \xE0 vous" });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la mise \xE0 jour"
    });
  }
  return data;
});

export { _id__patch as default };
//# sourceMappingURL=_id_.patch.mjs.map
