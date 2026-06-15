// src/app/api/blogs/route.ts
// Fetches from Medium API and maps to the Blog shape your page expects.
// Set MEDIUM_PUBLICATION_SLUG in .env.local to your publication slug.

import { NextResponse } from "next/server";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const PUBLICATION_SLUG = process.env.MEDIUM_PUBLICATION_SLUG || "towardsdatascience";
const BASE = "https://medium2.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": "medium2.p.rapidapi.com",
};

async function mFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Medium API ${res.status}: ${path}`);
  return res.json();
}

export async function GET() {
  try {
    // 1. Slug → publication_id
    const { publication_id } = await mFetch(`/publication/id_for/${PUBLICATION_SLUG}`);

    // 2. Article IDs + publication info in parallel
    const [{ publication_articles: ids }, pubInfo] = await Promise.all([
      mFetch(`/publication/${publication_id}/articles`),
      mFetch(`/publication/${publication_id}`),
    ]);

    // 3. Fetch up to 12 articles in parallel
    const settled = await Promise.allSettled(
      (ids as string[]).slice(0, 12).map((id) => mFetch(`/article/${id}`))
    );

    const blogs = settled
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map((r) => {
        const a = r.value;
        return {
          id: a.id,
          title: a.title || "Untitled",
          description: a.subtitle || a.description || "",
          image: a.image_url || "",
          reading_time: a.reading_time,
          author: a.author,
          claps: a.claps,
          tags: a.tags || [],
          published_at: a.published_at,
          url: a.url,
        };
      });

    return NextResponse.json({ blogs, publication: pubInfo });
  } catch (err: any) {
    console.error("Blog API error:", err.message);
    return NextResponse.json({ error: err.message, blogs: [] }, { status: 500 });
  }
}