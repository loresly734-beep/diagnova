import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import OptionCard from '@/app/guided-questionnaire-wizard/components/OptionCard';
import { onsetOptions, locationOptions } from '@/lib/clinicalData';
import Icon from '@/components/ui/AppIcon';


interface StepOnsetLocationProps {
  mode: 'onset' | 'location';
  value?: string;
  onSelect: (id: string) => void;
}

export default function StepOnsetLocation({ mode, value, onSelect }: StepOnsetLocationProps) {
  const isOnset = mode === 'onset';
  const options = isOnset ? onsetOptions : locationOptions;
  const Icon = isOnset ? Clock : MapPin;

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
          {isOnset ? '¿Cuándo empezó?' : '¿Dónde lo sientes y hacia dónde se extiende?'}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {isOnset
          ? 'La antigüedad distingue un cuadro agudo de uno crónico. Elige una opción.'
          : 'Indica si el dolor está localizado, difuso o se irradia. Elige una opción.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => (
          <OptionCard
            key={`opt-${o.id}`}
            label={o.label}
            hint={o.hint}
            selected={value === o.id}
            onClick={() => onSelect(o.id)}
            variant="radio"
          />
        ))}
      </div>
    </div>
  );
}