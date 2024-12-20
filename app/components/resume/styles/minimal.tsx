import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

const stylesMap: Record<number, string> = {
  0: 'border-b border-slate-200 pb-6',
  1: 'text-slate-700',
};

export const MinimalStyle: React.FC<MinimalStyleProps> = ({ children }) => {
  return (
    <div className="space-y-8 font-sans bg-white">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`space-y-4 ${stylesMap[index] || 'text-slate-800'}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
