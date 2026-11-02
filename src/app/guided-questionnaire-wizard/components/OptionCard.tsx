import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

interface OptionCardProps {
  label: string;
  hint?: string;
  selected: boolean;
  onClick: () => void;
  variant: 'radio' | 'check';
  danger?: boolean;
}

export default function OptionCard({ label, hint, selected, onClick, variant, danger = false }: OptionCardProps) {
  const base = 'w-full text-left rounded-2xl border p-4 flex items-start gap-3 transition-all duration-150 btn-press';
  const state = selected
    ? danger
      ? 'border-destructive bg-destructive/10' :'border-primary bg-primary/10'
    : danger
    ? 'border-destructive/30 bg-card hover:border-destructive' :'border-border bg-background hover:border-primary hover:bg-accent/40';

  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={`${base} ${state}`}>
      <span
        className={`mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center border-2 transition-all duration-150 ${
          variant === 'radio' ? 'rounded-full' : 'rounded-md'
        } ${
          selected
            ? danger
              ? 'bg-destructive border-destructive' :'bg-primary border-primary' :'bg-card border-input'
        }`}
      >
        {selected && (
          <Check className={`w-3 h-3 ${danger ? 'text-destructive-foreground' : 'text-primary-foreground'}`} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-foreground">{label}</span>
          {danger && <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />}
        </span>
        {hint && <span className="block text-xs text-muted-foreground mt-0.5">{hint}</span>}
      </span>
    </button>
  );
}