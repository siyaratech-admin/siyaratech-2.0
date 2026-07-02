"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft, Calendar, Clock,
  AlertCircle, BookOpen, Share2, ChevronUp,
} from "lucide-react";
import type { GhostPost } from "@/lib/ghost";
import { transformBody } from "@/components/ghost/ghostTransforms";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const GRAD        = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";
const CARD_BG     = "#0d0d0d";

// ─── Ghost skeleton shimmer ────────────────────────────────────────────────────
const SHIMMER_STYLES = `
  @keyframes ghostShimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
  }
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
`;

// ─── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div className="pt-16 min-h-screen" style={{ background: "#080808" }}>
      <style>{SHIMMER_STYLES}</style>

      {/* Hero skeleton */}
      <div
        className="relative w-full ghost-bone"
        style={{ height: 520, maxHeight: 520 }}
      >
        {/* Bottom-aligned content skeletons */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-14"
          style={{
            background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Tag pills */}
            <div className="flex gap-2 mb-5">
              <div className="ghost-bone h-6 w-16 rounded-full" />
              <div className="ghost-bone h-6 w-20 rounded-full" />
            </div>
            {/* Title */}
            <div className="ghost-bone h-10 w-full rounded-lg mb-3" />
            <div className="ghost-bone h-10 w-4/5 rounded-lg mb-6" />
            {/* Meta row */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="ghost-bone h-10 w-10 rounded-full flex-shrink-0" />
                <div>
                  <div className="ghost-bone h-3 w-24 rounded mb-1.5" />
                  <div className="ghost-bone h-2.5 w-14 rounded" />
                </div>
              </div>
              <div className="ghost-bone h-8 w-px rounded" style={{ minWidth: 1 }} />
              <div className="ghost-bone h-3 w-24 rounded" />
              <div className="ghost-bone h-3 w-20 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Article body skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-32">
        {/* Divider row */}
        <div className="flex items-center justify-between mb-12 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <div className="ghost-bone h-1 w-10 rounded-full" />
            <div className="ghost-bone h-3 w-14 rounded" />
          </div>
          <div className="ghost-bone h-8 w-20 rounded-xl" />
        </div>

        {/* Body paragraphs */}
        {[100, 90, 95, 80, 100, 85, 70, 92, 88, 75].map((w, i) => (
          <div key={i} className={`ghost-bone h-4 rounded mb-3`} style={{ width: `${w}%` }} />
        ))}

        {/* Fake image block */}
        <div className="ghost-bone rounded-2xl my-10" style={{ height: 280, width: "100%" }} />

        {/* More paragraphs */}
        {[95, 88, 100, 72, 90, 83].map((w, i) => (
          <div key={i + 10} className="ghost-bone h-4 rounded mb-3" style={{ width: `${w}%` }} />
        ))}

        {/* Footer: author card */}
        <div className="mt-20">
          <div
            className="ghost-bone rounded-2xl mb-10"
            style={{ height: 88, width: "100%" }}
          />
          {/* Nav buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="ghost-bone h-11 w-28 rounded-xl" />
            <div className="ghost-bone h-11 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ error, onBack, onAll }: { error: string; onBack: () => void; onAll: () => void }) {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4" style={{ background: "#080808" }}>
      <div className="text-center max-w-md">
        <div className="h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(253,29,29,0.1)", border: "1px solid rgba(253,29,29,0.3)" }}>
          <AlertCircle className="h-9 w-9" style={{ color: "#FD1D1D" }} />
        </div>
        <h1 className="text-2xl font-black text-white mb-3">
          {error === "not_found" ? "Post not found" : "Something went wrong"}
        </h1>
        <p className="text-white/40 mb-8 leading-relaxed">
          {error === "not_found"
            ? "This post doesn't exist or may have been removed from Ghost."
            : "Could not load the post. Make sure Ghost is running at localhost:4000."}
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={onBack} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/70 transition-all hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "transparent" }}>
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
          <button onClick={onAll} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: GRAD, border: "none" }}>
            All blogs
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el    = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div className="h-full transition-all duration-75" style={{ width: `${progress}%`, background: GRAD }} />
    </div>
  );
}

// ─── Sticky back button ────────────────────────────────────────────────────────
function StickyBackButton({ onClick }: { onClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-6 z-40 transition-all duration-300" style={{ top: scrolled ? "96px" : "89px" }}>
      <div style={{ background: GRAD_BORDER, padding: "1.5px", borderRadius: "9999px",
        boxShadow: scrolled ? "0 8px 32px rgba(131,58,180,0.35), 0 2px 8px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.4)", transition: "box-shadow 0.3s ease" }}>
        <button onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: scrolled ? "#0d0d0d" : "rgba(8,8,8,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "none", whiteSpace: "nowrap" }}>
          <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c084fc" }} />
          <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Back to Blogs
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Back to top ───────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      style={{ background: GRAD, border: "none", boxShadow: "0 8px 24px rgba(131,58,180,0.4)" }}
      aria-label="Back to top">
      <ChevronUp className="h-5 w-5 text-white" />
    </button>
  );
}

// ─── Gradient border wrapper ───────────────────────────────────────────────────
function GradBorderBox({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ background: GRAD_BORDER, padding: "1.5px", borderRadius: "1rem", ...style }}>
      <div style={{ background: CARD_BG, borderRadius: "calc(1rem - 1.5px)", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Animated hero background (no feature image) ──────────────────────────────
function AnimatedHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes auroraDriftA { 0%{transform:translate(-10%,-10%) scale(1)} 50%{transform:translate(8%,12%) scale(1.15)} 100%{transform:translate(-10%,-10%) scale(1)} }
        @keyframes auroraDriftB { 0%{transform:translate(10%,5%) scale(1.1)} 50%{transform:translate(-12%,-8%) scale(0.95)} 100%{transform:translate(10%,5%) scale(1.1)} }
        @keyframes auroraDriftC { 0%{transform:translate(0%,10%) scale(0.9)} 50%{transform:translate(-6%,-14%) scale(1.1)} 100%{transform:translate(0%,10%) scale(0.9)} }
        @keyframes risePart { 0%{transform:translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(-620px);opacity:0} }
        @keyframes sweepLine { 0%{transform:translateX(-120%);opacity:0} 15%{opacity:0.5} 85%{opacity:0} 100%{transform:translateX(120%);opacity:0} }
        @keyframes gridPulse { 0%,100%{opacity:0.05} 50%{opacity:0.11} }
        @media(prefers-reduced-motion:reduce){.aurora-blob,.rise-particle,.sweep-line{animation:none!important}}
      `}</style>
      <div className="absolute inset-0" style={{ background: "#080808" }} />
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)", backgroundSize: "44px 44px", opacity: 0.07, animation: "gridPulse 7s ease-in-out infinite", maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black 20%,transparent 75%)" }} />
      <div className="aurora-blob absolute -top-1/4 left-[10%] w-[55vw] h-[55vw] rounded-full" style={{ background: "radial-gradient(circle,rgba(131,58,180,0.45) 0%,transparent 70%)", filter: "blur(70px)", animation: "auroraDriftA 22s ease-in-out infinite" }} />
      <div className="aurora-blob absolute top-[5%] right-[8%] w-[48vw] h-[48vw] rounded-full" style={{ background: "radial-gradient(circle,rgba(253,29,29,0.35) 0%,transparent 70%)", filter: "blur(70px)", animation: "auroraDriftB 26s ease-in-out infinite" }} />
      <div className="aurora-blob absolute bottom-[-10%] left-[28%] w-[42vw] h-[42vw] rounded-full" style={{ background: "radial-gradient(circle,rgba(252,176,69,0.3) 0%,transparent 70%)", filter: "blur(70px)", animation: "auroraDriftC 19s ease-in-out infinite" }} />
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="rise-particle absolute rounded-full" style={{ left: `${(i * 5.7) % 100}%`, bottom: "-20px", width: 2 + (i % 3), height: 2 + (i % 3), background: i % 3 === 0 ? "#c084fc" : i % 3 === 1 ? "#FD1D1D" : "#FCB045", boxShadow: "0 0 8px currentColor", opacity: 0, animation: `risePart ${13 + (i % 6) * 2}s linear ${(i * 1.3) % 14}s infinite` }} />
      ))}
      <div className="sweep-line absolute top-0 bottom-0 w-1/3" style={{ left: 0, background: "linear-gradient(100deg,transparent 0%,rgba(255,255,255,0.06) 45%,rgba(255,255,255,0.10) 50%,rgba(255,255,255,0.06) 55%,transparent 100%)", animation: "sweepLine 10s ease-in-out infinite" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(8,8,8,0.15) 0%,rgba(8,8,8,0.55) 55%,rgba(8,8,8,0.98) 100%)" }} />
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const params  = useParams();
  const router  = useRouter();

  const [post,    setPost]    = useState<GhostPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [copied,  setCopied]  = useState(false);

  // No longer used for YouTube hydration — kept only if other code/CSS
  // selectors target this ref. Remove entirely if nothing else depends on it.
  const articleRef = useRef<HTMLDivElement>(null);

  // ── Fetch post ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);
    setError(null);
    setPost(null);

    async function load() {
      try {
        const res = await fetch(`/api/ghost/posts/${params.slug}`);
        if (res.status === 404) { setError("not_found"); return; }
        if (!res.ok) throw new Error("fetch failed");
        const data: GhostPost = await res.json();
        setPost(data);
      } catch {
        setError("error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Guard states ────────────────────────────────────────────────────────────
  if (loading) return <LoadingState />;
  if (error || !post) return (
    <ErrorState
      error={error || "error"}
      onBack={() => router.back()}
      onAll={() => router.push("/blog")}
    />
  );

  const author      = post.authors?.[0]?.name || "Author";
  const tags        = post.tags?.map((t) => t.name) || [];
  const publishDate = new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const hasImage    = Boolean(post.feature_image);

  // transformBody now fully resolves YouTube embeds into static HTML/CSS/JS
  // (via ghostYouTubeHTML) — no portal, no client mount step required.
  const bodyHtml = transformBody(post.html || "");

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>
      <style>{SHIMMER_STYLES}</style>

      {/* ── Fixed UI ── */}
      <ScrollProgress />
      <BackToTop />
      <StickyBackButton onClick={() => router.push("/blog")} />

      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "100vh", maxHeight: hasImage ? 680 : 600 }}>
        {hasImage ? (
          <>
            <Image src={post.feature_image as string} alt={post.title} fill className="object-cover" unoptimized priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(8,8,8,0.25) 0%,rgba(8,8,8,0.5) 40%,rgba(8,8,8,0.97) 100%)" }} />
            <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(131,58,180,0.18) 0%,transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(253,29,29,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
          </>
        ) : (
          <AnimatedHeroBackground />
        )}

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-14">
          <div className="max-w-4xl mx-auto">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(131,58,180,0.25)", color: "#c084fc", border: "1px solid rgba(131,58,180,0.45)", backdropFilter: "blur(4px)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className={hasImage
              ? "text-3xl sm:text-4xl md:text-5xl font-black leading-[1.12] text-white mb-6 tracking-tight"
              : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] text-white mb-6 tracking-tight"
            }>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0" style={{ background: GRAD }}>
                  {author[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{author}</p>
                  <p className="text-xs text-white/40">Author</p>
                </div>
              </div>
              <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="flex items-center gap-1.5 text-sm text-white/50"><Calendar className="h-3.5 w-3.5" />{publishDate}</div>
              <div className="flex items-center gap-1.5 text-sm text-white/50"><Clock className="h-3.5 w-3.5" />{post.reading_time} min read</div>
              <div className="flex items-center gap-1.5 text-sm text-white/50"><BookOpen className="h-3.5 w-3.5" />{Math.ceil((post.html?.split(" ").length || 0) / 200)} pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pb-32 pt-12">

        {/* Divider + share */}
        <div className="flex items-center justify-between mb-12 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-center gap-2">
            <div className="h-1 w-10 rounded-full" style={{ background: GRAD }} />
            <span className="text-xs tracking-widest uppercase font-bold text-white/30">Article</span>
          </div>
          <button onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={copied
              ? { background: "rgba(131,58,180,0.2)", color: "#c084fc", border: "1px solid rgba(131,58,180,0.4)" }
              : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }
            }>
            <Share2 className="h-3.5 w-3.5" />
            {copied ? "Link copied!" : "Share"}
          </button>
        </div>

        {/* Ghost HTML — everything, including YouTube embeds, is now fully
            resolved static markup produced by transformBody(). No portal,
            no hydration effect, no client-side mount step needed. */}
        <div
          ref={articleRef}
          className="
            prose prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-white prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5
            prose-h3:text-white prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-white/60 prose-p:leading-[1.9] prose-p:text-[1.05rem]
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-a:no-underline hover:prose-a:underline
            prose-code:text-purple-300 prose-code:bg-white/5 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
            prose-pre:bg-white/[0.04] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-blockquote:not-italic prose-blockquote:border-l-0 prose-blockquote:pl-0
            prose-ul:text-white/60 prose-ol:text-white/60
            prose-li:marker:text-purple-500
            prose-hr:border-white/10
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10
          "
          style={{ "--tw-prose-invert-body": "rgba(255,255,255,0.6)" } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* ── Footer ── */}
        <div className="mt-20">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-xs text-white/30 font-medium self-center mr-2">Tagged in</span>
              {tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                  style={{ background: "rgba(131,58,180,0.12)", color: "#c084fc", border: "1px solid rgba(131,58,180,0.3)" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <GradBorderBox className="mb-10">
            <div className="p-6 flex items-center gap-5">
              <div className="h-14 w-14 rounded-full flex items-center justify-center text-lg font-black text-white flex-shrink-0" style={{ background: GRAD }}>
                {author[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest font-medium mb-1">Written by</p>
                <p className="text-white font-black text-lg">{author}</p>
                <p className="text-white/40 text-sm mt-0.5">Published {publishDate} · {post.reading_time} min read</p>
              </div>
            </div>
          </GradBorderBox>

          <div className="flex items-center justify-between gap-4">
            <button onClick={() => router.back()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white/60 transition-all hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={() => router.push("/blog")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: GRAD, border: "none" }}>
              All Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}