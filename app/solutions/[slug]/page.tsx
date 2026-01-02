import React from "react";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { ModuleGuide } from "@/components/ModuleGuide";
import Beams from "@/components/Beams";
import BlurText from "@/components/TextAnimations/BlurText/BlurText";
import BenefitsSection from "@/components/BenefitsSection";
import ProductGallery from "@/components/ProductGallery";

// Combine available solutions
import ThemeAwareBeams from "@/components/ThemeAwareBeams";

// ... (existing helper code omitted is fine, but I need to be careful about file structure if I can't use multi-replace effectively for imports and render. I will use replace_file_content for the render part and another for import or just do it in one go if I can match enough context)

const allSolutions = [...erpSolutions, ...innovativeProducts];

// ... (keep generateStaticParams and generateMetadata)

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const solution = allSolutions.find((s) => s.id === slug);

    if (!solution) {
        notFound();
    }

    const Icon = solution.icon;
    const hasGallery = solution.gallery && solution.gallery.length > 0;
    const hasVideoInContent = solution.id === "influencer-platform";

    // Prepare benefits data (plain objects only)
    const benefitsData = solution.benefits?.map((benefit) => ({
        title: benefit.title,
        description: benefit.description,
    })) || [];

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary/30">

            {/* 1. Immersive Hero Section with Beams Background */}
            <div className="relative w-full min-h-[90vh] flex flex-col pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ThemeAwareBeams />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,white_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_10%,black_70%)] pointer-events-none" />
                    <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:radial-gradient(circle_at_center,transparent_20%,black_100%)] pointer-events-none" />
                    {/* Bottom fade for smooth transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent pointer-events-none" />
                </div>

                {/* Back Navigation - Floating */}
                <div className="relative z-50 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-8">
                    <Link href="/products" passHref>
                        <Button variant="ghost" className="hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-all pl-0 hover:pl-2 rounded-full px-4 border border-transparent hover:border-foreground/10 backdrop-blur-sm">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
                        </Button>
                    </Link>
                </div>

                {/* Hero Content - Split Layout */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center flex-grow">

                    {/* Left Column: Typography */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">

                        {/* Animated Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md shadow-xl">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-sm font-medium text-foreground/90 tracking-wide uppercase">{solution.subtitle}</span>
                        </div>

                        {/* Giant Title */}
                        <div className="w-full">
                            <BlurText
                                text={solution.title}
                                delay={30}
                                animateBy="words"
                                direction="bottom"
                                className="text-left text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] drop-shadow-2xl max-w-full"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
                            {solution.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {solution.tags?.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-foreground/5 border border-foreground/10 rounded-md text-xs font-mono text-foreground/50 tracking-wider hover:bg-foreground/10 transition-colors cursor-default">
                                    {tag.toUpperCase()}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/contact" className="inline-block">
                                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/80 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full px-8 h-12 text-base font-semibold transition-all hover:scale-105">
                                    Book a Live Demo
                                </Button>
                            </Link>
                            <ModuleGuide solutionId={solution.id} />
                        </div>
                    </div>

                    {/* Right Column: 3D Visualization */}
                    <div className="lg:col-span-5 relative perspective-1000 group">
                        {/* Glass Container */}
                        <div className="relative transform transition-all duration-700 ease-out hover:rotate-y-6 hover:rotate-x-6 hover:scale-105">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative rounded-2xl bg-card border border-border overflow-hidden shadow-2xl aspect-[4/3] flex items-center justify-center">
                                {/* Fallback to Icon if no image, or main image */}
                                {solution.image ? (
                                    <Image
                                        src={solution.image}
                                        alt={solution.title}
                                        fill
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <Icon className="w-32 h-32 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                                )}

                                {/* Floating UI Elements (Decorative) */}
                                <div className="absolute top-4 left-4 flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
                    <span className="text-xs font-mono uppercase tracking-widest mb-2 text-foreground/70">Explore</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-foreground to-transparent"></div>
                </div>
            </div>

            {/* Main Content Container */}
            <main className="relative z-10 bg-background">

                {/* 2. Visual Gallery - Browser Window Style */}
                {hasGallery && (
                    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 mb-4">See It In Action</h2>
                            <p className="text-foreground/50">Experience the interface designed for speed and clarity.</p>
                        </div>

                        <ProductGallery gallery={solution.gallery || []} solutionId={solution.id} />
                    </section>
                )}

                {/* 3. Narrative Content & Video */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    {hasVideoInContent ? (
                        <div className="mb-16 aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(120,50,255,0.2)] border border-border">
                            <div className="prose prose-invert max-w-none w-full h-full [&>div>video]:w-full [&>div>video]:h-full [&>div>video]:object-cover [&>div>p]:hidden [&>div]:h-full [&>div]:w-full">
                                {solution.content}
                            </div>
                        </div>
                    ) : null}

                    <div className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/70 prose-p:leading-loose max-w-none">
                        {/* Hide video in text if shown above */}
                        <div className={`space-y-8 ${hasVideoInContent ? "[&>div>video]:hidden" : ""}`}>
                            {solution.content}
                        </div>
                    </div>
                </section>

                {/* 4. Benefits Section (Client Component) */}
                {benefitsData.length > 0 && (
                    <BenefitsSection title={solution.title} benefits={benefitsData} />
                )}

                {/* 5. Core Capabilities (Standard Grid) */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-foreground">Core Capabilities</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solution.features?.map((feature, index) => (
                            <div key={index} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-accent/10 transition-all duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                                        <CheckCircle className="w-5 h-5 text-purple-500 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{feature}</h3>
                                        <p className="text-sm text-muted-foreground">Enterprise-grade feature included in standard plan.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. FAQ Section */}
                {solution.faq && (
                    <section className="py-24 max-w-3xl mx-auto px-4">
                        <h3 className="text-3xl font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {solution.faq.map((item: { question: string; answer: string }, index: number) => (
                                <details key={index} className="group border border-border rounded-2xl bg-card overflow-hidden open:bg-accent/10 transition-all duration-300">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                                        {item.question}
                                        <span className="transform transition-transform group-open:rotate-180">
                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                                        <p>{item.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* 7. Bottom CTA */}
                <section className="py-32 px-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
                            Ready to transform?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Join the next generation of businesses using {solution.title}.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/contact">
                                <Button size="lg" className="h-16 px-12 rounded-full text-xl bg-foreground text-background hover:bg-foreground/80 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    Start Free Pilot
                                </Button>
                            </Link>
                            <Link href="/products">
                                <Button variant="outline" size="lg" className="h-16 px-12 rounded-full text-xl border-border text-foreground hover:bg-accent hover:border-primary/50 backdrop-blur-sm">
                                    View All Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
