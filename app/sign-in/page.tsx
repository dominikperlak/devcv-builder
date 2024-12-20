'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';
import Logo from '@/public/logo';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Coming Soon',
      description: 'Email/password authentication will be available soon!',
    });
  };

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
          <Logo className="w-[170px]" />
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
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">
                Or continue with email
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/10 bg-white/5"
                />
                <span className="ml-2 text-sm text-slate-300">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12"
            >
              Sign in
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
