"use client";

import { useTheme } from "next-themes";
import Beams from "@/components/Beams";
import { useEffect, useState } from "react";

export default function ThemeAwareBeams() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <Beams
            beamWidth={4}
            beamHeight={60}
            beamNumber={24}
            // Light mode: use a stylish Violet/Purple to match the "AI" theme and avoid "dirty grey" look
            // Dark mode: use white/cyan tint for a cool tech glow
            lightColor={isDark ? "#ffffff" : "#9333ea"}
            backgroundColor={isDark ? "#0c0c0c" : "#ffffff"}
            speed={1.5}
            noiseIntensity={0.8} // Smoother, less noisy beams for a cleaner look
            scale={0.1}
            rotation={20}
        />
    );
}
