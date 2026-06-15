"use client";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { services } from "@/lib/data";
import { useRouter } from "next/navigation";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";
import { SectionLightRay } from "@/components/SectionLightRay";

export default function ServicesSection() {
    const router = useRouter();
    const handleServiceClick = (slug: string) => router.push(`/services/${slug}`);

    const serviceCards: BentoCardProps[] = services.map((service) => ({
        title: service.title, description: service.description,
        icon: service.icon, color: "#000000", textAutoHide: false,
        image: service.image, className: "md:col-span-1 cursor-pointer",
        onClick: () => handleServiceClick(service.id),
    }));

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <SectionLightRay segmentStart={0.5} segmentEnd={0.625} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary bg-primary/5">Our Expertise</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Comprehensive <span className="text-primary">Tech Solutions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We deliver end-to-end technology services designed to transform your business and drive real results.</p>
                </div>
                <div className="flex justify-center w-full">
                    <MagicBento cards={serviceCards} enableStars enableSpotlight enableBorderGlow enableTilt glowColor="0, 100, 255" />
                </div>
                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full px-8 h-12 text-base">View All Services</Button>
                </div>
            </div>
        </section>
    );
}