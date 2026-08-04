import Link from "next/link";
import { Plus, Search, Eye, Edit2, Trash2 } from "lucide-react";
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
import { getPrescriptions, deletePrescription } from "./actions";

export default async function PrescriptionsPage() {
  const prescriptions = await getPrescriptions();

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
            {prescriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No prescriptions found.
                </TableCell>
              </TableRow>
            ) : (
              prescriptions.map((rx: any) => (
                <TableRow key={rx.id}>
                  <TableCell className="font-medium">
                    {rx.customer_name}
                  </TableCell>
                  <TableCell>{new Date(rx.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{rx.doctor_name || "Dr. Admin"}</TableCell>
                  <TableCell>{rx.lens_type || "-"}</TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Link href={`/prescriptions/${rx.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link href={`/prescriptions/${rx.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <form action={deletePrescription.bind(null, rx.id)} className="inline-block">
                      <Button variant="destructive" size="sm" type="submit" onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this prescription?')) e.preventDefault();
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
