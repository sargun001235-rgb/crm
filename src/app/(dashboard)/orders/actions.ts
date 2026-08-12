"use server";

import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types/database.types";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  const supabase = await createClient();
  // Fetch orders with customer details
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customers (
        first_name,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  
  return data.map((order: any) => ({
    ...order,
    customer_name: `${order.customers?.first_name || ""} ${order.customers?.last_name || ""}`.trim()
  }));
}

export async function getOrder(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      customers (
        first_name,
        last_name,
        phone,
        address
      ),
      order_items (
        id,
        quantity,
        unit_price,
        total_price,
        inventory (
          sku,
          brand,
          model,
          category,
          color,
          lens_type,
          lens_coating,
          frame_type
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }
  return data;
}

export async function createOrder(orderData: any, items: any[]) {
  const supabase = await createClient();
  
  // 1. Create Order
  const orderNumber = `ORD-${Date.now()}`;
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([{
      order_number: orderNumber,
      customer_id: orderData.customer_id,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      gst_amount: orderData.gst_amount,
      total_amount: orderData.total_amount,
      advance_paid: orderData.advance_paid,
      balance_due: orderData.balance_due,
      status: orderData.balance_due > 0 ? "Pending" : "Completed"
    }])
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    return { error: orderError.message };
  }

  // 2. Create Order Items
  const orderItemsData = items.map(item => ({
    order_id: order.id,
    inventory_id: item.inventory_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemsData);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    return { error: itemsError.message };
  }

  // 3. Decrement Inventory
  for (const item of items) {
    // Get current stock
    const { data: inv } = await supabase
      .from("inventory")
      .select("stock_quantity")
      .eq("id", item.inventory_id)
      .single();
      
    if (inv) {
      await supabase
        .from("inventory")
        .update({ stock_quantity: Math.max(0, inv.stock_quantity - item.quantity) })
        .eq("id", item.inventory_id);
    }
  }

  revalidatePath("/orders");
  revalidatePath("/inventory");
  return { data: order };
}
