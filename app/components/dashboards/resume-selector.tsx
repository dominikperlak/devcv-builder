'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { ResumeFormData } from '@/types/resume';

interface ResumeSelectorProps {
  resumes: ResumeFormData[];
  onResumeSelect: (resumeId: string | null) => void;
}

export const ResumeSelector = ({
  resumes,
  onResumeSelect,
}: ResumeSelectorProps) => {
  return (
    <div>
      <Select
        onValueChange={(value) =>
          onResumeSelect(value === 'all' ? null : value)
        }
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a resume to filter activity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Resumes</SelectItem>
          {resumes?.map((resume) => (
            <SelectItem key={resume.id} value={resume.id!}>
              {resume.title || 'Untitled Resume'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
