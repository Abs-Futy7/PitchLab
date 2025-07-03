"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import Boardroom from '@/components/Boardroom';
import ChatInput from '@/components/ChatInput';
import { askGemini } from '@/lib/gemini';
import { formatAgentResponse } from '@/lib/formatters';
import { formatArchitectResponse, formatCTOResponse, formatCMOResponse, formatCFOResponse } from '@/lib/formatters';
import { BrainCircuit, BotMessageSquare, PieChart, FolderTree, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentType?: string;
}

type AgentId = 'cto' | 'cmo' | 'cfo' | 'architect';
type MessagesState = Record<string, Message[]>;

export default function Chatroom() {
  const [startupIdea, setStartupIdea] = useState<string>('');
  const [ideaInput, setIdeaInput] = useState("");
  const [activeView, setActiveView] = useState<string>('boardroom');
  const [messages, setMessages] = useState<MessagesState>({});
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get messages for current agent
  const currentMessages = messages[activeView] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim()) {
      setStartupIdea(ideaInput);
    }
  };

  const getAgentInfo = (agentId: string) => {
    const agentMap: Record<string, { name: string; icon: any; color: string }> = {
      cto: { name: 'CTO Bot', icon: BrainCircuit, color: 'text-blue-500' },
      cmo: { name: 'CMO Bot', icon: BotMessageSquare, color: 'text-purple-500' },
      cfo: { name: 'CFO Bot', icon: PieChart, color: 'text-indigo-500' },
      architect: { name: 'Architect Bot', icon: FolderTree, color: 'text-emerald-500' }
    };
    return agentMap[agentId] || { name: 'AI Agent', icon: BrainCircuit, color: 'text-gray-500' };
  };

  const formatResponse = (response: string, agentType: string): string => {
    switch (agentType) {
      case 'architect':
        return formatArchitectResponse(response);
      case 'cto':
        return formatCTOResponse(response);
      case 'cmo':
        return formatCMOResponse(response);
      case 'cfo':
        return formatCFOResponse(response);
      default:
        return response;
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!startupIdea || activeView === 'boardroom') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to current agent's conversation
    setMessages(prev => ({
      ...prev,
      [activeView]: [...(prev[activeView] || []), userMessage]
    }));

    setIsLoading(true);

    try {
      const response = await askGemini({
        userMessage: messageContent,
        agent: activeView as AgentId,
        startupIdea
      });

      // Format the response based on the agent type
      const formattedResponse = formatAgentResponse(response, activeView as AgentId);

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formattedResponse,
        sender: 'agent',
        timestamp: new Date(),
        agentType: activeView
      };

      setMessages(prev => ({
        ...prev,
        [activeView]: [...(prev[activeView] || []), agentMessage]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
        timestamp: new Date(),
        agentType: activeView
      };

      setMessages(prev => ({
        ...prev,
        [activeView]: [...(prev[activeView] || []), errorMessage]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Show idea modal if no idea is set
  if (!startupIdea) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Let's Build Your Startup
            </DialogTitle>
            <DialogDescription>
              First, what's your big idea? Describe your startup concept in detail to get personalized advice from your AI co-founders.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIdeaSubmit} className="grid gap-4 py-4">
            <textarea
              id="startup-idea"
              placeholder="e.g., An AI-powered app for personalized fitness plans that adapts to user preferences and provides real-time coaching..."
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              className="w-full min-h-[100px] resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Start Building
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex h-screen bg-secondary/40">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col">
        {activeView === 'boardroom' ? (
          <Boardroom startupIdea={startupIdea} />
        ) : (
          <>
            {/* Chat Header */}
            <div className="border-b bg-gradient-to-r from-white to-green-50 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {(() => {
                  const agent = getAgentInfo(activeView);
                  const IconComponent = agent.icon;
                  return (
                    <>
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                        <p className="text-sm text-gray-600 font-medium">Your AI Co-Founder • Ready to help</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-green-50 to-white">
              <div className="max-w-4xl mx-auto space-y-6">
                {currentMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                      <div className="text-[#1b4332] mb-4 text-lg font-bold">
                        Start a conversation with your {getAgentInfo(activeView).name}
                      </div>
                      <div className="text-md text-gray-500 bg-green-50 rounded-lg p-4 border-1 border-green-900">
                        <strong>Your startup idea:</strong> "{startupIdea}"
                      </div>
                    </div>
                  </div>
                ) : (
                  currentMessages.map((message: Message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      {message.sender === 'agent' && (
                        <div className="flex-shrink-0 mt-1">
                          {(() => {
                            const agent = getAgentInfo(activeView);
                            const IconComponent = agent.icon;
                            return (
                              <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                                <IconComponent className="h-5 w-5 text-white" />
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                        <Card className={`shadow-lg border-0 transition-all hover:shadow-xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-green-700 to-[#1b4332] text-white py-0 text-xl'
                            : 'bg-white border border-gray-100'
                        }`}>
                          <div className="p-5">
                            <div className={`text-sm leading-relaxed ${
                              message.sender === 'user' ? 'text-white' : 'text-gray-800'
                            }`}>
                              {message.sender === 'agent' ? (
                                <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:overflow-x-auto prose-pre:whitespace-pre prose-pre:text-xs">
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      pre: ({ children }) => (
                                        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-xs whitespace-pre max-w-full mt-3">
                                          {children}
                                        </pre>
                                      ),
                                      code: (props) => {
                                        const { inline, children, ...rest } = props as React.ComponentProps<'code'> & { inline?: boolean };
                                        if (inline) {
                                          return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs" {...rest}>{children}</code>
                                        }
                                        return (
                                          <code className="text-xs leading-relaxed block" {...rest}>
                                            {children}
                                          </code>
                                        )
                                      }
                                    }}
                                  >
                                    {message.content}
                                  </ReactMarkdown>
                                </div>
                              ) : (
                                <div className="whitespace-pre-wrap font-medium">{message.content}</div>
                              )}
                            </div>
                            <div className={`text-xs mt-3 pt-2 border-t ${
                              message.sender === 'user' 
                                ? 'text-green-100 border-green-500/20' 
                                : 'text-gray-400 border-gray-100'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </Card>
                      </div>

                      {message.sender === 'user' && (
                        <div className="flex-shrink-0 mt-1 order-2">
                          <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-lg">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex gap-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex-shrink-0 mt-1">
                      {(() => {
                        const agent = getAgentInfo(activeView);
                        const IconComponent = agent.icon;
                        return (
                          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                        );
                      })()}
                    </div>
                    <Card className="max-w-[75%] bg-white border border-gray-100 shadow-lg">
                      <div className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500 font-medium">Thinking...</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className=" border-gray-200 bg-white">
              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                placeholder={`Ask your ${getAgentInfo(activeView).name} about your startup...`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
