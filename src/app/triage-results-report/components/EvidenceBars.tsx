'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface EvidenceDatum {
  id: string;
  name: string;
  score: number;
}

interface EvidenceBarsProps {
  data: EvidenceDatum[];
}

interface TipProps {
  active?: boolean;
  payload?: { payload: EvidenceDatum }[];
}

function CustomTooltip({ active, payload }: TipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-extrabold text-foreground">{d.name}</p>
      <p className="text-xs text-muted-foreground tabular">Peso de evidencia: {d.score}</p>
    </div>
  );
}

export default function EvidenceBars({ data }: EvidenceBarsProps) {
  return (
    <div className="h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)' }} />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={18}>
            {data.map((d, i) => (
              <Cell key={`cell-${d.id}`} fill="var(--primary)" fillOpacity={1 - i * 0.16} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}