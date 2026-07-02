// src/lib/mediumApi.ts

const API_BASE = "/api/medium";

async function mediumFetch(endpoint: string) {
  const res = await fetch(
    `${API_BASE}?endpoint=${encodeURIComponent(endpoint)}`,
  );
  if (!res.ok) throw new Error(`Medium API error: ${res.status}`);
  return res.json();
}

/** Convert any string to a Medium-compatible slug: lowercase, hyphens, no special chars */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, ""); // strip leading/trailing hyphens
}

/** Get publication_id from a slug string */
export async function getPublicationId(slug: string): Promise<string> {
  const data = await mediumFetch(`/publication/id_for/${slug}`);
  if (!data.publication_id)
    throw new Error(`No publication found for slug: "${slug}"`);
  return data.publication_id;
}

/** Get publication info */
export async function getPublicationInfo(publicationId: string) {
  return mediumFetch(`/publication/${publicationId}`);
}

/** Get article IDs for a publication */
export async function getPublicationArticleIds(
  publicationId: string,
): Promise<string[]> {
  const data = await mediumFetch(`/publication/${publicationId}/articles`);
  return data.publication_articles || [];
}

/** Get info for a single article */
export async function getArticleInfo(articleId: string) {
  return mediumFetch(`/article/${articleId}`);
}

/** Get HTML content of an article */
export async function getArticleHtml(articleId: string): Promise<string> {
  const data = await mediumFetch(`/article/${articleId}/html`);
  return data.html || "";
}

/** Get markdown of an article */
export async function getArticleMarkdown(articleId: string): Promise<string> {
  const data = await mediumFetch(`/article/${articleId}/markdown`);
  return data.markdown || "";
}

/**
 * Full pipeline: given a title string, slugify it, fetch publication,
 * then fetch all articles for that publication.
 */
export async function fetchBlogsByTitle(title: string) {
  const slug = toSlug(title);
  const pubId = await getPublicationId(slug);
  const [pubInfo, articleIds] = await Promise.all([
    getPublicationInfo(pubId),
    getPublicationArticleIds(pubId),
  ]);
  const articleResults = await Promise.allSettled(
    articleIds.slice(0, 12).map((id: string) => getArticleInfo(id)),
  );
  const articles = articleResults
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .map((r) => r.value);

  return { slug, pubId, pubInfo, articles };
}
