"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/lib/caseStudies";

/* ─── Types ──────────────────────────────────────────────────────── */
type CaseStudySectionData = {
    title: string;
    image: string;
    description: string;
    list?: string[];
    className?: string;
};

/* ─── Gradient palette (matching site theme) ─────────────────────── */
const G = { purple: "#833AB4", red: "#FD1D1D", gold: "#FCB045" } as const;
const GRAD = `linear-gradient(135deg, ${G.purple}, ${G.red}, ${G.gold})`;
const GRAD_TEXT = {
    background: GRAD,
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
};

/* ─── useInView hook ─────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ─── Reveal wrapper ─────────────────────────────────────────────── */
function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const { ref, visible } = useInView();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─── Gradient divider ───────────────────────────────────────────── */
function GradLine({ className }: { className?: string }) {
    return (
        <div
            className={cn("h-px w-full", className)}
            style={{ background: `linear-gradient(90deg, transparent, ${G.purple}, ${G.red}, ${G.gold}, transparent)` }}
        />
    );
}

/* ─── Section card ───────────────────────────────────────────────── */
function SectionCard({ section, index }: { section: CaseStudySectionData; index: number }) {
    const { ref, visible } = useInView(0.1);
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
                transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
            }}
        >
            <div
                className="group relative rounded-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                }}
            >
                {/* Gradient border on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{
                        padding: "1px",
                        background: GRAD,
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />

                {/* Spotlight glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                        background: isEven
                            ? `radial-gradient(circle at 20% 50%, rgba(131,58,180,0.1), transparent 60%)`
                            : `radial-gradient(circle at 80% 50%, rgba(253,29,29,0.1), transparent 60%)`,
                    }}
                />

                <div className={cn("flex flex-col lg:flex-row gap-0", !isEven && "lg:flex-row-reverse")}>
                    {/* Image */}
                    <div className="relative lg:w-1/2 min-h-[260px] overflow-hidden">
                        <NextImage
                            src={section.image || "/placeholder.svg"}
                            alt={section.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: isEven
                                    ? "linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.85))"
                                    : "linear-gradient(270deg, transparent 60%, rgba(0,0,0,0.85))",
                            }}
                        />
                        {/* Index badge */}
                        <div
                            className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                            style={{ background: GRAD }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </div>
                    </div>

                    {/* Text */}
                    <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center gap-4">
                        <h3
                            className="text-2xl font-bold tracking-tight"
                            style={GRAD_TEXT}
                        >
                            {section.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-neutral-400">{section.description}</p>

                        {section.list && section.list.length > 0 && (
                            <ul className="space-y-2 mt-2">
                                {section.list.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                                        <ChevronRight
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                            style={{ color: G.purple }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main page ──────────────────────────────────────────────────── */
export default function CaseStudyDetailPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug as string;

    const currentCaseStudy = caseStudies.find((c) => c.slug === slug);

    /* Hero parallax */
    const heroRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handle = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handle, { passive: true });
        return () => window.removeEventListener("scroll", handle);
    }, []);

    if (!currentCaseStudy) {
        const title = slug
            ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
            : "";
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 pt-24 bg-black min-h-screen">
                <Button onClick={() => router.back()} variant="ghost" className="mb-8 text-neutral-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Button>
                <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
                <p className="text-neutral-400">Case study details coming soon or not found.</p>
            </div>
        );
    }

    const { mainTitle, mainDescription, sections } = currentCaseStudy;

    return (
        <div className="bg-black min-h-screen text-white">
            {/* ── Fixed ambient blobs ─────────────────────────────────── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]" style={{ background: G.purple }} />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]" style={{ background: G.red }} />
                <div
                    className="absolute inset-0 opacity-[0.022]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "160px 160px",
                    }}
                />
            </div>

            {/* ── Hero ────────────────────────────────────────────────── */}
            <div ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
                {/* Parallax image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{ transform: `translateY(${scrollY * 0.35}px)`, willChange: "transform" }}
                >
                    <NextImage
                        src={currentCaseStudy.image}
                        alt={currentCaseStudy.title}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 z-10 bg-black/75" />

                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Gradient accent strip at top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] z-30" style={{ background: GRAD }} />

                {/* Back button */}
                <div className="absolute top-8 left-4 sm:left-8 z-30 pt-16">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                    >
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Back to Case Studies</span>
                    </button>
                </div>

                {/* Hero content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 px-4 text-center">
                    {/* Category pill */}
                    <div
                        className="mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            ...GRAD_TEXT,
                        }}
                    >
                        Case Study
                    </div>

                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl leading-[1.05] mb-6"
                        style={{
                            background: "linear-gradient(160deg, #ffffff 50%, rgba(255,255,255,0.45))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {mainTitle || currentCaseStudy.title}
                    </h1>

                    <p className="text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-10">
                        {mainDescription || currentCaseStudy.challenge}
                    </p>

                    {/* Scroll indicator */}
                    <div className="flex flex-col items-center gap-2 opacity-50">
                        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">Scroll</span>
                        <div className="w-px h-10 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
                            <div
                                className="absolute top-0 w-full animate-bounce"
                                style={{ height: "40%", background: GRAD }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-28">

                {/* ── Section heading ──────────────────────────────────── */}
                <Reveal>
                    <div className="text-center space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={GRAD_TEXT}>
                            Project Breakdown
                        </p>
                        <h2
                            className="text-4xl md:text-5xl font-black tracking-tight"
                            style={{
                                background: "linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.4))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Key Features &amp; Sections
                        </h2>
                        <p className="text-neutral-400 max-w-xl mx-auto text-sm leading-relaxed">
                            Explore the different facets of this project — from customer-facing storefronts to powerful admin dashboards.
                        </p>
                        <div className="flex justify-center pt-2">
                            <GradLine className="max-w-xs" />
                        </div>
                    </div>
                </Reveal>

                {/* ── Section cards ─────────────────────────────────────── */}
                {sections && (
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <SectionCard key={index} section={section} index={index} />
                        ))}
                    </div>
                )}

                {/* ── 3D card showcase (original CardContainer preserved) ── */}
                {sections && sections.length > 0 && (
                    <Reveal>
                        <div className="space-y-10">
                            <div className="text-center space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={GRAD_TEXT}>
                                    Visual Overview
                                </p>
                                <h3
                                    className="text-3xl font-black tracking-tight"
                                    style={{
                                        background: "linear-gradient(160deg, #fff 40%, rgba(255,255,255,0.4))",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Interactive Gallery
                                </h3>
                                <GradLine className="max-w-[160px] mx-auto" />
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sections.map((section, index) => (
                                    <Reveal key={index} delay={index * 80}>
                                        <CardContainer className="w-full">
                                            <CardBody
                                                className="relative rounded-2xl overflow-hidden w-full h-72 cursor-pointer"
                                                style={{
                                                    background: "rgba(255,255,255,0.03)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                }}
                                            >
                                                <CardItem translateZ="60" className="w-full h-full">
                                                    <div className="relative w-full h-full">
                                                        <NextImage
                                                            src={section.image || "/placeholder.svg"}
                                                            alt={section.title}
                                                            fill
                                                            className="object-cover rounded-xl"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl" />
                                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                                            <p className="text-sm font-bold text-white">{section.title}</p>
                                                        </div>
                                                    </div>
                                                </CardItem>
                                            </CardBody>
                                        </CardContainer>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* ── Bottom gradient divider + CTA ──────────────────────── */}
                <Reveal>
                    <div className="text-center space-y-8 pt-8">
                        <GradLine />
                        <p className="text-neutral-500 text-sm">Interested in a similar solution?</p>
                        <button
                            onClick={() => router.push("/contact")}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(131,58,180,0.35)]"
                            style={{ background: GRAD }}
                        >
                            Let's talk
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}