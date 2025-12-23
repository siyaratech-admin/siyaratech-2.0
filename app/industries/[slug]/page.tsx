import React from "react";
import { industries } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

// Force specific static params generation
export async function generateStaticParams() {
    return industries.map((industry) => ({
        slug: industry.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const industry = industries.find((i) => i.id === slug);
    if (!industry) {
        return {
            title: "Industry Not Found",
        };
    }
    return {
        title: `${industry.name} Solutions | Siyaratech`,
        description: industry.description,
    };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const industry = industries.find((i) => i.id === slug);

    if (!industry) {
        notFound();
    }

    const Icon = industry.icon;

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/industries" passHref>
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Industries
                    </Button>
                </Link>

                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                    <div className="h-64 md:h-80 relative overflow-hidden">
                        {industry.backgroundImage && (
                            <Image
                                src={industry.backgroundImage}
                                alt={industry.name}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-white border border-primary/30 text-sm font-medium backdrop-blur-sm">
                                    Industry Solution
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white shadow-sm">{industry.name}</h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            {industry.content ? (
                                <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">
                                    {industry.content}
                                </div>
                            ) : (
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {industry.longDescription || industry.description}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-xl font-bold mb-6 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 text-primary" /> Key Capabilities
                                </h3>
                                <ul className="space-y-4">
                                    {industry.features?.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                            <span className="text-foreground/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-accent/5 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Transform Your {industry.name} Business</h3>
                                <p className="text-muted-foreground mb-6">
                                    Our specialized team understands the unique challenges of the {industry.name} sector. Let&apos;s discuss how we can help you achieve your goals.
                                </p>
                                <Link href="/contact">
                                    <Button className="w-full bg-brand-gradient hover:opacity-90">
                                        Schedule a Consultation
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
