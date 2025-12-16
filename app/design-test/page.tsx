"use client";

import HeroSectionGradient from "@/components/HeroSectionGradient";
import { Navbar, NavBody, NavItems } from "@/components/ui/resizable-navbar";
import { NavbarLogo, NavbarButton } from "@/components/ui/resizable-navbar";

export default function DesignTestPage() {
    return (
        <main className="min-h-screen bg-black">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={[
                        { name: "Home", link: "/" },
                        { name: "About", link: "/about" },
                        { name: "Services", link: "/services" }
                    ]} />
                    <NavbarButton>Contact</NavbarButton>
                </NavBody>
            </Navbar>
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
