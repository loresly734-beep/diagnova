import React from 'react';
import AppLayout from '@/components/AppLayout';
import ReportShell from '@/app/triage-results-report/components/ReportShell';

export default function TriageResultsReportPage() {
  return (
    <AppLayout>
      <ReportShell />
    </AppLayout>
  );
}