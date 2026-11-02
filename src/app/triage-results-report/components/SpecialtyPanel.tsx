import React from 'react';
import { Stethoscope } from 'lucide-react';
import { ScoredCondition } from '@/lib/clinicalData';

interface SpecialtyPanelProps {
  ranked: ScoredCondition[];
}

export default function SpecialtyPanel({ ranked }: SpecialtyPanelProps) {
  const unique = Array.from(new Map(ranked.map((c) => [c.specialty, c])).values());
  const [primary, ...rest] = unique;

  return (
    <section className="print-card holo-panel rounded-3xl p-6 sm:p-7 text-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Stethoscope className="w-5 h-5 text-cyan-300" />
        <h2 className="text-lg font-extrabold text-white">Especialidad recomendada</h2>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/25 to-teal-400/15 border border-cyan-300/40 p-5 holo-glow">
        <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200">Derivación principal</p>
        <p className="mt-1 text-xl font-extrabold text-white">{primary.specialty}</p>
        <p className="text-xs font-semibold text-cyan-100/90 mt-1">Para valorar: {primary.name}</p>
      </div>

      {rest.length > 0 && (
        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/80 mb-2">Alternativas</p>
          <div className="flex flex-col gap-2">
            {rest.map((r) => (
              <div
                key={`spec-${r.id}`}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#050f1c]/70 border border-cyan-400/20 px-3.5 py-2.5"
              >
                <span className="text-sm font-bold text-slate-100">{r.specialty}</span>
                <span className="text-xs font-bold text-cyan-200 tabular">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}