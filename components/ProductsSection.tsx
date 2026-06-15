"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";
import { useRouter } from "next/navigation";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { BentoCard } from "@/components/magicui/bento-grid";
import {
    Brain, Sparkles, Database,
    Users, Kanban, Lightbulb, Activity, Shield, BarChart,
    ArrowRight, Zap,
} from "lucide-react";
import Image from "next/image";
import { SectionLightRay } from "@/components/SectionLightRay";

// ─── Section header ────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-14"
        >
            <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-4"
                style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa" }}
            >
                <Zap className="w-3 h-3" />
                {eyebrow}
            </span>
            <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">{title}</h3>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-[15px] px-4">{sub}</p>
        </motion.div>
    );
}

// ─── Orbit diagram using rAF + trig ───────────────────────────────────────
const INNER = [
    { Icon: Database, label: "ERP",  color: "#f97316" },
    { Icon: Users,    label: "HRMS", color: "#10b981" },
    { Icon: Activity, label: "CRM",  color: "#ec4899" },
];
const OUTER = [
    { Icon: Kanban,    label: "Projects",  color: "#3b82f6" },
    { Icon: Shield,    label: "Security",  color: "#06b6d4" },
    { Icon: Lightbulb, label: "Smart Sol", color: "#f59e0b" },
    { Icon: BarChart,  label: "Analytics", color: "#8b5cf6" },
];

function OrbitDiagram() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const rafRef    = useRef<number>(0);
    const startRef  = useRef<number | null>(null);

    const innerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
    const outerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

    useEffect(() => {
        const INNER_R  = 130;
        const OUTER_R  = 215;
        const INNER_DUR = 35000;
        const OUTER_DUR = 55000;

        const animate = (ts: number) => {
            if (!startRef.current) startRef.current = ts;
            const elapsed = ts - startRef.current;

            innerRefs.current.forEach((el, i) => {
                if (!el) return;
                const angle = (elapsed / INNER_DUR) * Math.PI * 2 + (i * Math.PI * 2) / INNER.length;
                const x = Math.cos(angle) * INNER_R;
                const y = Math.sin(angle) * INNER_R;
                el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });

            outerRefs.current.forEach((el, i) => {
                if (!el) return;
                const angle = -(elapsed / OUTER_DUR) * Math.PI * 2 + (i * Math.PI * 2) / OUTER.length;
                const x = Math.cos(angle) * OUTER_R;
                const y = Math.sin(angle) * OUTER_R;
                el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            });

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div
            ref={canvasRef}
            style={{
                position: "relative",
                width: 520,
                height: 520,
                maxWidth: "100%",
                margin: "0 auto",
            }}
        >
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: INNER.length > 0 ? 260 : 0, height: 260,
                marginTop: -130, marginLeft: -130,
                borderRadius: "50%",
                border: "1px dashed rgba(139,92,246,0.3)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "50%", left: "50%",
                width: 430, height: 430,
                marginTop: -215, marginLeft: -215,
                borderRadius: "50%",
                border: "1px dashed rgba(99,102,241,0.2)",
                pointerEvents: "none",
            }} />

            <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex", flexDirection: "column", alignItems: "center",
                zIndex: 20,
            }}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 96, height: 96, borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    boxShadow: "0 0 0 4px rgba(255,255,255,0.08), 0 0 50px rgba(139,92,246,0.5)",
                }}>
                    <Brain style={{ width: 48, height: 48, color: "#fff" }} />
                </div>
                <div style={{
                    marginTop: 10, padding: "4px 14px", borderRadius: 999,
                    background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)",
                    color: "#c4b5fd", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    backdropFilter: "blur(8px)", whiteSpace: "nowrap" as const,
                }}>
                    Siyaratech AI
                </div>
            </div>

            {INNER.map(({ Icon, label, color }, i) => (
                <div
                    key={label}
                    ref={el => { innerRefs.current[i] = el; }}
                    style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        width: 70, height: 70,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                    }}
                >
                    <div style={{
                        width: "100%", height: "100%",
                        borderRadius: "50%",
                        background: "#0e0e1f",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: `0 0 12px rgba(0,0,0,0.5), 0 0 8px ${color}33`,
                        backdropFilter: "blur(8px)",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 3,
                    }}>
                        <Icon style={{ width: 22, height: 22, color }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap" as const }}>{label}</span>
                    </div>
                </div>
            ))}

            {OUTER.map(({ Icon, label, color }, i) => (
                <div
                    key={label}
                    ref={el => { outerRefs.current[i] = el; }}
                    style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        width: 80, height: 80,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                    }}
                >
                    <div style={{
                        width: "100%", height: "100%",
                        borderRadius: "50%",
                        background: "#0e0e1f",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: `0 0 12px rgba(0,0,0,0.5), 0 0 8px ${color}33`,
                        backdropFilter: "blur(8px)",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: 3,
                    }}>
                        <Icon style={{ width: 26, height: 26, color }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap" as const, textAlign: "center" as const, lineHeight: 1.2 }}>{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function ProductsSection() {
    const router  = useRouter();
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    // Detect low-end / reduced-motion environments to scale back MagicBento effects
    const [reduceEffects, setReduceEffects] = useState(false);
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
        setReduceEffects(prefersReduced || isCoarsePointer || lowCores);
    }, []);

    const erpCards = erpSolutions.map((solution) => ({
        name: solution.title,
        description: solution.description,
        href: `/solutions/${solution.id}`,
        cta: solution.cta,
        background: (
            <Image
                className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                src={solution.image || ""}
                alt={`${solution.title} background`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        ),
        Icon: solution.icon,
        className: "col-span-1 row-span-1",
    }));

    const innovativeCards: BentoCardProps[] = innovativeProducts.map((product) => ({
        title: product.title,
        description: product.description,
        label: product.subtitle,
        icon: product.icon,
        color: "#060010",
        textAutoHide: false,
        image: product.image,
        onClick: () => router.push(`/solutions/${product.id}`),
        className: undefined,
    }));

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
    const item = {
        hidden: { opacity: 0, y: 24 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
    };

    return (
        <section id="products" className="relative overflow-hidden" style={{ background: "transparent" }}>
            <SectionLightRay segmentStart={0.375} segmentEnd={0.5} />

            <style>{`
                @keyframes gradientDrift {
                    0%,100% { background-position: 0% 50%; }
                    50%     { background-position: 100% 50%; }
                }
                @keyframes orbPulse {
                    0%,100% { box-shadow: 0 0 0 0 rgba(139,92,246,0.45); }
                    50%     { box-shadow: 0 0 0 18px rgba(139,92,246,0); }
                }
            `}</style>

            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div style={{ position:"absolute", top:"-8%",  right:"-4%", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)", filter:"blur(80px)" }} />
                <div style={{ position:"absolute", bottom:"-10%",left:"-4%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)",  filter:"blur(70px)" }} />
                <div style={{ position:"absolute", top:"40%",  left:"30%",  width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.04) 0%,transparent 70%)", filter:"blur(60px)" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">

                {/* ── HERO HEADER ── */}
                <div ref={heroRef} className="text-center mb-24">
                    <motion.div
                        initial={{ opacity:0, scale:0.92, y:20 }}
                        whileInView={{ opacity:1, scale:1, y:0 }}
                        viewport={{ once:true }}
                        transition={{ duration:0.7, ease:[0.23,1,0.32,1] }}
                    >
                        <motion.div
                            initial={{ opacity:0, y:-12 }}
                            whileInView={{ opacity:1, y:0 }}
                            viewport={{ once:true }}
                            transition={{ duration:0.5, delay:0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
                            style={{ background:"rgba(139,92,246,0.12)", border:"1px solid rgba(139,92,246,0.35)", color:"#a78bfa" }}
                        >
                            <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#8b5cf6", boxShadow:"0 0 8px #8b5cf6", animation:"orbPulse 2s ease infinite" }} />
                            AI-Native Enterprise Platform
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight" style={{ color:"#f1f5f9" }}>
                            Not Just Powered by AI.
                            <br />
                            <span style={{
                                background:"linear-gradient(135deg,#8b5cf6 0%,#6366f1 40%,#ec4899 80%,#f59e0b 100%)",
                                backgroundSize:"200% 200%",
                                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                                backgroundClip:"text", animation:"gradientDrift 5s ease infinite",
                            }}>
                                Driven by Intelligence.
                            </span>
                        </h2>

                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 px-4">
                            Experience the next generation of enterprise software. Our products don&apos;t just assist — they anticipate, adapt, and act.
                        </p>

                        <motion.div
                            initial={{ opacity:0, y:12 }}
                            whileInView={{ opacity:1, y:0 }}
                            viewport={{ once:true }}
                            transition={{ duration:0.5, delay:0.35 }}
                            className="flex items-center justify-center gap-4 flex-wrap"
                        >
                            <button
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300"
                                style={{ background:"linear-gradient(135deg,#8b5cf6 0%,#6366f1 100%)", boxShadow:"0 4px 24px rgba(139,92,246,0.35)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(139,92,246,0.5)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)";    (e.currentTarget as HTMLElement).style.boxShadow="0 4px 24px rgba(139,92,246,0.35)"; }}
                            >
                                Explore Products <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                                style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", color:"#cbd5e1" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.08)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"; }}
                            >
                                <Sparkles className="w-4 h-4 text-violet-400" /> Watch Demo
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── AI INTELLIGENCE CORE ── */}
                <motion.div
                    initial={{ opacity:0, y:40 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true, amount:0.3 }}
                    transition={{ duration:0.7, ease:[0.23,1,0.32,1] }}
                    className="mb-32 p-8 rounded-3xl relative overflow-hidden"
                    style={{
                        background:"linear-gradient(145deg,rgba(15,15,30,0.9) 0%,rgba(20,12,40,0.9) 100%)",
                        border:"1px solid rgba(139,92,246,0.2)",
                        boxShadow:"0 0 80px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage:"linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)",
                        backgroundSize:"50px 50px", opacity:0.02,
                    }} />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.6),rgba(99,102,241,0.6),transparent)" }} />

                    <div className="relative z-10 flex flex-col items-center w-full">
                        <span
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-4"
                            style={{ background:"rgba(139,92,246,0.15)", border:"1px solid rgba(139,92,246,0.3)", color:"#a78bfa" }}
                        >
                            <Brain className="w-3 h-3" /> Intelligence Core
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 text-center">Unified AI at the Center</h3>
                        <p className="text-slate-500 text-sm mb-10 text-center max-w-md px-4">
                            Every module is powered by a shared intelligence layer — learning, adapting, and orchestrating across your entire enterprise.
                        </p>

                        <OrbitDiagram />
                    </div>
                </motion.div>

                {/* ── ERP SOLUTIONS ── */}
                <div className="mb-28">
                    <SectionHeader
                        eyebrow="ERP Solutions"
                        title={<>Enterprise Operations, <span style={{ color:"#a78bfa" }}>Reimagined</span></>}
                        sub="Comprehensive planning tools powered by advanced AI to optimize every layer of your business operations."
                    />
                    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once:true, amount:0.15 }} className="max-w-5xl mx-auto">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{ background:"radial-gradient(ellipse 70% 50% at 50% 50%,rgba(139,92,246,0.06) 0%,transparent 70%)", filter:"blur(20px)" }} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {erpCards.map((card, i) => (
                                    <motion.div key={i} variants={item} className="h-[280px]">
                                        <BentoCard {...card} className="h-full w-full col-span-1 row-span-1" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── INNOVATIVE PRODUCTS ── */}
                <div>
                    <SectionHeader
                        eyebrow="Innovative Products"
                        title={<>Built for the <span style={{ color:"#f59e0b" }}>Digital Frontier</span></>}
                        sub="Cutting-edge applications designed to transform digital experiences across every domain."
                    />
                    <motion.div
                        initial={{ opacity:0, scale:0.97, y:20 }}
                        whileInView={{ opacity:1, scale:1, y:0 }}
                        viewport={{ once:true, amount:0.2 }}
                        transition={{ duration:0.6, ease:[0.23,1,0.32,1] }}
                        className="w-full max-w-5xl mx-auto"
                    >
                        <MagicBento
                            cards={innovativeCards}
                            enableStars={!reduceEffects}
                            enableSpotlight={!reduceEffects}
                            enableBorderGlow
                            enableTilt={!reduceEffects}
                            glowColor="139, 92, 246"
                        />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}