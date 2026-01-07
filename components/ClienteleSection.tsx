"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Building2, Factory, Users, ShoppingCart } from "lucide-react";
import Marquee from "@/components/ui/marquee";

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

// Optimized static card with CSS-only interactions
const ClientCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl px-4 py-5 
            border border-white/5 bg-gradient-to-b from-white/5 to-transparent transition-all duration-300
            hover:border-brand-purple/50 hover:bg-white/10 ${className}`}
        >
            {/* Inner Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default function ClienteleSection() {
    return (
        <section className="py-24 relative overflow-hidden">

            <div className="max-w-[100vw] mx-auto px-0 relative z-10">

                {/* Header */}
                <div className="mb-12 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wide text-foreground dark:text-white uppercase mb-4">
                        Our Clientele
                    </h2>
                    <div className="h-1 w-24 bg-brand-gradient mx-auto rounded-full opacity-70" />
                </div>

                {/* Marquee */}
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:40s]">
                        {clients.map((client, index) => (
                            <div key={index} className="mx-3 h-full w-48 md:w-60">
                                <ClientCard className="h-full group">
                                    <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
                                        <div className="mb-3 p-3 rounded-full bg-primary/5 group-hover:bg-brand-purple/10 transition-colors flex items-center justify-center">
                                            <client.icon className="w-6 h-6 text-primary dark:text-white group-hover:scale-110 transition-transform duration-300 stroke-[1.5]" />
                                        </div>
                                        <h3 className="text-sm font-bold tracking-wider mb-2 uppercase text-foreground dark:text-white group-hover:text-brand-purple transition-colors">
                                            {client.name}
                                        </h3>
                                        <p className="text-muted-foreground dark:text-gray-400 text-xs leading-relaxed font-light">
                                            {client.description}
                                        </p>
                                    </div>
                                </ClientCard>
                            </div>
                        ))}
                    </Marquee>
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center border-t border-border/50 dark:border-white/10 pt-12 px-4"
                >
                    <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 font-light max-w-3xl mx-auto">
                        A successful partnership thrives on mutual <span className="text-foreground dark:text-white font-medium">trust</span>, <span className="text-foreground dark:text-white font-medium">respect</span>, and <span className="text-foreground dark:text-white font-medium">open communication</span>.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
