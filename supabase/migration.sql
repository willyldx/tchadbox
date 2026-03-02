-- ========================================
-- TchadBox — SQL Delta Migration
-- Copier-coller dans Supabase SQL Editor
-- ========================================

-- ========================================
-- 1. TABLE ORDERS — Ajouter colonnes manquantes
-- ========================================
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address_1 text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_address_2 text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_city text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_country text DEFAULT 'TD';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS paid_at timestamptz;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items jsonb DEFAULT '[]'::jsonb;


-- ========================================
-- 2. VIEW "products" — Mappe Medusa → TchadBox
-- ========================================
-- Le code TchadBox query: products(id, title, handle, description, subtitle,
--   price, compare_at_price, images, thumbnail, category_id, in_stock,
--   stock_quantity, created_at, updated_at)
-- Medusa a: product + product_variant + product_category + image

CREATE OR REPLACE VIEW public.products AS
SELECT
  p.id,
  p.title,
  p.handle,
  p.description,
  p.subtitle,
  p.thumbnail,
  -- Price from first variant
  COALESCE(
    (SELECT pr.amount / 100.0
     FROM public.product_variant pv
     JOIN public.product_variant_price_set pvps ON pvps.variant_id = pv.id
     JOIN public.price pr ON pr.price_set_id = pvps.price_set_id
     WHERE pv.product_id = p.id AND pv.deleted_at IS NULL AND pr.deleted_at IS NULL
     ORDER BY pr.created_at
     LIMIT 1), 0
  ) AS price,
  -- Compare at price (original price if discounted)
  NULL::numeric AS compare_at_price,
  -- Images as JSONB array of URLs
  COALESCE(
    (SELECT jsonb_agg(img.url ORDER BY img.rank)
     FROM public.image img
     WHERE img.product_id = p.id AND img.deleted_at IS NULL
    ), '[]'::jsonb
  ) AS images,
  -- Category ID (first linked category)
  (SELECT pcp.product_category_id
   FROM public.product_category_product pcp
   WHERE pcp.product_id = p.id
   LIMIT 1
  ) AS category_id,
  -- In stock (any variant has inventory)
  COALESCE(
    (SELECT true FROM public.product_variant pv
     WHERE pv.product_id = p.id AND pv.deleted_at IS NULL
     LIMIT 1), true
  ) AS in_stock,
  -- Stock quantity (sum of first variant)
  0 AS stock_quantity,
  p.created_at,
  p.updated_at
FROM public.product p
WHERE p.deleted_at IS NULL AND p.status = 'published';


-- ========================================
-- 3. VIEW "categories" — Mappe Medusa → TchadBox
-- ========================================
-- Le code TchadBox query: categories(id, name, handle)
-- Medusa a: product_category

CREATE OR REPLACE VIEW public.categories AS
SELECT
  pc.id,
  pc.name,
  pc.handle
FROM public.product_category pc
WHERE pc.deleted_at IS NULL AND pc.is_active = true;


-- ========================================
-- 4. RPC FUNCTIONS
-- ========================================

-- Get all delivery agents (with profile info for admin panel)
CREATE OR REPLACE FUNCTION public.get_all_delivery_agents()
RETURNS TABLE (
  id UUID,
  user_id UUID,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  zone TEXT,
  is_active BOOLEAN,
  total_deliveries INTEGER,
  rating NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    da.id,
    da.user_id,
    p.first_name,
    p.last_name,
    p.email,
    da.phone,
    da.zone,
    da.is_active,
    da.total_deliveries,
    da.rating
  FROM public.delivery_agents da
  JOIN public.profiles p ON p.id = da.user_id
  ORDER BY da.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Get profiles by role (for admin to promote users)
CREATE OR REPLACE FUNCTION public.get_profiles_by_role(target_role TEXT)
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.first_name, p.last_name
  FROM public.profiles p
  WHERE p.role = target_role
  ORDER BY p.first_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Update user role (admin only, with security check)
CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id UUID, new_role TEXT)
RETURNS void AS $$
BEGIN
  -- Verify caller is admin or super_admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  ) THEN
    RAISE EXCEPTION 'Non autorisé';
  END IF;

  UPDATE public.profiles
  SET role = new_role, updated_at = now()
  WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ========================================
-- 5. RLS POLICIES (seulement pour les tables non-Medusa)
-- ========================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_agents ENABLE ROW LEVEL SECURITY;

-- PROFILES
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins read all profiles" ON public.profiles;
CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  ));

DROP POLICY IF EXISTS "Insert profiles" ON public.profiles;
CREATE POLICY "Insert profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);

-- ADDRESSES
DROP POLICY IF EXISTS "Users manage addresses" ON public.addresses;
CREATE POLICY "Users manage addresses"
  ON public.addresses FOR ALL
  USING (auth.uid() = user_id);

-- ORDERS
DROP POLICY IF EXISTS "Users read own orders" ON public.orders;
CREATE POLICY "Users read own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert orders" ON public.orders;
CREATE POLICY "Users insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "Admins manage orders" ON public.orders;
CREATE POLICY "Admins manage orders"
  ON public.orders FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  ));

DROP POLICY IF EXISTS "Livreurs read assigned" ON public.orders;
CREATE POLICY "Livreurs read assigned"
  ON public.orders FOR SELECT
  USING (auth.uid() = assigned_to);

DROP POLICY IF EXISTS "Livreurs update assigned" ON public.orders;
CREATE POLICY "Livreurs update assigned"
  ON public.orders FOR UPDATE
  USING (auth.uid() = assigned_to);

-- FAVORITES
DROP POLICY IF EXISTS "Users manage favorites" ON public.favorites;
CREATE POLICY "Users manage favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- DELIVERY_AGENTS
DROP POLICY IF EXISTS "Livreurs read own" ON public.delivery_agents;
CREATE POLICY "Livreurs read own"
  ON public.delivery_agents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage agents" ON public.delivery_agents;
CREATE POLICY "Admins manage agents"
  ON public.delivery_agents FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  ));

-- ORDER_ITEMS
DROP POLICY IF EXISTS "Users read own items" ON public.order_items;
CREATE POLICY "Users read own items"
  ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins manage items" ON public.order_items;
CREATE POLICY "Admins manage items"
  ON public.order_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  ));
