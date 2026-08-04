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
import { getInventory } from "./actions";

export default async function InventoryPage() {
  const inventory = await getInventory();

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
            {inventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No inventory items found. Start adding products!
                </TableCell>
              </TableRow>
            ) : (
              inventory.map((item) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
