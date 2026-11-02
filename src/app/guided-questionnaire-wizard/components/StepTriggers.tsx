import React from 'react';
import { Zap } from 'lucide-react';
import OptionCard from '@/app/guided-questionnaire-wizard/components/OptionCard';
import { triggerOptions } from '@/lib/clinicalData';

interface StepTriggersProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function StepTriggers({ selected, onToggle }: StepTriggersProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">¿Qué lo desencadena o lo empeora?</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Último paso. Con esto generaremos tu informe y la lista de sospechas diagnósticas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {triggerOptions.map((o) => (
          <OptionCard
            key={`trg-${o.id}`}
            label={o.label}
            hint={o.hint}
            selected={selected.includes(o.id)}
            onClick={() => onToggle(o.id)}
            variant="check"
          />
        ))}
      </div>
    </div>
  );
}