"use client";
import React from "react";
import { motion } from "framer-motion";

const founders = [
    {
        id: "01",
        name: "Rohit Sonawale",
        role: "Founder and CEO",
        bio: "A seasoned technology visionary with 15+ years in IT product development and cloud solutions. AI, AWS Certified and PMP-certified leader drives innovative, scalable tech solutions that empower global business growth.",
        image: "/static_images/team/rohit.jpeg",
    },
    {
        id: "02",
        name: "Parth Suryawanshi",
        role: "Co-Founder",
        bio: "A seasoned civil engineer with 15+ years of experience in real estate, textile, and contracting industries. Known for his expertise in system design and implementation, Parth combines technical prowess with a strategic mindset, delivering innovative solutions and driving project success with precision and efficiency.",
        image: "/static_images/team/parth.jpg",
    },
    {
        id: "03",
        name: "Amit Pitale",
        role: "Co-Founder",
        bio: "A tech leader with 21+ years of experience in IT product development, enterprise applications, and cloud transformation, specializing in ERP implementations and large-scale global program delivery.",
        image: "/static_images/team/amit.jpeg",
    },
    // {
    //     id: "04",
    //     name: "Ritesh Bora",
    //     role: "Co-Founder\nDubai Operations",
    //     bio: "Seasoned ERP specialist with strong finance domain and vibrant experience across multiple verticals of ERP implementations.",
    //     image: "/static_images/team/ritesh.png",
    // },
];

export default function FoundersSection() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-light tracking-tight text-foreground">
                        <span className="border-b-4 border-foreground/20 pb-2">OUR</span> TEAM
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-muted rounded-sm">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-2xl font-light text-muted-foreground/50">{founder.id}</span>
                                    <h3 className="text-xl font-bold text-foreground">{founder.name}</h3>
                                </div>
                                <p className="text-sm text-foreground/70 font-medium mb-4 uppercase tracking-wide whitespace-pre-line">
                                    {founder.role}
                                </p>
                                <div className="w-full h-[1px] bg-foreground/20 mb-4 transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-50" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {founder.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
