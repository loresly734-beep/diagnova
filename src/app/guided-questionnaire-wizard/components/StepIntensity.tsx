import React from 'react';
import { Gauge } from 'lucide-react';
import { evaFaces } from '@/lib/clinicalData';

interface StepIntensityProps {
  value: number;
  onChange: (v: number) => void;
}

function tone(v: number): { label: string; cls: string } {
  if (v <= 3) return { label: 'Leve', cls: 'text-success' };
  if (v <= 6) return { label: 'Moderado', cls: 'text-warning' };
  if (v <= 8) return { label: 'Intenso', cls: 'text-destructive' };
  return { label: 'Insoportable', cls: 'text-destructive' };
}

export default function StepIntensity({ value, onChange }: StepIntensityProps) {
  const t = tone(value);
  const pct = ((value - 1) / 9) * 100;

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">¿Qué tan intenso es? (Escala EVA)</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-8">1 es una molestia mínima, 10 es el peor dolor imaginable.</p>

      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-2">
          <span className={`text-7xl font-extrabold tabular ${t.cls}`}>{value}</span>
          <span className="text-2xl font-bold text-muted-foreground">/10</span>
        </div>
        <span className={`mt-1 text-sm font-extrabold uppercase tracking-wider ${t.cls}`}>{t.label}</span>
      </div>

      <div className="mt-8 px-1">
        <div className="relative h-3 rounded-full bg-muted">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Intensidad del dolor, escala EVA"
          className="w-full -mt-3 h-6 appearance-none bg-transparent cursor-pointer accent-primary opacity-0 relative z-10"
        />
        <div className="flex justify-between mt-1 text-xs font-bold text-muted-foreground tabular">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={`tick-${i + 1}`} className={value === i + 1 ? 'text-primary' : ''}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-2">
        {evaFaces.map((f) => {
          const on = Math.abs(value - f.value) <= 1;
          return (
            <button
              key={`face-${f.value}`}
              type="button"
              onClick={() => onChange(f.value)}
              className={`rounded-xl border py-3 text-center transition-all duration-150 btn-press ${
                on ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary'
              }`}
            >
              <span className="block text-lg font-extrabold text-foreground tabular">{f.value}</span>
              <span className="block text-[11px] font-bold text-muted-foreground">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}