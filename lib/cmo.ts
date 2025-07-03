import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askCMO({ userMessage, startupIdea }: {
  userMessage: string;
  startupIdea: string;
}): Promise<string> {
  const prompt = `You are a marketing co-founder (CMO) focused on branding, growth strategies, user acquisition, and customer engagement. Provide creative marketing insights.

The user's startup idea is:
"${startupIdea}"

Please respond as their CMO co-founder. Be helpful, specific, and actionable in your marketing advice. Focus on:
- Brand identity and positioning
- Target audience identification
- Marketing strategies and channels
- Customer acquisition tactics
- Content marketing strategies
- Social media and digital marketing
- User engagement and retention
- Market research and competitive analysis

User question: "${userMessage}"

Provide a thoughtful, detailed marketing response that helps them build and grow their startup's market presence.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API for CMO:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
