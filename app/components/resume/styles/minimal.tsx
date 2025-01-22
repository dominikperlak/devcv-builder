import React from 'react';
import { ResumeData } from '@/types/resume';

interface MinimalStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

const stylesMap: Record<number, string> = {
  0: 'border-b border-slate-200 pb-8',
  1: 'text-slate-700',
};

export const MinimalStyle: React.FC<MinimalStyleProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-white font-sans p-8">
      <div className="max-w-4xl mx-auto">
        {React.Children.map(children, (child, index) => (
          <section
            key={index}
            className={`space-y-6 ${stylesMap[index] || 'text-slate-800'}`}
          >
            {child}
          </section>
        ))}
      </div>
    </div>
  );
};
