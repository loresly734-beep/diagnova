import React from 'react';

type Tone = 'green' | 'yellow' | 'red' | 'neutral' | 'primary';

const toneClass: Record<Tone, string> = {
  green: 'bg-success/10 text-success',
  yellow: 'bg-warning/10 text-warning',
  red: 'bg-destructive/10 text-destructive',
  neutral: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/10 text-primary',
};

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ tone = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}