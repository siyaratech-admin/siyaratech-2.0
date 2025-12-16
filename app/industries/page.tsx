"use client";
import React from "react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  DollarSign,
  Factory,
  ShoppingBag,
  GraduationCap,
  Laptop,
} from "lucide-react";
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

export default function IndustriesPage() {


  // ... (industries data remains the same)
  const industries = [
    {
      Icon: Heart,
      name: "Healthcare",
      description:
        "Revolutionize patient care and streamline operations with our cutting-edge healthcare solutions.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
          alt="Healthcare background"
          fill
        />
      ),
      className: "md:col-span-2",
    },
    {
      Icon: DollarSign,
      name: "Finance",
      description:
        "Transform your financial services with our innovative technology solutions and expert consulting.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
          alt="Finance background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Factory,
      name: "Manufacturing",
      description:
        "Optimize your manufacturing processes and drive innovation with our industry-specific solutions.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop"
          alt="Manufacturing background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: ShoppingBag,
      name: "Retail",
      description:
        "Elevate your retail business with our cutting-edge technology solutions and strategic consulting.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
          alt="Retail background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: GraduationCap,
      name: "Education",
      description:
        "Empowering institutions with innovative educational technology solutions.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
          alt="Education background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Laptop,
      name: "Technology",
      description:
        "Partnering with tech companies for innovative software development and IT services.",
      href: "/contact",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop"
          alt="Technology background"
          fill
        />
      ),
      className: "md:col-span-3",
    },
  ];

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
    <div className="">

      <PageHeader
        title="Industries We Serve"
        subtitle="Delivering Specialized Solutions Across Diverse Industries"
        description="With deep domain expertise and cutting-edge technology, we help businesses across multiple industries transform their operations and achieve sustainable growth."
        badge="Our Expertise"
      />

      <section className="pb-24 bg-gradient-to-b from-background via-background/95 to-accent/5 transition-colors duration-300">
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

          {/* Industry Stats */}
          <div className="mt-32">
            {/* ... stats section remains the same */}
          </div>

          {/* Why Choose Our Industry Solutions - UPDATED SECTION */}
          <div className="mt-32">
            <div className="text-center mb-20">

              <h2 className="text-4xl md:text-5xl font-bold mb-6 
    bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange 
    bg-clip-text text-transparent">                Why Choose Our Industry Solutions
              </h2>
            </div>
            <FeaturesGrid features={advantages} cols={3} />
          </div>
        </div>
      </section>
    </div>
  );
}