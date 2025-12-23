"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";

export default function ServicesPage() {
  const router = useRouter();

  const handleServiceClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  const serviceCards: BentoCardProps[] = services.map(service => ({
    title: service.title,
    description: service.description,
    icon: service.icon,
    color: '#000000', // Dark background for cards
    textAutoHide: false,
    image: service.image,
    className: "md:col-span-1 cursor-pointer", // Default to single column
    onClick: () => handleServiceClick(service.id),
  }));


  return (
    <div className="">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive Technology Solutions"
        description="From AI implementation to complete digital transformations, we provide cutting-edge technology services that drive measurable business results."
        badge="What We Do"
      />

      {/* Services Grid Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-center w-full">
            <MagicBento
              cards={serviceCards}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              glowColor="0, 100, 255" // Blue glow for services
            />
          </div>
        </div>
      </section>
    </div>
  );
}