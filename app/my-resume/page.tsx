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
  const { data: session, status } = useSession();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!session?.user?.uuid || status !== 'authenticated') {
        return;
      }

      try {
        setIsLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('cv_store')
          .select('*')
          .eq('user_id', session.user.uuid)
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

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
          title: 'Error loading resumes',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [session, status, toast]);

  const handleCreateNewResume = async () => {
    if (!session?.user?.uuid) {
      router.push('/sign-in');
      return;
    }

    if (resumes.length >= RESUME_LIMIT) {
      setLimitExceeded(true);
      toast({
        title: 'Limit Reached',
        description: `Maximum limit of ${RESUME_LIMIT} resumes reached. Please delete existing resumes to create new ones.`,
        variant: 'destructive',
      });
      return;
    }

    try {
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

      const { error: insertError } = await supabase.from('cv_store').insert({
        id: newResume.id,
        user_id: session.user.uuid,
        resume_data: newResume,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      setResumes((prevResumes) => [...prevResumes, newResume]);
      setLimitExceeded(resumes.length + 1 >= RESUME_LIMIT);

      toast({
        title: 'Success',
        description: 'New resume created successfully.',
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
      const { error: deleteError } = await supabase
        .from('cv_store')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.uuid);

      if (deleteError) throw deleteError;

      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== id)
      );
      setLimitExceeded(resumes.length - 1 >= RESUME_LIMIT);

      toast({
        title: 'Success',
        description: 'Resume deleted successfully.',
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
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
            <Logo className="w-[170px]" />
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
              <p className="font-semibold">Resume Limit Reached</p>
              <p>
                You have reached the maximum limit of {RESUME_LIMIT} resumes.
                Please delete existing resumes to create new ones.
              </p>
            </div>
          )}

          {resumes.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium text-gray-600 mb-4">
                No Resumes Yet
              </h2>
              <p className="text-gray-500 mb-6">
                Create your first resume to get started
              </p>
              <Button
                onClick={handleCreateNewResume}
                variant="outline"
                size="lg"
                className="text-base px-6 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Resume
              </Button>
            </div>
          ) : (
            <ResumeList
              showCreateButton={false}
              onCreateNewResume={handleCreateNewResume}
              resumes={resumes}
              limitExceeded={limitExceeded}
              handleDelete={handleDeleteResume}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default MyResumes;
