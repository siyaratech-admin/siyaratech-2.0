"use client";

import React from "react";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { Building2 } from "lucide-react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
});

const clients = [
    {
        name: "Samarth Group",
        image: "/static_images/clients/samarth_builders.png",
    },
    {
        name: "Baner 87 Realty",
        image: "/static_images/clients/baner_87_reality.jpeg", // Image not found
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
    const globeConfig = {
        pointSize: 4,
        globeColor: "#1D072E",
        showAtmosphere: true,
        atmosphereColor: "#3a0ca3",
        atmosphereAltitude: 0.1,
        emissive: "#1d072e",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.0, lng: 55.0 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
    const globeData = [
        // Arcs connecting the locations
        {
            order: 1,
            startLat: 40.7128, startLng: -74.0060, // New York, USA
            endLat: 25.2048, endLng: 55.2708, // Dubai
            arcAlt: 0.3,
            color: colors[0],
        },
        {
            order: 2,
            startLat: 25.2048, startLng: 55.2708, // Dubai
            endLat: 28.6139, endLng: 77.2090, // New Delhi, India
            arcAlt: 0.2,
            color: colors[1],
        },
        {
            order: 3,
            startLat: 40.7128, startLng: -74.0060, // New York, USA
            endLat: 28.6139, endLng: 77.2090, // New Delhi, India
            arcAlt: 0.5,
            color: colors[2],
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black/40">
            <div className="max-w-[100vw] mx-auto px-0 relative z-10">
                <div className="mb-12 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-light tracking-wide text-foreground dark:text-white uppercase mb-4">
                        Our Clientele
                    </h2>
                    <div className="h-1 w-24 bg-brand-gradient mx-auto rounded-full opacity-70" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center max-w-8xl mx-auto px-4 lg:px-8">
                    {/* Left Side: Client Marquee */}
                    <div className="w-full overflow-hidden">
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
                            className="mt-8 text-center"
                        >
                            <p className="text-lg text-muted-foreground dark:text-gray-300 font-light max-w-lg mx-auto">
                                A successful partnership thrives on mutual <span className="text-foreground dark:text-white font-medium">trust</span>, <span className="text-foreground dark:text-white font-medium">respect</span>, and <span className="text-foreground dark:text-white font-medium">open communication</span>.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side: Globe & Global Presence */}
                    <div className="relative w-full h-[1000px] flex flex-col items-center justify-center">
                        <div className="absolute inset-x-0 bottom-0 h-40  z-20 pointer-events-none" />
                        <div className="w-full h-full relative z-10">
                            <World globeConfig={globeConfig} data={globeData} />
                        </div>
                        <div className="absolute bottom-10 left-0 right-0 z-30 text-center pointer-events-none">
                            <h3 className="text-xl md:text-2xl font-semibold text-white tracking-widest uppercase mb-2">Global Presence</h3>
                            <div className="flex justify-center gap-6 text-sm md:text-base text-gray-400 font-light tracking-wide">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400"></span>USA</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Dubai</span>
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span>India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
