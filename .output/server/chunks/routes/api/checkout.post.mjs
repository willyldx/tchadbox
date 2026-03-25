import { c as defineEventHandler, i as readBody, e as createError, j as getSupabaseService } from '../../_/nitro.mjs';
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

const checkout_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.email) || !body.customer_first_name || !body.customer_last_name || !body.recipient_name || typeof body.total !== "number" || !Array.isArray(body.items) || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Donn\xE9es de commande invalides (email, noms, destinataire, total, items requis)"
    });
  }
  const reference = generateOrderReference();
  const supabase = getSupabaseService();
  const orderRow = {
    user_id: body.user_id || null,
    display_id: reference,
    status: "pending",
    payment_status: "awaiting",
    fulfillment_status: "not_fulfilled",
    email: body.email,
    customer_first_name: body.customer_first_name,
    customer_last_name: body.customer_last_name,
    customer_phone: (_a = body.customer_phone) != null ? _a : null,
    recipient_name: body.recipient_name,
    recipient_phone: (_b = body.recipient_phone) != null ? _b : null,
    shipping_address: {
      address_1: (_c = body.shipping_address_1) != null ? _c : null,
      address_2: (_d = body.shipping_address_2) != null ? _d : null,
      city: (_e = body.shipping_city) != null ? _e : "N'Djamena",
      country: (_f = body.shipping_country) != null ? _f : "Tchad"
    },
    delivery_instructions: (_g = body.delivery_instructions) != null ? _g : null,
    subtotal: Number(body.subtotal),
    shipping_total: Number(body.shipping_total),
    total: Number(body.total),
    currency: "EUR",
    payment_reference: reference,
    payment_method: (_h = body.payment_method) != null ? _h : "card",
    metadata: {
      items: body.items.map((item) => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.total,
        thumbnail: item.thumbnail
      }))
    }
  };
  const { data: order, error } = await supabase.from("orders").insert(orderRow).select("id").single();
  if (error) {
    console.error("[checkout] Order insert error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la cr\xE9ation de la commande"
    });
  }
  return {
    orderId: order.id,
    reference
  };
});
function generateOrderReference() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `TCB-${timestamp}-${random}`.toUpperCase();
}

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
