import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StyleContextType {
  customStyleUrl: string;
  setCustomStyleUrl: (url: string) => void;
  loadCustomStyle: (url: string) => Promise<void>;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [customStyleUrl, setCustomStyleUrl] = useState<string>('');
  const { toast } = useToast();

  const loadCustomStyle = async (url: string) => {
    try {
      const rawUrl = url
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/', '/');

      const response = await fetch(rawUrl);
      if (!response.ok) throw new Error('Failed to fetch style');

      const css = await response.text();

      const existingStyle = document.getElementById('custom-resume-style');
      if (existingStyle) existingStyle.remove();

      const styleElement = document.createElement('style');
      styleElement.id = 'custom-resume-style';
      styleElement.textContent = css;
      document.head.appendChild(styleElement);

      setCustomStyleUrl(url);
      toast({
        title: 'Style Updated',
        description: 'Custom style has been successfully applied',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'Failed to load custom style. Please check the URL and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <StyleContext.Provider
      value={{ customStyleUrl, setCustomStyleUrl, loadCustomStyle }}
    >
      {children}
    </StyleContext.Provider>
  );
}

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
