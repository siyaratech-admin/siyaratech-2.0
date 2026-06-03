"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

const GLOW_COLORS = [
  "#FF00FF",
  "#FF26C0",
  "#FF4B80",
  "#FF7040",
  "#FF9500",
];

const navItems = [
  { name: "About",        link: "/about",        color: GLOW_COLORS[0] },
  { name: "Services",     link: "/services",     color: GLOW_COLORS[1] },
  { name: "Products",     link: "/products",     color: GLOW_COLORS[2] },
  { name: "Industries",   link: "/industries",   color: GLOW_COLORS[3] },
  { name: "Courses",      link: "/courses",      color: GLOW_COLORS[4] },
  { name: "Case Studies", link: "/case-studies", color: GLOW_COLORS[0] },
  { name: "Blog",         link: "/blog",         color: GLOW_COLORS[1] },
  { name: "Careers",      link: "/careers",      color: GLOW_COLORS[2] },
];

/* ─── Theme-aware style helper ───────────────────────────────────── */
function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

/* ─── Cursor-tracked Glow Nav Link ──────────────────────────────── */
function GlowNavLink({
  item,
  onClick,
  isDark,
}: {
  item: (typeof navItems)[0];
  onClick?: () => void;
  isDark: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current || !glowRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      glowRef.current.style.left = `${e.clientX - rect.left}px`;
      glowRef.current.style.top = `${e.clientY - rect.top}px`;
    },
    []
  );

  return (
    <Link
      ref={ref}
      href={item.link}
      onClick={onClick}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 overflow-hidden"
      style={{
        color: visible
          ? isDark ? "#ffffff" : "#111111"
          : isDark ? "rgba(255,255,255,0.72)" : "rgba(20,20,20,0.72)",
      }}
    >
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "90px",
          height: "90px",
          background: `radial-gradient(circle, ${item.color}ff 0%, ${item.color}99 25%, ${item.color}33 55%, transparent 72%)`,
          opacity: visible ? (isDark ? 0.55 : 0.38) : 0,
          filter: "blur(6px)",
          transitionProperty: "opacity",
          transitionDuration: "150ms",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-150"
        style={{
          background: isDark ? `${item.color}0f` : `${item.color}18`,
          opacity: visible ? 1 : 0,
        }}
      />
      <span className="relative z-10 tracking-wide">{item.name}</span>
    </Link>
  );
}

/* ─── Mobile Glow Link ───────────────────────────────────────────── */
function MobileGlowLink({
  item,
  onClick,
  isDark,
}: {
  item: (typeof navItems)[0];
  onClick?: () => void;
  isDark: boolean;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Link
      href={item.link}
      onClick={onClick}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setTimeout(() => setPressed(false), 400)}
      className="relative w-full text-left py-3 px-4 rounded-xl font-medium text-sm flex items-center gap-3 overflow-hidden transition-colors duration-200"
      style={{
        color: isDark ? "rgba(255,255,255,0.85)" : "rgba(20,20,20,0.85)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{
          width: pressed ? "180px" : "0px",
          height: pressed ? "180px" : "0px",
          background: `radial-gradient(circle, ${item.color}${isDark ? "55" : "33"} 0%, transparent 70%)`,
          filter: "blur(10px)",
          opacity: pressed ? 1 : 0,
        }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: item.color,
          boxShadow: `0 0 6px 2px ${item.color}88`,
        }}
      />
      <span className="relative z-10">{item.name}</span>
    </Link>
  );
}

/* ─── Fully transparent style — for all outer wrapper elements ───── */
const transparent: React.CSSProperties = {
  background: "transparent",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  boxShadow: "none",
  border: "none",
};

/* ─── Navigation ─────────────────────────────────────────────────── */
export function Navigation({ children }: { children?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useIsDark();

  /*
   * Glass is applied ONLY to the pill elements (NavBody / MobileNavHeader /
   * MobileNavMenu). Every outer wrapper gets `transparent` so that no
   * full-width blur band appears behind the navbar row.
   */
  const pillGlass: React.CSSProperties = isDark
    ? {
        background: "rgba(12, 8, 20, 0.45)",
        backdropFilter: "blur(24px) saturate(180%) brightness(110%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%) brightness(110%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.05)",
      }
    : {
        background: "rgba(255, 255, 255, 0.52)",
        backdropFilter: "blur(24px) saturate(200%) brightness(105%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(105%)",
        border: "1px solid rgba(0,0,0,0.09)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(0,0,0,0.04)",
      };

  const menuGlass: React.CSSProperties = isDark
    ? {
        background: "rgba(10, 6, 18, 0.60)",
        backdropFilter: "blur(32px) saturate(160%) brightness(110%)",
        WebkitBackdropFilter: "blur(32px) saturate(160%) brightness(110%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
      }
    : {
        background: "rgba(255, 255, 255, 0.70)",
        backdropFilter: "blur(32px) saturate(200%) brightness(105%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(105%)",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.10)",
      };

  return (
    <>
      {/*
       * Scoped CSS resets:
       *
       * The resizable-navbar library wraps everything in layout divs that
       * can carry their own background / backdrop-filter. We nuke those on
       * every possible selector the library might use so the glass effect
       * stays 100% contained to the pill shape.
       *
       * We deliberately do NOT reset NavBody / MobileNavHeader /
       * MobileNavMenu here — those get their glass from the inline style
       * prop, which already has higher specificity than class-based styles.
       */}
      <style>{`
        /* ── Outer Navbar shell ── */
        [data-navbar],
        [data-navbar-root],
        [class*="navbar-wrapper"],
        [class*="navbar-root"] {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          border: none !important;
        }

        /* ── MobileNav outer wrapper ── */
        [data-mobile-nav],
        [class*="mobile-nav-wrapper"],
        [class*="mobile-nav-root"] {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          border: none !important;
        }

        /*
         * ── Pill elements: only strip the library's own bg class.
         * The inline style prop we pass provides the actual glass look.
         */
        [data-navbar-body],
        [data-mobile-nav-header],
        [data-mobile-nav-menu] {
          background: transparent !important;
        }
      `}</style>

      <div className="relative w-full">
        {/* Outer Navbar — zero visual presence */}
        <Navbar
          className="!bg-transparent !shadow-none !border-none"
          style={transparent}
        >

          {/* ── Desktop glass pill ── */}
          <NavBody
            className="rounded-2xl relative"
            style={pillGlass}
          >
            <NavbarLogo />

            <div className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <GlowNavLink key={item.link} item={item} isDark={isDark} />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NavbarButton variant="primary" href="/contact">
                Contact Us
              </NavbarButton>
            </div>
          </NavBody>

          {/* ── Mobile — outer wrapper transparent ── */}
          <MobileNav
            className="!bg-transparent !shadow-none !border-none"
            style={transparent}
          >
            {/* Mobile header glass pill */}
            <MobileNavHeader
              className="rounded-2xl mx-2"
              style={pillGlass}
            >
              <NavbarLogo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </MobileNavHeader>

            {/* Mobile dropdown glass pill */}
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              className="rounded-2xl mx-2 mt-2 relative overflow-hidden p-2"
              style={menuGlass}
            >
              {/* Top shimmer line */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
                }}
              />

              <div className="relative z-10 flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <MobileGlowLink
                    key={item.link}
                    item={item}
                    isDark={isDark}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>

              <div
                className="relative z-10 flex w-full flex-col gap-3 mt-4 pt-4"
                style={{
                  borderTop: isDark
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <NavbarButton
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Contact Us
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {children}
      </div>
    </>
  );
}