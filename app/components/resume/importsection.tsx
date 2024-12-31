'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Octokit } from '@octokit/rest';
import { signIn, useSession } from 'next-auth/react';
import { UseFormSetValue } from 'react-hook-form';
import { ResumeFormData } from '@/types/resume';

interface ImportSectionProps {
  setValue: UseFormSetValue<ResumeFormData>;
}

export const ImportSection = ({ setValue }: ImportSectionProps) => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const getProjectDescription = async (octokit: Octokit, repo: any) => {
    try {
      if (repo.description) {
        return (
          repo.description.slice(0, 150) +
          (repo.description.length > 150 ? '...' : '')
        );
      }

      try {
        const { data: readmeData } = await octokit.repos.getReadme({
          owner: repo.owner.login,
          repo: repo.name,
        });

        if (readmeData && readmeData.content) {
          const content = Buffer.from(readmeData.content, 'base64').toString();
          const firstLine = content
            .split('\n')
            .find((line) => line.trim() && !line.trim().startsWith('#'));

          if (firstLine) {
            return (
              firstLine.slice(0, 150).trim() +
              (firstLine.length > 150 ? '...' : '')
            );
          }
        }
      } catch (readmeError) {
        if (
          readmeError instanceof Error &&
          'status' in readmeError &&
          readmeError.status === 404
        ) {
        } else {
          console.error('Error fetching README:', readmeError);
        }
        return '';
      }

      return '';
    } catch (error) {
      return '';
    }
  };

  const handleGitHubImport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!session?.accessToken) {
      signIn('github');
      return;
    }

    try {
      toast({
        title: 'Importing from GitHub',
        description: 'Please wait while we fetch your information...',
      });

      const octokit = new Octokit({
        auth: session.accessToken,
      });

      const { data: profile } = await octokit.users.getAuthenticated();

      if (profile.name) {
        const nameParts = profile.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        setValue('firstName', firstName);
        setValue('lastName', lastName || '');
      }

      if (profile.company) {
        setValue('title', `Software Engineer at ${profile.company}`);
      }

      if (profile.email) {
        setValue('email', profile.email);
      }

      if (profile.html_url) {
        setValue('github', profile.html_url);
      }

      if (profile.bio) {
        setValue('summary', profile.bio);
      }

      const { data: repos } = await octokit.repos.listForAuthenticatedUser({
        sort: 'updated',
        per_page: 5,
        visibility: 'public',
      });

      const projects = await Promise.all(
        repos.map(async (repo) => {
          const description = await getProjectDescription(octokit, repo);
          return {
            id: repo.id,
            name: repo.name,
            description: description,
            technologies: repo.language || 'Various',
            link: repo.html_url,
          };
        })
      );

      const projectsWithDescriptions = projects.filter(
        (project) => project.description
      );
      setValue('projects', projectsWithDescriptions);

      toast({
        title: 'Success',
        description: 'Your GitHub information has been imported successfully!',
      });
    } catch (error) {
      console.error('GitHub import error:', error);
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
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          className="h-20 gap-4 border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={handleGitHubImport}
        >
          <Github className="w-6 h-6" />
          {session?.accessToken ? 'Import from GitHub' : 'Sign in with GitHub'}
        </Button>
      </div>
    </div>
  );
};
