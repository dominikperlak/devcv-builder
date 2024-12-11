import React, { useState } from 'react';
import { useStyle } from '../contexts/stylecontext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Palette } from 'lucide-react';

export const StyleManager = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const { loadCustomStyle } = useStyle();

  const handleStyleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl) {
      loadCustomStyle(githubUrl);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
      <form onSubmit={handleStyleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <Input
            type="text"
            placeholder="GitHub CSS URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="pr-8 w-[200px]"
          />
          <Palette className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button type="submit" variant="outline" className="bg-background">
          Apply Style
        </Button>
      </form>
    </div>
  );
};
