import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function askArchitect({ userMessage, startupIdea }: {
  userMessage: string;
  startupIdea: string;
}): Promise<string> {
  const prompt = `You are the Architect Bot, an AI assistant that specializes in generating folder structures for web and mobile applications.

Based on the following startup idea, generate a logical and scalable folder structure. Present it in a clear, tree-like format.

Startup Idea: ${startupIdea}

User question: "${userMessage}"

IMPORTANT FORMATTING INSTRUCTIONS:
1. Start your response with a title using emojis
2. Use proper tree structure characters: ├── └── │
3. Add folder emojis: 📂 for folders, 📄 for files
4. Include brief descriptions with # comments
5. Use consistent spacing and indentation
6. Make it visually appealing

Example format to follow:
📁 PROJECT STRUCTURE

/
├── 📂 src/                     # Source code
│   ├── 📂 components/          # UI components  
│   │   ├── 📂 ui/             # Base components
│   │   └── 📂 features/       # Feature components
│   ├── 📂 pages/              # App pages/routes
│   ├── 📂 hooks/              # Custom hooks
│   └── 📂 utils/              # Helper functions
├── 📂 public/                 # Static assets
└── � package.json           # Dependencies

Focus on:
- Scalable architecture
- Framework best practices  
- Clean organization
- Development workflow

Generate a beautiful, well-organized folder structure specific to their startup idea.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API for Architect:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
