"use client";

/**
 * @author: @dorian_baffier
 * @description: Shape Hero
 * @version: 1.1.0 (Fixed Moving Border effect)
 * @date: 2025-08-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MovingBorder } from "../ui/moving-border"; // Ensure this path is correct

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  borderRadius = 3,
  showMovingBorder = false,
  movingBorderColor = "bg-[linear-gradient(120deg,transparent,#0ea5e9,transparent)]",
  movingBorderDuration = 3000,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  borderRadius?: number;
  showMovingBorder?: boolean;
  movingBorderColor?: string;
  movingBorderDuration?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
          borderRadius: `${borderRadius}px`,
        }}
        className="relative overflow-hidden"
      >
        {/* Moving Border */}
        {showMovingBorder && (
          <div className="absolute inset-0">
            <MovingBorder
              duration={movingBorderDuration}
              rx={`${(borderRadius / Math.min(width, height)) * 100}%`}
              ry={`${(borderRadius / Math.min(width, height)) * 100}%`}
            >
              <div
                className={cn(
                  "h-8 w-40 opacity-[0.8] blur-lg",
                  movingBorderColor,
                )}
              />
            </MovingBorder>
          </div>
        )}

        {/* Main shape */}
        <div
          style={{
            borderRadius: `${borderRadius * 0.96}px`,
          }}
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[1px]",
            "ring-1 ring-white/[0.08] dark:ring-white/[0.05]",
            "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-8px_rgba(255,255,255,0.05)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]",
            "after:rounded-[inherit]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ShapeHero({
  title1 = "Transform Your Business",
  title2 = "with Cutting-Edge Technology",
}: {
  title1?: string;
  title2?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#030303]">
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80 dark:from-white dark:to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#030303] transition-colors duration-300">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.02] to-pink-500/[0.03] dark:from-blue-500/[0.08] dark:via-purple-500/[0.05] dark:to-pink-500/[0.08] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {/* Large rectangle - top left with MovingBorder */}
        <ElegantShape
          delay={0.2}
          width={350}
          height={450}
          rotate={-12}
          borderRadius={28}
          gradient="from-blue-500/[0.15] via-blue-400/[0.10] to-transparent dark:from-blue-400/[0.25] dark:via-blue-300/[0.15] dark:to-transparent"
          className="left-[-18%] top-[-8%]"
          showMovingBorder={true}
          movingBorderColor="bg-[linear-gradient(90deg,transparent,#3b82f6,transparent)]"
          movingBorderDuration={4000}
        />

        {/* Wide rectangle - bottom right with MovingBorder */}
        <ElegantShape
          delay={0.4}
          width={550}
          height={180}
          rotate={18}
          borderRadius={24}
          gradient="from-pink-500/[0.15] via-rose-400/[0.10] to-transparent dark:from-pink-400/[0.25] dark:via-rose-300/[0.15] dark:to-transparent"
          className="right-[-25%] bottom-[-8%]"
          showMovingBorder={true}
          movingBorderColor="bg-[linear-gradient(90deg,transparent,#ec4899,transparent)]"
          movingBorderDuration={3500}
        />

        {/* Square - middle left with MovingBorder */}
        <ElegantShape
          delay={0.6}
          width={280}
          height={280}
          rotate={28}
          borderRadius={36}
          gradient="from-purple-500/[0.15] via-violet-400/[0.10] to-transparent dark:from-purple-400/[0.25] dark:via-violet-300/[0.15] dark:to-transparent"
          className="left-[-8%] top-[35%]"
          showMovingBorder={true}
          movingBorderColor="bg-[linear-gradient(90deg,transparent,#8b5cf6,transparent)]"
          movingBorderDuration={5000}
        />

        {/* Medium rectangle - top right */}
        <ElegantShape
          delay={0.3}
          width={320}
          height={120}
          rotate={-25}
          borderRadius={16}
          gradient="from-blue-500/[0.15] via-cyan-400/[0.10] to-transparent dark:from-blue-400/[0.25] dark:via-cyan-300/[0.15] dark:to-transparent"
          className="right-[5%] top-[8%]"
        />

        {/* Tall rectangle - center right */}
        <ElegantShape
          delay={0.5}
          width={200}
          height={380}
          rotate={32}
          borderRadius={20}
          gradient="from-orange-500/[0.15] via-amber-400/[0.10] to-transparent dark:from-orange-400/[0.25] dark:via-amber-300/[0.15] dark:to-transparent"
          className="right-[-12%] top-[25%]"
        />

        {/* Small square - bottom left */}
        <ElegantShape
          delay={0.7}
          width={180}
          height={180}
          rotate={-30}
          borderRadius={32}
          gradient="from-teal-500/[0.15] via-cyan-400/[0.10] to-transparent dark:from-teal-400/[0.25] dark:via-cyan-300/[0.15] dark:to-transparent"
          className="left-[15%] bottom-[12%]"
        />

        {/* Small rectangle - top center */}
        <ElegantShape
          delay={0.8}
          width={160}
          height={90}
          rotate={42}
          borderRadius={14}
          gradient="from-indigo-500/[0.15] via-blue-400/[0.10] to-transparent dark:from-indigo-400/[0.25] dark:via-blue-300/[0.15] dark:to-transparent"
          className="left-[45%] top-[12%]"
        />

        {/* Wide rectangle - bottom center */}
        <ElegantShape
          delay={0.9}
          width={400}
          height={160}
          rotate={-15}
          borderRadius={22}
          gradient="from-red-500/[0.15] via-pink-400/[0.10] to-transparent dark:from-red-400/[0.25] dark:via-pink-300/[0.15] dark:to-transparent"
          className="left-[30%] bottom-[5%]"
        />

        {/* Additional floating element */}
        <ElegantShape
          delay={1.0}
          width={120}
          height={120}
          rotate={55}
          borderRadius={24}
          gradient="from-yellow-500/[0.15] via-orange-400/[0.10] to-transparent dark:from-yellow-400/[0.25] dark:via-orange-300/[0.15] dark:to-transparent"
          className="right-[25%] top-[60%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={1}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variants={fadeUpVariants as any}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80 dark:from-white dark:to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>
          <motion.div
            custom={2}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            variants={fadeUpVariants as any}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              We help forward-thinking companies leverage AI, modern web
              technologies, and digital transformation to achieve unprecedented
              growth and efficiency.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 dark:from-[#030303] dark:via-transparent dark:to-[#030303]/80 pointer-events-none" />
    </div>
  );
}