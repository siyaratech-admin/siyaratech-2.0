// app/api/ghost/posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/ghost";

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("Ghost fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch from Ghost" }, { status: 500 });
  }
}