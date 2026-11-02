'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { bodyZones, bodySystems, SESSION_KEY, emptySession } from '@/lib/clinicalData';

export default function BodyZoneMap() {
  const router = useRouter();
  const [active, setActive] = useState<string>('zone-abdomen');
  const current = bodyZones?.find((z) => z?.id === active) ?? bodyZones?.[0];
  const system = bodySystems?.find((s) => s?.id === current?.system);

  const go = () => {
    const session = { ...emptySession, entry: current?.label, system: current?.system };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    router?.push('/guided-questionnaire-wizard');
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <MapPin className="w-4 h-4 text-primary" />
        <h2 className="text-lg font-extrabold text-foreground">Mapa corporal</h2>
      </div>
      <p className="text-sm text-muted-foreground">Toca la zona afectada.</p>

      <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label="Zonas del cuerpo">
        {bodyZones?.map((z) => {
          const on = z?.id === active;
          return (
            <button
              key={`zone-${z?.id}`}
              type="button"
              onClick={() => setActive(z?.id)}
              aria-pressed={on}
              className={`px-2 py-3 rounded-xl border text-sm font-bold transition-all duration-150 btn-press ${
                on
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground border-border hover:border-primary'
              }`}
            >
              {z?.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl bg-accent p-4 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-accent-foreground">Zona seleccionada</p>
        <p className="mt-1 text-lg font-extrabold text-accent-foreground">{current?.label}</p>
        <p className="text-sm text-accent-foreground mt-0.5">
          Sistema: {system?.label} · {system?.symptomCount} síntomas
        </p>
        <p className="text-xs text-accent-foreground mt-2">
          Módulos: {system?.modules?.join(', ')}
        </p>
      </div>

      <button
        type="button"
        onClick={go}
        className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold hover:opacity-90 transition-all duration-150 btn-press"
      >
        Evaluar {current?.label?.toLowerCase()}
        <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}