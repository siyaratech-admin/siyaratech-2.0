"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
    className?: string;
}

export default function PageHeader({
    title,
    subtitle,
    description,
    badge,
    className = "",
}: PageHeaderProps) {
    const brandGradient = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
    const brandGradientSweep = "linear-gradient(90deg, #833AB4, #FD1D1D, #FCB045, #FD1D1D, #833AB4)";

    return (
        <section className={`relative pt-32 pb-24 overflow-hidden ${className}`}>
            <style>{`
                @keyframes phSweep {
                    0%   { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                .ph-title {
                    background: ${brandGradientSweep};
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: phSweep 6s linear infinite;
                }

                @keyframes phDrift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(40px, -30px) scale(1.1); }
                }
                @keyframes phDrift2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(-30px, 40px) scale(0.95); }
                }
                .ph-orb-a { animation: phDrift 16s ease-in-out infinite; }
                .ph-orb-b { animation: phDrift2 20s ease-in-out infinite; }

                @keyframes phGridDrift {
                    0%   { background-position: 0 0; }
                    100% { background-position: 50px 50px; }
                }
                .ph-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: phGridDrift 10s linear infinite;
                    -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 100%);
                    mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 100%);
                }

                @keyframes phBadgePulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(252,176,69,0.5); }
                    50%      { box-shadow: 0 0 0 6px rgba(252,176,69,0); }
                }
                .ph-badge-dot { animation: phBadgePulse 2.2s ease-in-out infinite; }

                .ph-badge {
                    transition: transform 0.3s, border-color 0.3s, background 0.3s;
                }
                .ph-badge:hover {
                    transform: translateY(-2px);
                    border-color: rgba(252,176,69,0.5);
                    background: rgba(131,58,180,0.18);
                }

                @media (prefers-reduced-motion: reduce) {
                    .ph-title { animation: none; background-position: 0% center; }
                    .ph-orb-a, .ph-orb-b, .ph-grid, .ph-badge-dot { animation: none; }
                }
            `}</style>

            {/* ── Background layers ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Animated grid */}
                <div className="ph-grid absolute inset-0" />

                {/* Floating gradient orbs */}
                <div
                    className="ph-orb-a absolute top-[-10%] left-[10%] w-[480px] h-[480px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(131,58,180,0.18) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
                <div
                    className="ph-orb-b absolute bottom-[-15%] right-[8%] w-[420px] h-[420px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(253,29,29,0.14) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
                <div
                    className="absolute top-[20%] right-[25%] w-[300px] h-[300px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(252,176,69,0.1) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* Bottom fade into page background */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Badge
                            variant="outline"
                            className="ph-badge mb-7 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                            style={{
                                background: "rgba(131,58,180,0.12)",
                                border: "1px solid rgba(131,58,180,0.35)",
                                color: "#FCB045",
                            }}
                        >
                            <span
                                className="ph-badge-dot inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: "#FCB045" }}
                            />
                            <Sparkles className="h-3 w-3" />
                            {badge}
                        </Badge>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="ph-title text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl md:text-2xl font-semibold text-white/70 mb-6"
                    >
                        {subtitle}
                    </motion.h2>
                )}

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        {description}
                    </motion.p>
                )}

                {/* Decorative rule */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mt-9 h-[3px] w-14 rounded-full"
                    style={{ background: brandGradient }}
                />
            </div>
        </section>
    );
}