import React from 'react';
import AppLayout from '@/components/AppLayout';
import AlertScreen from '@/app/emergency-red-flag-alert/components/AlertScreen';

export default function EmergencyRedFlagAlertPage() {
  return (
    <AppLayout hideChrome>
      <AlertScreen />
    </AppLayout>
  );
}