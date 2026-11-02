'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, HeartPulse, ClipboardList, FileText, Home } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { id: 'nav-home', label: 'Inicio', href: '/', icon: Home },
  { id: 'nav-wizard', label: 'Cuestionario', href: '/guided-questionnaire-wizard', icon: ClipboardList },
  { id: 'nav-report', label: 'Informe', href: '/triage-results-report', icon: FileText },
  { id: 'nav-alert', label: 'Emergencia', href: '/emergency-red-flag-alert', icon: HeartPulse },
];

export default function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DiagNova inicio">
          <AppLogo size={40} />
          <span className="text-lg font-extrabold tracking-tight text-foreground">DiagNova</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navItems?.map((item) => {
            const active = pathname === item?.href;
            const Icon = item?.icon;
            const isEmergency = item?.href === '/emergency-red-flag-alert';
            return (
              <Link
                key={item?.id}
                href={item?.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 btn-press ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : isEmergency
                    ? 'text-destructive hover:bg-destructive/10' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item?.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold hover:opacity-90 transition-all duration-150 btn-press"
          >
            <Phone className="w-4 h-4" />
            Llamar 112
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-border bg-card transition-all duration-300 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {navItems?.map((item) => {
            const Icon = item?.icon;
            const active = pathname === item?.href;
            return (
              <Link
                key={`m-${item?.id}`}
                href={item?.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold ${
                  active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item?.label}
              </Link>
            );
          })}
          <a
            href="tel:112"
            className="mt-2 flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold"
          >
            <Phone className="w-4 h-4" />
            Llamar 112
          </a>
        </div>
      </div>
    </header>
  );
}