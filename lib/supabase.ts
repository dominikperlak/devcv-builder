import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const storeCV = async (formData: any) => {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .insert([
        {
          resume_data: formData,
          share_id: crypto.randomUUID(),
        },
      ])
      .select('share_id')
      .single();

    if (error) throw error;

    return { shareId: data.share_id };
  } catch (error) {
    console.error('Error storing CV:', error);

    return { error: 'Failed to store CV' };
  }
};

export const getCV = async (shareId: string) => {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('resume_data')
      .eq('share_id', shareId)
      .single();

    if (error) throw error;

    return data.resume_data;
  } catch (error) {
    console.error('Error fetching CV:', error);

    return null;
  }
};
