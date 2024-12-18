'use client';

import MagicLinkManager from './magiclinkutilis';

/**
 * Generate a share link using the Magic Link approach
 * @param formData - The form data to share
 * @returns A short, shareable link
 */
export const generateShareLink = async (formData: any): Promise<string> => {
  return MagicLinkManager.generateShareLink(formData);
};

/**
 * Decode share data from a share ID
 * @param shareId - The unique share identifier
 * @returns Decoded share data or null
 */
export const decodeShareData = (shareId: string | undefined) => {
  if (!shareId) return null;
  return MagicLinkManager.getShareData(shareId);
};
