import { c as defineEventHandler, i as readBody, e as createError, u as useRuntimeConfig } from '../../_/nitro.mjs';
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

const verifyPayment_post = defineEventHandler(async (event) => {
  const { reference } = await readBody(event);
  if (!reference) {
    throw createError({
      statusCode: 400,
      statusMessage: "Reference is required"
    });
  }
  const config = useRuntimeConfig();
  const secretKey = config.paystackSecretKey;
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Paystack secret key not configured"
    });
  }
  try {
    const response = await $fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });
    if (response.status && response.data.status === "success") {
      return {
        success: true,
        data: {
          reference: response.data.reference,
          amount: response.data.amount,
          currency: response.data.currency,
          paidAt: response.data.paid_at,
          channel: response.data.channel,
          email: response.data.customer.email,
          metadata: response.data.metadata
        }
      };
    }
    return {
      success: false,
      error: `Paiement non confirm\xE9: ${response.data.status}`
    };
  } catch (error) {
    console.error("Paystack verification error:", error);
    return {
      success: false,
      error: error.message || "Erreur de v\xE9rification"
    };
  }
});

export { verifyPayment_post as default };
//# sourceMappingURL=verify-payment.post.mjs.map
