/**
 * GhostButton.tsx
 * Location: src/components/ghost/GhostButton.tsx
 *
 * Handles Ghost's Button card — rendered in the CMS as:
 *   <div class="kg-card kg-button-card kg-align-center">
 *     <a href="..." class="kg-btn kg-btn-accent">Label</a>
 *   </div>
 *
 * TWO exports:
 *  1. <GhostButton>       — React component for standalone / future use
 *  2. ghostButtonHTML()   — HTML string template used by ghostTransforms.ts
 */

import React from "react";

const GRAD = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)";
const GRAD_BORDER = "linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)";

interface GhostButtonProps {
    label: string;
    href: string;
    align?: "left" | "center" | "right";
}

// ─── 1. React component ───────────────────────────────────────────────────────
export function GhostButton({ label, href, align = "center" }: GhostButtonProps) {
    const justifyMap = { left: "flex-start", center: "center", right: "flex-end" };

    return (
        <div style={{ display: "flex", justifyContent: justifyMap[align], margin: "2rem 0" }}>
            <div
                style={{
                    background: GRAD_BORDER,
                    padding: "1.5px",
                    borderRadius: "9999px",
                    boxShadow: "0 8px 32px rgba(131,58,180,0.35), 0 2px 8px rgba(0,0,0,0.5)",
                    display: "inline-block",
                }}
            >
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        padding: "0.65rem 1.75rem",
                        borderRadius: "9999px",
                        background: GRAD,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        textDecoration: "none",
                        letterSpacing: "0.01em",
                        whiteSpace: "nowrap",
                    }}
                >
                    {label}
                </a>
            </div>
        </div>
    );
}

// ─── 2. HTML string template (for ghostTransforms.ts) ─────────────────────────
export function ghostButtonHTML(
    label: string,
    href: string,
    align: "left" | "center" | "right" = "center"
): string {
    const justifyMap = { left: "flex-start", center: "center", right: "flex-end" };

    return `<div style="display:flex;justify-content:${justifyMap[align]};margin:2rem 0;">
  <div style="background:${GRAD_BORDER};padding:1.5px;border-radius:9999px;box-shadow:0 8px 32px rgba(131,58,180,0.35),0 2px 8px rgba(0,0,0,0.5);display:inline-block;">
    <a href="${href}" target="_blank" rel="noopener noreferrer"
      style="display:inline-block;padding:0.65rem 1.75rem;border-radius:9999px;background:${GRAD};color:#fff;font-weight:700;font-size:0.95rem;text-decoration:none;letter-spacing:0.01em;white-space:nowrap;"
      onmouseover="this.style.opacity='0.85';this.style.transform='scale(1.03)'"
      onmouseout="this.style.opacity='1';this.style.transform='scale(1)'"
    >${label}</a>
  </div>
</div>`;
}