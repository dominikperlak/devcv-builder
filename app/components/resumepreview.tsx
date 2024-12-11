'use client';
import React from 'react';
import { Button } from './ui/button';
import { Share2, Download, Linkedin, Mail, Github } from 'lucide-react';
import { generatePDF } from '../utilis/pdfUtilis';
import { useToast } from '@/hooks/use-toast';

export const ResumePreview = ({ formData }: { formData?: any }) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    const success = await generatePDF('resume-preview', 'my-resume.pdf');
    if (success) {
      toast({
        title: 'Success',
        description: 'Your resume has been downloaded successfully!',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to download resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-medium text-slate-900">Preview</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-700 hover:text-slate-900 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
      <div
        id="resume-preview"
        className="p-8 min-h-[842px] bg-slate-50 rounded-b-2xl"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-medium text-slate-900">
              {formData?.firstName} {formData?.lastName}
            </h1>
            <p className="text-slate-600">{formData?.title}</p>
            {(formData?.email || formData?.linkedin || formData?.github) && (
              <div className="flex justify-center gap-4 text-sm text-slate-600">
                {formData?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${formData.email}`}
                      className="hover:text-blue-600"
                    >
                      {formData.email}
                    </a>
                  </div>
                )}
                {formData?.linkedin && (
                  <div className="flex items-center gap-1">
                    <Linkedin className="w-4 h-4" />
                    <a
                      href={formData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {formData?.github && (
                  <div className="flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
              Summary
            </h2>
            <p className="text-sm text-slate-600">
              {formData?.summary ||
                'Experienced software engineer with a focus on full-stack development...'}
            </p>
          </div>
          {formData?.jobs?.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                Work Experience
              </h2>
              {formData.jobs.map((job: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600">{job.company}</p>
                  <p className="text-sm text-slate-500">
                    {job.startDate} - {job.endDate}
                  </p>
                  <p className="text-sm text-slate-600">{job.description}</p>
                </div>
              ))}
            </div>
          )}
          {formData?.education?.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                Education
              </h2>
              {formData.education.map((edu: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium text-slate-900">{edu.school}</h3>
                  <p className="text-sm text-slate-600">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-slate-500">
                    Graduated: {edu.graduationDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
