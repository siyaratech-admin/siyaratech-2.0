import React from "react";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

// Force specific static params generation if needed, or allow dynamic
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = services.find((s) => s.id === slug);
    if (!service) {
        return {
            title: "Service Not Found",
        };
    }
    return {
        title: `${service.title} | Siyaratech`,
        description: service.description,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find((s) => s.id === slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/services" passHref>
                    <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                    </Button>
                </Link>

                <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                    <div className={`h-48 ${service.bg} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/10" />
                        <Icon className={`w-24 h-24 ${service.color} opacity-20 transform scale-150 absolute`} />
                        <Icon className={`w-16 h-16 ${service.color} relative z-10`} />
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{service.title}</h1>
                            {service.content ? (
                                <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">
                                    {service.content}
                                </div>
                            ) : (
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {service.longDescription || service.description}
                                </p>
                            )}
                        </div>

                        <div className="my-12">
                            <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features?.map((feature, index) => (
                                    <div key={index} className="flex items-start p-4 bg-accent/5 rounded-xl border border-border/50">
                                        <CheckCircle className={`w-6 h-6 mr-3 ${service.color} flex-shrink-0`} />
                                        <span className="text-foreground/90 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 bg-brand-gradient hover:opacity-90">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/case-studies" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                                    View Related Case Studies
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
