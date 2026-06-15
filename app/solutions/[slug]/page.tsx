import React from "react";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronRight, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModuleGuide } from "@/components/ModuleGuide";
import BlurText from "@/components/TextAnimations/BlurText/BlurText";
import BenefitsSection from "@/components/BenefitsSection";
import ProductGallery from "@/components/ProductGallery";
import ThemeAwareBeams from "@/components/ThemeAwareBeams";

// ─── Animation wrapper (server-safe: just adds CSS classes) ──────────────────
// We use CSS animations so this stays a Server Component.
// The actual keyframe classes are defined in globals.css or via Tailwind config.

const allSolutions = [...erpSolutions, ...innovativeProducts];

export default async function SolutionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const solution = allSolutions.find((s) => s.id === slug);

    if (!solution) notFound();

    const Icon = solution.icon;
    const hasGallery = solution.gallery && solution.gallery.length > 0;
    const hasVideoInContent = solution.id === "influencer-platform";

    const benefitsData =
        solution.benefits?.map((b) => ({
            title: b.title,
            description: b.description,
        })) || [];

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

            {/* ── HERO ───────────────────────────────────────────────────────────── */}
            <section className="relative w-full min-h-screen flex flex-col pt-20 pb-0 overflow-hidden">

                {/* Layered background */}
                <div className="absolute inset-0 z-0">
                    <ThemeAwareBeams />
                    {/* Radial vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,hsl(var(--background))_100%)] pointer-events-none" />
                    {/* Brand gradient accent – top-right bloom */}
                    <div
                        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(131,58,180,0.18) 0%, rgba(253,29,29,0.10) 50%, transparent 70%)",
                            filter: "blur(60px)",
                        }}
                    />
                    {/* Brand gradient accent – bottom-left bloom */}
                    <div
                        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(252,176,69,0.12) 0%, rgba(253,29,29,0.07) 50%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                    />
                    {/* Bottom fade into body */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                </div>

                {/* Back nav */}
                <div className="relative z-50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-10">
                    <Link href="/products" passHref>
                        <Button
                            variant="ghost"
                            className="group pl-0 pr-4 hover:bg-white/5 text-foreground/50 hover:text-foreground transition-all rounded-full border border-transparent hover:border-white/10 backdrop-blur-sm gap-2"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Products
                        </Button>
                    </Link>
                </div>

                {/* Hero grid */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center flex-grow pb-20">

                    {/* ── Left: Copy ── */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left space-y-7">

                        {/* Live badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                            style={{ animationDelay: "0ms" }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-xs font-semibold text-foreground/70 tracking-widest uppercase">
                                {solution.subtitle}
                            </span>
                        </div>

                        {/* Title */}
                        <div className="w-full">
                            <BlurText
                                text={solution.title}
                                delay={25}
                                animateBy="words"
                                direction="bottom"
                                className="text-left text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[1.05]"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-foreground/55 max-w-xl leading-relaxed">
                            {solution.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {solution.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-md border border-white/8 bg-white/4 text-[11px] font-mono text-foreground/40 tracking-widest uppercase hover:border-white/20 hover:text-foreground/60 transition-all cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link href="/contact">
                                {/* Gradient button matching hero brand */}
                                <button
                                    className="group relative inline-flex h-12 items-center gap-2 px-8 rounded-full font-semibold text-sm text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
                                        boxShadow: "0 0 30px rgba(253,29,29,0.35)",
                                    }}
                                >
                                    <span className="relative z-10">Book a Live Demo</span>
                                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    {/* Shimmer sweep */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </button>
                            </Link>
                            <ModuleGuide solutionId={solution.id} />
                        </div>

                        {/* Stat row */}
                        <div className="flex gap-8 pt-4 border-t border-white/6 w-full">
                            {[
                                { value: "99.9%", label: "Uptime SLA" },
                                { value: "< 2s", label: "Response time" },
                                { value: "SOC 2", label: "Certified" },
                            ].map((s) => (
                                <div key={s.label} className="flex flex-col gap-0.5">
                                    <span
                                        className="text-xl font-bold"
                                        style={{
                                            background:
                                                "linear-gradient(90deg,#833AB4,#FD1D1D,#FCB045)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {s.value}
                                    </span>
                                    <span className="text-xs text-foreground/40 uppercase tracking-wider font-mono">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Product visual ── */}
                    <div className="lg:col-span-6 xl:col-span-5 relative group">
                        {/* Outer glow ring */}
                        <div
                            className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                                background:
                                    "linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)",
                                filter: "blur(1px)",
                            }}
                        />
                        {/* Card */}
                        <div className="relative rounded-3xl bg-card border border-white/8 overflow-hidden shadow-2xl aspect-[4/3] flex items-center justify-center">
                            {/* Noise texture overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                                }}
                            />

                            {solution.image ? (
                                <Image
                                    src={solution.image}
                                    alt={solution.title}
                                    fill
                                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className="w-24 h-24 rounded-2xl flex items-center justify-center"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,rgba(131,58,180,0.2),rgba(253,29,29,0.2))",
                                            border: "1px solid rgba(131,58,180,0.3)",
                                        }}
                                    >
                                        <Icon className="w-12 h-12 text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500" />
                                    </div>
                                    <span className="text-xs font-mono text-foreground/20 tracking-widest uppercase">
                                        {solution.title}
                                    </span>
                                </div>
                            )}

                            {/* macOS dots */}
                            <div className="absolute top-4 left-4 flex gap-2 z-10">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                            </div>

                            {/* Bottom gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-foreground/60">
                        Scroll
                    </span>
                    <div className="w-px h-8 bg-gradient-to-b from-foreground/60 to-transparent" />
                </div>
            </section>

            {/* ── MAIN BODY ──────────────────────────────────────────────────────── */}
            <main className="relative z-10 bg-background">

                {/* ── GALLERY ── */}
                {hasGallery && (
                    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        {/* Section header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
                            <div>
                                <p className="text-xs font-mono text-foreground/30 tracking-widest uppercase mb-3">
                                    — Interface preview
                                </p>
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                                    See It In Action
                                </h2>
                            </div>
                            <p className="text-sm text-foreground/40 max-w-xs text-right">
                                Designed for speed, clarity, and zero friction.
                            </p>
                        </div>

                        <ProductGallery
                            gallery={solution.gallery || []}
                            solutionId={solution.id}
                        />
                    </section>
                )}

                {/* ── CONTENT / VIDEO ── */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    {hasVideoInContent && (
                        <div
                            className="mb-16 aspect-video rounded-3xl overflow-hidden border border-white/8 shadow-2xl"
                            style={{ boxShadow: "0 0 60px rgba(131,58,180,0.15)" }}
                        >
                            <div className="prose prose-invert max-w-none w-full h-full [&>div>video]:w-full [&>div>video]:h-full [&>div>video]:object-cover [&>div>p]:hidden [&>div]:h-full [&>div]:w-full">
                                {solution.content}
                            </div>
                        </div>
                    )}
                    <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/60 prose-p:leading-loose max-w-none">
                        <div className={`space-y-8 ${hasVideoInContent ? "[&>div>video]:hidden" : ""}`}>
                            {solution.content}
                        </div>
                    </div>
                </section>

                {/* ── BENEFITS ── */}
                {benefitsData.length > 0 && (
                    <BenefitsSection title={solution.title} benefits={benefitsData} />
                )}

                {/* ── CORE CAPABILITIES ── */}
                <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Divider line with gradient */}
                    <div
                        className="h-px w-full mb-24"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(131,58,180,0.4), rgba(253,29,29,0.4), rgba(252,176,69,0.4), transparent)",
                        }}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
                        <div>
                            <p className="text-xs font-mono text-foreground/30 tracking-widest uppercase mb-3">
                                — What's included
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Core Capabilities
                            </h2>
                        </div>
                        <span className="text-sm text-foreground/30 font-mono">
                            {solution.features?.length ?? 0} features
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {solution.features?.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-6 rounded-2xl bg-card border border-white/6 overflow-hidden hover:border-white/16 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                                style={{
                                    ["--glow" as string]: `rgba(${index % 3 === 0
                                            ? "131,58,180"
                                            : index % 3 === 1
                                                ? "253,29,29"
                                                : "252,176,69"
                                        },0.12)`,
                                }}
                            >
                                {/* Corner glow on hover */}
                                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -translate-y-12 translate-x-12"
                                    style={{ background: "var(--glow)", filter: "blur(20px)" }}
                                />

                                <div className="flex items-start gap-4 relative z-10">
                                    {/* Numbered icon */}
                                    <div
                                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-all duration-300"
                                        style={{
                                            background:
                                                index % 3 === 0
                                                    ? "rgba(131,58,180,0.15)"
                                                    : index % 3 === 1
                                                        ? "rgba(253,29,29,0.12)"
                                                        : "rgba(252,176,69,0.12)",
                                            color:
                                                index % 3 === 0
                                                    ? "#a855f7"
                                                    : index % 3 === 1
                                                        ? "#ef4444"
                                                        : "#f59e0b",
                                            border: `1px solid ${index % 3 === 0
                                                    ? "rgba(131,58,180,0.25)"
                                                    : index % 3 === 1
                                                        ? "rgba(253,29,29,0.20)"
                                                        : "rgba(252,176,69,0.20)"
                                                }`,
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-foreground mb-1.5 group-hover:text-white transition-colors leading-snug">
                                            {feature}
                                        </h3>
                                        <p className="text-xs text-foreground/35 leading-relaxed">
                                            Enterprise-grade • Available on all plans
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FAQ ── */}
                {solution.faq && (
                    <section className="py-24 max-w-3xl mx-auto px-4">
                        <div className="text-center mb-14">
                            <p className="text-xs font-mono text-foreground/30 tracking-widest uppercase mb-3">
                                — Got questions?
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Frequently Asked
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {solution.faq.map(
                                (item: { question: string; answer: string }, index: number) => (
                                    <details
                                        key={index}
                                        className="group rounded-2xl border border-white/6 bg-card overflow-hidden open:border-white/12 transition-all duration-300"
                                    >
                                        <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                                            <span className="font-semibold text-sm text-foreground/70 group-hover:text-foreground transition-colors pr-4 leading-snug">
                                                {item.question}
                                            </span>
                                            <ChevronRight className="shrink-0 w-4 h-4 text-foreground/30 transform transition-transform duration-300 group-open:rotate-90" />
                                        </summary>
                                        <div className="px-6 pb-6 pt-0 text-sm text-foreground/50 leading-relaxed border-t border-white/6">
                                            <p className="pt-4">{item.answer}</p>
                                        </div>
                                    </details>
                                )
                            )}
                        </div>
                    </section>
                )}

                {/* ── BOTTOM CTA ── */}
                <section className="relative py-36 px-4 overflow-hidden">
                    {/* Background treatment */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Central glow */}
                        <div
                            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px]"
                            style={{
                                background:
                                    "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(131,58,180,0.12) 0%, rgba(253,29,29,0.08) 40%, transparent 70%)",
                            }}
                        />
                        {/* Horizontal rule lines */}
                        <div
                            className="absolute inset-x-0 top-0 h-px"
                            style={{
                                background:
                                    "linear-gradient(90deg,transparent,rgba(131,58,180,0.4),rgba(253,29,29,0.4),rgba(252,176,69,0.3),transparent)",
                            }}
                        />
                        <div
                            className="absolute inset-x-0 bottom-0 h-px"
                            style={{
                                background:
                                    "linear-gradient(90deg,transparent,rgba(252,176,69,0.3),rgba(253,29,29,0.4),rgba(131,58,180,0.4),transparent)",
                            }}
                        />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
                        {/* Zap icon with glow */}
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg,rgba(131,58,180,0.25),rgba(253,29,29,0.25))",
                                border: "1px solid rgba(131,58,180,0.3)",
                                boxShadow: "0 0 30px rgba(131,58,180,0.2)",
                            }}
                        >
                            <Zap className="w-6 h-6 text-purple-400" />
                        </div>

                        <div className="space-y-4">
                            <h2
                                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.0]"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#ffffff 0%,rgba(255,255,255,0.7) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Ready to transform?
                            </h2>
                            <p className="text-lg text-foreground/40 max-w-lg mx-auto">
                                Join thousands of businesses already running on {solution.title}.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                            <Link href="/contact">
                                <button
                                    className="group relative inline-flex h-14 items-center gap-3 px-10 rounded-full font-semibold text-base text-white overflow-hidden transition-transform hover:scale-105 active:scale-95"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
                                        boxShadow: "0 0 40px rgba(253,29,29,0.30)",
                                    }}
                                >
                                    <span className="relative z-10">Start Free Pilot</span>
                                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </button>
                            </Link>

                            <Link href="/products">
                                <button className="h-14 px-10 rounded-full font-semibold text-base text-foreground/60 border border-white/10 hover:border-white/20 hover:text-foreground bg-white/3 hover:bg-white/6 transition-all duration-300 backdrop-blur-sm">
                                    View All Products
                                </button>
                            </Link>
                        </div>

                        {/* Trust micro-copy */}
                        <p className="text-xs text-foreground/25 font-mono tracking-wider mt-2">
                            No credit card required &nbsp;·&nbsp; Setup in minutes &nbsp;·&nbsp; Cancel anytime
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}