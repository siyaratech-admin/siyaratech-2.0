"use client";
import React from 'react';
import { caseStudies as allCaseStudies } from '@/lib/caseStudies';
import CaseStudyCard from '@/components/CaseStudyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function CaseStudiesSection() {
    const router = useRouter();

    const caseStudies = allCaseStudies;

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
