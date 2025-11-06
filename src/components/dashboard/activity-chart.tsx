'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { format, startOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

type Activity = {
  type: string;
  path: string;
  timestamp: string;
};

const chartConfig = {
  views: {
    label: 'Page Views',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function ActivityChart() {
    const { user } = useAuth();
    const [chartData, setChartData] = useState<{ day: string; views: number }[]>([]);

    useEffect(() => {
        if (user) {
            try {
                const key = `activity_${user.id}`;
                const storedActivity = localStorage.getItem(key);
                const activities: Activity[] = storedActivity ? JSON.parse(storedActivity) : [];
                
                const now = new Date();
                const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start on Monday
                const daysOfWeek = eachDayOfInterval({ start: startOfThisWeek, end: now });

                const processedData = daysOfWeek.map(day => {
                    const dayString = format(day, 'E'); // Mon, Tue, etc.
                    const views = activities.filter(activity => 
                        activity.type === 'pageView' && isSameDay(new Date(activity.timestamp), day)
                    ).length;

                    return { day: dayString, views };
                });
                
                // Fill in the rest of the week with 0 views if needed
                 if (processedData.length < 7) {
                    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    const existingDays = processedData.map(d => d.day);
                    for (const dayName of allDays) {
                        if (!existingDays.includes(dayName)) {
                            // Find where to insert it
                             const index = allDays.indexOf(dayName);
                             if (index > processedData.length -1) {
                                processedData.push({ day: dayName, views: 0 });
                             }
                        }
                    }
                }


                setChartData(processedData);

            } catch (error) {
                console.error("Could not read activity from localStorage", error);
                setChartData([]);
            }
        }
    }, [user]);

    if (chartData.length === 0) {
        return (
            <div className="flex items-center justify-center h-[240px] text-muted-foreground">
                <p>No activity data to display yet. Browse the site to see your activity here.</p>
            </div>
        )
    }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="views" fill="var(--color-views)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}