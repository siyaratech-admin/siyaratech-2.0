"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { Bot, LineChart, FileText, MessageSquare, AlertTriangle, Workflow } from 'lucide-react';

export default function AICapabilities() {
    const capabilities = [
        {
            text: "Auto-generate reports & insights",
            icon: FileText,
        },
        {
            text: "Predict risks, delays & financial leakages",
            icon: AlertTriangle,
        },
        {
            text: "Auto-create tasks, alerts, escalations",
            icon: Workflow,
        },
        {
            text: "Assist employees with chat-style help",
            icon: MessageSquare,
        },
        {
            text: "Analyze patterns to suggest improvements",
            icon: LineChart,
        },
        {
            text: "Manage workflows without human intervention",
            icon: Bot,
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                AI Agent Capabilities <br />
                                <span className="text-brand-gradient bg-clip-text text-transparent">Across the Platform</span>
                            </h2>
                            <p className="text-xl text-muted-foreground mb-12">
                                Siyaratech AI Agents automate repetitive tasks and provide intelligent recommendations, acting as a force multiplier for your team.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {capabilities.map((cap, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start space-x-3 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors shadow-sm"
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                                            <cap.icon className="h-5 w-5" />
                                        </div>
                                        <p className="font-medium text-foreground/90 leading-tight">
                                            {cap.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative">
                        {/* CPU Architecture Visualization reused here or keep specific visual */}
                        <div className="p-0 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                            {/* Reusing OrbitingCircles components directly here since it's cleaner than duplicating the whole block multiple times
                                Ideally, we should componentize this "SiyaratechOrbit", but for now copying the optimized version.
                            */}
                            <div className="relative flex h-[500px] w-full max-w-[500px] flex-col items-center justify-center overflow-hidden rounded-lg bg-background/0">
                                {/* Central AI Node */}
                                <div className="z-10 flex flex-col items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-indigo-600 shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] ring-4 ring-white/20 backdrop-blur-xl animate-pulse">
                                        <Bot className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="mt-3 rounded-full border border-border/50 bg-background/50 px-3 py-1 backdrop-blur-md shadow-sm">
                                        <span className="text-[10px] font-bold tracking-widest text-foreground uppercase">Agent Core</span>
                                    </div>
                                </div>

                                {/* Inner Ring */}
                                <OrbitingCircles className="h-12 w-12 border border-border/40 bg-background backdrop-blur-md shadow-lg" duration={35} delay={0} radius={100}>
                                    <FileText className="h-5 w-5 text-blue-500" />
                                </OrbitingCircles>
                                <OrbitingCircles className="h-12 w-12 border border-border/40 bg-background backdrop-blur-md shadow-lg" duration={35} delay={12} radius={100}>
                                    <MessageSquare className="h-5 w-5 text-emerald-500" />
                                </OrbitingCircles>
                                <OrbitingCircles className="h-12 w-12 border border-border/40 bg-background backdrop-blur-md shadow-lg" duration={35} delay={24} radius={100}>
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                </OrbitingCircles>

                                {/* Outer Ring */}
                                <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background backdrop-blur-md shadow-lg" radius={180} duration={50} reverse>
                                    <Workflow className="h-6 w-6 text-purple-500" />
                                </OrbitingCircles>
                                <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background backdrop-blur-md shadow-lg" radius={180} duration={50} delay={17} reverse>
                                    <LineChart className="h-6 w-6 text-pink-500" />
                                </OrbitingCircles>
                                <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background backdrop-blur-md shadow-lg" radius={180} duration={50} delay={34} reverse>
                                    <Bot className="h-6 w-6 text-cyan-500" />
                                </OrbitingCircles>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
