'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Builder = dynamic(() => import('../components/resume/resumebuilder'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading resume builder...</p>
      </div>
    </div>
  ),
});

const BuilderContent = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/sign-in');
    },
  });

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your resume builder...</p>
        </div>
      </div>
    );
  }

  return <Builder />;
};

const BuilderPage = () => {
  return <BuilderContent />;
};

export default BuilderPage;
