'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowLeft, Siren } from 'lucide-react';
import { SESSION_KEY, emptySession, SessionState } from '@/lib/clinicalData';
import ActionSteps from '@/app/emergency-red-flag-alert/components/ActionSteps';
import DispatcherInfo from '@/app/emergency-red-flag-alert/components/DispatcherInfo';
import SessionSnapshot from '@/app/emergency-red-flag-alert/components/SessionSnapshot';

export default function AlertScreen() {
  const [trigger, setTrigger] = useState('Signo de alarma vital detectado');
  const [session, setSession] = useState<SessionState>(emptySession);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const flag = sessionStorage.getItem('diagnova-redflag');
    if (flag) setTrigger(flag);
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setSession({ ...emptySession, ...JSON.parse(raw) });
      } catch {
        setSession(emptySession);
      }
    }
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(elapsed / 60))?.padStart(2, '0');
  const ss = String(elapsed % 60)?.padStart(2, '0');

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 2xl:-mx-16 -my-6 lg:-my-10 min-h-screen bg-destructive text-destructive-foreground relative overflow-hidden">
      <div className="blob-destructive absolute -top-24 -left-24 w-[32rem] h-[32rem] pointer-events-none" aria-hidden="true" />
      <div className="blob-destructive absolute -bottom-32 -right-24 w-[36rem] h-[36rem] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 lg:py-12">
        <div className="flex items-center justify-between gap-3 mb-8">
          <span className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest">
            <Siren className="w-5 h-5" />
            Alerta de urgencia vital
          </span>
          <span className="rounded-full bg-destructive-foreground/15 px-3 py-1.5 text-xs font-bold tabular">
            Tiempo en esta pantalla {mm}:{ss}
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-10 items-start">
          <div className="xl:col-span-2">
            <div className="w-20 h-20 rounded-full bg-destructive-foreground text-destructive flex items-center justify-center pulse-ring">
              <Siren className="w-10 h-10" />
            </div>
            <h1 className="mt-6 text-alert-xl font-extrabold">
              EVACUACIÓN INMEDIATA A URGENCIAS
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-semibold max-w-2xl">
              Detectamos: <span className="underline decoration-2 underline-offset-4">{trigger}</span>. La evaluación se ha detenido porque este signo puede poner en riesgo tu vida.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:112"
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-destructive-foreground text-destructive text-xl font-extrabold hover:opacity-90 transition-all duration-150 btn-press"
              >
                <Phone className="w-6 h-6" />
                Llamar al 112
              </a>
              <a
                href="tel:911"
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border-2 border-destructive-foreground text-destructive-foreground text-xl font-extrabold hover:bg-destructive-foreground/10 transition-all duration-150 btn-press"
              >
                <Phone className="w-6 h-6" />
                Llamar al 911
              </a>
            </div>
            <p className="mt-3 text-sm font-semibold opacity-90">
              También: 060 (España y LatAm según país). No conduzcas tú mismo.
            </p>

            <ActionSteps />
          </div>

          <div className="flex flex-col gap-5">
            <DispatcherInfo />
            <SessionSnapshot session={session} trigger={trigger} />
            <Link
              href="/guided-questionnaire-wizard"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-destructive-foreground/50 text-sm font-bold hover:bg-destructive-foreground/10 transition-all duration-150 btn-press"
            >
              <ArrowLeft className="w-4 h-4" />
              Fue un error, volver al cuestionario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}