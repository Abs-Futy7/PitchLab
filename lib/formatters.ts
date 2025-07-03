// Utility functions for formatting AI responses

// General markdown formatter
export function formatMarkdown(response: string): string {
  // Only fix bold text formatting if it's the *** pattern
  response = response.replace(/\*\*\*(.*?)\*\*\*/g, '**$1**');
  
  // Don't touch headers that already have emojis
  if (!response.includes('🚀') && !response.includes('🔥') && !response.includes('⭐')) {
    // Convert ## headers to emoji headers only if they don't already have emojis
    response = response.replace(/^## ([^🔥].*?)$/gm, '🔥 **$1**');
    response = response.replace(/^### ([^⭐].*?)$/gm, '⭐ **$1**');
    response = response.replace(/^#### ([^🎯].*?)$/gm, '🎯 **$1**');
    response = response.replace(/^# ([^🚀].*?)$/gm, '🚀 **$1**');
  }
  
  // Add proper spacing between sections - ensure headers have line breaks before them
  response = response.replace(/(?<!^)(?=^[🔥⭐🎯🚀])/gm, '\n');
  
  // Don't change bullet points if they're already nicely formatted
  if (!response.includes('•') && !response.includes('*')) {
    response = response.replace(/^- (.*?)$/gm, '• $1');
  }
  
  // Only format numbered lists if they don't already have emojis
  if (!response.includes('️⃣')) {
    response = response.replace(/^(\d+)\. (.*?)$/gm, '$1️⃣ $2');
  }
  
  return response;
}

export function formatArchitectResponse(response: string): string {
  // Don't apply general markdown formatting if response is already well-formatted
  const hasEmojis = response.includes('📂') || response.includes('🏋️') || response.includes('💡');
  
  if (!hasEmojis) {
    // Apply general markdown formatting only if not already formatted
    response = formatMarkdown(response);
    
    // Add code block formatting if not already present
    if (!response.includes('```')) {
      response = '```\n' + response + '\n```';
    }
    
    // Add emojis to common folder types only if they don't exist
    response = response
      .replace(/├── src\//g, '├── 📂 src/')
      .replace(/├── components\//g, '├── 📂 components/')
      .replace(/├── pages\//g, '├── 📂 pages/')
      .replace(/├── public\//g, '├── 📂 public/')
      .replace(/├── lib\//g, '├── 📂 lib/')
      .replace(/├── utils\//g, '├── 📂 utils/')
      .replace(/├── styles\//g, '├── 🎨 styles/')
      .replace(/├── assets\//g, '├── 🖼️ assets/')
      .replace(/├── hooks\//g, '├── 🪝 hooks/')
      .replace(/├── types\//g, '├── 📝 types/')
      .replace(/├── api\//g, '├── 🌐 api/')
      .replace(/├── docs\//g, '├── 📚 docs/')
      .replace(/└── package\.json/g, '└── 📦 package.json')
      .replace(/└── README\.md/g, '└── 📖 README.md')
      .replace(/└── \.env/g, '└── 🔐 .env');
  }

  return response;
}

export function formatCTOResponse(response: string): string {
  // Check if response already has tech emojis - if so, don't over-format
  const hasEmojis = response.includes('⚛️') || response.includes('🔷') || response.includes('🟢');
  
  if (!hasEmojis) {
    // Apply general markdown formatting first
    response = formatMarkdown(response);
    
    // Add tech stack icons and formatting
    response = response
      .replace(/\bReact\b/g, '⚛️ React')
      .replace(/\bNext\.js\b/g, '▲ Next.js')
      .replace(/\bTypeScript\b/g, '🔷 TypeScript')
      .replace(/\bNode\.js\b/g, '🟢 Node.js')
      .replace(/\bMongoDB\b/g, '🍃 MongoDB')
      .replace(/\bPostgreSQL\b/g, '🐘 PostgreSQL')
      .replace(/\bDocker\b/g, '🐳 Docker')
      .replace(/\bAWS\b/g, '☁️ AWS')
      .replace(/\bVercel\b/g, '▲ Vercel')
      .replace(/\bAPI\b/gi, '🌐 API')
      .replace(/\bDatabase\b/gi, '🗄️ Database')
      .replace(/\bFrontend\b/gi, '🎨 Frontend')
      .replace(/\bBackend\b/gi, '⚙️ Backend')
      .replace(/\bArchitecture\b/gi, '🏗️ Architecture')
      .replace(/\bMVP\b/gi, '🚀 MVP');
  }

  return response;
}

export function formatCMOResponse(response: string): string {
  // Check if response already has marketing emojis
  const hasEmojis = response.includes('📱') || response.includes('🔍') || response.includes('📊');
  
  if (!hasEmojis) {
    // Apply general markdown formatting first
    response = formatMarkdown(response);
    
    // Add marketing icons and formatting
    response = response
      .replace(/\bSocial Media\b/gi, '📱 Social Media')
      .replace(/\bSEO\b/gi, '🔍 SEO')
      .replace(/\bContent Marketing\b/gi, '📝 Content Marketing')
      .replace(/\bEmail Marketing\b/gi, '📧 Email Marketing')
      .replace(/\bInfluencer\b/gi, '🌟 Influencer')
      .replace(/\bAnalytics\b/gi, '📊 Analytics')
      .replace(/\bBrand\b/gi, '🏷️ Brand')
      .replace(/\bTarget Audience\b/gi, '🎯 Target Audience')
      .replace(/\bCampaign\b/gi, '📢 Campaign')
      .replace(/\bStrategy\b/gi, '🗺️ Strategy')
      .replace(/\bEngagement\b/gi, '💬 Engagement')
      .replace(/\bGrowth\b/gi, '📈 Growth');
  }

  return response;
}

export function formatCFOResponse(response: string): string {
  // Apply general markdown formatting first
  response = formatMarkdown(response);
  
  // Add financial icons and formatting
  response = response
    .replace(/Revenue/gi, '💰 Revenue')
    .replace(/Pricing/gi, '💲 Pricing')
    .replace(/Investment/gi, '💼 Investment')
    .replace(/Budget/gi, '📊 Budget')
    .replace(/Funding/gi, '🏦 Funding')
    .replace(/ROI/gi, '📈 ROI')
    .replace(/Cost/gi, '💸 Cost')
    .replace(/Profit/gi, '💵 Profit')
    .replace(/Financial/gi, '💳 Financial')
    .replace(/Monetization/gi, '💱 Monetization')
    .replace(/Valuation/gi, '💎 Valuation')
    .replace(/Cash Flow/gi, '💰 Cash Flow');

  return response;
}

// Master formatter that applies agent-specific formatting
export function formatAgentResponse(response: string, agent: 'cto' | 'cmo' | 'cfo' | 'architect'): string {
  switch (agent) {
    case 'cto':
      return formatCTOResponse(response);
    case 'cmo':
      return formatCMOResponse(response);
    case 'cfo':
      return formatCFOResponse(response);
    case 'architect':
      return formatArchitectResponse(response);
    default:
      return formatMarkdown(response);
  }
}
