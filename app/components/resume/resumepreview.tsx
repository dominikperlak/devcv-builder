'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Share2, Download } from 'lucide-react';
import { generatePDF } from '@/app/utilis/pdfutilis';
import { useToast } from '@/hooks/use-toast';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { generateShareLink } from '@/app/utilis/shareutilis';
import { ShareModal } from '@/app/components/share/sharemodal';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { ResumeContent } from './resumecontent';
import { ResumeFormData } from '@/types/resume';

interface ResumePreviewProps {
  formData: ResumeFormData;
}

export const ResumePreview = ({ formData }: ResumePreviewProps) => {
  const { toast } = useToast();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [sections, setSections] = useState([
    'Contact',
    'Summary',
    'Skills',
    'Work Experience',
    'Education',
    'Projects',
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((prevSections) => {
        const oldIndex = prevSections.indexOf(active.id);
        const newIndex = prevSections.indexOf(over.id);
        return arrayMove(prevSections, oldIndex, newIndex);
      });
    }
  };

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

  const handleShare = async () => {
    try {
      const response = await generateShareLink(formData);
      if (response.link) {
        setShareLink(response.link);
        setShareModalOpen(true);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate share link. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate share link. Please try again.',
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
            onClick={handleShare}
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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          id="resume-preview"
          className="p-8 min-h-[842px] bg-slate-50 rounded-b-2xl"
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            <ResumeContent sections={sections} formData={formData} />
          </SortableContext>
        </div>
      </DndContext>
      <ShareModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        shareLink={shareLink}
      />
    </div>
  );
};
