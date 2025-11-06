'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2 } from 'lucide-react';

import { customerServiceChatbot } from '@/ai/flows/customer-service-chatbot';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'bot';
  text: string;
  escalated?: boolean;
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to bottom after render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await customerServiceChatbot({ query: input });
      const botMessage: Message = {
        role: 'bot',
        text: result.answer,
        escalated: result.escalate,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'bot',
        text: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Customer Service Chat</CardTitle>
        <CardDescription>
          Ask a question about our products, shipping, or returns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you today?</p>
                </div>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={cn("flex items-start gap-4", message.role === 'user' && "justify-end")}>
                {message.role === 'bot' && (
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                )}
                 <div className={cn("p-3 rounded-lg max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    <p className="text-sm">{message.text}</p>
                    {message.escalated && (
                        <p className="text-xs mt-2 p-2 bg-amber-100 dark:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800">
                            This seems outside my expertise. I'm escalating this to a human agent who can better assist you.
                        </p>
                    )}
                 </div>
                 {message.role === 'user' && (
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback><User size={18} /></AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <p className="text-sm">Thinking...</p>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
