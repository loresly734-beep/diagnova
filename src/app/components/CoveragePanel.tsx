import React from 'react';
import { Bone, Utensils, Wind, HeartPulse, Brain, Fingerprint, Droplets } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/ui/AppIcon';


const modules = [
  { id: 'mod-msk', name: 'Musculoesquelético', icon: Bone, items: 'Tendinopatías, esguinces, hernias discales, artrosis, fracturas', count: 24 },
  { id: 'mod-gi', name: 'Gastrointestinal', icon: Utensils, items: 'Apendicitis, gastritis, reflujo, gastroenteritis, cólico biliar', count: 21 },
  { id: 'mod-resp', name: 'Respiratorio / Infeccioso', icon: Wind, items: 'COVID-19, gripe, neumonía, bronquitis, amigdalitis', count: 26 },
  { id: 'mod-cv', name: 'Cardiovascular', icon: HeartPulse, items: 'Angina / IAM, crisis hipertensiva, arritmias', count: 14 },
  { id: 'mod-neuro', name: 'Neurológico', icon: Brain, items: 'Cefalea tensional, migraña, vértigo paroxístico, neuralgia', count: 18 },
  { id: 'mod-derm', name: 'Dermatológico', icon: Fingerprint, items: 'Dermatitis, úlceras por presión, micosis, urticaria', count: 16 },
  { id: 'mod-gu', name: 'Genitourinario', icon: Droplets, items: 'ITU, cólico renal, prostatitis', count: 12 },
];

export default function CoveragePanel() {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Cobertura clínica</h2>
          <p className="text-sm text-muted-foreground mt-1">7 módulos ampliables con matriz de ponderación.</p>
        </div>
        <Badge tone="primary">131 condiciones</Badge>
      </div>
      <ul className="divide-y divide-border">
        {modules?.map((m) => {
          const Icon = m?.icon;
          return (
            <li key={m?.id} className="py-3.5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-foreground">{m?.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{m?.items}</p>
              </div>
              <span className="text-xs font-bold text-primary tabular shrink-0">{m?.count}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}