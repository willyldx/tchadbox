# Approche C — Microservice Pricing (Pour Plus Tard)

> Ce document est une **référence pour le futur**. L'approche A+ est implémentée en premier.
> Migrer vers C quand TchadBox atteint **+1000 commandes/mois** ou quand tu as besoin de pricing dynamique.

## Architecture

```
Nuxt Frontend ──▶ Pricing Service (Python FastAPI) ◀── Laravel Backend
                          │
                   Redis (cache taux)
                          │
                   Exchange Rate APIs
```

## Stack technique

| Composant | Techno | Pourquoi |
|-----------|--------|----------|
| API | **FastAPI** (Python) | Rapide, async, auto-doc Swagger |
| Cache | **Redis** (déjà sur ton VPS) | Taux mis à jour 1x/jour, lus depuis le cache |
| Scheduler | **APScheduler** ou cron Docker | Refresh automatique des taux |
| Deploy | Docker container sur le VPS | Même infra que Laravel |

## Endpoints

```
GET  /api/v1/currencies
     → { currencies: [{ code: "USD", name: "Dollar US", symbol: "$", flag: "🇺🇸" }, ...] }

GET  /api/v1/rates
     → { base: "EUR", rates: { USD: 1.08, XAF: 655.957, ... }, updated_at: "..." }

POST /api/v1/convert
     Body: { amount: 100, from: "EUR", to: "USD" }
     → { amount: 108.53, display: "$108.53", rounded: "$109.00" }

GET  /api/v1/prices?products=slug1,slug2&currency=USD
     → { prices: [{ slug: "slug1", base_eur: 100, display: "$109.99", raw: 108.53 }] }
```

## Fonctionnalités avancées

### 1. Marges dynamiques par devise
```python
MARGINS = {
    "USD": 0.03,   # +3% pour couvrir les frais Stripe US
    "GBP": 0.02,   # +2%
    "XAF": 0.00,   # Taux fixe, pas de marge
    "CAD": 0.04,   # +4% (frais de conversion + transfert)
}
```

### 2. Psychological pricing (prix arrondis)
```python
def round_price(amount: float, currency: str) -> float:
    """99.99€ → pas 108.53$, mais 109.99$"""
    if currency in ("XAF", "XOF"):
        return math.ceil(amount / 100) * 100  # Arrondi au 100 FCFA
    return math.ceil(amount) - 0.01  # 108.53 → 108.99
```

### 3. A/B testing par marché
```python
# Tester si les clients US achètent plus à 109.99$ ou 104.99$
PRICE_TESTS = {
    "US": { "variant_a": 1.0, "variant_b": 0.95 },  # -5% pour variant B
}
```

### 4. Historique des taux
```sql
CREATE TABLE exchange_rate_history (
    id SERIAL PRIMARY KEY,
    base_currency VARCHAR(3) DEFAULT 'EUR',
    target_currency VARCHAR(3),
    rate DECIMAL(12, 6),
    recorded_at TIMESTAMP DEFAULT NOW()
);
```

## Coûts estimés

| Poste | Coût |
|-------|------|
| RAM supplémentaire | ~100 Mo (FastAPI + Redis minimal) |
| CPU | Négligeable (cache Redis) |
| Développement | 2-3 jours |
| Maintenance | ~1h/mois |

## Migration depuis A+

Quand tu es prêt, le changement est simple :

```diff
// composables/useCurrency.ts
- const converted = amount * rates[currency]
+ const { data } = await $fetch('/pricing/api/v1/convert', { body: { amount, to: currency } })
+ const converted = data.amount
```

**Un seul fichier à modifier.** C'est pour ça que A+ est bien conçu.
