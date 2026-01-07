"use client";
import React from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/TextAnimations/BlurText/BlurText";

export default function InnovatingSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Title & visual */}
                    <div className="text-center lg:text-left relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium"
                        >
                            About Siyaratech
                        </motion.div>

                        <div className="mb-6 relative">
                            <BlurText
                                text="Innovating for the Future"
                                delay={50}
                                animateBy="words"
                                direction="top"
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
                            />
                            {/* Accessible H2 since BlurText might be generic */}
                            <h2 className="sr-only">Innovating for the Future</h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="hidden lg:flex relative mt-8 justify-center lg:justify-start"
                        >
                            {/* Abstract decorative element representing connection/future */}
                            {/* Futuristic Reactor/Node Animation */}
                            <div className="relative w-80 h-80">
                                {/* Core Glow/Pulse */}
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse" />

                                {/* Orbital Rings Container */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Ring 1 - Outer, slow reverse spin */}
                                    <div className="absolute w-72 h-72 rounded-full border border-primary/10 border-t-primary/50 border-r-transparent animate-[spin_20s_linear_infinite_reverse]">
                                        {/* Dot at Top-Right (End of Top Arc) - 45 deg */}
                                        <div className="absolute top-[14.65%] right-[14.65%] w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-y-1/2 translate-x-1/2" />
                                    </div>

                                    {/* Ring 2 - Middle, eccentric spin with variance */}
                                    <div className="absolute w-56 h-56 rounded-full border border-white/5 border-b-brand-purple/60 border-l-transparent animate-[spin_12s_linear_infinite]">
                                        {/* Dot at Bottom-Left (End of Bottom Arc) - 225 deg */}
                                        <div className="absolute bottom-[14.65%] left-[14.65%] w-3 h-3 bg-brand-purple rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] blur-[1px] translate-y-1/2 -translate-x-1/2" />
                                    </div>

                                    {/* Ring 3 - Inner, fast chaotic spin */}
                                    <div className="absolute w-40 h-40 rounded-full border border-white/5 border-l-brand-orange/80 border-r-transparent animate-[spin_8s_linear_infinite_reverse]">
                                        {/* Dot at Bottom-Left (End of Left Arc) - 225 deg */}
                                        <div className="absolute bottom-[14.65%] left-[14.65%] w-1.5 h-1.5 bg-brand-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)] translate-y-1/2 -translate-x-1/2" />
                                    </div>

                                    {/* Core - Stable but breathing */}
                                    <div className="relative z-10 w-24 h-24 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center shadow-2xl animate-[pulse_4s_ease-in-out_infinite]">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-brand-purple opacity-80 blur-md animate-[pulse_3s_ease-in-out_infinite]" />
                                        <div className="absolute w-full h-full rounded-full border border-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 shadow-2xl overflow-hidden group">
                            {/* Hover Glow effect */}
                            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine" />

                            <div className="relative space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    <strong className="text-foreground">SIYARATECH INNOVATIONS</strong> is at the forefront of the digital revolution, providing cutting-edge solutions that bridge the gap between complex technology and business needs.
                                </p>
                                <p>
                                    We are dedicated to empowering organizations through <span className="text-foreground font-medium bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-orange">Artificial Intelligence, Machine Learning, and robust Cloud Infrastructure</span>. Our team of experts works tirelessly to deliver custom software, enterprise resource planning (ERP) systems, and AI-driven automation that streamline operations and drive exponential growth.
                                </p>
                                <p>
                                    Whether you are a startup looking to scale or an enterprise seeking digital transformation, Siyaratech is your trusted partner in navigating the ever-evolving tech landscape.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
