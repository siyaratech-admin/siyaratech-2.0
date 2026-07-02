/**
 * GhostAudio.tsx
 * Location: src/components/ghost/GhostAudio.tsx
 *
 * Handles Ghost's Audio card — rendered in the CMS as:
 *   <div class="kg-card kg-audio-card">
 *     <img class="kg-audio-thumbnail" src="..." />
 *     <div class="kg-audio-player-container">
 *       <audio src="..." />
 *       <div class="kg-audio-title">Track title</div>
 *       ...
 *     </div>
 *   </div>
 *
 * TWO exports:
 *  1. <GhostAudio>       — React component for standalone / future use
 *  2. ghostAudioHTML()   — HTML string template used by ghostTransforms.ts
 *
 * FIX NOTE: the HTML-string version previously toggled play/pause by
 * reassigning button.innerHTML with entity-escaped SVG strings and relied
 * on the deprecated implicit global `event` inside a wrapped IIFE. It now
 * toggles two pre-rendered icon <span>s via style.display (same pattern as
 * GhostYouTube/GhostX) and references `event` directly — same mechanism,
 * far less fragile, and easier to debug if something breaks again.
 */

"use client";

import React, { useRef, useState, useCallback } from "react";

// ─── Shared design tokens (mirrors GhostButton) ───────────────────────────────
const GRAD = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(secs: number): string {
    if (!isFinite(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface GhostAudioProps {
    src: string;
    title?: string;
    thumbnail?: string;
    thumbnailAlt?: string;
}

// ─── 1. React component ───────────────────────────────────────────────────────
export function GhostAudio({
    src,
    title,
    thumbnail,
    thumbnailAlt = "",
}: GhostAudioProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [dragging] = useState(false);

    const onTimeUpdate = useCallback(() => {
        if (!dragging && audioRef.current)
            setCurrentTime(audioRef.current.currentTime);
    }, [dragging]);

    const onLoadedMetadata = useCallback(() => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    }, []);

    const onEnded = useCallback(() => setPlaying(false), []);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            audio.play();
            setPlaying(true);
        }
    }, [playing]);

    const seekTo = useCallback((pct: number) => {
        const audio = audioRef.current;
        if (!audio || !isFinite(audio.duration)) return;
        const t = pct * audio.duration;
        audio.currentTime = t;
        setCurrentTime(t);
    }, []);

    const handleSeekClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            seekTo((e.clientX - rect.left) / rect.width);
        },
        [seekTo]
    );

    const handleVolumeClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const v = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
        },
        []
    );

    const cycleRate = useCallback(() => {
        const rates = [1, 1.25, 1.5, 1.75, 2];
        const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
        setPlaybackRate(next);
        if (audioRef.current) audioRef.current.playbackRate = next;
    }, [playbackRate]);

    const progress = duration > 0 ? currentTime / duration : 0;

    return (
        <div
            style={{
                background: GRAD_BORDER,
                padding: "1.5px",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(131,58,180,0.25), 0 2px 8px rgba(0,0,0,0.5)",
                margin: "2rem 0",
                display: "block",
            }}
        >
            <div
                style={{
                    background: "#1a1a2e",
                    borderRadius: "10.5px",
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                }}
            >
                {/* Thumbnail */}
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: 8,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "rgba(131,58,180,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={thumbnailAlt}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 18V5l12-2v13"
                                stroke="#833AB4"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle cx="6" cy="18" r="3" stroke="#FD1D1D" strokeWidth="2" />
                            <circle cx="18" cy="16" r="3" stroke="#FCB045" strokeWidth="2" />
                        </svg>
                    )}
                </div>

                {/* Player body */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {title && (
                        <div
                            style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                lineHeight: 1.3,
                            }}
                        >
                            {title}
                        </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button
                            onClick={togglePlay}
                            aria-label={playing ? "Pause" : "Play"}
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                display: "flex",
                                alignItems: "center",
                                flexShrink: 0,
                            }}
                        >
                            {playing ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            )}
                        </button>

                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", flexShrink: 0 }}>
                            {formatTime(currentTime)}
                        </span>

                        <div
                            onClick={handleSeekClick}
                            style={{
                                flex: 1,
                                height: 4,
                                borderRadius: 2,
                                background: "rgba(255,255,255,0.15)",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    height: "100%",
                                    width: `${progress * 100}%`,
                                    background: GRAD,
                                    borderRadius: 2,
                                    transition: dragging ? "none" : "width 0.1s linear",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: `${progress * 100}%`,
                                    transform: "translate(-50%, -50%)",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    boxShadow: "0 0 4px rgba(131,58,180,0.8)",
                                }}
                            />
                        </div>

                        <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.75rem", flexShrink: 0 }}>
                            {formatTime(duration)}
                        </span>

                        <button
                            onClick={cycleRate}
                            aria-label="Playback speed"
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "none",
                                borderRadius: 4,
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                padding: "2px 5px",
                                cursor: "pointer",
                                flexShrink: 0,
                                letterSpacing: "0.02em",
                            }}
                        >
                            {playbackRate}×
                        </button>

                        <div
                            onClick={handleVolumeClick}
                            style={{
                                width: 56,
                                height: 4,
                                borderRadius: 2,
                                background: "rgba(255,255,255,0.15)",
                                cursor: "pointer",
                                position: "relative",
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    height: "100%",
                                    width: `${volume * 100}%`,
                                    background: "rgba(255,255,255,0.6)",
                                    borderRadius: 2,
                                }}
                            />
                        </div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={src}
                    preload="metadata"
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={onEnded}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
}

// ─── 2. HTML string template (for ghostTransforms.ts) ─────────────────────────
// Native <audio> element with a custom styled wrapper. Interactivity is
// inline JS (works fine in dangerouslySetInnerHTML). Play/pause toggles
// two pre-rendered icon spans via style.display rather than reassigning
// innerHTML with escaped SVG strings.
export function ghostAudioHTML(
    src: string,
    thumbnail?: string,
    thumbnailAlt?: string,
    title?: string
): string {
    const uid = `gha_${Math.random().toString(36).slice(2, 8)}`;

    const safeAlt = (thumbnailAlt ?? "").replace(/"/g, "&quot;");
    const thumbHtml = thumbnail
        ? `<img src="${thumbnail}" alt="${safeAlt}" style="width:100%;height:100%;object-fit:cover;" />`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5l12-2v13" stroke="#833AB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="6" cy="18" r="3" stroke="#FD1D1D" stroke-width="2"/>
        <circle cx="18" cy="16" r="3" stroke="#FCB045" stroke-width="2"/>
      </svg>`;

    const safeTitle = title
        ?.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const titleHtml = safeTitle
        ? `<div style="color:#fff;font-weight:700;font-size:0.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.3;margin-bottom:8px;">${safeTitle}</div>`
        : "";

    return `
<div style="background:${GRAD_BORDER};padding:1.5px;border-radius:12px;box-shadow:0 8px 32px rgba(131,58,180,0.25),0 2px 8px rgba(0,0,0,0.5);margin:2rem 0;">
  <div style="background:#1a1a2e;border-radius:10.5px;padding:14px 16px;display:flex;align-items:center;gap:14px;">

    <!-- Thumbnail -->
    <div style="width:56px;height:56px;border-radius:8px;overflow:hidden;flex-shrink:0;background:rgba(131,58,180,0.2);display:flex;align-items:center;justify-content:center;">
      ${thumbHtml}
    </div>

    <!-- Player body -->
    <div style="flex:1;min-width:0;">
      ${titleHtml}
      <div style="display:flex;align-items:center;gap:10px;">

        <!-- Play/Pause button -->
        <button id="${uid}_btn" type="button"
          onclick="
            var a=document.getElementById('${uid}_audio');
            var play=document.getElementById('${uid}_play');
            var pause=document.getElementById('${uid}_pause');
            if(a.paused){ a.play(); play.style.display='none'; pause.style.display='flex'; }
            else { a.pause(); play.style.display='flex'; pause.style.display='none'; }
          "
          style="background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;flex-shrink:0;">
          <span id="${uid}_play" style="display:flex;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><polygon points="5,3 19,12 5,21"/></svg>
          </span>
          <span id="${uid}_pause" style="display:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          </span>
        </button>

        <!-- Current time -->
        <span id="${uid}_cur" style="color:rgba(255,255,255,0.55);font-size:0.75rem;flex-shrink:0;min-width:32px;">0:00</span>

        <!-- Seek bar -->
        <div id="${uid}_seek"
          onclick="
            var a=document.getElementById('${uid}_audio');
            var rect=this.getBoundingClientRect();
            if(isFinite(a.duration)) a.currentTime=((event.clientX-rect.left)/rect.width)*a.duration;
          "
          style="flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,0.15);cursor:pointer;position:relative;">
          <div id="${uid}_fill" style="position:absolute;left:0;top:0;height:100%;width:0%;background:${GRAD};border-radius:2px;"></div>
          <div id="${uid}_thumb" style="position:absolute;top:50%;left:0%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 4px rgba(131,58,180,0.8);"></div>
        </div>

        <!-- Duration -->
        <span id="${uid}_dur" style="color:rgba(255,255,255,0.55);font-size:0.75rem;flex-shrink:0;min-width:32px;">0:00</span>

        <!-- Playback rate -->
        <button id="${uid}_rate" type="button" data-rate="1"
          onclick="
            var a=document.getElementById('${uid}_audio');
            var btn=document.getElementById('${uid}_rate');
            var rates=[1,1.25,1.5,1.75,2];
            var cur=parseFloat(btn.dataset.rate||'1');
            var next=rates[(rates.indexOf(cur)+1)%rates.length];
            a.playbackRate=next;
            btn.dataset.rate=String(next);
            btn.textContent=next+'×';
          "
          style="background:rgba(255,255,255,0.08);border:none;border-radius:4px;color:rgba(255,255,255,0.7);font-size:0.7rem;font-weight:700;padding:2px 5px;cursor:pointer;flex-shrink:0;">1×</button>

        <!-- Volume bar -->
        <div id="${uid}_volwrap"
          onclick="
            var a=document.getElementById('${uid}_audio');
            var rect=this.getBoundingClientRect();
            var v=Math.min(1,Math.max(0,(event.clientX-rect.left)/rect.width));
            a.volume=v;
            document.getElementById('${uid}_vol').style.width=(v*100)+'%';
          "
          style="width:56px;height:4px;border-radius:2px;background:rgba(255,255,255,0.15);cursor:pointer;position:relative;flex-shrink:0;">
          <div id="${uid}_vol" style="position:absolute;left:0;top:0;height:100%;width:100%;background:rgba(255,255,255,0.6);border-radius:2px;"></div>
        </div>
      </div>
    </div>

    <!-- Hidden native audio -->
    <audio id="${uid}_audio" src="${src}" preload="metadata"
      ontimeupdate="
        var a=document.getElementById('${uid}_audio');
        var pct=a.duration>0?a.currentTime/a.duration:0;
        var m=Math.floor(a.currentTime/60);
        var s=Math.floor(a.currentTime%60);
        document.getElementById('${uid}_cur').textContent=m+':'+(s<10?'0':'')+s;
        document.getElementById('${uid}_fill').style.width=(pct*100)+'%';
        document.getElementById('${uid}_thumb').style.left=(pct*100)+'%';
      "
      onloadedmetadata="
        var a=document.getElementById('${uid}_audio');
        if(isFinite(a.duration)){
          var m=Math.floor(a.duration/60);
          var s=Math.floor(a.duration%60);
          document.getElementById('${uid}_dur').textContent=m+':'+(s<10?'0':'')+s;
        }
      "
      onended="
        document.getElementById('${uid}_play').style.display='flex';
        document.getElementById('${uid}_pause').style.display='none';
      "
      style="display:none;">
    </audio>
  </div>
</div>`.trim();
}