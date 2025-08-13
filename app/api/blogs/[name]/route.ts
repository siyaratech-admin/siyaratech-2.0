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
  try {
    const apiKey = process.env.ERP_NEXT_API_KEY;
    const apiSecret = process.env.ERP_NEXT_API_SECRET;
    
    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'ERPNext API credentials not found' },
        { status: 500 }
      );
    }

    const url = new URL(`https://siyaratech.m.erpnext.com/api/resource/Blog%20Post/${params.name}`);
    
    // Add query parameters for the fields we need
    url.searchParams.append('fields', '["title","content","content_type","content_md","published","published_on"]');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
