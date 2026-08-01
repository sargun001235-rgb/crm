"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function InvoicePrintPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Automatically open print dialog on load in production
    // window.print();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Controls (Hidden on print) */}
        <div className="print:hidden flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
        </div>

        {/* Invoice Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-black">INVOICE</h1>
            <p className="text-gray-500 mt-1">Order # {params.id.toUpperCase()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold tracking-tight">LUMIÈRE OPTICS</h2>
            <p className="text-sm text-gray-500 mt-1">123 Visionary Ave, Optic City</p>
            <p className="text-sm text-gray-500">Phone: +91 98765 43210</p>
            <p className="text-sm text-gray-500">GSTIN: 27AADCB2230M1Z2</p>
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* Customer & Dates */}
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
            <p className="font-semibold text-lg">Rahul Sharma</p>
            <p className="text-gray-600">+91 99887 77665</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
            <p className="font-semibold">01 Aug 2026</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-3 font-semibold text-sm uppercase text-gray-600">Item Description</th>
                <th className="py-3 font-semibold text-sm uppercase text-gray-600 text-center">Qty</th>
                <th className="py-3 font-semibold text-sm uppercase text-gray-600 text-right">Price</th>
                <th className="py-3 font-semibold text-sm uppercase text-gray-600 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4">
                  <p className="font-semibold text-black">Ray-Ban Aviator Classic</p>
                  <p className="text-sm text-gray-500">FRM-RB-3025</p>
                </td>
                <td className="py-4 text-center text-black">1</td>
                <td className="py-4 text-right text-black">₹8,500.00</td>
                <td className="py-4 text-right font-medium text-black">₹8,500.00</td>
              </tr>
              <tr>
                <td className="py-4">
                  <p className="font-semibold text-black">Zeiss ClearView 1.56</p>
                  <p className="text-sm text-gray-500">LNS-CZ-156</p>
                </td>
                <td className="py-4 text-center text-black">1</td>
                <td className="py-4 text-right text-black">₹2,500.00</td>
                <td className="py-4 text-right font-medium text-black">₹2,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-8">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹11,000.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount</span>
              <span>-₹500.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹1,890.00</span>
            </div>
            <Separator className="bg-black/10 my-2" />
            <div className="flex justify-between text-xl font-bold text-black">
              <span>Total</span>
              <span>₹12,390.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Advance Paid</span>
              <span>₹5,000.00</span>
            </div>
            <div className="flex justify-between font-bold text-black border-t-2 border-black pt-2 mt-2">
              <span>Balance Due</span>
              <span>₹7,390.00</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="pt-16 text-center text-sm text-gray-500 space-y-1">
          <p>Thank you for choosing Lumière Optics!</p>
          <p>Goods once sold cannot be returned. Exchange available within 7 days.</p>
        </div>
      </div>
    </div>
  );
}
