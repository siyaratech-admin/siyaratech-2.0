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
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Innovating for the Future</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SIYARATECH INNOVATIONS is at the forefront of the digital revolution, providing cutting-edge solutions that bridge the gap between complex technology and business needs.
            We are dedicated to empowering organizations through Artificial Intelligence, Machine Learning, and robust Cloud Infrastructure.
            Our team of experts works tirelessly to deliver custom software, enterprise resource planning (ERP) systems, and AI-driven automation that streamline operations and drive exponential growth.
            Whether you are a startup looking to scale or an enterprise seeking digital transformation, Siyaratech is your trusted partner in navigating the ever-evolving tech landscape.
          </p>
        </div>
      </section>

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