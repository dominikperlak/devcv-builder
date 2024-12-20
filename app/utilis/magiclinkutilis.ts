'use client';

import { v4 as uuidv4 } from 'uuid';
import { generatePDFBlob, blobToBase64 } from './pdfutilis';

interface ShareData {
  id: string;
  formData: any;
  pdfBase64: string;
  createdAt: number;
  expiresAt: number;
}

class MagicLinkManager {
  private static shareCache: Map<string, ShareData> = new Map();

  /**
   * Generate a magic link for sharing data
   * @param formData - The form data to share
   * @returns A short magic link
   */
  static async generateShareLink(formData: any): Promise<string> {
    try {
      if (typeof window === 'undefined') return '';

      const origin = window.location.origin.includes('localhost')
        ? 'https://devcv-builder.vercel.app'
        : window.location.origin;

      const pdfBlob = await generatePDFBlob('resume-preview', {
        image: { type: 'jpeg', quality: 0.7 },
        html2canvas: { scale: 1.5 },
      });

      const pdfBase64 = await blobToBase64(pdfBlob);

      const optimizedFormData = {
        ...formData,
        _temp: undefined,
        _draft: undefined,
        _lastModified: undefined,
      };

      const shareId = uuidv4().split('-')[0];

      const shareData: ShareData = {
        id: shareId,
        formData: optimizedFormData,
        pdfBase64,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
      };

      // Store share data (in a real app, this would be in a database)
      this.shareCache.set(shareId, shareData);

      // Generate short magic link
      return `${origin}/s/${shareId}`;
    } catch (error) {
      console.error('Error generating magic link:', error);
      return '';
    }
  }

  /**
   * Retrieve and validate share data
   * @param shareId - The unique share identifier
   * @returns Share data or null if invalid/expired
   */
  static getShareData(shareId: string): ShareData | null {
    const shareData = this.shareCache.get(shareId);

    if (!shareData) {
      console.error('Share not found');
      return null;
    }

    // Check expiration
    if (Date.now() > shareData.expiresAt) {
      this.shareCache.delete(shareId);
      console.error('Share link expired');
      return null;
    }

    return shareData;
  }

  /**
   * Clean up expired share links
   * In a real application, this would be a background job
   */
  static cleanupExpiredShares() {
    const now = Date.now();
    for (const [id, data] of this.shareCache.entries()) {
      if (now > data.expiresAt) {
        this.shareCache.delete(id);
      }
    }
  }
}

export default MagicLinkManager;
