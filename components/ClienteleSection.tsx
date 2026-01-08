"use client";

import React from "react";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { Building2 } from "lucide-react";

const clients = [
    {
        name: "Samarth Group",
        image: "/static_images/clients/samarth_builders.png",
    },
    {
        name: "Baner 87 Realty",
        image: null, // Image not found
    },
    {
        name: "Vatavruksha Entertainment",
        image: "/static_images/clients/Vatavruksha.jpeg",
    },
    {
        name: "SGL",
        image: null, // Image not found
    },
    {
        name: "Sai Textiles",
        image: "/static_images/clients/Sai_Texttiles.jpeg",
    },
    {
        name: "Sam Sai Textiles",
        image: "/static_images/clients/Sam_Sai_Texttiles.jpeg",
    },
    {
        name: "Framework Design",
        image: "/static_images/clients/framework_design.png",
    },
    {
        name: "Shieldora Tech",
        image: "/static_images/clients/Shieldoratech.png",
    },
];

const ClientCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div
            className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl p-0 
            border border-white/5 bg-gradient-to-b from-white/5 to-transparent transition-all duration-300
            hover:border-brand-purple/50 hover:bg-white/10 ${className}`}
        >
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">{children}</div>
        </div>
    );
};

export default function ClienteleSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-[100vw] mx-auto px-0 relative z-10">
                <div className="mb-12 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wide text-foreground dark:text-white uppercase mb-4">
                        Our Clientele
                    </h2>
                    <div className="h-1 w-24 bg-brand-gradient mx-auto rounded-full opacity-70" />
                </div>

                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:40s]">
                        {clients.map((client, index) => (
                            <div key={index} className="mx-6 h-48 w-64 md:w-80">
                                <ClientCard className="h-full group">
                                    <div className="relative w-full h-[75%] flex items-center justify-center overflow-hidden rounded-t-xl bg-white/5">
                                        {client.image ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={client.image}
                                                    alt={client.name}
                                                    fill
                                                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                                />
                                                {/* Gradient Overlay for seamless merge */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-50" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Building2 className="w-10 h-10 text-primary/50" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="h-[25%] w-full flex items-center justify-center bg-black/20 backdrop-blur-sm border-t border-white/5">
                                        <h3 className="text-sm font-bold tracking-wider uppercase text-center text-foreground/70 group-hover:text-brand-purple transition-colors px-2 line-clamp-1">
                                            {client.name}
                                        </h3>
                                    </div>
                                </ClientCard>
                            </div>
                        ))}
                    </Marquee>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center border-t border-border/50 dark:border-white/10 pt-12 px-4"
                >
                    <p className="text-lg md:text-xl text-muted-foreground dark:text-gray-300 font-light max-w-3xl mx-auto">
                        A successful partnership thrives on mutual <span className="text-foreground dark:text-white font-medium">trust</span>, <span className="text-foreground dark:text-white font-medium">respect</span>, and <span className="text-foreground dark:text-white font-medium">open communication</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
