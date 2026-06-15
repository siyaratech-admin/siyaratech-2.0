"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

/* ── SVG border that draws clockwise from top-left, back to top-left ── */
function BorderSVG({ hovered }: { hovered: boolean }) {
    return (
        <svg
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 20,
                overflow: "visible",
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#833AB4" />
                    <stop offset="50%"  stopColor="#FD1D1D" />
                    <stop offset="100%" stopColor="#FCB045" />
                </linearGradient>
            </defs>
            <rect
                x="0.4" y="0.4"
                width="99.2" height="99.2"
                rx="0" ry="0"
                fill="none"
                stroke="url(#bg1)"
                strokeWidth="0.6"
                pathLength="400"
                strokeDasharray="400"
                strokeDashoffset={hovered ? "0" : "400"}
                strokeLinecap="butt"
                style={{
                    transition: hovered
                        ? "stroke-dashoffset 1.1s cubic-bezier(0.45, 0, 0.15, 1)"
                        : "stroke-dashoffset 0.3s ease",
                }}
            />
        </svg>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
    cols = 3,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
    cols?: number;
}) => {
    const [hovered, setHovered] = useState(false);
    const isTopRow = index < cols;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "flex flex-col py-10 relative group/feature dark:border-neutral-800",
                (index + 1) % cols !== 0 && "lg:border-r",
                index < cols * (Math.ceil(6 / cols) - 1) && "lg:border-b",
            )}
        >
            {/* SVG border draw — sits inside, no overflow issues */}
            <BorderSVG hovered={hovered} />

            {/* Original hover background gradient */}
            {isTopRow ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}

            {/* Icon */}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400 group-hover/feature:text-brand-purple transition-colors duration-200">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-brand-purple transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 group-hover/feature:bg-brand-gradient group-hover/feature:from-brand-purple group-hover/feature:via-brand-red group-hover/feature:to-brand-orange group-hover/feature:bg-clip-text group-hover/feature:text-transparent">
                    {title}
                </span>
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};

interface FeatureItem {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface FeaturesGridProps {
    features: FeatureItem[];
    cols?: 2 | 3 | 4;
}

export function FeaturesGrid({ features, cols = 3 }: FeaturesGridProps) {
    const gridClasses = {
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
    };

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 relative z-10 border rounded-lg dark:border-neutral-800 overflow-hidden",
                gridClasses[cols],
            )}
        >
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} cols={cols} />
            ))}
        </div>
    );
}