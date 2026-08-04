import { getCustomers } from "../../../customers/actions";
import { getPrescription } from "../../actions";
import EditPrescriptionClient from "./EditPrescriptionClient";
import { notFound } from "next/navigation";

export default async function EditPrescriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const prescription = await getPrescription(resolvedParams.id);
  const customers = await getCustomers();

  if (!prescription) {
    notFound();
  }

  return <EditPrescriptionClient customers={customers} prescription={prescription} />;
}
