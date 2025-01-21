'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { LayoutDashboard, Plus } from 'lucide-react';
import { ResumeList } from '../components/resume/resumelist';
import Logo from '@/public/logo';
import { useToast } from '@/hooks/use-toast';
import { ResumeFormData } from '@/types/resume';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';

const RESUME_LIMIT = 5;

const MyResumes = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [limitExceeded, setLimitExceeded] = useState(false);
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

        if (error) throw error;

        const transformedData =
          data?.map((item: any) => ({
            ...item.resume_data,
            id: item.id,
            lastModified: item.updated_at,
          })) || [];

        setResumes(transformedData);
        setLimitExceeded(transformedData.length >= RESUME_LIMIT);
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

  const handleCreateNewResume = async () => {
    if (!session?.user?.uuid) {
      router.push('/sign-in');
      return;
    }

    if (resumes.length >= RESUME_LIMIT) {
      setLimitExceeded(true);
      toast({
        title: 'Limit exceeded',
        description: `You have exceeded the limit of ${RESUME_LIMIT} resumes.`,
        variant: 'destructive',
      });
      return;
    }

    const newResume: ResumeFormData = {
      id: crypto.randomUUID(),
      title: 'Untitled Resume',
      lastModified: new Date().toISOString(),
      firstName: '',
      lastName: '',
      jobTitle: '',
      summary: '',
      email: '',
      github: '',
      linkedin: '',
      workExperience: [],
      education: [],
      projects: [],
      skills: [],
      style: 'modern',
    };

    try {
      const { error } = await supabase.from('cv_store').insert({
        id: newResume.id,
        user_id: session.user.uuid,
        resume_data: newResume,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setResumes((prevResumes) => [...prevResumes, newResume]);
      setLimitExceeded(resumes.length + 1 >= RESUME_LIMIT);

      toast({
        title: 'Resume created',
        description: 'Your new resume has been created successfully.',
      });

      router.push(`/builder?id=${newResume.id}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create resume';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!session?.user?.uuid) {
      router.push('/sign-in');
      return;
    }

    try {
      const { error } = await supabase
        .from('cv_store')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.uuid);

      if (error) throw error;

      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== id)
      );
      setLimitExceeded(resumes.length - 1 >= RESUME_LIMIT);

      toast({
        title: 'Resume deleted',
        description: 'Your resume has been successfully deleted.',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete resume';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-medium text-slate-900 hover:text-slate-700 transition-colors"
          >
            <Logo className="w-[200px] ml-2" />
          </button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 hover:bg-slate-50 transition-colors duration-200 text-base px-6"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-slate-900">
              My Resumes
            </h1>
            <Button
              onClick={handleCreateNewResume}
              variant="outline"
              size="sm"
              className="text-base px-6 flex items-center gap-2"
              disabled={limitExceeded}
            >
              <Plus className="w-4 h-4" />
              Create New Resume
            </Button>
          </div>
          {limitExceeded && (
            <div
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md mb-6"
              role="alert"
            >
              <p className="text-red-500 text-lg font-semibold">
                You have exceeded the limit of {RESUME_LIMIT} resumes.
              </p>
            </div>
          )}
          <ResumeList
            showCreateButton={false}
            onCreateNewResume={handleCreateNewResume}
            resumes={resumes}
            limitExceeded={limitExceeded}
            handleDelete={handleDeleteResume}
          />
        </div>
      </main>
    </div>
  );
};

export default MyResumes;
