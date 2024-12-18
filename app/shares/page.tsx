'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const ShareContent = dynamic(
  () =>
    import('../components/share/sharecontent').then((mod) => mod.ShareContent),
  { ssr: false }
);

const SharePage = () => {
  return;
  <ShareContent />;
};

export default SharePage;
