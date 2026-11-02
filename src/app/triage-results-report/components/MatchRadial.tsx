'use client';

import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface MatchRadialProps {
  name: string;
  percent: number;
}

export default function MatchRadial({ name, percent }: MatchRadialProps) {
  const data = [{ id: 'match', name, value: percent }];

  return (
    <div className="relative h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="68%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            fill="var(--primary)"
            background={{ fill: 'var(--muted)' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
        <span className="text-5xl font-extrabold text-primary tabular">{percent}%</span>
        <span className="text-xs font-bold text-muted-foreground mt-1 max-w-[9rem]">{name}</span>
      </div>
    </div>
  );
}