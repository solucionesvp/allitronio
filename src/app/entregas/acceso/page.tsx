import { Suspense } from "react";
import AccesoForm from "./AccesoForm";

export default function AccesoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoForm />
    </Suspense>
  );
}
