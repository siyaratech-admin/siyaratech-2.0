"use client";
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CaseStudyCard from '@/components/CaseStudyCard';
import { useRouter } from 'next/navigation';

export default function CaseStudiesPage() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    },
    {
      title: 'Healthcare Data Platform Migration',
      client: 'MedTech Solutions',
      industry: 'Healthcare',
      challenge: 'Fragmented data systems across multiple locations were hindering patient care and operational efficiency.',
      result: 'Created a unified, HIPAA-compliant data platform that integrates all patient information and improves care coordination.',
      metrics: [
        { label: 'Data Integration', value: '100%', improvement: 'Complete' },
        { label: 'Access Speed', value: '10x faster', improvement: '1000% better' },
        { label: 'Compliance', value: 'HIPAA Certified', improvement: 'Full compliance' },
        { label: 'Staff Efficiency', value: '+40%', improvement: '40% increase' }
      ],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
      tags: ['Healthcare', 'Data Migration', 'Compliance', 'Integration']
    },
    {
      title: 'Fintech Mobile App Development',
      client: 'NextGen Finance',
      industry: 'Financial Services',
      challenge: 'Traditional banking processes were losing customers to digital-first competitors.',
      result: 'Developed a comprehensive mobile banking app with AI-powered financial insights and seamless user experience.',
      metrics: [
        { label: 'User Adoption', value: '85%', improvement: '300% increase' },
        { label: 'Transaction Speed', value: '2 seconds', improvement: '90% faster' },
        { label: 'Customer Satisfaction', value: '4.9/5', improvement: '45% higher' },
        { label: 'Operational Cost', value: '-35%', improvement: '35% reduction' }
      ],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
      tags: ['Fintech', 'Mobile Development', 'AI', 'User Experience']
    },
    {
      title: 'Manufacturing IoT Implementation',
      client: 'Industrial Dynamics',
      industry: 'Manufacturing',
      challenge: 'Lack of real-time visibility into production processes was causing inefficiencies and quality issues.',
      result: 'Implemented IoT sensors and analytics platform for real-time monitoring and predictive maintenance.',
      metrics: [
        { label: 'Equipment Uptime', value: '98%', improvement: '25% increase' },
        { label: 'Quality Issues', value: '-70%', improvement: '70% reduction' },
        { label: 'Maintenance Costs', value: '-50%', improvement: '50% savings' },
        { label: 'Production Output', value: '+30%', improvement: '30% increase' }
      ],
      image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600',
      tags: ['IoT', 'Manufacturing', 'Analytics', 'Predictive Maintenance']
    }
  ];

  return (
    <div className="pt-16">
      <HeroSection
        title="Case Studies"
        subtitle="Proven Success Stories"
        description="Explore real-world examples of how we've helped businesses transform their operations and achieve remarkable growth through technology."
        primaryCTA="Start Your Success Story"
        onPrimaryCTA={() => navigateTo('contact')}
        showStats={false}
      />

      <section className="py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={index} {...caseStudy} />
            ))}
          </div>

          {/* Results Summary */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-8">Overall Results</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { metric: '300%', label: 'Average Efficiency Increase' },
                { metric: '$50M+', label: 'Client Cost Savings' },
                { metric: '99.9%', label: 'Average System Uptime' },
                { metric: '100%', label: 'Project Success Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-200">{stat.metric}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}