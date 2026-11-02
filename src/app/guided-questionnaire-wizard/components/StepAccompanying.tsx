import React from 'react';
import { Stethoscope, ShieldAlert } from 'lucide-react';
import OptionCard from '@/app/guided-questionnaire-wizard/components/OptionCard';
import { accompanyingOptions } from '@/lib/clinicalData';

interface StepAccompanyingProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function StepAccompanying({ selected, onToggle }: StepAccompanyingProps) {
  const common = accompanyingOptions.filter((o) => !o.redFlag);
  const flags = accompanyingOptions.filter((o) => o.redFlag);

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Stethoscope className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">¿Qué otros síntomas tienes?</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Marca todos los que apliquen.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {common.map((o) => (
          <OptionCard
            key={`acc-${o.id}`}
            label={o.label}
            hint={o.hint}
            selected={selected.includes(o.id)}
            onClick={() => onToggle(o.id)}
            variant="check"
          />
        ))}
      </div>

      <div className="mt-7 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-extrabold text-destructive">Signos de alarma</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Si seleccionas alguno, la evaluación se interrumpirá y te indicaremos acudir a urgencias.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {flags.map((o) => (
            <OptionCard
              key={`flag-${o.id}`}
              label={o.label}
              hint={o.hint}
              selected={selected.includes(o.id)}
              onClick={() => onToggle(o.id)}
              variant="check"
              danger
            />
          ))}
        </div>
      </div>
    </div>
  );
}