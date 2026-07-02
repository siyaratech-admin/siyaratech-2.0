// app/api/ghost/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/ghost";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}