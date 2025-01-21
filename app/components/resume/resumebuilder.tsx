'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ResumeForm } from './resumeform';
import { ResumePreview } from './resumepreview';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { FileText, LayoutDashboard, Save } from 'lucide-react';
import Logo from '@/public/logo';
import { ResumeFormData } from '@/types/resume';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useResumeOperations } from './resume-operations';

const Builder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { handleFormUpdate } = useResumeOperations();

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

  const loadResumes = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('cv_store')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load resumes', { position: 'bottom-right' });
        throw error;
      }

      const transformedData =
        data?.map((item: any) => ({
          ...item.resume_data,
          id: item.id,
          lastModified: item.updated_at,
        })) || [];

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
      toast.error('Failed to load resumes', { position: 'bottom-right' });
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleSaveResume = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isSaving) return;

    try {
      setIsSaving(true);
      const updatedData = await handleFormUpdate(formData);
      if (updatedData) {
        setFormData(updatedData);
        await loadResumes();
        toast.success('Changes saved successfully', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      toast.error('Failed to save changes', { position: 'bottom-right' });
    } finally {
      setIsSaving(false);
    }
  };

  const onFormUpdate = (data: ResumeFormData) => {
    setFormData(data);
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
            <Logo className="w-[200px] ml-2" />
          </button>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/my-resume')}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 hover:bg-slate-50 transition-colors duration-200 text-base px-6"
            >
              <FileText className="w-5 h-5" />
              My Resumes
            </Button>
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
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="border-t border-slate-200 pt-6">
                  <h2 className="text-xl font-medium mb-6 text-slate-900 flex items-center gap-2">
                    Build Your Resume
                  </h2>
                  <ResumeForm onUpdate={onFormUpdate} initialData={formData} />
                  <Button
                    onClick={handleSaveResume}
                    variant="default"
                    size="lg"
                    disabled={isSaving}
                    className="mt-4 flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
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
