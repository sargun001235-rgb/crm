"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewInventoryItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      sku: "", barcode: "", category: "", brand: "", model: "", color: "",
      purchase_price: "", selling_price: "", stock_quantity: "1", low_stock_threshold: "5"
    }
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log("Saving inventory:", data);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/inventory");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add Inventory Item</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter the primary product details and tracking identifiers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SKU / Article No. *</Label>
                <Input {...form.register("sku")} required />
              </div>
              <div className="space-y-2">
                <Label>Barcode</Label>
                <Input {...form.register("barcode")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select onValueChange={(val: string | null) => val && form.setValue("category", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frames">Frames</SelectItem>
                    <SelectItem value="Lenses">Lenses</SelectItem>
                    <SelectItem value="Contact Lens">Contact Lens</SelectItem>
                    <SelectItem value="Sunglasses">Sunglasses</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input {...form.register("brand")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Model / Collection</Label>
                <Input {...form.register("model")} />
              </div>
              <div className="space-y-2">
                <Label>Color / Variant</Label>
                <Input {...form.register("color")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Purchase Price (₹) *</Label>
                <Input type="number" step="0.01" {...form.register("purchase_price")} required />
              </div>
              <div className="space-y-2">
                <Label>Selling Price (₹) *</Label>
                <Input type="number" step="0.01" {...form.register("selling_price")} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>Initial Stock Quantity *</Label>
                <Input type="number" {...form.register("stock_quantity")} required />
              </div>
              <div className="space-y-2">
                <Label>Low Stock Alert Threshold</Label>
                <Input type="number" {...form.register("low_stock_threshold")} />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Add to Inventory"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
