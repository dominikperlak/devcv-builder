import { supabase } from '@/lib/supabase';
import { ResumeFormData } from '@/types/resume';

export const getResumes = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return { error: 'Please sign in to view your resumes', data: [] };
    }

    const { data, error } = await supabase
      .from('cv_store')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resumes:', error);
      return { error: error.message, data: [] };
    }

    const transformedData = data.map((item: any) => ({
      ...item.resume_data,
      id: item.id,
      lastModified: item.updated_at,
    }));

    return { data: transformedData };
  } catch (error) {
    console.error('Error in getResumes:', error);
    return { error: 'Failed to fetch resumes', data: [] };
  }
};

export const saveResume = async (formData: ResumeFormData) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return { error: 'Please sign in to save your resume' };
    }
    const { count } = await supabase
      .from('cv_store')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);

    if (count && count >= 5) {
      return { error: 'You have reached the maximum limit of 5 CVs' };
    }

    const { data, error } = await supabase
      .from('cv_store')
      .upsert({
        id: formData.id,
        user_id: session.user.id,
        resume_data: formData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving resume:', error);
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    console.error('Error in saveResume:', error);
    return { error: 'Failed to save resume' };
  }
};

export const deleteResume = async (id: string) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      return { error: 'Please sign in to delete your resume' };
    }

    const { error } = await supabase
      .from('cv_store')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);

    if (error) {
      console.error('Error deleting resume:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteResume:', error);
    return { error: 'Failed to delete resume' };
  }
};
