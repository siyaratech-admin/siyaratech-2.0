"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Building2, Factory, Users, ShoppingCart } from "lucide-react";

const clients = [
    {
        name: "TECHDIVEHUB",
        description: "AI-powered learning platform delivering personalized tech education experiences.",
        icon: Cpu,
    },
    {
        name: "KARAN BUILDERS",
        description: "Smart site management solution for real-time project tracking and automation.",
        icon: Building2,
    },
    {
        name: "SAI TEXTILES",
        description: "A digital B2B ecosystem streamlining loom manufacturing and supply chain operations.",
        icon: Factory,
    },
    {
        name: "SAMARTH GROUP",
        description: "Smart site management solution for real-time project tracking, CRM and automation.",
        icon: Users,
    },
    {
        name: "CONSORTIUM (US)",
        description: "Influencer-driven shopping platform connecting creators with curated product commerce.",
        icon: ShoppingCart,
    },
];

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-background/80 to-background/20 backdrop-blur-md px-8 py-16 shadow-2xl ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(147, 51, 234, 0.15), transparent 40%)`,
                }}
            />
            {/* Inner Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default function ClienteleSection() {
    return (
        <section className="py-24 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-light tracking-wide text-foreground dark:text-white uppercase mb-4">
                        Our Clientele
                    </h2>
                    <div className="h-1 w-24 bg-brand-gradient mx-auto rounded-full opacity-70" />
                </div>

                {/* Clients Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <SpotlightCard className="h-full group transition-colors hover:border-brand-purple/50">
                                <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                                    <div className="mb-5 p-4 rounded-full bg-primary/5 group-hover:bg-brand-purple/10 transition-colors flex items-center justify-center">
                                        <client.icon className="w-10 h-10 text-primary dark:text-white group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-lg font-bold tracking-wider mb-3 uppercase text-foreground dark:text-white group-hover:text-brand-purple transition-colors">
                                        {client.name}
                                    </h3>
                                    <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed font-light">
                                        {client.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-24 text-center border-t border-border/50 dark:border-white/10 pt-12"
                >
                    <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 font-light max-w-3xl mx-auto">
                        A successful partnership thrives on mutual <span className="text-foreground dark:text-white font-medium">trust</span>, <span className="text-foreground dark:text-white font-medium">respect</span>, and <span className="text-foreground dark:text-white font-medium">open communication</span>.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
