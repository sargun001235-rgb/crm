import { getCustomer } from "../../actions";
import EditCustomerClient from "./EditCustomerClient";

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    return <div className="p-8 text-center text-red-500">Customer not found.</div>;
  }

  return <EditCustomerClient customer={customer} />;
}
