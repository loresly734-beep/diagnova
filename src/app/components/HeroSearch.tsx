'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, X, Sparkles } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import {
  symptomIndex,
  commonComplaints,
  bodySystems,
  SESSION_KEY,
  emptySession,
} from '@/lib/clinicalData';

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return symptomIndex
      .filter((s) => s.label.toLowerCase().includes(q) || s.hint.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  const startSession = (entry: string, systemId?: string) => {
    const session = { ...emptySession, entry, system: systemId };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    router.push('/guided-questionnaire-wizard');
  };

  const systemLabel = (id: string) => bodySystems.find((b) => b.id === id)?.label ?? '';

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 lg:p-14">
      <div className="blob-primary absolute -top-16 -right-16 w-96 h-96 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-3xl">
        <Badge tone="primary" className="mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Triaje adaptativo · 4 minutos
        </Badge>
        <h1 className="text-hero-xl font-extrabold text-foreground">
          Cuéntanos qué sientes. Te orientamos al nivel de atención correcto.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl">
          DiagNova aplica una anamnesis estructurada ALICIA, vigila banderas rojas en cada paso y entrega un informe de sospechas diagnósticas listo para tu médico.
        </p>

        <div className="relative mt-8">
          <label htmlFor="symptom-search" className="sr-only">
            Buscar síntoma
          </label>
          <div
            className={`flex items-center gap-3 rounded-2xl border bg-background px-4 py-3.5 transition-all duration-150 ${
              focused ? 'border-primary ring-4 ring-primary/15' : 'border-input'
            }`}
          >
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              id="symptom-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Ej. dolor de cabeza, fiebre, esguince…"
              className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-md text-muted-foreground hover:bg-muted"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {focused && query.trim() !== '' && (
            <div className="absolute z-20 left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-xl overflow-hidden fade-in-up">
              {results.length > 0 ? (
                <ul role="listbox">
                  {results.map((r) => (
                    <li key={`res-${r.id}`}>
                      <button
                        type="button"
                        onMouseDown={() => startSession(r.label, r.system)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted transition-colors"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-foreground truncate">{r.label}</span>
                          <span className="block text-xs text-muted-foreground truncate">{r.hint}</span>
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <Badge tone="neutral">{systemLabel(r.system)}</Badge>
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-5 text-sm text-muted-foreground">
                  Sin coincidencias para «{query}». Prueba con un sistema anatómico más abajo o inicia una evaluación general.
                  <button
                    type="button"
                    onMouseDown={() => startSession(query)}
                    className="ml-1 font-bold text-primary hover:underline"
                  >
                    Evaluar «{query}»
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Frecuentes</span>
          {commonComplaints.map((c) => (
            <button
              key={`chip-${c}`}
              type="button"
              onClick={() => startSession(c)}
              className="px-3.5 py-1.5 rounded-full border border-border bg-background text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-150 btn-press"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}