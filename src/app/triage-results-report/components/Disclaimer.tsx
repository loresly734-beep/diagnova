import React from 'react';
import { Scale } from 'lucide-react';

export default function Disclaimer() {
  return (
    <section className="print-card rounded-3xl border border-border bg-muted p-6 sm:p-7 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
        <Scale className="w-5 h-5 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-base font-extrabold text-foreground">Aviso legal</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          DiagNova es una herramienta de soporte a la decisión clínica (CDSS) con fines orientativos y educativos. Este informe no constituye un diagnóstico ni reemplaza la consulta, el examen físico o el criterio de un profesional de la salud colegiado. Ante cualquier duda o empeoramiento, acude a un servicio médico. En caso de emergencia, llama al 112 o 911.
        </p>
      </div>
    </section>
  );
}