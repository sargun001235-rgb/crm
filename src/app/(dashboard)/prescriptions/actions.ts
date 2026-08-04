"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPrescription(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prescriptions")
    .select(`
      *,
      customers (
        first_name,
        last_name
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching prescription:", error);
    return null;
  }
  return {
    ...data,
    customer_name: `${data.customers?.first_name || ""} ${data.customers?.last_name || ""}`.trim()
  };
}

export async function getPrescriptions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("prescriptions")
    .select(`
      *,
      customers (
        first_name,
        last_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
  return data.map((rx: any) => ({
    ...rx,
    customer_name: `${rx.customers?.first_name || ""} ${rx.customers?.last_name || ""}`.trim()
  }));
}
