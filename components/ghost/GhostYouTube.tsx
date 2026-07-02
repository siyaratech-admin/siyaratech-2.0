/**
 * GhostYouTube.tsx
 * Location: src/components/ghost/GhostYouTube.tsx
 *
 * NOTE: This no longer exports a React component. ghostTransforms.ts calls
 * ghostYouTubeHTML() to produce a fully self-contained HTML/CSS/JS string
 * that's injected directly via dangerouslySetInnerHTML in [slug]/page.tsx.
 * There is no portal, no hydration, no client component involved — the
 * thumbnail fallback chain and play-on-click behavior are plain vanilla JS
 * embedded in the markup itself.
 */

const GRAD = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";

// Ordered fallback chain — YouTube doesn't guarantee maxres/sd exist for
// every video, but hq/mq/default ALWAYS exist for any public video.
const THUMBNAIL_TIERS = [
    "maxresdefault",
    "sddefault",
    "hqdefault",
    "mqdefault",
    "default",
] as const;

/**
 * Produces the full static markup for one YouTube embed: gradient border,
 * thumbnail with a vanilla-JS onerror fallback chain, title bar, play
 * button, YouTube badge, and a click handler that swaps the thumbnail for
 * a live iframe. No React, no hydration step required.
 */
export function ghostYouTubeHTML(videoId: string, title: string): string {
    const safeTitle = title.replace(/"/g, "&quot;");
    const uid = `yt-${videoId}-${Math.random().toString(36).slice(2, 8)}`;
    const tiers = THUMBNAIL_TIERS.map(
        (t) => `https://i.ytimg.com/vi/${videoId}/${t}.jpg`,
    );
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return `
<div id="${uid}" style="margin:2rem 0;">
  <div style="background:${GRAD};padding:1.5px;border-radius:1rem;box-shadow:0 8px 40px rgba(131,58,180,0.25), 0 2px 12px rgba(0,0,0,0.6);">
    <div class="${uid}-frame" style="border-radius:calc(1rem - 1.5px);overflow:hidden;background:#0d0d0d;position:relative;aspect-ratio:16/9;width:100%;">

      <!-- placeholder gradient shown until thumbnail loads -->
      <div class="${uid}-placeholder" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%, rgba(131,58,180,0.25), #0d0d0d 75%);"></div>

      <button
        type="button"
        class="${uid}-playbtn"
        aria-label="Play: ${safeTitle || "YouTube video"}"
        style="position:absolute;inset:0;width:100%;height:100%;padding:0;border:none;background:none;cursor:pointer;display:block;"
        onclick="
          var f=document.querySelector('.${uid}-frame');
          var ifr=document.createElement('iframe');
          ifr.src='${embedUrl}';
          ifr.title='${safeTitle.replace(/'/g, "\\'") || "YouTube video"}';
          ifr.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
          ifr.allowFullScreen=true;
          ifr.style.position='absolute';
          ifr.style.inset='0';
          ifr.style.width='100%';
          ifr.style.height='100%';
          ifr.style.border='none';
          f.innerHTML='';
          f.appendChild(ifr);
        "
      >
        <img
          class="${uid}-thumb"
          src="${tiers[0]}"
          data-tiers='${JSON.stringify(tiers)}'
          data-tier-index="0"
          alt="${safeTitle || "YouTube thumbnail"}"
          style="width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity 0.3s ease, transform 0.45s cubic-bezier(.16,1,.3,1);"
          onload="this.style.opacity='1'; var p=this.closest('.${uid}-frame').querySelector('.${uid}-placeholder'); if(p) p.style.display='none';"
          onerror="
            var tiers=JSON.parse(this.dataset.tiers);
            var i=parseInt(this.dataset.tierIndex,10)+1;
            if (i < tiers.length) {
              this.dataset.tierIndex=i;
              this.src=tiers[i];
            } else {
              this.style.display='none';
            }
          "
        />

        <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%);pointer-events:none;"></div>

        ${safeTitle
            ? `
        <div style="position:absolute;top:0;left:0;right:0;display:flex;align-items:center;gap:0.55rem;padding:0.75rem 1rem;background:linear-gradient(to bottom, rgba(0,0,0,0.65), transparent);pointer-events:none;">
          <div style="width:30px;height:30px;border-radius:50%;background:${GRAD};flex-shrink:0;display:flex;align-items:center;justify-content:center;">
            <svg width="10" height="10" viewBox="0 0 10 10"><polygon points="2,1 9,5 2,9" fill="white"/></svg>
          </div>
          <div style="min-width:0;">
            <p style="margin:0;font-size:0.78rem;font-weight:600;color:#fff;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeTitle}</p>
          </div>
        </div>`
            : ""
        }

        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;">
          <div class="${uid}-play" style="transition:transform 0.22s ease, box-shadow 0.22s ease;">
            <svg height="48" viewBox="0 0 68 48" width="68" style="display:block;filter:drop-shadow(0 4px 20px rgba(255,0,0,0.5));">
              <path d="M66.5 7.7c-.8-2.9-3-5.2-5.9-6C55.8.1 34 0 34 0S12.2.1 7.4 1.6C4.6 2.5 2.3 4.8 1.5 7.7 0 12.6 0 24 0 24s0 11.4 1.5 16.3c.8 2.9 3 5.2 5.9 6C12.2 47.9 34 48 34 48s21.8-.1 26.6-1.6c2.9-.8 5.1-3.1 5.9-6C68 35.4 68 24 68 24s0-11.4-1.5-16.3z" fill="#FF0000"/>
              <path d="M45 24 27 14v20" fill="white"/>
            </svg>
          </div>
        </div>

        <div style="position:absolute;bottom:0.7rem;right:0.7rem;display:flex;align-items:center;gap:0.25rem;padding:0.25rem 0.55rem;border-radius:0.4rem;background:rgba(0,0,0,0.55);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.1);pointer-events:none;">
          <svg height="10" viewBox="0 0 90 20" style="display:block;">
            <text x="0" y="15" font-family="sans-serif" font-weight="700" font-size="15" fill="rgba(255,255,255,0.45)">YouTube</text>
          </svg>
        </div>
      </button>
    </div>
  </div>

  <style>
    #${uid} .${uid}-playbtn:hover .${uid}-thumb { transform: scale(1.04); }
    #${uid} .${uid}-playbtn:hover .${uid}-play  { transform: scale(1.1); filter: drop-shadow(0 6px 28px rgba(255,0,0,0.7)); }
  </style>
</div>`.trim();
}