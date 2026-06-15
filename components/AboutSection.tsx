"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Shield, Heart, Sparkles } from 'lucide-react';
import FoundersSection from '@/components/FoundersSection';

const brandGradient = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-transparent relative overflow-hidden">
            <style>{`
                @keyframes aboutOrbA {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(40px, -30px) scale(1.08); }
                }
                @keyframes aboutOrbB {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(-30px, 40px) scale(0.95); }
                }
                .about-orb-a { animation: aboutOrbA 18s ease-in-out infinite; }
                .about-orb-b { animation: aboutOrbB 22s ease-in-out infinite; }

                @keyframes aboutBadgePulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(252,176,69,0.5); }
                    50%      { box-shadow: 0 0 0 6px rgba(252,176,69,0); }
                }
                .about-badge-dot { animation: aboutBadgePulse 2.2s ease-in-out infinite; }

                .about-title-accent {
                    background: ${brandGradient};
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .value-card {
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.35s cubic-bezier(.22,1,.36,1), border-color 0.35s, background 0.35s;
                }
                .value-card:hover {
                    transform: translateY(-6px);
                    border-color: rgba(131,58,180,0.35);
                }
                .value-card::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: ${brandGradient};
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.45s cubic-bezier(.22,1,.36,1);
                }
                .value-card:hover::before { transform: scaleX(1); }

                .value-icon {
                    transition: transform 0.4s cubic-bezier(.22,1,.36,1), background 0.4s, color 0.4s;
                }
                .value-card:hover .value-icon {
                    transform: scale(1.1) rotate(-6deg);
                    background: ${brandGradient};
                    color: #fff;
                }

                .story-img-wrap {
                    transition: transform 0.5s cubic-bezier(.22,1,.36,1);
                }
                .story-img-wrap:hover {
                    transform: scale(1.015);
                }

                @media (prefers-reduced-motion: reduce) {
                    .about-orb-a, .about-orb-b, .about-badge-dot { animation: none; }
                    .value-card, .value-icon, .story-img-wrap { transition: none; }
                }
            `}</style>

            {/* ── Ambient background orbs ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="about-orb-a absolute top-[-10%] left-[5%] w-[460px] h-[460px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(131,58,180,0.12) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
                <div
                    className="about-orb-b absolute bottom-[-10%] right-[5%] w-[420px] h-[420px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(253,29,29,0.1) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={container}
                    className="text-center mb-20"
                >
                    <motion.div variants={fadeUp}>
                        <Badge
                            variant="outline"
                            className="mb-6 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                            style={{
                                background: "rgba(131,58,180,0.12)",
                                border: "1px solid rgba(131,58,180,0.35)",
                                color: "#FCB045",
                            }}
                        >
                            <span
                                className="about-badge-dot inline-block h-1.5 w-1.5 rounded-full"
                                style={{ background: "#FCB045" }}
                            />
                            <Sparkles className="h-3 w-3" />
                            Who We Are
                        </Badge>
                    </motion.div>

                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Innovation Driven by{" "}
                        <span className="about-title-accent">Purpose</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        We&apos;re a team of passionate technologists, strategists, and innovators dedicated to helping businesses thrive in the digital age.
                    </motion.p>
                </motion.div>

                {/* ── Company Story ── */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div
                            className="absolute inset-0 rounded-2xl blur-3xl"
                            style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.25), rgba(253,29,29,0.15))" }}
                        />
                        <div className="story-img-wrap relative">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                                alt="Team collaboration"
                                width={800}
                                height={600}
                                className="relative rounded-2xl shadow-2xl border border-white/10"
                            />
                            {/* Subtle gradient frame on hover */}
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                style={{
                                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="text-3xl font-bold mb-6">Our Story</h3>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            Founded with a vision to bridge the gap between complex technology and business value, Siyaratech has grown from a small consultancy to a global technology partner.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We believe that technology should be an enabler, not a barrier. Our mission is to democratize access to cutting-edge solutions and empower organizations of all sizes to achieve their full potential.
                        </p>

                        {/* Decorative rule */}
                        <div
                            className="mt-8 h-[3px] w-14 rounded-full"
                            style={{ background: brandGradient }}
                        />
                    </motion.div>
                </div>

                {/* ── Values ── */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={container}
                    className="grid md:grid-cols-3 gap-8 mb-24"
                >
                    {[
                        {
                            icon: Rocket,
                            title: "Innovation First",
                            description: "We constantly push boundaries to deliver forward-thinking solutions."
                        },
                        {
                            icon: Shield,
                            title: "Trust & Integrity",
                            description: "We build lasting partnerships based on transparency and reliability."
                        },
                        {
                            icon: Heart,
                            title: "Client Success",
                            description: "Your growth is our priority. We succeed when you succeed."
                        }
                    ].map((value, index) => (
                        <motion.div key={index} variants={fadeUp}>
                            <Card className="value-card p-8 border-primary/10 bg-primary/5 h-full">
                                <div className="value-icon w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Founders Section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <FoundersSection />
                </motion.div>
            </div>
        </section>
    );
}