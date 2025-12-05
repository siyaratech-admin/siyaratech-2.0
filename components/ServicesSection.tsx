"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cloud, Users, Code, Zap, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const services = [
    {
        icon: Brain,
        title: "AI & Automation",
        description: "Automate processes and improve decision-making with cutting-edge AI solutions.",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        icon: Cloud,
        title: "Cloud Services",
        description: "Scalable and secure cloud infrastructure to support your growing business needs.",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        icon: Users,
        title: "Talent Outsourcing",
        description: "Access top-tier IT talent to augment your team and accelerate development.",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        icon: Code,
        title: "Software Dev",
        description: "Custom software solutions tailored to your specific business challenges.",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
    },
    {
        icon: Zap,
        title: "Digital Transformation",
        description: "Modernize your operations and stay ahead in the digital age.",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    {
        icon: TrendingUp,
        title: "Business Consulting",
        description: "Strategic insights to optimize performance and drive sustainable growth.",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

import MagicBento, { BentoCardProps } from "@/components/MagicBento";

export default function ServicesSection() {
    const serviceCards: BentoCardProps[] = services.map(service => ({
        title: service.title,
        description: service.description,
        icon: service.icon,
        color: '#000000', // Dark background for cards
        textAutoHide: false,
        className: "md:col-span-1", // Default to single column
    }));

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary bg-primary/5">
                        Our Expertise
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Comprehensive <span className="text-primary">Tech Solutions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We deliver end-to-end technology services designed to transform your business and drive real results.
                    </p>
                </div>

                <div className="flex justify-center w-full">
                    <MagicBento
                        cards={serviceCards}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        glowColor="0, 100, 255" // Blue glow for services
                    />
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full px-8 h-12 text-base">
                        View All Services
                    </Button>
                </div>
            </div>
        </section>
    );
}
