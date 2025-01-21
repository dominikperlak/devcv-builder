import { supabase } from '@/lib/supabase';
import { ResumeFormData } from '@/types/resume';

export const generateShareLink = async (
  formData: ResumeFormData
): Promise<{ link: string; error?: string }> => {
  try {
    if (!formData) {
      throw new Error('No form data provided');
    }

    if (formData.id) {
      const { data: existingData, error: existingError } = await supabase
        .from('cv_store')
        .select('share_id')
        .eq('id', formData.id)
        .single();

      if (existingError) {
        console.error('Error checking existing share:', existingError);
      } else if (existingData?.share_id) {
        const baseUrl =
          process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
        return { link: `${baseUrl}/share/${existingData.share_id}` };
      }
    }

    const { data, error } = await supabase
      .from('cv_store')
      .insert([
        {
          resume_data: formData,
        },
      ])
      .select('share_id')
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!data?.share_id) {
      throw new Error('No share ID returned from database');
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shareLink = `${baseUrl}/share/${data.share_id}`;
    return { link: shareLink };
  } catch (error) {
    console.error('Error generating share link:', error);
    return {
      link: '',
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate share link',
    };
  }
};

export const getSharedResume = async (shareId: string) => {
  try {
    if (!shareId) {
      throw new Error('No share ID provided');
    }

    const { data, error } = await supabase
      .from('cv_store')
      .select('resume_data, id')
      .eq('share_id', shareId)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No resume found');
    }

    await trackSharedResumeView(data.resume_data.id);

    return data.resume_data;
  } catch (error) {
    console.error('Failed to fetch shared resume:', error);
    return null;
  }
};

const trackSharedResumeView = async (resumeId: string) => {
  try {
    const { error } = await supabase.from('cv_views').insert({
      resume_id: resumeId,
      user_id: null,
    });

    if (error) {
      console.error('Error tracking shared resume view:', error);
    }
  } catch (error) {
    console.error('Failed to track shared resume view:', error);
  }
};
