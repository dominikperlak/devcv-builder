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

const mockData = [
  { month: 'Jan', downloads: 65 },
  { month: 'Feb', downloads: 85 },
  { month: 'Mar', downloads: 120 },
  { month: 'Apr', downloads: 90 },
  { month: 'May', downloads: 150 },
  { month: 'Jun', downloads: 180 },
  { month: 'Jul', downloads: 210 },
  { month: 'Aug', downloads: 250 },
  { month: 'Sep', downloads: 280 },
  { month: 'Oct', downloads: 310 },
  { month: 'Nov', downloads: 260 },
  { month: 'Dec', downloads: 290 },
];

export const Chart = () => {
  return (
    <Card className="p-8 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Downloads Overview
          </h2>
          <p className="text-sm text-slate-600">
            Monthly download statistics for your resumes
          </p>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
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
                dataKey="downloads"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
