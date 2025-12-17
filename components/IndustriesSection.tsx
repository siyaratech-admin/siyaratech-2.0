"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import {
    IconBriefcase,
    IconShieldLock,
    IconRocket,
    IconChartBar,
    IconBulb,
    IconUsersGroup,
} from "@tabler/icons-react";
import { industries as industriesData } from "@/lib/data";

export default function IndustriesSection() {

    const industries = industriesData.map((industry) => ({
        Icon: industry.icon,
        name: industry.name,
        description: industry.description,
        href: `/industries/${industry.id}`,
        cta: industry.cta,
        background: (
            <Image
                className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
                src={industry.backgroundImage}
                alt={`${industry.name} background`}
                fill
            />
        ),
        className: industry.className,
    }));

    const advantages = [
        {
            title: "Industry-Specific Expertise",
            description:
                "Our teams have deep knowledge of industry regulations, best practices, and unique challenges.",
            icon: <IconBriefcase className="h-8 w-8" />,
        },
        {
            title: "Compliance & Security",
            description:
                "We ensure all solutions meet industry-specific compliance requirements and security standards.",
            icon: <IconShieldLock className="h-8 w-8" />,
        },
        {
            title: "Rapid Implementation",
            description:
                "Pre-built industry modules and templates accelerate deployment and reduce time-to-value.",
            icon: <IconRocket className="h-8 w-8" />,
        },
        {
            title: "Industry Benchmarking",
            description:
                "Compare your performance against industry standards and identify improvement opportunities.",
            icon: <IconChartBar className="h-8 w-8" />,
        },
        {
            title: "Continuous Innovation",
            description:
                "Stay ahead with regular updates based on industry trends and emerging technologies.",
            icon: <IconBulb className="h-8 w-8" />,
        },
        {
            title: "Partnership Ecosystem",
            description:
                "Access to industry partners, vendors, and specialists for comprehensive solutions.",
            icon: <IconUsersGroup className="h-8 w-8" />,
        },
    ];

    return (
        <section id="industries" className="py-24 bg-gradient-to-b from-background via-background/95 to-accent/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                        Industry Expertise
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
                        Deep Domain Knowledge
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        We understand that each industry has unique challenges and
                        requirements. Our specialized solutions are designed to address
                        specific industry needs while leveraging the latest technologies.
                    </p>
                </div>

                <BentoGrid>
                    {industries.map((industry, index) => (
                        <BentoCard key={index} {...industry} />
                    ))}
                </BentoGrid>

                {/* Why Choose Our Industry Solutions */}
                <div className="mt-32">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange bg-clip-text text-transparent">
                            Why Choose Our Industry Solutions
                        </h2>
                    </div>
                    <FeaturesGrid features={advantages} cols={3} />
                </div>
            </div>
        </section>
    );
}
