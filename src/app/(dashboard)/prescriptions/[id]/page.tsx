import { getPrescription } from "../actions";
import PrescriptionClient from "./PrescriptionClient";

export default async function PrescriptionProfilePage({ params }: { params: { id: string } }) {
  const prescription = await getPrescription(params.id);

  return (
    <PrescriptionClient prescription={prescription} />
  );
}
