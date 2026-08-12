"use client";

import { use, useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useReactToPrint } from "react-to-print";
import { getOrder } from "../../actions";

export default function InvoicePrintPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const contentRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then(data => {
      setOrder(data);
      setLoading(false);
    });
  }, [id]);
  
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Invoice_${order?.order_number || id}`
  });

  if (loading) return <div className="p-8 text-center">Loading Invoice...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found.</div>;

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
            <p className="text-gray-500 mt-1">Order # {order.order_number}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold tracking-tight flex items-center justify-end space-x-2">
              <Eye className="w-8 h-8 text-black" />
              <div className="flex flex-col text-right">
                <span>Amritsar Eye Clinic</span>
                <span className="text-xs font-normal text-gray-500 mt-1">Shahheed Udham Singh Nagar Main Bazar Street No.3</span>
                <span className="text-xs font-normal text-gray-500">Phone: 9915930068, 7340710332</span>
              </div>
            </h2>
            <p className="text-sm text-gray-500">GSTIN: 27AADCB2230M1Z2</p>
          </div>
        </div>

        <Separator className="bg-black/10" />

        {/* Customer & Dates */}
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
            <p className="font-semibold text-lg">{order.customers?.first_name} {order.customers?.last_name}</p>
            <p className="text-gray-600">Phone: {order.customers?.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
            <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
            <div className="mt-2 inline-block px-3 py-1 bg-gray-100 border border-gray-300 rounded font-bold text-sm">
              Status: {order.status.toUpperCase()}
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
              {order.order_items?.map((item: any) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <p className="font-semibold text-black">{item.inventory?.brand} {item.inventory?.model}</p>
                    <p className="text-sm text-gray-500">{item.inventory?.sku || "Custom Item"}</p>
                  </td>
                  <td className="py-4 text-center text-black">{item.quantity}</td>
                  <td className="py-4 text-right text-black">₹{item.unit_price.toFixed(2)}</td>
                  <td className="py-4 text-right font-medium text-black">₹{item.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-8">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{order.gst_amount.toFixed(2)}</span>
            </div>
            <Separator className="bg-black/10 my-2" />
            <div className="flex justify-between text-xl font-bold text-black">
              <span>Total</span>
              <span>₹{order.total_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Advance Paid</span>
              <span>₹{order.advance_paid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-black border-t-2 border-black pt-2 mt-2">
              <span>Balance Due</span>
              <span>₹{order.balance_due.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="pt-8 mt-12 border-t border-gray-200 text-center text-sm text-gray-500 space-y-4">
          <p className="font-bold text-black text-lg">Total Billed Amount: ₹{order.total_amount.toFixed(2)}</p>
          
          <div className="bg-gray-100 p-4 rounded-lg border border-black text-black space-y-1 inline-block">
             <p className="font-semibold text-primary">A routine eye examination is recommended after 6 months to monitor your vision, detect any changes early, and maintain good eye health.</p>
          </div>
          
          <div className="text-xs text-gray-600 space-y-1">
             <p className="font-bold uppercase mb-2">Eye Care Habits for Safe Vision:</p>
             <p>• Take regular screen breaks using the 20-20-20 rule (Every 20 mins, look 20 ft away for 20 secs).</p>
             <p>• Wear UV protection sunglasses when outdoors. • Maintain a healthy diet rich in leafy greens.</p>
             <p>• Avoid rubbing your eyes and ensure proper lighting while reading.</p>
          </div>
          
          <p className="pt-4 font-semibold text-black">Thank you for choosing Amritsar Eye Clinic!</p>
          <p className="text-xs">Goods once sold cannot be returned. Exchange available within 7 days.</p>
          
          <div className="pt-6">
            <p className="text-xl font-bold tracking-tight italic text-primary">
              "See the world with pure clarity"
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
