'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import LogoWhite from '@/public/logo-white';

const SignIn = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleGithubSignIn = async () => {
    try {
      const result = await signIn('github', {
        callbackUrl: process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL,
      });

      if (result?.error) {
        toast({
          title: 'Error',
          description: 'Failed to initialize GitHub sign in.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Redirecting to GitHub',
          description: 'Please complete the authentication process.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during GitHub sign in.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <LogoWhite className="w-[200px]" />
        </header>
        <div className="max-w-md mx-auto mt-20 p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
          <Button
            onClick={handleGithubSignIn}
            className="w-full mb-8 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 h-12"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
