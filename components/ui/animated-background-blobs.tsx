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
                className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-2xl filter opacity-40 dark:opacity-20 will-change-transform"
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
                className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-2xl filter opacity-40 dark:opacity-20 will-change-transform"
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
                className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-2xl filter opacity-40 dark:opacity-20 will-change-transform"
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
                className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-2xl filter opacity-40 dark:opacity-20 will-change-transform"
            />

            {/* Noise Overlay Removed for Performance */}
        </div>
    );
};
