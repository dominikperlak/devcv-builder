'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold mt-6 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on DevResume&apos;s website
              for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on DevResume&apos;s website are provided on an
              &apos;as is&apos; basis. DevResume makes no warranties, expressed
              or implied, and hereby disclaims and negates all other warranties
              including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitations</h2>
            <p className="mb-4">
              In no event shall DevResume or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on DevResume&apos;s website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              5. Revisions and Errata
            </h2>
            <p className="mb-4">
              The materials appearing on DevResume&apos;s website could include
              technical, typographical, or photographic errors. DevResume does
              not warrant that any of the materials on its website are accurate,
              complete or current.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Links</h2>
            <p className="mb-4">
              DevResume has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by DevResume
              of the site.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              7. Terms of Use Modifications
            </h2>
            <p className="mb-4">
              DevResume may revise these terms of use for its website at any
              time without notice. By using this website you are agreeing to be
              bound by the then current version of these Terms and Conditions of
              Use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
