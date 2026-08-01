import Link from "next/link";
import { Search, ExternalLink, CalendarClock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus } from "@/types/database.types";

const mockOrders = [
  {
    id: "ord-001",
    order_number: "ORD-2026-0801",
    customer_name: "Rahul Sharma",
    status: "Sent to Lab" as OrderStatus,
    total_amount: 8500,
    balance_due: 0,
    estimated_delivery: "2026-08-05",
    created_at: new Date().toISOString()
  },
  {
    id: "ord-002",
    order_number: "ORD-2026-0802",
    customer_name: "Priya Patel",
    status: "Ready" as OrderStatus,
    total_amount: 3200,
    balance_due: 1500,
    estimated_delivery: "2026-08-01",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

const getStatusBadge = (status: OrderStatus) => {
  switch(status) {
    case 'Delivered': return <Badge variant="default" className="bg-green-600">Delivered</Badge>;
    case 'Ready': return <Badge variant="default" className="bg-blue-600">Ready for Pickup</Badge>;
    case 'Sent to Lab': return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">At Lab</Badge>;
    case 'In Production': return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">In Production</Badge>;
    case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Link href="/pos" className={buttonVariants({ variant: "default" })}>
          New Order (POS)
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by order number or customer..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">₹{order.total_amount}</TableCell>
                <TableCell className="text-right font-medium text-destructive">
                  {order.balance_due > 0 ? `₹${order.balance_due}` : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/orders/${order.id}`} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Details
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
