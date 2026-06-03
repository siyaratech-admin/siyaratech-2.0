"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Loader2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import EyeTrackingBot from './EyeTrackingBot';

const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:12345';
const AUTO_COLLAPSE_MS = 8000;

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

type WidgetState = 'pill' | 'bot' | 'chat';

export default function ChatWidget() {
    const [widgetState, setWidgetState] = useState<WidgetState>('pill');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm SIA, your AI assistant. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonReady, setIsButtonReady] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setTimeout(() => setIsButtonReady(true), 600);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, widgetState]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (widgetState === 'chat') setWidgetState('bot');
                else if (widgetState === 'bot') setWidgetState('pill');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [widgetState]);

    const resetIdleTimer = useCallback(() => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        if (widgetState === 'bot') {
            idleTimerRef.current = setTimeout(() => setWidgetState('pill'), AUTO_COLLAPSE_MS);
        }
    }, [widgetState]);

    useEffect(() => {
        resetIdleTimer();
        return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
    }, [widgetState, resetIdleTimer]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch(`${CHATBOT_API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    session_id: 'visitor-' + new Date().getDate()
                }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again later or contact support directly."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const isChat = widgetState === 'chat';
    const isBot  = widgetState === 'bot';
    const isPill = widgetState === 'pill';

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isChat && (
                    <motion.div
                        key="chat-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        onClick={() => setWidgetState('bot')}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <div
                className={`fixed bottom-8 right-0 z-50 flex flex-col items-end print:hidden transition-opacity duration-500 ${
                    isButtonReady ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {/* Chat panel */}
                <AnimatePresence>
                    {isChat && (
                        <motion.div
                            key="chat-panel"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: -24 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className="mb-4 w-[350px] sm:w-[400px] shadow-2xl rounded-2xl overflow-hidden border border-border/50"
                        >
                            <div className="flex flex-col h-[550px] bg-background/80 backdrop-blur-md shadow-inner relative">
                                {/* Header */}
                                <div className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-r from-brand-purple to-blue-600 shadow-md">
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
                                        onClick={() => setWidgetState('bot')}
                                    >
                                        <Minimize2 size={18} />
                                    </Button>
                                </div>

                                {/* Messages */}
                                <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-transparent" ref={scrollRef}>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-sm backdrop-blur-sm ${
                                                msg.role === 'user'
                                                    ? 'bg-primary/90 text-primary-foreground rounded-tr-none'
                                                    : 'bg-card/80 text-card-foreground rounded-tl-none border border-border/40'
                                            }`}>
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

                                {/* Input */}
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

                {/* Pill / Bot */}
                <div className="flex items-center justify-end">
                    <AnimatePresence mode="wait">

                        {/* ── PILL ── */}
                        {isPill && (
                            <motion.button
                                key="pill"
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 60, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                                whileHover={{ x: -3 }}
                                onClick={() => setWidgetState('bot')}
                                aria-label="Open SIA chat assistant"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    width: '36px',
                                    paddingTop: '14px',
                                    paddingBottom: '14px',
                                    borderRadius: '18px 0 0 18px',
                                    background: 'linear-gradient(170deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRight: 'none',
                                    boxShadow: '-3px 3px 20px rgba(99,60,220,0.45)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Shimmer */}
                                <span style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 50%)',
                                    borderRadius: 'inherit',
                                    pointerEvents: 'none',
                                }} />

                                {/* Live dot */}
                                <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
                                    <span className="animate-ping" style={{
                                        position: 'absolute', width: 12, height: 12, borderRadius: '50%',
                                        background: 'rgba(74,222,128,0.3)',
                                    }} />
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: '#4ade80',
                                        boxShadow: '0 0 6px rgba(74,222,128,0.9)',
                                        position: 'relative', zIndex: 1,
                                    }} />
                                </span>

                                {/* SIA — vertical, text only */}
                                <span style={{
                                    fontFamily: "'Outfit', 'Space Grotesk', system-ui, sans-serif",
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    letterSpacing: '0.2em',
                                    color: '#ffffff',
                                    writingMode: 'vertical-lr',
                                    transform: 'rotate(180deg)',
                                    lineHeight: 1,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.25)',
                                }}>
                                    SIA
                                </span>
                            </motion.button>
                        )}

                        {/* ── BOT / CHAT ── */}
                        {(isBot || isChat) && (
                            <motion.div
                                key="bot"
                                initial={{ scale: 0.4, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.4, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                                className="relative w-32 h-32 flex items-center justify-center mr-4"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (isChat) setWidgetState('bot');
                                        else setWidgetState('chat');
                                        resetIdleTimer();
                                    }}
                                    className="group relative flex h-32 w-32 items-center justify-center rounded-full z-[70] cursor-pointer outline-none focus:ring-2 focus:ring-brand-purple/50 shadow-lg overflow-visible"
                                    aria-label="Toggle Chat"
                                >
                                    <div className="relative z-[80] w-full h-full flex items-center justify-center">
                                        {isChat ? (
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

                                {/* Collapse to pill */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setWidgetState('pill'); }}
                                    className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-background border border-border/50 shadow flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-[90]"
                                    aria-label="Collapse widget"
                                >
                                    <X size={10} />
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}