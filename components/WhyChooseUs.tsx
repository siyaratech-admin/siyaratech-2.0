"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FeaturesGrid } from './ui/FeaturesGrid';
import { Brain, Layers, BarChart, Clock, Building } from 'lucide-react';

export default function WhyChooseUs() {
    const features = [
        {
            title: "AI-powered decision-making",
            description: "Stop guessing. Let AI provide data-driven insights for every critical decision.",
            icon: <Brain className="h-8 w-8" />,
        },
        {
            title: "Smooth, interconnected modules",
            description: "A unified ecosystem where every module talks to each other perfectly.",
            icon: <Layers className="h-8 w-8" />,
        },
        {
            title: "Real-time analytics & forecasting",
            description: "See the future of your business with predictive analytics and real-time dashboards.",
            icon: <BarChart className="h-8 w-8" />,
        },
        {
            title: "Automation that saves 100+ hours",
            description: "Eliminate repetitive tasks and free up your team for high-value work.",
            icon: <Clock className="h-8 w-8" />,
        },
        {
            title: "Designed for growing SMEs & enterprises",
            description: "Scalable architecture that grows with your business, from startup to enterprise.",
            icon: <Building className="h-8 w-8" />,
        },
    ];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Where Digital Transformation Meets <br />
                        <span className="text-brand-gradient bg-clip-text text-transparent">AI Intelligence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Most ERP systems help you manage operations.
                        <br /><strong className="text-foreground">Siyaratech helps you optimize, automate, and scale them.</strong>
                    </motion.p>
                </div>

                <FeaturesGrid features={features} cols={3} />
            </div>
        </section>
    );
}
