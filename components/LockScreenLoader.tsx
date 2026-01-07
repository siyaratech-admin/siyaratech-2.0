"use client";
import React, { useState } from 'react';
export default function LockScreenLoader({ checkSession = false }: { checkSession?: boolean }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    React.useEffect(() => {
        if (checkSession) {
            const hasVisited = sessionStorage.getItem("siyaratech_intro_shown");
            if (hasVisited) {
                // If already visited, don't show at all (or exit immediately)
                setIsVisible(false);
            } else {
                sessionStorage.setItem("siyaratech_intro_shown", "true");
            }
        }
    }, [checkSession]);

    // Auto-close immediately since video is disabled
    React.useEffect(() => {
        // Start exit animation immediately on mount
        const timer = setTimeout(() => {
            setIsExiting(true);
            // Remove from DOM after transition
            setTimeout(() => setIsVisible(false), 400);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] w-full h-[100dvh] flex items-center justify-center bg-black overflow-hidden transition-opacity duration-1000 ease-in-out ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="text-white font-medium tracking-wide text-lg animate-pulse">Get ready to dive into innovation</div>
        </div>
    );
}
