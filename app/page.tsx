"use client";
import React from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AICapabilities from "@/components/AICapabilities";
import ImpactSection from "@/components/ImpactSection";
import { useRouter } from "next/navigation";

import V0ParticleAnimation from "@/components/v0-particle-animation";
import LockScreenLoader from "@/components/LockScreenLoader";

export default function HomePage() {
  const router = useRouter();

  const navigateTo = (page: string) => {
    const path = page === "home" ? "/" : `/${page}`;
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <LockScreenLoader />

      {/* Hero Section */}
      <HeroSection
        title="Run Your Business on One Intelligent Platform"
        description="Siyaratech delivers an all-in-one ERP, CRM & AI Agent ecosystem designed to simplify operations, eliminate manual work, and unlock real-time business insights."
        primaryCTA="Get Demo"
        secondaryCTA="Explore Products"
        onPrimaryCTA={() => navigateTo("contact")}
        onSecondaryCTA={() => navigateTo("#products")}
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Products Section (ERP Solutions) */}
      <ProductsSection />

      {/* AI Capabilities */}
      <AICapabilities />

      {/* Impact & CTA */}
      <ImpactSection />
    </>
  );
}