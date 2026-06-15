// app/industries/[slug]/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { getIndustryData, getAllIndustrySlugs } from "@/lib/industries-data";
import HeroInteractive from "@/components/HeroInteractive";
import StatCounter from "@/components/StatCounter";

// ─── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
    return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const industry = getIndustryData(params.slug);
    if (!industry) return {};
    return {
        title: `${industry.name} Solutions | Siyaratech`,
        description: industry.description,
    };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
    const industry = getIndustryData(params.slug);
    if (!industry) notFound();

    const { name, tagline, description, heroImage, accentColor, stats, challenges, solutions } = industry;

    const brandGradient = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
    const brandGradientSweep = "linear-gradient(90deg, #833AB4, #FD1D1D, #FCB045, #FD1D1D, #833AB4)";

    return (
        <>
            <style>{`
                /* ── Animated gradient title sweep ── */
                @keyframes sweep {
                    0%   { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                .brand-title {
                    background: ${brandGradientSweep};
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: sweep 5s linear infinite;
                    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 0.95;
                }

                /* ── Page-load reveals ── */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                .r1 { animation: fadeIn  0.5s ease 0.05s both; }
                .r2 { animation: fadeUp  0.6s cubic-bezier(.22,1,.36,1) 0.15s both; }
                .r3 { animation: fadeUp  0.6s cubic-bezier(.22,1,.36,1) 0.28s both; }
                .r4 { animation: fadeUp  0.6s cubic-bezier(.22,1,.36,1) 0.40s both; }
                .r5 { animation: fadeUp  0.6s cubic-bezier(.22,1,.36,1) 0.52s both; }
                .r6 { animation: fadeUp  0.6s cubic-bezier(.22,1,.36,1) 0.64s both; }

                /* ── Staggered cards ── */
                .s-card { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
                .s-card:nth-child(1) { animation-delay: 0.05s; }
                .s-card:nth-child(2) { animation-delay: 0.13s; }
                .s-card:nth-child(3) { animation-delay: 0.21s; }
                .s-card:nth-child(4) { animation-delay: 0.29s; }
                .s-card:nth-child(5) { animation-delay: 0.37s; }
                .s-card:nth-child(6) { animation-delay: 0.45s; }

                /* ── Stat counters ── */
                .stat-num { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
                .stat-num:nth-child(1) { animation-delay: 0.05s; }
                .stat-num:nth-child(2) { animation-delay: 0.15s; }
                .stat-num:nth-child(3) { animation-delay: 0.25s; }
                .stat-num:nth-child(4) { animation-delay: 0.35s; }

                /* ── Solution card top-line reveal on hover ── */
                .sol-line {
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.45s cubic-bezier(.22,1,.36,1);
                }
                .sol-card:hover .sol-line { transform: scaleX(1); }

                /* ── Challenge number gradient on card hover ── */
                .ch-num {
                    color: rgba(255,255,255,0.05);
                    transition: color 0.3s;
                }
                .ch-card:hover .ch-num {
                    background: ${brandGradient};
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .ch-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    transition: background 0.3s, border-color 0.3s, transform 0.3s;
                }
                .ch-card:hover {
                    background: rgba(131,58,180,0.07);
                    border-color: rgba(131,58,180,0.25);
                }

                .sol-card {
                    background: rgba(255,255,255,0.035);
                    border: 1px solid rgba(255,255,255,0.07);
                    transition: border-color 0.3s, transform 0.3s;
                }
                .sol-card:hover {
                    border-color: rgba(131,58,180,0.3);
                }

                .sol-footer {
                    opacity: 0;
                    transform: translateY(6px);
                    transition: opacity 0.3s, transform 0.3s;
                }
                .sol-card:hover .sol-footer {
                    opacity: 1;
                    transform: translateY(0);
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 4px 24px rgba(131,58,180,0.4); }
                    50%      { box-shadow: 0 4px 40px rgba(253,29,29,0.5), 0 0 60px rgba(252,176,69,0.25); }
                }
                .cta-primary { animation: glow 3s ease-in-out infinite; }
                .cta-primary:hover { transform: scale(1.03); }
                .cta-primary { transition: transform 0.2s; }

                /* ── HERO: animated grid backdrop ── */
                @keyframes gridDrift {
                    0%   { background-position: 0 0; }
                    100% { background-position: 60px 60px; }
                }
                .hero-grid {
                    background-image:
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 60px 60px;
                    animation: gridDrift 12s linear infinite;
                    -webkit-mask-image: radial-gradient(ellipse 75% 55% at 50% 40%, black 30%, transparent 100%);
                    mask-image: radial-gradient(ellipse 75% 55% at 50% 40%, black 30%, transparent 100%);
                }

                /* ── HERO: floating orbs ── */
                @keyframes floatA {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(30px, -40px) scale(1.08); }
                }
                @keyframes floatB {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%      { transform: translate(-40px, 30px) scale(0.95); }
                }
                .orb-a { animation: floatA 14s ease-in-out infinite; }
                .orb-b { animation: floatB 18s ease-in-out infinite; }

                /* ── HERO: badge pulse dot ── */
                @keyframes pulseDot {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(252,176,69,0.55); }
                    50%      { box-shadow: 0 0 0 5px rgba(252,176,69,0); }
                }
                .pulse-dot {
                    animation: pulseDot 2s ease-in-out infinite;
                }

                /* ── HERO: scroll cue ── */
                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); opacity: 0.6; }
                    50%      { transform: translateY(8px); opacity: 1; }
                }
                .scroll-cue { animation: scrollBounce 2s ease-in-out infinite; }

                /* ── HERO: title hover shimmer ── */
                .hero-title-wrap {
                    position: relative;
                    display: inline-block;
                }
                .hero-title-wrap::after {
                    content: "";
                    position: absolute;
                    inset: -8% -4%;
                    background: radial-gradient(circle, rgba(131,58,180,0.25), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                    filter: blur(20px);
                    z-index: -1;
                }
                .hero-title-wrap:hover::after {
                    opacity: 1;
                }

                @media (prefers-reduced-motion: reduce) {
                    .brand-title { animation: none; background-position: 0% center; }
                    .r1,.r2,.r3,.r4,.r5,.r6,.s-card,.stat-num {
                        animation: none; opacity: 1; transform: none;
                    }
                    .cta-primary, .hero-grid, .orb-a, .orb-b, .pulse-dot, .scroll-cue {
                        animation: none;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

                {/* ══════════════════════════════════════════════════════════════
                    HERO — interactive, layered, image visible
                ══════════════════════════════════════════════════════════════ */}
                <section className="relative min-h-[92vh] flex items-center overflow-hidden">

                    {/* ── Background image (lighter filter so it's visible) ── */}
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt={name}
                            fill
                            className="object-cover object-center"
                            priority
                            style={{ filter: "brightness(0.4) saturate(1.05)" }}
                        />
                    </div>

                    {/* ── Animated grid overlay (masked so it fades at edges) ── */}
                    <div className="hero-grid absolute inset-0 pointer-events-none" />

                    {/* ── Floating gradient orbs ── */}
                    <div
                        className="orb-a absolute -top-32 right-[8%] w-[420px] h-[420px] rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(131,58,180,0.25) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                    />
                    <div
                        className="orb-b absolute bottom-[-10%] left-[18%] w-[360px] h-[360px] rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(253,29,29,0.15) 0%, transparent 70%)",
                            filter: "blur(50px)",
                        }}
                    />

                    {/* ── Overlays: lighter vignette so image stays visible ── */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/65 via-transparent to-[#0a0a0f]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-[#0a0a0f]/25 to-transparent" />
                    <div
                        className="absolute bottom-0 left-0 w-2/3 h-1/2 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse at 20% 100%, rgba(131,58,180,0.16) 0%, transparent 65%)",
                        }}
                    />

                    {/* ── Mouse-reactive spotlight (client component) ── */}
                    <HeroInteractive accentColor={accentColor} />

                    {/* ── Back nav ── */}
                    <div className="r1 absolute top-8 left-0 right-0 z-20">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8">
                            <Link
                                href="/industries"
                                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/90 transition-colors duration-200 group"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                                All Industries
                            </Link>
                        </div>
                    </div>

                    {/* ── Hero text block ── */}
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-24">
                        {/* Eyebrow with live pulse */}
                        <div className="r2 mb-7">
                            <span
                                className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full"
                                style={{
                                    background: "rgba(131,58,180,0.14)",
                                    border: "1px solid rgba(131,58,180,0.35)",
                                    color: "#FCB045",
                                }}
                            >
                                <span
                                    className="pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                                    style={{ background: "#FCB045" }}
                                />
                                Industry Solutions
                            </span>
                        </div>

                        {/* ── TITLE: with glow-on-hover wrapper ── */}
                        <div className="hero-title-wrap">
                            <h1 className="r3 brand-title text-[clamp(3.5rem,9vw,7rem)] mb-6 max-w-3xl">
                                {name}
                            </h1>
                        </div>

                        {/* Tagline */}
                        <p className="r4 text-lg md:text-xl font-semibold text-white/65 max-w-xl leading-snug mb-4">
                            {tagline}
                        </p>

                        {/* Description */}
                        <p className="r5 text-sm md:text-base text-white/38 max-w-lg leading-relaxed mb-9">
                            {description}
                        </p>

                        {/* Thin rule */}
                        <div
                            className="r5 h-[3px] w-12 rounded-full mb-9"
                            style={{ background: brandGradient }}
                        />

                        {/* ── Inline quick-stat pills ── */}
                        <div className="r6 flex flex-wrap gap-3">
                            {stats.slice(0, 3).map((stat, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    <span
                                        className="text-lg font-extrabold tabular-nums"
                                        style={{ color: accentColor }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="text-[11px] text-white/50 leading-tight max-w-[90px]">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Scroll cue ── */}
                    <div className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
                        <div className="w-px h-8" style={{ background: brandGradient }} />
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════════
                    STATS — count-up on scroll
                ══════════════════════════════════════════════════════════════ */}
                <section className="relative">
                    <div className="absolute top-0 inset-x-0 h-px" style={{ background: brandGradient }} />
                    <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: brandGradient }} />

                    <div
                        className="max-w-7xl mx-auto"
                        style={{ background: "rgba(131,58,180,0.05)" }}
                    >
                        <div
                            className="grid grid-cols-2 md:grid-cols-4"
                            style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
                        >
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="stat-num flex flex-col items-center justify-center py-10 px-6 text-center bg-[#0a0a0f] transition-colors duration-300 hover:bg-[rgba(131,58,180,0.06)]"
                                    style={{ background: "rgba(10,10,15,0.97)" }}
                                >
                                    <StatCounter value={stat.value} color={accentColor} />
                                    <p className="text-xs text-white/35 leading-snug max-w-[110px] mt-2">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════════
                    CHALLENGES
                ══════════════════════════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                            <div>
                                <p
                                    className="text-[10px] font-black uppercase tracking-[0.24em] mb-5"
                                    style={{
                                        background: brandGradient,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    The Challenge
                                </p>
                                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight max-w-lg">
                                    What{" "}
                                    <span
                                        style={{
                                            background: brandGradient,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {name}
                                    </span>{" "}
                                    leaders face today
                                </h2>
                            </div>
                            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                                Industry-specific friction demands industry-specific solutions.
                                These are the pain points we eliminate.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {challenges.map((challenge, i) => (
                                <div
                                    key={i}
                                    className="ch-card s-card group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <div
                                        className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: brandGradient }}
                                    />

                                    <span className="ch-num block text-7xl font-extrabold leading-none mb-3 tabular-nums select-none">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <h3 className="font-bold text-white/85 mb-2 text-[13px] leading-snug">
                                        {challenge.title}
                                    </h3>
                                    <p className="text-[12px] text-white/30 leading-relaxed">
                                        {challenge.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════════
                    SOLUTIONS
                ══════════════════════════════════════════════════════════════ */}
                <section className="py-28 relative">
                    <div className="absolute top-0 inset-x-0 h-px" style={{ background: brandGradient }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(255,255,255,0.012)" }} />

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <p
                                className="text-[10px] font-black uppercase tracking-[0.24em] mb-5 inline-block"
                                style={{
                                    background: brandGradient,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Our Solutions
                            </p>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                                How we solve it
                            </h2>
                            <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
                                Purpose-built for the unique demands of the{" "}
                                <span style={{ color: "#FCB045" }}>{name.toLowerCase()}</span> sector.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {solutions.map((solution, i) => (
                                <div
                                    key={i}
                                    className="sol-card s-card group relative rounded-2xl p-7 overflow-hidden flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <div
                                        className="sol-line absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                                        style={{ background: brandGradient }}
                                    />

                                    <div
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                                        style={{
                                            background: "rgba(131,58,180,0.12)",
                                            border: "1px solid rgba(131,58,180,0.22)",
                                        }}
                                    >
                                        {solution.icon}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-white/90 mb-1.5 text-[14px] leading-snug">
                                            {solution.title}
                                        </h3>
                                        <p className="text-xs text-white/32 leading-relaxed">
                                            {solution.description}
                                        </p>
                                    </div>

                                    <div className="sol-footer flex items-center gap-1.5 text-[11px] font-semibold">
                                        <Zap
                                            className="h-3 w-3 shrink-0"
                                            style={{ color: "#FCB045" }}
                                        />
                                        <span
                                            style={{
                                                background: brandGradient,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            }}
                                        >
                                            Part of the {name} suite
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════════
                    CTA
                ══════════════════════════════════════════════════════════════ */}
                <section className="py-32 relative overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(131,58,180,0.1) 0%, transparent 70%)",
                        }}
                    />
                    <div className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                    <div className="relative max-w-2xl mx-auto px-6 text-center">
                        <p
                            className="text-[10px] font-black uppercase tracking-[0.24em] mb-8 inline-block"
                            style={{
                                background: brandGradient,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Get Started
                        </p>

                        <h2 className="text-5xl md:text-6xl font-extrabold leading-[0.95] tracking-tight mb-7">
                            Ready to transform{" "}
                            <span className="brand-title" style={{ display: "inline" }}>
                                {name.toLowerCase()}
                            </span>
                            ?
                        </h2>

                        <p className="text-white/35 text-base mb-12 leading-relaxed">
                            Let's talk about delivering measurable results for your organization.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/contact"
                                className="cta-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white"
                                style={{ background: brandGradient }}
                            >
                                Talk to an Expert
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/industries"
                                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white/50 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all duration-200 bg-white/[0.03] hover:bg-white/[0.06]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Other Industries
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}