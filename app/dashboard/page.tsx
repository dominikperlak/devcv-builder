'use client';

import React, { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '../components/ui/button';
import { FileText } from 'lucide-react';
import Logo from '@/public/logo';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';
import { ResumeFormData } from '@/types/resume';
import { ResumeSelector } from '../components/dashboards/resume-selector';
import { useToast } from '@/hooks/use-toast';

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
  const { data: session } = useSession();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!session?.user?.uuid) {
        router.push('/sign-in');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cv_store')
          .select('*')
          .eq('user_id', session.user.uuid)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        const transformedData =
          data?.map((item: any) => ({
            ...item.resume_data,
            id: item.id,
            lastModified: item.updated_at,
          })) || [];

        setResumes(transformedData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load resumes';
        setError(message);
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      }
    };

    fetchResumes();
  }, [session, toast, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
                <Logo className="w-[200px] ml-2" />
              </button>
              <div className="flex gap-4">
                <Button
                  onClick={() => router.push('/my-resume')}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 hover:bg-slate-50 transition-colors duration-200 text-base px-6"
                >
                  <FileText className="w-5 h-5" />
                  My Resumes
                </Button>
              </div>
            </div>
          </header>
          <main className="container py-8 flex justify-center">
            <div className="max-w-5xl w-full space-y-8">
              <ResumeSelector
                resumes={resumes}
                onResumeSelect={setSelectedResumeId}
              />
              <Stats resumes={resumes} selectedResumeId={selectedResumeId} />
              <Chart resumes={resumes} selectedResumeId={selectedResumeId} />
            </div>
          </main>
        </div>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Dashboard;
