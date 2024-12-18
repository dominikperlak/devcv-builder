import React from 'react';
import { ResumeData } from '@/types/resume';

interface ClassicStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

export const ClassicStyle = ({ data, children }: ClassicStyleProps) => {
  return (
    <div className="space-y-6 font-serif bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl shadow-sm">
      {children}
    </div>
  );
};
