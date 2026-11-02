import React from 'react';
import { Check } from 'lucide-react';

interface StepDef {
  id: string;
  short: string;
  title: string;
}

interface StepRailProps {
  steps: StepDef[];
  current: number;
}

export default function StepRail({ steps, current }: StepRailProps) {
  return (
    <ol className="mt-5 flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex items-center gap-1.5 shrink-0">
            <div
              className={`flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border transition-all duration-150 ${
                active
                  ? 'bg-primary/10 border-primary text-primary'
                  : done
                  ? 'bg-success/10 border-success/30 text-success' :'bg-background border-border text-muted-foreground'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : done
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : s.short}
              </span>
              <span className="hidden md:inline text-xs font-bold whitespace-nowrap">{s.title}</span>
            </div>
            {i < steps.length - 1 && <span className="w-3 h-px bg-border" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}