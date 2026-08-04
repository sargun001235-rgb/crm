"use server";

import { createClient } from "@/lib/supabase/server";
import { Inventory } from "@/types/database.types";
import { revalidatePath } from "next/cache";

export async function getInventory() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
  return data as Inventory[];
}

export async function createInventoryItem(formData: FormData) {
  const supabase = await createClient();
  
  const itemData = {
    sku: formData.get("sku") as string,
    barcode: formData.get("barcode") as string || null,
    category: formData.get("category") as any,
    brand: formData.get("brand") as string || null,
    model: formData.get("model") as string || null,
    color: formData.get("color") as string || null,
    purchase_price: Number(formData.get("purchase_price") || 0),
    selling_price: Number(formData.get("selling_price") || 0),
    stock_quantity: Number(formData.get("stock_quantity") || 0),
    low_stock_threshold: Number(formData.get("low_stock_threshold") || 5),
  };

  const { data, error } = await supabase
    .from("inventory")
    .insert([itemData])
    .select()
    .single();

  if (error) {
    console.error("Error creating inventory item:", error);
    return { error: error.message };
  }

  revalidatePath("/inventory");
  return { data };
}
