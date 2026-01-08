"use client";
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";


const ProductsSection = dynamic(() => import("@/components/ProductsSection"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const AICapabilities = dynamic(() => import("@/components/AICapabilities"));
const ImpactSection = dynamic(() => import("@/components/ImpactSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const IndustriesSection = dynamic(() => import("@/components/IndustriesSection"));
const ClienteleSection = dynamic(() => import("@/components/ClienteleSection"));
const InnovatingSection = dynamic(() => import("@/components/InnovatingSection"));

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


      {/* Hero Section */}
      {/* Hero Section - Wrapped to prevent layout shift */}
      <div className="min-h-screen w-full relative">
        <HeroSection
          title="Run Your Business on One Intelligent Platform"
          description="Siyaratech delivers an all-in-one ERP, CRM & AI Agent ecosystem designed to simplify operations, eliminate manual work, and unlock real-time business insights."
          primaryCTA="Get Demo"
          secondaryCTA="Explore Products"
          onPrimaryCTA={() => navigateTo("contact")}
          onSecondaryCTA={() => navigateTo("#products")}
        />
      </div>

      {/* About Siyaratech (SEO Content) */}
      {/* About Siyaratech (SEO Content) */}
      {/* About Siyaratech (SEO Content) */}
      <InnovatingSection />

      {/* Clientele Section */}
      <ClienteleSection />

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

      {/* Impact & CTA */}
      <ImpactSection />
    </>
  );
}