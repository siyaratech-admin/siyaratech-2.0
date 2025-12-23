"use client";
import React from "react";
import { motion } from "framer-motion";
import { } from "lucide-react";
import { CpuArchitecture } from "./ui/cpu-architecture";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";
import { useRouter } from "next/navigation";
import { erpSolutions, innovativeProducts } from "@/lib/data";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import Image from "next/image";

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

                {/* CPU Architecture Visualization */}
                <div className="mb-24 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                    <div className="relative z-10 flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-8 text-center">The Core of Our Intelligence</h3>
                        <div className="w-full max-w-5xl">
                            <CpuArchitecture text="AI" />
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
