"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedBackgroundBlobs = ({ className }: { className?: string }) => {
    return (
        <div className={cn("fixed inset-0 z-[-1] overflow-hidden pointer-events-none", className)}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-hard-light filter opacity-50 dark:opacity-30"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-pink-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-hard-light filter opacity-50 dark:opacity-30"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-hard-light filter opacity-50 dark:opacity-30"
            />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, -50, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 7,
                }}
                className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-hard-light filter opacity-50 dark:opacity-30"
            />

            {/* Noise Overlay */}
            <div
                className="absolute inset-0 z-50 opacity-[0.03] dark:opacity-[0.06] pointer-events-none mix-blend-overlay dark:mix-blend-soft-light"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
