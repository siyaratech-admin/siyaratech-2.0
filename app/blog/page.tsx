"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, BookOpen, RefreshCw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

// ─── Loading State ────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col justify-center items-center py-32 gap-4">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-b-primary/40 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
      </div>
      <span className="text-sm text-muted-foreground tracking-widest uppercase">
        Loading Articles
      </span>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <RefreshCw className="h-7 w-7 text-red-400" />
      </div>
      <div className="text-center">
        <p className="text-foreground font-medium mb-1">Failed to load articles</p>
        <p className="text-sm text-muted-foreground">Something went wrong on our end.</p>
      </div>
      <Button
        variant="outline"
        onClick={onRetry}
        className="border-primary/30 text-primary hover:bg-primary/10 gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}

// ─── Coming Soon State ────────────────────────────────────────────────────────

function ComingSoonState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      {/* Layered glow rings */}
      <div className="relative flex items-center justify-center mb-12">
        <span className="absolute h-40 w-40 rounded-full bg-primary/5 border border-primary/10 animate-pulse" />
        <span className="absolute h-28 w-28 rounded-full bg-primary/10 border border-primary/20" />
        <span className="relative flex items-center justify-center h-20 w-20 rounded-full bg-primary/15 border border-primary/30">
          <BookOpen className="h-9 w-9 text-primary" />
        </span>
      </div>

      {/* Label */}
      <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-4 font-medium">
        Stay Tuned
      </p>

      {/* Main heading */}
      <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 text-foreground">
        Coming
        <span
          className="block bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.4))",
          }}
        >
          Soon
        </span>
      </h2>

      {/* Divider line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-12 bg-primary/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <div className="h-px w-12 bg-primary/30" />
      </div>

      <p className="max-w-sm text-muted-foreground text-base leading-relaxed">
        We're crafting insightful articles on technology, AI, and digital
        transformation. Great content is on its way.
      </p>

      {/* Animated dots */}
      <div className="mt-10 flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-1 rounded-full bg-primary/40"
            style={{
              width: i === 2 ? "2rem" : "0.5rem",
              animation: "pulse 2s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Featured Blog Card ───────────────────────────────────────────────────────

function FeaturedBlog({
  blog,
  onNavigate,
}: {
  blog: Blog;
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="mb-16">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-border/50" />
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 text-xs tracking-wider uppercase">
          Featured Article
        </Badge>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      {/* Card — uses width/height instead of fill to avoid ANY escape */}
      <div
        className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card cursor-pointer
                   hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5
                   transition-all duration-500"
        onClick={() => onNavigate(blog.id)}
      >
        <div className="flex flex-col md:flex-row md:h-[440px]">

          {/* Image — uses width+height, NOT fill */}
          <div className="md:w-1/2 h-[260px] md:h-full overflow-hidden relative">
            <Image
              src={blog.image}
              alt={blog.title}
              width={800}
              height={440}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=440&fit=crop";
              }}
            />
            {/* Subtle gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Top accent line */}
              <div className="w-8 h-0.5 bg-primary mb-8" />

              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-5
                             group-hover:text-primary transition-colors duration-300">
                {blog.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed line-clamp-4 text-sm md:text-base">
                {blog.description}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button
                className="group/btn gap-2 hover:gap-3 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(blog.id);
                }}
              >
                Read Article
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
              <span className="text-xs text-muted-foreground/60 tracking-wider uppercase">
                Featured
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Blog Grid Card ───────────────────────────────────────────────────────────

function BlogGridCard({ blog, onNavigate, index }: { blog: Blog; onNavigate: (id: string) => void; index: number }) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden border border-border/50 bg-card cursor-pointer
                 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1
                 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onNavigate(blog.id)}
    >
      {/* Image — fixed height, no fill */}
      <div className="h-[200px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          width={600}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=200&fit=crop";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="w-5 h-0.5 bg-primary/60 mb-4 group-hover:w-8 transition-all duration-300" />
        <h3 className="font-semibold text-base leading-snug mb-3
                       group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-5">
          {blog.description}
        </p>
        <div className="flex items-center gap-1.5 text-primary text-xs font-medium
                        group-hover:gap-2.5 transition-all duration-200">
          Read more
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

// ─── Blog Grid ────────────────────────────────────────────────────────────────

function BlogGrid({ blogs, onNavigate }: { blogs: Blog[]; onNavigate: (id: string) => void }) {
  if (blogs.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-border/50" />
        <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60">
          More Articles
        </span>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, i) => (
          <BlogGridCard key={blog.id} blog={blog} onNavigate={onNavigate} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data.blogs ?? []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("fetch_failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const featuredBlog = blogs[0] ?? null;
  const remainingBlogs = blogs.slice(1);
  const navigate = (id: string) => router.push(`/blog/${id}`);

  return (
    // bg-background + min-h-screen are CRITICAL — they block the homepage
    // hero from bleeding through during Next.js page transitions
    <div className="pt-16 bg-background min-h-screen">

      <PageHeader
        title="Blog & Insights"
        subtitle="Stay Ahead of the Curve"
        description="Discover the latest trends, best practices, and expert insights in technology, AI, and digital transformation."
        badge="Latest Updates"
      />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading && <LoadingState />}

          {!loading && error && <ErrorState onRetry={fetchBlogs} />}

          {!loading && !error && blogs.length === 0 && <ComingSoonState />}

          {!loading && !error && blogs.length > 0 && (
            <>
              {featuredBlog && (
                <FeaturedBlog blog={featuredBlog} onNavigate={navigate} />
              )}
              <BlogGrid blogs={remainingBlogs} onNavigate={navigate} />
            </>
          )}

        </div>
      </section>
    </div>
  );
}