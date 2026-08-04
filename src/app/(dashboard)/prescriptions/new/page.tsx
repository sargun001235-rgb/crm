import { getCustomers } from "../../customers/actions";
import NewPrescriptionForm from "./NewPrescriptionForm";

export default async function NewPrescriptionPage() {
  const customers = await getCustomers();
  return <NewPrescriptionForm customers={customers} />;
}
