/**
 * GhostDocument.tsx
 * Location: src/components/ghost/GhostDocument.tsx
 *
 * Handles Ghost's File card — rendered in the CMS as:
 *   <div class="kg-card kg-file-card">
 *     <a class="kg-file-card-container" href="..." download>
 *       <div class="kg-file-card-contents">
 *         <div class="kg-file-card-title">Document title</div>
 *         <div class="kg-file-card-caption">Description text</div>
 *         <div class="kg-file-card-metadata">
 *           <div class="kg-file-card-filename">filename.pdf</div>
 *           <div class="kg-file-card-filesize">10 MB</div>
 *         </div>
 *       </div>
 *       <div class="kg-file-card-icon">…svg…</div>
 *     </a>
 *   </div>
 *
 * TWO exports:
 *  1. <GhostDocument>      — React component for standalone / future use
 *  2. ghostDocumentHTML()  — HTML string template used by ghostTransforms.ts
 *
 * Mobile behaviour:
 *  - Title/caption wrap onto multiple lines (no nowrap below 480 px)
 *  - Filename truncates with ellipsis, maxWidth loosens on small screens
 *  - Download icon shrinks to 40 × 40 px with a 44 px tap target on mobile
 *  - Padding reduces from 18 / 20 px → 14 / 14 px on small screens
 */

"use client";

import React, { useState } from "react";

// ─── Shared design tokens (mirrors GhostButton) ───────────────────────────────
const GRAD = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GhostDocumentProps {
    href: string;
    title: string;
    caption?: string;
    filename?: string;
    filesize?: string;
}

// ─── Download arrow icon (SVG) ────────────────────────────────────────────────
// uid avoids gradient-id clashes when multiple cards appear on one page.
function DownloadIcon({ uid }: { uid: string }) {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#FD1D1D" />
                    <stop offset="100%" stopColor="#FCB045" />
                </linearGradient>
            </defs>
            <path
                d="M12 3v13M7 11l5 5 5-5"
                stroke={`url(#${uid})`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 20h16"
                stroke={`url(#${uid})`}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

// ─── 1. React component ───────────────────────────────────────────────────────
export function GhostDocument({
    href,
    title,
    caption,
    filename,
    filesize,
}: GhostDocumentProps) {
    const [hovered, setHovered] = useState(false);
    // Stable uid per component instance (fine because it's client-only)
    const [uid] = useState(
        () => `dlg_${Math.random().toString(36).slice(2, 8)}`
    );

    return (
        <>
            {/* Scoped responsive styles injected once per card */}
            <style>{`
        .ghost-doc-${uid} {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #1a1a2e;
          border-radius: 10.5px;
          padding: 18px 20px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .ghost-doc-${uid}:hover {
          background: rgba(26,26,46,0.82);
        }
        .ghost-doc-title-${uid} {
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: ${caption ? "4px" : "8px"};
        }
        .ghost-doc-caption-${uid} {
          color: rgba(255,255,255,0.45);
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ghost-doc-filename-${uid} {
          color: rgba(255,255,255,0.55);
          font-size: 0.78rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 260px;
        }
        .ghost-doc-icon-${uid} {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 10px;
          background: rgba(131,58,180,0.12);
          border: 1px solid rgba(131,58,180,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* ── mobile ≤ 480 px ── */
        @media (max-width: 480px) {
          .ghost-doc-${uid} {
            padding: 14px 14px;
            gap: 12px;
          }
          .ghost-doc-title-${uid} {
            white-space: normal;
            word-break: break-word;
            font-size: 0.9rem;
          }
          .ghost-doc-caption-${uid} {
            white-space: normal;
            word-break: break-word;
            font-size: 0.78rem;
          }
          .ghost-doc-filename-${uid} {
            max-width: 160px;
            font-size: 0.72rem;
          }
          .ghost-doc-icon-${uid} {
            width: 40px;
            height: 40px;
            min-width: 40px;
            /* larger tap target without changing layout */
            padding: 2px;
          }
        }
      `}</style>

            <div
                style={{
                    background: GRAD_BORDER,
                    padding: "1.5px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(131,58,180,0.2), 0 2px 8px rgba(0,0,0,0.45)",
                    margin: "2rem 0",
                }}
            >
                <a
                    href={href}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ghost-doc-${uid}`}
                >
                    {/* Left: text content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className={`ghost-doc-title-${uid}`}>{title}</div>

                        {caption && (
                            <div className={`ghost-doc-caption-${uid}`}>{caption}</div>
                        )}

                        {/* Filename · size */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                            {filename && (
                                <span className={`ghost-doc-filename-${uid}`}>{filename}</span>
                            )}
                            {filename && filesize && (
                                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>•</span>
                            )}
                            {filesize && (
                                <span
                                    style={{
                                        background: GRAD,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                        flexShrink: 0,
                                    }}
                                >
                                    {filesize}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: download icon */}
                    <div className={`ghost-doc-icon-${uid}`}>
                        <DownloadIcon uid={`${uid}_svg`} />
                    </div>
                </a>
            </div>
        </>
    );
}

// ─── 2. HTML string template (for ghostTransforms.ts) ─────────────────────────
// Uses an injected <style> block for responsive behaviour — works inside
// dangerouslySetInnerHTML because the browser processes <style> tags in
// innerHTML just fine.
export function ghostDocumentHTML({
    href,
    title,
    caption,
    filename,
    filesize,
}: GhostDocumentProps): string {
    const uid = `gdoc_${Math.random().toString(36).slice(2, 8)}`;

    const captionHtml = caption
        ? `<div class="gdoc-caption-${uid}">${caption}</div>`
        : "";

    const metaParts: string[] = [];
    if (filename) {
        metaParts.push(`<span class="gdoc-filename-${uid}">${filename}</span>`);
    }
    if (filename && filesize) {
        metaParts.push(`<span style="color:rgba(255,255,255,0.25);font-size:0.78rem;">•</span>`);
    }
    if (filesize) {
        metaParts.push(
            `<span style="background:${GRAD};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:0.78rem;font-weight:600;flex-shrink:0;">${filesize}</span>`
        );
    }
    const metaHtml =
        metaParts.length > 0
            ? `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${metaParts.join("")}</div>`
            : "";

    const iconSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${uid}_svg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#833AB4"/>
        <stop offset="50%" stop-color="#FD1D1D"/>
        <stop offset="100%" stop-color="#FCB045"/>
      </linearGradient>
    </defs>
    <path d="M12 3v13M7 11l5 5 5-5" stroke="url(#${uid}_svg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 20h16" stroke="url(#${uid}_svg)" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

    return `
<style>
  .gdoc-wrap-${uid}{background:${GRAD_BORDER};padding:1.5px;border-radius:12px;box-shadow:0 8px 32px rgba(131,58,180,0.2),0 2px 8px rgba(0,0,0,0.45);margin:2rem 0;}
  .gdoc-inner-${uid}{display:flex;align-items:center;justify-content:space-between;gap:16px;background:#1a1a2e;border-radius:10.5px;padding:18px 20px;text-decoration:none;transition:background 0.2s;}
  .gdoc-inner-${uid}:hover{background:rgba(26,26,46,0.82);}
  .gdoc-title-${uid}{color:#fff;font-weight:700;font-size:0.95rem;line-height:1.4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:${caption ? "4px" : "8px"};}
  .gdoc-caption-${uid}{color:rgba(255,255,255,0.45);font-size:0.8rem;line-height:1.4;margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .gdoc-filename-${uid}{color:rgba(255,255,255,0.55);font-size:0.78rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:260px;}
  .gdoc-icon-${uid}{flex-shrink:0;width:48px;height:48px;min-width:48px;border-radius:10px;background:rgba(131,58,180,0.12);border:1px solid rgba(131,58,180,0.25);display:flex;align-items:center;justify-content:center;}
  @media(max-width:480px){
    .gdoc-inner-${uid}{padding:14px 14px;gap:12px;}
    .gdoc-title-${uid}{white-space:normal;word-break:break-word;font-size:0.9rem;}
    .gdoc-caption-${uid}{white-space:normal;word-break:break-word;font-size:0.78rem;}
    .gdoc-filename-${uid}{max-width:140px;font-size:0.72rem;}
    .gdoc-icon-${uid}{width:40px;height:40px;min-width:40px;}
  }
</style>
<div class="gdoc-wrap-${uid}">
  <a href="${href}" download target="_blank" rel="noopener noreferrer" class="gdoc-inner-${uid}">
    <div style="flex:1;min-width:0;">
      <div class="gdoc-title-${uid}">${title}</div>
      ${captionHtml}
      ${metaHtml}
    </div>
    <div class="gdoc-icon-${uid}">${iconSvg}</div>
  </a>
</div>`;
}