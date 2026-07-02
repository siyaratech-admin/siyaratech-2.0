/**
 * GhostVideo.tsx
 * Location: src/components/ghost/GhostVideo.tsx
 */

import React, { useRef, useState } from "react";

const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";
const SHADOW = "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)";

const widthMap: Record<VideoWidth, string> = {
  regular: "720px",
  wide: "1080px",
  full: "100%",
};

export type VideoWidth = "regular" | "wide" | "full";

export interface GhostVideoProps {
  src: string;
  thumbnail?: string;
  caption?: string;
  width?: VideoWidth;
  loop?: boolean;
  autoplay?: boolean;
}

function PlayIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.6)" />
      <polygon points="22,16 44,28 22,40" fill="white" />
    </svg>
  );
}

// ─── React component ──────────────────────────────────────────────────────────
export function GhostVideo({
  src,
  thumbnail,
  caption,
  width = "regular",
  loop = false,
  autoplay = false,
}: GhostVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showThumb, setShowThumb] = useState(!!thumbnail);
  const isFullBleed = width === "full";
  const borderRadius = isFullBleed ? "0px" : "12px";

  function handlePlay() {
    setShowThumb(false);
    setPlaying(true);
    videoRef.current?.play();
  }

  function handleEnded() {
    setPlaying(false);
    if (thumbnail) setShowThumb(true);
  }

  return (
    <figure
      style={{
        width: "100%",
        maxWidth: isFullBleed ? "none" : widthMap[width],
        margin: isFullBleed ? "2.5rem calc(50% - 50vw)" : "2.5rem auto",
      }}
    >
      {/*
        Thin gradient border via pseudo-element trick using a wrapping div
        with a 1px padding — no thick bars, no background bleed.
        The inner div clips to border-radius so corners stay clean.
      */}
      <div
        style={{
          position: "relative",
          borderRadius,
          padding: "1px",
          background: GRAD_BORDER,
          boxShadow: SHADOW,
        }}
      >
        <div
          style={{
            borderRadius: `calc(${borderRadius} - 1px)`,
            overflow: "hidden",
            position: "relative",
            lineHeight: 0,
            background: "#000",
          }}
        >
          <video
            ref={videoRef}
            src={src}
            preload={thumbnail ? "none" : "metadata"}
            poster={thumbnail}
            loop={loop}
            autoPlay={autoplay}
            playsInline
            controls={playing}
            onEnded={handleEnded}
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "16 / 9",
              objectFit: "cover",
            }}
          />

          {/* thumbnail overlay */}
          {showThumb && thumbnail && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 1,
              }}
            />
          )}

          {/* play button */}
          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Play video"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                const inner = e.currentTarget.querySelector("div") as HTMLElement;
                if (inner) inner.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const inner = e.currentTarget.querySelector("div") as HTMLElement;
                if (inner) inner.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  background: GRAD_BORDER,
                  padding: "2px",
                  borderRadius: "50%",
                  boxShadow: "0 4px 24px rgba(131,58,180,0.55)",
                  transition: "transform 0.15s ease",
                }}
              >
                <PlayIcon />
              </div>
            </button>
          )}
        </div>
      </div>

      {caption && (
        <figcaption
          style={{
            marginTop: "0.75rem",
            textAlign: "center",
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.85rem",
            lineHeight: 1.5,
            padding: "0 1rem",
          }}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
}

// ─── HTML string template (for ghostTransforms.ts) ────────────────────────────
export function ghostVideoHTML(
  src: string,
  thumbnail: string | undefined,
  caption: string | undefined,
  width: VideoWidth = "regular",
  loop = false,
): string {
  const isFullBleed = width === "full";
  const maxWidth = isFullBleed ? "none" : widthMap[width];
  const margin = isFullBleed ? "2.5rem calc(50% - 50vw)" : "2.5rem auto";
  const borderRadius = isFullBleed ? "0px" : "12px";
  const innerRadius = isFullBleed ? "0px" : "calc(12px - 1px)";
  const uid = `gv_${Math.random().toString(36).slice(2, 8)}`;

  const thumbOverlay = thumbnail
    ? `<div id="${uid}_thumb" style="position:absolute;inset:0;background-image:url('${thumbnail}');background-size:cover;background-position:center;z-index:1;pointer-events:none;"></div>`
    : "";

  const captionHTML = caption
    ? `<figcaption style="margin-top:0.75rem;text-align:center;color:rgba(255,255,255,0.45);font-size:0.85rem;line-height:1.5;padding:0 1rem;">${caption}</figcaption>`
    : "";

  const playScript = [
    `var v=document.getElementById('${uid}_video');`,
    `var t=document.getElementById('${uid}_thumb');`,
    `var b=document.getElementById('${uid}_btn');`,
    `v.className='';`,
    `if(t)t.style.display='none';`,
    `b.style.display='none';`,
    `v.controls=true;`,
    `v.play();`,
    `v.onended=function(){v.controls=false;if(t)t.style.display='block';b.style.display='flex';};`,
  ].join("");

  return `<figure style="width:100%;max-width:${maxWidth};margin:${margin};">
  <div style="position:relative;border-radius:${borderRadius};padding:1px;background:${GRAD_BORDER};box-shadow:0 8px 40px rgba(0,0,0,0.45),0 2px 8px rgba(0,0,0,0.3);">
    <div style="border-radius:${innerRadius};overflow:hidden;position:relative;line-height:0;background:#000;">
      <video id="${uid}_video"
        src="${src}"
        preload="${thumbnail ? "none" : "metadata"}"
        ${thumbnail ? `poster="${thumbnail}"` : ""}
        ${loop ? "loop" : ""}
        playsinline
        style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover;"
      ></video>
      ${thumbOverlay}
      <button id="${uid}_btn"
        aria-label="Play video"
        onclick="${playScript}"
        onmouseover="this.querySelector('div').style.transform='scale(1.1)'"
        onmouseout="this.querySelector('div').style.transform='scale(1)'"
        style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:transparent;border:none;cursor:pointer;z-index:2;">
        <div style="transition:transform 0.15s ease;background:${GRAD_BORDER};padding:2px;border-radius:50%;box-shadow:0 4px 24px rgba(131,58,180,0.55);">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.6)"/>
            <polygon points="22,16 44,28 22,40" fill="white"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
  ${captionHTML}
</figure>`;
}