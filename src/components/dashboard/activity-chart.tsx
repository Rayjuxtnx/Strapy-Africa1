'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', views: 5 },
  { day: 'Tue', views: 8 },
  { day: 'Wed', views: 12 },
  { day: 'Thu', views: 7 },
  { day: 'Fri', views: 15 },
  { day: 'Sat', views: 10 },
  { day: 'Sun', views: 18 },
];

const chartConfig = {
  views: {
    label: 'Page Views',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ActivityChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="views" fill="var(--color-views)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
