-- =============================================
-- TchadBox: Orders table for Supabase
-- Run this in Supabase SQL Editor (dashboard.supabase.co)
-- =============================================

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  display_id TEXT NOT NULL UNIQUE,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'awaiting' CHECK (payment_status IN ('awaiting', 'captured', 'failed', 'refunded')),
  fulfillment_status TEXT NOT NULL DEFAULT 'not_fulfilled' CHECK (fulfillment_status IN ('not_fulfilled', 'partially_fulfilled', 'fulfilled', 'shipped', 'delivered')),
  
  -- Customer info
  email TEXT NOT NULL,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Recipient info (at Chad)
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT,
  
  -- Shipping address
  shipping_address_1 TEXT,
  shipping_address_2 TEXT,
  shipping_city TEXT DEFAULT 'N''Djamena',
  shipping_country TEXT DEFAULT 'Tchad',
  delivery_instructions TEXT,
  
  -- Amounts (in EUR)
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  shipping_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  
  -- Payment info
  payment_reference TEXT, -- Paystack reference
  payment_method TEXT, -- card, mobile_money, bank_transfer
  paid_at TIMESTAMPTZ,
  
  -- Order items (stored as JSONB array)
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Delivery tracking
  assigned_to UUID REFERENCES profiles(id), -- Assigned livreur
  assigned_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  delivery_photo TEXT, -- URL of proof photo
  tracking_number TEXT,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_display_id ON orders(display_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_assigned_to ON orders(assigned_to);
CREATE INDEX IF NOT EXISTS idx_orders_payment_reference ON orders(payment_reference);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Clients can see their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Clients can create their own orders
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Clients can update own orders (limited to cancel)
CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins/super_admins can see all orders
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Admins can update all orders
CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'super_admin')
    )
  );

-- Livreurs can see orders assigned to them
CREATE POLICY "Livreurs can view assigned orders"
  ON orders FOR SELECT
  USING (auth.uid() = assigned_to);

-- Livreurs can update orders assigned to them (delivery status, photo)
CREATE POLICY "Livreurs can update assigned orders"
  ON orders FOR UPDATE
  USING (auth.uid() = assigned_to);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();
