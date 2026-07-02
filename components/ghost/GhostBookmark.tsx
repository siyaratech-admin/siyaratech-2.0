/**
 * GhostBookmark.tsx
 * Location: src/components/ghost/GhostBookmark.tsx
 *
 * TWO exports:
 *  1. <GhostBookmark>      — React component for standalone use
 *  2. ghostBookmarkHTML()  — HTML string template used by ghostTransforms.ts
 *
 * Changes from previous version:
 *  - Full mobile layout: thumbnail moves to top strip on narrow screens
 *  - Entry animation (fadeSlideUp) on mount
 *  - Thumbnail zoom on hover
 *  - Read pill transitions on hover
 *  - Gradient border glow intensifies on hover
 *  - CSS injected once via a <style> tag (avoids inline duplication)
 */

import React, { useEffect } from "react";

// ─── Shared constants ─────────────────────────────────────────────────────────
const GRAD = "linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)";
const STYLE_ID = "ghost-bookmark-styles";

const CSS = `
.ghost-bm-wrapper {
  margin: 2.5rem 0;
  animation: ghost-bm-fadeup 0.45s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes ghost-bm-fadeup {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.ghost-bm-ring {
  padding: 1.5px;
  border-radius: 14px;
  background: linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%);
  box-shadow: 0 4px 24px rgba(131,58,180,.15), 0 1px 6px rgba(0,0,0,.3);
  transition: box-shadow .3s ease;
}
.ghost-bm-ring:hover {
  box-shadow: 0 8px 42px rgba(131,58,180,.38), 0 2px 12px rgba(253,29,29,.15);
}
.ghost-bm-link {
  display: flex;
  align-items: stretch;
  border-radius: 12.5px;
  background: #0f0f0f;
  overflow: hidden;
  text-decoration: none;
  transition: background .25s ease;
  min-height: 100px;
}
.ghost-bm-link:hover { background: #161616; }
.ghost-bm-link:hover .ghost-bm-thumb-side img,
.ghost-bm-link:hover .ghost-bm-thumb-top img {
  transform: scale(1.06);
}
.ghost-bm-link:hover .ghost-bm-pill {
  background: rgba(131,58,180,.35);
  color: #d8b4fe;
  border-color: rgba(131,58,180,.6);
}

/* ── Mobile top thumbnail ── */
.ghost-bm-thumb-top {
  display: none;
  width: 100%;
  height: 140px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.ghost-bm-thumb-top img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .45s cubic-bezier(0.16,1,0.3,1);
}
.ghost-bm-thumb-top-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #0f0f0f);
  z-index: 1;
  pointer-events: none;
}

/* ── Desktop side thumbnail ── */
.ghost-bm-thumb-side {
  width: 160px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.ghost-bm-thumb-side img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform .45s cubic-bezier(0.16,1,0.3,1);
}
.ghost-bm-thumb-side-fade {
  position: absolute;
  inset: 0; z-index: 1;
  background: linear-gradient(to right, #0f0f0f 0%, transparent 32%);
  pointer-events: none;
}

/* ── Content ── */
.ghost-bm-content {
  flex: 1;
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.ghost-bm-title {
  margin: 0;
  font-size: 0.975rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ghost-bm-desc {
  margin: 0;
  font-size: 0.82rem;
  color: rgba(255,255,255,.42);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ghost-bm-spacer { flex: 1; }
.ghost-bm-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}
.ghost-bm-favicon {
  width: 15px; height: 15px;
  border-radius: 3px;
  flex-shrink: 0;
  object-fit: contain;
}
.ghost-bm-favicon-dot {
  width: 15px; height: 15px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045);
}
.ghost-bm-publisher {
  font-size: .75rem;
  font-weight: 600;
  color: rgba(255,255,255,.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}
.ghost-bm-dot {
  color: rgba(255,255,255,.2);
  font-size: .65rem;
}
.ghost-bm-author {
  font-size: .75rem;
  color: rgba(255,255,255,.32);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}
.ghost-bm-pill {
  margin-left: auto;
  flex-shrink: 0;
  font-size: .68rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 9999px;
  background: rgba(131,58,180,.18);
  color: #c084fc;
  border: 1px solid rgba(131,58,180,.35);
  letter-spacing: .04em;
  white-space: nowrap;
  transition: background .2s, color .2s, border-color .2s;
}
.ghost-bm-accent {
  height: 1px;
  margin-top: 10px;
  background: linear-gradient(to right,rgba(131,58,180,.5),rgba(253,29,29,.22),transparent);
  border-radius: 1px;
  animation: ghost-bm-fadein .6s .3s both;
}
@keyframes ghost-bm-fadein {
  from { opacity: 0; } to { opacity: 1; }
}

/* ── Mobile breakpoint ── */
@media (max-width: 540px) {
  .ghost-bm-link { flex-direction: column; }
  .ghost-bm-thumb-side { display: none; }
  .ghost-bm-thumb-top { display: block; }
  .ghost-bm-content { padding: 1rem 1.1rem; }
  .ghost-bm-title { font-size: .9rem; }
  .ghost-bm-desc { font-size: .78rem; }
  .ghost-bm-publisher { max-width: 100px; }
  .ghost-bm-author { max-width: 80px; }
}
`.trim();

// ─── Inject styles once ───────────────────────────────────────────────────────
function useBookmarkStyles() {
    useEffect(() => {
        if (document.getElementById(STYLE_ID)) return;
        const el = document.createElement("style");
        el.id = STYLE_ID;
        el.textContent = CSS;
        document.head.appendChild(el);
    }, []);
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface GhostBookmarkProps {
    href: string;
    title: string;
    description?: string;
    icon?: string;
    author?: string;
    publisher?: string;
    thumbnail?: string;
}

// ─── 1. React component ───────────────────────────────────────────────────────
export function GhostBookmark({
    href,
    title,
    description,
    icon,
    author,
    publisher,
    thumbnail,
}: GhostBookmarkProps) {
    useBookmarkStyles();

    return (
        <div className="ghost-bm-wrapper">
            <div className="ghost-bm-ring">
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ghost-bm-link"
                >
                    {/* ── Mobile top thumbnail ── */}
                    {thumbnail && (
                        <div className="ghost-bm-thumb-top">
                            <img src={thumbnail} alt={title} />
                            <div className="ghost-bm-thumb-top-fade" />
                        </div>
                    )}

                    {/* ── Content ── */}
                    <div className="ghost-bm-content">
                        <p className="ghost-bm-title">{title}</p>

                        {description && (
                            <p className="ghost-bm-desc">{description}</p>
                        )}

                        <div className="ghost-bm-spacer" />

                        <div className="ghost-bm-meta">
                            {/* Favicon or gradient dot */}
                            {icon ? (
                                <img
                                    src={icon}
                                    alt=""
                                    className="ghost-bm-favicon"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            ) : (
                                <div className="ghost-bm-favicon-dot" />
                            )}

                            {publisher && (
                                <span className="ghost-bm-publisher">{publisher}</span>
                            )}

                            {publisher && author && (
                                <span className="ghost-bm-dot">•</span>
                            )}

                            {author && (
                                <span className="ghost-bm-author">{author}</span>
                            )}

                            <span className="ghost-bm-pill">Read →</span>
                        </div>
                    </div>

                    {/* ── Desktop side thumbnail ── */}
                    {thumbnail && (
                        <div className="ghost-bm-thumb-side">
                            <div className="ghost-bm-thumb-side-fade" />
                            <img src={thumbnail} alt={title} />
                        </div>
                    )}
                </a>
            </div>

            {/* Bottom accent line */}
            <div className="ghost-bm-accent" />
        </div>
    );
}

// ─── 2. HTML string template (for ghostTransforms.ts) ─────────────────────────
//
//  Inline styles are kept for the HTML version so it works without any
//  external stylesheet (e.g. when rendered inside a Ghost post preview).
//  Mobile layout is handled via a single <style> block embedded in the output.
// ─────────────────────────────────────────────────────────────────────────────
export function ghostBookmarkHTML(props: GhostBookmarkProps): string {
    const { href, title, description, icon, author, publisher, thumbnail } = props;

    const safeTitle = title.replace(/"/g, "&quot;");

    const faviconHTML = icon
        ? `<img src="${icon}" alt="" style="width:15px;height:15px;border-radius:3px;flex-shrink:0;object-fit:contain;" onerror="this.style.display='none'">`
        : `<div style="width:15px;height:15px;border-radius:50%;background:${GRAD};flex-shrink:0;"></div>`;

    const publisherHTML = publisher
        ? `<span style="font-size:.75rem;font-weight:600;color:rgba(255,255,255,.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px;">${publisher}</span>`
        : "";

    const dotHTML = publisher && author
        ? `<span style="color:rgba(255,255,255,.2);font-size:.65rem;">•</span>`
        : "";

    const authorHTML = author
        ? `<span style="font-size:.75rem;color:rgba(255,255,255,.32);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:110px;">${author}</span>`
        : "";

    const descHTML = description
        ? `<p style="margin:0;font-size:.82rem;color:rgba(255,255,255,.42);line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${description}</p>`
        : "";

    const thumbTopHTML = thumbnail
        ? `<div class="ghost-bm-html-thumb-top" style="display:none;width:100%;height:140px;position:relative;overflow:hidden;flex-shrink:0;">
        <img src="${thumbnail}" alt="${safeTitle}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s cubic-bezier(0.16,1,0.3,1);">
        <div style="position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(to bottom,transparent,#0f0f0f);z-index:1;pointer-events:none;"></div>
       </div>`
        : "";

    const thumbSideHTML = thumbnail
        ? `<div class="ghost-bm-html-thumb-side" style="width:160px;flex-shrink:0;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;z-index:1;background:linear-gradient(to right,#0f0f0f 0%,transparent 32%);pointer-events:none;"></div>
        <img src="${thumbnail}" alt="${safeTitle}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s cubic-bezier(0.16,1,0.3,1);">
       </div>`
        : "";

    return `
<style>
@keyframes ghost-bm-fadeup{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes ghost-bm-fadein{from{opacity:0}to{opacity:1}}
.ghost-bm-html-link:hover{background:#161616!important}
.ghost-bm-html-link:hover .ghost-bm-html-thumb-side img,
.ghost-bm-html-link:hover .ghost-bm-html-thumb-top img{transform:scale(1.06)}
.ghost-bm-html-ring:hover{box-shadow:0 8px 42px rgba(131,58,180,.38),0 2px 12px rgba(253,29,29,.15)!important}
.ghost-bm-html-pill:hover{background:rgba(131,58,180,.35)!important;color:#d8b4fe!important;border-color:rgba(131,58,180,.6)!important}
@media(max-width:540px){
  .ghost-bm-html-link{flex-direction:column!important}
  .ghost-bm-html-thumb-side{display:none!important}
  .ghost-bm-html-thumb-top{display:block!important}
}
</style>
<div style="margin:2.5rem 0;animation:ghost-bm-fadeup .45s cubic-bezier(0.16,1,0.3,1) both;">
  <div class="ghost-bm-html-ring" style="padding:1.5px;border-radius:14px;background:linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%);box-shadow:0 4px 24px rgba(131,58,180,.15),0 1px 6px rgba(0,0,0,.3);transition:box-shadow .3s ease;">
    <a class="ghost-bm-html-link" href="${href}" target="_blank" rel="noopener noreferrer"
      style="display:flex;align-items:stretch;border-radius:12.5px;background:#0f0f0f;overflow:hidden;text-decoration:none;min-height:100px;transition:background .25s ease;">
      ${thumbTopHTML}
      <div style="flex:1;padding:1.2rem 1.4rem;display:flex;flex-direction:column;gap:6px;min-width:0;">
        <p style="margin:0;font-size:.975rem;font-weight:700;color:#fff;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${title}</p>
        ${descHTML}
        <div style="flex:1;"></div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap;">
          ${faviconHTML}
          ${publisherHTML}
          ${dotHTML}
          ${authorHTML}
          <span class="ghost-bm-html-pill" style="margin-left:auto;flex-shrink:0;font-size:.68rem;font-weight:600;padding:3px 9px;border-radius:9999px;background:rgba(131,58,180,.18);color:#c084fc;border:1px solid rgba(131,58,180,.35);letter-spacing:.04em;white-space:nowrap;transition:background .2s,color .2s,border-color .2s;">Read →</span>
        </div>
      </div>
      ${thumbSideHTML}
    </a>
  </div>
  <div style="height:1px;margin-top:10px;background:linear-gradient(to right,rgba(131,58,180,.5),rgba(253,29,29,.22),transparent);border-radius:1px;animation:ghost-bm-fadein .6s .3s both;"></div>
</div>`.trim();
}