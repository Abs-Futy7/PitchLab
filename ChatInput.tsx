import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

function ChatInput({ onSendMessage, isLoading = false, placeholder = "Ask your AI co-founder..." }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-[#95d5b2]/0 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full resize-none rounded-lg border bg-[#d8f3dc] px-3 py-2 text-md  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:none disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] max-h-32 "
            rows={1}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          size="lg" 
          disabled={!message.trim() || isLoading}
          className="px-3 bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
