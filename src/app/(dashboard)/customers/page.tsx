import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import CustomerSearch from "./CustomerSearch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/database.types";
import { getCustomers } from "./actions";
import { CustomerRowWithPrescriptions } from "./CustomerRowWithPrescriptions";

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  let customers = await getCustomers();
  
  if (resolvedSearchParams.q) {
    const query = resolvedSearchParams.q.toLowerCase();
    customers = customers.filter(c => 
      c.first_name.toLowerCase().includes(query) ||
      (c.last_name && c.last_name.toLowerCase().includes(query)) ||
      c.phone.includes(query) ||
      (c.city && c.city.toLowerCase().includes(query))
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <Link href="/customers/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Customer
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <CustomerSearch />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Lifetime Spending</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No customers found. Create your first customer!
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <CustomerRowWithPrescriptions key={customer.id} customer={customer} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
