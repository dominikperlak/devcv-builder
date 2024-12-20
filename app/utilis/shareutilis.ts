import { supabase } from '@/lib/supabase';
import { ResumeFormData } from '@/types/resume';

interface CVRecord {
  id: string;
  created_at: string;
  share_id: string;
  resume_data: ResumeFormData;
}

export const generateShareLink = async (
  formData: ResumeFormData
): Promise<{ link: string; error?: string }> => {
  try {
    const { shareId, error } = await storeCV(formData);

    if (error) {
      throw new Error(error);
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shareLink = `${baseUrl}/share/${shareId}`;

    return { link: shareLink };
  } catch (error) {
    console.error('Error generating share link:', error);

    return {
      link: '',
      error: 'Failed to generate share link',
    };
  }
};

export const getSharedResume = async (shareId: string) => {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('resume_data')
      .eq('share_id', shareId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data.resume_data;
  } catch (error) {
    console.error('Failed to fetch shared resume:', error);
    return null;
  }
};

const storeCV = async (formData: ResumeFormData) => {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .insert([
        {
          resume_data: formData,
        },
      ])
      .select('share_id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return { shareId: data.share_id };
  } catch (error) {
    console.error('Error storing CV:', error);
    return { error: 'Failed to store CV' };
  }
};
