"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, BookOpen, ShoppingCart, FileText, CheckSquare, LayoutDashboard, Bot, PenTool } from "lucide-react";
import { CpuArchitecture } from "./ui/cpu-architecture";
import MagicBento, { BentoCardProps } from "@/components/MagicBento";
import { useRouter } from "next/navigation";
import { erpSolutions } from "@/lib/data";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import Image from "next/image";

const innovativeProducts = [
    {
        id: "influencer-platform",
        title: "Influencer Ecommerce",
        subtitle: "Social-First Discovery",
        description: "Transform traditional online shopping into a social-first discovery experience powered by influencers.",
        icon: ShoppingBag,
        gradient: "from-pink-500 to-rose-500",
        features: ["React", "Java Springboot", "Firebase"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    },
    {
        id: "techdivehub",
        title: "TechDiveHub",
        subtitle: "Engaging Learning Journey",
        description: "Transforming Learning into an Engaging Journey for students and professionals.",
        icon: BookOpen,
        gradient: "from-blue-500 to-cyan-500",
        features: ["Next.js", "TailwindCSS"],
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    },
    {
        id: "shopsphere",
        title: "Shopshere",
        subtitle: "E-Commerce Platform",
        description: "A robust and scalable e-commerce platform designed for modern retail needs.",
        icon: ShoppingCart,
        gradient: "from-violet-500 to-purple-500",
        features: ["React", "NodeJS", "TailwindCSS"],
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
    },
    {
        id: "byteblog",
        title: "Byteblog",
        subtitle: "Tech Blogs Platform",
        description: "A dedicated platform for tech enthusiasts to share knowledge and insights.",
        icon: FileText,
        gradient: "from-amber-500 to-orange-500",
        features: ["React", "NodeJS", "TailwindCSS"],
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    },
    {
        id: "collabease",
        title: "CollabEase",
        subtitle: "Task Management",
        description: "Streamline collaboration and manage tasks efficiently with intuitive tools.",
        icon: CheckSquare,
        gradient: "from-emerald-500 to-green-500",
        features: ["React", "NodeJS", "TailwindCSS"],
        image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
    },
    {
        id: "ecommerce-dashboard",
        title: "E-commerce Dashboard",
        subtitle: "Marketplace Management",
        description: "Comprehensive Digital Marketplace Management for tracking sales and inventory.",
        icon: LayoutDashboard,
        gradient: "from-indigo-500 to-blue-600",
        features: ["React", "TailwindCSS", "Express"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
        id: "ai-interview",
        title: "AI Interview Simulator",
        subtitle: "Career Preparation",
        description: "Revolutionizing Career Preparation and Interview Skills with AI-driven simulations.",
        icon: Bot,
        gradient: "from-fuchsia-500 to-pink-600",
        features: ["Next.js", "TailwindCSS", "AI Integration"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    },
    {
        id: "sketch-whiteboard",
        title: "Free Sketch Whiteboard",
        subtitle: "Digital Collaboration",
        description: "Unleashing Creativity through Digital Collaboration on an infinite canvas.",
        icon: PenTool,
        gradient: "from-orange-500 to-red-500",
        features: ["Next.js", "TailwindCSS", "Real-time"],
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    },
];

export default function ProductsSection() {
    const router = useRouter();

    const erpCards = erpSolutions.map((solution) => ({
        name: solution.title,
        description: solution.description,
        href: `/solutions/${solution.id}`,
        cta: solution.cta, // "Learn More" or similar
        background: (
            <Image
                className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
                src={solution.image || ""}
                alt={`${solution.title} background`}
                fill
            />
        ),
        Icon: solution.icon,
        className: solution.className,
    }));

    const innovativeCards: BentoCardProps[] = innovativeProducts.map(product => {
        let slug = "";
        if (product.id === "influencer-platform") {
            slug = "influencer-driven-ecommerce-platform";
        }

        return {
            title: product.title,
            description: product.description,
            label: product.subtitle,
            icon: product.icon,
            color: '#060010',
            textAutoHide: false,
            image: product.image,
            onClick: slug ? () => router.push(`/case-studies/${slug}`) : undefined,
        };
    });

    return (
        <section id="products" className="py-16 md:py-24 bg-background relative overflow-hidden">

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
