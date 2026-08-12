"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCustomer } from "@/app/(dashboard)/customers/actions";

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerAdded: (customer: any) => void;
}

export function AddCustomerModal({ open, onOpenChange, onCustomerAdded }: AddCustomerModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreate = async () => {
    if (!firstName || !phone) {
      alert("First Name and Phone are required.");
      return;
    }
    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phone);
    
    const result = await createCustomer(formData);
    
    setIsProcessing(false);
    
    if (result.error) {
      alert(result.error);
    } else if (result.data) {
      onCustomerAdded(result.data);
      // Reset form
      setFirstName("");
      setLastName("");
      setPhone("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Add Customer</DialogTitle>
          <DialogDescription>
            Create a new customer profile for this sale.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>First Name *</Label>
            <Input placeholder="e.g. Rahul" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input placeholder="e.g. Sharma" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input placeholder="e.g. 9988776655" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={isProcessing}>
            {isProcessing ? "Saving..." : "Save Customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
