"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export default function LockScreenLoader() {
    const [isVisible, setIsVisible] = useState(true);

    const handleVideoEnd = () => {
        // Delay slightly before triggering exit to ensure video holds last frame
        setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] w-full h-screen flex items-center justify-center bg-black overflow-hidden"
                >
                    <video
                        src="/Logo_Animation.mp4"
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover md:object-cover"
                        onEnded={handleVideoEnd}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
