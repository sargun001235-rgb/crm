"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Edit2, Plus, FileText } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { deleteCustomer } from "./actions";

export function CustomerRowWithPrescriptions({ customer, index }: { customer: any; index: number }) {
  const [expanded, setExpanded] = useState(false);

  // Sort prescriptions descending by created_at
  const prescriptions = customer.prescriptions ? [...customer.prescriptions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [];

  return (
    <>
      <TableRow key={customer.id}>
        <TableCell className="font-medium flex items-center space-x-2">
          <span className="text-muted-foreground w-6 text-sm">{index + 1}.</span>
          <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
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
          <form action={async () => {
             // Doing this via Server Action bound with `.bind` is not possible since it's a client component.
             // We can just call deleteCustomer directly if it's imported, wait, deleteCustomer is a server action,
             // it needs to be called inside an async function or a form action.
             // Since next 14+ supports server actions in client components, we can just do:
             await deleteCustomer(customer.id);
          }} className="inline-block">
            <DeleteButton iconOnly text="customer" />
          </form>
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow className="bg-muted/30">
          <TableCell colSpan={6} className="p-0 border-b">
            <div className="p-4 pl-12 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm flex items-center space-x-2">
                   <FileText className="h-4 w-4 text-muted-foreground" />
                   <span>Prescription History</span>
                </h4>
                <Link href={`/prescriptions/new?customerId=${customer.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                  <Plus className="mr-2 h-3 w-3" /> Add Prescription
                </Link>
              </div>

              {prescriptions.length === 0 ? (
                 <p className="text-sm text-muted-foreground">No prescriptions found for this customer.</p>
              ) : (
                <div className="space-y-2">
                  {prescriptions.map((rx: any) => (
                    <div key={rx.id} className="flex justify-between items-center p-3 bg-background border rounded-md shadow-sm">
                      <div className="text-sm">
                        <span className="font-medium text-foreground">{new Date(rx.created_at).toLocaleDateString()}</span>
                        <span className="text-muted-foreground mx-2">|</span>
                        <span className="text-muted-foreground">Dr. {rx.doctor_name || "Admin"}</span>
                        <span className="text-muted-foreground mx-2">|</span>
                        <span className="text-muted-foreground">Lens: {rx.lens_type || "-"}</span>
                      </div>
                      <div className="space-x-2">
                        <Link href={`/prescriptions/${rx.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                           View
                        </Link>
                        <Link href={`/prescriptions/${rx.id}/edit`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                           Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
