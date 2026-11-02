'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Loader2 } from 'lucide-react';
import {
  SessionState,
  emptySession,
  SESSION_KEY,
  hasRedFlag,
  selectedIds,
} from '@/lib/clinicalData';
import StepRail from '@/app/guided-questionnaire-wizard/components/StepRail';
import StepOnsetLocation from '@/app/guided-questionnaire-wizard/components/StepOnsetLocation';
import StepIntensity from '@/app/guided-questionnaire-wizard/components/StepIntensity';
import StepCharacter from '@/app/guided-questionnaire-wizard/components/StepCharacter';
import StepAccompanying from '@/app/guided-questionnaire-wizard/components/StepAccompanying';
import StepTriggers from '@/app/guided-questionnaire-wizard/components/StepTriggers';
import LiveDifferential from '@/app/guided-questionnaire-wizard/components/LiveDifferential';

const steps = [
  { id: 'step-onset', short: 'A', title: 'Antigüedad e inicio' },
  { id: 'step-location', short: 'L', title: 'Localización' },
  { id: 'step-intensity', short: 'I', title: 'Intensidad (EVA)' },
  { id: 'step-character', short: 'C', title: 'Carácter' },
  { id: 'step-accompanying', short: 'A', title: 'Síntomas acompañantes' },
  { id: 'step-triggers', short: 'I', title: 'Desencadenantes' },
];

export default function WizardShell() {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>(emptySession);
  const [step, setStep] = useState(0);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setSession({ ...emptySession, ...JSON.parse(raw) });
      } catch {
        setSession(emptySession);
      }
    }
  }, []);

  const persist = (next: SessionState) => {
    setSession(next);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
  };

  const toggleMulti = (key: 'character' | 'accompanying' | 'triggers', id: string) => {
    const current = session[key];
    const nextList = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    const next = { ...session, [key]: nextList };
    persist(next);
    // Live red-flag interception
    if (key === 'accompanying') {
      const flag = hasRedFlag(nextList);
      if (flag) {
        sessionStorage.setItem('diagnova-redflag', flag.label);
        router.push('/emergency-red-flag-alert');
      }
    }
  };

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!session.onset;
      case 1:
        return !!session.location;
      default:
        return true;
    }
  }, [step, session.onset, session.location]);

  const progress = Math.round(((step + 1) / steps.length) * 100);
  const isLast = step === steps.length - 1;

  const next = () => {
    if (!canAdvance) return;
    if (isLast) {
      setFinishing(true);
      setTimeout(() => router.push('/triage-results-report'), 700);
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) {
      router.push('/');
      return;
    }
    setStep((s) => s - 1);
  };

  const answered = selectedIds(session).length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
      <div className="xl:col-span-2 flex flex-col gap-5">
        <header className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Evaluación en curso</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground truncate">
                {session.entry ? session.entry : 'Evaluación general'}
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-success/10 text-success px-3 py-1.5 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Vigilancia de banderas rojas activa
            </div>
          </div>

          <div className="mt-5" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-2">
              <span>
                Paso {step + 1} de {steps.length}
              </span>
              <span className="tabular">{progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <StepRail steps={steps} current={step} />
        </header>

        <section className="rounded-3xl border border-border bg-card p-5 sm:p-8 min-h-[26rem] fade-in-up" key={`panel-${step}`}>
          {step === 0 && (
            <StepOnsetLocation
              mode="onset"
              value={session.onset}
              onSelect={(id) => persist({ ...session, onset: id })}
            />
          )}
          {step === 1 && (
            <StepOnsetLocation
              mode="location"
              value={session.location}
              onSelect={(id) => persist({ ...session, location: id })}
            />
          )}
          {step === 2 && <StepIntensity value={session.eva} onChange={(v) => persist({ ...session, eva: v })} />}
          {step === 3 && (
            <StepCharacter selected={session.character} onToggle={(id) => toggleMulti('character', id)} />
          )}
          {step === 4 && (
            <StepAccompanying selected={session.accompanying} onToggle={(id) => toggleMulti('accompanying', id)} />
          )}
          {step === 5 && (
            <StepTriggers selected={session.triggers} onToggle={(id) => toggleMulti('triggers', id)} />
          )}
        </section>

        <div className="flex items-center justify-between gap-3 sticky bottom-3 z-10">
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-card text-sm font-extrabold text-foreground hover:bg-muted transition-all duration-150 btn-press"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? 'Inicio' : 'Atrás'}
          </button>
          <div className="hidden sm:block text-xs font-semibold text-muted-foreground tabular">{answered} respuestas registradas</div>
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance || finishing}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 btn-press min-w-[10.5rem] justify-center"
          >
            {finishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analizando…
              </>
            ) : isLast ? (
              <>
                Generar informe
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <aside className="xl:col-span-1">
        <LiveDifferential session={session} />
      </aside>
    </div>
  );
}