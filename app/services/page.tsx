"use client";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Brain, Cloud, Users, Code, Zap, TrendingUp, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      icon: Brain,
      title: 'AI and Automation',
      description: 'Implement AI solutions to automate processes, improve decision-making, and innovate your business operations.',
      features: ['Machine Learning', 'Process Automation', 'Predictive Analytics', 'Neural Networks'],
      category: 'AI & Automation',
      isPopular: true
    },
    {
      icon: Cloud,
      title: 'Cloud Services',
      description: 'Adopt cloud technologies to enhance scalability, flexibility, and security of your IT environment.',
      features: ['AWS', 'Azure', 'Google Cloud', 'DevOps'],
      category: 'Cloud Services',
      isPopular: false
    },
    {
      icon: Users,
      title: 'Talent Outsourcing',
      description: 'Focus on your core competencies while we provide talented professionals to manage your IT and business processes efficiently.',
      features: ['IT Staffing', 'Remote Teams', 'Skill Matching', 'Project Management'],
      category: 'Talent Outsourcing',
      isPopular: false
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'Leverage our IT expertise to build robust, scalable, and secure technology infrastructures that support your business objectives.',
      features: ['Full-Stack Development', 'Mobile Apps', 'Web Applications', 'API Development'],
      category: 'Software Development',
      isPopular: false
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Transform your business digitally to stay competitive and meet the evolving demands of the market.',
      features: ['Strategy Consulting', 'Process Optimization', 'Technology Integration', 'Change Management'],
      category: 'Digital Transformation',
      isPopular: false
    },
    {
      icon: TrendingUp,
      title: 'Business Consulting',
      description: 'Unlock your business\'s full potential with our strategic consulting services. We help organizations improve performance, optimize processes, and achieve sustainable growth.',
      features: ['Strategy Development', 'Market Analysis', 'Process Optimization', 'Performance Improvement'],
      category: 'Business Consulting',
      isPopular: false
    }
  ];

  return (
    <div className="pt-16">
      <HeroSection
        title="Our Services"
        subtitle="Comprehensive Technology Solutions"
        description="From AI implementation to complete digital transformations, we provide cutting-edge technology services that drive measurable business results."
        primaryCTA="Get Custom Quote"
        secondaryCTA="Schedule Consultation"
        onPrimaryCTA={() => navigateTo('contact')}
        showStats={false}
      />

      <section className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              How We Deliver Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed">
              We follow a proven methodology to ensure your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: '01', 
                title: 'Discovery', 
                description: 'We analyze your business needs and technical requirements through comprehensive workshops and assessments.',
                icon: '🔍'
              },
              { 
                step: '02', 
                title: 'Strategy', 
                description: 'We develop a comprehensive plan and technology roadmap tailored to your specific goals and constraints.',
                icon: '📋'
              },
              { 
                step: '03', 
                title: 'Implementation', 
                description: 'Our expert team brings your solution to life using agile methodologies and best practices.',
                icon: '⚡'
              },
              { 
                step: '04', 
                title: 'Support', 
                description: 'Ongoing maintenance and optimization for continued success with 24/7 monitoring and support.',
                icon: '🛠️'
              }
            ].map((process, index) => (
              <Card key={index} className="text-center p-8 border-border/20 hover:shadow-2xl hover:scale-105 transition-all duration-500 group bg-card/80 backdrop-blur-sm glass-card-hover glass-highlight relative overflow-hidden">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 text-primary font-bold">{process.step}</span>
                  </div>
                  
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{process.icon}</div>
                  
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">{process.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-32">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
                What Sets Us Apart
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Proven Track Record',
                  description: '500+ successful projects delivered across various industries with a 100% client satisfaction rate.'
                },
                {
                  icon: '⚡',
                  title: 'Cutting-Edge Technology',
                  description: 'We leverage the latest technologies and frameworks to build future-proof solutions.'
                },
                {
                  icon: '👥',
                  title: 'Expert Team',
                  description: 'Our team consists of certified professionals with deep expertise in their respective domains.'
                },
                {
                  icon: '🔒',
                  title: 'Security First',
                  description: 'We implement enterprise-grade security measures to protect your data and systems.'
                },
                {
                  icon: '📈',
                  title: 'Scalable Solutions',
                  description: 'Our solutions are designed to grow with your business and adapt to changing requirements.'
                },
                {
                  icon: '🏆',
                  title: 'Award-Winning Service',
                  description: 'Recognized industry leader with multiple awards for innovation and client service excellence.'
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 border-border/20 hover:shadow-xl hover:scale-105 transition-all duration-500 group bg-card/80 backdrop-blur-sm glass-card-hover glass-highlight">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Service Guarantees */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
                Our Commitment
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
                Service Guarantees
              </h2>
            </div>

            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 glass-card glass-highlight relative overflow-hidden">
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 opacity-50"></div>
              
              <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: CheckCircle, title: '99.9% Uptime', subtitle: 'System Reliability' },
                  { icon: CheckCircle, title: '24/7 Support', subtitle: 'Always Available' },
                  { icon: CheckCircle, title: 'Money Back', subtitle: 'Satisfaction Guarantee' },
                  { icon: CheckCircle, title: 'On-Time Delivery', subtitle: 'Project Commitment' }
                ].map((guarantee, index) => (
                  <div key={index} className="text-center group">
                    <guarantee.icon className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{guarantee.title}</h3>
                    <p className="text-muted-foreground">{guarantee.subtitle}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}