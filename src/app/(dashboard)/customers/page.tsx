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
import { getCustomers, deleteCustomer } from "./actions";
import DeleteCustomerButton from "./[id]/DeleteCustomerButton";

export default async function CustomersPage({ searchParams }: { searchParams: { q?: string } }) {
  let customers = await getCustomers();
  
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
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
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <Link href={`/customers/${customer.id}`} className="hover:underline text-primary">
                      {customer.first_name} {customer.last_name}
                    </Link>
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell className="text-right">₹{customer.lifetime_spending}</TableCell>
                  <TableCell className="text-right text-destructive font-medium">
                    {customer.outstanding_balance > 0 ? `₹${customer.outstanding_balance}` : "₹0"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/customers/${customer.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <form action={deleteCustomer.bind(null, customer.id)} className="inline-block">
                      <Button variant="destructive" size="sm" type="submit" onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this customer?')) e.preventDefault();
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
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
