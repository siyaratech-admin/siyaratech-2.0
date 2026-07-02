"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { use } from "react";

const GRADIENT = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 55%, #FCB045 100%)";
const GRADIENT_VERTICAL = "linear-gradient(180deg, #833AB4 0%, #FD1D1D 55%, #FCB045 100%)";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
};

const stagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
};

// ─── YouTube Embed ────────────────────────────────────────────────────────────
// Renders an interactive YouTube thumbnail card. On click it swaps to the real
// iframe (privacy-enhanced nocookie domain). Styled to match the dark theme.
//
// Props are extracted from the data-yt-embed / data-yt-title attributes that
// ghostTransforms.ts bakes into placeholder divs for Ghost kg-embed-cards.
interface YouTubeEmbedProps {
    videoId: string;
    title?: string;
}

function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
    const [playing, setPlaying] = useState(false);
    const [thumbError, setThumbError] = useState(false);

    // YouTube maxresdefault thumbnail; fall back to hqdefault if it 404s
    const thumbSrc = thumbError
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    const ytUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                borderRadius: "1rem",
                overflow: "hidden",
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.08)",
                aspectRatio: "16/9",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}
        >
            {playing ? (
                // ── Active iframe ─────────────────────────────────────────────────────
                <iframe
                    src={ytUrl}
                    title={title || "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                />
            ) : (
                // ── Thumbnail + overlay ───────────────────────────────────────────────
                <button
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${title || "YouTube video"}`}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        display: "block",
                    }}
                >
                    {/* Thumbnail image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={thumbSrc}
                        alt={title || "YouTube video thumbnail"}
                        onError={() => setThumbError(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.4s cubic-bezier(.16,1,.3,1)",
                        }}
                        className="yt-thumb"
                    />

                    {/* Dark gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                        }}
                    />

                    {/* Top meta bar: channel avatar placeholder + title */}
                    {title && (
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                padding: "0.75rem 1rem",
                                background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                            }}
                        >
                            {/* Channel avatar circle */}
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: GRADIENT,
                                    flexShrink: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Play style={{ width: 12, height: 12, color: "#fff", marginLeft: 1 }} />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                        color: "#fff",
                                        lineHeight: 1.3,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {title}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Centre play button — YouTube red style */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            className="yt-play-btn"
                            style={{
                                width: 68,
                                height: 48,
                                background: "#FF0000",
                                borderRadius: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 24px rgba(255,0,0,0.55)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            }}
                        >
                            {/* YouTube play triangle */}
                            <svg viewBox="0 0 68 48" width="68" height="48" style={{ display: "block" }}>
                                <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.8.1 34 0 34 0S12.2.1 7.4 1.6C4.6 2.5 2.3 4.8 1.5 7.7 0 12.6 0 24 0 24s0 11.4 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.2 47.9 34 48 34 48s21.8-.1 26.6-1.6c2.9-.8 5.1-3.1 5.9-6C68 35.4 68 24 68 24s0-11.4-1.5-16.3z" fill="#FF0000" />
                                <path d="M45 24 27 14v20" fill="white" />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom: "Watch on YouTube" link hint */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "0.75rem",
                            right: "0.75rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "0.5rem",
                            background: "rgba(0,0,0,0.55)",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        <ExternalLink style={{ width: 11, height: 11, color: "rgba(255,255,255,0.5)" }} />
                        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                            YouTube
                        </span>
                    </div>

                    {/* Hover glow — handled via CSS below */}
                    <style>{`
            .yt-thumb { }
            button:hover .yt-thumb { transform: scale(1.03); }
            button:hover .yt-play-btn {
              transform: scale(1.08);
              box-shadow: 0 6px 32px rgba(255,0,0,0.7);
            }
          `}</style>
                </button>
            )}
        </div>
    );
}

// ─── YouTube Portal Hydrator ──────────────────────────────────────────────────
// After dangerouslySetInnerHTML renders, this hook finds every
// [data-yt-embed] placeholder and mounts a <YouTubeEmbed> portal into it.
function useYouTubeHydration(contentRef: React.RefObject<HTMLDivElement | null>) {
    const [portals, setPortals] = useState<
        Array<{ container: HTMLElement; videoId: string; title: string }>
    >([]);

    const hydrate = useCallback(() => {
        const root = contentRef.current;
        if (!root) return;

        const placeholders = root.querySelectorAll<HTMLElement>("[data-yt-embed]");
        const found: Array<{ container: HTMLElement; videoId: string; title: string }> = [];

        placeholders.forEach((el) => {
            const videoId = el.getAttribute("data-yt-embed") ?? "";
            const title = el.getAttribute("data-yt-title") ?? "";
            if (!videoId) return;
            // Clear any existing content (idempotent re-runs)
            el.innerHTML = "";
            found.push({ container: el, videoId, title });
        });

        if (found.length > 0) setPortals(found);
    }, [contentRef]);

    useEffect(() => {
        // Small delay to ensure dangerouslySetInnerHTML has flushed to the DOM
        const t = setTimeout(hydrate, 0);
        return () => clearTimeout(t);
    }, [hydrate]);

    return portals;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = services.find((s) => s.id === slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    const contentRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start 0.8", "end 0.5"],
    });
    const traceProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 24,
        restDelta: 0.001,
    });

    // Hydrate YouTube placeholders injected by ghostTransforms.ts
    const ytPortals = useYouTubeHydration(contentRef);

    return (
        <div className="min-h-screen bg-transparent">
            {/* ── Hero ── */}
            <div className="relative flex h-[50vh] min-h-[380px] w-full items-end justify-center overflow-hidden sm:h-[56vh]">
                <div className="absolute inset-0 bg-[#0a0a0c]" />

                <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.3, opacity: 0.5 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
                        className="absolute h-32 w-32 rounded-full sm:h-40 sm:w-40"
                        style={{ background: GRADIENT }}
                    />
                ))}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

                <div className="absolute inset-x-0 top-0 z-20">
                    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
                        <Link href="/services" passHref>
                            <Button
                                variant="ghost"
                                className="pl-0 text-white/90 transition-all hover:translate-x-[-2px] hover:bg-white/10 hover:pl-2 hover:text-white"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Services
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-12 text-center sm:px-6 sm:pb-16 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-20 sm:w-20"
                        style={{ boxShadow: "0 0 50px -8px #FD1D1D90" }}
                    >
                        <Icon className="h-8 w-8 text-white sm:h-10 sm:w-10" strokeWidth={1.6} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
                    >
                        {service.title}
                    </motion.h1>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <div
                    ref={contentRef}
                    className="grid grid-cols-1 gap-10 pt-10 sm:pt-14 lg:grid-cols-[1fr_320px] lg:gap-16"
                >
                    <motion.div initial="hidden" animate="show" variants={stagger} className="min-w-0">
                        <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="relative pl-6 sm:pl-8">
                            <div className="absolute left-0 top-1 h-full w-px bg-border/60">
                                <motion.div
                                    className="absolute left-0 top-0 w-px origin-top"
                                    style={{
                                        height: "100%",
                                        scaleY: traceProgress,
                                        background: GRADIENT_VERTICAL,
                                        boxShadow: "0 0 12px 1px #FD1D1D60",
                                    }}
                                />
                            </div>
                            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                Overview
                            </span>
                            {service.content ? (
                                <div className="prose prose-invert max-w-none text-base text-muted-foreground sm:text-lg">
                                    {service.content}
                                </div>
                            ) : (
                                <p className="text-base leading-relaxed text-muted-foreground sm:text-xl">
                                    {service.longDescription || service.description}
                                </p>
                            )}
                        </motion.div>

                        {service.features && service.features.length > 0 && (
                            <motion.div
                                variants={fadeUp}
                                transition={{ duration: 0.5 }}
                                className="mt-12 pl-6 sm:mt-16 sm:pl-8"
                            >
                                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:mb-5">
                                    What&apos;s included
                                </span>
                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, margin: "-60px" }}
                                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
                                >
                                    {service.features.map((feature, index) => (
                                        <FeatureCard key={index} feature={feature} />
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.aside
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="lg:sticky lg:top-24 lg:self-start"
                    >
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-7">
                            <h2 className="mb-2 text-lg font-semibold text-foreground">Ready to start?</h2>
                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                Talk to our team about how {service.title.toLowerCase()} fits your roadmap.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link href="/contact" className="w-full">
                                    <MagneticButton>
                                        <Button
                                            size="lg"
                                            className="h-12 w-full px-8 text-base text-white"
                                            style={{ background: GRADIENT }}
                                        >
                                            Get Started
                                        </Button>
                                    </MagneticButton>
                                </Link>
                                <Link href="/case-studies" className="w-full">
                                    <Button variant="outline" size="lg" className="h-12 w-full px-8 text-base">
                                        View Case Studies
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* ── YouTube portals — mounted into data-yt-embed placeholders ── */}
            {ytPortals.map(({ container, videoId, title }) =>
                createPortal(
                    <YouTubeEmbed videoId={videoId} title={title} />,
                    container,
                ),
            )}
        </div>
    );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ feature }: { feature: string }) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            whileHover="hover"
            className="group relative flex items-start overflow-hidden rounded-xl border border-border/50 bg-accent/5 p-4 transition-colors duration-300 hover:border-transparent"
        >
            <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 rounded-xl p-px"
                style={{ background: GRADIENT }}
            >
                <div className="h-full w-full rounded-[11px] bg-card" />
            </motion.div>

            <CheckCircle
                className="relative z-10 mr-3 h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
                style={{ color: "#FD1D1D" }}
            />
            <span className="relative z-10 text-sm font-medium text-foreground/90 sm:text-base">{feature}</span>
        </motion.div>
    );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "translate(0px, 0px)";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="transition-transform duration-200 ease-out"
        >
            {children}
        </div>
    );
}