/**
 * ghostTransforms.ts
 * Location: src/components/ghost/ghostTransforms.ts
 */

import { ghostButtonHTML } from "./GhostButton";
import { ghostBookmarkHTML } from "./GhostBookmark";
import { ghostGalleryHTML, type GalleryImage } from "./GhostGallery";
import { ghostCallToActionHTML } from "./GhostCallToAction";
import { ghostVideoHTML, type VideoWidth } from "./GhostVideo";
import { ghostYouTubeHTML } from "./GhostYouTube";
import { ghostXHTML } from "./GhostX";
import { ghostSpotifyHTML, type SpotifyEmbedType } from "./GhostSpotify";

function getAttr(tag: string, attr: string): string | undefined {
  return tag.match(new RegExp(`${attr}="([^"]*)"`, "i"))?.[1];
}

function extractDivBlocks(html: string, classFragment: string): string[] {
  const results: string[] = [];
  const openRe = new RegExp(`<div[^>]*${classFragment}[^>]*>`, "gi");
  let match: RegExpExecArray | null;
  while ((match = openRe.exec(html)) !== null) {
    let depth = 1;
    let i = match.index + match[0].length;
    while (i < html.length && depth > 0) {
      if (html.slice(i, i + 4) === "<div") {
        depth++;
        i += 4;
      } else if (html.slice(i, i + 6) === "</div") {
        depth--;
        if (depth === 0) break;
        i += 6;
      } else {
        i++;
      }
    }
    const closeEnd = html.indexOf(">", i) + 1;
    results.push(html.slice(match.index, closeEnd));
    openRe.lastIndex = closeEnd;
  }
  return results;
}

function transformGallery(html: string): string {
  return html.replace(
    /<figure[^>]*kg-gallery-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, inner: string) => {
      const imgTags = inner.match(/<img[^>]*>/gi) || [];
      const images: GalleryImage[] = imgTags
        .map((tag) => {
          const src = getAttr(tag, "src");
          if (!src) return null;
          const widthStr = getAttr(tag, "width");
          const heightStr = getAttr(tag, "height");
          return {
            src,
            alt: getAttr(tag, "alt") || "",
            width: widthStr ? parseInt(widthStr, 10) : undefined,
            height: heightStr ? parseInt(heightStr, 10) : undefined,
          };
        })
        .filter((img): img is GalleryImage => img !== null);
      if (images.length === 0) return match;
      const caption = inner
        .match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]
        ?.trim();
      return ghostGalleryHTML(images, caption);
    },
  );
}

function transformBookmarks(html: string): string {
  return html.replace(
    /<figure[^>]*kg-bookmark-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (_match, inner: string) => {
      const anchorTag =
        inner.match(/<a[^>]*kg-bookmark-container[^>]*>/i)?.[0] ?? "";
      const href = getAttr(anchorTag, "href") || "#";

      if (/youtube\.com|youtu\.be/i.test(href)) {
        console.warn(
          "[ghostTransforms] YouTube URL detected inside a BOOKMARK card, not an embed card:",
          href,
          "\n→ This means Ghost did not resolve the oEmbed when the link was pasted.",
          "\n→ Re-paste the URL on its own empty line in the editor and wait for the preview to load before saving.",
        );
      }

      const title =
        inner
          .match(/<div[^>]*kg-bookmark-title[^>]*>([\s\S]*?)<\/div>/i)?.[1]
          ?.trim() ?? "Untitled";
      const description = inner
        .match(/<div[^>]*kg-bookmark-description[^>]*>([\s\S]*?)<\/div>/i)?.[1]
        ?.trim();
      const iconTag = inner.match(/<img[^>]*kg-bookmark-icon[^>]*>/i)?.[0];
      const icon = iconTag ? getAttr(iconTag, "src") : undefined;
      const author = inner
        .match(/<span[^>]*kg-bookmark-author[^>]*>([\s\S]*?)<\/span>/i)?.[1]
        ?.trim();
      const publisher = inner
        .match(/<span[^>]*kg-bookmark-publisher[^>]*>([\s\S]*?)<\/span>/i)?.[1]
        ?.trim();
      const thumbDivInner = inner.match(
        /<div[^>]*kg-bookmark-thumbnail[^>]*>([\s\S]*?)<\/div>/i,
      )?.[1];
      const thumbImgTag = thumbDivInner?.match(/<img[^>]*>/i)?.[0];
      const thumbnail = thumbImgTag ? getAttr(thumbImgTag, "src") : undefined;
      return ghostBookmarkHTML({
        href,
        title,
        description,
        icon,
        author,
        publisher,
        thumbnail,
      });
    },
  );
}

function transformButtons(html: string): string {
  return html.replace(
    /<div[^>]*class="[^"]*kg-button-card[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (_match, inner) => {
      const href = inner.match(/href="([^"]*)"/i)?.[1] ?? "#";
      const label =
        inner.match(/<a[^>]*>([\s\S]*?)<\/a>/i)?.[1]?.trim() ?? "Read more";
      const align = (inner.match(/kg-align-(left|center|right)/i)?.[1] ??
        "center") as "left" | "center" | "right";
      return ghostButtonHTML(label, href, align);
    },
  );
}

function transformBlockquotes(html: string): string {
  return html.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/gi,
    `<div style="margin:2.5rem 0;padding:1.5rem 1.75rem;border-radius:1rem;background:rgba(131,58,180,0.08);position:relative;overflow:hidden;">
      <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#833AB4,#FD1D1D,#FCB045);border-radius:4px 0 0 4px;"></div>
      <div style="color:rgba(255,255,255,0.7);font-style:italic;line-height:1.8;font-size:1.05rem;padding-left:0.25rem;">$1</div>
    </div>`,
  );
}

function transformCallToAction(html: string): string {
  const blocks = extractDivBlocks(html, "kg-header-card");
  if (blocks.length === 0) return html;
  let out = html;
  for (const block of blocks) {
    const inner = block.replace(/^<div[^>]*>/, "").replace(/<\/div>$/, "");
    const labelEl = inner.match(
      /<p[^>]*kg-header-card-label[^>]*>([\s\S]*?)<\/p>/i,
    );
    const showSponsorLabel = Boolean(labelEl);
    const imgTag = inner.match(/<img[^>]*kg-header-card-image[^>]*>/i)?.[0];
    const imageUrl = imgTag ? getAttr(imgTag, "src") : undefined;
    const imageAlt = imgTag ? (getAttr(imgTag, "alt") ?? "") : "";
    const description =
      inner
        .match(
          /<(?:h[1-6]|p)[^>]*kg-header-card-(?:heading|subheading)[^>]*>([\s\S]*?)<\/(?:h[1-6]|p)>/i,
        )?.[1]
        ?.trim() ?? undefined;
    const buttonAnchor = inner.match(
      /<a[^>]*kg-header-card-button[^>]*>([\s\S]*?)<\/a>/i,
    );
    const buttonUrl = buttonAnchor
      ? (getAttr(buttonAnchor[0], "href") ?? undefined)
      : undefined;
    const buttonText = buttonAnchor?.[1]?.trim() ?? undefined;
    const replacement = ghostCallToActionHTML({
      showSponsorLabel,
      imageUrl,
      imageAlt,
      description,
      buttonText,
      buttonUrl,
    });
    out = out.replace(block, replacement);
  }
  return out;
}

function transformVideos(html: string): string {
  return html.replace(
    /<figure[^>]*kg-video-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, inner: string) => {
      let cleaned = inner.replace(
        /<div[^>]*kg-video-overlay[^>]*>[\s\S]*?<\/div>/gi,
        "",
      );
      cleaned = cleaned.replace(
        /<div[^>]*kg-video-player-container[^>]*>[\s\S]*?<\/div>/gi,
        "",
      );
      const widthClass = match.match(/kg-width-(regular|wide|full)/i)?.[1];
      const width: VideoWidth =
        widthClass === "wide"
          ? "wide"
          : widthClass === "full"
            ? "full"
            : "regular";
      const videoTag = cleaned.match(/<video[^>]*>/i)?.[0] ?? "";
      const src = getAttr(videoTag, "src");
      if (!src) return match;
      const posterFromTag = getAttr(videoTag, "poster");
      const thumbImgTag = cleaned.match(
        /<div[^>]*kg-video-thumbnail[^>]*>[\s\S]*?(<img[^>]*>)[\s\S]*?<\/div>/i,
      )?.[1];
      const posterFromDiv = thumbImgTag
        ? getAttr(thumbImgTag, "src")
        : undefined;
      const thumbnail = posterFromTag || posterFromDiv || undefined;
      const loop = /\bloop\b/i.test(videoTag);
      const caption = cleaned
        .match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]
        ?.trim();
      return ghostVideoHTML(src, thumbnail, caption, width, loop);
    },
  );
}

// ─── Spotify embed card (kg-embed-card, iframe src open.spotify.com/embed) ───
function transformSpotifyEmbeds(html: string): string {
  let matchCount = 0;

  const result = html.replace(
    /<figure[^>]*kg-embed-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, inner: string) => {
      const iframeTag = inner.match(/<iframe[^>]*>/i)?.[0] ?? "";
      const src = getAttr(iframeTag, "src") ?? "";

      // Not a Spotify embed — leave untouched for transformSpotifyEmbeds'
      // siblings (Twitter / YouTube) or raw markup to handle.
      if (!/open\.spotify\.com\/embed/i.test(src)) return match;

      matchCount++;

      const typeMatch = src.match(
        /\/embed\/(?:intl-[a-z]{2}\/)?(track|album|playlist|episode|show|artist)\//i,
      );
      const type = (typeMatch?.[1]?.toLowerCase() ??
        "track") as SpotifyEmbedType;

      console.log(
        "[ghostTransforms] ✅ Spotify embed #" + matchCount,
        "| type:",
        type,
        "| src:",
        src,
      );

      return ghostSpotifyHTML(src, type);
    },
  );

  console.log(
    "[ghostTransforms:transformSpotifyEmbeds] total Spotify matches processed:",
    matchCount,
  );

  return result;
}

// ─── YouTube embed card (kg-embed-card) ───────────────────────────────────────
function transformYouTubeEmbeds(html: string): string {
  const hasEmbedCard = /kg-embed-card/i.test(html);
  const hasIframe = /<iframe/i.test(html);
  console.log(
    "[ghostTransforms:transformYouTubeEmbeds] kg-embed-card present:",
    hasEmbedCard,
    "| <iframe> present:",
    hasIframe,
  );

  let matchCount = 0;

  const result = html.replace(
    /<figure[^>]*kg-embed-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, inner: string) => {
      const iframeTag = inner.match(/<iframe[^>]*>/i)?.[0] ?? "";
      const src = getAttr(iframeTag, "src") ?? "";

      const idMatch = src.match(
        /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      );
      if (!idMatch) {
        // Not a YouTube embed (could be Spotify, already handled above, or
        // Twitter, handled below) — leave untouched.
        return match;
      }

      matchCount++;
      const videoId = idMatch[1];
      const title = getAttr(iframeTag, "title") ?? "";

      console.log(
        "[ghostTransforms] ✅ Extracted YouTube videoId:",
        videoId,
        "| title:",
        title,
      );

      return ghostYouTubeHTML(videoId, title);
    },
  );

  console.log(
    "[ghostTransforms:transformYouTubeEmbeds] total YouTube matches processed:",
    matchCount,
  );

  return result;
}

// ─── X / Twitter embed card (kg-embed-card, blockquote.twitter-tweet) ────────
function transformTwitterEmbeds(html: string): string {
  let matchCount = 0;

  const result = html.replace(
    /<figure[^>]*kg-embed-card[^>]*>([\s\S]*?)<\/figure>/gi,
    (match, inner: string) => {
      const blockquoteMatch = inner.match(
        /<blockquote[^>]*class="[^"]*twitter-tweet[^"]*"[^>]*>([\s\S]*?)<\/blockquote>/i,
      );
      if (!blockquoteMatch) return match;

      const bqInner = blockquoteMatch[1];

      const pMatch = bqInner.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
      let tweetHtml = "";
      let afterP = bqInner;
      if (pMatch) {
        tweetHtml = pMatch[1];
        const idx = bqInner.indexOf(pMatch[0]);
        afterP = bqInner.slice(idx + pMatch[0].length);
      }

      const bylineMatch = afterP.match(
        /(?:&mdash;|—|--)\s*([^(<]+)\(@([^)]+)\)[\s\S]*?<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/i,
      );

      if (!bylineMatch) {
        console.warn(
          "[ghostTransforms] kg-embed-card matched twitter-tweet but byline could not be parsed — leaving raw.",
        );
        return match;
      }

      matchCount++;

      const author = bylineMatch[1].trim();
      const handle = bylineMatch[2].trim();
      const rawUrl = bylineMatch[3];
      const tweetUrl = rawUrl.split("?")[0];
      const date = bylineMatch[4]?.trim();
      const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1];

      const tweetText = tweetHtml
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      console.log(
        "[ghostTransforms] ✅ Extracted tweet — author:",
        author,
        "| handle:",
        handle,
        "| tweetId:",
        tweetId,
      );

      return ghostXHTML({ tweetText, author, handle, tweetUrl, tweetId, date });
    },
  );

  console.log(
    "[ghostTransforms:transformTwitterEmbeds] total tweet matches processed:",
    matchCount,
  );

  return result;
}

// ─── Master pipeline ──────────────────────────────────────────────────────────
export function transformBody(html: string): string {
  console.log(
    "[ghostTransforms:transformBody] input HTML length:",
    html.length,
  );

  let out = html;
  out = transformGallery(out);
  out = transformBookmarks(out);
  out = transformButtons(out);
  out = transformBlockquotes(out);
  out = transformCallToAction(out);
  out = transformVideos(out);
  out = transformSpotifyEmbeds(out);
  out = transformTwitterEmbeds(out);
  out = transformYouTubeEmbeds(out);

  return out;
}
