'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Printer, FileDown, RotateCcw, Check, Loader2 } from 'lucide-react';

interface ReportActionsProps {
  stamp: string;
  entry: string;
}

export default function ReportActions({ stamp, entry }: ReportActionsProps) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const exportPdf = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setDone(true);
      window.print();
      setTimeout(() => setDone(false), 2500);
    }, 600);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Informe de triaje DiagNova</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          Resultado: {entry || 'evaluación general'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 tabular">Generado el {stamp} · Folio DN-{stamp.replace(/\D/g, '').slice(0, 8)}</p>
      </div>
      <div className="no-print flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:bg-muted transition-all duration-150 btn-press"
        >
          <RotateCcw className="w-4 h-4" />
          Nueva evaluación
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:bg-muted transition-all duration-150 btn-press"
        >
          <Printer className="w-4 h-4" />
          Imprimir resumen
        </button>
        <button
          type="button"
          onClick={exportPdf}
          disabled={exporting}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold hover:opacity-90 disabled:opacity-60 transition-all duration-150 btn-press min-w-[12.5rem]"
        >
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Preparando…
            </>
          ) : done ? (
            <>
              <Check className="w-4 h-4" />
              Listo
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" />
              Exportar informe en PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}