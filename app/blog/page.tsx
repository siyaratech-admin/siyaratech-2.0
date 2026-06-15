"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const CARD_BG  = "#0d0d0d";   // explicit dark card background — no CSS var
const BORDER_IDLE = "rgba(255,255,255,0.08)"; // subtle idle border colour

const G = {
  grad: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
};

// ─── Static blog data ─────────────────────────────────────────────────────────
interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  reading_time: number;
  author: string;
  claps: number;
  tags: string[];
}

const BLOGS: Blog[] = [
  {
    id: "1",
    title: "The Future of AI in Enterprise: How Businesses Are Transforming with Intelligent Automation",
    description:
      "Artificial intelligence is no longer a buzzword confined to research labs — it's reshaping how enterprises operate, compete, and grow. From predictive analytics to autonomous workflows, discover how forward-thinking organisations are leveraging AI to unlock unprecedented efficiency and innovation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=480&fit=crop",
    reading_time: 8,
    author: "Aryan Mehta",
    claps: 4320,
    tags: ["Artificial Intelligence", "Enterprise", "Automation", "Digital Transformation"],
  },
  {
    id: "2",
    title: "Cybersecurity in 2025: Emerging Threats and How to Stay Protected",
    description:
      "Emerging threats and the advanced security measures needed to protect your digital assets in an increasingly hostile landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=340&fit=crop",
    reading_time: 6,
    author: "Priya Sharma",
    claps: 2870,
    tags: ["Cybersecurity", "Cloud", "Zero Trust"],
  },
  {
    id: "3",
    title: "Cloud Migration Done Right: A Step-by-Step Guide for Legacy Systems",
    description:
      "Best practices for moving your legacy infrastructure to the cloud securely and efficiently without disrupting day-to-day operations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=340&fit=crop",
    reading_time: 10,
    author: "Rohan Desai",
    claps: 1950,
    tags: ["Cloud", "DevOps", "Migration"],
  },
  {
    id: "4",
    title: "Generative AI for Product Teams: From Ideation to Deployment",
    description:
      "A practical guide for product managers and engineers on integrating generative AI capabilities into your product lifecycle — from rapid prototyping to production-grade rollouts.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=340&fit=crop",
    reading_time: 7,
    author: "Sana Iyer",
    claps: 3410,
    tags: ["GenAI", "Product", "LLM"],
  },
  {
    id: "5",
    title: "Data Engineering in the Modern Stack: dbt, Spark, and Beyond",
    description:
      "How top data teams are building reliable, scalable pipelines using the modern data stack — and what tools are winning the battle for engineering mindshare.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=340&fit=crop",
    reading_time: 9,
    author: "Karan Patel",
    claps: 1680,
    tags: ["Data Engineering", "Analytics", "dbt"],
  },
  {
    id: "6",
    title: "UX Trends Shaping Digital Products in 2025",
    description:
      "From AI-driven personalisation to spatial computing interfaces, these are the UX paradigms that will define the next generation of digital experiences.",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=340&fit=crop",
    reading_time: 5,
    author: "Neha Kulkarni",
    claps: 2240,
    tags: ["UX", "Design", "Trends"],
  },
  {
    id: "7",
    title: "Building Resilient Microservices: Patterns That Actually Work in Production",
    description:
      "Circuit breakers, bulkheads, and chaos engineering — the battle-tested patterns every platform engineer needs to know to keep distributed systems healthy under load.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop",
    reading_time: 11,
    author: "Vikram Nair",
    claps: 3090,
    tags: ["Microservices", "Backend", "DevOps"],
  },
];

// ─── Global styles ────────────────────────────────────────────────────────────
//
// Border technique: the WRAPPER has the gradient as its background + a small
// padding. The INNER div covers 100% of that inner area with a solid dark bg.
// Result: gradient is only ever visible as the thin padding rim = border only.
// The inner bg is a hard-coded dark hex — no CSS vars that might resolve wrong.
//
function GlobalStyles() {
  return (
    <style>{`
      @keyframes gradBorderAnim {
        0%   { background-position: 0%   50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0%   50%; }
      }
      @keyframes orbitA { from { transform: rotate(0deg);   } to { transform: rotate(360deg);   } }
      @keyframes orbitB { from { transform: rotate(0deg);   } to { transform: rotate(-360deg);  } }

      /* ── Grid card wrapper ───────────────────────────────────────────────── */
      .gb-wrap {
        border-radius: 1.25rem;
        padding: 1px;
        background: ${BORDER_IDLE};
        cursor: pointer;
        transition: background 0.3s ease, padding 0.3s ease;
        display: flex;
        flex-direction: column;
      }
      .gb-wrap:hover {
        padding: 1.5px;
        background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045, #833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 3s ease infinite;
      }

      /* ── Grid card inner — ALWAYS solid dark ──────────────────────────── */
      .gb-inner {
        border-radius: calc(1.25rem - 1.5px);
        overflow: hidden;
        background: ${CARD_BG};
        display: flex;
        flex-direction: column;
        flex: 1;
        /* Force dark bg — do not inherit anything from parent */
        isolation: isolate;
      }

      /* ── Featured card wrapper — always-on gradient border ───────────── */
      .gb-wrap-featured {
        border-radius: 1.5rem;
        padding: 1.5px;
        background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045, #833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 4s ease infinite;
        cursor: pointer;
      }

      /* ── Featured card inner — ALWAYS solid dark ──────────────────────── */
      .gb-inner-featured {
        border-radius: calc(1.5rem - 1.5px);
        overflow: hidden;
        background: ${CARD_BG};
        width: 100%;
        height: 100%;
        isolation: isolate;
      }

      /* ── Gradient text ───────────────────────────────────────────────── */
      .grad-text {
        background: linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* ── Animated fill for pills / avatar / dots ─────────────────────── */
      .grad-pill {
        background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045, #833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 3s ease infinite;
      }
    `}</style>
  );
}

// ─── InView hook ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedBlog({ blog, onNavigate }: { blog: Blog; onNavigate: (id: string) => void }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="mb-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold text-white grad-pill">
          <Sparkles className="h-3 w-3" />
          Featured Article
        </div>
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
      </div>

      <div
        className="gb-wrap-featured"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate(blog.id)}
      >
        <div className="gb-inner-featured">
          <div className="flex flex-col lg:flex-row lg:h-[480px]">

            {/* Image side */}
            <div className="lg:w-[55%] h-[280px] lg:h-full overflow-hidden relative flex-shrink-0">
              <Image
                src={blog.image} alt={blog.title}
                width={900} height={480}
                className="w-full h-full object-cover"
                style={{ transition: "transform 0.7s cubic-bezier(.16,1,.3,1)", transform: hovered ? "scale(1.05)" : "scale(1)" }}
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&h=480&fit=crop"; }}
              />
              <div className="absolute inset-0 lg:hidden" style={{ background: `linear-gradient(to top, ${CARD_BG} 0%, transparent 55%)` }} />
              <div className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to right, transparent 65%, ${CARD_BG} 100%)` }} />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Clock className="h-3 w-3" style={{ color: "#FCB045" }} />
                {blog.reading_time} min read
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-tr-3xl pointer-events-none opacity-60"
                style={{ background: "linear-gradient(135deg, #833AB4 0%, transparent 70%)" }} />
            </div>

            {/* Content side */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(252,176,69,0.05), transparent 70%)" }} />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-0.5 rounded-full grad-pill"
                    style={{ width: hovered ? "3.5rem" : "2rem", transition: "width 0.4s ease" }} />
                  <span className="text-xs tracking-widest uppercase font-bold grad-text">{blog.tags[0]}</span>
                </div>
                <h2
                  className="text-2xl lg:text-[1.9rem] font-black leading-[1.18] mb-5 tracking-tight"
                  style={{ transition: "color 0.3s ease", color: hovered ? "#FD1D1D" : "#ffffff" }}
                >
                  {blog.title}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: "0.9rem" }} className="line-clamp-4">
                  {blog.description}
                </p>
                {blog.tags.length > 1 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {blog.tags.slice(1, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: "rgba(131,58,180,0.15)", color: "#c084fc", border: "1px solid rgba(131,58,180,0.3)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0 grad-pill">
                    {blog.author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#ffffff" }}>{blog.author}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>👏 {blog.claps.toLocaleString()}</p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
                  style={{ background: G.grad }}
                  onClick={(e) => { e.stopPropagation(); onNavigate(blog.id); }}
                >
                  Read Article
                  <ArrowRight className="h-4 w-4"
                    style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s ease" }} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Card ────────────────────────────────────────────────────────────────
function BlogGridCard({ blog, onNavigate, index }: { blog: Blog; onNavigate: (id: string) => void; index: number }) {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(.16,1,.3,1) ${index * 75}ms, transform 0.65s cubic-bezier(.16,1,.3,1) ${index * 75}ms`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        className="gb-wrap flex-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate(blog.id)}
      >
        <div className="gb-inner">

          {/* Image */}
          <div className="overflow-hidden relative flex-shrink-0"
            style={{ height: 210, borderRadius: "calc(1.25rem - 1.5px) calc(1.25rem - 1.5px) 0 0" }}>
            <Image
              src={blog.image} alt={blog.title}
              width={600} height={210}
              className="w-full h-full object-cover"
              style={{ transition: "transform 0.7s cubic-bezier(.16,1,.3,1)", transform: hovered ? "scale(1.07)" : "scale(1)" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=210&fit=crop"; }}
            />
            {/* Fade to card dark bg */}
            <div className="absolute bottom-0 left-0 right-0 h-20"
              style={{ background: `linear-gradient(to top, ${CARD_BG}, transparent)` }} />
            {/* Reading time */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Clock className="h-2.5 w-2.5" style={{ color: "#FCB045" }} />
              {blog.reading_time}m
            </div>
          </div>

          {/* Content — explicitly dark text on dark bg */}
          <div className="p-6 flex flex-col flex-1" style={{ background: CARD_BG }}>
            {/* Accent bar */}
            <div className="h-0.5 rounded-full mb-4 grad-pill"
              style={{ width: hovered ? "3rem" : "1.25rem", transition: "width 0.35s ease" }} />

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {blog.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: "rgba(131,58,180,0.15)", color: "#c084fc", border: "1px solid rgba(131,58,180,0.3)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3
              className="font-black text-[0.95rem] leading-snug mb-3 line-clamp-2 flex-shrink-0"
              style={{ transition: "color 0.25s ease", color: hovered ? "#FD1D1D" : "#ffffff" }}
            >
              {blog.title}
            </h3>

            <p className="text-sm line-clamp-3 leading-relaxed flex-1 mb-5"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              {blog.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 grad-pill">
                  {blog.author[0].toUpperCase()}
                </div>
                <span className="text-xs font-medium truncate max-w-[80px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {blog.author}
                </span>
              </div>
              <div
                className="flex items-center text-xs font-bold"
                style={{
                  gap: hovered ? "0.5rem" : "0.25rem",
                  transition: "gap 0.25s ease",
                  background: G.grad,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Read more
                <ArrowRight className="h-3 w-3 flex-shrink-0"
                  style={{ color: "#FCB045", transform: hovered ? "translateX(2px)" : "translateX(0)", transition: "transform 0.25s ease" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const router = useRouter();
  const navigate = (id: string) => router.push(`/blog/${id}`);

  const featuredBlog = BLOGS[0];
  const remainingBlogs = BLOGS.slice(1);

  return (
    <div className="pt-16 bg-background min-h-screen">
      <GlobalStyles />

      <PageHeader
        title="Blog & Insights"
        subtitle="Stay Ahead of the Curve"
        description="Discover the latest trends, best practices, and expert insights in technology, AI, and digital transformation."
        badge="Latest Updates"
      />

      <section className="py-16 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FeaturedBlog blog={featuredBlog} onNavigate={navigate} />

          {/* Grid label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #833AB4, transparent)" }} />
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold grad-text">More Articles</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #FCB045, transparent)" }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingBlogs.map((blog, i) => (
              <BlogGridCard key={blog.id} blog={blog} onNavigate={navigate} index={i} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}