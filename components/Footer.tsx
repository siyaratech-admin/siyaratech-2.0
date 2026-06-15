"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Separator } from "./ui/separator";
import {
  Mail, MapPin, Linkedin, Facebook, Instagram,
  ArrowRight, Heart, Send, CheckCircle2,
} from "lucide-react";

const logoText = "/static_images/siyaratech_logo_name_below_tagline.png";
const logoIcon = "/static_images/siyaratech_logo_transparent.png";

// ─── Data ──────────────────────────────────────────────────────────────────
const footerSections = [
  {
    title: "Services",
    links: [
      { name: "AI & Automation",       href: "/services" },
      { name: "Cloud Services",         href: "/services" },
      { name: "Software Development",   href: "/services" },
      { name: "Digital Transformation", href: "/services" },
      { name: "Business Consulting",    href: "/services" },
      { name: "Talent Outsourcing",     href: "/services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Healthcare",    href: "/industries" },
      { name: "Finance",       href: "/industries" },
      { name: "Manufacturing", href: "/industries" },
      { name: "Retail",        href: "/industries" },
      { name: "Education",     href: "/industries" },
      { name: "Technology",    href: "/industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us",     href: "/about"        },
      { name: "Courses",      href: "/courses"      },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog",         href: "/blog"         },
      { name: "Careers",      href: "/careers"      },
      { name: "Contact",      href: "/contact"      },
    ],
  },
];

const socialLinks = [
  { icon: Linkedin,  href: "https://www.linkedin.com/company/siyaratech-innovations/", name: "LinkedIn",  color: "hover:bg-[#0077B5]" },
  { icon: Facebook,  href: "https://www.facebook.com/p/Siyaratech-Innovations-LLP-61571050325494/", name: "Facebook",  color: "hover:bg-[#1877F2]" },
  { icon: Instagram, href: "https://www.instagram.com/siyaratech.innovations/", name: "Instagram", color: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743]" },
];

const legalLinks = [
  { name: "Privacy Policy",   href: "/privacy-policy"   },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookie Policy",    href: "/cookie-policy"    },
];

// ─── Newsletter ────────────────────────────────────────────────────────────
function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || state !== "idle") return;
    setState("loading");
    await new Promise(r => setTimeout(r, 1200)); // simulate
    setState("done");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 via-chart-1/5 to-chart-2/5 backdrop-blur-sm p-10 md:p-14 text-center mb-20"
    >
      {/* Glow orbs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-chart-1/15 rounded-full blur-[80px] pointer-events-none" />
      {/* Top shimmer line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary/80 mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
          Newsletter
        </span>

        <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-3 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text text-transparent">
          Stay Ahead of the Curve
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
          Get the latest insights on AI, digital transformation, and enterprise tech — delivered straight to your inbox.
        </p>

        {state === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 text-primary font-semibold"
          >
            <CheckCircle2 className="w-5 h-5" />
            You&apos;re subscribed! Welcome aboard.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-background/70 border border-border/60 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-chart-1 hover:from-violet-500 hover:to-indigo-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap"
            >
              {state === "loading" ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <><Send className="w-4 h-4" /> Subscribe</>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─── Animated Link ─────────────────────────────────────────────────────────
function FooterLink({ href, name, delay }: { href: string; name: string; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
      >
        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary" />
        <span>{name}</span>
      </Link>
    </motion.li>
  );
}

// ─── Main Footer ───────────────────────────────────────────────────────────
export default function Footer() {
  const bottomRef = useRef(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-40px" });

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      {/* Deep background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/10 pointer-events-none" />

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">

        {/* Newsletter */}
        <NewsletterBlock />

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-1 rounded-xl blur-sm opacity-40" />
                <Image src={logoIcon} alt="SIYARATECH" width={42} height={42} className="relative object-contain rounded-xl" />
              </div>
              <Image src={logoText} alt="SIYARATECH" width={150} height={32} className="h-8 w-auto object-contain" />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-7 max-w-xs">
              Empowering businesses through innovative technology solutions — transforming ideas into reality with AI, modern web platforms, and comprehensive digital transformation.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href="mailto:support@siyaratechin.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                </span>
                support@siyaratechin.com
              </a>
              {[
                "Prabhat Road, Pune, 411004",
                "Nashik Road, Nashik, Maharashtra, 422101",
              ].map((addr, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </span>
                  {addr}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-7">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className={`w-9 h-9 rounded-xl border border-border/60 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-white hover:border-transparent transition-all duration-300 ${s.color}`}
                >
                  <s.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 + si * 0.1, ease: "easeOut" }}
            >
              <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, li) => (
                  <FooterLink
                    key={li}
                    href={link.href}
                    name={link.name}
                    delay={0.2 + si * 0.08 + li * 0.04}
                  />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <Separator className="opacity-30" />

        {/* Bottom bar */}
        <motion.div
          ref={bottomRef}
          initial={{ opacity: 0, y: 12 }}
          animate={bottomInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="py-7 flex flex-col md:flex-row justify-between items-center gap-5"
        >
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            © 2026 SIYARATECH INNOVATIONS PVT LTD. Made with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </motion.span>
            for innovation.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {legalLinks.map((l, i) => (
              <React.Fragment key={i}>
                <Link href={l.href} className="hover:text-primary transition-colors duration-200">
                  {l.name}
                </Link>
                {i < legalLinks.length - 1 && <span className="opacity-30">·</span>}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-muted-foreground shrink-0">
            Serving clients worldwide since 2014
          </p>
        </motion.div>
      </div>
    </footer>
  );
}