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
