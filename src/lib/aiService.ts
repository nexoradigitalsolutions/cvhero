import { AIEnhancementRequest, AIEnhancementResponse } from '@/types/cv';

export const enhanceWithAI = async (
  request: AIEnhancementRequest
): Promise<AIEnhancementResponse> => {
  try {
    const response = await fetch('/api/enhance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to enhance content with AI');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('AI enhancement error:', error);
    throw error;
  }
};
