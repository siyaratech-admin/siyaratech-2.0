"use client";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import IndustryCard from '@/components/IndustryCard';
import TestimonialCard from '@/components/TestimonialCard';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Brain, 
  Cloud, 
  Users, 
  Code, 
  Zap, 
  TrendingUp,
  Heart, 
  DollarSign, 
  Factory, 
  ShoppingBag, 
  GraduationCap, 
  Laptop 
} from 'lucide-react';

export default function HomePage() {
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

  const industries = [
    {
      icon: Heart,
      title: 'Healthcare',
      description: 'Revolutionize patient care and streamline operations with our cutting-edge healthcare solutions.',
      category: 'Healthcare',
      backgroundImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
      solutions: [
        {
          title: 'Electronic Health Records (EHR)',
          description: 'Implement secure and efficient EHR systems to improve patient care and data management.'
        },
        {
          title: 'Telemedicine Platforms',
          description: 'Develop robust telemedicine solutions to extend healthcare access and improve patient outcomes.'
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
        }
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechCorp',
      content: 'SIYARA TECH transformed our entire digital infrastructure. Their AI solutions increased our efficiency by 300% and their team was incredible to work with.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b739?w=150'
    },
    {
      name: 'Michael Chen',
      role: 'Founder',
      company: 'StartupXYZ',
      content: 'The web application they built for us is not only beautiful but incredibly fast and user-friendly. Our conversion rates improved by 150%.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Operations',
      company: 'GlobalTech',
      content: 'Their digital transformation consulting helped us modernize our processes and save over $500k annually. Outstanding results!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  ];

  const caseStudies = [
    {
      title: 'AI-Powered Customer Service Revolution',
      client: 'MegaCorp Inc.',
      industry: 'E-commerce',
      challenge: 'High customer service costs and slow response times were affecting customer satisfaction and retention rates.',
      result: 'Implemented an AI chatbot system that handles 80% of customer inquiries automatically, reducing response time from hours to seconds.',
      metrics: [
        { label: 'Response Time', value: '< 30 sec', improvement: '95% faster' },
        { label: 'Cost Reduction', value: '$2.5M saved', improvement: '60% less' },
        { label: 'Satisfaction', value: '4.8/5 stars', improvement: '40% higher' },
        { label: 'Efficiency', value: '80% automated', improvement: '300% more' }
      ],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600',
      tags: ['AI', 'Automation', 'Customer Service', 'Machine Learning']
    },
    {
      title: 'Complete Digital Platform Overhaul',
      client: 'RetailChain Ltd.',
      industry: 'Retail',
      challenge: 'Legacy systems were causing frequent downtime and poor user experience, leading to lost sales and frustrated customers.',
      result: 'Built a modern, scalable e-commerce platform with real-time inventory management and personalized shopping experiences.',
      metrics: [
        { label: 'Uptime', value: '99.9%', improvement: '500% better' },
        { label: 'Sales Growth', value: '+250%', improvement: '250% more' },
        { label: 'Page Speed', value: '1.2s load', improvement: '80% faster' },
        { label: 'Conversion', value: '8.5%', improvement: '200% higher' }
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600',
      tags: ['E-commerce', 'Web Development', 'Cloud', 'Performance']
    },
    {
      title: 'Predictive Analytics for Supply Chain',
      client: 'LogisticsPro',
      industry: 'Logistics',
      challenge: 'Inefficient supply chain management was causing delays, overstocking, and increased operational costs.',
      result: 'Developed a predictive analytics system that optimizes inventory levels and predicts demand with 95% accuracy.',
      metrics: [
        { label: 'Accuracy', value: '95%', improvement: '50% better' },
        { label: 'Inventory Cost', value: '-45%', improvement: '45% less' },
        { label: 'Delivery Time', value: '-30%', improvement: '30% faster' },
        { label: 'Waste Reduction', value: '-60%', improvement: '60% less' }
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
      tags: ['Analytics', 'Machine Learning', 'Supply Chain', 'Optimization']
    }
  ];

  const blogPosts = [
    {
      title: 'The Future of AI in Business: Trends to Watch in 2024',
      excerpt: 'Exploring the latest AI trends that will reshape business operations and customer experiences.',
      author: 'Dr. Alex Thompson',
      date: 'March 15, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
      tags: ['AI', 'Business', 'Technology', 'Trends']
    },
    {
      title: 'Building Scalable Web Applications: Best Practices Guide',
      excerpt: 'A comprehensive guide to architecting web applications that can handle millions of users.',
      author: 'Jennifer Kim',
      date: 'March 12, 2024',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
      tags: ['Web Development', 'Architecture', 'Scalability', 'Performance']
    },
    {
      title: 'Digital Transformation Success Stories: Lessons Learned',
      excerpt: 'Real-world examples of successful digital transformations and the key factors that made them work.',
      author: 'Mike Roberts',
      date: 'March 10, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600',
      tags: ['Digital Transformation', 'Case Studies', 'Strategy', 'Innovation']
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Transform Your Business with Cutting-Edge Technology"
        subtitle="Innovation That Drives Results"
        description="We help forward-thinking companies leverage AI, modern web technologies, and digital transformation to achieve unprecedented growth and efficiency."
        primaryCTA="Start Your Project"
        secondaryCTA="View Our Work"
        onPrimaryCTA={() => navigateTo('contact')}
        onSecondaryCTA={() => navigateTo('case-studies')}
      />

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-background via-background/95 to-accent/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From AI-powered automation to complete digital transformations, we provide end-to-end technology solutions that drive real business results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <ServiceCard
                  {...service}
                  onLearnMore={() => navigateTo('services')}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg" 
              onClick={() => navigateTo('services')}
              className="bg-brand-gradient hover:bg-brand-gradient-hover text-white hover:scale-110 transition-all duration-300 px-8 py-4 text-lg shadow-lg hover:shadow-2xl"
            >
              View All Services
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-gradient-to-b from-accent/5 via-background/95 to-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Industries We Serve
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              Delivering Specialized Solutions Across Diverse Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With deep domain expertise, we help businesses across multiple industries transform their operations and achieve sustainable growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
                  onViewSolutions={() => navigateTo('industries')}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigateTo('industries')}
              className="hover:scale-110 transition-all duration-300 px-8 py-4 text-lg border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              View All Industries
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Client Success
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what industry leaders have to say about our work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-gradient-to-b from-accent/5 via-background/95 to-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              Featured Case Studies
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Real results from real clients. See how we've helped businesses transform and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div 
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <CaseStudyCard
                  {...caseStudy}
                  onReadMore={() => navigateTo('case-studies')}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg" 
              onClick={() => navigateTo('case-studies')}
              className="bg-brand-gradient hover:bg-brand-gradient-hover text-white hover:scale-110 transition-all duration-300 px-8 py-4 text-lg shadow-lg hover:shadow-2xl"
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
              Latest Insights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient">
              From Our Blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest trends, insights, and best practices in technology and digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group overflow-hidden border-border/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 bg-card/80 backdrop-blur-sm glass-card-hover glass-highlight">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs bg-background/50 border-border/30 hover:bg-primary/10 hover:border-primary/30 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" className="w-full hover:bg-brand-gradient hover:text-white transition-all duration-300" onClick={() => navigateTo('blog')}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigateTo('blog')}
              className="hover:scale-110 transition-all duration-300 px-8 py-4 text-lg border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              View All Posts
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-chart-1/10 to-chart-2/10 transition-colors duration-300 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-brand-gradient opacity-5 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-chart-1/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-chart-2/20 to-chart-3/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-brand-gradient">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of companies that have accelerated their growth with SIYARA TECH's innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-gradient hover:bg-brand-gradient-hover text-white px-10 py-4 text-lg hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-primary/25"
              onClick={() => navigateTo('contact')}
            >
              Start Your Project
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigateTo('about')}
              className="hover:scale-110 transition-all duration-300 px-10 py-4 text-lg border-primary/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              Learn About Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}