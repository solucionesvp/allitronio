"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { AjustesCobros as Ajustes } from "@/lib/cobros/types";
import { accion, Aviso, P, type DatosCobros } from "./comun";

export default function AjustesCobros({ datos, recargar }: { datos: DatosCobros; recargar: () => Promise<void> }) {
  const [a, setA] = useState<Ajustes>(datos.ajustes);
  const [guardando, setGuardando] = useState(false);
  const [msg, setMsg] = useState<{ tipo: "ok" | "error"; t: string } | null>(null);

  const campo = (id: string, et: string, el: React.ReactNode, ancho = false) => (
    <div className={ancho ? "sm:col-span-2" : ""}><label className={P.label} htmlFor={id}>{et}</label>{el}</div>
  );

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setMsg(null);
    const r = await accion({ accion: "guardar_ajustes", ...a });
    setGuardando(false);
    if (!r.ok) return setMsg({ tipo: "error", t: r.mensaje ?? "No se pudo guardar." });
    setMsg({ tipo: "ok", t: "Ajustes guardados. Los cobros nuevos los usarán; los ya emitidos no cambian." });
    await recargar();
  }

  return (
    <form onSubmit={guardar} className="flex flex-col gap-6">
      <Aviso tipo="info">Estos datos son los valores por defecto de cada cobro nuevo. Cada cobro guarda su propia copia, así que cambiar esto no altera comprobantes ya enviados.</Aviso>
      <section className={`${P.card} grid gap-4 sm:grid-cols-2`}>
        <h2 className={`${P.h2} sm:col-span-2`}>Quién emite</h2>
        {campo("a-nom", "Nombre", <input id="a-nom" className={P.input} value={a.emisor.nombre} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, nombre: e.target.value } })} />)}
        {campo("a-mail", "Correo de contacto (recibe las respuestas)", <input id="a-mail" type="email" className={P.input} value={a.emisor.email} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, email: e.target.value } })} />)}
        {campo("a-tel", "Teléfono", <input id="a-tel" className={P.input} value={a.emisor.telefono} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, telefono: e.target.value } })} />)}
        {campo("a-web", "Sitio web (https://)", <input id="a-web" className={P.input} value={a.emisor.web} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, web: e.target.value } })} />)}
        {campo("a-logo", "Logo (URL https)", <input id="a-logo" className={P.input} value={a.emisor.logo_url} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, logo_url: e.target.value } })} />)}
        {campo("a-dir", "Dirección", <input id="a-dir" className={P.input} value={a.emisor.direccion} onChange={(e) => setA({ ...a, emisor: { ...a.emisor, direccion: e.target.value } })} />)}
      </section>
      <section className={`${P.card} grid gap-4 sm:grid-cols-2`}>
        <h2 className={`${P.h2} sm:col-span-2`}>Datos bancarios</h2>
        {campo("ab-ben", "Beneficiario", <input id="ab-ben" className={P.input} value={a.banco.beneficiario} onChange={(e) => setA({ ...a, banco: { ...a.banco, beneficiario: e.target.value } })} />)}
        {campo("ab-ban", "Banco", <input id="ab-ban" className={P.input} value={a.banco.banco} onChange={(e) => setA({ ...a, banco: { ...a.banco, banco: e.target.value } })} />)}
        {campo("ab-cla", "CLABE (18 dígitos)", <input id="ab-cla" inputMode="numeric" maxLength={18} className={P.input} value={a.banco.clabe} onChange={(e) => setA({ ...a, banco: { ...a.banco, clabe: e.target.value.replace(/\D/g, "") } })} />)}
        {campo("ab-cue", "Cuenta / tarjeta (opcional)", <input id="ab-cue" className={P.input} value={a.banco.cuenta} onChange={(e) => setA({ ...a, banco: { ...a.banco, cuenta: e.target.value } })} />)}
      </section>
      <section className={`${P.card} grid gap-4 sm:grid-cols-2`}>
        <h2 className={`${P.h2} sm:col-span-2`}>Valores por defecto</h2>
        {campo("ad-met", "Método de pago", <input id="ad-met" className={P.input} value={a.metodo_pago} onChange={(e) => setA({ ...a, metodo_pago: e.target.value })} />)}
        {campo("ad-ven", "Días de plazo para pagar (0 = sin vencimiento)", <input id="ad-ven" inputMode="numeric" className={P.input} value={a.vence_dias} onChange={(e) => setA({ ...a, vence_dias: Number(e.target.value.replace(/\D/g, "")) || 0 })} />)}
        <div className="flex items-center gap-3 sm:col-span-2">
          <label className="flex min-h-[48px] items-center gap-2 font-body text-[0.95rem]"><input type="checkbox" checked={a.iva_activo} onChange={(e) => setA({ ...a, iva_activo: e.target.checked })} /> Cobrar IVA por defecto</label>
          <input aria-label="Porcentaje de IVA" inputMode="decimal" className={`${P.input} !w-[90px]`} value={a.iva_porcentaje} onChange={(e) => setA({ ...a, iva_porcentaje: Number(e.target.value.replace(/[^\d.]/g, "")) || 0 })} /><span className="font-body text-[0.9rem] text-secondary">%</span>
        </div>
        {campo("ad-not", "Nota por defecto para el cliente", <textarea id="ad-not" rows={3} maxLength={1000} className={`${P.input} resize-none`} value={a.notas} onChange={(e) => setA({ ...a, notas: e.target.value })} />, true)}
      </section>
      <section className={P.card}>
        <h2 className={P.h2}>Estado del envío de correo</h2>
        <p className="mt-2 font-body text-[0.95rem] text-secondary">{datos.entorno.resend && datos.entorno.remitente ? "Resend y remitente configurados: los comprobantes y avisos de pago salen por correo." : "Faltan RESEND_API_KEY y/o REUNIONES_FROM_EMAIL en Vercel. Mientras tanto puedes compartir por WhatsApp o copiando el enlace."}</p>
      </section>
      {msg && <Aviso tipo={msg.tipo}>{msg.t}</Aviso>}
      <div><button className={P.btn} disabled={guardando}>{guardando && <Loader2 className="h-4 w-4 animate-spin" />} Guardar ajustes</button></div>
    </form>
  );
}
