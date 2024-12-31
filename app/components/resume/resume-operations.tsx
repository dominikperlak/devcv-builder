'use client';

import { ResumeFormData } from '@/types/resume';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useResumeOperations = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const handleFormUpdate = async (data: ResumeFormData) => {
    try {
      if (!isAuthenticated) {
        router.push('/sign-in');
        return;
      }

      const updatedData = {
        ...data,
        lastModified: new Date().toISOString(),
      };

      const { error } = await supabase.from('cv_store').upsert({
        id: updatedData.id,
        resume_data: updatedData,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: 'Resume saved',
        description: 'Your changes have been saved automatically',
      });

      return updatedData;
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteResume = async (id: string) => {
    try {
      if (!isAuthenticated) {
        router.push('/sign-in');
        return;
      }

      const { error } = await supabase.from('cv_store').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Resume deleted',
        description: 'Your resume has been successfully deleted.',
      });

      return true;
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return {
    handleFormUpdate,
    handleDeleteResume,
  };
};
