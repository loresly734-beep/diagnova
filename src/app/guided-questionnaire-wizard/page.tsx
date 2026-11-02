import React from 'react';
import AppLayout from '@/components/AppLayout';
import WizardShell from '@/app/guided-questionnaire-wizard/components/WizardShell';

export default function GuidedQuestionnaireWizardPage() {
  return (
    <AppLayout>
      <WizardShell />
    </AppLayout>
  );
}