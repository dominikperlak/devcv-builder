'use client';

import React, { useEffect, useState } from 'react';
import { ResumePreview } from '@/app/components/resume/resumepreview';
import { getSharedResume } from '@/app/utilis/shareutilis';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/types/resume';

export const ShareContent = () => {
  const params = useParams() as { shareId?: string };
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (!params?.shareId) {
        setLoading(false);
        return;
      }

      try {
        const data: ResumeData | null = await getSharedResume(params.shareId);
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [params?.shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-slate-900 mb-2">
            Invalid Resume Link
          </h1>
          <p className="text-slate-600">
            This resume link appears to be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container max-w-4xl mx-auto">
        <ResumePreview formData={resumeData} />
      </div>
    </div>
  );
};
