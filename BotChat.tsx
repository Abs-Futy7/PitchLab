"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ChatInput from '@/components/ChatInput';
import { askGemini } from '@/lib/gemini';
import { User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

type AgentId = 'cto' | 'cmo' | 'cfo' | 'architect';

interface BotChatProps {
  agentId: AgentId;
  agentName: string;
  agentIcon: React.ComponentType<any>;
  agentColor: string;
  agentDescription: string;
}

function BotChat({ agentId, agentName, agentIcon: IconComponent, agentColor, agentDescription }: BotChatProps) {
  const [startupIdea, setStartupIdea] = useState<string>('');
  const [ideaInput, setIdeaInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load startup idea from localStorage if available
  useEffect(() => {
    const savedIdea = localStorage.getItem('startupIdea');
    if (savedIdea) {
      setStartupIdea(savedIdea);
    }
  }, []);

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim()) {
      setStartupIdea(ideaInput);
      localStorage.setItem('startupIdea', ideaInput);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!startupIdea) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askGemini({
        userMessage: messageContent,
        agent: agentId,
        startupIdea
      });

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  
  if (!startupIdea) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Build Your Startup
            </DialogTitle>
            <DialogDescription>
              First, what's your big idea? Describe your startup concept to get personalized advice from your {agentName}.
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
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Building with {agentName}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-secondary/40">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center gap-3">
          <Link href="/chat" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className={`p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg`}>
            <IconComponent className={`h-6 w-6 ${agentColor}`} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{agentName}</h1>
            <p className="text-sm text-muted-foreground">{agentDescription}</p>
          </div>
        </div>
      </div>

      {/* Startup Idea Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b p-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Your Startup:</span> {startupIdea}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className={`mx-auto mb-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-fit`}>
              <IconComponent className={`h-8 w-8 ${agentColor}`} />
            </div>
            <div className="text-lg font-semibold mb-2">
              Welcome to {agentName}!
            </div>
            <div className="text-muted-foreground mb-4">
              I'm here to help you with {agentDescription.toLowerCase()}
            </div>
            <div className="text-sm text-muted-foreground max-w-md mx-auto">
              Ask me anything about your startup: "{startupIdea}"
            </div>
          </div>
        ) : (
          messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'agent' && (
                <div className="flex-shrink-0">
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    <IconComponent className={`h-4 w-4 ${agentColor}`} />
                  </div>
                </div>
              )}
              
              <Card className={`max-w-[70%] p-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-background'
              }`}>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </Card>

              {message.sender === 'user' && (
                <div className="flex-shrink-0">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                <IconComponent className={`h-4 w-4 ${agentColor}`} />
              </div>
            </div>
            <Card className="max-w-[70%] p-3 bg-background">
              <div className="flex items-center gap-2">
                <div className="animate-pulse text-sm text-muted-foreground">
                  {agentName} is thinking...
                </div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder={`Ask your ${agentName} about your startup...`}
      />
    </div>
  );
}

export default BotChat;
