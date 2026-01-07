"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const AnimatedBackgroundBlobs = ({ className }: { className?: string }) => {
    return (
        <div className={cn("fixed inset-0 z-[-1] overflow-hidden pointer-events-none", className)}>
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />

            <div className={`absolute top-0 left-0 w-full h-full opacity-50 dark:opacity-40 overflow-hidden`}>
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-500/30 rounded-full blur-[180px] animate-aurora-1 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
                <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-900/50 rounded-full blur-[180px] animate-aurora-2 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
                <div className="absolute bottom-[5%] right-[-10%] w-[40vw] h-[40vw] bg-blue-800/40 rounded-full blur-[180px] animate-aurora-3 mix-blend-multiply dark:mix-blend-screen will-change-transform" />
            </div>

        </div>
    );
};
