'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResumeForm } from './resumeform';
import { ResumePreview } from './resumepreview';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { LayoutDashboard, Plus, Save } from 'lucide-react';
import Logo from '@/public/logo';
import { ResumeFormData } from '@/types/resume';
import { ResumeList } from './resumelist';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useResumeOperations } from './resume-operations';

const RESUME_LIMIT = 5;

const Builder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const { handleFormUpdate, handleDeleteResume } = useResumeOperations();

  const [formData, setFormData] = useState<ResumeFormData>({
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
  });
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [limitExceeded, setLimitExceeded] = useState(false);

  const loadResumes = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('cv_store')
        .select('*')
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
      setLimitExceeded(transformedData.length >= RESUME_LIMIT);

      const resumeId = searchParams?.get('id');
      if (resumeId) {
        const savedResume = transformedData.find(
          (r: ResumeFormData) => r.id === resumeId
        );
        if (savedResume) {
          setFormData(savedResume);
        }
      }
    } catch (error) {
      console.error('Error in loadResumes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resumes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchParams, toast]);

  const handleCreateNewResume = async () => {
    try {
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

      const { error } = await supabase.from('cv_store').insert({
        id: newResume.id,
        resume_data: newResume,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      await loadResumes();

      toast({
        title: 'Success',
        description: 'Your new resume has been created successfully.',
      });

      router.push(`/builder?id=${newResume.id}`);
    } catch (error) {
      console.error('Error in handleCreateNewResume:', error);
      toast({
        title: 'Error',
        description: 'Failed to create resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveResume = async () => {
    try {
      const updatedData = await handleFormUpdate(formData);
      if (updatedData) {
        setFormData(updatedData);
        await loadResumes();
        toast({
          title: 'Resume saved',
          description: 'Your changes have been saved successfully.',
        });
      }
    } catch (error) {
      console.error('Error in handleSaveResume:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const onFormUpdate = (data: ResumeFormData) => {
    setFormData(data);
  };

  const onDeleteResume = async (id: string) => {
    const success = await handleDeleteResume(id);
    if (success) {
      await loadResumes();
    }
  };

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-foreground transition-colors">
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-slate-900">
                      My Resumes
                    </h2>
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
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md">
                      <p className="text-red-500 text-lg font-semibold">
                        You have exceeded the limit of {RESUME_LIMIT} resumes.
                      </p>
                    </div>
                  )}
                  {resumes.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-lg">
                      <p className="text-slate-600">
                        You haven&apos;t created any resumes yet.
                      </p>
                      <p className="text-slate-500 mt-2">
                        Click the &quot;Create New Resume&quot; button to get
                        started!
                      </p>
                    </div>
                  ) : (
                    <ResumeList
                      showCreateButton={false}
                      onCreateNewResume={handleCreateNewResume}
                      resumes={resumes}
                      limitExceeded={limitExceeded}
                      handleDelete={onDeleteResume}
                    />
                  )}
                </div>
                <div className="border-t border-slate-200 pt-6">
                  <h2 className="text-xl font-medium mb-6 text-slate-900 flex items-center gap-2">
                    <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    Build Your Resume
                  </h2>
                  <ResumeForm onUpdate={onFormUpdate} initialData={formData} />
                  <Button
                    onClick={handleSaveResume}
                    variant="default"
                    size="lg"
                    className="mt-4 flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;
