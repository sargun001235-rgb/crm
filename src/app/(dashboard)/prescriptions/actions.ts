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
  
  const parseNum = (val: string | null) => (val && val !== "none" ? parseFloat(val) : null);
  const parseStr = (val: string | null) => (val ? val : null);

  const prescriptionData = {
    customer_id: customerId,
    doctor_name: parseStr(formData.get("doctor") as string),
    re_sph: parseNum(formData.get("re_sph") as string),
    re_cyl: parseNum(formData.get("re_cyl") as string),
    re_axis: parseNum(formData.get("re_axis") as string),
    re_add: parseNum(formData.get("re_add") as string),
    re_prism: parseStr(formData.get("re_prism") as string),
    re_va: parseStr(formData.get("re_va") as string),
    le_sph: parseNum(formData.get("le_sph") as string),
    le_cyl: parseNum(formData.get("le_cyl") as string),
    le_axis: parseNum(formData.get("le_axis") as string),
    le_add: parseNum(formData.get("le_add") as string),
    le_prism: parseStr(formData.get("le_prism") as string),
    le_va: parseStr(formData.get("le_va") as string),
    pd: parseStr(formData.get("pd") as string),
    lens_type: parseStr(formData.get("lensType") as string),
    frame_type: parseStr(formData.get("frameType") as string),
    lens_coating: parseStr(formData.get("lensCoating") as string),
    remarks: parseStr(formData.get("remarks") as string),
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
