import Link from "next/link";
import { Plus, Search, Eye } from "lucide-react";
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
import { Prescription } from "@/types/database.types";

const mockPrescriptions = [
  {
    id: "rx-1",
    customer_name: "Rahul Sharma",
    date: "2026-08-01",
    doctor_name: "Dr. Admin",
    lens_type: "Progressive",
    status: "Active"
  },
  {
    id: "rx-2",
    customer_name: "Priya Patel",
    date: "2026-07-28",
    doctor_name: "Dr. Admin",
    lens_type: "Single Vision",
    status: "Active"
  }
];

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <Link href="/prescriptions/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" />
          New Prescription
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by customer name or ID..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Lens Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrescriptions.map((rx) => (
              <TableRow key={rx.id}>
                <TableCell className="font-medium">
                  {rx.customer_name}
                </TableCell>
                <TableCell>{new Date(rx.date).toLocaleDateString()}</TableCell>
                <TableCell>{rx.doctor_name}</TableCell>
                <TableCell>{rx.lens_type}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/prescriptions/${rx.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
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
