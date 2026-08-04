"use server";

import { createClient } from "@/lib/supabase/server";
import { Customer } from "@/types/database.types";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
  return data as Customer[];
}

export async function createCustomer(formData: FormData) {
  const supabase = await createClient();
  
  const customerData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    date_of_birth: formData.get("date_of_birth") as string || null,
    medical_history: formData.get("medical_history") as string,
  };

  const { data, error } = await supabase
    .from("customers")
    .insert([customerData])
    .select()
    .single();

  if (error) {
    console.error("Error creating customer:", error);
    return { error: error.message };
  }

  revalidatePath("/customers");
  return { data };
}
