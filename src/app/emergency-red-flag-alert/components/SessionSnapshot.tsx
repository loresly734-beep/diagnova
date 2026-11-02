import React from 'react';
import { SessionState, labelFor, selectedIds } from '@/lib/clinicalData';

interface SessionSnapshotProps {
  session: SessionState;
  trigger: string;
}

export default function SessionSnapshot({ session, trigger }: SessionSnapshotProps) {
  const ids = selectedIds(session);
  return (
    <section className="rounded-3xl bg-destructive-foreground/10 border border-destructive-foreground/20 p-6">
      <h2 className="text-base font-extrabold mb-3">Resumen de tu sesión</h2>
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="font-semibold opacity-80">Consulta</dt>
          <dd className="font-extrabold text-right">{session.entry || 'Evaluación general'}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-semibold opacity-80">Signo de alarma</dt>
          <dd className="font-extrabold text-right">{trigger}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-semibold opacity-80">Intensidad EVA</dt>
          <dd className="font-extrabold tabular">{session.eva}/10</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="font-semibold opacity-80">Respuestas</dt>
          <dd className="font-extrabold tabular">{ids.length}</dd>
        </div>
      </dl>
      {ids.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {ids.slice(0, 6).map((id) => (
            <span
              key={`snap-${id}`}
              className="px-2.5 py-1 rounded-full bg-destructive-foreground/15 text-xs font-bold"
            >
              {labelFor(id)}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}