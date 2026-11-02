import React from 'react';
import { ScoredCondition } from '@/lib/clinicalData';
import MatchRadial from '@/app/triage-results-report/components/MatchRadial';
import EvidenceBars from '@/app/triage-results-report/components/EvidenceBars';

interface ChartsRowProps {
  ranked: ScoredCondition[];
}

export default function ChartsRow({ ranked }: ChartsRowProps) {
  const lead = ranked[0];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <section className="print-card rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-base font-extrabold text-foreground">Coincidencia de la sospecha principal</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Porcentaje relativo dentro del diferencial.</p>
        <MatchRadial name={lead.name} percent={lead.percent} />
      </section>
      <section className="print-card rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-base font-extrabold text-foreground">Peso de evidencia por condición</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Puntaje acumulado de la matriz de ponderación.</p>
        <EvidenceBars
          data={ranked.map((c) => ({ id: c.id, name: c.name.split(' / ')[0], score: Math.round(c.score * 10) / 10 }))}
        />
      </section>
    </div>
  );
}