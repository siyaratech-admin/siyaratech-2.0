"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    className?: string;
}

export default function PageHeader({
    title,
    subtitle,
    description,
    badge,
    className = "",
}: PageHeaderProps) {
    return (
        <section className={`relative pt-32 pb-20 overflow-hidden ${className}`}>
            {/* Background Elements - Subtle and dark to match theme */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {badge && (
                        <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5 px-4 py-2">
                            {badge}
                        </Badge>
                    )}

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
                        {title}
                    </h1>

                    {subtitle && (
                        <h2 className="text-xl md:text-2xl font-medium text-primary mb-6">
                            {subtitle}
                        </h2>
                    )}

                    {description && (
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
