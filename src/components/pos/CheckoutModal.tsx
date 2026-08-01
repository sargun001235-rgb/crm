"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePosStore } from "@/stores/usePosStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function CheckoutModal({ open, onOpenChange, total }: CheckoutModalProps) {
  const { advancePaid, setAdvancePaid, clearCart, selectedCustomer } = usePosStore();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const balance = total - advancePaid;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleDone = () => {
    clearCart();
    setIsSuccess(false);
    onOpenChange(false);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md flex flex-col items-center justify-center text-center p-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <DialogTitle className="text-2xl mb-2">Order Confirmed!</DialogTitle>
          <DialogDescription className="mb-6">
            The order for {selectedCustomer?.first_name || "Walk-in Customer"} has been placed successfully.
          </DialogDescription>
          <div className="flex space-x-4 w-full">
            <Button className="flex-1" variant="outline" onClick={handleDone}>New Sale</Button>
            <Button className="flex-1" onClick={() => {}}>Print Invoice</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Record the payment to finalize the order.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <span className="font-semibold text-muted-foreground">Total Amount</span>
            <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Advance / Amount Paid Now</Label>
              <Input 
                type="number" 
                value={advancePaid} 
                onChange={(e) => setAdvancePaid(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-medium text-muted-foreground">Balance Due</span>
              <span className="text-sm font-bold text-destructive">₹{balance.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={(val: string | null) => val && setPaymentMethod(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Split">Split Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {paymentMethod === "UPI" && (
              <div className="space-y-2">
                <Label>Reference Number</Label>
                <Input placeholder="Enter transaction ID" />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCheckout} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Confirm Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
