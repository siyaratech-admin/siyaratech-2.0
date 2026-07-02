/**
 * GhostGallery.tsx
 * Location: src/components/ghost/GhostGallery.tsx
 *
 * Upgraded: smooth animations, lightbox modal, mobile-first bento grid,
 * touch-friendly interactions, reduced-motion support, and +N overlay.
 *
 * TWO exports:
 *  1. <GhostGallery>      — React component for standalone use
 *  2. ghostGalleryHTML()  — HTML string template used by ghostTransforms.ts
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const GRAD = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
const DARK_BG = "#0a0a0a";
const TILE_BG = "#111111";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GalleryImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface GhostGalleryProps {
  images: GalleryImage[];
  caption?: string;
}

interface LayoutConfig {
  cols: number;
  areas?: string[];
  tileAspect?: string;
  containerAspect?: string;
}

// ─── Layout table ─────────────────────────────────────────────────────────────
const LAYOUTS: Record<number, LayoutConfig> = {
  1: { cols: 1, tileAspect: "16/9" },
  2: { cols: 2, tileAspect: "4/3" },
  3: { cols: 4, areas: ["t1 t1 t2 t2", "t1 t1 t3 t3"], containerAspect: "16/8" },
  4: { cols: 2, tileAspect: "1/1" },
  5: { cols: 4, areas: ["t1 t1 t2 t3", "t1 t1 t4 t5"], containerAspect: "16/9" },
  6: { cols: 3, tileAspect: "1/1" },
  7: { cols: 4, tileAspect: "1/1" },
  8: { cols: 4, tileAspect: "1/1" },
  9: { cols: 3, tileAspect: "1/1" },
};

// ─── Injected styles (keyframes + utility classes) ────────────────────────────
const CSS = `
  @keyframes gg-fade-in {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes gg-modal-bg {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes gg-modal-img {
    from { opacity: 0; transform: scale(0.93); }
    to   { opacity: 1; transform: scale(1);    }
  }
  @keyframes gg-shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }

  .gg-root {
    margin: 2.5rem 0;
    animation: gg-fade-in 0.5s ease both;
  }
  .gg-border {
    background: ${GRAD};
    padding: 1.5px;
    border-radius: 1.25rem;
    box-shadow:
      0 0 0 1px rgba(131,58,180,0.15),
      0 8px 40px rgba(131,58,180,0.22),
      0 2px 12px rgba(0,0,0,0.55);
    transition: box-shadow 0.3s ease;
  }
  .gg-border:hover {
    box-shadow:
      0 0 0 1px rgba(131,58,180,0.3),
      0 16px 56px rgba(131,58,180,0.32),
      0 4px 20px rgba(0,0,0,0.65);
  }
  .gg-inner {
    background: ${DARK_BG};
    border-radius: calc(1.25rem - 1.5px);
    padding: 0;          /* no outer padding — tiles bleed to the border */
    overflow: hidden;    /* clip tile corners against the rounded border */
  }
  .gg-grid {
    display: grid;
    gap: 3px;            /* tighter gap so border "frame" is the breathing room */
  }

  /* Tile */
  .gg-tile {
    position: relative;
    overflow: hidden;
    border-radius: 0;    /* let the wrapper clip; individual radii added below */
    cursor: zoom-in;
    background: ${TILE_BG};
    /* shimmer skeleton while loading */
    background-image: linear-gradient(
      90deg,
      ${TILE_BG} 0px, #1f1f1f 80px, ${TILE_BG} 160px
    );
    background-size: 400px 100%;
    animation: gg-shimmer 1.4s infinite linear;
  }
  /* Round only the outermost corners so they sit flush inside the border */
  .gg-tile:first-child { border-top-left-radius: calc(1.25rem - 1.5px); }
  .gg-tile:last-child  { border-bottom-right-radius: calc(1.25rem - 1.5px); }
  /* For single-row layouts: top-right + bottom-left also need corners */
  .gg-tile:nth-child(1):nth-last-child(1) { border-radius: calc(1.25rem - 1.5px); } /* n=1 */
  .gg-tile.loaded {
    background-image: none;
    animation: none;
  }
  .gg-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition:
      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      filter 0.3s ease;
    will-change: transform;
  }
  .gg-tile:hover img {
    transform: scale(1.07);
    filter: brightness(1.08) saturate(1.1);
  }
  .gg-tile:focus-visible {
    outline: 2px solid #FCB045;
    outline-offset: 2px;
  }

  /* Hover overlay */
  .gg-tile-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0,0,0,0.45) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    padding: 10px 12px;
  }
  .gg-tile:hover .gg-tile-overlay {
    opacity: 1;
  }
  .gg-zoom-icon {
    color: rgba(255,255,255,0.85);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* +N remaining */
  .gg-remaining {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.58);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    gap: 4px;
  }
  .gg-remaining-num {
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 800;
    line-height: 1;
    background: ${GRAD};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gg-remaining-label {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Caption */
  .gg-caption {
    margin-top: 0;
    padding: 0.55rem 0.85rem 0.65rem;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.38);
    text-align: center;
    font-style: italic;
    line-height: 1.5;
  }

  /* ── Lightbox ────────────────────────────────────────────────────────── */
  .gg-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: gg-modal-bg 0.25s ease both;
  }
  .gg-lightbox-bg {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .gg-lightbox-content {
    position: relative;
    z-index: 1;
    max-width: min(90vw, 1100px);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    animation: gg-modal-img 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .gg-lightbox-content img {
    max-width: 100%;
    max-height: 78vh;
    object-fit: contain;
    border-radius: 0.85rem;
    box-shadow: 0 24px 80px rgba(0,0,0,0.7);
  }
  .gg-lightbox-caption {
    color: rgba(255,255,255,0.55);
    font-size: 0.82rem;
    font-style: italic;
    text-align: center;
  }
  .gg-lightbox-close {
    position: fixed;
    top: 18px;
    right: 18px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    z-index: 2;
  }
  .gg-lightbox-close:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.4);
  }
  .gg-lightbox-nav {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    color: #fff;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s;
    z-index: 2;
  }
  .gg-lightbox-nav:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.4);
  }
  .gg-lightbox-nav.prev { left: 12px; }
  .gg-lightbox-nav.next { right: 12px; }
  .gg-lightbox-dots {
    display: flex;
    gap: 6px;
    margin-top: 4px;
  }
  .gg-lightbox-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transition: background 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .gg-lightbox-dot.active {
    background: #FCB045;
    transform: scale(1.35);
  }
  .gg-counter {
    color: rgba(255,255,255,0.4);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  /* ── Mobile: masonry columns — images keep natural proportions ───────── */
  @media (max-width: 640px) {
    /* Switch away from CSS Grid entirely on mobile */
    .gg-grid {
      display: block !important;
      columns: 2 !important;
      column-gap: 3px !important;
      aspect-ratio: unset !important;
    }
    .gg-tile {
      /* Each tile is a block inside the column flow */
      display: block !important;
      break-inside: avoid !important;
      margin-bottom: 3px !important;
      grid-area: unset !important;
      /* Let the image's natural ratio dictate height */
      aspect-ratio: unset !important;
      height: auto !important;
      min-height: 0 !important;
    }
    /* img fills tile width, height = natural ratio */
    .gg-tile img {
      position: static !important;
      width: 100% !important;
      height: auto !important;
      display: block !important;
    }
    .gg-lightbox-nav.prev { left: 4px; }
    .gg-lightbox-nav.next { right: 4px; }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .gg-root, .gg-lightbox, .gg-lightbox-content { animation: none !important; }
    .gg-tile img { transition: none !important; }
  }
`;

// ─── Style injector (once per page) ──────────────────────────────────────────
let stylesInjected = false;
function useGalleryStyles() {
  useEffect(() => {
    if (stylesInjected) return;
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    stylesInjected = true;
  }, []);
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const img = images[index];

  return (
    <div className="gg-lightbox" role="dialog" aria-modal="true" aria-label="Image lightbox">
      <div className="gg-lightbox-bg" onClick={onClose} />

      <button className="gg-lightbox-close" onClick={onClose} aria-label="Close lightbox">✕</button>

      {images.length > 1 && (
        <>
          <button className="gg-lightbox-nav prev" onClick={prev} aria-label="Previous image">‹</button>
          <button className="gg-lightbox-nav next" onClick={next} aria-label="Next image">›</button>
        </>
      )}

      <div className="gg-lightbox-content">
        <img key={index} src={img.src} alt={img.alt || ""} />
        {img.alt && <p className="gg-lightbox-caption">{img.alt}</p>}

        <span className="gg-counter">{index + 1} / {images.length}</span>

        {images.length > 1 && (
          <div className="gg-lightbox-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className={`gg-lightbox-dot${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 1. React component ───────────────────────────────────────────────────────
export function GhostGallery({ images, caption }: GhostGalleryProps) {
  useGalleryStyles();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedTiles, setLoadedTiles] = useState<Set<number>>(new Set());

  const total = images.length;
  const shown = images.slice(0, 9);
  const n = shown.length;
  const remaining = total - n;

  if (n === 0) return null;

  const layout = LAYOUTS[n];

  const gridStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
    ...(layout.areas
      ? {
          gridTemplateAreas: layout.areas.map((r) => `"${r}"`).join(" "),
          gridTemplateRows: `repeat(${layout.areas.length}, 1fr)`,
          aspectRatio: layout.containerAspect,
        }
      : {}),
  };

  return (
    <>
      <div className="gg-root">
        <div className="gg-border">
          <div className="gg-inner">
            <div className="gg-grid" style={gridStyle}>
              {shown.map((img, i) => {
                const isLast = i === n - 1;
                const tileStyle: React.CSSProperties = layout.areas
                  ? { gridArea: `t${i + 1}` }
                  : { aspectRatio: layout.tileAspect };

                return (
                  <div
                    key={i}
                    className={`gg-tile${loadedTiles.has(i) ? " loaded" : ""}`}
                    style={tileStyle}
                    role="button"
                    tabIndex={0}
                    aria-label={img.alt ? `View: ${img.alt}` : `View image ${i + 1}`}
                    onClick={() => setLightboxIndex(i)}
                    onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || ""}
                      loading="lazy"
                      onLoad={() => setLoadedTiles((s) => new Set([...s, i]))}
                    />

                    <div className="gg-tile-overlay">
                      <span className="gg-zoom-icon">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                        View
                      </span>
                    </div>

                    {isLast && remaining > 0 && (
                      <div className="gg-remaining">
                        <span className="gg-remaining-num">+{remaining}</span>
                        <span className="gg-remaining-label">more</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {caption && <p className="gg-caption">{caption}</p>}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ─── 2. HTML string template (for ghostTransforms.ts) ─────────────────────────
export function ghostGalleryHTML(images: GalleryImage[], caption?: string): string {
  const total = images.length;
  const shown = images.slice(0, 9);
  const n = shown.length;
  if (n === 0) return "";

  const remaining = total - n;
  const layout = LAYOUTS[n];

  const containerStyle = [
    `display:grid`,
    `gap:6px`,
    `grid-template-columns:repeat(${layout.cols},1fr)`,
    layout.areas
      ? `grid-template-areas:${layout.areas.map((r) => `"${r}"`).join(" ")};grid-template-rows:repeat(${layout.areas.length},1fr);aspect-ratio:${layout.containerAspect}`
      : "",
  ]
    .filter(Boolean)
    .join(";");

  const tilesHTML = shown
    .map((img, i) => {
      const isLast = i === n - 1;
      const tileAreaStyle = layout.areas
        ? `grid-area:t${i + 1};`
        : `aspect-ratio:${layout.tileAspect};`;

      const overlay =
        isLast && remaining > 0
          ? `<div style="position:absolute;inset:0;background:rgba(0,0,0,0.58);backdrop-filter:blur(3px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">
               <span style="font-size:1.6rem;font-weight:800;background:${GRAD};-webkit-background-clip:text;-webkit-text-fill-color:transparent;">+${remaining}</span>
               <span style="font-size:0.7rem;color:rgba(255,255,255,0.6);letter-spacing:0.1em;text-transform:uppercase;">more</span>
             </div>`
          : "";

      return `<div style="position:relative;overflow:hidden;border-radius:0.65rem;cursor:zoom-in;${tileAreaStyle}background:#111;"
        onclick="(function(el){var lb=document.getElementById('gg-lb-${i}');if(lb)lb.style.display='flex';})(this)"
        onmouseenter="this.querySelector('img').style.transform='scale(1.07)'"
        onmouseleave="this.querySelector('img').style.transform='scale(1)'">
        <img src="${img.src}" alt="${img.alt ?? ""}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);">
        ${overlay}
      </div>`;
    })
    .join("");

  const captionHTML = caption
    ? `<p style="margin-top:0.7rem;font-size:0.8rem;color:rgba(255,255,255,0.38);text-align:center;font-style:italic;">${caption}</p>`
    : "";

  return `
<div style="margin:2.5rem 0;">
  <div style="background:${GRAD};padding:1.5px;border-radius:1.25rem;box-shadow:0 8px 40px rgba(131,58,180,0.22),0 2px 12px rgba(0,0,0,0.55);">
    <div style="background:${DARK_BG};border-radius:calc(1.25rem - 1.5px);padding:8px;">
      <div style="${containerStyle}">${tilesHTML}</div>
      ${captionHTML}
    </div>
  </div>
</div>`.trim();
}