import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import AppImage from '@/components/ui/AppImage';
import EmptyState from '@/components/ui/EmptyState';
import { SessionState, scoreConditions, labelFor, selectedIds } from '@/lib/clinicalData';

interface LiveDifferentialProps {
  session: SessionState;
}

export default function LiveDifferential({ session }: LiveDifferentialProps) {
  const ranked = scoreConditions(session).slice(0, 4);
  const ids = selectedIds(session);

  return (
    <div className="holo-panel rounded-3xl p-5 sm:p-6 xl:sticky xl:top-24 text-slate-100">
      <div className="flex items-center gap-2 mb-1">
        <Activity className="w-4 h-4 text-cyan-300" />
        <h2 className="text-base font-extrabold text-white">Hipótesis en vivo</h2>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
          Analizando
        </span>
      </div>
      <p className="text-xs text-slate-400">Se recalcula con cada respuesta. No es un diagnóstico.</p>

      <div className="mt-4">
        {ranked.length === 0 ? (
          <EmptyState
            title="Aún sin hipótesis"
            description="Responde los primeros pasos y verás las sospechas más probables aquí."
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {ranked.map((c, i) => (
              <li key={`live-${c.id}`} className="rounded-2xl bg-[#050f1c]/70 border border-cyan-400/20 p-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-cyan-400/30">
                    <AppImage
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-extrabold text-white truncate">
                        <span className="text-cyan-300/70 tabular mr-1.5">{i + 1}.</span>
                        {c.name}
                      </p>
                      <span className="text-sm font-extrabold holo-text tabular shrink-0">{c.percent}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{c.module} · {c.icd10}</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-300 ease-out"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {ids.length > 0 && (
        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/80 mb-2">Respuestas registradas</p>
          <div className="flex flex-wrap gap-1.5">
            {ids.slice(0, 8).map((id) => (
              <span
                key={`ans-${id}`}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-100 border border-cyan-400/25"
              >
                {labelFor(id)}
              </span>
            ))}
            {ids.length > 8 && <Badge tone="primary">+{ids.length - 8}</Badge>}
          </div>
        </div>
      )}

      <div className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/30 p-3">
        <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-200 font-semibold">
          Cada respuesta se compara con 5 signos de alarma vitales.
        </p>
      </div>
    </div>
  );
}