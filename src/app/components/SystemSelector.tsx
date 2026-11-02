'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Heart, Activity, Bone, Fingerprint, Zap, Thermometer, ChevronRight } from 'lucide-react';
import { bodySystems, SESSION_KEY, emptySession, SystemId } from '@/lib/clinicalData';
import Icon from '@/components/ui/AppIcon';


const iconMap: Record<SystemId, React.ComponentType<{ className?: string }>> = {
  head: Brain,
  chest: Heart,
  abdomen: Activity,
  limbs: Bone,
  skin: Fingerprint,
  neuro: Zap,
  general: Thermometer,
};

export default function SystemSelector() {
  const router = useRouter();

  const choose = (id: SystemId, label: string) => {
    const session = { ...emptySession, entry: label, system: id };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    router.push('/guided-questionnaire-wizard');
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Explorar por sistema</h2>
          <p className="text-sm text-muted-foreground mt-1">Selecciona la zona donde se concentran tus molestias.</p>
        </div>
        <span className="text-xs font-bold text-muted-foreground tabular">{bodySystems.length} sistemas</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {bodySystems.map((s, i) => {
          const Icon = iconMap[s.id];
          const hero = i === 0;
          return (
            <button
              key={`sys-${s.id}`}
              type="button"
              onClick={() => choose(s.id, s.label)}
              className={`group text-left rounded-2xl border border-border bg-background p-5 hover:border-primary hover:bg-accent/40 hover:-translate-y-0.5 transition-all duration-150 btn-press ${
                hero ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-150">
                  <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-150" />
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
              </div>
              <h3 className="mt-4 text-base font-extrabold text-foreground">{s.label}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{s.region}</p>
              <p className="mt-3 text-xs font-bold text-primary tabular">{s.symptomCount} síntomas indexados</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}