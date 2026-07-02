"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { ArrowRight, Clock, Sparkles, AlertCircle } from "lucide-react";
import type { GhostPost } from "@/lib/ghost";

// ─── Palette ──────────────────────────────────────────────────────────────────
const CARD_BG = "#0d0d0d";
const BORDER_IDLE = "rgba(255,255,255,0.08)";
const G = { grad: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)" };

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&h=480&fit=crop";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function postDescription(post: GhostPost): string {
  return post.custom_excerpt || post.excerpt || "";
}
function postImage(post: GhostPost): string {
  return post.feature_image || FALLBACK_IMAGE;
}
function postAuthor(post: GhostPost): string {
  return post.authors?.[0]?.name || "Author";
}
function postTags(post: GhostPost): string[] {
  return post.tags?.map((t) => t.name) || [];
}

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @keyframes gradBorderAnim {
        0%   { background-position: 0%   50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0%   50%; }
      }
      @keyframes ghostShimmer {
        0%   { background-position: -700px 0; }
        100% { background-position:  700px 0; }
      }
      @keyframes ghostFadeIn {
        to { opacity: 1; }
      }

      /* ── Card wrappers ── */
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
        background: linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045,#833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 3s ease infinite;
      }
      .gb-inner {
        border-radius: calc(1.25rem - 1.5px);
        overflow: hidden;
        background: ${CARD_BG};
        display: flex;
        flex-direction: column;
        flex: 1;
        isolation: isolate;
      }

      .gb-wrap-featured {
        border-radius: 1.25rem;
        padding: 1.5px;
        background: linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045,#833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 4s ease infinite;
        cursor: pointer;
        width: 100%;
      }
      .gb-inner-featured {
        border-radius: calc(1.25rem - 1.5px);
        overflow: hidden;
        background: ${CARD_BG};
        width: 100%;
        isolation: isolate;
      }

      /* ── Text helpers ── */
      .grad-text {
        background: linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .grad-pill {
        background: linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045,#833AB4);
        background-size: 300% 300%;
        animation: gradBorderAnim 3s ease infinite;
      }

      /* ── Ghost skeleton ── */
      .ghost-bone {
        border-radius: 6px;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0.04) 0px,
          rgba(255,255,255,0.09) 40px,
          rgba(255,255,255,0.04) 80px
        );
        background-size: 700px 100%;
        animation: ghostShimmer 1.6s ease-in-out infinite;
      }
      .ghost-card {
        border-radius: 1.25rem;
        border: 1px solid rgba(255,255,255,0.06);
        background: ${CARD_BG};
        overflow: hidden;
      }
      .ghost-featured {
        border-radius: 1.25rem;
        border: 1px solid rgba(255,255,255,0.08);
        background: ${CARD_BG};
        overflow: hidden;
        width: 100%;
      }

      /* ── Mobile-specific fixes ── */
      @media (max-width: 767px) {
        .featured-image-wrap {
          height: 220px !important;
          width: 100% !important;
        }
        .featured-content-pad {
          padding: 1.25rem !important;
        }
        .featured-title {
          font-size: 1.25rem !important;
          margin-bottom: 0.75rem !important;
        }
        .featured-excerpt {
          font-size: 0.82rem !important;
          -webkit-line-clamp: 3 !important;
        }
        .featured-footer {
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .featured-read-btn {
          width: 100%;
          justify-content: center;
        }
        .grid-card-img {
          height: 180px !important;
        }
        .grid-card-content {
          padding: 1rem !important;
        }
        .grid-card-title {
          font-size: 0.88rem !important;
        }
        .grid-card-excerpt {
          font-size: 0.78rem !important;
          -webkit-line-clamp: 2 !important;
        }
      }
    `}</style>
  );
}

// ─── Skeleton: Featured Card ──────────────────────────────────────────────────
function FeaturedSkeleton() {
  return (
    <div className="mb-12 md:mb-20">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.12))" }} />
        <div className="ghost-bone h-7 w-40 rounded-full" />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left,transparent,rgba(255,255,255,0.12))" }} />
      </div>
      <div className="ghost-featured w-full">
        <div className="flex flex-col lg:flex-row lg:h-[480px]">
          <div className="w-full lg:w-[55%] h-[220px] lg:h-full ghost-bone flex-shrink-0" style={{ borderRadius: 0 }} />
          <div className="flex-1 p-5 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="ghost-bone h-0.5 w-8 rounded-full" />
                <div className="ghost-bone h-3 w-20 rounded" />
              </div>
              <div className="ghost-bone h-7 w-full rounded mb-2" />
              <div className="ghost-bone h-7 w-4/5 rounded mb-4" />
              <div className="ghost-bone h-4 w-full rounded mb-2" />
              <div className="ghost-bone h-4 w-11/12 rounded mb-2" />
              <div className="ghost-bone h-4 w-3/4 rounded mb-4" />
              <div className="flex gap-2 mt-4">
                <div className="ghost-bone h-6 w-16 rounded-full" />
                <div className="ghost-bone h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="ghost-bone h-9 w-9 rounded-full flex-shrink-0" />
                <div>
                  <div className="ghost-bone h-3 w-24 rounded mb-1.5" />
                  <div className="ghost-bone h-2.5 w-16 rounded" />
                </div>
              </div>
              <div className="ghost-bone h-10 w-full sm:w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton: Grid Card ──────────────────────────────────────────────────────
function GridCardSkeleton({ index }: { index: number }) {
  return (
    <div style={{ opacity: 0, animation: `ghostFadeIn 0.4s ease forwards ${index * 80}ms` }}>
      <div className="ghost-card h-full flex flex-col">
        <div className="ghost-bone flex-shrink-0" style={{ height: 180, borderRadius: 0 }} />
        <div className="p-4 flex flex-col flex-1" style={{ background: CARD_BG }}>
          <div className="ghost-bone h-0.5 w-5 rounded-full mb-3" />
          <div className="flex gap-1.5 mb-3">
            <div className="ghost-bone h-5 w-14 rounded-full" />
            <div className="ghost-bone h-5 w-16 rounded-full" />
          </div>
          <div className="ghost-bone h-4 w-full rounded mb-2" />
          <div className="ghost-bone h-4 w-3/4 rounded mb-3" />
          <div className="ghost-bone h-3.5 w-full rounded mb-1.5" />
          <div className="ghost-bone h-3.5 w-11/12 rounded mb-4" />
          <div className="flex items-center justify-between mt-auto pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-2">
              <div className="ghost-bone h-6 w-6 rounded-full flex-shrink-0" />
              <div className="ghost-bone h-3 w-16 rounded" />
            </div>
            <div className="ghost-bone h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton: Full Page ─────────────────────────────────────────────────────
function BlogSkeleton() {
  return (
    <>
      <FeaturedSkeleton />
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right,transparent,rgba(131,58,180,0.3),transparent)" }} />
        <div className="ghost-bone h-3 w-24 rounded" />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left,transparent,rgba(252,176,69,0.3),transparent)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <GridCardSkeleton key={i} index={i} />
        ))}
      </div>
    </>
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
function FeaturedBlog({
  post,
  onNavigate,
}: {
  post: GhostPost;
  onNavigate: (slug: string) => void;
}) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);
  const tags = postTags(post);

  return (
    <div
      ref={ref}
      className="mb-12 md:mb-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition:
          "opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.12))" }}
        />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold text-white grad-pill whitespace-nowrap">
          <Sparkles className="h-3 w-3" />
          Featured Article
        </div>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to left,transparent,rgba(255,255,255,0.12))" }}
        />
      </div>

      {/* Card */}
      <div
        className="gb-wrap-featured"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onNavigate(post.slug)}
      >
        <div className="gb-inner-featured">
          <div className="flex flex-col lg:flex-row lg:h-[480px]">
            {/* Image */}
            <div
              className="featured-image-wrap relative flex-shrink-0 overflow-hidden"
              style={{ width: "100%", height: 220 }}
            >
              {/* On lg: side-by-side, override via Tailwind */}
              <style>{`
                @media (min-width:1024px){
                  .featured-image-wrap{
                    width:55% !important;
                    height:100% !important;
                  }
                }
              `}</style>
              <Image
                src={postImage(post)}
                alt={post.title}
                width={900}
                height={480}
                className="w-full h-full object-cover"
                style={{
                  transition: "transform 0.7s cubic-bezier(.16,1,.3,1)",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                unoptimized
              />
              {/* Mobile gradient overlay (bottom) */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{ background: `linear-gradient(to top,${CARD_BG} 0%,transparent 55%)` }}
              />
              {/* Desktop gradient overlay (right) */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{ background: `linear-gradient(to right,transparent 65%,${CARD_BG} 100%)` }}
              />
              {/* Reading time badge */}
              <div
                className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-md"
                style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Clock className="h-3 w-3" style={{ color: "#FCB045" }} />
                {post.reading_time} min read
              </div>
            </div>

            {/* Content */}
            <div className="featured-content-pad flex-1 flex flex-col justify-between relative"
              style={{ padding: "1.5rem" }}>
              <style>{`
                @media(min-width:1024px){
                  .featured-content-pad{ padding:3rem !important; }
                }
              `}</style>
              {/* Decorative glow */}
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right,rgba(252,176,69,0.05),transparent 70%)",
                }}
              />

              <div>
                {tags[0] && (
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-0.5 rounded-full grad-pill"
                      style={{
                        width: hovered ? "3.5rem" : "2rem",
                        transition: "width 0.4s ease",
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-xs tracking-widest uppercase font-bold grad-text truncate">
                      {tags[0]}
                    </span>
                  </div>
                )}

                <h2
                  className="featured-title font-black leading-tight mb-4 tracking-tight"
                  style={{
                    fontSize: "clamp(1.15rem, 4vw, 1.9rem)",
                    transition: "color 0.3s ease",
                    color: hovered ? "#FD1D1D" : "#ffffff",
                  }}
                >
                  {post.title}
                </h2>

                <p
                  className="featured-excerpt line-clamp-3"
                  style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: "0.875rem" }}
                >
                  {postDescription(post)}
                </p>

                {tags.length > 1 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.slice(1, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                        style={{
                          background: "rgba(131,58,180,0.15)",
                          color: "#c084fc",
                          border: "1px solid rgba(131,58,180,0.3)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="featured-footer mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 grad-pill">
                    {postAuthor(post)[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{postAuthor(post)}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <button
                  className="featured-read-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
                  style={{ background: G.grad }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(post.slug);
                  }}
                >
                  Read Article
                  <ArrowRight
                    className="h-4 w-4"
                    style={{
                      transform: hovered ? "translateX(3px)" : "translateX(0)",
                      transition: "transform 0.2s ease",
                    }}
                  />
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
function BlogGridCard({
  post,
  onNavigate,
  index,
}: {
  post: GhostPost;
  onNavigate: (slug: string) => void;
  index: number;
}) {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const tags = postTags(post);

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
        onClick={() => onNavigate(post.slug)}
      >
        <div className="gb-inner">
          {/* Image */}
          <div
            className="grid-card-img overflow-hidden relative flex-shrink-0"
            style={{
              height: 180,
              borderRadius: "calc(1.25rem - 1.5px) calc(1.25rem - 1.5px) 0 0",
            }}
          >
            <Image
              src={postImage(post)}
              alt={post.title}
              width={600}
              height={180}
              className="w-full h-full object-cover"
              style={{
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1)",
                transform: hovered ? "scale(1.07)" : "scale(1)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              unoptimized
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{ background: `linear-gradient(to top,${CARD_BG},transparent)` }}
            />
            <div
              className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-white backdrop-blur-md"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Clock className="h-2.5 w-2.5" style={{ color: "#FCB045" }} />
              {post.reading_time}m
            </div>
          </div>

          {/* Content */}
          <div
            className="grid-card-content flex flex-col flex-1"
            style={{ padding: "1rem", background: CARD_BG }}
          >
            <div
              className="h-0.5 rounded-full mb-3 grad-pill"
              style={{
                width: hovered ? "3rem" : "1.25rem",
                transition: "width 0.35s ease",
              }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(131,58,180,0.15)",
                      color: "#c084fc",
                      border: "1px solid rgba(131,58,180,0.3)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3
              className="grid-card-title font-black leading-snug mb-2 line-clamp-2 flex-shrink-0"
              style={{
                fontSize: "0.9rem",
                transition: "color 0.25s ease",
                color: hovered ? "#FD1D1D" : "#ffffff",
              }}
            >
              {post.title}
            </h3>

            <p
              className="grid-card-excerpt text-sm line-clamp-2 leading-relaxed flex-1 mb-4"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}
            >
              {postDescription(post)}
            </p>

            <div
              className="flex items-center justify-between mt-auto pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0 grad-pill">
                  {postAuthor(post)[0].toUpperCase()}
                </div>
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: "rgba(255,255,255,0.45)", maxWidth: 80 }}
                >
                  {postAuthor(post)}
                </span>
              </div>

              <div
                className="flex items-center text-xs font-bold flex-shrink-0 ml-2"
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
                <ArrowRight
                  className="h-3 w-3 flex-shrink-0"
                  style={{
                    color: "#FCB045",
                    transform: hovered ? "translateX(2px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
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
  const navigate = (slug: string) => router.push(`/blog/${slug}`);

  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/ghost/posts");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: GhostPost[] = await res.json();
        setPosts(data);
      } catch {
        setError(
          "Could not load posts from Ghost. Make sure Ghost is running at localhost:4000."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="pt-16 bg-background min-h-screen">
      <GlobalStyles />
      <PageHeader
        title="Blog & Insights"
        subtitle="Stay Ahead of the Curve"
        description="Discover the latest trends, best practices, and expert insights in technology, AI, and digital transformation."
        badge="Latest Updates"
      />

      <section className="py-12 pb-24 md:py-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading && <BlogSkeleton />}

          {error && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <p className="text-white/60 max-w-md text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-white/40 py-24 text-sm">
              No posts found. Publish something in Ghost first!
            </p>
          )}

          {!loading && !error && featuredPost && (
            <>
              <FeaturedBlog post={featuredPost} onNavigate={navigate} />

              <div className="flex items-center gap-4 mb-8">
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to right,transparent,#833AB4,transparent)",
                  }}
                />
                <span className="text-[10px] tracking-[0.35em] uppercase font-bold grad-text whitespace-nowrap">
                  More Articles
                </span>
                <div
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(to left,transparent,#FCB045,transparent)",
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {remainingPosts.map((post, i) => (
                  <BlogGridCard
                    key={post.id}
                    post={post}
                    onNavigate={navigate}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
}