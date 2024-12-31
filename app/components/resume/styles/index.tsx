import React from 'react';
import { ClassicStyle } from './classic';
import { CreativeStyle } from './creative';
import { MinimalStyle } from './minimal';
import { ModernStyle } from './modern';
import { ResumeData } from '@/types/resume';

interface ResumeStyleProps {
  data: ResumeData;
  children: React.ReactNode;
}

export const ResumeStyle = ({ data, children }: ResumeStyleProps) => {
  const StyleComponent = (() => {
    switch (data.style) {
      case 'classic':
        return ClassicStyle;
      case 'minimal':
        return MinimalStyle;
      case 'creative':
        return CreativeStyle;
      default:
        return ModernStyle;
    }
  })();

  return <StyleComponent data={data}>{children}</StyleComponent>;
};
