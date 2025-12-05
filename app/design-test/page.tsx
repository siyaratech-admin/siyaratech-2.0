"use client";

import HeroSectionGradient from "@/components/HeroSectionGradient";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";

export default function DesignTestPage() {
    return (
        <main className="min-h-screen bg-black">
            <ResizableNavbar />
            <HeroSectionGradient
                title="Transform Your Business with Cutting-Edge Technology"
                subtitle="Innovation That Drives Results"
                description="We help forward-thinking companies leverage AI, modern web technologies, and digital transformation to achieve unprecedented growth and efficiency."
                primaryCTA="Start Your Project"
                secondaryCTA="View Our Work"
                onPrimaryCTA={() => console.log("Primary CTA clicked")}
                onSecondaryCTA={() => console.log("Secondary CTA clicked")}
            />
        </main>
    );
}
