"use client";
import React from 'react';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CaseStudiesSection() {
    const router = useRouter();

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

    return (
        <section id="case-studies" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Proven <span className="text-primary">Success Stories</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Explore real-world examples of how we've helped businesses transform their operations and achieve remarkable growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {caseStudies.map((caseStudy, index) => (
                        <CaseStudyCard key={index} {...caseStudy} />
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => router.push('/case-studies')}
                        className="rounded-full px-8 h-12 text-base hover:bg-primary/5"
                    >
                        View All Case Studies
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
