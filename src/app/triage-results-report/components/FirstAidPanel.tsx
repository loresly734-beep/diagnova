import React from 'react';
import { HeartHandshake, Droplets, BedDouble, Snowflake } from 'lucide-react';
import { ScoredCondition } from '@/lib/clinicalData';
import Icon from '@/components/ui/AppIcon';


interface FirstAidPanelProps {
  lead: ScoredCondition;
}

const quick = [
  { id: 'qa-1', icon: BedDouble, label: 'Reposo relativo' },
  { id: 'qa-2', icon: Droplets, label: 'Hidratación' },
  { id: 'qa-3', icon: Snowflake, label: 'Agentes físicos' },
];

export default function FirstAidPanel({ lead }: FirstAidPanelProps) {
  return (
    <section className="print-card holo-panel rounded-3xl p-6 sm:p-7 text-slate-100">
      <div className="flex items-center gap-2 mb-1">
        <HeartHandshake className="w-5 h-5 text-cyan-300" />
        <h2 className="text-lg font-extrabold text-white">Primeros auxilios y recomendaciones</h2>
      </div>
      <p className="text-xs text-slate-400 mb-4">Medidas seguras mientras recibes atención. Basadas en: {lead.name}.</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {quick.map((q) => {
          const Icon = q.icon;
          return (
            <div key={q.id} className="rounded-xl bg-cyan-400/10 border border-cyan-400/25 p-3 text-center">
              <Icon className="w-5 h-5 text-cyan-300 mx-auto" />
              <p className="mt-1 text-[11px] font-bold text-cyan-100">{q.label}</p>
            </div>
          );
        })}
      </div>

      <ul className="flex flex-col gap-2.5">
        {lead.firstAid.map((step, i) => (
          <li key={`aid-${lead.id}-${i + 1}`} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyan-400/15 border border-cyan-300/40 text-cyan-200 flex items-center justify-center text-xs font-extrabold tabular shrink-0">
              {i + 1}
            </span>
            <span className="text-sm text-slate-100 font-medium">{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}