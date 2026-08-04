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
