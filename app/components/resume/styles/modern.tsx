import React from 'react';
import { ResumeData } from '@/types/resume';

interface ModernStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

const stylesMap: Record<number, string> = {
  0: 'text-center space-y-4',
};

export const ModernStyle: React.FC<ModernStyleProps> = ({ children }) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />

        <div className="relative space-y-6">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-90 p-6 rounded-lg shadow-sm ${stylesMap[index] || 'space-y-2'}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
