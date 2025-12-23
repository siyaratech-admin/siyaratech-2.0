import React from "react";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

// Combine available solutions
const allSolutions = [...erpSolutions, ...innovativeProducts];

// Force specific static params generation
export async function generateStaticParams() {
    return allSolutions.map((solution) => ({
        slug: solution.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const solution = allSolutions.find((s) => s.id === slug);
    if (!solution) {
        return {
            title: "Solution Not Found",
        };
    }
    return {
        title: `${solution.title} | Siyaratech`,
        description: solution.description,
    };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const solution = allSolutions.find((s) => s.id === slug);

    if (!solution) {
        notFound();
    }

    const Icon = solution.icon;
    const hasGallery = solution.gallery && solution.gallery.length > 0;

    // Check if content has video (simple heuristic for now, matching the Influnecer platform case)
    // In a real app, we'd have a specific boolean or field for this.
    const hasVideoInContent = solution.id === "influencer-platform";

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-20">
            {/* Back Button - Aligned to strict page grid, distinct from centered hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                <Link href="/products" passHref>
                    <Button variant="ghost" className="hover:bg-primary/5 text-muted-foreground hover:text-primary transition-colors pl-0 hover:pl-2">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                    </Button>
                </Link>
            </div>

            {/* 1. Immersive Hero Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20 shadow-xl shadow-primary/10">
                        <Icon className="w-16 h-16 text-primary" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6 tracking-tight">
                    {solution.title}
                </h1>
                <p className="text-xl md:text-2xl text-primary font-medium mb-6">{solution.subtitle}</p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                    {solution.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {solution.tags?.map((tag, i) => (
                        <span key={i} className="px-4 py-1.5 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium border border-border/50 backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <Link href="/contact" className="inline-block">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-full px-8 h-12 text-lg transform hover:scale-105 transition-all duration-300">
                        Book a Free Demo
                    </Button>
                </Link>
                <p className="text-sm text-center text-muted-foreground mt-4">
                    No credit card required. Free technical consultation.
                </p>
            </div>

            {/* Main Content Area - Single Column */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                {/* 2. Hero Media / Carousel - Moved to beginning as requested */}
                <div className="relative w-full">
                    {hasGallery ? (
                        /* Carousel View */
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-2xl font-bold">Visual Tour</h3>
                                <div className="text-sm text-muted-foreground flex gap-2 items-center">
                                    <ChevronLeft className="w-4 h-4" /> Swipe to explore <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {/* Primary Hero Image First (if not in gallery, consider adding it, but here we assume gallery covers it) */}
                                {solution.gallery?.map((img, i) => (
                                    <div key={i} className="min-w-[85%] md:min-w-[65%] lg:min-w-[50%] snap-center relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-card first:ml-0 last:mr-0">
                                        <Image
                                            src={img}
                                            alt={`${solution.title} screenshot ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            priority={i === 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : hasVideoInContent ? (
                        /* Fallback: Video (For Influencer Platform) */
                        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                            <div className="prose prose-invert max-w-none w-full h-full [&>div>video]:w-full [&>div>video]:h-full [&>div>video]:object-cover [&>div>p]:hidden [&>div]:h-full [&>div]:w-full">
                                {solution.content}
                            </div>
                        </div>
                    ) : solution.image ? (
                        /* Fallback: Standard Single Hero Image */
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 group bg-card">
                            <Image
                                src={solution.image}
                                alt={solution.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>
                    ) : null}
                </div>

                {/* 3. Key Capabilities Grid */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {solution.features?.map((feature, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm hover:shadow-lg group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <CheckCircle className="w-5 h-5 text-primary group-hover:text-white" />
                                </div>
                                <h3 className="font-semibold text-lg text-foreground mb-2">{feature}</h3>
                                <p className="text-sm text-muted-foreground">Premium feature designed for scale and performance.</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Rich Content Narrative - Interleaved */}
                <section className="prose prose-lg dark:prose-invert max-w-3xl mx-auto leading-loose text-muted-foreground">
                    {/* Render the custom content.
                        CRITICAL: If we rendered the video above, we must HIDE it here to avoid duplication.
                        We use CSS trickery: checking if it's the specific Influencer platform or using generic hiding for video elements if they were lifted.
                    */}
                    <div className={`[&>div>p]:mb-8 [&>div>p]:text-lg [&>div>p]:leading-relaxed ${hasVideoInContent ? "[&>div>video]:hidden" : ""}`}>
                        {solution.content}
                    </div>
                </section>

                {/* 5. Benefits Bento Grid - Visual Break */}
                {solution.benefits && (
                    <section className="py-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Why Choose {solution.title}?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Designed to solve the most critical challenges in your workflow.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
                            {solution.benefits.map((benefit: { title: string; description: string }, index: number) => (
                                <div
                                    key={index}
                                    className={`p-8 rounded-3xl border border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-secondary/20 hover:to-secondary/5 transition-colors shadow-lg
                                        ${index === 0 ? "md:col-span-2" : ""}
                                    `}
                                >
                                    <Shield className={`w-8 h-8 mb-4 ${index === 0 ? "text-primary" : "text-purple-500"}`} />
                                    <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. Gallery has been moved to top. (Removed from here) */}

                {/* 7. FAQ Accordion */}
                {solution.faq && (
                    <section className="max-w-3xl mx-auto w-full">
                        <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {solution.faq.map((item: { question: string; answer: string }, index: number) => (
                                <details key={index} className="group border border-border/50 rounded-2xl bg-card overflow-hidden transition-all duration-300 open:border-primary/30 open:shadow-lg open:shadow-primary/5">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg text-foreground group-hover:bg-accent/5">
                                        {item.question}
                                        <span className="transform transition-transform group-open:rotate-180">
                                            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                                        <p>{item.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* 8. Bottom CTA */}
                <section className="py-16">
                    <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 border border-primary/20 overflow-hidden text-center p-12 md:p-20">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                Ready to transform your business?
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Join forward-thinking companies using {solution.title} to drive growth.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Link href="/contact">
                                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-full px-10 h-14 text-lg">
                                        Get Started Now
                                    </Button>
                                </Link>
                                <Link href="/case-studies">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5 rounded-full px-10 h-14 text-lg">
                                        View Case Studies
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
