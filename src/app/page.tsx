import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSearch from '@/app/components/HeroSearch';
import SafetyStrip from '@/app/components/SafetyStrip';
import SystemSelector from '@/app/components/SystemSelector';
import BodyZoneMap from '@/app/components/BodyZoneMap';
import CoveragePanel from '@/app/components/CoveragePanel';
import AliciaExplainer from '@/app/components/AliciaExplainer';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8 lg:gap-10">
        <HeroSearch />
        <SafetyStrip />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <SystemSelector />
          </div>
          <BodyZoneMap />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <CoveragePanel />
          <AliciaExplainer />
        </div>
      </div>
    </AppLayout>
  );
}