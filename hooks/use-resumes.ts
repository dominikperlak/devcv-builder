import { useState, useEffect } from 'react';
import { getResumes, saveResume, deleteResume } from '@/app/services/resumeservice';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ResumeFormData } from '@/types/resume';
import { useSession } from 'next-auth/react';

const RESUME_LIMIT = 5;

export const useResumes = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const router = useRouter();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadResumes = async () => {
    try {
      setIsLoading(true);
      
      if (!session?.accessToken) {
        router.push('/sign-in');
        return;
      }

      const response = await getResumes();
      
      if (response.error) {
        console.error('Error loading resumes:', response.error);
        toast({
          title: 'Error',
          description: response.error,
          variant: 'destructive',
        });
        return;
      }
      
      setResumes(response.data);
      setLimitExceeded(response.data.length >= RESUME_LIMIT);
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
  };

  const handleCreateNewResume = async () => {
    if (!session?.accessToken) {
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

      const response = await saveResume(newResume);
      
      if (response.error) {
        throw new Error(response.error);
      }

      await loadResumes();
      
      toast({
        title: 'Resume created',
        description: 'Your new resume has been created successfully.',
      });

      router.push(`/builder?id=${newResume.id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to create resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!session?.accessToken) {
      router.push('/sign-in');
      return;
    }

    try {
      const response = await deleteResume(id);
      
      if (response.error) {
        throw new Error(response.error);
      }

      await loadResumes();

      toast({
        title: 'Resume deleted',
        description: 'Your resume has been successfully deleted.',
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadResumes();
    }
  }, [isAuthenticated]);

  return {
    resumes,
    limitExceeded,
    isLoading,
    handleCreateNewResume,
    handleDeleteResume,
  };
};