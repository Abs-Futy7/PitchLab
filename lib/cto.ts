import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askCTO({ userMessage, startupIdea }: {
  userMessage: string;
  startupIdea: string;
}): Promise<string> {
  const prompt = `You are a technical co-founder (CTO) focused on architecture, tech stacks, MVPs, and development roadmaps. Provide practical, actionable technical advice.

The user's startup idea is:
"${startupIdea}"

Please respond as their CTO co-founder. Be helpful, specific, and actionable in your technical advice. Focus on:
- Technology stack recommendations
- MVP development strategies
- Architecture and scalability
- Development best practices
- Technical feasibility
- Code structure and organization

User question: "${userMessage}"

Provide a thoughtful, detailed technical response that helps them move forward with their startup development.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API for CTO:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
