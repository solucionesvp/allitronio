import type { SupabaseClient } from "@supabase/supabase-js";

// ── Envío por Resend (API REST, sin dependencia extra) ──────────────────────
// Un fallo de correo NUNCA debe tumbar una reserva: la reunión ya existe. Todo
// intento (bueno o malo) queda en email_log y el panel permite reenviar.

export interface AdjuntoCorreo {
  filename: string;
  contenido: string; // texto plano (utf-8), o base64 si `base64` es true
  contentType: string;
  /** El contenido ya viene en base64 (archivos binarios como PDF). */
  base64?: boolean;
}

export interface EnvioCorreo {
  para: string[];
  asunto: string;
  html: string;
  texto: string;
  replyTo?: string | null;
  /** Copia oculta (equipo): el destinatario principal no ve estas direcciones. */
  bcc?: string[];
  adjuntos?: AdjuntoCorreo[];
  /** Evita duplicados si la petición se reintenta. */
  idempotencyKey?: string;
}

export function correoConfigurado(): { resend: boolean; remitente: boolean } {
  return { resend: Boolean(process.env.RESEND_API_KEY), remitente: Boolean(process.env.REUNIONES_FROM_EMAIL) };
}

export async function enviarCorreo(
  db: SupabaseClient,
  meta: { reunionId: string | null; tipo: string; cobroId?: string | null },
  e: EnvioCorreo
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REUNIONES_FROM_EMAIL;
  const para = [...new Set(e.para.filter(Boolean).map((p) => p.trim().toLowerCase()))];

  const bcc = [...new Set((e.bcc ?? []).filter(Boolean).map((p) => p.trim().toLowerCase()))].filter((b) => !para.includes(b));

  const registrar = async (estado: "enviado" | "error", proveedorId?: string, error?: string) => {
    await db
      .from("email_log")
      .insert({ reunion_id: meta.reunionId, tipo: meta.tipo, destinatarios: para, estado, proveedor_id: proveedorId ?? null, error: error ?? null, ...(meta.cobroId ? { cobro_id: meta.cobroId } : {}) });
  };

  if (!apiKey || !from) {
    await registrar("error", undefined, "not_configured: falta RESEND_API_KEY o REUNIONES_FROM_EMAIL");
    return { ok: false, error: "not_configured" };
  }
  if (para.length === 0) {
    await registrar("error", undefined, "sin destinatarios");
    return { ok: false, error: "sin_destinatarios" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(e.idempotencyKey ? { "Idempotency-Key": e.idempotencyKey } : {}),
      },
      body: JSON.stringify({
        from,
        to: para,
        subject: e.asunto,
        html: e.html,
        text: e.texto,
        ...(e.replyTo ? { reply_to: e.replyTo } : {}),
        ...(bcc.length ? { bcc } : {}),
        ...(e.adjuntos?.length
          ? {
              attachments: e.adjuntos.map((a) => ({
                filename: a.filename,
                content: a.base64 ? a.contenido : Buffer.from(a.contenido, "utf-8").toString("base64"),
                content_type: a.contentType,
              })),
            }
          : {}),
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!res.ok) {
      const msg = `Resend ${res.status}: ${json.message ?? "error"}`;
      await registrar("error", undefined, msg);
      return { ok: false, error: msg };
    }
    await registrar("enviado", json.id);
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "error de red";
    await registrar("error", undefined, msg);
    return { ok: false, error: msg };
  }
}
