'use client';

import html2pdf from 'html2pdf.js';

export const generatePDFBlob = async (
  elementId: string,
  options = {}
): Promise<Blob> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  const defaultOpt = {
    margin: [0.5, 0.5],
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: 'avoid-all' },
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
  filename: string
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const opt = {
      margin: [0.5, 0.5],
      filename: filename,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        compress: true,
      },
      pagebreak: { mode: 'avoid-all' },
    };

    await html2pdf().set(opt).from(element).save();
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
      resolve(base64String.split(',')[1]); // Remove data URL prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
