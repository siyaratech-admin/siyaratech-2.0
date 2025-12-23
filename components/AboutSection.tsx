"use client";
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Shield, Heart } from 'lucide-react';
import FoundersSection from '@/components/FoundersSection';

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-20">
                    <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/5 px-4 py-2">
                        Who We Are
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Innovation Driven by <span className="text-primary">Purpose</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We&apos;re a team of passionate technologists, strategists, and innovators dedicated to helping businesses thrive in the digital age.
                    </p>
                </div>

                {/* Company Story */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl" />
                        <Image
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                            alt="Team collaboration"
                            width={800}
                            height={600}
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold mb-6">Our Story</h3>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            Founded with a vision to bridge the gap between complex technology and business value, Siyaratech has grown from a small consultancy to a global technology partner.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We believe that technology should be an enabler, not a barrier. Our mission is to democratize access to cutting-edge solutions and empower organizations of all sizes to achieve their full potential.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        {
                            icon: Rocket,
                            title: "Innovation First",
                            description: "We constantly push boundaries to deliver forward-thinking solutions."
                        },
                        {
                            icon: Shield,
                            title: "Trust & Integrity",
                            description: "We build lasting partnerships based on transparency and reliability."
                        },
                        {
                            icon: Heart,
                            title: "Client Success",
                            description: "Your growth is our priority. We succeed when you succeed."
                        }
                    ].map((value, index) => (
                        <Card key={index} className="p-8 border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                <value.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                            <p className="text-muted-foreground">{value.description}</p>
                        </Card>
                    ))}
                </div>

                {/* Founders Section */}
                <FoundersSection />
            </div>
        </section>
    );
}
