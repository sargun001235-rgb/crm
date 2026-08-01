export type Customer = {
  id: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  address: string | null;
  city: string | null;
  date_of_birth: string | null;
  medical_history: string | null;
  lifetime_spending: number;
  outstanding_balance: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export type Prescription = {
  id: string;
  customer_id: string;
  
  // Right Eye (OD)
  re_sph: number | null;
  re_cyl: number | null;
  re_axis: number | null;
  re_add: number | null;
  re_prism: string | null;
  re_va: string | null;
  
  // Left Eye (OS)
  le_sph: number | null;
  le_cyl: number | null;
  le_axis: number | null;
  le_add: number | null;
  le_prism: string | null;
  le_va: string | null;
  
  pd: string | null;
  lens_type: string | null;
  frame_type: string | null;
  lens_coating: string | null;
  
  doctor_name: string | null;
  clinic_name: string | null;
  remarks: string | null;
  
  created_at: string;
  updated_at: string;
};

export type ProductCategory = "Frames" | "Lenses" | "Accessories" | "Contact Lens" | "Sunglasses";

export type Inventory = {
  id: string;
  sku: string;
  barcode: string | null;
  category: ProductCategory;
  brand: string | null;
  model: string | null;
  color: string | null;
  
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  
  supplier_id: string | null;
  
  created_at: string;
  updated_at: string;
  created_by: string | null;
};

export type OrderStatus = 'Pending' | 'Ordered' | 'Sent to Lab' | 'In Production' | 'Ready' | 'Fitting' | 'Delivered' | 'Cancelled';

export type Order = {
  id: string;
  order_number: string;
  customer_id: string;
  prescription_id: string | null;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  gst_amount: number;
  total_amount: number;
  advance_paid: number;
  balance_due: number;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
};

export type OrderItem = {
  id: string;
  order_id: string;
  inventory_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
};
