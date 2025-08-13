"use client";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Target, 
  Globe, 
  Heart, 
  Coffee, 
  Award, 
  ArrowRight,
  Briefcase,
  MapPin
} from 'lucide-react';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Join our AI team to build cutting-edge machine learning solutions for enterprise clients.'
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Build scalable web applications using React, Node.js, and modern cloud technologies.'
    },
    {
      title: 'Digital Transformation Consultant',
      department: 'Consulting',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '7+ years',
      description: 'Help enterprises modernize their operations and embrace digital technologies.'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Design beautiful, intuitive interfaces for complex enterprise applications.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'London, UK',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build and maintain scalable infrastructure for our global client base.'
    },
    {
      title: 'Data Scientist',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Extract insights from complex datasets to drive business decisions for our clients.'
    }
  ];

  return (
    <div className="pt-16">
      <HeroSection
        title="Join Our Team"
        subtitle="Shape the Future of Technology"
        description="Work with cutting-edge technologies, solve complex challenges, and help build the future alongside passionate, talented colleagues."
        primaryCTA="View Open Positions"
        secondaryCTA="Learn About Culture"
        onPrimaryCTA={() => {}}
        onSecondaryCTA={() => {}}
        showStats={false}
      />

      {/* Why Work Here */}
      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Why FutureTech
            </Badge>
            <h2 className="text-3xl font-bold mb-4">More Than Just a Job</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in creating an environment where innovation thrives, careers grow, and people love coming to work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: 'Cutting-Edge Projects', description: 'Work on innovative AI, web, and digital transformation projects for leading companies.' },
              { icon: Target, title: 'Career Growth', description: 'Clear advancement paths, mentorship programs, and $5k annual learning budget.' },
              { icon: Globe, title: 'Remote-First Culture', description: 'Work from anywhere with flexible hours and quarterly team retreats.' },
              { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance, mental health support, and wellness stipends.' },
              { icon: Coffee, title: 'Work-Life Balance', description: 'Unlimited PTO, sabbatical options, and respect for personal time.' },
              { icon: Award, title: 'Competitive Package', description: 'Top-tier compensation, equity participation, and performance bonuses.' }
            ].map((benefit, index) => (
              <Card key={index} className="p-6 border-border/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <benefit.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Open Positions
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our current openings and find the perfect role to advance your career.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-6 border-border/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{position.title}</h3>
                      <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{position.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-3">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                      <span>{position.experience}</span>
                    </div>
                    <p className="text-muted-foreground">{position.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Button className="bg-gradient-to-r from-primary to-chart-1 text-primary-foreground hover:scale-105 transition-transform duration-200">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Don't see the perfect role? We're always looking for exceptional talent.
            </p>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-200">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}