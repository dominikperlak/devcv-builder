'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Github, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  fetchGitHubProfile,
  generateSummaryFromGitHub,
} from '@/app/utilis/github';
import { UseFormSetValue } from 'react-hook-form';

interface ImportSectionProps {
  setValue: UseFormSetValue<any>;
}

export const ImportSection = ({ setValue }: ImportSectionProps) => {
  const { toast } = useToast();

  const handleGitHubImport = async () => {
    try {
      const username = prompt('Enter your GitHub username:');
      if (!username) return;

      toast({
        title: 'Importing from GitHub',
        description: 'Please wait while we fetch your information...',
      });

      const profile = await fetchGitHubProfile(username);
      const summary = generateSummaryFromGitHub(profile);

      // Set basic profile information
      setValue('github', `https://github.com/${username}`);
      setValue('summary', summary);
      if (profile.name) {
        const [firstName, ...lastNameParts] = profile.name.split(' ');
        setValue('firstName', firstName);
        setValue('lastName', lastNameParts.join(' '));
      }
      if (profile.email) {
        setValue('email', profile.email);
      }

      // Import projects from GitHub repositories
      const projects = profile.repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        technologies: repo.language,
        link: `https://github.com/${username}/${repo.name}`,
      }));
      setValue('projects', projects);

      toast({
        title: 'Success',
        description: 'Your GitHub information has been imported successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import GitHub information. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
        <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </span>
        Quick Import
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-16 gap-3 border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={handleGitHubImport}
        >
          <Github className="w-5 h-5" />
          Import from GitHub
        </Button>
        <Button
          variant="outline"
          className="h-16 gap-3 border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <Linkedin className="w-5 h-5" />
          Import from LinkedIn
        </Button>
      </div>
    </div>
  );
};
