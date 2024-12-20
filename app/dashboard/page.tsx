'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '../components/ui/button';
import { FileText } from 'lucide-react';
import Logo from '@/public/logo';

const Stats = dynamic(
  () => import('../components/dashboards/stats').then((mod) => mod.Stats),
  { ssr: false }
);

const Chart = dynamic(
  () => import('../components/dashboards/chart').then((mod) => mod.Chart),
  { ssr: false }
);

const queryClient = new QueryClient();

const Dashboard = () => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <div className="min-h-screen bg-[#F6F6F7]">
          <header className="border-b bg-white/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="container py-4 flex items-center justify-between">
              <button
                className="text-2xl font-medium text-primary"
                onClick={() => router.push('/')}
              >
                <Logo className="w-[170px]" />
              </button>
              <Button
                onClick={() => router.push('/builder')}
                variant="outline"
                size="lg"
                className="flex items-center gap-2 hover:bg-slate-50 transition-colors duration-200 text-base px-6"
              >
                <FileText className="w-5 h-5" />
                Builder
              </Button>
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
    </QueryClientProvider>
  );
};

export default Dashboard;
