import React from 'react';
import { ClipboardList } from 'lucide-react';

const info = [
  { id: 'info-1', label: 'Tu ubicación exacta', value: 'Dirección, piso, referencias' },
  { id: 'info-2', label: 'Qué está pasando', value: 'Síntoma principal y desde cuándo' },
  { id: 'info-3', label: 'Estado de conciencia', value: 'Responde, confuso o inconsciente' },
  { id: 'info-4', label: 'Alergias y medicación', value: 'Anticoagulantes, insulina, otros' },
  { id: 'info-5', label: 'Antecedentes', value: 'Cardiopatía, diabetes, hipertensión' },
];

export default function DispatcherInfo() {
  return (
    <section className="rounded-3xl bg-destructive-foreground text-destructive p-6">
      <div className="flex items-center gap-2 mb-1">
        <ClipboardList className="w-5 h-5" />
        <h2 className="text-lg font-extrabold">Qué decirle al operador</h2>
      </div>
      <p className="text-xs font-semibold opacity-80 mb-4">Responde con calma y no cuelgues hasta que te lo indique.</p>
      <ul className="flex flex-col divide-y divide-destructive/20">
        {info?.map((i) => (
          <li key={i?.id} className="py-2.5">
            <p className="text-sm font-extrabold">{i?.label}</p>
            <p className="text-xs font-semibold opacity-80">{i?.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}