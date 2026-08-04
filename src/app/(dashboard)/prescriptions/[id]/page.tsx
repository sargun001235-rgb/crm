"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Printer, Eye } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function PrescriptionProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-4">
          <Link href="/prescriptions" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Prescription Details</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="default" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print Prescription
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <div>
            <CardTitle className="text-xl">Customer: Rahul Sharma</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Date: Aug 01, 2026</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Dr. Admin</p>
            <p className="text-sm text-muted-foreground">Optical CRM Clinic</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div>
            <div className="overflow-hidden rounded-lg border bg-background">
              <table className="w-full text-sm text-center">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-left">EYE</th>
                    <th className="px-4 py-3 font-semibold">SPH</th>
                    <th className="px-4 py-3 font-semibold">CYL</th>
                    <th className="px-4 py-3 font-semibold">AXIS</th>
                    <th className="px-4 py-3 font-semibold">ADD</th>
                    <th className="px-4 py-3 font-semibold">PRISM</th>
                    <th className="px-4 py-3 font-semibold">VA</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-left text-primary">Right (OD)</td>
                    <td className="px-4 py-3">-1.00</td>
                    <td className="px-4 py-3">-0.50</td>
                    <td className="px-4 py-3">90</td>
                    <td className="px-4 py-3">+2.00</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">6/6</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-left text-primary">Left (OS)</td>
                    <td className="px-4 py-3">-1.25</td>
                    <td className="px-4 py-3">-0.75</td>
                    <td className="px-4 py-3">85</td>
                    <td className="px-4 py-3">+2.00</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">6/6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/50 p-4 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">PD</p>
              <p className="font-medium mt-1">62 mm</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Lens Type</p>
              <p className="font-medium mt-1">Progressive</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Frame Type</p>
              <p className="font-medium mt-1">Full Rim</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Coating</p>
              <p className="font-medium mt-1">Blue Cut ARC</p>
            </div>
          </div>

          <div>
             <p className="text-xs font-semibold text-muted-foreground uppercase">Remarks</p>
             <p className="font-medium mt-1">For computer use primarily.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
