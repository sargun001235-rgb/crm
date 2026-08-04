"use client";

import { use, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useReactToPrint } from "react-to-print";

export default function InvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Invoice_${id}`
  });

  return (
    <div className="min-h-screen bg-white text-black p-8 print:p-0">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Controls (Hidden on print) */}
        <div className="print:hidden flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order
          </Button>
          <Button onClick={() => handlePrint()}>
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
        </div>

        {/* Invoice Header */}
        <div ref={contentRef} className="p-8 bg-white text-black">
          <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-black">INVOICE</h1>
            <p className="text-gray-500 mt-1">Order # {id.toUpperCase()}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold tracking-tight flex items-center justify-end space-x-2">
              <Eye className="w-8 h-8 text-black" />
              <span>Amritsar Eyeclinic</span>
            </h2>
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
            <p className="text-gray-600">Phone: +91 99887 77665</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
            <p className="font-semibold">01 Aug 2026</p>
            <div className="mt-2 inline-block px-3 py-1 bg-gray-100 border border-gray-300 rounded font-bold text-sm">
              Status: POSTPAID (Balance Due)
            </div>
          </div>
        </div>

        {/* Prescription Details Summary */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 border-b pb-2">Prescription & Lens Details</p>
          <div className="grid grid-cols-3 gap-4 text-sm mt-3">
            <div>
              <span className="text-gray-500 block mb-1">Lens Type:</span>
              <span className="font-semibold">Polycarbonate, Progressive</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Coating:</span>
              <span className="font-semibold">ARC, Blue-cut</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Frame Type:</span>
              <span className="font-semibold">Half Frame</span>
            </div>
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
        <div className="pt-8 mt-12 border-t border-gray-200 text-center text-sm text-gray-500 space-y-4">
          <p className="font-bold text-black text-lg">Total Billed Amount: ₹12,390.00</p>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-black text-black space-y-1 inline-block">
             <p className="font-semibold">The checkup is valid up to 6 months.</p>
             <p className="font-semibold text-primary">Get 10% discount when checked again under 6 months!</p>
          </div>
          
          <div className="text-xs text-gray-600 space-y-1">
             <p className="font-bold uppercase mb-2">Eye Care Habits for Safe Vision:</p>
             <p>• Take regular screen breaks using the 20-20-20 rule (Every 20 mins, look 20 ft away for 20 secs).</p>
             <p>• Wear UV protection sunglasses when outdoors. • Maintain a healthy diet rich in leafy greens.</p>
             <p>• Avoid rubbing your eyes and ensure proper lighting while reading.</p>
          </div>
          
          <p className="pt-4 font-semibold text-black">Thank you for choosing Amritsar Eyeclinic!</p>
          <p className="text-xs">Goods once sold cannot be returned. Exchange available within 7 days.</p>
        </div>
        </div>
      </div>
    </div>
  );
}
