'use client';

import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const openai = apiKey
  ? new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  : null;

const prompts: Record<string, string> = {
  title:
    'You are a professional resume writer. Make this job title more impactful and professional while keeping it concise.',
  summary:
    'You are a professional resume writer. Enhance this professional summary to be more impactful and compelling while maintaining authenticity.',
  experience:
    'You are a professional resume writer. Enhance this work experience description to highlight achievements and impact using strong action verbs and quantifiable results.',
  project:
    'You are a professional resume writer. Enhance this project description to emphasize technical skills and project impact.',
};

const getPromptForType = (
  type: 'title' | 'summary' | 'experience' | 'project'
): string => {
  return (
    prompts[type] ||
    'You are a professional resume writer. Enhance the following text to be more impactful and professional.'
  );
};

export const enhanceWithAI = async (
  text: string,
  type: 'title' | 'summary' | 'experience' | 'project'
): Promise<string> => {
  if (!openai) {
    throw new Error(
      'OpenAI API key is missing. Please set NEXT_PUBLIC_OPENAI_API_KEY in your environment variables.'
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: getPromptForType(type),
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.7,
    });

    const enhancedText = completion.choices[0].message.content?.trim();
    if (!enhancedText) {
      throw new Error('No response received from OpenAI');
    }

    return enhancedText;
  } catch (error) {
    console.error('Error enhancing text with AI:', error);
    throw error;
  }
};
