'use client';

import html2pdf from 'html2pdf.js';
import { supabase } from '@/lib/supabase';

const incrementDownloadCount = async (resumeId: string) => {
  try {
    const { data, error } = await supabase.from('pdf_downloads').insert({
      resume_id: resumeId,
      user_id:
        (await supabase.auth.getUser()).data.user?.id ||
        '00000000-0000-0000-0000-000000000000',
      downloaded_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error recording download:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error updating download records:', error);
  }
};

export const generatePDFBlob = async (
  elementId: string,
  options = {}
): Promise<Blob> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const defaultOpt = {
    margin: 1,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  const opt = { ...defaultOpt, ...options };

  try {
    const pdf = await html2pdf().set(opt).from(element).output('blob');
    return pdf;
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw error;
  }
};

export const generatePDF = async (
  elementId: string,
  filename: string,
  resumeId: string
): Promise<boolean> => {
  try {
    const blob = await generatePDFBlob(elementId);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    await incrementDownloadCount(resumeId);

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
