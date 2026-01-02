"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductGalleryProps {
    gallery: string[];
    solutionId: string;
}

export default function ProductGallery({ gallery, solutionId }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    return (
        <div className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden group">
            {/* Browser Header */}
            <div className="h-10 border-b border-border bg-muted flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <div className="ml-4 flex-1 h-6 bg-background rounded-md flex items-center justify-center text-[10px] text-foreground/30 font-mono">
                    siyaratech.com/app/{solutionId}
                </div>
            </div>

            {/* Gallery Content */}
            <div className="relative aspect-video bg-background/50 flex items-center justify-center overflow-hidden">
                <Image
                    src={gallery[currentIndex]}
                    alt={`Gallery screen ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    quality={90}
                />

                {/* Navigation Buttons */}
                {gallery.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/80 text-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={prevSlide}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/80 text-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={nextSlide}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </>
                )}

                {/* Dots indicator */}
                {gallery.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        {gallery.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? "bg-white w-6" : "bg-white/40 w-2 scale-90 hover:scale-110 hover:bg-white/60"
                                    }`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
