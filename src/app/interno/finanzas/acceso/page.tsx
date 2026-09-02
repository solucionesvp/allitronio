import { Suspense } from "react";
import AccesoForm from "./AccesoForm";

export default function FinanzasAccesoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoForm />
    </Suspense>
  );
}
