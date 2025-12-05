"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Rocket, Shield, Heart } from 'lucide-react';
import FoundersSection from '@/components/FoundersSection';
import Image from 'next/image';

export default function AboutPage() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="pt-16">
      <PageHeader
        title="About FutureTech"
        subtitle="Innovation Driven by Purpose"
        description="We're a team of passionate technologists, strategists, and innovators dedicated to helping businesses thrive in the digital age."
        badge="Who We Are"
      />

      {/* Company Story */}
      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Founded on Innovation</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2014, FutureTech emerged from a simple belief: technology should empower businesses to achieve extraordinary results. What started as a small team of developers has grown into a comprehensive technology consultancy serving Fortune 500 companies worldwide.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our mission is to bridge the gap between cutting-edge technology and practical business solutions. We don&apos;t just build software – we craft digital experiences that transform how organizations operate, compete, and grow.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: 'Projects Completed' },
                  { value: '50+', label: 'Team Members' },
                  { value: '10+', label: 'Years Experience' },
                  { value: '25+', label: 'Countries Served' }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
                alt="Team collaboration"
                className="rounded-lg shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-1/20 rounded-lg group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <FoundersSection />

      {/* Values */}
      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Our Values
            </Badge>
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: 'Innovation First', description: 'We constantly explore emerging technologies to give our clients competitive advantages.' },
              { icon: Shield, title: 'Quality Guaranteed', description: 'Every solution we deliver meets the highest standards of security, performance, and reliability.' },
              { icon: Heart, title: 'Client Success', description: 'Your success is our success. We measure our impact by the results we deliver for you.' }
            ].map((value, index) => (
              <Card key={index} className="text-center p-8 border-border/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}