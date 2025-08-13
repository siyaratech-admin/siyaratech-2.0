"use client";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import IndustryCard from '@/components/IndustryCard';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  DollarSign, 
  Factory, 
  ShoppingBag, 
  GraduationCap, 
  Laptop 
} from 'lucide-react';

export default function IndustriesPage() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const industries = [
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Revolutionize patient care and streamline operations with our cutting-edge healthcare solutions.',
      category: 'Healthcare',
      backgroundImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'Electronic Health Records (EHR)',
          description: 'Implement secure and efficient EHR systems to improve patient care and data management.'
        },
        {
          title: 'Telemedicine Platforms',
          description: 'Develop robust telemedicine solutions to extend healthcare access and improve patient outcomes.'
        },
        {
          title: 'Healthcare Analytics',
          description: 'Leverage data analytics to gain insights, improve decision-making, and optimize resource allocation.'
        }
      ]
    },
    {
      icon: DollarSign,
      title: 'Finance',
      description: 'Transform your financial services with our innovative technology solutions and expert consulting.',
      category: 'Finance',
      backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'Digital Banking Platforms',
          description: 'Create user-friendly digital banking experiences that enhance customer satisfaction and loyalty.'
        },
        {
          title: 'Fraud Detection Systems',
          description: 'Implement advanced AI-powered fraud detection systems to protect assets and maintain trust.'
        },
        {
          title: 'Regulatory Compliance Solutions',
          description: 'Ensure compliance with evolving financial regulations through our tailored software solutions.'
        }
      ]
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'Optimize your manufacturing processes and drive innovation with our industry-specific solutions.',
      category: 'Manufacturing',
      backgroundImage: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'Smart Factory Solutions',
          description: 'Implement IoT and AI-driven solutions to create efficient, data-driven manufacturing environments.'
        },
        {
          title: 'Supply Chain Optimization',
          description: 'Streamline your supply chain with advanced analytics and real-time tracking systems.'
        },
        {
          title: 'Predictive Maintenance',
          description: 'Reduce downtime and maintenance costs with our predictive maintenance solutions.'
        }
      ]
    },
    {
      icon: ShoppingBag,
      title: 'Retail',
      description: 'Elevate your retail business with our cutting-edge technology solutions and strategic consulting.',
      category: 'Retail',
      backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'E-commerce Platforms',
          description: 'Develop robust and scalable e-commerce solutions to expand your online presence and sales.'
        },
        {
          title: 'Customer Analytics',
          description: 'Gain valuable insights into customer behavior to personalize experiences and drive loyalty.'
        },
        {
          title: 'Inventory Management Systems',
          description: 'Optimize inventory levels and reduce costs with our advanced inventory management solutions.'
        }
      ]
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Empowering institutions with innovative educational technology solutions.',
      category: 'Education',
      backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'E-learning Platforms',
          description: 'Create comprehensive, interactive e-learning solutions for remote and hybrid learning.'
        },
        {
          title: 'Learning Management Systems (LMS)',
          description: 'Implement robust LMS solutions to manage courses, track student progress, and enhance learning outcomes.'
        },
        {
          title: 'Virtual Classrooms',
          description: 'Enable real-time teaching and collaboration with advanced virtual classroom technologies.'
        }
      ]
    },
    {
      icon: Laptop,
      title: 'Technology',
      description: 'Partnering with tech companies for innovative software development and IT services.',
      category: 'Technology',
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'Software Development',
          description: 'Custom software development services tailored to your business needs, using the latest technologies.'
        },
        {
          title: 'Cloud Computing',
          description: 'Leverage cloud platforms to scale your business operations with increased flexibility and security.'
        },
        {
          title: 'Cybersecurity Solutions',
          description: 'Protect your data and infrastructure with cutting-edge cybersecurity solutions.'
        }
      ]
    }
  ];

  return (
    <div className="pt-16">
      <HeroSection
        title="Industries We Serve"
        subtitle="Delivering Specialized Solutions Across Diverse Industries"
        description="With deep domain expertise and cutting-edge technology, we help businesses across multiple industries transform their operations and achieve sustainable growth."
        primaryCTA="Discuss Your Industry"
        secondaryCTA="View All Solutions"
        onPrimaryCTA={() => navigateTo('contact')}
        onSecondaryCTA={() => navigateTo('services')}
        showStats={false}
      />

      <section className="py-24 bg-gradient-to-b from-background via-background/95 to-accent/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Industry Expertise
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              Deep Domain Knowledge
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We understand that each industry has unique challenges and requirements. Our specialized solutions are designed to address specific industry needs while leveraging the latest technologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <IndustryCard
                  {...industry}
                  onViewSolutions={() => navigateTo('contact')}
                />
              </div>
            ))}
          </div>

          {/* Industry Stats */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                Our Impact
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
                Industry Success Metrics
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { metric: '500+', label: 'Healthcare Systems Deployed', sublabel: 'Across 25 countries' },
                { metric: '98%', label: 'Financial Compliance Rate', sublabel: 'Regulatory adherence' },
                { metric: '40%', label: 'Manufacturing Efficiency Gain', sublabel: 'Average improvement' },
                { metric: '300%', label: 'Retail Sales Increase', sublabel: 'E-commerce platforms' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-brand-gradient mb-2 group-hover:scale-110 transition-transform duration-200">{stat.metric}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-muted-foreground text-sm">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Our Industry Solutions */}
          <div className="mt-32">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                Our Advantage
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
                Why Choose Our Industry Solutions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Industry-Specific Expertise',
                  description: 'Our teams have deep knowledge of industry regulations, best practices, and unique challenges.'
                },
                {
                  icon: '🔒',
                  title: 'Compliance & Security',
                  description: 'We ensure all solutions meet industry-specific compliance requirements and security standards.'
                },
                {
                  icon: '⚡',
                  title: 'Rapid Implementation',
                  description: 'Pre-built industry modules and templates accelerate deployment and reduce time-to-value.'
                },
                {
                  icon: '📊',
                  title: 'Industry Benchmarking',
                  description: 'Compare your performance against industry standards and identify improvement opportunities.'
                },
                {
                  icon: '🔄',
                  title: 'Continuous Innovation',
                  description: 'Stay ahead with regular updates based on industry trends and emerging technologies.'
                },
                {
                  icon: '🤝',
                  title: 'Partnership Ecosystem',
                  description: 'Access to industry partners, vendors, and specialists for comprehensive solutions.'
                }
              ].map((advantage, index) => (
                <div key={index} className="p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border/20 hover:shadow-xl hover:scale-105 transition-all duration-500 group glass-card-hover glass-highlight">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{advantage.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}