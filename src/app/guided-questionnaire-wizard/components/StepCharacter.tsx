import React from 'react';
import { Waves } from 'lucide-react';
import OptionCard from '@/app/guided-questionnaire-wizard/components/OptionCard';
import { characterOptions } from '@/lib/clinicalData';

interface StepCharacterProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function StepCharacter({ selected, onToggle }: StepCharacterProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Waves className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">¿Cómo describirías la sensación?</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Puedes marcar más de una. Si no estás seguro, continúa sin seleccionar.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {characterOptions.map((o) => (
          <OptionCard
            key={`char-${o.id}`}
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