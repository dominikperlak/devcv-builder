import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSession } from 'next-auth/react';
import { ResumeFormData } from '@/types/resume';
import { useToast } from '@/hooks/use-toast';

export const useResumes = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!session?.user?.uuid) {
        setError('User not authenticated');
        setIsLoading(false);
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
      } catch (err: any) {
        const message = err.message || 'Failed to load resumes';
        setError(message);
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, [session, toast]);

  return { resumes, isLoading, error };
};
