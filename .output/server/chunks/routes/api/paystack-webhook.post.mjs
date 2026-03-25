import { c as defineEventHandler, u as useRuntimeConfig, m as readRawBody, n as getHeader, e as createError, j as getSupabaseService } from '../../_/nitro.mjs';
import { createHmac } from 'crypto';
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

const paystackWebhook_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const config = useRuntimeConfig();
  const secretKey = config.paystackSecretKey;
  const rawBody = await readRawBody(event) || "";
  const signature = getHeader(event, "x-paystack-signature");
  if (!signature) {
    console.error("Paystack webhook: Missing signature");
    throw createError({
      statusCode: 401,
      statusMessage: "Missing signature"
    });
  }
  const hash = createHmac("sha512", secretKey).update(rawBody).digest("hex");
  if (hash !== signature) {
    console.error("Paystack webhook: Invalid signature");
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid signature"
    });
  }
  const body = JSON.parse(rawBody);
  const eventType = body.event;
  const supabase = getSupabaseService();
  console.log(`[Paystack Webhook] Event: ${eventType}`, (_a = body.data) == null ? void 0 : _a.reference);
  switch (eventType) {
    case "charge.success": {
      const data = body.data;
      console.log(`[Paystack Webhook] Payment successful:`, {
        reference: data.reference,
        amount: data.amount,
        currency: data.currency,
        customer: (_b = data.customer) == null ? void 0 : _b.email
      });
      const paidAt = data.paid_at || (/* @__PURE__ */ new Date()).toISOString();
      const { data: existing } = await supabase.from("orders").select("metadata").eq("payment_reference", data.reference).single();
      const { error: updateError } = await supabase.from("orders").update({
        payment_status: "captured",
        payment_reference: data.reference,
        updated_at: (/* @__PURE__ */ new Date()).toISOString(),
        metadata: { ...(existing == null ? void 0 : existing.metadata) || {}, paid_at: paidAt }
      }).eq("payment_reference", data.reference);
      if (updateError) {
        console.error("[Paystack Webhook] Failed to update order:", updateError);
      } else {
        console.log(`[Paystack Webhook] Order updated: payment_status = captured`);
      }
      break;
    }
    case "charge.failed": {
      const data = body.data;
      console.log(`[Paystack Webhook] Payment failed:`, data.reference);
      const { error: updateError } = await supabase.from("orders").update({
        payment_status: "awaiting",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("payment_reference", data.reference);
      if (updateError) {
        console.error("[Paystack Webhook] Failed to update failed order:", updateError);
      }
      break;
    }
    case "transfer.success":
    case "transfer.failed":
    case "transfer.reversed": {
      console.log(`[Paystack Webhook] Transfer event:`, eventType, (_c = body.data) == null ? void 0 : _c.reference);
      break;
    }
    default:
      console.log(`[Paystack Webhook] Unhandled event: ${eventType}`);
  }
  return { status: "ok" };
});

export { paystackWebhook_post as default };
//# sourceMappingURL=paystack-webhook.post.mjs.map
