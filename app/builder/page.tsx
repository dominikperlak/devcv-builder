'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const Builder = dynamic(() => import('../components/resume/resumebuilder'), {
  ssr: false,
});

const Builderpage = () => {
  return (
    <div>
      <Builder />
    </div>
  );
};

export default Builderpage;
