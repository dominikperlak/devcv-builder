'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Builder = dynamic(() => import('../components/resume/resumebuilder'), {
  ssr: false,
});

const BuilderContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  if (!session) {
    router.push('/sign-in');
    return null;
  }

  return (
    <div>
      <Builder />
    </div>
  );
};

const BuilderPage = () => {
  return (
    <SessionProvider>
      <BuilderContent />
    </SessionProvider>
  );
};

export default BuilderPage;
