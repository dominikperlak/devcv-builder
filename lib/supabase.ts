import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithGitHub = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/builder`,
      },
    });

    if (error) {
      console.error('GitHub Sign-In Error:', error.message);
      throw new Error('Failed to sign in with GitHub. Please try again later.');
    }

    return data;
  } catch (err) {
    console.error('Unexpected Error:', err);
    throw new Error(
      'An unexpected error occurred during GitHub sign-in. Please try again.'
    );
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign-Out Error:', error.message);
      throw new Error('Failed to sign out. Please try again later.');
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
    throw new Error('An unexpected error occurred during sign-out.');
  }
};
