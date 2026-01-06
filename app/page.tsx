"use client";
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AICapabilities from "@/components/AICapabilities";
import { useRouter } from "next/navigation";

import LockScreenLoader from "@/components/LockScreenLoader";
import ImpactSection from "@/components/ImpactSection";

import ServicesSection from "@/components/ServicesSection";

import IndustriesSection from "@/components/IndustriesSection";

import ClienteleSection from "@/components/ClienteleSection";
import InnovatingSection from "@/components/InnovatingSection";

export default function HomePage() {
  const router = useRouter();

  // Force scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateTo = (page: string) => {
    const path = page === "home" ? "/" : `/${page}`;
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <LockScreenLoader checkSession={true} />

      {/* Hero Section */}
      <HeroSection
        title="Run Your Business on One Intelligent Platform"
        description="Siyaratech delivers an all-in-one ERP, CRM & AI Agent ecosystem designed to simplify operations, eliminate manual work, and unlock real-time business insights."
        primaryCTA="Get Demo"
        secondaryCTA="Explore Products"
        onPrimaryCTA={() => navigateTo("contact")}
        onSecondaryCTA={() => navigateTo("#products")}
      />

      {/* About Siyaratech (SEO Content) */}
      {/* About Siyaratech (SEO Content) */}
      <InnovatingSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Products Section (ERP Solutions) */}
      <ProductsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Industries Section */}
      <IndustriesSection />

      {/* AI Capabilities */}
      <AICapabilities />

      {/* Clientele Section */}
      <ClienteleSection />

      {/* Impact & CTA */}
      <ImpactSection />
    </>
  );
}