import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

export const MinimalStyle = ({ data, children }: MinimalStyleProps) => {
  return (
    <div className="space-y-8 font-sans bg-gradient-to-br from-neutral-50 to-stone-50 p-8 rounded-xl shadow-sm">
      {children}
    </div>
  );
};
