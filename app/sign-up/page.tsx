'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import LogoWhite from '@/public/logo-white';
const SignUp = () => {
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
      description: 'Email/password registration will be available soon!',
    });
  };
  const handleGithubSignUp = async () => {
    try {
      toast({
        title: 'Redirecting to GitHub',
        description: 'Please complete the registration process.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during GitHub registration.',
        variant: 'destructive',
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <LogoWhite className="w-[170px]" />
        </header>
        <div className="max-w-md mx-auto mt-20 p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-8">
            Create Account
          </h2>
          <Button
            onClick={handleGithubSignUp}
            className="w-full mb-8 bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 h-12"
          >
            <Github className="w-5 h-5" />
            Sign up with GitHub
          </Button>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">
                Or sign up with email
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                required
              />
            </div>
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
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/10 bg-white/5"
                required
              />
              <span className="ml-2 text-sm text-slate-300">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </span>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12"
            >
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/sign-in')}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
