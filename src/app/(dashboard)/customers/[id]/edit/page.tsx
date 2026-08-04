import { getCustomer } from "../../actions";
import EditCustomerClient from "./EditCustomerClient";

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await getCustomer(params.id);

  if (!customer) {
    return <div className="p-8 text-center text-red-500">Customer not found.</div>;
  }

  return <EditCustomerClient customer={customer} />;
}
