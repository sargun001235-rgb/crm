import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Plus, FileText, ShoppingBag, Calendar } from "lucide-react";
import Link from "next/link";
import DeleteCustomerButton from "./DeleteCustomerButton";

import { getCustomer, deleteCustomer } from "../actions";
import { getCustomerPrescriptions } from "@/app/(dashboard)/prescriptions/actions";
import { notFound } from "next/navigation";

export default async function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomer(id);
  const prescriptions = await getCustomerPrescriptions(id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/customers" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {customer.first_name} {customer.last_name}
          </h1>
          {customer.outstanding_balance > 0 ? (
            <Badge variant="destructive">Due: ₹{customer.outstanding_balance}</Badge>
          ) : (
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">Clear</Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Link href={`/customers/${customer.id}/edit`} className={buttonVariants({ variant: "outline" })}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
          <form action={async () => {
            "use server";
            await deleteCustomer(customer.id);
          }}>
            <DeleteCustomerButton />
          </form>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{customer.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{customer.address}, {customer.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">DOB</p>
              <p>{customer.date_of_birth}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Medical History</p>
              <p className="text-destructive font-medium">{customer.medical_history || "None"}</p>
            </div>
            <div className="pt-4 border-t border-border mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">Lifetime Value</span>
                <span className="font-bold">₹{customer.lifetime_spending}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="prescriptions" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12">
              <TabsTrigger value="prescriptions" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                <FileText className="mr-2 h-4 w-4" />
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="appointments" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments & SMS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="prescriptions" className="p-4 border rounded-b-md mt-0 bg-card">
              {prescriptions.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  <FileText className="mx-auto h-10 w-10 opacity-20 mb-4" />
                  <p>No prescriptions found.</p>
                  <Link href="/prescriptions/new" className={buttonVariants({ variant: "outline", className: "mt-4" })}>Add Prescription</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Prescription History</h3>
                    <Link href="/prescriptions/new" className={buttonVariants({ variant: "outline", size: "sm" })}>
                      <Plus className="mr-2 h-4 w-4" /> Add
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {prescriptions.map((rx: any) => (
                      <div key={rx.id} className="flex justify-between items-center p-4 border rounded-md">
                        <div>
                          <p className="font-medium">{new Date(rx.created_at).toLocaleDateString()} - {rx.doctor_name || "Dr. Admin"}</p>
                          <p className="text-sm text-muted-foreground">Lens: {rx.lens_type || "-"} | Frame: {rx.frame_type || "-"}</p>
                        </div>
                        <Link href={`/prescriptions/${rx.id}`} className={buttonVariants({ variant: "default", size: "sm" })}>
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="orders" className="p-4 border rounded-b-md mt-0 bg-card">
              <div className="text-center py-10 text-muted-foreground">
                <ShoppingBag className="mx-auto h-10 w-10 opacity-20 mb-4" />
                <p>No orders found.</p>
                <Button variant="outline" className="mt-4">Create Order</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="p-4 border rounded-b-md mt-0 bg-card">
              <div className="text-center py-10 text-muted-foreground">
                <Calendar className="mx-auto h-10 w-10 opacity-20 mb-4" />
                <p>No history found.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
