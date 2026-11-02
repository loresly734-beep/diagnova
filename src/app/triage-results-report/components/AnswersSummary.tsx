import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { SessionState, labelFor } from '@/lib/clinicalData';

interface AnswersSummaryProps {
  session: SessionState;
}

export default function AnswersSummary({ session }: AnswersSummaryProps) {
  const rows: { id: string; label: string; value: string }[] = [
    { id: 'row-entry', label: 'Motivo de consulta', value: session.entry || 'Evaluación general' },
    { id: 'row-onset', label: 'Antigüedad', value: session.onset ? labelFor(session.onset) : 'Sin responder' },
    { id: 'row-location', label: 'Localización', value: session.location ? labelFor(session.location) : 'Sin responder' },
    { id: 'row-eva', label: 'Intensidad EVA', value: `${session.eva}/10` },
    {
      id: 'row-char',
      label: 'Carácter',
      value: session.character.length ? session.character.map(labelFor).join(', ') : 'Sin especificar',
    },
    {
      id: 'row-acc',
      label: 'Acompañantes',
      value: session.accompanying.length ? session.accompanying.map(labelFor).join(', ') : 'Ninguno referido',
    },
    {
      id: 'row-trg',
      label: 'Desencadenantes',
      value: session.triggers.length ? session.triggers.map(labelFor).join(', ') : 'Sin especificar',
    },
  ];

  return (
    <section className="print-card rounded-3xl border border-border bg-card p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-extrabold text-foreground">Anamnesis registrada (ALICIA)</h2>
      </div>
      <dl className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.id} className="py-2.5 grid grid-cols-5 gap-3">
            <dt className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pt-0.5">{r.label}</dt>
            <dd className="col-span-3 text-sm font-semibold text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}