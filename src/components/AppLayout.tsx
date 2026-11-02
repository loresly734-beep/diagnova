import React from 'react';
import Topbar from '@/components/Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
  hideChrome?: boolean;
}

export default function AppLayout({ children, hideChrome = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!hideChrome && <Topbar />}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 lg:py-10">
        {children}
      </main>
      {!hideChrome && (
        <footer className="no-print border-t border-border bg-card">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              DiagNova es una herramienta de soporte a la decisión clínica (CDSS). No sustituye la consulta con un profesional de la salud.
            </p>
            <p className="text-xs font-medium text-muted-foreground tabular">Emergencias: 112 · 911 · 060</p>
          </div>
        </footer>
      )}
    </div>
  );
}