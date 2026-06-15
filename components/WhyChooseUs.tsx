"use client";
import React from "react";
import { motion } from "framer-motion";
import { FeaturesGrid } from "./ui/FeaturesGrid";
import { Brain, Layers, BarChart, Clock, Building } from "lucide-react";
import { SectionLightRay } from "@/components/SectionLightRay";

/* ─── Floating background decoration SVGs ─── */
function FloatingIcons() {
    const icons = [
        { path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8 8.5l4 3 4-3M8 15.5l4-3 4 3M12 5v2.5M12 16.5V19", size: 52, x: "6%",  y: "18%", delay: 0,   dur: 7,   opacity: 0.07 },
        { path: "M3 3v18h18M7 16v-5m4 5V8m4 8V5",                                                                                                                                                                                                                                                     size: 42, x: "91%", y: "12%", delay: 1.2, dur: 8,   opacity: 0.06 },
        { path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",                                                                                                                                                                                                                           size: 46, x: "4%",  y: "72%", delay: 0.5, dur: 9,   opacity: 0.07 },
        { path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l3.5 3.5",                                                                                                                                                                                                                            size: 38, x: "94%", y: "68%", delay: 2,   dur: 6.5, opacity: 0.06 },
        { path: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h1m4 0h1M9 13h1m4 0h1",                                                                                                                                                                                                                  size: 44, x: "50%", y: "4%",  delay: 0.8, dur: 10,  opacity: 0.05 },
        { path: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z",                                                                                                                                                                                                             size: 36, x: "80%", y: "82%", delay: 1.5, dur: 7.5, opacity: 0.06 },
        { path: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18",                                                                                                                                                                    size: 40, x: "18%", y: "90%", delay: 3,   dur: 8.5, opacity: 0.05 },
        { path: "M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z",                                                                                                                                                                             size: 48, x: "67%", y: "94%", delay: 0.3, dur: 11,  opacity: 0.05 },
    ];

    return (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
            {icons.map((ic, i) => (
                <motion.svg
                    key={i}
                    width={ic.size}
                    height={ic.size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: "absolute",
                        left: ic.x,
                        top: ic.y,
                        color: "#833AB4",
                        opacity: 0,
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                        opacity: [0, ic.opacity, ic.opacity],
                        y: [0, -14, 0],
                    }}
                    transition={{
                        opacity: { duration: 1.4, delay: ic.delay, times: [0, 0.3, 1] },
                        y: {
                            duration: ic.dur,
                            delay: ic.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <path d={ic.path} />
                </motion.svg>
            ))}
        </div>
    );
}

export default function WhyChooseUs() {
    const features = [
        { title: "AI-powered decision-making",          description: "Stop guessing. Let AI provide data-driven insights for every critical decision.",                         icon: <Brain    className="h-8 w-8" /> },
        { title: "Smooth, interconnected modules",      description: "A unified ecosystem where every module talks to each other perfectly.",                                   icon: <Layers   className="h-8 w-8" /> },
        { title: "Real-time analytics & forecasting",   description: "See the future of your business with predictive analytics and real-time dashboards.",                     icon: <BarChart className="h-8 w-8" /> },
        { title: "Automation that saves 100+ hours",    description: "Eliminate repetitive tasks and free up your team for high-value work.",                                   icon: <Clock    className="h-8 w-8" /> },
        { title: "Designed for growing SMEs & enterprises", description: "Scalable architecture that grows with your business, from startup to enterprise.",                    icon: <Building className="h-8 w-8" /> },
    ];

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <SectionLightRay segmentStart={0.25} segmentEnd={0.375} />
            <FloatingIcons />

            <style>{`
                .gradient-text {
                    background: linear-gradient(to right, #833AB4, #FD1D1D, #FCB045);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                }
                .gradient-text-wrapper:hover .gradient-text {
                    background: none !important;
                    -webkit-background-clip: unset !important;
                    background-clip: unset !important;
                    -webkit-text-fill-color: #111111 !important;
                    color: #111111 !important;
                }
                .dark .gradient-text-wrapper:hover .gradient-text {
                    -webkit-text-fill-color: #ffffff !important;
                    color: #ffffff !important;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 gradient-text-wrapper">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                    >
                        Where Digital Transformation Meets <br />
                        <span className="gradient-text">AI Intelligence</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    >
                        Most ERP systems help you manage operations.<br />
                        <strong className="text-gray-900 dark:text-white">
                            Siyaratech helps you optimize, automate, and scale them.
                        </strong>
                    </motion.p>
                </div>

                <FeaturesGrid features={features} cols={3} />
            </div>
        </section>
    );
}