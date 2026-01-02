"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import EyeTrackingBot from './EyeTrackingBot';

// Configure the Chatbot API URL
const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:12345';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm SIA, your AI assistant. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonReady, setIsButtonReady] = useState(false); // Triggers appearance

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Trigger button appearance
        setTimeout(() => setIsButtonReady(true), 500);
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg: Message = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch(`${CHATBOT_API_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg.content,
                    session_id: 'visitor-' + new Date().getDate() // Simple session ID for now
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            // Add assistant response
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting to my brain right now. Please try again later or contact support directly."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden transition-opacity duration-500 ${isButtonReady ? 'opacity-100' : 'opacity-0'}`}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 w-[350px] sm:w-[400px] shadow-2xl rounded-2xl overflow-hidden border border-border/50"
                        >
                            <div className="flex flex-col h-[550px] bg-background/80 backdrop-blur-md shadow-inner relative">
                                {/* Header */}
                                <div className="relative z-10 p-4 bg-primary text-primary-foreground flex justify-between items-center bg-gradient-to-r from-brand-purple to-blue-600 shadow-md">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                            <MessageSquare size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-white">SIA</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                                <span className="text-xs text-white/90 font-medium">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/20 h-8 w-8 rounded-full transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Minimize2 size={18} />
                                    </Button>
                                </div>

                                {/* Messages Area */}
                                <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-transparent" ref={scrollRef}>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            key={idx}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm backdrop-blur-sm ${msg.role === 'user'
                                                    ? 'bg-primary/90 text-primary-foreground rounded-tr-none'
                                                    : 'bg-card/80 text-card-foreground rounded-tl-none border border-border/40'
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-card/80 text-card-foreground rounded-2xl rounded-tl-none px-4 py-3 border border-border/40 flex items-center gap-2 shadow-sm backdrop-blur-sm">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                                <span className="text-xs text-muted-foreground font-medium">SIA is thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="relative z-10 p-4 border-t border-border/40 bg-background/40 backdrop-blur-md">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Ask us anything..."
                                            className="flex-1 bg-background/50 border-border/50 focus-visible:ring-brand-purple/50 rounded-full px-4"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            disabled={isLoading || !inputValue.trim()}
                                            className="rounded-full bg-brand-purple hover:bg-brand-purple/90 shrink-0 shadow-lg shadow-brand-purple/20"
                                        >
                                            <Send size={18} />
                                        </Button>
                                    </form>
                                    <div className="text-center mt-2">
                                        <span className="text-[10px] text-muted-foreground">Powered by Siyaratech AI</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Increased size: w-32 h-32 (128px). Added padding to prevent bounce clipping */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        // Updated to h-32 w-32. Added overflow-visible to ensure SVG bounce isn't cut off
                        className="group relative flex h-32 w-32 items-center justify-center rounded-full z-[70] cursor-pointer outline-none focus:ring-2 focus:ring-brand-purple/50 shadow-lg overflow-visible"
                        aria-label="Toggle Chat"
                    >
                        <div className="relative z-[80] w-full h-full flex items-center justify-center">
                            {/* If Open: Show X. If Closed: Show EyeTrackingBot */}
                            {isOpen ? (
                                <div className="bg-brand-purple w-full h-full rounded-full flex items-center justify-center border border-brand-purple/30">
                                    <X size={28} className="text-white" />
                                </div>
                            ) : (
                                <div className="w-full h-full">
                                    <EyeTrackingBot />
                                </div>
                            )}
                        </div>
                    </motion.button>
                </div>
            </div>
        </>
    );
}
