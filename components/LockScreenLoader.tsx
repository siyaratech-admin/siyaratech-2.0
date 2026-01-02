"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function LockScreenLoader({ checkSession = false }: { checkSession?: boolean }) {
    const [isVisible, setIsVisible] = useState(true);

    React.useEffect(() => {
        if (checkSession) {
            const hasVisited = sessionStorage.getItem("siyaratech_intro_shown");
            if (hasVisited) {
                setIsVisible(false);
            } else {
                sessionStorage.setItem("siyaratech_intro_shown", "true");
            }
        }
    }, [checkSession]);

    // Auto-close since video is disabled
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleVideoEnd = () => {
        // Delay slightly before triggering exit to ensure video holds last frame
        setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[100] w-full h-[100dvh] flex items-center justify-center bg-black overflow-hidden"
            >
                {/* Video commented out as requested */}
                {/* <video
                    src="/Logo_Animation.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-contain md:object-cover"
                    onEnded={handleVideoEnd}
                /> */}
                <div className="text-white">Loading...</div>
            </motion.div>
        </AnimatePresence>
    );
}
