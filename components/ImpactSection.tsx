"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Zap, Shield, Layers, Cloud, ArrowRight } from "lucide-react";
import { NavbarButton } from "./ui/resizable-navbar";
import { useRouter } from "next/navigation";
import { SectionLightRay } from "@/components/SectionLightRay";

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 2.2, shouldStart = false) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        if (!shouldStart) return;
        const controls = animate(0, target, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(v) {
                setDisplay(Math.round(v));
            },
        });
        return () => controls.stop();
    }, [shouldStart, target, duration]);
    return display;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
interface StatConfig {
    prefix?: string;
    value: number;
    suffix: string;
    label: string;
    color: string;
    glow: string;
    delay: number;
}

function StatCard({ stat, index }: { stat: StatConfig; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const count = useAnimatedCounter(stat.value, 2 + index * 0.1, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: stat.delay, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
        >
            {/* Glow blob behind card */}
            <div
                className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl ${stat.glow}`}
            />

            {/* Card */}
            <div className="relative rounded-2xl bg-card/60 backdrop-blur-md border border-white/8 dark:border-white/10 p-6 md:p-8 overflow-hidden text-center flex flex-col items-center gap-2 h-full">
                {/* Inner shimmer line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                {/* Subtle radial glow inside */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-20 ${stat.color}`} />

                {/* Number */}
                <div className={`text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent ${stat.color} leading-none`}>
                    {stat.prefix ?? ""}{count}{stat.suffix}
                </div>

                {/* Animated underline */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: stat.delay + 0.6, ease: "easeOut" }}
                    className={`h-0.5 w-16 rounded-full origin-left ${stat.color} opacity-60`}
                    style={{ background: "currentColor" }}
                />

                <p className="text-sm font-medium text-muted-foreground mt-1 leading-snug">{stat.label}</p>
            </div>
        </motion.div>
    );
}

// ─── Differentiator Card ─────────────────────────────────────────────────────
function DiffCard({ diff, i }: { diff: { title: string; text: string; icon: React.ElementType }; i: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col items-center text-center p-6 bg-card/50 border border-border/50 rounded-2xl hover:border-primary/40 hover:shadow-[0_0_32px_-4px] hover:shadow-primary/20 transition-all duration-500 cursor-default"
        >
            <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <diff.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold mb-1 text-sm md:text-base">{diff.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{diff.text}</p>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImpactSection() {
    const router = useRouter();

    const stats: StatConfig[] = [
        {
            value: 70,
            suffix: "%",
            label: "Reduction in manual workload",
            color: "bg-gradient-to-br from-violet-400 to-purple-600",
            glow: "bg-purple-500/30",
            delay: 0,
        },
        {
            value: 30,
            suffix: "%",
            label: "Faster project delivery",
            color: "bg-gradient-to-br from-sky-400 to-blue-600",
            glow: "bg-blue-500/30",
            delay: 0.1,
        },
        {
            value: 40,
            suffix: "%",
            label: "Improved team productivity",
            color: "bg-gradient-to-br from-emerald-400 to-teal-600",
            glow: "bg-emerald-500/30",
            delay: 0.2,
        },
        {
            value: 90,
            suffix: "%",
            label: "Fewer operational delays",
            color: "bg-gradient-to-br from-amber-400 to-orange-500",
            glow: "bg-orange-500/30",
            delay: 0.3,
        },
        {
            value: 100,
            suffix: "%",
            label: "Transparency across departments",
            color: "bg-gradient-to-br from-rose-400 to-pink-600",
            glow: "bg-pink-500/30",
            delay: 0.4,
        },
    ];

    const differentiators = [
        { title: "Unified Suite", text: "All modules talk to each other", icon: Layers },
        { title: "AI at the Core", text: "Real decision intelligence", icon: BrainIcon },
        { title: "Modular & Scalable", text: "Add features as you grow", icon: Zap },
        { title: "Cloud + Mobile-first", text: "Work anytime, anywhere", icon: Cloud },
        { title: "Secure Architecture", text: "Enterprise-grade protection", icon: Shield },
    ];

    return (
        <section className="py-16 md:py-28 relative overflow-hidden">
            <SectionLightRay segmentStart={0.875} segmentEnd={1.0} />

            {/* Background ambiance */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ── Differentiators ── */}
                <div className="mb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                            Why Siyaratech
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
                            What Makes Us Different?
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {differentiators.map((diff, i) => (
                            <DiffCard key={i} diff={diff} i={i} />
                        ))}
                    </div>
                </div>

                {/* ── Stats / Impact Numbers ── */}
                <div className="mb-28">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                            Measurable Impact
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
                            Numbers that speak for themselves
                        </h2>
                        <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
                            Real outcomes reported by enterprises after switching to Siyaratech.
                        </p>
                    </motion.div>

                    {/* Stat grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                        {stats.map((stat, i) => (
                            <StatCard key={i} stat={stat} index={i} />
                        ))}
                    </div>

                    {/* Decorative connector line between cards */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                        className="hidden lg:block h-px mt-8 mx-auto w-3/4 bg-gradient-to-r from-transparent via-border to-transparent origin-left"
                    />
                </div>

                {/* ── CTA Block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl overflow-hidden border border-border dark:border-white/10 p-12 md:p-20 text-center shadow-2xl shadow-brand-purple/5 dark:shadow-none bg-white dark:bg-black"
                >
                    {/* Glow orbs */}
                    <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-purple-500/10 dark:bg-purple-500/20 blur-[110px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-500/10 dark:bg-blue-500/20 blur-[110px] rounded-full pointer-events-none" />

                    {/* Shimmer top edge */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-light tracking-wide uppercase text-foreground dark:text-white mb-6 leading-tight"
                        >
                            Ready to modernize your business operations?
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-xl font-light text-muted-foreground dark:text-white/80 mb-10"
                        >
                            Siyaratech —{" "}
                            <span className="font-bold text-foreground dark:text-white">ERP. CRM. AI.</span>
                            <br />
                            <span className="text-base mt-2 block opacity-70">
                                Everything your enterprise needs to scale.
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center gap-4"
                        >
                            <NavbarButton
                                variant="gradient"
                                className="px-8 py-6 text-lg group"
                                onClick={() => router.push("/contact#send-message")}
                            >
                                Request Free Demo
                                <ArrowRight className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-200" />
                            </NavbarButton>
                            <NavbarButton
                                variant="secondary"
                                className="px-8 py-6 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20"
                                onClick={() => router.push("/contact")}
                            >
                                Talk to an Expert
                            </NavbarButton>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ─── Brain SVG Icon ───────────────────────────────────────────────────────────
function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
    );
}