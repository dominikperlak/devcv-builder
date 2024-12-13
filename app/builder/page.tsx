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
    return <div>Loading...</div>;
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
