"use client";

import { useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";

export default function PrescriptionClient({ prescription }: { prescription: any }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Prescription_${prescription?.id || 'Unknown'}`,
  });

  if (!prescription) {
    return <div className="p-8 text-center">Prescription not found</div>;
  }

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
          <Button variant="default" onClick={() => handlePrint()}>
            <Printer className="mr-2 h-4 w-4" />
            Print Prescription
          </Button>
        </div>
      </div>

      <div ref={contentRef} className="print:p-8 bg-white text-black">
        <Card className="border-none shadow-none print:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-black">
            <div>
              <CardTitle className="text-xl">Customer: {prescription.customer_name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Date: {new Date(prescription.created_at).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{prescription.doctor_name || "Dr. Admin"}</p>
              <p className="text-sm text-gray-500">Optical CRM Clinic</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-8 text-black">
            <div>
              <div className="overflow-hidden rounded-lg border border-black bg-white">
                <table className="w-full text-sm text-center">
                  <thead className="bg-gray-100 text-black border-b border-black">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-left border-r border-black">EYE</th>
                      <th className="px-4 py-3 font-semibold border-r border-black">SPH</th>
                      <th className="px-4 py-3 font-semibold border-r border-black">CYL</th>
                      <th className="px-4 py-3 font-semibold border-r border-black">AXIS</th>
                      <th className="px-4 py-3 font-semibold border-r border-black">ADD</th>
                      <th className="px-4 py-3 font-semibold border-r border-black">PRISM</th>
                      <th className="px-4 py-3 font-semibold">VA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    <tr>
                      <td className="px-4 py-3 font-bold text-left border-r border-black">Right (OD)</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.re_sph || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.re_cyl || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.re_axis || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.re_add || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.re_prism || "-"}</td>
                      <td className="px-4 py-3">{prescription.re_va || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-left border-r border-black">Left (OS)</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.le_sph || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.le_cyl || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.le_axis || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.le_add || "-"}</td>
                      <td className="px-4 py-3 border-r border-black">{prescription.le_prism || "-"}</td>
                      <td className="px-4 py-3">{prescription.le_va || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-4 rounded-lg border border-black">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">PD</p>
                <p className="font-medium mt-1">{prescription.pd || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Lens Type</p>
                <p className="font-medium mt-1">{prescription.lens_type || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Frame Type</p>
                <p className="font-medium mt-1">{prescription.frame_type || "-"}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Coating</p>
                <p className="font-medium mt-1">{prescription.lens_coating || "-"}</p>
              </div>
            </div>

            <div>
               <p className="text-xs font-bold text-gray-500 uppercase">Remarks</p>
               <p className="font-medium mt-1">{prescription.remarks || "No remarks."}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
