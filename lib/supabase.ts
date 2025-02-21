import { createClient } from '@supabase/supabase-js';
import { ResumeFormData } from '@/types/resume';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getResumes = async () => {
  try {
    const { data, error } = await supabase
      .from('cv_store')
      .select('*')
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
    const { data, error } = await supabase
      .from('cv_store')
      .upsert({
        id: formData.id,
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
