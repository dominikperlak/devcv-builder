'use client';

import React from 'react';
import { Card } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchChartData } from '@/app/utilis/dashboard';
import { ChartDataPoint } from '@/types/dashboard';

export const Chart = () => {
  const { data: chartData, isLoading } = useQuery<ChartDataPoint[]>({
    queryKey: ['cv-chart-data'],
    queryFn: fetchChartData,
    refetchInterval: 30000,
    initialData: Array.from({ length: 30 }, () => ({
      date: '',
      views: 0,
    })),
  });

  if (isLoading) {
    return (
      <Card className="p-8 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded"></div>
          <div className="h-[400px] bg-slate-100 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            30 Day Activity
          </h2>
          <p className="text-sm text-slate-600">Logins over the last 30 days</p>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ color: '#1e293b', fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ r: 4, fill: '#0EA5E9', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#0EA5E9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
