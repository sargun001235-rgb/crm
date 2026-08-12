"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createInventoryItem } from "@/app/(dashboard)/inventory/actions";
import { usePosStore } from "@/stores/usePosStore";

interface CustomProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomProductModal({ open, onOpenChange }: CustomProductModalProps) {
  const { addToCart } = usePosStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [category, setCategory] = useState("Frames");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = async () => {
    if (!brand || !price) {
      alert("Brand and Price are required.");
      return;
    }
    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append("sku", `CUST-${Date.now()}`);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("model", model || "Custom");
    formData.append("selling_price", price);
    formData.append("stock_quantity", "1");
    
    const result = await createInventoryItem(formData);
    
    setIsProcessing(false);
    
    if (result.error) {
      alert(result.error);
    } else if (result.data) {
      addToCart(result.data as any);
      // Reset form
      setBrand("");
      setModel("");
      setPrice("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Custom Item</DialogTitle>
          <DialogDescription>
            Quickly add a custom product to the bill. It will be added to inventory automatically.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
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
            <Label>Brand / Name *</Label>
            <Input placeholder="e.g. Custom Ray-Ban" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Model / Details</Label>
            <Input placeholder="e.g. Aviator Gold" value={model} onChange={(e) => setModel(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Selling Price (₹) *</Label>
            <Input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={isProcessing}>
            {isProcessing ? "Adding..." : "Add to Bill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
