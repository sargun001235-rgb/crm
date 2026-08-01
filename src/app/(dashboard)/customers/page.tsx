import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types/database.types";

const mockCustomers: Customer[] = [
  {
    id: "1",
    first_name: "Rahul",
    last_name: "Sharma",
    phone: "+91 9876543210",
    email: "rahul.s@example.com",
    address: "123 MG Road",
    city: "Mumbai",
    date_of_birth: "1985-06-15",
    medical_history: "Diabetes",
    lifetime_spending: 15400,
    outstanding_balance: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
  },
  {
    id: "2",
    first_name: "Priya",
    last_name: "Patel",
    phone: "+91 9123456789",
    email: "priya.p@example.com",
    address: "456 Link Road",
    city: "Ahmedabad",
    date_of_birth: "1992-11-20",
    medical_history: "None",
    lifetime_spending: 8200,
    outstanding_balance: 1500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
  }
];

export default function CustomersPage() {
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
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, mobile, or city..."
            className="pl-8"
          />
        </div>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCustomers.map((customer) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
