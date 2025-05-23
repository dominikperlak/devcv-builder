'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Github, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import LogoWhite from '@/public/logo-white';
import { Checkbox } from '../components/ui/checkbox';
import Link from 'next/link';

const SignIn = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleGithubSignIn = async () => {
    if (!acceptedTerms) {
      toast({
        title: 'Terms & Conditions Required',
        description: 'Please accept the terms and conditions to continue.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await signIn('github', {
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white relative">
      <div className="container mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <LogoWhite className="w-[200px]" />
        </header>

        <div className="max-w-md mx-auto mt-20">
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-slate-400">Sign in to access your account</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked as boolean)
                  }
                  className="border-white/20"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <Button
              onClick={handleGithubSignIn}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 h-12 transition-all duration-200 hover:scale-[1.02]"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
