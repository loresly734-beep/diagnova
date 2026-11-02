import React from 'react';
import { ShieldAlert, Phone } from 'lucide-react';
import { redFlagList } from '@/lib/clinicalData';

export default function SafetyStrip() {
  return (
    <section
      className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-5"
      aria-label="Señales de alarma"
    >
      <div className="flex items-start gap-4 lg:max-w-md">
        <div className="w-11 h-11 rounded-xl bg-destructive flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-destructive-foreground" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-foreground">Si presentas alguno de estos signos, no uses la app</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Llama de inmediato a emergencias.</p>
        </div>
      </div>
      <ul className="flex flex-wrap gap-2 flex-1">
        {redFlagList?.map((flag) => (
          <li
            key={`flag-${flag}`}
            className="px-3 py-1.5 rounded-full bg-card border border-destructive/30 text-xs font-bold text-destructive"
          >
            {flag}
          </li>
        ))}
      </ul>
      <a
        href="tel:112"
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-destructive text-destructive-foreground text-sm font-extrabold btn-press hover:opacity-90 transition-all duration-150"
      >
        <Phone className="w-4 h-4" />
        Llamar 112
      </a>
    </section>
  );
}