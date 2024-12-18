import React from 'react';
import { ResumeData } from '@/types/resume';

interface CreativeStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

export const CreativeStyle = ({ data, children }: CreativeStyleProps) => {
  return (
    <div className="space-y-8 font-sans bg-gradient-to-br from-fuchsia-50 via-white to-amber-50 p-8 rounded-xl shadow-sm">
      {children}
    </div>
  );
};
