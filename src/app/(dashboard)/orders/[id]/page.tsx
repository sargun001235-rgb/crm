"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, Printer, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const timelineEvents = [
  { id: 1, status: "Pending", description: "Order created successfully", date: "Aug 01, 2026, 10:30 AM", isCompleted: true },
  { id: 2, status: "Sent to Lab", description: "Lenses sent for processing", date: "Aug 01, 2026, 02:15 PM", isCompleted: true },
  { id: 3, status: "In Production", description: "Fitting and cutting in progress", date: "-", isCompleted: false },
  { id: 4, status: "Ready", description: "Order is ready for pickup", date: "-", isCompleted: false },
  { id: 5, status: "Delivered", description: "Handed over to customer", date: "-", isCompleted: false },
];

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
             <h1 className="text-3xl font-bold tracking-tight">Order {params.id.toUpperCase()}</h1>
             <p className="text-muted-foreground mt-1">Customer: Rahul Sharma • Due Date: Aug 05, 2026</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Send SMS
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Invoice
          </Button>
          <Button>Mark as Ready</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-semibold">Ray-Ban Aviator Classic</p>
                    <p className="text-sm text-muted-foreground">SKU: FRM-RB-3025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹8,500.00 x 1</p>
                    <p className="font-bold">₹8,500.00</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-semibold">Zeiss ClearView 1.56</p>
                    <p className="text-sm text-muted-foreground">SKU: LNS-CZ-156</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹2,500.00 x 1</p>
                    <p className="font-bold">₹2,500.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-2 text-sm">
                 <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹11,000.00</span></div>
                 <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-green-600">-₹500.00</span></div>
                 <div className="flex justify-between"><span className="text-muted-foreground">GST (18%)</span><span>₹1,890.00</span></div>
                 <Separator className="my-2" />
                 <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span>₹12,390.00</span></div>
                 <div className="flex justify-between"><span className="text-muted-foreground">Advance Paid</span><span>₹5,000.00</span></div>
                 <div className="flex justify-between font-bold text-destructive"><span>Balance Due</span><span>₹7,390.00</span></div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Track the order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative flex gap-4">
                    {/* Vertical line connector */}
                    {index !== timelineEvents.length - 1 && (
                      <div className={`absolute left-[11px] top-7 bottom-[-24px] w-0.5 ${event.isCompleted ? 'bg-primary' : 'bg-muted'}`}></div>
                    )}
                    
                    <div className="relative z-10 bg-card rounded-full mt-1">
                      {event.isCompleted ? (
                         <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                         <Clock className="h-6 w-6 text-muted-foreground opacity-50" />
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1 pb-2">
                      <span className={`font-semibold ${event.isCompleted ? '' : 'text-muted-foreground'}`}>{event.status}</span>
                      <span className="text-sm text-muted-foreground line-clamp-2">{event.description}</span>
                      <span className="text-xs font-medium mt-1 text-muted-foreground/80">{event.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
