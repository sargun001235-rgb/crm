"use server";

import { createClient } from "@/lib/supabase/server";
import { Customer } from "@/types/database.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCustomers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers")
    .select("*, prescriptions(*)")
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
    outstanding_balance: parseFloat(formData.get("outstanding_balance") as string || "0") || 0,
    ...(formData.get("created_at") && { created_at: formData.get("created_at") as string }),
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

export async function getCustomer(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
  return data as Customer;
}

export async function updateCustomer(id: string, formData: FormData) {
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
    outstanding_balance: parseFloat(formData.get("outstanding_balance") as string || "0") || 0,
    ...(formData.get("created_at") && { created_at: formData.get("created_at") as string }),
  };

  const { data, error } = await supabase
    .from("customers")
    .update(customerData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating customer:", error);
    return { error: error.message };
  }

  revalidatePath("/customers");
  revalidatePath(`/customers/${id}`);
  return { data };
}

export async function deleteCustomer(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting customer:", error);
    throw new Error(error.message);
  }

  revalidatePath("/customers");
  redirect("/customers");
}
