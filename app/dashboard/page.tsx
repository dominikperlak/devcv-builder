'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Stats } from '../components/dashboards/stats';
import { Chart } from '../components/dashboards/chart';

const Dashboard = () => {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#F6F6F7]">
        <header className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container py-4">
            <h1 className="text-2xl font-medium text-primary">DevResume</h1>
          </div>
        </header>
        <main className="container py-8 flex justify-center">
          <div className="max-w-5xl w-full space-y-8">
            <Stats />
            <Chart />
          </div>
        </main>
      </div>
    </SessionProvider>
  );
};

export default Dashboard;
