"use client";
import React from "react";
import { motion } from "framer-motion";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";
import { useRouter } from "next/navigation";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Brain, Sparkles, Code, Database, Globe, Cpu, Users, Kanban, Lightbulb, Activity, Shield, BarChart } from "lucide-react";
import Image from "next/image";

const Icons = {
    brain: Brain,
    sparkles: Sparkles,
    code: Code,
    data: Database,
    globe: Globe,
    cpu: Cpu,
    users: Users,
    kanban: Kanban,
    lightbulb: Lightbulb,
    activity: Activity,
    shield: Shield,
    barChart: BarChart,
};

export default function ProductsSection() {
    const router = useRouter();

    const erpCards = erpSolutions.map((solution) => ({
        name: solution.title,
        description: solution.description,
        href: `/solutions/${solution.id}`,
        cta: solution.cta, // "Learn More" or similar
        background: (
            <Image
                className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                src={solution.image || ""}
                alt={`${solution.title} background`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        ),
        Icon: solution.icon,
        className: solution.className,
    }));

    const innovativeCards: BentoCardProps[] = innovativeProducts.map(product => {
        return {

            title: product.title,
            description: product.description,
            label: product.subtitle,
            icon: product.icon,
            color: '#060010',
            textAutoHide: false,
            image: product.image,
            onClick: () => router.push(`/solutions/${product.id}`),
            className: product.className,
        };
    });

    return (
        <section id="products" className="py-16 md:py-24 bg-transparent relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            Not Just Powered by AI. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                Driven by Intelligence.
                            </span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Experience the next generation of enterprise software. Our products don&apos;t just assist—they anticipate, adapt, and act.
                        </p>
                    </motion.div>
                </div>

                {/* Orbiting Circles Visualization */}
                <div className="mb-24 p-8 rounded-3xl relative overflow-hidden flex flex-col items-center">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                    <div className="relative z-10 flex flex-col items-center w-full">
                        <h3 className="text-2xl font-bold mb-8 text-center">The Core of Our Intelligence</h3>

                        <div className="relative flex h-[500px] w-full max-w-[800px] flex-col items-center justify-center overflow-hidden rounded-lg bg-background/0">
                            {/* Central AI Node */}
                            <div className="z-10 flex flex-col items-center justify-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-indigo-600 shadow-[0_0_50px_-10px_rgba(147,51,234,0.5)] ring-4 ring-white/20 backdrop-blur-xl animate-pulse">
                                    <Icons.brain className="h-12 w-12 text-white" />
                                </div>
                                <div className="mt-3 rounded-full border border-border/50 bg-background/50 px-3 py-1 backdrop-blur-md shadow-sm">
                                    <span className="text-xs font-bold tracking-widest text-foreground uppercase">Siyaratech AI</span>
                                </div>
                            </div>

                            {/* Inner Ring: Core Modules */}
                            <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" duration={35} delay={0} radius={130}>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.data className="h-6 w-6 text-brand-orange" />
                                    <span className="text-[10px] font-bold text-foreground/90 text-nowrap">ERP</span>
                                </div>
                            </OrbitingCircles>
                            <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" duration={35} delay={11.5} radius={130}>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.users className="h-6 w-6 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-foreground/90 text-nowrap">HRMS</span>
                                </div>
                            </OrbitingCircles>
                            <OrbitingCircles className="h-14 w-14 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" duration={35} delay={23} radius={130}>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.activity className="h-6 w-6 text-pink-500" />
                                    <span className="text-[10px] font-bold text-foreground/90 text-nowrap">CRM</span>
                                </div>
                            </OrbitingCircles>

                            {/* Outer Ring: Advanced Solutions */}
                            <OrbitingCircles className="h-16 w-16 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" radius={220} duration={55} reverse>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.kanban className="h-7 w-7 text-blue-500" />
                                    <span className="text-[10px] font-bold text-center leading-[0.8] text-foreground/90">Project<br />Mgmt</span>
                                </div>
                            </OrbitingCircles>
                            <OrbitingCircles className="h-16 w-16 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" radius={220} duration={55} delay={13} reverse>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.shield className="h-7 w-7 text-cyan-500" />
                                    <span className="text-[10px] font-bold text-center leading-[0.8] text-foreground/90">Security</span>
                                </div>
                            </OrbitingCircles>
                            <OrbitingCircles className="h-16 w-16 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" radius={220} duration={55} delay={27} reverse>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.lightbulb className="h-7 w-7 text-amber-500" />
                                    <span className="text-[10px] font-bold text-center leading-[0.8] text-foreground/90">Smart<br />Sol.</span>
                                </div>
                            </OrbitingCircles>
                            <OrbitingCircles className="h-16 w-16 border border-border/40 bg-background/60 backdrop-blur-md shadow-lg" radius={220} duration={55} delay={40} reverse>
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <Icons.barChart className="h-7 w-7 text-violet-500" />
                                    <span className="text-[10px] font-bold text-center leading-[0.8] text-foreground/90">Analytics</span>
                                </div>
                            </OrbitingCircles>
                        </div>
                    </div>
                </div>

                {/* ERP Solutions Section */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4">ERP Solutions</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive enterprise resource planning tools powered by advanced AI to optimize your business operations.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto">
                        <BentoGrid>
                            {erpCards.map((card, index) => (
                                <BentoCard key={index} {...card} />
                            ))}
                        </BentoGrid>
                    </div>
                </div>

                {/* Innovative Products Section */}
                <div>
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4">Innovative Products</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Cutting-edge applications designed to transform digital experiences across various domains.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <MagicBento
                            cards={innovativeCards}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            glowColor="0, 255, 255"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
