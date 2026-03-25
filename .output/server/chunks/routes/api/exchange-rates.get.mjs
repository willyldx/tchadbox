import { c as defineEventHandler } from '../../_/nitro.mjs';
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

const exchangeRates_get = defineEventHandler(async (event) => {
  try {
    const response = await $fetch("https://open.er-api.com/v6/latest/EUR");
    if (!response || response.result !== "success") {
      throw new Error("Failed to fetch exchange rates");
    }
    return {
      success: true,
      base: "EUR",
      rates: {
        USD: response.rates.USD,
        XAF: 655.957,
        // Le XAF est à taux fixe par rapport à l'EUR (parité CFA)
        XOF: 655.957
      },
      updated_at: response.time_last_update_utc
    };
  } catch (error) {
    console.error("[ExchangeRate] Error:", error);
    return {
      success: false,
      base: "EUR",
      rates: {
        USD: 1.08,
        XAF: 655.957,
        XOF: 655.957
      }
    };
  }
});

export { exchangeRates_get as default };
//# sourceMappingURL=exchange-rates.get.mjs.map
