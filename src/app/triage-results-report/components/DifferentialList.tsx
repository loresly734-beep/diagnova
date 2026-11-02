'use client';

import React, { useState } from 'react';
import {
  ListOrdered,
  Lightbulb,
  ChevronDown,
  ScanLine,
  ShieldAlert,
  ClipboardList,
  TrendingUp,
  Crosshair,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import AppImage from '@/components/ui/AppImage';
import { ScoredCondition, labelFor } from '@/lib/clinicalData';

interface DifferentialListProps {
  ranked: ScoredCondition[];
}

const triageTone = { green: 'green', yellow: 'yellow', red: 'red' } as const;
const triageText = { green: 'Verde', yellow: 'Amarillo', red: 'Rojo' } as const;
const triageGlow = {
  green: 'text-emerald-300 border-emerald-400/50 bg-emerald-400/10',
  yellow: 'text-amber-300 border-amber-400/50 bg-amber-400/10',
  red: 'text-red-300 border-red-400/60 bg-red-500/15',
} as const;

export default function DifferentialList({ ranked }: DifferentialListProps) {
  const [openId, setOpenId] = useState<string>(ranked?.[0]?.id ?? '');

  return (
    <section className="print-card rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-extrabold text-foreground">Sospechas diagnósticas jerarquizadas</h2>
        </div>
        <Badge tone="primary">{ranked.length} hipótesis</Badge>
      </div>

      <ol className="flex flex-col gap-5">
        {ranked?.map?.((c, i) => {
          const isOpen = openId === c.id;
          return (
            <li key={`diff-${c.id}`} className="holo-panel rounded-2xl overflow-hidden text-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
                <div className="relative h-48 md:h-auto md:min-h-[220px] overflow-hidden bg-[#050f1c]">
                  <AppImage
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 220px"
                    className="object-cover opacity-95"
                  />
                  <div className="absolute inset-0 holo-grid pointer-events-none" aria-hidden="true" />
                  <div className="scan-line" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07182a]/85 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  <span className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-cyan-400/20 border border-cyan-300/60 text-cyan-100 flex items-center justify-center text-sm font-extrabold tabular backdrop-blur-sm">
                    {i + 1}
                  </span>
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200">
                    <ScanLine className="w-3.5 h-3.5" />
                    CIE-10 · {c.icd10}
                  </span>
                </div>

                <div className="p-5 sm:p-6 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">{c.module}</p>
                      <h3 className="text-xl font-extrabold text-white mt-0.5">{c.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${triageGlow[c.triage]}`}>
                          Triaje {triageText[c.triage]}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border border-cyan-400/30 text-cyan-200 bg-cyan-400/10">
                          {c.specialty}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-extrabold holo-text tabular leading-none">{c.percent}%</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200/70 mt-1">coincidencia</p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-300 ease-out"
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>

                  <p className="mt-4 text-sm text-slate-300">{c.summary}</p>

                  <div className="mt-3 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-100">
                      <span className="font-extrabold text-white">Justificación clínica: </span>
                      {c.rationale}
                    </p>
                  </div>

                  {c.evidence.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300/80 mb-1.5">
                        Respuestas que respaldan esta sospecha
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.evidence.map((id) => (
                          <span
                            key={`ev-${c.id}-${id}`}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-100 border border-cyan-400/25"
                          >
                            {labelFor(id)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? '' : c.id)}
                    aria-expanded={isOpen}
                    className="no-print btn-press mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-400/20 transition-colors duration-200"
                  >
                    {isOpen ? 'Ocultar ficha clínica' : 'Ver ficha clínica completa'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-cyan-400/20 bg-[#050f1c]/60 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-300 mb-2">
                      <Crosshair className="w-3.5 h-3.5" />
                      Hallazgos clave
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {c.keyFindings.map((f, k) => (
                        <li key={`kf-${c.id}-${k + 1}`} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-red-300 mb-2">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Signos de alarma
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {c.warningSigns.map((w, k) => (
                        <li key={`ws-${c.id}-${k + 1}`} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-300 mb-2">
                      <ClipboardList className="w-3.5 h-3.5" />
                      Pruebas que podría solicitar el médico
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {c.suggestedTests.map((t, k) => (
                        <li key={`st-${c.id}-${k + 1}`} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-300 mb-2">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Pronóstico orientativo
                    </p>
                    <p className="text-sm text-slate-200">{c.prognosis}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}