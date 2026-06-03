/**
 * app/api/jobs/route.ts
 * Server-side proxy to ERPNext Job Opening — no caching, always fresh.
 */

import { NextResponse } from "next/server";

const ERP_BASE_URL   = process.env.ERP_BASE_URL     ?? "http://127.0.0.1:8000";
const ERP_API_KEY    = process.env.ERP_API_KEY      ?? "fc3272c1f8cb40b";
const ERP_API_SECRET = process.env.ERP_API_SECRET   ?? "0add95572f83a45";

const FIELDS = [
  "name",
  "job_title",
  "department",
  "location",
  "status",
  "description",
  "employment_type",
  "designation",
];

// Force dynamic — never cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const params = new URLSearchParams({
      filters:          JSON.stringify([["status", "=", "Open"]]),
      fields:           JSON.stringify(FIELDS),
      limit_page_length: "50",
      order_by:         "creation desc",
    });

    const res = await fetch(
      `${ERP_BASE_URL}/api/resource/Job Opening?${params.toString()}`,
      {
        headers: {
          Authorization: `token ${ERP_API_KEY}:${ERP_API_SECRET}`,
          Accept:        "application/json",
        },
        // ✅ No caching — always hit ERPNext live
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[jobs] ERPNext error:", res.status, text.slice(0, 400));
      return NextResponse.json(
        { error: `ERPNext responded with ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // ✅ Tell the browser never to cache this response either
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma:          "no-cache",
      },
    });
  } catch (err) {
    console.error("[jobs] Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to reach ERPNext backend" },
      { status: 502 }
    );
  }
}