'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none">
            <p className="mb-6">
              Your privacy is important to us. It is DevResume&apos;s policy to
              respect your privacy regarding any information we may collect from
              you across our website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We only ask for personal information when we truly need it to
              provide a service to you. We collect it by fair and lawful means,
              with your knowledge and consent. We also let you know why
              we&apos;re collecting it and how it will be used.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Data Storage</h2>
            <p className="mb-4">
              We only retain collected information for as long as necessary to
              provide you with your requested service. What data we store,
              we&apos;ll protect within commercially acceptable means to prevent
              loss and theft, as well as unauthorized access, disclosure,
              copying, use or modification.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Data Sharing</h2>
            <p className="mb-4">
              We don&apos;t share any personally identifying information
              publicly or with third-parties, except when required to by law.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              4. External Links
            </h2>
            <p className="mb-4">
              Our website may link to external sites that are not operated by
              us. Please be aware that we have no control over the content and
              practices of these sites, and cannot accept responsibility or
              liability for their respective privacy policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Rights</h2>
            <p className="mb-4">
              You are free to refuse our request for your personal information,
              with the understanding that we may be unable to provide you with
              some of your desired services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Cookies</h2>
            <p className="mb-4">
              We use cookies to understand and save your preferences for future
              visits and compile aggregate data about site traffic and site
              interaction.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">7. Updates</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time. We will
              notify you about significant changes in the way we treat personal
              information by sending a notice to the primary email address
              specified in your account, by placing a prominent notice on our
              site, and/or by updating the privacy policy section on our
              website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">
              8. Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
