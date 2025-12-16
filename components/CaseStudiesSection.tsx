"use client";
import React from 'react';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CaseStudiesSection() {
    const router = useRouter();

    const caseStudies = [
        {
            title: "Influencer-Driven eCommerce Platform",
            client: "FashionForward",
            industry: "E-commerce",
            challenge: "Transform traditional online shopping into a social-first discovery experience powered by influencers.",
            result: "Integrated influencer profiles, curated collections, and seamless checkout, boosting engagement and sales.",
            metrics: [
                { label: "Sales Increase", value: "150%", improvement: "150% growth" },
                { label: "User Engagement", value: "200%", improvement: "200% higher" },
                { label: "Conversion Rate", value: "85%", improvement: "85% better" },
            ],
            image: "/IS_Homepage.png",
            tags: ["React", "Node.js", "MongoDB", "AWS"],
            slug: "influencer-driven-ecommerce-platform"
        },
        {
            title: "Digital Transformation for a Retail Chain",
            client: "RetailGiant",
            industry: "Retail",
            challenge: "Complete digital transformation to improve online sales and customer engagement.",
            result: "Resulted in a 30% increase in online sales and improved customer engagement through a new digital platform.",
            metrics: [
                { label: "Online Sales", value: "+30%", improvement: "30% increase" },
                { label: "Customer Satisfaction", value: "95%", improvement: "95% score" },
                { label: "Operational Efficiency", value: "+40%", improvement: "40% better" },
            ],
            image: "/DT_Retail_Industry.png",
            tags: ["Vue.js", "Python", "PostgreSQL", "Docker"],
            slug: "digital-transformation-for-a-retail-chain"
        },
        {
            title: "AI Implementation in Healthcare",
            client: "HealthPlus",
            industry: "Healthcare",
            challenge: "Optimise patient scheduling and reduce wait times in a major hospital network.",
            result: "AI solution optimized scheduling, reducing wait times by 25% and increasing staff efficiency.",
            metrics: [
                { label: "Wait Time Reduction", value: "25%", improvement: "25% faster" },
                { label: "Patient Satisfaction", value: "92%", improvement: "92% score" },
                { label: "Staff Efficiency", value: "+35%", improvement: "35% higher" },
            ],
            image: "/healthcare.png",
            tags: ["Python", "TensorFlow", "FastAPI", "Redis"],
            slug: "ai-implementation-in-healthcare"
        }
    ];

    return (
        <section id="case-studies" className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Proven <span className="text-primary">Success Stories</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Explore real-world examples of how we&apos;ve helped businesses transform their operations and achieve remarkable growth.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {caseStudies.map((caseStudy, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CaseStudyCard
                                {...caseStudy}
                                onReadMore={() => router.push(`/case-studies/${caseStudy.slug}`)}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => router.push('/case-studies')}
                            className="rounded-full px-8 h-12 text-base hover:bg-primary/5 transition-all duration-300 hover:scale-105"
                        >
                            View All Case Studies
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
