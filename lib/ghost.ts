// lib/ghost.ts

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL;
const GHOST_CONTENT_API_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

const FETCH_TIMEOUT_MS = 8000; // 8 seconds — fail fast instead of hanging forever

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  html: string;
  feature_image: string | null;
  reading_time: number;
  published_at: string;
  authors: { name: string }[];
  tags: { name: string }[];
  custom_excerpt: string | null;
}

async function ghostFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  // Fail immediately if env vars are missing — don't silently fall back to localhost
  if (!GHOST_URL || !GHOST_CONTENT_API_KEY) {
    throw new Error(
      "Ghost env vars missing: NEXT_PUBLIC_GHOST_URL and NEXT_PUBLIC_GHOST_CONTENT_API_KEY must be set",
    );
  }

  const url = new URL(`/ghost/api/content/${endpoint}/`, GHOST_URL);
  url.searchParams.set("key", GHOST_CONTENT_API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  // AbortController gives us a hard timeout so fetch never hangs the page
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Ghost API error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Ghost API timed out after ${FETCH_TIMEOUT_MS}ms (${url.toString()})`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function getAllPosts(): Promise<GhostPost[]> {
  try {
    const data = await ghostFetch<{ posts: GhostPost[] }>("posts", {
      include: "authors,tags",
      fields:
        "id,slug,title,excerpt,custom_excerpt,feature_image,reading_time,published_at",
      limit: "all",
      order: "published_at DESC",
    });
    return data.posts ?? [];
  } catch (err) {
    console.error("[ghost] getAllPosts failed:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  try {
    const data = await ghostFetch<{ posts: GhostPost[] }>(
      `posts/slug/${slug}`,
      { include: "authors,tags" },
    );
    return data.posts?.[0] ?? null;
  } catch (err) {
    console.error(`[ghost] getPostBySlug("${slug}") failed:`, err);
    return null;
  }
}