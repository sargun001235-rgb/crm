"use client";

import { useState } from "react";
import { usePosStore } from "@/stores/usePosStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CheckoutModal } from "@/components/pos/CheckoutModal";
import { CustomProductModal } from "@/components/pos/CustomProductModal";
import { getInventory } from "@/app/(dashboard)/inventory/actions";
import { Inventory } from "@/types/database.types";

export default function POSPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, discount, setDiscount, selectedCustomer } = usePosStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  import("react").then((React) => {
    React.useEffect(() => {
      getInventory().then(data => setInventory(data));
    }, []);
  });

  const subtotal = cart.reduce((acc, item) => acc + item.selling_price * item.cart_quantity, 0);
  const gst = subtotal * 0.18; // 18% GST (Example)
  const total = subtotal + gst - discount;

  const products = inventory.filter(p => 
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.model && p.model.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6 -mt-2">
      {/* Left Panel: Products */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Scan barcode or search products..." 
              className="pl-8 bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <Button variant="default" className="shrink-0" onClick={() => setIsCustomOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Custom Item
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pb-4">
          {products.map(product => (
            <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => addToCart(product as any)}>
              <CardContent className="p-4 flex flex-col items-center text-center justify-center h-32">
                <span className="text-sm font-medium text-muted-foreground uppercase">{product.category}</span>
                <span className="font-bold">{product.brand}</span>
                <span className="text-sm line-clamp-1">{product.model}</span>
                <span className="mt-2 text-primary font-bold">₹{product.selling_price}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel: Cart */}
      <div className="w-[400px] flex flex-col border rounded-lg bg-card">
        <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Current Sale</h2>
            <p className="text-sm text-muted-foreground">
              {selectedCustomer ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}` : "Walk-in Customer"}
            </p>
          </div>
          <Button variant="outline" size="icon" title="Add Customer">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2">
              <Search className="h-8 w-8 opacity-20" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold">{item.brand} {item.model}</p>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, Math.max(1, item.cart_quantity - 1))}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-4 text-center">{item.cart_quantity}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.cart_quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-semibold">₹{(item.selling_price * item.cart_quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t space-y-3 bg-muted/10">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <Input 
              type="number" 
              className="w-24 h-7 text-right" 
              value={discount} 
              onChange={(e) => setDiscount(Number(e.target.value))} 
            />
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Button className="w-full h-12 text-lg mt-4" disabled={cart.length === 0} onClick={() => setIsCheckoutOpen(true)}>
            <CreditCard className="mr-2 h-5 w-5" />
            Proceed to Pay
          </Button>
        </div>
      </div>
      
      <CheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} total={total} />
      <CustomProductModal open={isCustomOpen} onOpenChange={setIsCustomOpen} />
    </div>
  );
}
