import { getPrescription } from "../actions";
import PrescriptionClient from "./PrescriptionClient";

export default async function PrescriptionProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prescription = await getPrescription(id);

  return (
    <PrescriptionClient prescription={prescription} />
  );
}
