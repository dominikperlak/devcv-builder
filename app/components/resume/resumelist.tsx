'use client';

import React from 'react';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ResumeFormData } from '@/types/resume';

const RESUME_LIMIT = 5;

interface ResumeListProps {
  showCreateButton: boolean;
  onCreateNewResume: () => void;
  resumes: ResumeFormData[];
  limitExceeded: boolean;
  handleDelete: (id: string) => void;
  isLoading?: boolean;
}

const WarningMessage = () => (
  <div
    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md"
    role="alert"
  >
    <p className="text-red-500 text-lg font-semibold">
      You have exceeded the limit of {RESUME_LIMIT} resumes.
    </p>
  </div>
);

export const ResumeList = ({
  showCreateButton,
  onCreateNewResume,
  resumes,
  limitExceeded,
  handleDelete,
  isLoading = false,
}: ResumeListProps) => {
  const router = useRouter();

  const handleResumeClick = (id: string) => {
    console.log('Navigating to resume:', id);
    router.push(`/builder?id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            Loading resumes...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showCreateButton && (
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onCreateNewResume}
            variant="outline"
            size="sm"
            className="text-base px-6 flex items-center gap-2"
            disabled={limitExceeded}
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </Button>
          {limitExceeded && <WarningMessage />}
        </div>
      )}
      {resumes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">
              No resumes yet
            </h3>
            <p className="text-slate-600 text-lg mb-8 max-w-md">
              Create your first resume and take the first step towards your
              dream job.
            </p>
            {showCreateButton && (
              <Button
                onClick={onCreateNewResume}
                variant="outline"
                size="sm"
                className="text-base px-6 flex items-center gap-2"
                disabled={limitExceeded}
              >
                <Plus className="w-4 h-4" />
                Create New Resume
              </Button>
            )}
          </div>
        </div>
      ) : (
        resumes.map((resume) => (
          <div
            key={resume.id}
            onClick={() => handleResumeClick(resume.id!)}
            className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div>
              <h4 className="font-medium text-slate-900">{resume.title}</h4>
              <p className="text-sm text-slate-500">
                Last modified:{' '}
                {new Date(resume.lastModified!).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(resume.id!);
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Delete resume</span>
            </Button>
          </div>
        ))
      )}
    </div>
  );
};
