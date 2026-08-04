"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

export async function createPrescription(formData: FormData) {
  const supabase = await createClient();
  
  const customerId = formData.get("customerId") as string;
  if (!customerId) return { error: "Customer selection is required." };
  
  const prescriptionData = {
    customer_id: customerId,
    doctor_name: formData.get("doctor") as string,
    sph_right: formData.get("re_sph") as string,
    cyl_right: formData.get("re_cyl") as string,
    axis_right: formData.get("re_axis") as string,
    add_right: formData.get("re_add") as string,
    prism_right: formData.get("re_prism") as string,
    va_right: formData.get("re_va") as string,
    sph_left: formData.get("le_sph") as string,
    cyl_left: formData.get("le_cyl") as string,
    axis_left: formData.get("le_axis") as string,
    add_left: formData.get("le_add") as string,
    prism_left: formData.get("le_prism") as string,
    va_left: formData.get("le_va") as string,
    pd: formData.get("pd") as string,
    lens_type: formData.get("lensType") as string,
    frame_type: formData.get("frameType") as string,
    coating: formData.get("lensCoating") as string,
    remarks: formData.get("remarks") as string,
  };

  const { data, error } = await supabase
    .from("prescriptions")
    .insert([prescriptionData])
    .select()
    .single();

  if (error) {
    console.error("Error creating prescription:", error);
    return { error: error.message };
  }

  revalidatePath("/prescriptions");
  return { data };
}
