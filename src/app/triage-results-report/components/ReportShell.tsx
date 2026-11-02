'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  SessionState,
  emptySession,
  SESSION_KEY,
  scoreConditions,
  overallTriage,
} from '@/lib/clinicalData';
import ReportActions from '@/app/triage-results-report/components/ReportActions';
import TriageBanner from '@/app/triage-results-report/components/TriageBanner';
import DifferentialList from '@/app/triage-results-report/components/DifferentialList';
import ChartsRow from '@/app/triage-results-report/components/ChartsRow';
import FirstAidPanel from '@/app/triage-results-report/components/FirstAidPanel';
import SpecialtyPanel from '@/app/triage-results-report/components/SpecialtyPanel';
import AnswersSummary from '@/app/triage-results-report/components/AnswersSummary';
import Disclaimer from '@/app/triage-results-report/components/Disclaimer';
import EmptyState from '@/components/ui/EmptyState';

export default function ReportShell() {
  const [session, setSession] = useState<SessionState>(emptySession);
  const [loaded, setLoaded] = useState(false);
  const [stamp, setStamp] = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setSession({ ...emptySession, ...JSON.parse(raw) });
      } catch {
        setSession(emptySession);
      }
    }
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    setStamp(`${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`);
    setLoaded(true);
  }, []);

  const ranked = useMemo(() => scoreConditions(session), [session]);
  const triage = useMemo(() => overallTriage(ranked, session), [ranked, session]);

  if (!loaded) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true">
        <div className="animate-pulse bg-muted rounded-3xl h-56 w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="animate-pulse bg-muted rounded-3xl h-96 xl:col-span-2" />
          <div className="animate-pulse bg-muted rounded-3xl h-96" />
        </div>
      </div>
    );
  }

  if (ranked.length === 0) {
    return (
      <EmptyState
        title="Aún no hay datos para generar el informe"
        description="Completa el cuestionario guiado y generaremos tu informe de triaje y sospechas diagnósticas."
        ctaLabel="Iniciar evaluación"
        ctaHref="/guided-questionnaire-wizard"
      />
    );
  }

  const lead = ranked[0];

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <ReportActions stamp={stamp} entry={session.entry} />
      <TriageBanner triage={triage} lead={lead} eva={session.eva} stamp={stamp} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="xl:col-span-2 flex flex-col gap-6 lg:gap-8">
          <DifferentialList ranked={ranked} />
          <ChartsRow ranked={ranked} />
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          <FirstAidPanel lead={lead} />
          <SpecialtyPanel ranked={ranked} />
          <AnswersSummary session={session} />
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}