import { Suspense } from "react";
import AccesoForm from "./AccesoForm";

export default function ReunionesAccesoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoForm />
    </Suspense>
  );
}
