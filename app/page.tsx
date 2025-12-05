"use client";
import React from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import BlogSection from "@/components/BlogSection";
import LockScreenLoader from "@/components/LockScreenLoader";
import { useRouter } from "next/navigation";

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
        title="Transform Your Business with Cutting-Edge Technology"
        subtitle="Innovation That Drives Results"
        description="We help forward-thinking companies leverage AI, modern web technologies, and digital transformation to achieve unprecedented growth and efficiency."
        primaryCTA="Start Your Project"
        secondaryCTA="View Our Work"
        onPrimaryCTA={() => navigateTo("contact")}
        onSecondaryCTA={() => navigateTo("case-studies")}
      />

      {/* Services Section */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Products Section */}
      <ProductsSection />

      {/* Industries Section */}
      <IndustriesSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* About Section */}
      <AboutSection />

      {/* Blog Section */}
      <BlogSection />
    </>
  );
}