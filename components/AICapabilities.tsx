"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CpuArchitecture } from '@/components/ui/cpu-architecture';
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
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/5">
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
                        <div className="p-8 rounded-3xl border border-border/50 bg-black/50 backdrop-blur-sm relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                            <div className="relative z-10 flex flex-col items-center">
                                <h3 className="text-xl font-bold mb-8 text-center text-white/80">Neural Core Architecture</h3>
                                <div className="w-full max-w-lg">
                                    <CpuArchitecture text="AI AGENT" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
