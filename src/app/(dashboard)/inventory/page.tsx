import Link from "next/link";
import { Plus, Search, AlertTriangle, Pencil } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inventory } from "@/types/database.types";

const mockInventory: Inventory[] = [
  {
    id: "inv-1",
    sku: "FRM-RB-3025",
    barcode: "8053672000000",
    category: "Sunglasses",
    brand: "Ray-Ban",
    model: "Aviator Classic",
    color: "Gold / Green",
    purchase_price: 4500,
    selling_price: 8500,
    stock_quantity: 12,
    low_stock_threshold: 5,
    supplier_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null
  },
  {
    id: "inv-2",
    sku: "LNS-CZ-156",
    barcode: "8053672000001",
    category: "Lenses",
    brand: "Zeiss",
    model: "ClearView 1.56",
    color: "Clear",
    purchase_price: 800,
    selling_price: 2500,
    stock_quantity: 3,
    low_stock_threshold: 10,
    supplier_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null
  }
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <Link href="/inventory/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by SKU, Brand, or Model..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.sku}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-primary">
                      {item.brand} {item.model}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.color}</span>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">
                  {item.stock_quantity <= item.low_stock_threshold ? (
                    <Badge variant="destructive" className="ml-auto">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      {item.stock_quantity}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{item.stock_quantity}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">₹{item.selling_price}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/inventory/${item.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
