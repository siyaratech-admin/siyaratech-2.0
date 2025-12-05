"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import MaskedDiv from '@/components/ui/masked-div';
import { motion } from 'motion/react';

export default function ServicesPage() {
  const router = useRouter();

  // Function to navigate and scroll to top
  const navigateTo = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    router.push(path);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="">
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive Technology Solutions"
        description="From AI implementation to complete digital transformations, we provide cutting-edge technology services that drive measurable business results."
        badge="What We Do"
      />

      {/* Services Section with Consistent Puzzle Layout */}
      <div className="container mx-auto px-4 py-16 space-y-16 md:space-y-24 lg:space-y-32">

        {/* AI & Technology Consulting - Right Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Video Background (bottom layer) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-1"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>

          {/* Content Card (top layer) - fits in right cutout */}
          <motion.div
            className="absolute top-0 right-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%]"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  AI & Technology Consulting
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Harness the power of artificial intelligence and cutting-edge technologies to drive innovation and competitive advantage.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Machine Learning Implementation
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    AI Strategy Development
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>
        </div>

        {/* Cloud Services - Left Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Content Card (left side) - fits in left cutout */}
          <motion.div
            className="absolute top-0 left-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%] z-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  Cloud Services
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Enhance scalability, flexibility, and security with enterprise-grade cloud solutions and infrastructure.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    AWS, Azure, Google Cloud
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    DevOps & Infrastructure
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>

          {/* Video Background (right side) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-2"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>
        </div>

        {/* Software Development - Right Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Video Background (bottom layer) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-3"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>

          {/* Content Card (top layer) - fits in right cutout */}
          <motion.div
            className="absolute top-0 right-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%]"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  Software Development
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Build robust, scalable applications with modern development practices and cutting-edge technologies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Full-Stack Development
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Mobile & Web Apps
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>
        </div>

        {/* Digital Transformation - Left Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Content Card (left side) - fits in left cutout */}
          <motion.div
            className="absolute top-0 left-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%] z-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  Digital Transformation
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Transform your business digitally to stay competitive in the modern market landscape.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Strategy Consulting
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Process Optimization
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>

          {/* Video Background (right side) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-4"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/18069232/18069232-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>
        </div>

        {/* Business Consulting - Right Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Video Background (bottom layer) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-1"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>

          {/* Content Card (top layer) - fits in right cutout */}
          <motion.div
            className="absolute top-0 right-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%]"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  Business Consulting
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Unlock your business&apos;s potential with strategic consulting for sustainable growth and performance.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Strategy Development
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Performance Improvement
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>
        </div>

        {/* Talent Outsourcing - Left Cutout */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
          {/* Content Card (left side) - fits in left cutout */}
          <motion.div
            className="absolute top-0 left-0 w-full md:w-[55%] lg:w-[45%] h-full md:h-[55%] lg:h-[45%] z-10"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <MaskedDiv
              maskType="type-1"
              size={1}
              className="w-full h-full"
            >
              <div className="w-full h-full bg-white/95 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/80 dark:border-white/10 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                  Talent Outsourcing
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3 md:mb-4">
                  Focus on core competencies while we provide talented professionals for your IT and business processes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    IT Staffing Solutions
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-primary">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    Remote Team Management
                  </div>
                </div>
              </div>
            </MaskedDiv>
          </motion.div>

          {/* Video Background (right side) */}
          <div className="absolute inset-0">
            <MaskedDiv
              maskType="type-2"
              size={0.45}
              className="w-full h-full"
            >
              <video
                className="cursor-pointer transition-all duration-300 hover:scale-105 w-full h-full object-cover"
                autoPlay
                loop
                muted
              >
                <source
                  src="https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4"
                  type="video/mp4"
                />
              </video>
            </MaskedDiv>
          </div>
        </div>
      </div>
    </div>
  );
}