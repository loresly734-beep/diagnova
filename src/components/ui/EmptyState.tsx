import React from 'react';
import Link from 'next/link';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({ title, description, ctaLabel, ctaHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-6 rounded-lg border border-dashed border-border bg-card">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <SearchX className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-4 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold btn-press hover:opacity-90 transition-all duration-150"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}