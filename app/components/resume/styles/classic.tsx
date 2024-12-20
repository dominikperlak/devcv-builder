import React from 'react';
import { ResumeData } from '@/types/resume';

interface ClassicStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

export const ClassicStyle: React.FC<ClassicStyleProps> = ({ children }) => {
  return (
    <div className="space-y-6 font-serif bg-[#F9F6F0] p-8 rounded-xl border border-amber-100">
      {React.Children.map(children, (child, index) => (
        <div
          className={`py-4 ${index % 2 === 0 ? 'bg-amber-50/50 rounded-lg' : ''}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
