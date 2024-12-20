import React from 'react';
import { ResumeData } from '@/types/resume';

interface CreativeStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

const stylesMap: Record<number, string> = {
  0: 'font-handwriting text-fuchsia-600 text-2xl',
  1: 'font-mono text-pink-600 tracking-tight',
  2: 'font-display text-purple-600 tracking-wide',
  3: 'font-serif text-rose-600 leading-relaxed',
  4: 'font-sans text-fuchsia-500 font-light',
  5: 'font-display text-pink-500 uppercase tracking-wider',
};

export const CreativeStyle: React.FC<CreativeStyleProps> = ({ children }) => {
  return (
    <div className="space-y-8 font-sans">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-50 to-indigo-50">
        {/* Gradient Background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200 to-fuchsia-200 rounded-full blur-3xl opacity-20 -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20 -ml-20 -mb-20" />

        <div className="relative p-8 space-y-6">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-80 p-6 rounded-lg backdrop-blur-sm ${stylesMap[index] || ''}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
