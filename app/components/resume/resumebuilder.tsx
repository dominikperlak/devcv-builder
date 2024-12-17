'use client';
import React, { useState } from 'react';
import { ResumeForm } from './resumeform';
import { ResumePreview } from './resumepreview';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { LayoutDashboard } from 'lucide-react';

const Builder = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [prevFormData, setPrevFormData] = useState({});

  const handleFormUpdate = (data: any) => {
    if (JSON.stringify(data) !== JSON.stringify(prevFormData)) {
      setFormData(data);
      setPrevFormData(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-foreground transition-colors">
      <header className="border-b border-border bg-white/80 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-medium text-slate-900 hover:text-slate-700 transition-colors"
          >
            DevResume
          </button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 hover:bg-slate-50 transition-colors duration-200 text-base px-6"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in">
                <h2 className="text-xl font-medium mb-6 text-slate-900 flex items-center gap-2">
                  <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  Build Your Resume
                </h2>
                <ResumeForm onUpdate={handleFormUpdate} />
              </div>
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <ResumePreview formData={formData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;
