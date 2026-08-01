"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NewPrescriptionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      customerId: "",
      re_sph: "", re_cyl: "", re_axis: "", re_add: "", re_prism: "", re_va: "",
      le_sph: "", le_cyl: "", le_axis: "", le_add: "", le_prism: "", le_va: "",
      pd: "", lensType: "", frameType: "", lensCoating: "", doctor: "", remarks: ""
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

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Saving prescription:", data);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/prescriptions");
    }, 1000);
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
             {/* In a real implementation this would be an async combobox/select */}
             <div className="max-w-md space-y-2">
               <Label>Customer</Label>
               <Input placeholder="Search customer name or phone..." {...form.register("customerId")} />
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
                <div className="space-y-2"><Label>SPH</Label><Input {...form.register("re_sph")} /></div>
                <div className="space-y-2"><Label>CYL</Label><Input {...form.register("re_cyl")} /></div>
                <div className="space-y-2"><Label>AXIS</Label><Input {...form.register("re_axis")} /></div>
                <div className="space-y-2"><Label>ADD</Label><Input {...form.register("re_add")} /></div>
                <div className="space-y-2"><Label>PRISM</Label><Input {...form.register("re_prism")} /></div>
                <div className="space-y-2"><Label>VA</Label><Input {...form.register("re_va")} /></div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-primary">Left Eye (OS)</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2"><Label>SPH</Label><Input {...form.register("le_sph")} /></div>
                <div className="space-y-2"><Label>CYL</Label><Input {...form.register("le_cyl")} /></div>
                <div className="space-y-2"><Label>AXIS</Label><Input {...form.register("le_axis")} /></div>
                <div className="space-y-2"><Label>ADD</Label><Input {...form.register("le_add")} /></div>
                <div className="space-y-2"><Label>PRISM</Label><Input {...form.register("le_prism")} /></div>
                <div className="space-y-2"><Label>VA</Label><Input {...form.register("le_va")} /></div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2"><Label>PD</Label><Input {...form.register("pd")} /></div>
              <div className="space-y-2"><Label>Lens Type</Label><Input {...form.register("lensType")} placeholder="Progressive, Bifocal..." /></div>
              <div className="space-y-2"><Label>Frame Type</Label><Input {...form.register("frameType")} placeholder="Full Rim, Half Rim..." /></div>
              <div className="space-y-2"><Label>Lens Coating</Label><Input {...form.register("lensCoating")} placeholder="ARC, Blue Cut..." /></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2"><Label>Doctor / Optometrist</Label><Input {...form.register("doctor")} /></div>
               <div className="space-y-2"><Label>Remarks</Label><Input {...form.register("remarks")} /></div>
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
