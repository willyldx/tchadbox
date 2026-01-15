// Types for TchadBox E-commerce

export interface Product {
  id: string
  title: string
  handle: string
  description?: string
  subtitle?: string
  price: number
  compareAtPrice?: number
  images: string[]
  thumbnail?: string
  category: Category
  categoryId: string
  inStock: boolean
  stockQuantity?: number
  variants?: ProductVariant[]
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  title: string
  price: number
  sku?: string
  inventory_quantity: number
}

export interface Category {
  id: string
  name: string
  handle: string
  description?: string
  icon?: string
  image?: string
  parentId?: string
  children?: Category[]
}

export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  quantity: number
  thumbnail?: string
  category?: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  shippingTotal: number
  total: number
  itemCount: number
}

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  addresses: Address[]
  orders?: Order[]
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  province?: string
  postalCode?: string
  country: string
  phone?: string
  isDefault?: boolean
}

export interface Order {
  id: string
  displayId: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  items: OrderItem[]
  shippingAddress: Address
  billingAddress?: Address
  subtotal: number
  shippingTotal: number
  total: number
  currency: string
  createdAt: string
  updatedAt: string
  deliveryPhoto?: string
  timeline?: OrderTimelineEvent[]
}

export interface OrderItem {
  id: string
  title: string
  description?: string
  thumbnail?: string
  quantity: number
  unitPrice: number
  total: number
}

export interface OrderTimelineEvent {
  id: string
  title: string
  description?: string
  date: string
  completed: boolean
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'
export type PaymentStatus = 'awaiting' | 'captured' | 'refunded'
export type FulfillmentStatus = 'not_fulfilled' | 'partially_fulfilled' | 'fulfilled' | 'shipped' | 'delivered'

export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
  description?: string
}

export interface Region {
  id: string
  name: string
  currency: string
  currencyCode: string
  countries: Country[]
  shippingOptions: ShippingOption[]
}

export interface Country {
  id: string
  name: string
  iso2: string
  iso3: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  count?: number
  offset?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  offset: number
  limit: number
  hasMore: boolean
}

// UI Types
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
}

// Form Types
export interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: {
    address1: string
    address2?: string
    city: string
    country: string
  }
  recipientName: string
  recipientPhone: string
  deliveryInstructions?: string
}
