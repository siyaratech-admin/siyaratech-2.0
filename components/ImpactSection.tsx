"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Layers, Cloud } from 'lucide-react';
import { NavbarButton } from './ui/resizable-navbar';
import { useRouter } from 'next/navigation';

export default function ImpactSection() {
    const stats = [
        { value: "50–70%", label: "Reduction in manual workload" },
        { value: "30%", label: "Faster project delivery" },
        { value: "40%", label: "Improved team productivity" },
        { value: "90%", label: "Fewer operational delays" },
        { value: "100%", label: "Transparency across departments" },
    ];

    const differentiators = [
        { title: "Unified Suite", text: "All modules talk to each other", icon: Layers },
        { title: "AI at the Core", text: "Real decision intelligence", icon: BrainIcon },
        { title: "Modular & Scalable", text: "Add features as you grow", icon: Zap },
        { title: "Cloud + Mobile-first", text: "Work anytime, anywhere", icon: Cloud },
        { title: "Secure Architecture", text: "Enterprise-grade protection", icon: Shield },
    ];

    const router = useRouter();

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Differentiators */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Siyaratech Different?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {differentiators.map((diff, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-card border border-border/50 rounded-2xl hover:shadow-lg transition-all">
                                <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
                                    <diff.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold mb-2">{diff.title}</h3>
                                <p className="text-sm text-muted-foreground">{diff.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-brand-gradient bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-black border border-border dark:border-white/10 p-12 md:p-20 text-center shadow-2xl shadow-brand-purple/5 dark:shadow-none">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 dark:bg-purple-500/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] rounded-full" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-light tracking-wide uppercase text-foreground dark:text-white mb-6">
                            Ready to modernize your business operations?
                        </h2>
                        <div className="text-2xl font-light text-muted-foreground dark:text-white/80 mb-8">
                            Siyaratech — <span className="font-bold text-foreground dark:text-white">ERP. CRM. AI.</span>
                            <br />
                            <span className="text-lg mt-2 block opacity-70">Everything your enterprise needs to scale.</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <NavbarButton
                                variant="gradient"
                                className="px-8 py-6 text-lg"
                                onClick={() => router.push('/contact')}
                            >
                                Request Free Demo
                            </NavbarButton>
                            <NavbarButton
                                variant="secondary"
                                className="px-8 py-6 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20"
                                onClick={() => router.push('/contact')}
                            >
                                Talk to an Expert
                            </NavbarButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
    )
}
