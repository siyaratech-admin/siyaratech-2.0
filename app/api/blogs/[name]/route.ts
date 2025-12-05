import { NextResponse } from 'next/server';

interface BlogPostResponse {
  data: {
    name: string;
    title: string;
    content?: string;
    content_type: string;
    content_md?: string;
    published: number;
    published_on: string;
  };
}

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL;
  const API_KEY = process.env.ERPNEXT_API_KEY;
  const API_SECRET = process.env.ERPNEXT_API_SECRET;

  if (!ERPNEXT_URL) {
    console.warn("NEXT_PUBLIC_ERPNEXT_URL is not defined. Returning mock data.");
    // Return mock data if no URL is configured
    // Simulating a blog post based on the ID
    return NextResponse.json({
      blogPost: {
        name: params.name,
        title: 'The Future of AI in Enterprise',
        content: '<p>Artificial intelligence is reshaping business operations...</p>',
        contentType: 'HTML',
        contentMd: '',
        publishedOn: new Date().toISOString(),
      }
    });
  }

  try {
    const url = new URL(`${ERPNEXT_URL}/api/resource/Blog Post/${params.name}`);

    // Add query parameters for the fields we need
    url.searchParams.append('fields', '["name","title","content","content_type","content_md","published","published_on"]');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (API_KEY && API_SECRET) {
      headers['Authorization'] = `token ${API_KEY}:${API_SECRET}`;
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `Failed to fetch blog post: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: BlogPostResponse = await response.json();

    // Check if the blog post is published
    if (!data.data.published) {
      return NextResponse.json(
        { error: 'Blog post not published' },
        { status: 404 }
      );
    }

    // Transform the data for frontend use
    const blogPost = {
      name: data.data.name,
      title: data.data.title,
      content: data.data.content || '',
      contentType: data.data.content_type,
      contentMd: data.data.content_md || '',
      publishedOn: data.data.published_on,
    };

    return NextResponse.json({ blogPost });

  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
