'use client';
import React, { useState } from 'react';
import { ResumeForm } from './resumeform';
import { ResumePreview } from './resumepreview';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-2xl font-medium"
          >
            DevResume
          </button>
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                <h2 className="text-xl font-medium mb-6 text-slate-900">
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
