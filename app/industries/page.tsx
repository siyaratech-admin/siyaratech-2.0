"use client";
import React from "react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Heart,
  DollarSign,
  Factory,
  ShoppingBag,
  GraduationCap,
  Laptop,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import {
  IconBriefcase,
  IconShieldLock,
  IconRocket,
  IconChartBar,
  IconBulb,
  IconUsersGroup,
} from "@tabler/icons-react";

/* ─── Reusable animated wrappers ─────────────────────────────────────── */

/** Fades + rises a single element into view */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children — each child gets progressively more delay */
function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  baseDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: baseDelay,
        staggerChildren: stagger,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 32, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {React.Children.map(children, (child_el) =>
        React.isValidElement(child_el) ? (
          <motion.div variants={child}>{child_el}</motion.div>
        ) : (
          child_el
        )
      )}
    </motion.div>
  );
}

/** Horizontal reveal line — decorative accent */
function RevealLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex items-center justify-center gap-3 mb-6">
      <motion.div
        className="h-px rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #833AB4, #FD1D1D, #FCB045)",
          width: 0,
        }}
        animate={inView ? { width: 64 } : { width: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-violet-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.3 }}
      />
      <motion.div
        className="h-px rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #FCB045, #FD1D1D, #833AB4, transparent)",
          width: 0,
        }}
        animate={inView ? { width: 64 } : { width: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/** Section heading block with staggered badge → line → title → body */
function SectionHeading({
  badge,
  title,
  body,
}: {
  badge: string;
  title: React.ReactNode;
  body?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.div
        custom={0}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2">
          {badge}
        </Badge>
      </motion.div>

      <RevealLine delay={0.1} />

      <motion.h2
        custom={2}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-4xl md:text-5xl font-bold mb-6 text-brand-gradient"
      >
        {title}
      </motion.h2>

      {body && (
        <motion.p
          custom={3}
          variants={variants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}

/** Wraps a BentoCard with a staggered entrance */
function AnimatedBentoCard({
  index,
  ...props
}: { index: number } & React.ComponentProps<typeof BentoCard>) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={props.className}
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {}
      }
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.1,   // stagger by column position
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Pass className as "h-full w-full" so inner card fills the motion wrapper */}
      <BentoCard {...props} className="h-full w-full col-span-3" />
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function IndustriesPage() {
  const industries = [
    {
      Icon: Heart,
      name: "Healthcare",
      description:
        "Revolutionize patient care and streamline operations with our cutting-edge healthcare solutions.",
      href: "/industries/healthcare",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
          alt="Healthcare background"
          fill
        />
      ),
      className: "md:col-span-2",
    },
    {
      Icon: DollarSign,
      name: "Finance",
      description:
        "Transform your financial services with our innovative technology solutions and expert consulting.",
      href: "/industries/finance",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
          alt="Finance background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Factory,
      name: "Manufacturing",
      description:
        "Optimize your manufacturing processes and drive innovation with our industry-specific solutions.",
      href: "/industries/manufacturing",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop"
          alt="Manufacturing background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: ShoppingBag,
      name: "Retail",
      description:
        "Elevate your retail business with our cutting-edge technology solutions and strategic consulting.",
      href: "/industries/retail",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
          alt="Retail background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: GraduationCap,
      name: "Education",
      description:
        "Empowering institutions with innovative educational technology solutions.",
      href: "/industries/education",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
          alt="Education background"
          fill
        />
      ),
      className: "md:col-span-1",
    },
    {
      Icon: Laptop,
      name: "Technology",
      description:
        "Partnering with tech companies for innovative software development and IT services.",
      href: "/industries/technology",
      cta: "Learn More",
      background: (
        <Image
          className="absolute bottom-0 left-0 h-full w-full rounded-xl object-cover object-center opacity-20 transition-opacity duration-300 group-hover:opacity-50"
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop"
          alt="Technology background"
          fill
        />
      ),
      className: "md:col-span-3",
    },
  ];

  const advantages = [
    {
      title: "Industry-Specific Expertise",
      description:
        "Our teams have deep knowledge of industry regulations, best practices, and unique challenges.",
      icon: <IconBriefcase className="h-8 w-8" />,
    },
    {
      title: "Compliance & Security",
      description:
        "We ensure all solutions meet industry-specific compliance requirements and security standards.",
      icon: <IconShieldLock className="h-8 w-8" />,
    },
    {
      title: "Rapid Implementation",
      description:
        "Pre-built industry modules and templates accelerate deployment and reduce time-to-value.",
      icon: <IconRocket className="h-8 w-8" />,
    },
    {
      title: "Industry Benchmarking",
      description:
        "Compare your performance against industry standards and identify improvement opportunities.",
      icon: <IconChartBar className="h-8 w-8" />,
    },
    {
      title: "Continuous Innovation",
      description:
        "Stay ahead with regular updates based on industry trends and emerging technologies.",
      icon: <IconBulb className="h-8 w-8" />,
    },
    {
      title: "Partnership Ecosystem",
      description:
        "Access to industry partners, vendors, and specialists for comprehensive solutions.",
      icon: <IconUsersGroup className="h-8 w-8" />,
    },
  ];

  return (
    <div className="">
      <PageHeader
        title="Industries We Serve"
        subtitle="Delivering Specialized Solutions Across Diverse Industries"
        description="With deep domain expertise and cutting-edge technology, we help businesses across multiple industries transform their operations and achieve sustainable growth."
        badge="Our Expertise"
      />

      <section className="pb-24 bg-transparent transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section heading ── */}
          <SectionHeading
            badge="Industry Expertise"
            title="Deep Domain Knowledge"
            body="We understand that each industry has unique challenges and requirements. Our specialized solutions are designed to address specific industry needs while leveraging the latest technologies."
          />

          {/* ── Bento grid — each card animates in independently ── */}
          {/*
            We render the BentoGrid shell (just the CSS grid wrapper)
            and replace each BentoCard with AnimatedBentoCard so every
            card gets its own IntersectionObserver trigger.
          */}
          <BentoGrid>
            {industries.map((industry, index) => (
              <AnimatedBentoCard key={index} index={index} {...industry} />
            ))}
          </BentoGrid>

          {/* ── Why Choose — heading + staggered feature cards ── */}
          <div className="mt-32">
            <SectionHeading
              badge="Why Us"
              title={
                <span className="bg-gradient-to-r from-brand-purple via-brand-red to-brand-orange bg-clip-text text-transparent">
                  Why Choose Our Industry Solutions
                </span>
              }
            />

            {/*
              FeaturesGrid doesn't expose per-card animation hooks,
              so we wrap the whole grid in a single fade-up.
              If FeaturesGrid renders a flat list of children you can
              swap this for a StaggerContainer.
            */}
            <FadeUp delay={0.1}>
              <FeaturesGrid features={advantages} cols={3} />
            </FadeUp>
          </div>

        </div>
      </section>
    </div>
  );
}