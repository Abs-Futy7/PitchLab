import { GoogleGenerativeAI } from '@google/generative-ai';
import { askCTO } from './cto';
import { askCMO } from './cmo';
import { askCFO } from './cfo';
import { askArchitect } from './architect';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askGemini({ userMessage, agent, startupIdea }: {
  userMessage: string;
  agent: 'cto' | 'cmo' | 'cfo' | 'architect';
  startupIdea: string;
}): Promise<string> {
  try {
    switch (agent) {
      case 'cto':
        return await askCTO({ userMessage, startupIdea });
      case 'cmo':
        return await askCMO({ userMessage, startupIdea });
      case 'cfo':
        return await askCFO({ userMessage, startupIdea });
      case 'architect':
        return await askArchitect({ userMessage, startupIdea });
      default:
        throw new Error(`Unknown agent: ${agent}`);
    }
  } catch (error) {
    console.error('Error in askGemini:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}

// Export individual bot functions for direct use
export { askCTO, askCMO, askCFO, askArchitect };