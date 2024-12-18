'use client';

import React, { useEffect, useMemo } from 'react';
import { ResumePreview } from '@/app/components/resume/resumepreview';
import { decodeShareData } from '@/app/utilis/shareutilis';
import { useParams } from 'next/navigation';

export const ShareContent = () => {
  const params = useParams() as { shareId?: string };

  const decodedData = useMemo(() => {
    if (!params?.shareId) return null;
    return decodeShareData(params.shareId);
  }, [params?.shareId]);

  useEffect(() => {
    if (decodedData?.pdfBase64) {
      sessionStorage.setItem('resumePDF', decodedData.pdfBase64);
    }
  }, [decodedData]);

  if (!decodedData) {
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
        <ResumePreview formData={decodedData.formData} />
      </div>
    </div>
  );
};
