"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPrescription } from "../actions";

const formatPower = (num: number) => {
  if (num === 0) return "0.00";
  return num > 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
};

const sphOptions = ["", ...Array.from({ length: 161 }, (_, i) => formatPower((i - 80) * 0.25))];
const cylOptions = ["", ...Array.from({ length: 81 }, (_, i) => formatPower((i - 40) * 0.25))];
const axisOptions = ["", ...Array.from({ length: 181 }, (_, i) => i.toString())];
const addOptions = ["", ...Array.from({ length: 17 }, (_, i) => formatPower(i * 0.25))];
const vaOptions = ["6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/6"];
const lensTypeOptions = ["Fibre", "Glass", "Polycarbonate", "Bifocal", "Progressive", "Photochromatic"];
const lensCoatingOptions = ["ARC", "Blue-cut", "Drivex"];
const frameTypeOptions = ["Full Frame", "Half Frame", "Rimless Frame"];

export default function NewPrescriptionForm({ customers }: { customers: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      customerId: "",
      re_sph: "", re_cyl: "", re_axis: "", re_add: "", re_prism: "", re_va: "",
      le_sph: "", le_cyl: "", le_axis: "", le_add: "", le_prism: "", le_va: "",
      pd: "", lensType: "", frameType: "", lensCoating: "", doctor: "", remarks: "", price: ""
    }
  });

  const { getValues, setValue } = form;

  const copyRightToLeft = () => {
    const vals = getValues();
    setValue("le_sph", vals.re_sph);
    setValue("le_cyl", vals.re_cyl);
    setValue("le_axis", vals.re_axis);
    setValue("le_add", vals.re_add);
    setValue("le_prism", vals.re_prism);
    setValue("le_va", vals.re_va);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("customerId", data.customerId);
    formData.append("doctor", data.doctor);
    formData.append("re_sph", data.re_sph);
    formData.append("re_cyl", data.re_cyl);
    formData.append("re_axis", data.re_axis);
    formData.append("re_add", data.re_add);
    formData.append("re_prism", data.re_prism);
    formData.append("re_va", data.re_va);
    formData.append("le_sph", data.le_sph);
    formData.append("le_cyl", data.le_cyl);
    formData.append("le_axis", data.le_axis);
    formData.append("le_add", data.le_add);
    formData.append("le_prism", data.le_prism);
    formData.append("le_va", data.le_va);
    formData.append("pd", data.pd);
    formData.append("lensType", data.lensType);
    formData.append("frameType", data.frameType);
    formData.append("lensCoating", data.lensCoating);
    formData.append("remarks", data.remarks);
    formData.append("price", data.price || "0");

    const result = await createPrescription(formData);
    
    setIsSubmitting(false);
    
    if (result.error) {
      alert(result.error);
    } else {
      router.push("/prescriptions");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Prescription</h1>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Selection</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="max-w-md space-y-2">
               <Label>Customer</Label>
               <Controller name="customerId" control={form.control} rules={{ required: true }} render={({ field }) => (
                 <Select onValueChange={field.onChange} value={field.value}>
                   <SelectTrigger>
                     <SelectValue placeholder="Select a customer..." />
                   </SelectTrigger>
                   <SelectContent>
                     {customers.map((c: any) => (
                       <SelectItem key={c.id} value={c.id}>{c.first_name} {c.last_name} ({c.phone})</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               )} />
               {form.formState.errors.customerId && <span className="text-sm text-red-500">Please select a customer.</span>}
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Prescription Details (Rx)</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={copyRightToLeft}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Right → Left
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">Right Eye (OD)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>SPH</Label>
                  <Controller name="re_sph" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{sphOptions.map(o => <SelectItem key={o || "none_sph_re"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>CYL</Label>
                  <Controller name="re_cyl" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{cylOptions.map(o => <SelectItem key={o || "none_cyl_re"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>AXIS</Label>
                  <Controller name="re_axis" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{axisOptions.map(o => <SelectItem key={o || "none_axis_re"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>ADD</Label>
                  <Controller name="re_add" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{addOptions.map(o => <SelectItem key={o || "none_add_re"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2"><Label>PRISM</Label><Input {...form.register("re_prism")} /></div>
                <div className="space-y-2">
                  <Label>VA</Label>
                  <Controller name="re_va" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {vaOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">Left Eye (OS)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>SPH</Label>
                  <Controller name="le_sph" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{sphOptions.map(o => <SelectItem key={o || "none_sph_le"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>CYL</Label>
                  <Controller name="le_cyl" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{cylOptions.map(o => <SelectItem key={o || "none_cyl_le"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>AXIS</Label>
                  <Controller name="le_axis" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{axisOptions.map(o => <SelectItem key={o || "none_axis_le"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2">
                  <Label>ADD</Label>
                  <Controller name="le_add" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>{addOptions.map(o => <SelectItem key={o || "none_add_le"} value={o || "none"}>{o || "-"}</SelectItem>)}</SelectContent>
                    </Select>
                  )} />
                </div>
                <div className="space-y-2"><Label>PRISM</Label><Input {...form.register("le_prism")} /></div>
                <div className="space-y-2">
                  <Label>VA</Label>
                  <Controller name="le_va" control={form.control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue placeholder="-" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {vaOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2"><Label>PD</Label><Input {...form.register("pd")} /></div>
              
              <div className="space-y-2">
                <Label>Frame Type</Label>
                <Input list="frameTypeOptionsList" {...form.register("frameType")} placeholder="Type or select..." />
                <datalist id="frameTypeOptionsList">
                  {frameTypeOptions.map(o => <option key={o} value={o} />)}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label>Lens Type</Label>
                <Input list="lensTypeOptionsList" {...form.register("lensType")} placeholder="Type or select..." />
                <datalist id="lensTypeOptionsList">
                  {lensTypeOptions.map(o => <option key={o} value={o} />)}
                </datalist>
              </div>
              <div className="space-y-3">
                <Label>Lens Coating</Label>
                <Input list="lensCoatingOptionsList" {...form.register("lensCoating")} placeholder="Type or select..." />
                <datalist id="lensCoatingOptionsList">
                  {lensCoatingOptions.map(o => <option key={o} value={o} />)}
                </datalist>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                 <Label>Doctor / Optometrist</Label>
                 <Controller name="doctor" control={form.control} render={({ field }) => (
                   <Select onValueChange={field.onChange} value={field.value}>
                     <SelectTrigger><SelectValue placeholder="Select Doctor" /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="none">None</SelectItem>
                       <SelectItem value="Dr. Armandeep Singh">Dr. Armandeep Singh</SelectItem>
                       <SelectItem value="Dr. Jaspinder Singh">Dr. Jaspinder Singh</SelectItem>
                       <SelectItem value="Other">Other</SelectItem>
                     </SelectContent>
                   </Select>
                 )} />
               </div>
               <div className="space-y-2"><Label>Remarks</Label><Input {...form.register("remarks")} /></div>
               <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" step="0.01" {...form.register("price")} placeholder="0.00" /></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
             {isSubmitting ? "Saving..." : "Save Prescription"}
          </Button>
        </div>
      </form>
    </div>
  );
}
