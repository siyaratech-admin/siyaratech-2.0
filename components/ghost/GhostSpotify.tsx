/**
 * GhostSpotify.tsx
 * Location: src/components/ghost/GhostSpotify.tsx
 *
 * Renders Ghost's Spotify embed card (kg-embed-card containing an
 * <iframe src="https://open.spotify.com/embed/..."> for a track, album,
 * playlist, episode, or artist) as a site-styled card with a gradient
 * border and a loading skeleton — but the embed itself is still
 * Spotify's real, live iframe.
 *
 * WHY NOT a fully static card like GhostYouTube/GhostX: Spotify's
 * iframe is the only place the album art, dominant background color,
 * track title, and artist name actually live — there's no public,
 * key-free endpoint that returns that data for a synchronous string
 * transform. Rebuilding it statically would mean either faking data or
 * adding a server-side Spotify API call elsewhere in the pipeline.
 * Wrapping the real iframe keeps the data always accurate and live
 * while still matching the site's visual language.
 *
 * No React, no hydration step required — ghostTransforms.ts calls
 * ghostSpotifyHTML() and the result is injected directly via
 * dangerouslySetInnerHTML in [slug]/page.tsx, same as the other cards.
 */

const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";

export type SpotifyEmbedType =
    | "track"
    | "album"
    | "playlist"
    | "episode"
    | "show"
    | "artist";

// Spotify's own recommended iframe heights per embed type — track/episode
// rows are short and wide, album/playlist/artist need more vertical room
// for tracklists, artist embeds are tallest.
const HEIGHTS: Record<SpotifyEmbedType, number> = {
    track: 152,
    episode: 152,
    show: 152,
    album: 352,
    playlist: 352,
    artist: 352,
};

/**
 * Produces the full markup for one Spotify embed: gradient border,
 * a shimmering skeleton shown until the real Spotify iframe finishes
 * loading, then the live iframe itself (album art, colors, play button,
 * "Save" button — all rendered natively by Spotify).
 */
export function ghostSpotifyHTML(
    embedUrl: string,
    type: SpotifyEmbedType = "track",
): string {
    const uid = `sp-${Math.random().toString(36).slice(2, 9)}`;
    const height = HEIGHTS[type] ?? HEIGHTS.track;
    const safeUrl = embedUrl.replace(/"/g, "&quot;");

    return `
<div id="${uid}" style="margin:2rem 0;">
  <div style="background:${GRAD_BORDER};padding:1.5px;border-radius:1rem;box-shadow:0 8px 40px rgba(131,58,180,0.2), 0 2px 12px rgba(0,0,0,0.6);">
    <div class="${uid}-frame" style="position:relative;border-radius:calc(1rem - 1.5px);overflow:hidden;background:#0d0d0d;height:${height}px;width:100%;">

      <!-- shimmer skeleton, shown until the iframe fires onload -->
      <div class="${uid}-skeleton" style="position:absolute;inset:0;display:flex;align-items:center;gap:0.9rem;padding:1rem 1.1rem;background:#181818;">
        <div class="${uid}-bone" style="width:${height - 32}px;height:${height - 32}px;border-radius:8px;flex-shrink:0;"></div>
        <div style="flex:1;min-width:0;">
          <div class="${uid}-bone" style="height:14px;width:60%;border-radius:4px;margin-bottom:10px;"></div>
          <div class="${uid}-bone" style="height:11px;width:40%;border-radius:4px;margin-bottom:18px;"></div>
          <div class="${uid}-bone" style="height:28px;width:28px;border-radius:50%;"></div>
        </div>
        <div class="${uid}-bone" style="width:32px;height:32px;border-radius:50%;flex-shrink:0;"></div>
      </div>

      <iframe
        class="${uid}-iframe"
        style="position:absolute;inset:0;width:100%;height:100%;border:none;opacity:0;transition:opacity 0.4s ease;"
        src="${safeUrl}"
        width="100%"
        height="${height}"
        frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify embed"
        onload="
          this.style.opacity='1';
          var sk=this.parentElement.querySelector('.${uid}-skeleton');
          if (sk) sk.style.display='none';
        "
      ></iframe>
    </div>
  </div>

  <style>
    @keyframes ${uid}Shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    #${uid} .${uid}-bone {
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0.05) 0px,
        rgba(255,255,255,0.12) 40px,
        rgba(255,255,255,0.05) 80px
      );
      background-size: 400px 100%;
      animation: ${uid}Shimmer 1.5s ease-in-out infinite;
    }
  </style>
</div>`.trim();
}