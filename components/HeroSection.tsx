import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Play, Star, Users, Award, Zap } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  onPrimaryCTA: () => void;
  onSecondaryCTA?: () => void;
  showStats?: boolean;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  onPrimaryCTA,
  onSecondaryCTA,
  showStats = true
}: HeroSectionProps) {
  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Star, value: '99%', label: 'Success Rate' },
    { icon: Award, value: '50+', label: 'Awards Won' },
    { icon: Zap, value: '10+', label: 'Years Experience' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-chart-2/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-chart-1/5"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(138,58,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(138,58,170,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 text-sm px-6 py-3 hover:scale-105 transition-transform duration-300">
            <Zap className="w-4 h-4 mr-2" />
            {subtitle}
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-brand-gradient bg-clip-text">
              {title}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-brand-gradient hover:bg-brand-gradient-hover text-white px-10 py-4 text-lg font-semibold hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-primary/25 group"
              onClick={onPrimaryCTA}
            >
              {primaryCTA}
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            {secondaryCTA && onSecondaryCTA && (
              <Button 
                size="lg" 
                variant="outline"
                className="px-10 py-4 text-lg font-semibold hover:scale-110 transition-all duration-300 border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary group"
                onClick={onSecondaryCTA}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {secondaryCTA}
              </Button>
            )}
          </div>

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-chart-1/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative">
                      <div className="absolute inset-0 bg-brand-gradient rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <stat.icon className="w-6 h-6 text-primary relative z-10" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-brand-gradient mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Floating Action Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-brand-gradient rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-chart-1 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-chart-2 rounded-full animate-ping delay-2000"></div>
    </section>
  );
}