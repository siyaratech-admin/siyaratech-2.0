/**
 * GhostCallToAction.tsx
 * Location: src/components/ghost/GhostCallToAction.tsx
 *
 * Renders the Ghost "Header / CTA" card (kg-header-card).
 *
 * Ghost's actual HTML structure:
 *   <div class="kg-card kg-header-card kg-size-small kg-style-dark">
 *     <div class="kg-header-card-image-container">          ← big hero image
 *       <img class="kg-header-card-image" src="..." />
 *     </div>
 *     <div class="kg-header-card-content">
 *       <p class="kg-header-card-label kg-style-accent">Sponsored</p>
 *       <h2 class="kg-header-card-heading">Heading text</h2>
 *       <p class="kg-header-card-subheading">Body text</p>
 *       <a class="kg-header-card-button" href="...">Label</a>
 *     </div>
 *   </div>
 *
 * Design: dark glass card with gradient border, matching GhostVideo / GhostButton.
 * Image (when present) renders as a full-width hero above the content, with
 * rounded top corners and a subtle gradient overlay for legibility.
 */

export interface GhostCallToActionProps {
  showSponsorLabel?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  /** heading (h2) or subheading (p) text */
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

// ─── design tokens ────────────────────────────────────────────────────────────
const GRAD = "linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)";
const GRAD_BORDER = "linear-gradient(135deg,#833AB4,#FD1D1D,#FCB045)";
const CARD_BG = "rgba(14,14,18,0.85)";
const SHADOW = "0 8px 40px rgba(131,58,180,0.2),0 2px 12px rgba(0,0,0,0.55)";

export function ghostCallToActionHTML({
  showSponsorLabel = false,
  imageUrl,
  imageAlt = "",
  description,
  buttonText,
  buttonUrl,
}: GhostCallToActionProps): string {

  const hasImage = Boolean(imageUrl);
  const hasDescription = Boolean(description?.trim());
  const hasButton = Boolean(buttonText?.trim() && buttonUrl?.trim());

  if (!showSponsorLabel && !hasImage && !hasDescription && !hasButton) return "";

  const borderRadius = "1rem";
  const innerRadius = "calc(1rem - 1px)";
  const imgTopRadius = `${innerRadius} ${innerRadius} 0 0`;
  const contentBotRadius = hasImage ? `0 0 ${innerRadius} ${innerRadius}` : innerRadius;

  // ── Hero image (full-width, rounded top) ──────────────────────────────────
  const heroImage = hasImage ? `
    <div style="position:relative;line-height:0;overflow:hidden;border-radius:${imgTopRadius};">
      <img
        src="${imageUrl}"
        alt="${imageAlt}"
        style="
          display:block;
          width:100%;
          max-height:320px;
          object-fit:cover;
          object-position:center top;
        "
      />
      <!-- gradient scrim so text below stays legible -->
      <div style="
        position:absolute;
        inset:0;
        background:linear-gradient(to bottom,transparent 40%,rgba(10,10,14,0.7) 100%);
        pointer-events:none;
      "></div>
    </div>` : "";

  // ── Sponsor label ─────────────────────────────────────────────────────────
  const sponsorLabel = showSponsorLabel ? `
    <div style="
      display:inline-flex;
      align-items:center;
      gap:0.4rem;
      margin-bottom:0.75rem;
    ">
      <div style="width:16px;height:1px;background:${GRAD};"></div>
      <span style="
        font-size:0.65rem;
        font-weight:700;
        letter-spacing:0.14em;
        text-transform:uppercase;
        background:${GRAD};
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        background-clip:text;
      ">Sponsored</span>
      <div style="width:16px;height:1px;background:${GRAD};"></div>
    </div>` : "";

  // ── Description / heading text ────────────────────────────────────────────
  const descriptionBlock = hasDescription ? `
    <p style="
      margin:0 0 ${hasButton ? "1.1rem" : "0"} 0;
      color:rgba(255,255,255,0.88);
      font-size:0.975rem;
      line-height:1.65;
      font-weight:400;
    ">${description}</p>` : "";

  // ── CTA Button — pill with gradient, matches GhostButton ─────────────────
  const buttonBlock = hasButton ? `
    <div style="display:inline-block;background:${GRAD_BORDER};padding:1.5px;border-radius:9999px;box-shadow:0 4px 20px rgba(131,58,180,0.45);">
      <a
        href="${buttonUrl}"
        target="_blank"
        rel="noopener noreferrer"
        onmouseover="this.style.opacity='0.85';this.style.transform='scale(1.02)'"
        onmouseout="this.style.opacity='1';this.style.transform='scale(1)'"
        style="
          display:inline-block;
          padding:0.55rem 1.5rem;
          border-radius:9999px;
          background:${GRAD};
          color:#fff;
          font-size:0.875rem;
          font-weight:700;
          text-decoration:none;
          letter-spacing:0.02em;
          white-space:nowrap;
          transition:opacity 0.15s,transform 0.15s;
        "
      >${buttonText}</a>
    </div>` : "";

  // ── Content block ─────────────────────────────────────────────────────────
  const contentBlock = `
    <div style="
      padding:1.25rem 1.5rem;
      background:${CARD_BG};
      border-radius:${contentBotRadius};
      backdrop-filter:blur(12px);
      -webkit-backdrop-filter:blur(12px);
    ">
      ${sponsorLabel}
      ${descriptionBlock}
      ${buttonBlock}
    </div>`;

  // ── Outer wrapper — 1px gradient border ───────────────────────────────────
  return `
<div style="margin:2rem 0;">
  <div style="
    background:${GRAD_BORDER};
    padding:1px;
    border-radius:${borderRadius};
    box-shadow:${SHADOW};
    overflow:hidden;
  ">
    ${heroImage}
    ${contentBlock}
  </div>
</div>`.trim();
}