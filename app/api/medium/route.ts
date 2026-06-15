// src/app/api/medium/route.ts
import { NextRequest, NextResponse } from "next/server";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!;
const BASE_URL = "https://medium2.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": "medium2.p.rapidapi.com",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      { error: "Missing endpoint param" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Medium API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch from Medium API" },
      { status: 500 },
    );
  }
}
