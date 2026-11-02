import React from 'react';
import { CheckCircle2, AlertTriangle, Siren, Clock, Gauge, Activity } from 'lucide-react';
import { ScoredCondition, TriageLevel } from '@/lib/clinicalData';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';


interface TriageBannerProps {
  triage: TriageLevel;
  lead: ScoredCondition;
  eva: number;
  stamp: string;
}

const config: Record<
  TriageLevel,
  { title: string; window: string; detail: string; surface: string; chip: string; accent: string; icon: React.ComponentType<{ className?: string }> }
> = {
  green: {
    title: 'TRIAJE VERDE · Manejo en casa',
    window: 'Sin urgencia · seguimiento 3–5 días',
    detail: 'Tus respuestas sugieren un cuadro de baja complejidad. Aplica las medidas de apoyo y consulta si empeora.',
    surface: 'bg-gradient-to-br from-[#052e22] via-[#06402f] to-[#0a4f3a] text-emerald-50 border border-emerald-400/40',
    chip: 'bg-emerald-300/10 border border-emerald-300/30',
    accent: 'text-emerald-300',
    icon: CheckCircle2,
  },
  yellow: {
    title: 'TRIAJE AMARILLO · Consulta médica en 24–48 h',
    window: 'Pide cita en las próximas 24–48 horas',
    detail: 'Hay hallazgos que requieren valoración profesional pronta, aunque no apuntan a una emergencia inmediata.',
    surface: 'bg-gradient-to-br from-[#3a2306] via-[#4d2f08] to-[#633c0a] text-amber-50 border border-amber-400/40',
    chip: 'bg-amber-300/10 border border-amber-300/30',
    accent: 'text-amber-300',
    icon: AlertTriangle,
  },
  red: {
    title: 'TRIAJE ROJO · Acude a urgencias hoy',
    window: 'Atención inmediata recomendada',
    detail: 'El patrón de respuestas es compatible con una condición que no debe esperar. Acude a un servicio de urgencias.',
    surface: 'bg-gradient-to-br from-[#3b0a0a] via-[#560d0d] to-[#6f1111] text-red-50 border border-red-400/50',
    chip: 'bg-red-300/10 border border-red-300/30',
    accent: 'text-red-300',
    icon: Siren,
  },
};

export default function TriageBanner({ triage, lead, eva, stamp }: TriageBannerProps) {
  const c = config[triage];
  const Icon = c.icon;

  return (
    <section className={`print-card relative overflow-hidden rounded-3xl p-6 sm:p-10 ${c.surface}`}>
      <div className="absolute inset-0 holo-grid opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="blob-destructive absolute -top-20 -right-20 w-96 h-96 pointer-events-none" aria-hidden="true" />
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 flex flex-col sm:flex-row items-start gap-5">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-white/30 holo-glow">
            <AppImage src={lead.image} alt={lead.alt} fill sizes="128px" className="object-cover" priority />
            <div className="scan-line" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.chip}`}>
                <Icon className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${c.accent}`}>Informe de triaje · DiagNova</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">{c.title}</h2>
            <p className="mt-2 text-sm sm:text-base font-semibold max-w-2xl opacity-90">{c.detail}</p>
            <p className="mt-3 text-sm font-bold">
              Sospecha principal: <span className="underline underline-offset-4">{lead.name}</span> ({lead.percent}% de coincidencia · CIE-10 {lead.icd10})
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-2xl p-4 ${c.chip}`}>
            <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${c.accent}`}>
              <Clock className="w-3.5 h-3.5" />
              Ventana de atención
            </p>
            <p className="mt-1 text-sm font-extrabold">{c.window}</p>
          </div>
          <div className={`rounded-2xl p-4 ${c.chip}`}>
            <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${c.accent}`}>
              <Gauge className="w-3.5 h-3.5" />
              Intensidad EVA
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular">{eva}/10</p>
          </div>
          <div className={`col-span-2 rounded-2xl p-4 ${c.chip}`}>
            <p className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${c.accent}`}>
              <Activity className="w-3.5 h-3.5" />
              Corte de evaluación
            </p>
            <p className="mt-1 text-sm font-extrabold tabular">{stamp}</p>
          </div>
        </div>
      </div>
    </section>
  );
}