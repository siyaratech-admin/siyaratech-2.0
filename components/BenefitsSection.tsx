"use client";

import React from "react";
import { Shield } from "lucide-react";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";

interface BenefitsSectionProps {
    title: string;
    benefits: { title: string; description: string }[];
}

export default function BenefitsSection({ title, benefits }: BenefitsSectionProps) {
    if (!benefits || benefits.length === 0) return null;

    const benefitCards: BentoCardProps[] = benefits.map((benefit) => ({
        title: benefit.title,
        description: benefit.description,
        icon: Shield,
        color: '#0a0a0a',
        textAutoHide: false,
        className: "col-span-1 md:col-span-2 lg:col-span-1"
    }));

    return (
        <section className="py-24 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose {title}?</h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">Built to solve the most critical challenges in your industry.</p>
                </div>

                <div className="flex justify-center w-full">
                    <MagicBento
                        cards={benefitCards}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        glowColor="120, 50, 255"
                    />
                </div>
            </div>
        </section>
    );
}
