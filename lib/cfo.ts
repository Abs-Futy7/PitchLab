import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askCFO({ userMessage, startupIdea }: {
  userMessage: string;
  startupIdea: string;
}): Promise<string> {
  const prompt = `You are a finance co-founder (CFO) focused on pricing models, monetization strategies, fundraising, and financial planning. Provide sound financial advice.

The user's startup idea is:
"${startupIdea}"

Please respond as their CFO co-founder. Be helpful, specific, and actionable in your financial advice. Focus on:
- Revenue models and monetization strategies
- Pricing strategies and optimization
- Financial planning and budgeting
- Fundraising strategies and investor relations
- Cost structure analysis
- Financial projections and metrics
- Risk assessment and management
- Investment and funding options

User question: "${userMessage}"

Provide a thoughtful, detailed financial response that helps them build a sustainable and profitable startup.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API for CFO:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
